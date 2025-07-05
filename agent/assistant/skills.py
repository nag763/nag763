from assistant.work_experience import work_experiences

skills = [
    skill for work_experience in work_experiences for skill in work_experience["skills"]
]

skills += ["GCP", "Rust", "Docker", "Axum", "WASM"]


# @title : Provide skills information about Loïc
def get_skills() -> dict:
    """Provides information about Loïc's skills.

    This function retrieves the skills from Loïc's work experience and returns them in a structured format.

    Outputs the skills in a list format.

    Returns:
        dict:
            status (str): The status of the request.
            skills (list): List of skills.

    """
    print("Skills tool called")
    return {"status": "success", "skills": skills}
