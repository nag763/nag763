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
