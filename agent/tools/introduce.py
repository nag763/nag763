"""
This module provides a tool to introduce Loïc.
"""

from strands import tool


@tool
def introduce() -> dict:
    """
    Provides a structured introduction of Loïc, a Fullstack Software Engineer.

    Use this tool to retrieve detailed profile information about Loïc, including
    his current role, location, skills, and a summary. The data is structured to
    support flexible presentation formats.

    Returns:
        dict:
            status (str): The status of the request. "success" if the tool executes correctly.
            introduction (dict):
                name (str): Full name.
                age (int): Age in years.
                title (str): Professional title or role.
                location (str): City and country where Loïc is based.
                company (str): Current employer.
                description (str): Role description.
                skills (list of str): Technical skills and areas of expertise.
                summary (str): A prewritten natural-language summary for conversational use.
    """

    # Profile data
    name = "Loïc"
    age = 27
    title = "Fullstack Software Engineer"
    location = "Esbjerg, Denmark"
    company = "TotalEnergies"
    description = "Developing internal applications to streamline operations and improve workflows"
    skills = ["Python", "JavaScript", "React", "AWS", "Docker"]

    # Summary for use in chat or conversational UI
    summary = (
        f"{name} is a {title} based in {location}. Currently at {company}, "
        f"he focuses on {description.lower()}. Skilled in {', '.join(skills)}, "
        f"Loïc blends backend efficiency with frontend finesse to build robust and user-friendly tools."
    )

    return {
        "status": "success",
        "introduction": {
            "name": name,
            "age": age,
            "title": title,
            "location": location,
            "company": company,
            "description": description,
            "skills": skills,
            "summary": summary,
        },
    }
