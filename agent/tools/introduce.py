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
    latest_graduation = {
        "name": "ESIGELEC Rouen",
        "timeline": "2021-2016",
    }
    skills = [
        "Python", "JavaScript", "React", "Node.js", "NextJS", "FastAPI", "Azure", "Git", "GitHub", "Confluence",
        "Java", "AWS", "IBM", "Websphere", "Spring", "Spring Boot", "Java EE", "DB2", "Jenkins", "Jira",
        "MySQL", "PostgreSQL", "Tomcat", "SVN", "Django", "DRF", "Trello", "GCP", "Rust", "Docker", "Axum", "WASM"
    ]
    links = {
        "GitHub": "https://github.com/nag763",
        "LinkedIn": "https://www.linkedin.com/in/labeyel/",
        "credly": "https://www.credly.com/users/loic-labeye",
        "personal_site": "https://labeye.info/",
        "ms_credentials": "https://learn.microsoft.com/en-us/users/llabeye/",
        "exercism": "https://learn.microsoft.com/en-us/users/llabeye/",
        "Medium": "https://medium.com/@loic.labeye",
    }
    EMAIL = "loic.labeye.contact@pm.me"

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
