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
  dynamic "ordered_cache_behavior" {
    for_each = var.agent_enabled ? [1] : []
    content {
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
