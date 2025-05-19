import os

import uvicorn
from fastapi import FastAPI
from google.adk.cli.fast_api import get_fast_api_app

AGENT_DIR = os.path.dirname(os.path.abspath(__file__))
# Set web=True if you intend to serve a web interface, False otherwise

# Call the function to get the FastAPI app instance
app: FastAPI = get_fast_api_app(
    agent_dir=AGENT_DIR,
    web=False,
    allow_origins=["*"]
)


if __name__ == "__main__":
    # Use the PORT environment variable provided by Cloud Run, defaulting to 8080
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))