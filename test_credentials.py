import os
from langchain_google_genai import ChatGoogleGenerativeAI

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
LLM = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0.2, api_key=GEMINI_API_KEY)

print("GEMINI_API_KEY:", GEMINI_API_KEY)
