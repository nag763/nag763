# ------------------------------------------------------------------------------
# Terraform configuration for AWS deployment for nag763
#
# This file provisions:
#   - AWS S3 bucket (public, static website hosting) with CloudFront CDN
#   - AWS IAM user and policy for GitHub Actions to upload to S3
#   - AWS ACM certificate for custom domain with CloudFront
#   - AWS Lambda function with a public Function URL
#   - AWS IAM role for Lambda with permissions for CloudWatch and Amazon Bedrock
#
# Outputs:
#   - AWS IAM access keys for S3 upload
#   - Lambda Function URL
#
# Prerequisites:
#   - Terraform 1.3+
#   - AWS credentials configured
#   - Domains (labeye.info, loic.labeye.info) managed in Route53 or equivalent
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# Terraform provider requirements
# ------------------------------------------------------------------------------
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# ------------------------------------------------------------------------------
# AWS Providers (default and us-east-1 for ACM)
# ------------------------------------------------------------------------------
provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

# ------------------------------------------------------------------------------
# Data source: Archive agent directory for Lambda deployment
# ------------------------------------------------------------------------------
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/agent"
  output_path = "${path.module}/agent.zip"
}

# ------------------------------------------------------------------------------
# AWS S3 bucket for static website hosting
# ------------------------------------------------------------------------------
resource "aws_s3_bucket" "bucket" {
  bucket = "nag763"
}

# ------------------------------------------------------------------------------
# S3 Bucket Policy: Allow CloudFront to read objects
# ------------------------------------------------------------------------------
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipalReadOnly"
        Effect = "Allow"
        Principal = {
          "Service" : "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.bucket.arn}/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cdn.arn
          }
        }
      },
    ]
  })
}

# ------------------------------------------------------------------------------
# CloudFront Origin Access Control for S3
# ------------------------------------------------------------------------------
resource "aws_cloudfront_origin_access_control" "cdn_origin_access_control" {
  name                              = "cdn-origin-access-control"
  description                       = "Origin access control for CloudFront"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# ------------------------------------------------------------------------------
# S3 Bucket Ownership Controls
# ------------------------------------------------------------------------------
resource "aws_s3_bucket_ownership_controls" "ownership" {
  bucket = aws_s3_bucket.bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# ------------------------------------------------------------------------------
# S3 Bucket Public Access Block (allows public access)
# ------------------------------------------------------------------------------
resource "aws_s3_bucket_public_access_block" "public_access_block" {
  bucket = aws_s3_bucket.bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# ------------------------------------------------------------------------------
# S3 Bucket ACL: Set to public-read
# ------------------------------------------------------------------------------
resource "aws_s3_bucket_acl" "bucket_acl" {
  depends_on = [
    aws_s3_bucket_ownership_controls.ownership,
    aws_s3_bucket_public_access_block.public_access_block,
  ]

  bucket = aws_s3_bucket.bucket.id
  acl    = "public-read"
}

# ------------------------------------------------------------------------------
# AWS IAM User for GitHub Actions S3 upload
# ------------------------------------------------------------------------------
resource "aws_iam_user" "user" {
  name = "gh-actions-user"
}

# ------------------------------------------------------------------------------
# IAM Policy: Allow S3 Put/Delete and Lambda updates for the user
# ------------------------------------------------------------------------------
resource "aws_iam_policy" "gh_actions_policy" {
  name        = "gh-actions-policy"
  description = "Policy to allow uploading to S3 bucket and updating Lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = "${aws_s3_bucket.bucket.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["lambda:UpdateFunctionCode"]
        Resource = aws_lambda_function.agent_lambda.arn
      },
    ]
  })
}

# ------------------------------------------------------------------------------
# Attach policy to IAM user for GitHub Actions
# ------------------------------------------------------------------------------
resource "aws_iam_user_policy_attachment" "user_policy_attachment" {
  user       = aws_iam_user.user.name
  policy_arn = aws_iam_policy.gh_actions_policy.arn
}

# ------------------------------------------------------------------------------
# IAM Access Key for GitHub Actions user
# ------------------------------------------------------------------------------
resource "aws_iam_access_key" "gh_access_keys" {
  user = aws_iam_user.user.name
}

