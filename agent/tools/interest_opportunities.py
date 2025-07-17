"""
This module provides a tool to retrieve information about Loïc's interest opportunities.
"""

from strands import tool


@tool
def get_interests() -> dict:
    """Helps retrieving information about Loïc's interest opportunities.

    Returns:
        dict:
            status (str): The status of the request.
            interests (dict): The interests of Loïc.
    """
    return {
        "status": "success",
        "interests": {
            "areas": [
                "Cloud Computing",
                "Generative AI",
                "Business critical applications",
                "Regulated industries",
                "Cloud Security",
                "Cloud Architecture",
                "Cloud Migration",
                "Cloud Cost Management",
                "Cloud Optimization",
                "Cloud Operations",
                "Cloud Governance",
                "Cloud Strategy",
                "Cloud Transformation",
            ],
            "ruled_out": [
                "IT Product Management",
                "IT Project Management",
                "IT Service Management",
                "IT Asset Management",
                "IT Change Management",
                "IT Configuration Management",
                "Team Management",
                "Team Leadership",
                "Team Development",
            ],
            "considered_with_business_case": [
                "Development",
                "Operations",
                "DevOps",
                "Software Development",
                "Software Engineering",
            ],
            "location": {
                "preferred": ["On-site (Northern Europe, Western Europe)", "Hybrid"],
                "ruled_out": [
                    "Remote",
                    "On-site (Eastern Europe, Southern Europe, Asia, Africa, North America, South America, Australia)",
                ],
            },
            "non_it_opportunities": "Not of interest",
        },
    }
