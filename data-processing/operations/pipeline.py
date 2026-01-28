"""
Main Pipeline: Orchestrates all units to build the search system.
Run this script to ingest data, generate embeddings, and create indices.
"""

import yaml
import logging
import sys
import time
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add parent directory to path
sys.path.append(str(Path(__file__).parent))

from unit_1_data_ingestion.data_ingestion_service import DataIngestionService
from unit_2_embedding_generation.embedding_service import EmbeddingService
from unit_3_search_index.index_service import SearchIndexService

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def load_config(config_path: str = 'config.yaml'):
    """Load configuration from YAML file and override with environment variables."""
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    # Override with environment variables
    if os.getenv('S3_BUCKET_NAME'):
        config['aws']['s3']['bucket'] = os.getenv('S3_BUCKET_NAME')
    
    if os.getenv('OPENSEARCH_USERNAME'):
        config['aws']['opensearch']['username'] = os.getenv('OPENSEARCH_USERNAME')
    
    if os.getenv('OPENSEARCH_PASSWORD'):
        config['aws']['opensearch']['password'] = os.getenv('OPENSEARCH_PASSWORD')
    
    # Optional: Override feature flags
    if os.getenv('LLM_FALLBACK_ENABLED'):
        config['llm_fallback']['enabled'] = os.getenv('LLM_FALLBACK_ENABLED').lower() == 'true'
    
    if os.getenv('RELATED_TAGS_ENABLED'):
        config['related_tags']['enabled'] = os.getenv('RELATED_TAGS_ENABLED').lower() == 'true'
    
    if os.getenv('SIMILARITY_THRESHOLD'):
        config['llm_fallback']['similarity_threshold'] = float(os.getenv('SIMILARITY_THRESHOLD'))
    
    return config


def run_pipeline(config_path: str = 'config.yaml'):
    """
    Run the complete data pipeline:
    1. Ingest data from S3
    2. Generate embeddings
    3. Create OpenSearch indices
    4. Index data
    """
    start_time = time.time()
    
    logger.info("=" * 80)
    logger.info("SEMANTIC SEARCH PIPELINE - STARTING")
    logger.info("=" * 80)
    
    # Load configuration
    logger.info("Loading configuration...")
    config = load_config(config_path)
    
    # Step 1: Data Ingestion
    logger.info("\n" + "=" * 80)
    logger.info("STEP 1: DATA INGESTION")
    logger.info("=" * 80)
    
    ingestion_service = DataIngestionService(config)
    products = ingestion_service.ingest_data()
    
    logger.info(f"✓ Ingested {len(products)} products")
    
    # Step 2: Embedding Generation
    logger.info("\n" + "=" * 80)
    logger.info("STEP 2: EMBEDDING GENERATION")
    logger.info("=" * 80)
    
    embedding_service = EmbeddingService(config)
    products_with_embeddings = embedding_service.enrich_products_with_embeddings(products)
    
    logger.info(f"✓ Generated embeddings for {len(products_with_embeddings)} products")
    
    # Step 3: Create Indices
    logger.info("\n" + "=" * 80)
    logger.info("STEP 3: CREATE OPENSEARCH INDICES")
    logger.info("=" * 80)
    
    index_service = SearchIndexService(config)
    
    logger.info("Creating text index...")
    index_service.create_text_index()
    logger.info("✓ Text index created")
    
    logger.info("Creating image index...")
    index_service.create_image_index()
    logger.info("✓ Image index created")
    
    # Step 4: Index Products
    logger.info("\n" + "=" * 80)
    logger.info("STEP 4: INDEX PRODUCTS")
    logger.info("=" * 80)
    
    logger.info("Indexing products to OpenSearch...")
    index_service.index_products(products_with_embeddings)
    logger.info(f"✓ Indexed {len(products_with_embeddings)} products")
    
    # Get index statistics
    logger.info("\n" + "=" * 80)
    logger.info("INDEX STATISTICS")
    logger.info("=" * 80)
    
    stats = index_service.get_index_stats()
    logger.info(f"Text Index: {stats.get('text_index', {})}")
    logger.info(f"Image Index: {stats.get('image_index', {})}")
    
    # Pipeline complete
    elapsed_time = time.time() - start_time
    
    logger.info("\n" + "=" * 80)
    logger.info("PIPELINE COMPLETE")
    logger.info("=" * 80)
    logger.info(f"Total time: {elapsed_time:.2f} seconds")
    logger.info(f"Products indexed: {len(products_with_embeddings)}")
    logger.info("Search service is ready to use!")
    logger.info("=" * 80)


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Run semantic search data pipeline')
    parser.add_argument(
        '--config',
        type=str,
        default='config.yaml',
        help='Path to configuration file (default: config.yaml)'
    )
    
    args = parser.parse_args()
    
    try:
        run_pipeline(args.config)
    except Exception as e:
        logger.error(f"Pipeline failed: {str(e)}", exc_info=True)
        sys.exit(1)


if __name__ == '__main__':
    main()
