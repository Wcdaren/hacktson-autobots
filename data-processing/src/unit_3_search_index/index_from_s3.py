"""
Load embeddings from S3 and index to OpenSearch via SSH tunnel.
This script reads pre-generated embeddings from S3 and creates OpenSearch indices.
"""

import boto3
import json
import logging
import yaml
import os
import sys
import time
from pathlib import Path
from typing import List, Dict
from dotenv import load_dotenv
from sshtunnel import SSHTunnelForwarder
from opensearchpy import OpenSearch

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent))

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


class S3EmbeddingLoader:
    """Load embeddings from S3."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.s3_config = config['aws']['s3']
        self.bucket = self.s3_config['bucket']
        
        # Initialize S3 client
        self.s3_client = boto3.client(
            's3',
            region_name=config['aws']['region']
        )
    
    def load_text_embeddings(self) -> List[Dict]:
        """Load text embeddings from S3."""
        prefix = self.s3_config['embeddings']['text_embeddings_prefix']
        filename = self.s3_config['embeddings']['text_embeddings_file']
        s3_key = f"{prefix}{filename}"
        
        logger.info(f"Loading text embeddings from s3://{self.bucket}/{s3_key}")
        
        try:
            response = self.s3_client.get_object(Bucket=self.bucket, Key=s3_key)
            content = response['Body'].read().decode('utf-8')
            
            # Fix NaN values that cause OpenSearch indexing errors
            # Replace NaN with null for proper JSON parsing
            if 'NaN' in content:
                nan_count = content.count('NaN')
                logger.warning(f"Found {nan_count} NaN values in embeddings file, replacing with null")
                content = content.replace('NaN', 'null')
            
            products = json.loads(content)
            
            logger.info(f"✓ Loaded {len(products)} products with text embeddings")
            return products
            
        except Exception as e:
            logger.error(f"Error loading text embeddings from S3: {str(e)}")
            raise
    
    def load_image_embeddings(self) -> List[Dict]:
        """Load image embeddings from S3 (multiple batch files)."""
        prefix = self.s3_config['embeddings']['image_embeddings_prefix']
        pattern = self.s3_config['embeddings']['image_embeddings_pattern']
        
        logger.info(f"Loading image embeddings from s3://{self.bucket}/{prefix}")
        
        try:
            # List all batch files
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket,
                Prefix=prefix
            )
            
            if 'Contents' not in response:
                logger.warning(f"No files found in s3://{self.bucket}/{prefix}")
                return []
            
            # Filter for batch files matching pattern
            batch_files = [
                obj['Key'] for obj in response['Contents']
                if obj['Key'].endswith('.json') and 'batch' in obj['Key']
            ]
            batch_files.sort()
            
            logger.info(f"Found {len(batch_files)} batch files")
            
            all_images = []
            
            for batch_file in batch_files:
                logger.info(f"Loading {batch_file}...")
                
                response = self.s3_client.get_object(Bucket=self.bucket, Key=batch_file)
                content = response['Body'].read().decode('utf-8')
                batch_images = json.loads(content)
                
                all_images.extend(batch_images)
                logger.info(f"  Loaded {len(batch_images)} images")
            
            logger.info(f"✓ Total images loaded: {len(all_images)}")
            return all_images
            
        except Exception as e:
            logger.error(f"Error loading image embeddings from S3: {str(e)}")
            raise


def create_opensearch_client_with_tunnel(config: Dict) -> tuple:
    """
    Create OpenSearch client with SSH tunnel.
    Returns (client, tunnel) tuple.
    """
    opensearch_config = config['aws']['opensearch']
    opensearch_endpoint = opensearch_config['endpoint']
    opensearch_host = opensearch_endpoint.replace('https://', '').replace('http://', '')
    opensearch_port = 443
    
    # SSH tunnel configuration
    jumphost = os.getenv('JUMPHOST', 'jumphost-sg.castlery.com')
    jumphost_user = os.getenv('JUMPHOST_USER', 'autobots')
    ssh_key_path = os.path.expanduser(os.getenv('SSH_KEY_PATH', '~/.ssh/id_rsa'))
    
    logger.info(f"Setting up SSH tunnel to {opensearch_host}:{opensearch_port}")
    logger.info(f"  via {jumphost_user}@{jumphost}")
    
    tunnel = SSHTunnelForwarder(
        (jumphost, 22),
        ssh_username=jumphost_user,
        ssh_pkey=ssh_key_path,
        remote_bind_address=(opensearch_host, opensearch_port),
        local_bind_address=('127.0.0.1', 9200)
    )
    
    tunnel.start()
    logger.info(f"✓ SSH Tunnel established (local port: {tunnel.local_bind_port})")
    
    time.sleep(2)  # Wait for tunnel to stabilize
    
    # Get credentials from environment
    username = os.getenv('OPENSEARCH_USERNAME')
    password = os.getenv('OPENSEARCH_PASSWORD')
    
    if not username or not password:
        raise ValueError("OpenSearch credentials not found in environment variables")
    
    # Create OpenSearch client
    client = OpenSearch(
        hosts=[{'host': '127.0.0.1', 'port': tunnel.local_bind_port}],
        http_auth=(username, password),
        use_ssl=True,
        verify_certs=False,
        ssl_show_warn=False
    )
    
    # Test connection
    info = client.info()
    logger.info(f"✓ OpenSearch connection successful")
    logger.info(f"  Cluster: {info['cluster_name']}")
    logger.info(f"  Version: {info['version']['number']}")
    
    return client, tunnel


def create_text_index(client: OpenSearch, config: Dict, index_name: str):
    """Create OpenSearch index for text embeddings with KNN."""
    index_body = {
        "settings": {
            "index": {
                "knn": True,
                "knn.algo_param.ef_search": 512,
                "number_of_shards": config['indexing']['number_of_shards'],
                "number_of_replicas": config['indexing']['number_of_replicas'],
                "refresh_interval": config['indexing']['refresh_interval']
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
                    "dimension": config['aws']['bedrock']['text_embedding_dimension'],
                    "method": {
                        "name": "hnsw",
                        "space_type": "l2",
                        "engine": "lucene",
                        "parameters": {
                            "ef_construction": config['indexing']['knn']['ef_construction'],
                            "m": config['indexing']['knn']['m']
                        }
                    }
                }
            }
        }
    }
    
    try:
        if client.indices.exists(index=index_name):
            logger.warning(f"Index {index_name} already exists. Deleting...")
            client.indices.delete(index=index_name)
        
        client.indices.create(index=index_name, body=index_body)
        logger.info(f"✓ Created text index: {index_name}")
        
    except Exception as e:
        logger.error(f"Error creating text index: {str(e)}")
        raise


def create_image_index(client: OpenSearch, config: Dict, index_name: str):
    """Create OpenSearch index for image embeddings with KNN."""
    index_body = {
        "settings": {
            "index": {
                "knn": True,
                "knn.algo_param.ef_search": 512,
                "number_of_shards": config['indexing']['number_of_shards'],
                "number_of_replicas": config['indexing']['number_of_replicas']
            }
        },
        "mappings": {
            "properties": {
                # Image-specific fields
                "image_id": {"type": "keyword"},
                "filename": {"type": "keyword"},
                "image_url": {"type": "keyword"},
                "image_type": {"type": "keyword"},
                "image_position": {"type": "integer"},
                "is_default": {"type": "boolean"},
                "image_embedding": {
                    "type": "knn_vector",
                    "dimension": config['aws']['bedrock']['image_embedding_dimension'],
                    "method": {
                        "name": "hnsw",
                        "space_type": "l2",
                        "engine": "lucene",
                        "parameters": {
                            "ef_construction": config['indexing']['knn']['ef_construction'],
                            "m": config['indexing']['knn']['m']
                        }
                    }
                },
                # Product metadata fields (same as text index)
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
                "lifecycle_status": {"type": "keyword"}
            }
        }
    }
    
    try:
        if client.indices.exists(index=index_name):
            logger.warning(f"Index {index_name} already exists. Deleting...")
            client.indices.delete(index=index_name)
        
        client.indices.create(index=index_name, body=index_body)
        logger.info(f"✓ Created image index: {index_name}")
        
    except Exception as e:
        logger.error(f"Error creating image index: {str(e)}")
        raise


def index_products(client: OpenSearch, products: List[Dict], index_name: str, batch_size: int = 100):
    """Index products with text embeddings to OpenSearch."""
    logger.info(f"Indexing {len(products)} products...")
    
    for i in range(0, len(products), batch_size):
        batch = products[i:i + batch_size]
        
        # Prepare bulk request
        bulk_body = []
        for product in batch:
            bulk_body.append({
                "index": {
                    "_index": index_name,
                    "_id": product['variant_id']
                }
            })
            bulk_body.append(product)
        
        try:
            response = client.bulk(body=bulk_body)
            
            if response.get('errors'):
                logger.error(f"Errors in bulk indexing: {response}")
            else:
                logger.info(f"Indexed {len(batch)} products ({i + len(batch)}/{len(products)})")
                
        except Exception as e:
            logger.error(f"Error indexing batch: {str(e)}")
            raise
    
    # Refresh index
    client.indices.refresh(index=index_name)
    logger.info("Text index refresh complete")


def index_images(client: OpenSearch, image_documents: List[Dict], index_name: str, batch_size: int = 100):
    """Index image embeddings to OpenSearch."""
    logger.info(f"Indexing {len(image_documents)} images...")
    
    for i in range(0, len(image_documents), batch_size):
        batch = image_documents[i:i + batch_size]
        
        # Prepare bulk request
        bulk_body = []
        for doc in batch:
            doc_id = doc.get('image_id', f"{doc['variant_id']}_{doc['image_position']}")
            bulk_body.append({
                "index": {
                    "_index": index_name,
                    "_id": doc_id
                }
            })
            bulk_body.append(doc)
        
        try:
            response = client.bulk(body=bulk_body)
            
            if response.get('errors'):
                logger.error(f"Errors in bulk indexing: {response}")
            else:
                logger.info(f"Indexed {len(batch)} images ({i + len(batch)}/{len(image_documents)})")
                
        except Exception as e:
            logger.error(f"Error indexing batch: {str(e)}")
            raise
    
    # Refresh index
    client.indices.refresh(index=index_name)
    logger.info("Image index refresh complete")


def get_index_stats(client: OpenSearch, text_index: str, image_index: str) -> Dict:
    """Get statistics for both indices."""
    try:
        text_stats = client.indices.stats(index=text_index)
        image_stats = client.indices.stats(index=image_index)
        
        return {
            'text_index': {
                'name': text_index,
                'doc_count': text_stats['_all']['primaries']['docs']['count'],
                'size': text_stats['_all']['primaries']['store']['size_in_bytes']
            },
            'image_index': {
                'name': image_index,
                'doc_count': image_stats['_all']['primaries']['docs']['count'],
                'size': image_stats['_all']['primaries']['store']['size_in_bytes']
            }
        }
    except Exception as e:
        logger.error(f"Error getting index stats: {str(e)}")
        return {}


def transform_image_documents(images: List[Dict], products: List[Dict]) -> List[Dict]:
    """
    Transform image embeddings to match OpenSearch index schema.
    Enriches image documents with full product metadata.
    
    Input format:
    {
        "image_id": "36680_1",
        "variant_id": "36680",
        "filename": "36680_1.png",
        "image_embedding": [...]
    }
    
    Output format: Image data + all product metadata fields
    """
    # Create lookup map for products by variant_id
    product_map = {str(p['variant_id']): p for p in products}
    
    transformed = []
    missing_products = 0
    
    for img in images:
        # Extract position from image_id (e.g., "36680_1" -> position 1)
        image_id_parts = img['image_id'].split('_')
        position = int(image_id_parts[-1]) if len(image_id_parts) > 1 else 1
        
        # Get product metadata
        variant_id = str(img['variant_id'])
        product = product_map.get(variant_id)
        
        if not product:
            missing_products += 1
            logger.warning(f"No product found for variant_id: {variant_id}")
            continue
        
        # Create enriched document with image data + all product metadata
        doc = {
            # Image-specific fields
            'image_id': img['image_id'],
            'filename': img['filename'],
            'image_url': img['filename'],
            'image_type': 'product',
            'image_position': position,
            'is_default': (position == 1),
            'image_embedding': img['image_embedding'],
            
            # Copy all product metadata fields
            'variant_id': product['variant_id'],
            'product_id': product['product_id'],
            'variant_name': product['variant_name'],
            'product_name': product['product_name'],
            'description': product['description'],
            'aggregated_text': product['aggregated_text'],
            'price': product['price'],
            'currency': product['currency'],
            'product_type': product['product_type'],
            'frontend_category': product['frontend_category'],
            'frontend_subcategory': product['frontend_subcategory'],
            'backend_category': product['backend_category'],
            'review_count': product['review_count'],
            'review_rating': product['review_rating'],
            'collection': product['collection'],
            'color_tone': product['color_tone'],
            'material': product['material'],
            'other_properties': product['other_properties'],
            'variant_url': product['variant_url'],
            'stock_status': product['stock_status'],
            'lifecycle_status': product['lifecycle_status'],
        }
        
        transformed.append(doc)
    
    if missing_products > 0:
        logger.warning(f"Skipped {missing_products} images with missing product data")
    
    logger.info(f"Transformed {len(transformed)} image documents with full product metadata")
    return transformed


def main():
    """Main indexing pipeline from S3."""
    tunnel = None
    
    try:
        logger.info("=" * 80)
        logger.info("OPENSEARCH INDEXING FROM S3")
        logger.info("=" * 80)
        
        # Load config
        config_path = Path(__file__).parent.parent / 'config.yaml'
        with open(config_path, 'r') as f:
            config = yaml.safe_load(f)
        
        # Override config from environment
        if os.getenv('S3_BUCKET_NAME'):
            config['aws']['s3']['bucket'] = os.getenv('S3_BUCKET_NAME')
        
        text_index = config['aws']['opensearch']['indices']['text_index']
        image_index = config['aws']['opensearch']['indices']['image_index']
        
        # Step 1: Initialize services
        logger.info("\n" + "=" * 80)
        logger.info("STEP 1: Initializing Services")
        logger.info("=" * 80)
        
        s3_loader = S3EmbeddingLoader(config)
        
        logger.info(f"S3 Bucket: {config['aws']['s3']['bucket']}")
        logger.info(f"Text Index: {text_index}")
        logger.info(f"Image Index: {image_index}")
        
        # Step 2: Create SSH tunnel and OpenSearch client
        logger.info("\n" + "=" * 80)
        logger.info("STEP 2: Establishing SSH Tunnel & OpenSearch Connection")
        logger.info("=" * 80)
        
        client, tunnel = create_opensearch_client_with_tunnel(config)
        
        # Step 3: Create indices
        logger.info("\n" + "=" * 80)
        logger.info("STEP 3: Creating OpenSearch Indices")
        logger.info("=" * 80)
        
        logger.info("Creating text index...")
        create_text_index(client, config, text_index)
        
        logger.info("Creating image index...")
        create_image_index(client, config, image_index)
        
        # Step 4: Load embeddings from S3
        logger.info("\n" + "=" * 80)
        logger.info("STEP 4: Loading Embeddings from S3")
        logger.info("=" * 80)
        
        products = s3_loader.load_text_embeddings()
        images = s3_loader.load_image_embeddings()
        
        # Step 5: Transform image documents
        logger.info("\n" + "=" * 80)
        logger.info("STEP 5: Transforming Image Documents")
        logger.info("=" * 80)
        
        image_documents = transform_image_documents(images, products)
        
        # Step 6: Index to OpenSearch
        logger.info("\n" + "=" * 80)
        logger.info("STEP 6: Indexing to OpenSearch")
        logger.info("=" * 80)
        
        logger.info("Indexing text embeddings...")
        index_products(client, products, text_index, config['indexing']['batch_size'])
        logger.info(f"✓ Indexed {len(products)} products")
        
        logger.info("\nIndexing image embeddings...")
        index_images(client, image_documents, image_index, config['indexing']['batch_size'])
        logger.info(f"✓ Indexed {len(image_documents)} images")
        
        # Step 7: Get index stats
        logger.info("\n" + "=" * 80)
        logger.info("STEP 7: Index Statistics")
        logger.info("=" * 80)
        
        stats = get_index_stats(client, text_index, image_index)
        
        print("\n" + "=" * 80)
        print("INDEXING COMPLETE")
        print("=" * 80)
        print(f"\nText Index: {stats.get('text_index', {}).get('name', 'N/A')}")
        print(f"  Documents: {stats.get('text_index', {}).get('doc_count', 0):,}")
        print(f"  Size: {stats.get('text_index', {}).get('size', 0) / (1024*1024):.2f} MB")
        
        print(f"\nImage Index: {stats.get('image_index', {}).get('name', 'N/A')}")
        print(f"  Documents: {stats.get('image_index', {}).get('doc_count', 0):,}")
        print(f"  Size: {stats.get('image_index', {}).get('size', 0) / (1024*1024):.2f} MB")
        print("=" * 80)
        print("\n✓ Search indices are ready!")
        print(f"  Text index: {text_index}")
        print(f"  Image index: {image_index}")
        print("=" * 80)
        
    except Exception as e:
        logger.error(f"Pipeline failed: {str(e)}", exc_info=True)
        raise
        
    finally:
        # Clean up SSH tunnel
        if tunnel:
            logger.info("\nClosing SSH tunnel...")
            tunnel.stop()
            logger.info("✓ SSH tunnel closed")


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
