terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}


# S3 Bucket, in LRS, publicly accessible
resource "aws_s3_bucket" "bucket" {
  bucket = "nag763"
}

# S3 Bucket Policy, public read access
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_ownership_controls" "ownership" {
  bucket = aws_s3_bucket.bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.ownership,
    aws_s3_bucket_public_access_block.public_access_block,
  ]

  bucket = aws_s3_bucket.bucket.id
  acl    = "public-read"
}

# IAM User
resource "aws_iam_user" "user" {
  name = "gh-actions-user"
}

# IAM Policy, the user can upload to S3
resource "aws_iam_policy" "s3_upload_policy" {
  name        = "s3-upload-policy"
  description = "Policy to allow uploading to S3 bucket"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
      Effect   = "Allow"
      Action   = [
        "s3:PutObject",
        "s3:DeleteObject"
      ]
      Resource = "${aws_s3_bucket.bucket.arn}/*"
      },
    ]
  })
}

resource "aws_iam_user_policy_attachment" "user_policy_attachment" {
  user       = aws_iam_user.user.name
  policy_arn = aws_iam_policy.s3_upload_policy.arn
}

resource "aws_iam_access_key" "gh_access_keys" {
  user = aws_iam_user.user.name
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name       = "labeye.info"
  validation_method = "DNS"
  provider          = aws.us-east-1

  subject_alternative_names = [
    "loic.labeye.info",
  ]
}

resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name = aws_s3_bucket_website_configuration.website.website_endpoint
    origin_id   = "S3-${aws_s3_bucket.bucket.id}"

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "SSLv3",
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  price_class = "PriceClass_100"

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  http_version        = "http2and3"
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.bucket.id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }


    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
  }

  viewer_certificate {

    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
    minimum_protocol_version       = "TLSv1.2_2021"
    cloudfront_default_certificate = false
  }

  aliases = [
    "labeye.info",
    "loic.labeye.info",
  ]



  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Access identity for S3 bucket"
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda-policy"
  description = "Policy for Lambda to access S3 and CloudWatch"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = [
          "ses:SendEmail",
          "ses:SendRawEmail"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

resource "aws_lambda_function" "lambda_function" {
  function_name = "nag763-lambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "bootstrap"
  runtime       = "provided.al2023"
  timeout       = 10

  environment {
    variables = {
      MAIL_SENDER = var.mail_sender,
      MAIL_TO = var.mail_to,
      REGION = var.region,
    }
  }

  filename = "./lambda/target/lambda/nag763-lambda/bootstrap.zip"
  source_code_hash = filebase64sha256("./lambda/target/lambda/nag763-lambda/bootstrap.zip")
}

output "access_key" {
  value = aws_iam_access_key.gh_access_keys.id
}

output "secret_access_key" {
  value     = aws_iam_access_key.gh_access_keys.secret
  sensitive = true
}

