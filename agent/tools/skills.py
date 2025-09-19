"""
This module provides a tool to retrieve information about Loïc's skills.
"""

from strands import tool

from tools.work_experience import work_experiences

skills = [
    skill for work_experience in work_experiences for skill in work_experience["skills"]
]

skills += ["GCP", "Rust", "Docker", "Axum", "WASM", "PostgreSQL", "RDS", "DynamoDB", "Azure Tables"]


@tool
def get_skills() -> dict:
    """Helps retrieving information about Loïc's skills.

    Returns:
        dict:
            status (str): The status of the request.
            skills (list): List of skills.

    """
    print("Skills tool called")
    return {"status": "success", "skills": skills}
