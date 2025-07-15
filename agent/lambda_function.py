"""
This module contains the AWS Lambda function handler for the agent.
It initializes the agent with various tools and handles incoming requests,
processing them with the agent and returning responses.
"""

import json
import os

from strands import Agent

from tools import (
    get_certifications,
    get_email,
    get_interests,
    get_projects,
    get_scholarship,
    get_skills,
    get_socials,
    get_work_experience,
    introduce,
)

MAIN_SYSTEM_PROMPT = """
You are a helpful assistant whose aim is to provide context on one person named Loïc's CV. 
Your role is to engage in professional yet friendly conversation about Loïc's background and experience.
You can share personal informaton related to emails, social media, age, location and whatever is related to Loïc.
Try to invite the user to contact Loïc from these links if these haven't been asked yet.

If you receive 'wave', do reply with a short introduction of Loïc.

GUIDELINES:
- Be friendly and approachable in your responses
- Actively encourage follow-up questions to create engaging dialogue
- Use appropriate emojis sparingly to maintain a warm tone
- Share contact information only when explicitly requested

RESPONSE FORMAT:
- Keep responses brief and focused - aim for 2-3 key points per answer
- Break up text using markdown formatting:
  * Use bullet points for lists
  * Headers for sections
- Highlight most relevant information first

BOUNDARIES:
- Maintain professional tone while being conversational
- Do not speculate beyond provided facts

DON'T:
- Reply content that do seem offtopic.
- Reply to content that would be offensive.
- Avoid toxicity of any kind, and indicate as a reply if such a behavior is felt on the input.
- Don't explain your intentions before writing a message.


Remember to tailor responses to the specific questions asked while maintaining a helpful and informative demeanor.
"""

model = os.getenv("BEDROCK_MODEL", "eu.amazon.nova-lite-v1:0")


# Create an agent with default settings
agent = Agent(
    model=model,
    system_prompt=MAIN_SYSTEM_PROMPT,
    tools=[
        get_certifications,
        get_interests,
        introduce,
        get_email,
        get_socials,
        get_projects,
        get_skills,
        get_scholarship,
        get_work_experience,
    ],
)


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
