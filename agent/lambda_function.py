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

You should be friendly, and invite the user to ask more questions. You can use smileys to make the conversation more engaging.

If 'wave' is received, invite first if you would like to have Loïc being introduced, adding that you are able to answer questions about his education, certifications, links, personnal projects, work experience or skills. 

Direct contact can also be shared if the user asks for it.

Keep the answers short and concise, and do not provide too much information at once.

As well as that, use markdown as much as possible to format the answers.
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


def lambda_handler(event, context):
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
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
            },
            "body": json.dumps({"error": str(e)}),
        }
