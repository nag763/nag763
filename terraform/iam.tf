# ------------------------------------------------------------------------------
# IAM OIDC Provider for GitHub Actions
# ------------------------------------------------------------------------------
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# ------------------------------------------------------------------------------
# IAM Role for GitHub Actions
# ------------------------------------------------------------------------------
resource "aws_iam_role" "github_actions" {
  name        = "github-actions-role"
  description = "Role for GitHub Actions to assume"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:nag763/nag763:*"
          }
        }
      }
    ]
  })
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
          "s3:DeleteObject",
          "s3:GetObject"
        ]
        Resource = "${aws_s3_bucket.bucket.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = aws_s3_bucket.bucket.arn
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
# Attach policy to IAM Role for GitHub Actions
# ------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "github_actions_attachment" {
  role       = aws_iam_role.github_actions.name
  policy_arn = aws_iam_policy.gh_actions_policy.arn
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
