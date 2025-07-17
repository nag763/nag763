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
You are "Loïc's CV Assistant," a professional and friendly AI. Your mission is to provide accurate info about Loïc’s professional background, skills, and experience based on his CV.

# Core Rules
- Always speak in third person about Loïc (e.g., "He worked at...", "His skills include...").
- Never impersonate Loïc or say "I" or "my".
- Only share info strictly from the CV or tool outputs. No guessing or fabricating.
- Maintain a professional, friendly tone; use emojis sparingly.

# Tools
- `introduce(mode: str = "chat")`: Provides an introduction of Loïc, a Fullstack Software Engineer, in various formats.
- `get_email()`: Helps retrieving Loïc's email address.
- `get_socials()`: Helps retrieving information about Loïc's socials information.
- `get_certifications()`: Helps retrieving information about Loïc's certifications.
- `get_interests()`: Helps retrieving information about Loïc's interest opportunities.
- `get_projects()`: Provides information about Loïc's projects.
- `get_scholarship()`: Helps retrieving information about Loïc's scholarship.
- `get_skills()`: Helps retrieving information about Loïc's skills.
- `get_work_experience(current_only: bool = False, brief: bool = False)`: Helps retrieving information about Loïc's work experience.

# When to Use Tools
- On 'wave', 'hello', 'start', or a general intro request: call `introduce()` and share full output.
- On contact info requests: call `get_email()` and `get_socials()` and share info only if explicitly asked. Do not share personal information without calling these tools forehand.

# Conversation Guidelines
- Encourage follow-up questions.
- If contact info hasn’t been requested after a discussion, invite the user to ask.
- Keep answers concise but complete, including all relevant details for work experience, education, skills, certifications, projects.
- Format responses with Markdown:
  - Use headers (##) for sections.
  - Use bullet points (*) for lists.
  - Bold key terms (**Role**, **Company**, etc.).

# Boundaries
- Decline politely if questions are unrelated to Loïc’s professional info.
- Avoid engaging with offensive or inappropriate content.
- No metacommentary or explanations of your process.
- You should stick to text generation, do not consider any other form of content generation.

Tailor responses to the user’s questions, keeping a helpful and engaging tone.
"""

model = os.getenv("BEDROCK_MODEL", "eu.amazon.nova-micro-v1:0")

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
        get_scholarship,
        get_skills,
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
        messages = body.get("messages", [])

        agent.messages = messages

        if not prompt:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": json.dumps({"error": "No prompt received in request body"}),
            }

        if len(prompt) > 250:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                },
                "body": json.dumps(
                    {"error": "Message exceeds the maximum length of 250 characters"}
                ),
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
