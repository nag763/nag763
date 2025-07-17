"""
This module provides a tool to retrieve information about Loïc's projects.
"""

from strands import tool

projects = {
    "reomir": {
        "name": "Reomir",
        "description": "An AI-powered developer portal for enterprises.",
        "timeline": "2025",
        "stack": [
            "Python",
            "Next.js",
            "Google Cloud",
            "Terraform",
            "Docker",
            "Firestore",
        ],
        "link": "https://github.com/nag763/REOMIR",
    },
    "tchatchers": {
        "name": "Tchatchers",
        "description": "A chat application made in Rust",
        "timeline": "2022-2025",
        "stack": ["Rust", "Tokio", "PostgreSQL", "Redis", "Yew.rs", "Axum", "Docker"],
        "link": "https://github.com/nag763/tchatchers",
    },
    "doteur": {
        "name": "Doteur",
        "description": "A database schema vizualizer made in Rust",
        "timeline": "2022-2025",
        "stack": ["Rust", "Graphviz", "Leptos", "Wasm", "Jekyll"],
        "link": "https://github.com/nag763/doteur",
    },
    "verbihr": {
        "name": "Verbihr",
        "description": "A german verbs learning tool made in Rust",
        "timeline": "2023-2025",
        "stack": ["Rust", "Tokio", "PostgreSQL", "Redis", "Docker"],
        "link": "https://github.com/nag763/verbihr",
    },
    "texas-snake": {
        "name": "Texas Snake",
        "description": "A snake game made in Rust",
        "timeline": "2023",
        "stack": ["Rust", "Bevy", "WASM"],
        "link": "https://github.com/nag763/texas-snake",
    },
}


@tool
def get_projects() -> dict:
    """Provides information about Loïc's projects.

    Returns:
        dict:
            status (str): The status of the request.
            projects (list): List of projects.

    """
    print("Projects tool called")
    return {"status": "success", "projects": projects}
