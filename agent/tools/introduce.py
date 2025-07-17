"""
This module provides a tool to introduce Loïc.
"""

from strands import tool

from tools.scholarship import graduation_list
from tools.work_experience import work_experiences
from tools.skills import skills
from tools.links_and_contact import links, EMAIL
from tools.certifications import certifications


@tool
def introduce() -> dict:
    """Provides a brief introduction of Loïc.

    Returns:
        dict:
            status (str): The status of the request.
            introduction (dict): The introduction of Loïc.
    """
    latest_work_experience = work_experiences[0]
    latest_graduation = graduation_list[0]

    introduction_text = (
        f"Hello! I'm Loïc, a {latest_work_experience['position']} based in "
        f"{latest_work_experience['location']}. I'm {27} years old. "
        f"I hold an Engineer degree from {latest_graduation['name']} "
        f"({latest_graduation['timeline']}).\n\n"
        f"My professional journey includes roles at companies like "
        f"{latest_work_experience['company']} where I've focused on "
        f"{latest_work_experience['description'].lower()}.\n\n"
        f"I specialize in a variety of technologies, including: {', '.join(skills)}.\n\n"
        f"You can find more about my work and connect with me through these links:\n"
    )

    for platform, url in links.items():
        introduction_text += f"- {platform}: {url}\n"
    introduction_text += f"- Email: {EMAIL}\n\n"
    introduction_text += (
        "Feel free to ask me more about my experiences, skills, or projects!"
    )

    return {
        "status": "success",
        "introduction": introduction_text,
    }
