# Dockerfile

# Base image
# Uses a slim Python image for smaller, more secure containers
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Install dependencies
# Copy requirements.txt first to take advantage of Docker layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all other application code into the container
# The '.' means copy everything from the current host directory (your repo root)
COPY . .

# Expose port 8080 (standard for Cloud Run)
EXPOSE 8080

# Run the app with gunicorn (production-ready server)
# Assumes your main application instance is named 'app' in 'app.py'
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
