FROM python:3.12-slim

WORKDIR /app

# Create a non-root user
RUN adduser --disabled-password --gecos "" myuser

# Change ownership of /app to myuser
RUN chown -R myuser:myuser /app

# Switch to the non-root user
USER myuser

# Set up environment variables - Start
ENV PATH="/home/myuser/.local/bin:$PATH"

ENV GOOGLE_GENAI_USE_VERTEXAI=1
ENV GOOGLE_CLOUD_PROJECT=nag763
ENV GOOGLE_CLOUD_LOCATION=europe-west1

# Install ADK - Start
RUN pip install poetry

# Copy agent - Start

COPY . .

# Set up environment variables - End

RUN poetry install --no-root

# Copy agent - End

EXPOSE 8000


ENV ALLOWED_ORIGINS='https://*labeye.info,http://*labeye.info'

CMD ["poetry", "run", "uvicorn", "app:app", "--port", "8080", "--host", "0.0.0.0"]
