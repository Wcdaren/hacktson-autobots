"""
Unit 1: Data Ingestion Service - LOCAL VERSION
Loads CSV files from local filesystem, generates embeddings via Bedrock,
and saves embeddings locally.
"""

import boto3
import pandas as pd
from typing import Dict, List
import logging
import json
import os
from pathlib import Path
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()


class DataIngestionServiceLocal:
    """Service for loading product data from local files and generating embeddings."""
    
    def __init__(self, config: Dict, data_dir: str = '../data/active_only'):
        self.config = config
        self.data_dir = Path(data_dir)
        
        # Initialize Bedrock client for embeddings
        bedrock_region = config['aws'].get('bedrock_region', 'us-east-1')
        self.bedrock_client = boto3.client(
            'bedrock-runtime',
            region_name=bedrock_region,
            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
        )
        self.text_model_id = config['aws']['bedrock']['text_model_id']
        
    def load_csv_from_local(self, filename: str) -> pd.DataFrame:
        """Load a CSV file from local filesystem into a pandas DataFrame."""
        try:
            filepath = self.data_dir / filename
            logger.info(f"Loading {filepath}")
            
            df = pd.read_csv(filepath)
            
            logger.info(f"Loaded {len(df)} rows from {filename}")
            return df
            
        except Exception as e:
            logger.error(f"Error loading {filename} from local: {str(e)}")
            raise
    
    def generate_text_embedding(self, text: str) -> List[float]:
        """Generate embedding for a single text using Bedrock Titan."""
        try:
            body = json.dumps({"inputText": text})
            
            response = self.bedrock_client.invoke_model(
                modelId=self.text_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            response_body = json.loads(response['body'].read())
            embedding = response_body.get('embedding', [])
            
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating text embedding: {str(e)}")
            raise
    
    def generate_image_embedding(self, image_base64: str) -> List[float]:
        """Generate embedding for a single image using Bedrock Titan Image model."""
        try:
            # Image is already base64 encoded in CSV
            body = json.dumps({"inputImage": image_base64})
            
            image_model_id = self.config['aws']['bedrock']['image_model_id']
            
            response = self.bedrock_client.invoke_model(
                modelId=image_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            response_body = json.loads(response['body'].read())
            embedding = response_body.get('embedding', [])
            
            return embedding
            
        except Exception as e:
            logger.error(f"Error generating image embedding: {str(e)}")
            raise
    
    def ingest_data_simple(self) -> List[Dict]:
        """
        Simplified ingestion from local variant.csv file.
        Returns minimal structure with only fields from CSV.
        """
        logger.info("Starting simple data ingestion from local files...")
        
        # Load only variant.csv
        variant_df = self.load_csv_from_local('variant.csv')
        
        enriched_products = []
        
        for _, variant in variant_df.iterrows():
            variant_id = str(variant.get('variant_id', ''))
            
            # Create aggregated searchable text from all available fields
            aggregated_text_parts = [
                variant.get('variant_name', ''),
                variant.get('product_name', ''),
                variant.get('description', ''),
                variant.get('frontend_category', ''),
                variant.get('frontend_subcategory', ''),
                variant.get('collection', ''),
                variant.get('color_tone', ''),
                variant.get('material', ''),
                variant.get('other_properties', ''),
            ]
            aggregated_text = ' '.join([str(p) for p in aggregated_text_parts if pd.notna(p) and str(p).strip()])
            
            # Build minimal product dict - ONLY fields from CSV
            enriched_product = {
                # Core IDs
                'variant_id': variant_id,
                'product_id': str(variant.get('product_id', '')),
                
                # Names and description
                'variant_name': variant.get('variant_name', ''),
                'product_name': variant.get('product_name', ''),
                'description': variant.get('description', ''),
                'aggregated_text': aggregated_text,
                
                # Pricing
                'price': float(variant.get('sale_price', 0) or 0),
                'currency': variant.get('currency', 'SGD'),
                
                # Categories
                'product_type': variant.get('product_type', ''),
                'frontend_category': variant.get('frontend_category', ''),
                'frontend_subcategory': variant.get('frontend_subcategory', ''),
                'backend_category': variant.get('frontend_category', ''),
                
                # Reviews (handle NaN values)
                'review_count': int(variant.get('review_count', 0) or 0) if pd.notna(variant.get('review_count')) else 0,
                'review_rating': float(variant.get('review_rating', 0) or 0) if pd.notna(variant.get('review_rating')) else 0.0,
                
                # Additional CSV fields
                'collection': variant.get('collection', ''),
                'color_tone': variant.get('color_tone', ''),
                'material': variant.get('material', ''),
                'other_properties': variant.get('other_properties', ''),
                'variant_url': variant.get('variant_url', ''),
                
                # Minimal metadata
                'stock_status': 'in_stock',
                'lifecycle_status': 'active',
            }
            
            enriched_products.append(enriched_product)
        
        logger.info(f"Simple data ingestion complete: {len(enriched_products)} products ready")
        return enriched_products
    
    def generate_embeddings_for_products(self, products: List[Dict]) -> List[Dict]:
        """
        Generate embeddings for all products using Bedrock.
        Adds 'text_embedding' field to each product.
        """
        logger.info(f"Generating embeddings for {len(products)} products...")
        
        for i, product in enumerate(products):
            try:
                # Generate embedding for aggregated text
                embedding = self.generate_text_embedding(product['aggregated_text'])
                product['text_embedding'] = embedding
                
                if (i + 1) % 10 == 0:
                    logger.info(f"Generated embeddings for {i + 1}/{len(products)} products")
                    
            except Exception as e:
                logger.error(f"Failed to generate embedding for product {product['variant_id']}: {e}")
                product['text_embedding'] = []  # Empty embedding for failed items
        
        logger.info("Embedding generation complete")
        return products
    
    def load_image_data(self, image_csv_path: str = 'image_base64/batch_1.csv') -> pd.DataFrame:
        """Load image base64 data from CSV."""
        try:
            filepath = self.data_dir / image_csv_path
            logger.info(f"Loading image data from {filepath}")
            
            df = pd.read_csv(filepath)
            logger.info(f"Loaded {len(df)} images from {image_csv_path}")
            return df
            
        except Exception as e:
            logger.error(f"Error loading image data: {str(e)}")
            raise
    
    def generate_embeddings_for_images_batch(self, image_df: pd.DataFrame, batch_size: int = 100, 
                                             output_dir: str = 'image_embeddings') -> None:
        """
        Generate embeddings for images in batches and save incrementally.
        
        Args:
            image_df: DataFrame with columns: variant_id_image_id, filename, image_base64, variant_id
            batch_size: Number of images to process before saving
            output_dir: Directory to save batch files (relative to data_dir)
        """
        # Create output directory if it doesn't exist
        output_path = self.data_dir / output_dir
        output_path.mkdir(parents=True, exist_ok=True)
        logger.info(f"Output directory: {output_path}")
        
        total_images = len(image_df)
        logger.info(f"Processing {total_images} images in batches of {batch_size}...")
        
        batch_num = 1
        
        for start_idx in range(0, total_images, batch_size):
            end_idx = min(start_idx + batch_size, total_images)
            batch_df = image_df.iloc[start_idx:end_idx]
            
            logger.info(f"\n{'='*60}")
            logger.info(f"Processing batch {batch_num}: images {start_idx+1} to {end_idx}")
            logger.info(f"{'='*60}")
            
            image_embeddings = []
            
            for idx, row in batch_df.iterrows():
                try:
                    # Generate embedding for image
                    embedding = self.generate_image_embedding(row['image_base64'])
                    
                    image_data = {
                        'image_id': row['variant_id_image_id'],
                        'variant_id': str(row['variant_id']),
                        'filename': row['filename'],
                        'image_embedding': embedding
                    }
                    
                    image_embeddings.append(image_data)
                    
                    # Log progress within batch
                    batch_progress = len(image_embeddings)
                    if batch_progress % 10 == 0:
                        logger.info(f"  Batch progress: {batch_progress}/{len(batch_df)} images")
                        
                except Exception as e:
                    logger.error(f"Failed to generate embedding for image {row['variant_id_image_id']}: {e}")
                    # Skip failed images
            
            # Save batch
            batch_filename = f"image_embeddings_batch_{batch_num:03d}.json"
            batch_filepath = output_path / batch_filename
            
            with open(batch_filepath, 'w') as f:
                json.dump(image_embeddings, f, indent=2)
            
            logger.info(f"✓ Saved batch {batch_num} ({len(image_embeddings)} images) to {batch_filename}")
            logger.info(f"  Overall progress: {end_idx}/{total_images} images ({end_idx*100//total_images}%)")
            
            batch_num += 1
        
        logger.info(f"\n{'='*60}")
        logger.info(f"ALL BATCHES COMPLETE")
        logger.info(f"{'='*60}")
        logger.info(f"Total images processed: {total_images}")
        logger.info(f"Total batches saved: {batch_num - 1}")
        logger.info(f"Output location: {output_path}")
        logger.info(f"{'='*60}")
    
    def save_products_with_embeddings(self, products: List[Dict], output_filename: str = 'products_with_embeddings.json'):
        """Save products with embeddings to local JSON file."""
        output_path = self.data_dir / output_filename
        
        logger.info(f"Saving {len(products)} products to {output_path}")
        
        with open(output_path, 'w') as f:
            json.dump(products, f, indent=2)
        
        logger.info(f"✓ Saved products with embeddings to {output_path}")
    
    def save_image_embeddings(self, image_embeddings: List[Dict], output_filename: str = 'image_embeddings.json'):
        """Save image embeddings to local JSON file."""
        output_path = self.data_dir / output_filename
        
        logger.info(f"Saving {len(image_embeddings)} image embeddings to {output_path}")
        
        with open(output_path, 'w') as f:
            json.dump(image_embeddings, f, indent=2)
        
        logger.info(f"✓ Saved image embeddings to {output_path}")
    
    def run_full_pipeline(self):
        """
        Run complete local pipeline:
        1. Load data from local CSV
        2. Generate embeddings via Bedrock
        3. Save results locally
        """
        logger.info("=" * 80)
        logger.info("LOCAL DATA INGESTION & EMBEDDING PIPELINE")
        logger.info("=" * 80)
        
        # Step 1: Ingest data
        logger.info("\nStep 1: Loading data from local CSV...")
        products = self.ingest_data_simple()
        logger.info(f"✓ Loaded {len(products)} products")
        
        # Step 2: Generate embeddings
        logger.info("\nStep 2: Generating embeddings via Bedrock...")
        products_with_embeddings = self.generate_embeddings_for_products(products)
        logger.info(f"✓ Generated embeddings for {len(products_with_embeddings)} products")
        
        # Step 3: Save results
        logger.info("\nStep 3: Saving results to local files...")
        self.save_products_with_embeddings(products_with_embeddings)
        
        logger.info("\n" + "=" * 80)
        logger.info("PIPELINE COMPLETE")
        logger.info("=" * 80)
        logger.info(f"Products processed: {len(products_with_embeddings)}")
        logger.info(f"Output location: {self.data_dir}")
        logger.info("Files created:")
        logger.info("  - products_with_embeddings.json (full data with embeddings)")
        logger.info("  - products_metadata.csv (metadata only, for viewing)")
        logger.info("=" * 80)
        
        return products_with_embeddings


def main():
    """Test the local data ingestion service."""
    import yaml
    import sys
    
    # Load config
    config_path = Path(__file__).parent.parent / 'config.yaml'
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize service
    data_dir = Path(__file__).parent.parent.parent / 'data' / 'active_only'
    service = DataIngestionServiceLocal(config, data_dir=str(data_dir))
    
    # Check command line args for mode
    if len(sys.argv) > 1 and sys.argv[1] == '--images':
        # Process all images in batches
        print("=" * 80)
        print("GENERATING IMAGE EMBEDDINGS FOR ALL IMAGES")
        print("=" * 80)
        
        # Load image data
        image_df = service.load_image_data()
        
        # Process in batches and save incrementally
        batch_size = 100  # Process 100 images per batch
        service.generate_embeddings_for_images_batch(image_df, batch_size=batch_size)
        
        return
    
    # Default: Run full text pipeline
    products = service.run_full_pipeline()
    
    # Print sample
    if products:
        print(f"\n{'=' * 80}")
        print("SAMPLE PRODUCT (first product):")
        print('=' * 80)
        sample = products[0].copy()
        # Truncate embedding for display
        if 'text_embedding' in sample and sample['text_embedding']:
            sample['text_embedding'] = f"[{len(sample['text_embedding'])} dimensions]"
        print(json.dumps(sample, indent=2))


if __name__ == '__main__':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    main()
