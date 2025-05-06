"""
FastAPI application for the RAG Gemini Agent.
"""
import os
from typing import List, Dict, Any, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from rag_gemini_agent.agent import RAGGeminiAgent

# Load environment variables
load_dotenv()

# Check if API key is set
if not os.getenv("GOOGLE_API_KEY"):
    raise ValueError("Please set the GOOGLE_API_KEY environment variable in your .env file.")

# Initialize the agent
agent = RAGGeminiAgent(collection_name="api")

# Initialize FastAPI app
app = FastAPI(
    title="RAG Gemini Agent API",
    description="API for interacting with a RAG-powered Gemini agent",
    version="0.1.0"
)

# Define request and response models
class DocumentInput(BaseModel):
    """Input model for adding documents."""
    texts: List[str]
    metadatas: Optional[List[Dict[str, Any]]] = None

class QueryInput(BaseModel):
    """Input model for querying the agent."""
    query: str
    use_react: bool = True
    use_history: bool = True

class QueryResponse(BaseModel):
    """Response model for agent queries."""
    response: str

@app.post("/documents", response_model=List[str])
async def add_documents(document_input: DocumentInput):
    """Add documents to the vector store.
    
    Args:
        document_input: Documents to add.
        
    Returns:
        List of document IDs.
    """
    try:
        return agent.add_documents(document_input.texts, document_input.metadatas)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query", response_model=QueryResponse)
async def query(query_input: QueryInput):
    """Query the agent.
    
    Args:
        query_input: Query parameters.
        
    Returns:
        Agent response.
    """
    try:
        response = agent.query(
            query_input.query,
            use_react=query_input.use_react,
            use_history=query_input.use_history
        )
        return QueryResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/history")
async def clear_history():
    """Clear conversation history."""
    try:
        agent.clear_history()
        return {"message": "Conversation history cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/documents")
async def clear_documents():
    """Clear all documents from the vector store."""
    try:
        agent.clear_documents()
        return {"message": "Documents cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
