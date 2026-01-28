"""
Unit 1: Data Ingestion Service
Loads CSV files from S3 and enriches product data for search indexing.
"""

import boto3
import pandas as pd
from typing import Dict, List
import logging
from io import StringIO

logger = logging.getLogger(__name__)


class DataIngestionService:
    """Service for loading and enriching product data from S3."""
    
    def __init__(self, config: Dict):
        self.config = config
        self.s3_client = boto3.client('s3', region_name=config['aws']['region'])
        self.bucket = config['aws']['s3']['bucket']
        self.prefix = config['aws']['s3']['data_prefix']
        
    def load_csv_from_s3(self, filename: str) -> pd.DataFrame:
        """Load a CSV file from S3 into a pandas DataFrame."""
        try:
            key = f"{self.prefix}{filename}"
            logger.info(f"Loading {key} from S3 bucket {self.bucket}")
            
            response = self.s3_client.get_object(Bucket=self.bucket, Key=key)
            csv_content = response['Body'].read().decode('utf-8')
            df = pd.read_csv(StringIO(csv_content))
            
            logger.info(f"Loaded {len(df)} rows from {filename}")
            return df
            
        except Exception as e:
            logger.error(f"Error loading {filename} from S3: {str(e)}")
            raise
    
    def load_all_data(self) -> Dict[str, pd.DataFrame]:
        """Load all CSV files from S3."""
        dataframes = {}
        files = self.config['aws']['s3']['files']
        
        for filename in files:
            df = self.load_csv_from_s3(filename)
            key = filename.replace('.csv', '')
            dataframes[key] = df
        
        logger.info(f"Loaded {len(dataframes)} data files")
        return dataframes
    
    def enrich_variant_data(self, dataframes: Dict[str, pd.DataFrame]) -> List[Dict]:
        """
        Enrich variant data by joining with related tables.
        Returns a list of enriched product dictionaries.
        """
        variants_df = dataframes['variant']
        images_df = dataframes['variant_image']
        properties_df = dataframes['variant_property']
        options_df = dataframes['variant_option']
        affinity_df = dataframes['variant_affinity']
        files_df = dataframes['variant_file']
        
        enriched_products = []
        
        for _, variant in variants_df.iterrows():
            variant_id = str(variant['variant_id'])
            
            # Get images
            variant_images = images_df[images_df['variant_id'] == int(variant_id)]
            images = []
            for _, img in variant_images.iterrows():
                images.append({
                    'type': img.get('image_type', ''),
                    'url': img.get('image_url', ''),
                    'position': img.get('image_position', 0),
                    'is_default': img.get('default_image', False)
                })
            
            # Get properties
            variant_props = properties_df[properties_df['variant_id'] == int(variant_id)]
            properties = {}
            property_texts = []
            for _, prop in variant_props.iterrows():
                cat = prop.get('property_category', '')
                ptype = prop.get('property_type', '')
                pval = prop.get('property_value', '')
                
                if cat not in properties:
                    properties[cat] = {}
                properties[cat][ptype] = pval
                
                # Collect for aggregated text
                if pval:
                    property_texts.append(f"{ptype}: {pval}")
            
            # Get options
            variant_opts = options_df[options_df['variant_id'] == int(variant_id)]
            options = []
            for _, opt in variant_opts.iterrows():
                options.append({
                    'type': opt.get('option_type', ''),
                    'value': opt.get('option_value', '')
                })
            
            # Get affinity (related products)
            variant_aff = affinity_df[affinity_df['variant_id'] == int(variant_id)]
            affinity = []
            for _, aff in variant_aff.iterrows():
                affinity.append({
                    'type': aff.get('affinity_type', ''),
                    'related_variant_id': str(aff.get('affinity_group_variant_id', ''))
                })
            
            # Get files
            variant_files = files_df[files_df['variant_id'] == int(variant_id)]
            files = []
            for _, f in variant_files.iterrows():
                files.append({
                    'type': f.get('file_type', ''),
                    'url': f.get('file_url', '')
                })
            
            # Create aggregated searchable text
            aggregated_text_parts = [
                variant.get('variant_name', ''),
                variant.get('product_name', ''),
                variant.get('description', ''),
                variant.get('frontend_category', ''),
                variant.get('backend_category', ''),
            ]
            aggregated_text_parts.extend(property_texts)
            aggregated_text = ' '.join([str(p) for p in aggregated_text_parts if pd.notna(p)])
            
            # Build enriched product
            enriched_product = {
                'variant_id': variant_id,
                'product_id': str(variant.get('product_id', '')),
                'sku': variant.get('sku', ''),
                'variant_name': variant.get('variant_name', ''),
                'product_name': variant.get('product_name', ''),
                'description': variant.get('description', ''),
                'aggregated_text': aggregated_text,
                'price': float(variant.get('sale_price', 0) or variant.get('original_price', 0) or 0),
                'original_price': float(variant.get('original_price', 0) or 0),
                'currency': variant.get('currency', 'SGD'),
                'lifecycle_status': variant.get('lifecycle_status', ''),
                'product_type': variant.get('product_type', ''),
                'frontend_category': variant.get('frontend_category', ''),
                'backend_category': variant.get('backend_category', ''),
                'review_count': int(variant.get('review_count', 0) or 0),
                'review_rating': float(variant.get('review_rating', 0) or 0),
                'stock_status': variant.get('stock_status', ''),
                'images': images,
                'properties': properties,
                'options': options,
                'affinity': affinity,
                'files': files,
                'metadata': {
                    'market': variant.get('market', ''),
                    'url': variant.get('url', ''),
                    'delivery_time': variant.get('delivery_time', '')
                }
            }
            
            enriched_products.append(enriched_product)
        
        logger.info(f"Enriched {len(enriched_products)} products")
        return enriched_products
    
    def ingest_data(self) -> List[Dict]:
        """
        Main method to ingest and enrich all data.
        Returns list of enriched product dictionaries ready for embedding.
        """
        logger.info("Starting data ingestion...")
        
        # Load all CSV files
        dataframes = self.load_all_data()
        
        # Enrich variant data
        enriched_products = self.enrich_variant_data(dataframes)
        
        logger.info(f"Data ingestion complete: {len(enriched_products)} products ready")
        return enriched_products


def main():
    """Test the data ingestion service."""
    import yaml
    
    # Load config
    with open('../config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize service
    service = DataIngestionService(config)
    
    # Ingest data
    products = service.ingest_data()
    
    # Print sample
    print(f"\nTotal products: {len(products)}")
    if products:
        print(f"\nSample product:")
        import json
        print(json.dumps(products[0], indent=2))


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    main()
