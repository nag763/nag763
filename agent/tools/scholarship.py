graduation_list = [
    {
        "name": "ESIGELEC Rouen",
        "type": "Engineering School",
        "degree": "Engineer",
        "timeline": "2021-2016",
        "description": "General engineering degree, with a two years specialization in Software Engineering.",
    },
    {
        "name": "ECAM Brussels",
        "type": "ERASMUS Exchange",
        "timeline": "2019-2020",
        "description": "Erasmus exchange program in Brussels, Belgium. It was a wonderful second experience abroad.",
    },
    {
        "name": "DCU Dublin",
        "type": "ERASMUS Summer Program",
        "timeline": "2017",
        "description": "Erasmus summer program in Dublin, Ireland. It was a great experience to improve my English and meet new people.",
    },
]


from strands import tool


# @title : Provide scholarship information about Loïc
@tool
def get_scholarship() -> dict:
    """Helps retrieving information about Loïc's scholarship.

    Returns:
        dict:
            status (str): The status of the request.
            graduations (list): List of graduation information.

    """
    print("Scholarship tool called")
    return {"status": "success", "graduations": graduation_list}
