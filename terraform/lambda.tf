# ------------------------------------------------------------------------------
# Data source: Archive agent directory for Lambda deployment
# ------------------------------------------------------------------------------
data "archive_file" "lambda_zip" {
  count       = var.agent_enabled ? 1 : 0
  type        = "zip"
  source_dir  = "${path.module}/../agent"
  output_path = "${path.module}/../agent.zip"
}

# ------------------------------------------------------------------------------
# AWS Lambda Function
# ------------------------------------------------------------------------------
resource "aws_lambda_function" "agent_lambda" {
  count            = var.agent_enabled ? 1 : 0
  function_name    = "nag763-agent"
  role             = aws_iam_role.lambda_exec_role[0].arn
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.12"
  filename         = data.archive_file.lambda_zip[0].output_path
  source_code_hash = data.archive_file.lambda_zip[0].output_base64sha256
  timeout          = 15
  memory_size      = 256

}

# ------------------------------------------------------------------------------
# AWS Lambda Function URL
# ------------------------------------------------------------------------------
resource "aws_lambda_function_url" "agent_url" {
  count              = var.agent_enabled ? 1 : 0
  function_name      = aws_lambda_function.agent_lambda[0].function_name
  authorization_type = "NONE" # Publicly accessible

  cors {
    allow_credentials = true
    allow_origins     = concat(["https://${aws_acm_certificate.cert.domain_name}"], formatlist("https://%s", aws_acm_certificate.cert.subject_alternative_names))
    allow_methods     = ["*"]
    allow_headers     = ["*"]
  }
}
