"""
Unit 3: Search Index Service
Creates and manages OpenSearch indices for text and image embeddings.
"""

import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
import logging
from typing import List, Dict
import time

logger = logging.getLogger(__name__)


class SearchIndexService:
    """Service for managing OpenSearch indices."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.opensearch_config = config['aws']['opensearch']
        
        # Initialize OpenSearch client
        if self.opensearch_config.get('use_iam_auth', True):
            # Use IAM authentication
            credentials = boto3.Session().get_credentials()
            auth = AWSV4SignerAuth(credentials, config['aws']['region'])
            
            self.client = OpenSearch(
                hosts=[{'host': self.opensearch_config['endpoint'].replace('https://', ''), 
                       'port': 443}],
                http_auth=auth,
                use_ssl=True,
                verify_certs=True,
                connection_class=RequestsHttpConnection
            )
        else:
            # Use basic authentication
            import os
            username = os.getenv('OPENSEARCH_USERNAME') or self.opensearch_config.get('username')
            password = os.getenv('OPENSEARCH_PASSWORD') or self.opensearch_config.get('password')
            
            if not username or not password:
                raise ValueError("OpenSearch credentials not found in environment or config")
            
            self.client = OpenSearch(
                hosts=[self.opensearch_config['endpoint']],
                http_auth=(username, password),
                use_ssl=True,
                verify_certs=True
            )
        
        self.text_index = self.opensearch_config['indices']['text_index']
        self.image_index = self.opensearch_config['indices']['image_index']
    
    def create_text_index(self):
        """Create OpenSearch index for text embeddings with KNN."""
        index_body = {
            "settings": {
                "index": {
                    "knn": True,
                    "knn.algo_param.ef_search": 512,
                    "number_of_shards": self.config['indexing']['number_of_shards'],
                    "number_of_replicas": self.config['indexing']['number_of_replicas'],
                    "refresh_interval": self.config['indexing']['refresh_interval']
                }
            },
            "mappings": {
                "properties": {
                    "variant_id": {"type": "keyword"},
                    "product_id": {"type": "keyword"},
                    "variant_name": {
                        "type": "text",
                        "fields": {"keyword": {"type": "keyword"}}
                    },
                    "product_name": {
                        "type": "text",
                        "fields": {"keyword": {"type": "keyword"}}
                    },
                    "description": {"type": "text"},
                    "aggregated_text": {"type": "text"},
                    "price": {"type": "float"},
                    "currency": {"type": "keyword"},
                    "product_type": {"type": "keyword"},
                    "frontend_category": {"type": "keyword"},
                    "frontend_subcategory": {"type": "keyword"},
                    "backend_category": {"type": "keyword"},
                    "review_count": {"type": "integer"},
                    "review_rating": {"type": "float"},
                    "collection": {"type": "keyword"},
                    "color_tone": {"type": "keyword"},
                    "material": {"type": "keyword"},
                    "other_properties": {"type": "text"},
                    "variant_url": {"type": "keyword"},
                    "stock_status": {"type": "keyword"},
                    "lifecycle_status": {"type": "keyword"},
                    "text_embedding": {
                        "type": "knn_vector",
                        "dimension": self.config['aws']['bedrock']['text_embedding_dimension'],
                        "method": {
                            "name": "hnsw",
                            "space_type": "l2",
                            "engine": "nmslib",
                            "parameters": {
                                "ef_construction": self.config['indexing']['knn']['ef_construction'],
                                "m": self.config['indexing']['knn']['m']
                            }
                        }
                    },
                    "images": {"type": "object", "enabled": False},
                    "properties": {"type": "object", "enabled": False},
                    "options": {"type": "object", "enabled": False},
                    "affinity": {"type": "object", "enabled": False},
                    "files": {"type": "object", "enabled": False},
                    "metadata": {"type": "object", "enabled": False}
                }
            }
        }
        
        try:
            if self.client.indices.exists(index=self.text_index):
                logger.warning(f"Index {self.text_index} already exists. Deleting...")
                self.client.indices.delete(index=self.text_index)
            
            self.client.indices.create(index=self.text_index, body=index_body)
            logger.info(f"Created text index: {self.text_index}")
            
        except Exception as e:
            logger.error(f"Error creating text index: {str(e)}")
            raise
    
    def create_image_index(self):
        """Create OpenSearch index for image embeddings with KNN."""
        index_body = {
            "settings": {
                "index": {
                    "knn": True,
                    "knn.algo_param.ef_search": 512,
                    "number_of_shards": self.config['indexing']['number_of_shards'],
                    "number_of_replicas": self.config['indexing']['number_of_replicas']
                }
            },
            "mappings": {
                "properties": {
                    "variant_id": {"type": "keyword"},
                    "filename": {"type": "keyword"},
                    "image_url": {"type": "keyword"},
                    "image_type": {"type": "keyword"},
                    "image_position": {"type": "integer"},
                    "is_default": {"type": "boolean"},
                    "image_embedding": {
                        "type": "knn_vector",
                        "dimension": self.config['aws']['bedrock']['image_embedding_dimension'],
                        "method": {
                            "name": "hnsw",
                            "space_type": "l2",
                            "engine": "nmslib",
                            "parameters": {
                                "ef_construction": self.config['indexing']['knn']['ef_construction'],
                                "m": self.config['indexing']['knn']['m']
                            }
                        }
                    },
                    "product_name": {"type": "text"},
                    "price": {"type": "float"}
                }
            }
        }
        
        try:
            if self.client.indices.exists(index=self.image_index):
                logger.warning(f"Index {self.image_index} already exists. Deleting...")
                self.client.indices.delete(index=self.image_index)
            
            self.client.indices.create(index=self.image_index, body=index_body)
            logger.info(f"Created image index: {self.image_index}")
            
        except Exception as e:
            logger.error(f"Error creating image index: {str(e)}")
            raise
    
    def index_products(self, products: List[Dict]):
        """Index products with text embeddings to OpenSearch."""
        batch_size = self.config['indexing']['batch_size']
        
        logger.info(f"Indexing {len(products)} products...")
        
        for i in range(0, len(products), batch_size):
            batch = products[i:i + batch_size]
            
            # Prepare bulk request
            bulk_body = []
            for product in batch:
                # Index action
                bulk_body.append({
                    "index": {
                        "_index": self.text_index,
                        "_id": product['variant_id']
                    }
                })
                # Document
                bulk_body.append(product)
            
            try:
                response = self.client.bulk(body=bulk_body)
                
                if response.get('errors'):
                    logger.error(f"Errors in bulk indexing: {response}")
                else:
                    logger.info(f"Indexed {len(batch)} products ({i + len(batch)}/{len(products)})")
                    
            except Exception as e:
                logger.error(f"Error indexing batch: {str(e)}")
                raise
        
        # Refresh index
        self.client.indices.refresh(index=self.text_index)
        logger.info("Text index refresh complete")
    
    def index_images(self, image_documents: List[Dict]):
        """Index image embeddings to OpenSearch."""
        batch_size = self.config['indexing']['batch_size']
        
        logger.info(f"Indexing {len(image_documents)} images...")
        
        for i in range(0, len(image_documents), batch_size):
            batch = image_documents[i:i + batch_size]
            
            # Prepare bulk request
            bulk_body = []
            for doc in batch:
                # Index action - use image_id if available, otherwise construct from variant_id and position
                doc_id = doc.get('image_id', f"{doc['variant_id']}_{doc['image_position']}")
                bulk_body.append({
                    "index": {
                        "_index": self.image_index,
                        "_id": doc_id
                    }
                })
                # Document
                bulk_body.append(doc)
            
            try:
                response = self.client.bulk(body=bulk_body)
                
                if response.get('errors'):
                    logger.error(f"Errors in bulk indexing: {response}")
                else:
                    logger.info(f"Indexed {len(batch)} images ({i + len(batch)}/{len(image_documents)})")
                    
            except Exception as e:
                logger.error(f"Error indexing batch: {str(e)}")
                raise
        
        # Refresh index
        self.client.indices.refresh(index=self.image_index)
        logger.info("Image index refresh complete")
    
    def get_index_stats(self):
        """Get statistics for both indices."""
        try:
            text_stats = self.client.indices.stats(index=self.text_index)
            image_stats = self.client.indices.stats(index=self.image_index)
            
            return {
                'text_index': {
                    'name': self.text_index,
                    'doc_count': text_stats['_all']['primaries']['docs']['count'],
                    'size': text_stats['_all']['primaries']['store']['size_in_bytes']
                },
                'image_index': {
                    'name': self.image_index,
                    'doc_count': image_stats['_all']['primaries']['docs']['count'],
                    'size': image_stats['_all']['primaries']['store']['size_in_bytes']
                }
            }
        except Exception as e:
            logger.error(f"Error getting index stats: {str(e)}")
            return {}


def main():
    """Test the index service."""
    import yaml
    
    # Load config
    with open('../config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize service
    service = SearchIndexService(config)
    
    # Create indices
    print("Creating text index...")
    service.create_text_index()
    
    print("Creating image index...")
    service.create_image_index()
    
    print("\nIndices created successfully!")
    
    # Get stats
    stats = service.get_index_stats()
    print(f"\nIndex stats:")
    print(f"Text index: {stats.get('text_index', {})}")
    print(f"Image index: {stats.get('image_index', {})}")


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    main()
