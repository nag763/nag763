"""
This module provides a tool to introduce Loïc.
"""

from strands import tool


@tool
def introduce(mode: str = "chat") -> dict:
    """
    Provides an introduction of Loïc, a Fullstack Software Engineer, in various formats.

    Use this tool to retrieve information about Loïc depending on the context:
    - "structured": Returns detailed profile fields suitable for UI or logic-based use
    - "chat": Returns a conversational, natural-language summary for chat interfaces
    - "short": Returns a one-line summary for previews or quick listings

    Args:
        mode (str): The output format. Options are:
                    - "structured"
                    - "chat"
                    - "short"
                    Default is "structured".

    Returns:
        dict:
            status (str): "success" if the tool executes correctly, or "error" if mode is invalid.
            response (dict or str): Introduction of Loïc in the requested format.
    """

    # Profile data
    name = "Loïc"
    age = 27
    title = "Fullstack Software Engineer"
    location = "Esbjerg, Denmark"
    company = "TotalEnergies"
    description = "Developing internal applications to streamline operations and improve workflows"
    skills = ["Python", "JavaScript", "React", "AWS", "Docker"]

    # Pre-formatted outputs
    structured = {
        "name": name,
        "age": age,
        "title": title,
        "location": location,
        "company": company,
        "description": description,
        "skills": skills,
        "summary": (
            f"{name} is a {title} based in {location}. Currently at {company}, "
            f"he focuses on {description.lower()}. Skilled in {', '.join(skills)}, "
            f"{name} blends backend efficiency with frontend finesse to build robust and user-friendly tools."
        ),
    }

    chat = (
        f"Hello! 👋\n\n"
        f"Meet **{name}**, a {title} based in {location}. At **{company}**, he’s focused on "
        f"{description.lower()}.\n\n"
        f"Skilled in {', '.join(skills)}, {name} combines backend power with frontend finesse to "
        f"build robust and user-friendly tools.\n\n"
        f"He's especially passionate about **Cloud technologies** and **Generative AI**, and is always exploring ways to leverage them to solve real-world problems.\n\n"
        f"Curious about his work, projects, or background? Feel free to ask — I’m here to help! 🚀"
    )

    short = f"{name} is a {title} based in {location}, currently building internal tools at {company}."

    match mode:
        case "structured":
            return {"status": "success", "response": structured}
        case "chat":
            return {"status": "success", "response": chat}
        case "short":
            return {"status": "success", "response": short}
        case _:
            return {
                "status": "error",
                "response": "Invalid mode. Use 'structured', 'chat', or 'short'.",
            }
