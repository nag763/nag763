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
    latest_work_experience = {
        "company": "TotalEnergies",
        "position": "Fullstack Software Engineer",
        "location": "Esbjerg, Denmark",
        "description": "Developing internal applications for the company.",
    }
    skills = ["Python", "JavaScript", "React", "AWS", "Docker"]

    introduction_text = (
        f"Hello! Loïc, is a {latest_work_experience['position']} based in "
        f"{latest_work_experience['location']}. He is {27} years old. "
        f"His professional journey includes roles at companies like "
        f"{latest_work_experience['company']} where he is focused on "
        f"{latest_work_experience['description'].lower()}.\n\n"
        f"He is specialized in a variety of technologies, including: {', '.join(skills)}.\n\n"
        "Feel free to ask me more about my experiences, skills, or projects!"
    )

    return {
        "status": "success",
        "introduction": introduction_text,
    }
