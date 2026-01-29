"""
Script to load local embeddings and index them to OpenSearch.
Reads from data/active_only/embeddings/ and indexes to OpenSearch.
"""

import json
import logging
import yaml
import os
from pathlib import Path
from typing import List, Dict
from dotenv import load_dotenv

from unit_3_search_index.index_service import SearchIndexService

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


def load_text_embeddings(embeddings_dir: Path) -> List[Dict]:
    """Load text embeddings from JSON file."""
    text_file = embeddings_dir / 'text_embeddings' / 'products_with_embeddings.json'
    
    logger.info(f"Loading text embeddings from {text_file}")
    
    with open(text_file, 'r') as f:
        content = f.read()
    
    # Fix NaN values that cause OpenSearch indexing errors
    # Replace NaN with null for proper JSON parsing
    if 'NaN' in content:
        nan_count = content.count('NaN')
        logger.warning(f"Found {nan_count} NaN values in embeddings file, replacing with null")
        content = content.replace('NaN', 'null')
    
    products = json.loads(content)
    
    logger.info(f"Loaded {len(products)} products with text embeddings")
    return products


def load_image_embeddings(embeddings_dir: Path) -> List[Dict]:
    """Load image embeddings from batch JSON files."""
    image_dir = embeddings_dir / 'image_embeddings'
    
    logger.info(f"Loading image embeddings from {image_dir}")
    
    all_images = []
    
    # Get all batch files sorted
    batch_files = sorted(image_dir.glob('image_embeddings_batch_*.json'))
    
    for batch_file in batch_files:
        with open(batch_file, 'r') as f:
            batch_images = json.load(f)
            all_images.extend(batch_images)
        
        logger.info(f"Loaded {len(batch_images)} images from {batch_file.name}")
    
    logger.info(f"Total images loaded: {len(all_images)}")
    return all_images


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
    """Main indexing pipeline."""
    logger.info("=" * 80)
    logger.info("OPENSEARCH INDEXING PIPELINE")
    logger.info("=" * 80)
    
    # Load config
    config_path = Path(__file__).parent / 'config.yaml'
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    # Override OpenSearch config from environment if needed
    if os.getenv('OPENSEARCH_USERNAME'):
        config['aws']['opensearch']['username'] = os.getenv('OPENSEARCH_USERNAME')
    if os.getenv('OPENSEARCH_PASSWORD'):
        config['aws']['opensearch']['password'] = os.getenv('OPENSEARCH_PASSWORD')
    if os.getenv('OPENSEARCH_ENDPOINT'):
        config['aws']['opensearch']['endpoint'] = os.getenv('OPENSEARCH_ENDPOINT')
    
    # Set to use basic auth (not IAM) since we're using SSH tunnel
    config['aws']['opensearch']['use_iam_auth'] = False
    
    # Initialize index service
    logger.info("\nInitializing OpenSearch connection...")
    index_service = SearchIndexService(config)
    
    # Step 1: Create indices
    logger.info("\n" + "=" * 80)
    logger.info("STEP 1: Creating OpenSearch Indices")
    logger.info("=" * 80)
    
    logger.info("Creating text index...")
    index_service.create_text_index()
    
    logger.info("Creating image index...")
    index_service.create_image_index()
    
    # Step 2: Load embeddings from local files
    logger.info("\n" + "=" * 80)
    logger.info("STEP 2: Loading Embeddings from Local Files")
    logger.info("=" * 80)
    
    embeddings_dir = Path(__file__).parent.parent / 'data' / 'active_only' / 'embeddings'
    
    products = load_text_embeddings(embeddings_dir)
    images = load_image_embeddings(embeddings_dir)
    
    # Step 3: Transform image documents
    logger.info("\n" + "=" * 80)
    logger.info("STEP 3: Transforming Image Documents")
    logger.info("=" * 80)
    
    image_documents = transform_image_documents(images, products)
    
    # Step 4: Index to OpenSearch
    logger.info("\n" + "=" * 80)
    logger.info("STEP 4: Indexing to OpenSearch")
    logger.info("=" * 80)
    
    logger.info("\nIndexing text embeddings...")
    index_service.index_products(products)
    
    logger.info("\nIndexing image embeddings...")
    index_service.index_images(image_documents)
    
    # Step 5: Get index stats
    logger.info("\n" + "=" * 80)
    logger.info("STEP 5: Index Statistics")
    logger.info("=" * 80)
    
    stats = index_service.get_index_stats()
    
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


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
