links = {
    "GitHub": "https://github.com/nag763",
    "LinkedIn": "https://www.linkedin.com/in/labeyel/",
    "credly": "https://www.credly.com/users/loic-labeye",
    "personal_site": "https://labeye.info/",
    "ms_credentials": "https://learn.microsoft.com/en-us/users/llabeye/",
    "exercism": "https://learn.microsoft.com/en-us/users/llabeye/",
    "Medium": "https://medium.com/@loic.labeye",
}

mail = "loic.labeye.contact@pm.me"


# @title : Provide contact information about Loïc
def get_socials() -> dict:
    """Helps retrieving information about Loïc's socials information.

    Returns:
        dict:
            status (str): The status of the request.
            socials (dict): The contact socials.
    """
    print("Contact tool called")
    return links


def get_email():
    """Provides Loïc's email address.

    This function retrieves the email address of Loïc and returns it in a structured format.

    Returns:
        dict:
            status (str): The status of the request.
            email (str): The email address.
    """
    print("Email tool called")
    return {"status": "success", "email": mail}
