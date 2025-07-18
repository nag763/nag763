# ------------------------------------------------------------------------------
# Outputs
# ------------------------------------------------------------------------------
output "github_actions_role_arn" {
  description = "The ARN of the IAM role for GitHub Actions."
  value       = aws_iam_role.github_actions.arn
}

output "lambda_function_url" {
  description = "The URL of the agent Lambda function"
  value       = var.agent_enabled ? aws_lambda_function_url.agent_url[0].function_url : ""
}
