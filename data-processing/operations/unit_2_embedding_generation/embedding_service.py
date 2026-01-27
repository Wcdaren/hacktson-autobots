"""
Unit 2: Embedding Generation Service
Generates text and image embeddings using AWS Bedrock Titan models.
"""

import boto3
import json
import base64
import logging
from typing import List, Dict
from concurrent.futures import ThreadPoolExecutor, as_completed

logger = logging.getLogger(__name__)


class EmbeddingService:
    """Service for generating embeddings using AWS Bedrock."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.bedrock_client = boto3.client(
            'bedrock-runtime',
            region_name=config['aws']['region']
        )
        self.text_model_id = config['aws']['bedrock']['text_model_id']
        self.image_model_id = config['aws']['bedrock']['image_model_id']
        self.max_retries = config['aws']['bedrock']['max_retries']
        
    def generate_text_embedding(self, text: str) -> List[float]:
        """Generate embedding for a single text using Bedrock Titan."""
        try:
            # Prepare request
            body = json.dumps({
                "inputText": text
            })
            
            # Call Bedrock
            response = self.bedrock_client.invoke_model(
                modelId=self.text_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            # Parse response
            response_body = json.loads(response['body'].read())
            embedding = response_body.get('embedding', [])
            
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating text embedding: {str(e)}")
            raise
    
    def generate_text_embeddings_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts in parallel."""
        embeddings = []
        batch_size = self.config['embedding_generation']['batch_size']
        max_workers = self.config['embedding_generation']['max_workers']
        
        logger.info(f"Generating embeddings for {len(texts)} texts...")
        
        # Process in batches with parallel workers
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i + batch_size]
            
            with ThreadPoolExecutor(max_workers=max_workers) as executor:
                futures = {executor.submit(self.generate_text_embedding, text): text 
                          for text in batch}
                
                for future in as_completed(futures):
                    try:
                        embedding = future.result()
                        embeddings.append(embedding)
                    except Exception as e:
                        logger.error(f"Failed to generate embedding: {str(e)}")
                        embeddings.append([])  # Empty embedding for failed items
            
            logger.info(f"Processed {min(i + batch_size, len(texts))}/{len(texts)} texts")
        
        return embeddings
    
    def generate_image_embedding(self, image_bytes: bytes) -> List[float]:
        """Generate embedding for a single image using Bedrock Titan."""
        try:
            # Encode image to base64
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            
            # Prepare request
            body = json.dumps({
                "inputImage": image_base64
            })
            
            # Call Bedrock
            response = self.bedrock_client.invoke_model(
                modelId=self.image_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            # Parse response
            response_body = json.loads(response['body'].read())
            embedding = response_body.get('embedding', [])
            
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating image embedding: {str(e)}")
            raise
    
    def generate_query_embedding(self, query: str) -> List[float]:
        """
        Generate embedding for a search query.
        This is the same as text embedding but kept separate for clarity.
        """
        return self.generate_text_embedding(query)
    
    def enrich_products_with_embeddings(self, products: List[Dict]) -> List[Dict]:
        """
        Add text embeddings to product data.
        Returns products with 'text_embedding' field added.
        """
        logger.info(f"Generating embeddings for {len(products)} products...")
        
        # Extract aggregated text from all products
        texts = [p['aggregated_text'] for p in products]
        
        # Generate embeddings
        embeddings = self.generate_text_embeddings_batch(texts)
        
        # Add embeddings to products
        for product, embedding in zip(products, embeddings):
            product['text_embedding'] = embedding
        
        logger.info("Text embeddings added to all products")
        return products
    
    def generate_image_embeddings_for_products(self, products: List[Dict], 
                                               s3_client=None) -> List[Dict]:
        """
        Generate image embeddings for all product images.
        Note: This requires downloading images from URLs.
        For hackathon, we'll skip this and generate on-demand during image search.
        """
        logger.warning("Image embedding generation not implemented in batch mode")
        logger.warning("Image embeddings will be generated on-demand during search")
        return products


def main():
    """Test the embedding service."""
    import yaml
    
    # Load config
    with open('../config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize service
    service = EmbeddingService(config)
    
    # Test text embedding
    test_text = "Modern grey fabric sofa with wooden legs"
    print(f"Generating embedding for: {test_text}")
    
    embedding = service.generate_text_embedding(test_text)
    print(f"Embedding dimension: {len(embedding)}")
    print(f"First 5 values: {embedding[:5]}")
    
    # Test query embedding
    query = "comfortable sofa under $1000"
    print(f"\nGenerating query embedding for: {query}")
    query_embedding = service.generate_query_embedding(query)
    print(f"Query embedding dimension: {len(query_embedding)}")


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    main()
