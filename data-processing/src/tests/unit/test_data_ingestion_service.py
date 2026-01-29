"""
Unit tests for DataIngestionService (Unit 1)
Tests all data loading and enrichment functions.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
import pandas as pd
from io import BytesIO
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from unit_1_data_ingestion.data_ingestion_service import DataIngestionService


class TestDataIngestionService(unittest.TestCase):
    """Test cases for DataIngestionService."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                's3': {
                    'bucket': 'test-bucket',
                    'data_prefix': 'data/active_only/',
                    'files': ['variant.csv', 'variant_image.csv', 'variant_property.csv',
                             'variant_option.csv', 'variant_affinity.csv', 'variant_file.csv']
                }
            }
        }
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_init(self, mock_boto_client):
        """Test service initialization."""
        service = DataIngestionService(self.config)
        
        self.assertEqual(service.bucket, 'test-bucket')
        self.assertEqual(service.prefix, 'data/active_only/')
        mock_boto_client.assert_called_once_with('s3', region_name='ap-southeast-1')
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_load_csv_from_s3_success(self, mock_boto_client):
        """Test successful CSV loading from S3."""
        # Mock S3 response
        csv_data = "id,name,price\n1,Sofa,999\n2,Chair,299"
        mock_s3 = Mock()
        mock_s3.get_object.return_value = {
            'Body': BytesIO(csv_data.encode('utf-8'))
        }
        mock_boto_client.return_value = mock_s3
        
        service = DataIngestionService(self.config)
        df = service.load_csv_from_s3('variant.csv')
        
        self.assertEqual(len(df), 2)
        self.assertEqual(list(df.columns), ['id', 'name', 'price'])
        self.assertEqual(df.iloc[0]['name'], 'Sofa')
        mock_s3.get_object.assert_called_once_with(
            Bucket='test-bucket',
            Key='data/active_only/variant.csv'
        )
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_load_csv_from_s3_error(self, mock_boto_client):
        """Test CSV loading error handling."""
        mock_s3 = Mock()
        mock_s3.get_object.side_effect = Exception("S3 error")
        mock_boto_client.return_value = mock_s3
        
        service = DataIngestionService(self.config)
        
        with self.assertRaises(Exception) as context:
            service.load_csv_from_s3('variant.csv')
        
        self.assertIn("S3 error", str(context.exception))
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_load_all_data(self, mock_boto_client):
        """Test loading all CSV files."""
        # Mock S3 responses for all files
        mock_s3 = Mock()
        
        def mock_get_object(Bucket, Key):
            # Return different CSV data based on filename
            if 'variant.csv' in Key:
                csv_data = "variant_id,product_id,variant_name\n1,100,Test Sofa"
            elif 'variant_image.csv' in Key:
                csv_data = "variant_id,image_url\n1,http://example.com/img.jpg"
            else:
                csv_data = "variant_id,data\n1,test"
            
            return {'Body': BytesIO(csv_data.encode('utf-8'))}
        
        mock_s3.get_object.side_effect = mock_get_object
        mock_boto_client.return_value = mock_s3
        
        service = DataIngestionService(self.config)
        dataframes = service.load_all_data()
        
        # Should load all 6 files
        self.assertEqual(len(dataframes), 6)
        self.assertIn('variant', dataframes)
        self.assertIn('variant_image', dataframes)
        self.assertIn('variant_property', dataframes)
        self.assertIsInstance(dataframes['variant'], pd.DataFrame)
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_enrich_variant_data_basic(self, mock_boto_client):
        """Test basic variant data enrichment."""
        mock_boto_client.return_value = Mock()
        service = DataIngestionService(self.config)
        
        # Create minimal test dataframes
        dataframes = {
            'variant': pd.DataFrame([{
                'variant_id': 1,
                'product_id': 100,
                'sku': 'SKU001',
                'variant_name': 'Grey Sofa',
                'product_name': 'Modern Sofa',
                'description': 'Comfortable grey sofa',
                'sale_price': 999.0,
                'original_price': 1299.0,
                'currency': 'SGD',
                'lifecycle_status': 'active',
                'product_type': 'furniture',
                'frontend_category': 'Sofas',
                'backend_category': 'Living Room',
                'review_count': 10,
                'review_rating': 4.5,
                'stock_status': 'in_stock',
                'market': 'SG',
                'url': '/products/grey-sofa',
                'delivery_time': '2-3 weeks'
            }]),
            'variant_image': pd.DataFrame([{
                'variant_id': 1,
                'image_type': 'product',
                'image_url': 'http://example.com/sofa.jpg',
                'image_position': 1,
                'default_image': True
            }]),
            'variant_property': pd.DataFrame([{
                'variant_id': 1,
                'property_category': 'Material',
                'property_type': 'Fabric',
                'property_value': 'Linen'
            }]),
            'variant_option': pd.DataFrame([{
                'variant_id': 1,
                'option_type': 'Color',
                'option_value': 'Grey'
            }]),
            'variant_affinity': pd.DataFrame([{
                'variant_id': 1,
                'affinity_type': 'similar',
                'affinity_group_variant_id': 2
            }]),
            'variant_file': pd.DataFrame([{
                'variant_id': 1,
                'file_type': 'manual',
                'file_url': 'http://example.com/manual.pdf'
            }])
        }
        
        enriched = service.enrich_variant_data(dataframes)
        
        self.assertEqual(len(enriched), 1)
        product = enriched[0]
        
        # Check basic fields
        self.assertEqual(product['variant_id'], '1')
        self.assertEqual(product['variant_name'], 'Grey Sofa')
        self.assertEqual(product['price'], 999.0)
        self.assertEqual(product['currency'], 'SGD')
        
        # Check enriched data
        self.assertEqual(len(product['images']), 1)
        self.assertEqual(product['images'][0]['url'], 'http://example.com/sofa.jpg')
        
        self.assertIn('Material', product['properties'])
        self.assertEqual(product['properties']['Material']['Fabric'], 'Linen')
        
        self.assertEqual(len(product['options']), 1)
        self.assertEqual(product['options'][0]['value'], 'Grey')
        
        self.assertEqual(len(product['affinity']), 1)
        self.assertEqual(product['affinity'][0]['related_variant_id'], '2')
        
        self.assertEqual(len(product['files']), 1)
        
        # Check aggregated text
        self.assertIn('Grey Sofa', product['aggregated_text'])
        self.assertIn('Linen', product['aggregated_text'])
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_enrich_variant_data_multiple_products(self, mock_boto_client):
        """Test enrichment with multiple products."""
        mock_boto_client.return_value = Mock()
        service = DataIngestionService(self.config)
        
        dataframes = {
            'variant': pd.DataFrame([
                {'variant_id': 1, 'product_id': 100, 'variant_name': 'Sofa', 'product_name': 'Sofa',
                 'description': '', 'sale_price': 999, 'original_price': 999, 'currency': 'SGD',
                 'lifecycle_status': 'active', 'product_type': 'furniture', 'frontend_category': 'Sofas',
                 'backend_category': 'Living', 'review_count': 0, 'review_rating': 0, 'stock_status': 'in_stock',
                 'market': 'SG', 'url': '/sofa', 'delivery_time': '2 weeks'},
                {'variant_id': 2, 'product_id': 101, 'variant_name': 'Chair', 'product_name': 'Chair',
                 'description': '', 'sale_price': 299, 'original_price': 299, 'currency': 'SGD',
                 'lifecycle_status': 'active', 'product_type': 'furniture', 'frontend_category': 'Chairs',
                 'backend_category': 'Living', 'review_count': 0, 'review_rating': 0, 'stock_status': 'in_stock',
                 'market': 'SG', 'url': '/chair', 'delivery_time': '1 week'}
            ]),
            'variant_image': pd.DataFrame(columns=['variant_id', 'image_type', 'image_url', 'image_position', 'default_image']),
            'variant_property': pd.DataFrame(columns=['variant_id', 'property_category', 'property_type', 'property_value']),
            'variant_option': pd.DataFrame(columns=['variant_id', 'option_type', 'option_value']),
            'variant_affinity': pd.DataFrame(columns=['variant_id', 'affinity_type', 'affinity_group_variant_id']),
            'variant_file': pd.DataFrame(columns=['variant_id', 'file_type', 'file_url'])
        }
        
        enriched = service.enrich_variant_data(dataframes)
        
        self.assertEqual(len(enriched), 2)
        self.assertEqual(enriched[0]['variant_name'], 'Sofa')
        self.assertEqual(enriched[1]['variant_name'], 'Chair')
    
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_enrich_variant_data_missing_price(self, mock_boto_client):
        """Test enrichment handles missing prices correctly."""
        mock_boto_client.return_value = Mock()
        service = DataIngestionService(self.config)
        
        dataframes = {
            'variant': pd.DataFrame([{
                'variant_id': 1, 'product_id': 100, 'variant_name': 'Test', 'product_name': 'Test',
                'description': '', 'sale_price': None, 'original_price': 500, 'currency': 'SGD',
                'lifecycle_status': 'active', 'product_type': 'furniture', 'frontend_category': 'Test',
                'backend_category': 'Test', 'review_count': 0, 'review_rating': 0, 'stock_status': 'in_stock',
                'market': 'SG', 'url': '/test', 'delivery_time': '1 week'
            }]),
            'variant_image': pd.DataFrame(columns=['variant_id', 'image_type', 'image_url', 'image_position', 'default_image']),
            'variant_property': pd.DataFrame(columns=['variant_id', 'property_category', 'property_type', 'property_value']),
            'variant_option': pd.DataFrame(columns=['variant_id', 'option_type', 'option_value']),
            'variant_affinity': pd.DataFrame(columns=['variant_id', 'affinity_type', 'affinity_group_variant_id']),
            'variant_file': pd.DataFrame(columns=['variant_id', 'file_type', 'file_url'])
        }
        
        enriched = service.enrich_variant_data(dataframes)
        
        # Should use original_price when sale_price is None
        self.assertEqual(enriched[0]['price'], 500.0)
    
    @patch.object(DataIngestionService, 'load_all_data')
    @patch.object(DataIngestionService, 'enrich_variant_data')
    @patch('unit_1_data_ingestion.data_ingestion_service.boto3.client')
    def test_ingest_data_integration(self, mock_boto_client, mock_enrich, mock_load):
        """Test complete data ingestion workflow."""
        mock_boto_client.return_value = Mock()
        
        # Mock the methods
        mock_dataframes = {'variant': pd.DataFrame(), 'variant_image': pd.DataFrame()}
        mock_load.return_value = mock_dataframes
        
        mock_products = [
            {'variant_id': '1', 'variant_name': 'Sofa'},
            {'variant_id': '2', 'variant_name': 'Chair'}
        ]
        mock_enrich.return_value = mock_products
        
        service = DataIngestionService(self.config)
        result = service.ingest_data()
        
        # Verify workflow
        mock_load.assert_called_once()
        mock_enrich.assert_called_once_with(mock_dataframes)
        self.assertEqual(result, mock_products)
        self.assertEqual(len(result), 2)


if __name__ == '__main__':
    unittest.main()
