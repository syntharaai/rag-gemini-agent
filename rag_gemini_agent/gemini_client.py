"""
Gemini API client for the RAG Gemini Agent.
"""
from typing import List, Dict, Any, Optional

import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

from rag_gemini_agent.config import (
    GOOGLE_API_KEY,
    GEMINI_MODEL,
    GEMINI_TEMPERATURE,
    GEMINI_TOP_P,
    GEMINI_TOP_K,
    GEMINI_MAX_OUTPUT_TOKENS
)


class GeminiClient:
    """Client for interacting with the Gemini API."""

    def __init__(self):
        """Initialize the Gemini client."""
        # Configure the Gemini API
        genai.configure(api_key=GOOGLE_API_KEY)
        
        # Initialize the model
        self.model = genai.GenerativeModel(
            model_name=GEMINI_MODEL,
            generation_config={
                "temperature": GEMINI_TEMPERATURE,
                "top_p": GEMINI_TOP_P,
                "top_k": GEMINI_TOP_K,
                "max_output_tokens": GEMINI_MAX_OUTPUT_TOKENS,
            }
        )
        
        # Initialize LangChain integration
        self.langchain_model = ChatGoogleGenerativeAI(
            model=GEMINI_MODEL,
            temperature=GEMINI_TEMPERATURE,
            top_p=GEMINI_TOP_P,
            top_k=GEMINI_TOP_K,
            max_output_tokens=GEMINI_MAX_OUTPUT_TOKENS,
            google_api_key=GOOGLE_API_KEY,
        )
    
    def generate_text(self, prompt: str) -> str:
        """Generate text using the Gemini API.
        
        Args:
            prompt: Prompt to generate text from.
            
        Returns:
            Generated text.
        """
        response = self.model.generate_content(prompt)
        return response.text
    
    def generate_with_context(self, query: str, context: List[Dict[str, Any]]) -> str:
        """Generate text with context using the Gemini API.
        
        Args:
            query: User query.
            context: List of context documents.
            
        Returns:
            Generated text.
        """
        # Format context
        formatted_context = "\n\n".join([
            f"Document {i+1}:\n{doc['content']}"
            for i, doc in enumerate(context)
        ])
        
        # Create prompt
        prompt = f"""
        Answer the following question based on the provided context. If the context doesn't contain 
        relevant information, say so and provide a general response based on your knowledge.
        
        Question: {query}
        
        Context:
        {formatted_context}
        
        Answer:
        """
        
        return self.generate_text(prompt)
    
    def generate_with_react(self, query: str, context: Optional[List[Dict[str, Any]]] = None) -> str:
        """Generate text using ReAct prompting.
        
        Args:
            query: User query.
            context: Optional list of context documents.
            
        Returns:
            Generated text.
        """
        # Format context if provided
        context_str = ""
        if context:
            context_str = "\n\n".join([
                f"Document {i+1}:\n{doc['content']}"
                for i, doc in enumerate(context)
            ])
            context_str = f"\nContext:\n{context_str}"
        
        # Create ReAct prompt
        prompt = f"""
        You are an AI assistant that can search for information and reason step by step.
        Follow this format:
        
        Thought: Think about how to solve the problem.
        Action: Decide what action to take, if any.
        Observation: Observe the results of the action.
        ... (repeat Thought/Action/Observation as needed)
        Final Answer: The final answer to the original question.
        
        Question: {query}
        {context_str}
        
        Thought:
        """
        
        return self.generate_text(prompt)
