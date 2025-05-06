"""
Demo script for the RAG Gemini Agent.
"""
import os
from dotenv import load_dotenv

from rag_gemini_agent.agent import RAGGeminiAgent

# Load environment variables
load_dotenv()

# Check if API key is set
if not os.getenv("GOOGLE_API_KEY"):
    print("Please set the GOOGLE_API_KEY environment variable in your .env file.")
    exit(1)

def main():
    """Run the demo."""
    print("Initializing RAG Gemini Agent...")
    agent = RAGGeminiAgent(collection_name="demo")
    
    # Add sample documents
    print("Adding sample documents...")
    sample_docs = [
        """
        Retrieval-Augmented Generation (RAG) is a technique that enhances large language models
        by retrieving relevant information from external sources before generating a response.
        This helps the model provide more accurate, up-to-date, and contextually relevant answers.
        """,
        """
        Google's Gemini is a family of multimodal large language models developed by Google DeepMind.
        Gemini models are designed to understand and generate text, images, audio, and other modalities.
        The Gemini family includes models of different sizes, such as Gemini Ultra, Gemini Pro, and Gemini Nano.
        """,
        """
        An AI agent is a system that can perceive its environment, make decisions, and take actions
        to achieve specific goals. AI agents typically combine multiple capabilities such as
        natural language understanding, planning, reasoning, and tool use.
        """
    ]
    
    metadatas = [
        {"source": "RAG Documentation", "topic": "RAG"},
        {"source": "Gemini Documentation", "topic": "Gemini"},
        {"source": "AI Agent Documentation", "topic": "AI Agents"}
    ]
    
    agent.add_documents(sample_docs, metadatas=metadatas)
    
    # Interactive query loop
    print("\nRAG Gemini Agent Demo")
    print("Type 'exit' to quit")
    
    while True:
        query = input("\nYour question: ")
        
        if query.lower() in ["exit", "quit", "q"]:
            break
        
        print("\nThinking...")
        response = agent.query(query)
        print(f"\nResponse: {response}")

if __name__ == "__main__":
    main()
