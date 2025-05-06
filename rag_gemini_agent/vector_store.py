"""
Vector store module for the RAG Gemini Agent.
"""
import os
from typing import List, Dict, Any, Optional

import chromadb
from chromadb.config import Settings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

from rag_gemini_agent.config import CHROMA_PERSIST_DIRECTORY, CHUNK_SIZE, CHUNK_OVERLAP


class VectorStore:
    """Vector store for document retrieval."""

    def __init__(self, collection_name: str = "documents"):
        """Initialize the vector store.
        
        Args:
            collection_name: Name of the collection to use.
        """
        self.collection_name = collection_name
        
        # Create directory if it doesn't exist
        os.makedirs(CHROMA_PERSIST_DIRECTORY, exist_ok=True)
        
        # Initialize embeddings
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )
        
        # Initialize vector store
        self.vector_store = Chroma(
            collection_name=collection_name,
            embedding_function=self.embeddings,
            persist_directory=CHROMA_PERSIST_DIRECTORY
        )
        
        # Initialize text splitter
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP
        )
    
    def add_texts(self, texts: List[str], metadatas: Optional[List[Dict[str, Any]]] = None) -> List[str]:
        """Add texts to the vector store.
        
        Args:
            texts: List of texts to add.
            metadatas: Optional list of metadata for each text.
            
        Returns:
            List of document IDs.
        """
        # Split texts into chunks
        chunks = self.text_splitter.create_documents(texts, metadatas=metadatas)
        
        # Add chunks to vector store
        return self.vector_store.add_documents(chunks)
    
    def similarity_search(self, query: str, k: int = 5) -> List[Dict[str, Any]]:
        """Search for similar documents.
        
        Args:
            query: Query string.
            k: Number of documents to return.
            
        Returns:
            List of documents with similarity scores.
        """
        docs = self.vector_store.similarity_search_with_score(query, k=k)
        
        # Format results
        results = []
        for doc, score in docs:
            results.append({
                "content": doc.page_content,
                "metadata": doc.metadata,
                "score": score
            })
        
        return results
    
    def clear(self) -> None:
        """Clear the vector store."""
        self.vector_store.delete_collection()
        self.vector_store = Chroma(
            collection_name=self.collection_name,
            embedding_function=self.embeddings,
            persist_directory=CHROMA_PERSIST_DIRECTORY
        )
