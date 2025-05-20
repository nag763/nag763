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

provider "aws" {
  region = "eu-central-1"
}

provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

provider "google" {
  project = local.gcp_project
  region  = local.gcp_region
}

data "google_project" "project" {
  project_id = local.gcp_project # Or var.gcp_project_id if it's a variable
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


# Enable necessary APIs
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

# --- Service Account for GitHub Actions ---
resource "google_service_account" "github_actions_sa" {
  account_id   = "github-actions-deployer"
  display_name = "Service Account for GitHub Actions Cloud Run Deployments"
  project      = local.gcp_project
}


resource "google_project_iam_member" "github_actions_sa_roles" {
  for_each = toset(local.github_actions_sa_roles)

  project = local.gcp_project
  role    = each.key
  member  = "serviceAccount:${google_service_account.github_actions_sa.email}"

  # Add depends_on for APIs if they are in the same apply as the roles.
  # This ensures the API is enabled before the role is granted.
  # You need to explicitly map each role to its corresponding API,
  # or rely on the overall API enablement (which is usually sufficient if all are enabled).
  depends_on = [
    google_project_service.apis["run.googleapis.com"],
    google_project_service.apis["artifactregistry.googleapis.com"],
    google_project_service.apis["cloudbuild.googleapis.com"],
    # iam.googleapis.com is usually enabled by default or implied, no need for explicit dependency here.
  ]
}

# --- Workload Identity Federation Configuration ---
resource "google_iam_workload_identity_pool" "github_actions_pool" {
  project                   = local.gcp_project
  workload_identity_pool_id = "github-actions-pool"
  display_name              = "GitHub Actions Pool"
  description               = "Workload Identity Pool for GitHub Actions"
  disabled                  = false
}

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

# Bind the Service Account to the Workload Identity Pool Provider
resource "google_service_account_iam_member" "wif_binding" {
  service_account_id = google_service_account.github_actions_sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/projects/${data.google_project.project.number}/locations/global/workloadIdentityPools/${google_iam_workload_identity_pool.github_actions_pool.workload_identity_pool_id}/attribute.repository/nag763/nag763"

}

# --- Outputs for Service Account Email ---
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