# ------------------------------------------------------------------------------
# S3 Website Configuration (index.html as root)
# ------------------------------------------------------------------------------
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.bucket.id

  index_document {
    suffix = "index.html"
  }
}

# ------------------------------------------------------------------------------
# ACM Certificate for CloudFront (must be in us-east-1)
# ------------------------------------------------------------------------------
resource "aws_acm_certificate" "cert" {
  domain_name       = "labeye.info"
  validation_method = "DNS"
  provider          = aws.us-east-1

  subject_alternative_names = [
    "loic.labeye.info",
  ]
}

# ------------------------------------------------------------------------------
# CloudFront Distribution for S3 static site
# ------------------------------------------------------------------------------
resource "aws_cloudfront_distribution" "cdn" {
  origin {
    domain_name              = aws_s3_bucket.bucket.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.bucket.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.cdn_origin_access_control.id
  }

  price_class = "PriceClass_100"

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html" # For labeye.info/
  http_version        = "http2and3"

  # Default cache behavior for all other paths
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

  # Ordered cache behavior for /chat/* paths
  ordered_cache_behavior {
    path_pattern     = "/chat*" # Use /chat* to catch both /chat and /chat/ and /chat/something
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

    # Attach the CloudFront Function here
    function_association {
      event_type   = "viewer-request" # Function runs before CloudFront makes a request to the origin
      function_arn = aws_cloudfront_function.chat_rewrite.arn
    }
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
resource "aws_cloudfront_function" "chat_rewrite" {
  name    = "chat-path-rewrite"
  runtime = "cloudfront-js-1.0"
  comment = "Rewrites /chat to /chat/index.html"
  publish = true # Set to true to publish the function

  code = <<EOT
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // Check if the URI is exactly '/chat' or '/chat/'
    // This handles both 'labeye.info/chat' and 'labeye.info/chat/'
    if (uri === '/chat' || uri === '/chat/') {
        request.uri = '/chat/index.html'; // Rewrite to the S3 object path
    } else if (uri.startsWith('/chat/')) {
        // No rewrite needed for paths already starting with /chat/
        // CloudFront will directly look for objects like /chat/somepage.html in S3
    }
    return request;
}
EOT
}

# ------------------------------------------------------------------------------
# IAM Role for Lambda Function
# ------------------------------------------------------------------------------
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-bedrock-executor-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# ------------------------------------------------------------------------------
# IAM Policy for Lambda to access Bedrock and CloudWatch
# ------------------------------------------------------------------------------
resource "aws_iam_policy" "lambda_bedrock_policy" {
  name        = "lambda-bedrock-policy"
  description = "Allows Lambda to invoke Bedrock models and write logs"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "bedrock:InvokeModel",
          "bedrock:InvokeModelWithResponseStream"
        ]
        Resource = [
          "arn:aws:bedrock:eu-*:*:inference-profile/*",
          "arn:aws:bedrock:eu-*::foundation-model/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# ------------------------------------------------------------------------------
# Attach Policy to Lambda Role
# ------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "lambda_bedrock_attachment" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = aws_iam_policy.lambda_bedrock_policy.arn
}

# ------------------------------------------------------------------------------
# AWS Lambda Function
# ------------------------------------------------------------------------------
resource "aws_lambda_function" "agent_lambda" {
  function_name    = "nag763-agent"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 15
  memory_size      = 256

}

# ------------------------------------------------------------------------------
# AWS Lambda Function URL
# ------------------------------------------------------------------------------
resource "aws_lambda_function_url" "agent_url" {
  function_name      = aws_lambda_function.agent_lambda.function_name
  authorization_type = "NONE" # Publicly accessible

  cors {
    allow_credentials = true
    allow_origins     = concat(["https://${aws_acm_certificate.cert.domain_name}"], formatlist("https://%s", aws_acm_certificate.cert.subject_alternative_names))
    allow_methods     = ["*"]
    allow_headers     = ["*"]
  }
}

# ------------------------------------------------------------------------------
# Outputs
# ------------------------------------------------------------------------------
output "iam_access_key" {
  value = aws_iam_access_key.gh_access_keys.id
}

output "iam_secret_access_key" {
  value     = aws_iam_access_key.gh_access_keys.secret
  sensitive = true
}

output "lambda_function_url" {
  description = "The URL of the agent Lambda function"
  value       = aws_lambda_function_url.agent_url.function_url
}
