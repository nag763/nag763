"""
This module provides a tool to retrieve information about Loïc's work experience.
"""

from strands import tool


work_experiences = [
    {
        "company": "TotalEnergies",
        "position": "Fullstack Software Engineer",
        "start_date": "2025-02-01",
        "end_date": "2026-08-01",
        "location": "Esbjerg, Denmark",
        "description": "Developing internal applications for the company.",
        "skills": [
            "Python",
            "JavaScript",
            "React",
            "Node.js",
            "NextJS",
            "FastAPI",
            "Azure",
            "Git",
            "GitHub",
            "Confluence",
        ],
    },
    {
        "company": "Allianz Trade on behalf of Aubay",
        "position": "Consultant Software Engineer",
        "start_date": "2022-09-01",
        "end_date": "2025-01-01",
        "location": "Paris, France",
        "description": (
            "Development and maintenance of business facing applications in an "
            "internal context. This also included response to incidents, business "
            "support, and emboarding of new developers."
        ),
        "skills": [
            "Java",
            "AWS",
            "IBM",
            "Websphere",
            "Spring",
            "Spring Boot",
            "Java EE",
            "DB2",
            "Jenkins",
            "Git",
            "Jira",
            "Confluence",
        ],
    },
    {
        "company": "Aubay",
        "position": "Intern Software Engineer",
        "start_date": "2022-03-01",
        "end_date": "2022-08-01",
        "location": "Paris, France",
        "description": "Development and maintenance of internal applications.",
        "skills": [
            "Java",
            "Spring",
            "Spring Boot",
            "MySQL",
            "PostgreSQL",
            "Tomcat",
            "Jenkins",
            "SVN",
        ],
    },
    {
        "company": "SustainEcho",
        "position": "Intern Software Engineer",
        "start_date": "2020-07-01",
        "end_date": "2020-09-01",
        "location": "Paris, France",
        "description": "Development of an AI business facing application.",
        "skills": ["Python", "Django", "DRF", "AWS", "Git", "GitHub", "Trello"],
    },
]


@tool
def get_work_experience(current_only: bool = False, brief: bool = False) -> dict:
    """Helps retrieving information about Loïc's work experience.

    Args:
        brief (bool): Whether to provide a brief summary of the work experience.
        current_only (bool): Whether to provide only the current work experience.

    Returns:
        dict:
            status (str): Whether it succeeded.
            work_experiences (list): List of work experience information.
            invite_to_describe (bool): Indicates if more details can be provided.

    """
    print("Work experience tool called")
    if current_only:
        return {
            "status": "success",
            "work_experiences": [work_experiences[0]],
            "invite_to_describe": True,
        }
    if brief:
        return {
            "status": "success",
            "work_experiences": [work_experiences[0]],
            "invite_to_describe": True,
        }
    return {
        "status": "success",
        "work_experiences": work_experiences,
        "invite_to_describe": True,
    }
