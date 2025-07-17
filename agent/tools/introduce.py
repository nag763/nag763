"""
This module provides a tool to introduce Loïc.
"""

from strands import tool


@tool
def introduce() -> dict:
    """Provides a brief introduction of Loïc.

    Returns:
        dict:
            status (str): The status of the request.
            introduction (dict): The introduction of Loïc.
    """
    return {
        "status": "success",
        "introduction": {
            "name": "Loïc",
            "age": 27,
            "location": "Denmark",
            "occupation": "Software Engineer",
            "skills": [
                "Python",
                "Java",
                "GCP",
                "Javascript",
                "Rust",
                "Docker",
                "AWS",
                "Azure",
            ],
            "interests": ["cloud related technologies", "open source"],
        },
    }
