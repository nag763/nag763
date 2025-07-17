"""
This module contains the AWS Lambda function handler for the agent.
It initializes the agent with various tools and handles incoming requests,
processing them with the agent and returning responses.
"""

import json

from agent import create_agent


def lambda_handler(event, _context):
    """
    Handles incoming AWS Lambda requests, processes them with the agent,
    and returns appropriate HTTP responses.
    """
    # Handle CORS preflight requests for API Gateway
    http_method = event.get("httpMethod") or event.get("requestContext", {}).get(
        "http", {}
    ).get("method")
    if http_method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    try:
        body_str = event.get("body", "{}")
        if body_str is None:  # body can be None
            body_str = "{}"
        body = json.loads(body_str)
        prompt = body.get("prompt")
        messages = body.get("messages", [])

        agent = create_agent(messages=messages)

        if not prompt:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": json.dumps({"error": "No prompt received in request body"}),
            }

        res = agent(prompt)

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "text/plain",
            },
            "body": str(res),
        }

    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({"error": "Invalid JSON format in request body"}),
        }
    except ValueError as e:
        # Catch specific exceptions if possible, e.g., for agent-related errors
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({"error": str(e)}),
        }
    except Exception as e:  # pylint: disable=broad-exception-caught
        # Fallback for any other unexpected exceptions
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({"error": f"An unexpected error occurred: {e}"}),
        }
