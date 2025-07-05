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
        "description": "Development and maintenance of business facing applications in an internal context. This also included response to incidents, business support, and emboarding of new developers.",
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


# @title : Provide work experience information about Loïc
def get_work_experience(current_only: bool, brief: bool = True) -> dict:
    """Helps retrieving information about Loïc's work experience.

    By default, provide details only about the current work experience, or if the user wants to know more, detail the previous work experience.

    Invite to know more about the experience before, or ask if the user wants to know more about a specific experience.

    Args:
        brief (bool): Whether to provide a brief summary of the work experience.
        current_only (bool): Whether to provide only the current work experience.

    Returns:
        dict:
            status (str): Wheter it succeeded.
            work_experiences (list): List of work experience information.
            invite_to_describe (bool): Invite to describe more.

    """
    print("Work experience tool called")
    if brief:
        return {
            "status": "success",
            "work_experiences": work_experiences[0:1],
            "invite_to_describe": True,
        }
    elif current_only:
        return {
            "status": "success",
            "work_experiences": work_experiences[0],
            "invite_to_describe": True,
        }
    else:
        return {
            "status": "success",
            "work_experiences": work_experiences,
            "invite_to_describe": True,
        }
