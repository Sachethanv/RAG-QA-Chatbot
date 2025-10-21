import os
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import tempfile

# LangChain and Gemini Imports
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import LLMChain

import os

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")







# Remove the dotenv import and load function, and the ValueError check
# from dotenv import load_dotenv
# load_dotenv()


# if not os.getenv("GOOGLE_API_KEY"):
#     raise ValueError("GOOGLE_API_KEY not found in environment variables. Create a .env file.")

# Initialize the Gemini Model
# LLM = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2)

# --- Configuration ---
app = Flask(__name__)
# Flask will handle temporary file storage using tempfile.
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB limit (Matches frontend)


# Initialize the Gemini Model
# We use a lower temperature for summarization to keep it focused and factual.
LLM = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.2
    
)


@app.route("/check-key")
def check_key():
    key = os.environ.get("GEMINI_API_KEY")
    if key:
        return "API key is loaded ✅"
    else:
        return "API key missing ❌"

# --- Utility Functions ---

def get_pdf_text(file_path):
    """Loads PDF and extracts all text using PyPDFLoader."""
    try:
        # Use a temporary file path
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        # Join all page contents into one string
        text = " ".join(page.page_content for page in pages)
        return text
    except Exception as e:
        app.logger.error(f"Error loading/extracting PDF: {e}")
        return None

def get_rag_summary(pdf_text, query):
    """
    Uses LangChain to process the text and get a query-specific summary from Gemini.
    
    A text splitter is used to ensure the text fits within the model's context window.
    We'll only use the first few chunks for the context.
    """
    
    # 1. Chunking 
    # Splits the large document into smaller parts
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=12000, # Increased chunk size for better context
        chunk_overlap=1500,
        length_function=len
    )
    chunks = text_splitter.split_text(pdf_text)
    
    # Use the first few chunks as context (adjust based on document size/quality)
    # The first 3 chunks are usually enough to cover an abstract or key intro/conclusion.
    context = "\n\n".join(chunks[:4]) 
    
    # 2. Prompt Template
    prompt_template = """
    You are an expert document analyst. Your task is to analyze the provided document text and provide a concise, factual, and accurate answer to the user's query.

    The user is asking about a PDF document. Base your response ONLY on the provided text.
    If the text does not contain the answer, state that clearly.
    
    DOCUMENT TEXT (Start of Document):
    ---
    {context}
    ---
    
    USER QUERY: "{query}"
    
    ANSWER:
    """
    
    prompt = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "query"]
    )
    
    # 3. LLM Chain
    llm_chain = LLMChain(prompt=prompt, llm=LLM)
    
    response = llm_chain.invoke({
        "context": context,
        "query": query
    })

    return response['text'].strip()

# --- Flask Routes ---

@app.route('/', methods=['GET'])
def index():
    """Serves the main HTML page from the 'templates' folder."""
    return render_template('index.html') 

@app.route('/summarize', methods=['POST'])
def summarize():
    """Handles file upload and AI summarization request."""
    
    # 1. Input Validation (CORRECTED: Key is 'file' not 'pdf_file')
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request."}), 400
    if 'query' not in request.form:
        return jsonify({"error": "No query provided in the request."}), 400

    pdf_file = request.files['file'] # CORRECTED: Use 'file'
    query = request.form['query']

    if pdf_file.filename == '' or not pdf_file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Please select a valid PDF file."}), 400

    temp_file_path = None
    try:
        # 2. Save the file temporarily
        # Using tempfile is crucial for clean handling of uploads
        temp_file_descriptor, temp_file_path = tempfile.mkstemp(suffix='.pdf')
        os.close(temp_file_descriptor) # Close the file descriptor, as Flask will use the path
        pdf_file.save(temp_file_path)
        
        app.logger.info(f"File saved temporarily at: {temp_file_path}")

        # 3. Process PDF (Text Extraction)
        pdf_text = get_pdf_text(temp_file_path)
        
        if not pdf_text or len(pdf_text.strip()) < 50:
            return jsonify({"error": "Could not extract sufficient text from PDF. File might be scanned/encrypted."}), 500

        # 4. Get Summary from Gemini
        summary_text = get_rag_summary(pdf_text, query)
        
        return jsonify({"summary": summary_text})

    except Exception as e:
        app.logger.error(f"A critical error occurred during summarization: {e}")
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
    
    finally:
        # 5. Cleanup temporary file
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            app.logger.info(f"Temporary file deleted: {temp_file_path}")


if __name__ == '__main__':
    # To run this app, make sure you have your dependencies installed
    # and the 'templates/index.html' file in place.
    # Run with: python app.py
    print("Starting Flask server...")
    app.run(debug=True)