"""
RAG Gemini Agent implementation.
"""
from typing import List, Dict, Any, Optional

from rag_gemini_agent.vector_store import VectorStore
from rag_gemini_agent.gemini_client import GeminiClient
from rag_gemini_agent.config import RETRIEVAL_TOP_K


class RAGGeminiAgent:
    """RAG Gemini Agent for answering questions with retrieval-augmented generation."""

    def __init__(self, collection_name: str = "documents"):
        """Initialize the RAG Gemini Agent.
        
        Args:
            collection_name: Name of the collection to use.
        """
        self.vector_store = VectorStore(collection_name=collection_name)
        self.gemini_client = GeminiClient()
        self.conversation_history = []
    
    def add_documents(self, texts: List[str], metadatas: Optional[List[Dict[str, Any]]] = None) -> List[str]:
        """Add documents to the vector store.
        
        Args:
            texts: List of texts to add.
            metadatas: Optional list of metadata for each text.
            
        Returns:
            List of document IDs.
        """
        return self.vector_store.add_texts(texts, metadatas=metadatas)
    
    def query(self, query: str, use_react: bool = True, use_history: bool = True) -> str:
        """Query the agent.
        
        Args:
            query: User query.
            use_react: Whether to use ReAct prompting.
            use_history: Whether to use conversation history.
            
        Returns:
            Agent response.
        """
        # Retrieve relevant documents
        context = self.vector_store.similarity_search(query, k=RETRIEVAL_TOP_K)
        
        # Generate response
        if use_react:
            response = self.gemini_client.generate_with_react(query, context)
        else:
            response = self.gemini_client.generate_with_context(query, context)
        
        # Update conversation history
        if use_history:
            self.conversation_history.append({
                "role": "user",
                "content": query
            })
            self.conversation_history.append({
                "role": "assistant",
                "content": response
            })
        
        return response
    
    def clear_history(self) -> None:
        """Clear conversation history."""
        self.conversation_history = []
    
    def clear_documents(self) -> None:
        """Clear all documents from the vector store."""
        self.vector_store.clear()
