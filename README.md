# RAG-QA-Chatbot

A RAG-powered (Retrieval-Augmented Generation) QA chatbot using Python, Gemini API, and Google Cloud for PDF and conversational queries.

## Description

This project implements a sophisticated Question-Answering chatbot that leverages RAG architecture to provide accurate responses to queries. The system integrates Google's Gemini API for natural language processing, supports PDF document summarization, and includes a web interface built with HTML. The application is fully containerized using Docker and can be deployed on Google Cloud Platform with automated builds.

## Features

- **RAG Architecture**: Implements Retrieval-Augmented Generation for enhanced accuracy and context-aware responses
- **Local Running Options**: Run locally with Python or use Docker for containerized deployment
- **Gemini API Integration**: Leverages Google's Gemini API for advanced natural language understanding and generation
- **PDF Summarization**: Built-in capability to process and summarize PDF documents using Google Cloud services
- **Dockerized Setup**: Complete Docker configuration for easy deployment and scalability
- **Google Cloud Build Integration**: Automated build and deployment pipeline using cloudbuild.yaml
- **Web Interface**: User-friendly HTML interface for interactive conversations
- **Environment Configuration**: Flexible configuration through environment variables

## Setup

### Prerequisites

- Python 3.8 or higher
- Docker (optional, for containerized deployment)
- Google Cloud Platform account (for cloud deployment)
- Gemini API key

### Installation

#### Option 1: Local Python Setup

1. Clone the repository:
```bash
git clone https://github.com/Sachethanv/RAG-QA-Chatbot.git
cd RAG-QA-Chatbot
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
export GEMINI_API_KEY="your-gemini-api-key"
```

4. Run the application:
```bash
# For web interface
python app.py

# For local command-line interface
python qabot.py
```

#### Option 2: Docker Setup

1. Build the Docker image:
```bash
docker build -t rag-qa-chatbot .
```

2. Run the container:
```bash
docker run -p 8080:8080 -e GEMINI_API_KEY="your-gemini-api-key" rag-qa-chatbot
```

#### Option 3: Google Cloud Deployment

1. Configure your Google Cloud project:
```bash
gcloud config set project YOUR_PROJECT_ID
```

2. Deploy using Cloud Build:
```bash
gcloud builds submit --config cloudbuild.yaml
```

## Usage

### Local Usage

After running `app.py`, access the web interface at `http://localhost:8080` (or the configured port).

For command-line usage with `qabot.py`:
```bash
python qabot.py
# Follow the prompts to ask questions
```

### Gemini API Setup

1. Obtain a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the API key as an environment variable:
   - Linux/Mac: `export GEMINI_API_KEY="your-key"`
   - Windows: `set GEMINI_API_KEY=your-key`
3. Alternatively, configure it in `app.py` or `qabot.py` (see comments in the code)

### Cloud Run

Once deployed to Google Cloud Run, access your application at the provided URL. The service will automatically scale based on demand.

## File/Folder Structure

```
RAG-QA-Chatbot/
├── app.py                  # Main Flask application for web interface
├── qabot.py               # Command-line interface for local testing
├── requirements.txt       # Python dependencies
├── Dockerfile            # Docker configuration for containerization
├── app.yaml              # Google App Engine configuration
├── cloudbuild.yaml       # Google Cloud Build configuration
├── test_credentials.py   # Script to test Google Cloud credentials
├── .gitignore           # Git ignore rules for sensitive files
└── templates/           # HTML templates for web interface
    └── index.html       # Main web interface template
```

### Key Files Explained

- **app.py**: Main application file with Flask server setup and RAG implementation for web deployment
- **qabot.py**: Standalone script for running the chatbot locally via command line
- **Dockerfile**: Contains instructions for building the Docker image
- **cloudbuild.yaml**: Defines the CI/CD pipeline for Google Cloud Build
- **requirements.txt**: Lists all Python package dependencies
- **templates/**: Contains HTML files for the web interface

## Contributing

Contributions are welcome! Please follow these guidelines:

### Coding Style

- Follow PEP 8 style guidelines for Python code
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and modular

### Submitting Issues

1. Check existing issues to avoid duplicates
2. Provide a clear description of the problem
3. Include steps to reproduce (if applicable)
4. Specify your environment (OS, Python version, etc.)

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request with a clear description of changes
6. Ensure all tests pass and code follows style guidelines

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2025 Sachethanv

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Author

**Sachethanv**

- GitHub: [@Sachethanv](https://github.com/Sachethanv)
- Repository: [RAG-QA-Chatbot](https://github.com/Sachethanv/RAG-QA-Chatbot)

---

For questions, issues, or suggestions, please open an issue on GitHub or reach out through the repository.
