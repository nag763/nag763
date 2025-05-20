# ------------------------------------------------------------------------------
# Terraform configuration for multi-cloud deployment (AWS & GCP) for nag763
#
# This file provisions:
#   - AWS S3 bucket (public, static website hosting) with CloudFront CDN
#   - AWS IAM user and policy for GitHub Actions to upload to S3
#   - AWS ACM certificate for custom domain with CloudFront
#   - GCP Cloud Run service for containerized app deployment
#   - GCP Artifact Registry for Docker images
#   - GCP IAM Service Account and Workload Identity Federation for GitHub Actions
#   - Enables required GCP APIs
#
# Outputs:
#   - Service account email for GitHub Actions
#   - Workload Identity Provider path
#   - Cloud Run service URI
#   - AWS IAM access keys for S3 upload
#
# Prerequisites:
#   - Terraform 1.3+
#   - AWS and GCP credentials configured
#   - Domains (labeye.info, loic.labeye.info) managed in Route53 or equivalent
# ------------------------------------------------------------------------------

# ------------------------------------------------------------------------------
# Local variables
# ------------------------------------------------------------------------------
locals {
  gcp_region  = "europe-west1"
  gcp_project = "nag763"
  github_actions_sa_roles = [
    "roles/run.admin",                # For Cloud Run deployments
    "roles/artifactregistry.writer",  # For pushing Docker images
    "roles/iam.serviceAccountUser",   # Allows SA to impersonate itself for Cloud Run runtime
    "roles/cloudbuild.builds.editor", # For Cloud Build implicit build from source
  ]
}

# ------------------------------------------------------------------------------
# Terraform provider requirements
# ------------------------------------------------------------------------------
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 6.35.0"
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
# Google Cloud Provider
# ------------------------------------------------------------------------------
provider "google" {
  project = local.gcp_project
  region  = local.gcp_region
}

# ------------------------------------------------------------------------------
# Data source: GCP project info
# ------------------------------------------------------------------------------
data "google_project" "project" {
  project_id = local.gcp_project # Or var.gcp_project_id if it's a variable
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
# IAM Policy: Allow S3 Put/Delete for the user
# ------------------------------------------------------------------------------
resource "aws_iam_policy" "s3_upload_policy" {
  name        = "s3-upload-policy"
  description = "Policy to allow uploading to S3 bucket"

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
    ]
  })
}

# ------------------------------------------------------------------------------
# Attach S3 upload policy to IAM user
# ------------------------------------------------------------------------------
resource "aws_iam_user_policy_attachment" "user_policy_attachment" {
  user       = aws_iam_user.user.name
  policy_arn = aws_iam_policy.s3_upload_policy.arn
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

# ------------------------------------------------------------------------------
# CloudFront Origin Access Identity (legacy, not used with OAC)
# ------------------------------------------------------------------------------
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Access identity for S3 bucket"
}

# ------------------------------------------------------------------------------
# Enable required GCP APIs
# ------------------------------------------------------------------------------
resource "google_project_service" "apis" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "iam.googleapis.com",
    "logging.googleapis.com", # Good for logs
  ])
  project            = local.gcp_project
  service            = each.key
  disable_on_destroy = true
}

# ------------------------------------------------------------------------------
# GCP Artifact Registry for Docker images
# ------------------------------------------------------------------------------
resource "google_artifact_registry_repository" "docker_repo" {
  provider      = google # Explicit provider required due to for_each on APIs
  location      = local.gcp_region
  repository_id = local.gcp_project
  description   = "Docker repository for Cloud Run images"
  format        = "DOCKER"
  depends_on = [
    google_project_service.apis["artifactregistry.googleapis.com"]
  ]
}

# ------------------------------------------------------------------------------
# GCP Cloud Run Service for app deployment
# ------------------------------------------------------------------------------
resource "google_cloud_run_v2_service" "default" {
  name     = "nag763-assistant"
  location = local.gcp_region
  project  = local.gcp_project

  template {
    containers {
      image = "gcr.io/${local.gcp_project}/nag763-assistant:latest"
      # Map to port 8000
      ports {
        container_port = 8000
      }
    }

    scaling {
      min_instance_count = 0
      max_instance_count = 1
    }

    # Optional: Timeout in seconds for requests
    timeout = "600s" # 5 minutes
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }

  deletion_protection = false
}

# ------------------------------------------------------------------------------
# GCP Service Account for GitHub Actions deployments
# ------------------------------------------------------------------------------
resource "google_service_account" "github_actions_sa" {
  account_id   = "github-actions-deployer"
  display_name = "Service Account for GitHub Actions Cloud Run Deployments"
  project      = local.gcp_project
}

# ------------------------------------------------------------------------------
# Assign required roles to GitHub Actions Service Account
# ------------------------------------------------------------------------------
resource "google_project_iam_member" "github_actions_sa_roles" {
  for_each = toset(local.github_actions_sa_roles)

  project = local.gcp_project
  role    = each.key
  member  = "serviceAccount:${google_service_account.github_actions_sa.email}"

  depends_on = [
    google_project_service.apis["run.googleapis.com"],
    google_project_service.apis["artifactregistry.googleapis.com"],
    google_project_service.apis["cloudbuild.googleapis.com"],
    # iam.googleapis.com is usually enabled by default or implied, no need for explicit dependency here.
  ]
}

# ------------------------------------------------------------------------------
# GCP Workload Identity Federation Pool for GitHub Actions
# ------------------------------------------------------------------------------
resource "google_iam_workload_identity_pool" "github_actions_pool" {
  project                   = local.gcp_project
  workload_identity_pool_id = "github-actions-pool"
  display_name              = "GitHub Actions Pool"
  description               = "Workload Identity Pool for GitHub Actions"
  disabled                  = false
}

# ------------------------------------------------------------------------------
# GCP Workload Identity Provider for GitHub OIDC
# ------------------------------------------------------------------------------
resource "google_iam_workload_identity_pool_provider" "github_provider" {
  project                            = local.gcp_project
  workload_identity_pool_id          = google_iam_workload_identity_pool.github_actions_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "github-provider"
  display_name                       = "GitHub OIDC Provider"
  description                        = "OIDC Provider for GitHub Actions"
  attribute_condition                = "attribute.repository == 'nag763/nag763'"
  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.aud"        = "assertion.aud"
    "attribute.repository" = "assertion.repository"
  }
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
  disabled = false
}

# ------------------------------------------------------------------------------
# Bind Service Account to Workload Identity Pool Provider
# ------------------------------------------------------------------------------
resource "google_service_account_iam_member" "wif_binding" {
  service_account_id = google_service_account.github_actions_sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/projects/${data.google_project.project.number}/locations/global/workloadIdentityPools/${google_iam_workload_identity_pool.github_actions_pool.workload_identity_pool_id}/attribute.repository/nag763/nag763"
}

# ------------------------------------------------------------------------------
# Outputs
# ------------------------------------------------------------------------------
output "github_actions_service_account_email" {
  description = "The email of the Google Service Account used by GitHub Actions"
  value       = google_service_account.github_actions_sa.email
}

output "workload_identity_provider_path" {
  description = "The full path to the Workload Identity Provider for GitHub Actions"
  value       = google_iam_workload_identity_pool_provider.github_provider.name
}

output "gcr_address" {
  value = google_cloud_run_v2_service.default.uri
}

output "iam_access_key" {
  value = aws_iam_access_key.gh_access_keys.id
}

output "iam_secret_access_key" {
  value     = aws_iam_access_key.gh_access_keys.secret
  sensitive = true
}
