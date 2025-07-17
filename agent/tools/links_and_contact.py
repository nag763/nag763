"""
This module provides tools to retrieve Loïc's social media links and contact information.
"""

from strands import tool


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


@tool
def get_socials() -> dict:
    """Helps retrieving information about Loïc's socials information.

    Returns:
        dict:
            status (str): The status of the request.
            socials (dict): The contact socials.
    """
    print("Contact tool called")
    return {"status": "success", "socials": links}


@tool
def get_email():
    """Helps retrieving Loïc's email address.

    Returns:
        dict:
            status (str): The status of the request.
            email (str): The email address.
    """
    print("Email tool called")
    return {"status": "success", "email": EMAIL}
