"""
Configuration module for the RAG Gemini Agent.
"""
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable is not set. Please set it in your .env file.")

# Vector Database Configuration
CHROMA_PERSIST_DIRECTORY = os.getenv("CHROMA_PERSIST_DIRECTORY", "./chroma_db")

# Gemini Model Configuration
GEMINI_MODEL = "gemini-1.5-pro"  # Can be changed to other Gemini models
GEMINI_TEMPERATURE = 0.2
GEMINI_TOP_P = 0.95
GEMINI_TOP_K = 40
GEMINI_MAX_OUTPUT_TOKENS = 2048

# RAG Configuration
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 200
RETRIEVAL_TOP_K = 5
