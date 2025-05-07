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
        Sid       = "AllowCloudFrontServicePrincipalReadOnly"
        Effect    = "Allow"
        Principal = {
            "Service": "cloudfront.amazonaws.com"
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      },
    ]
  })
}

resource "aws_cloudfront_origin_access_control" "cdn_origin_access_control" {
  name                              = "cdn-origin-access-control"
  description                       = "Origin access control for CloudFront"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
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
    domain_name              = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.cdn_origin_access_control.id
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
    min_ttl                = 3600
    default_ttl            = 86400
    max_ttl                = 1638400
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

output "access_key" {
  value = aws_iam_access_key.gh_access_keys.id
}

output "secret_access_key" {
  value     = aws_iam_access_key.gh_access_keys.secret
  sensitive = true
}

