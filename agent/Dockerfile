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


# Install ADK - Start
RUN pip install google-adk

# Copy agent - Start

COPY ./assistant /app/assistant

ENV GOOGLE_GENAI_USE_VERTEXAI=1
ENV GOOGLE_CLOUD_PROJECT=nag763
ENV GOOGLE_CLOUD_LOCATION=europe-west1

# Set up environment variables - End
# Copy agent - End

EXPOSE 8000


CMD ["adk", "api_server", "--allowed_origins", "https://loic.labeye.info", "--allowed_origins", "https://labeye.info", "./assistant"]