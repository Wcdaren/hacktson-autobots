"""
Unit tests for pipeline.py
"""

import unittest
from unittest.mock import Mock, patch, MagicMock, call
import sys
from pathlib import Path
import os

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from pipeline import load_config, run_pipeline


class TestPipeline(unittest.TestCase):
    """Test cases for pipeline orchestration."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.base_config = {
            'aws': {
                's3': {'bucket': 'test-bucket'},
                'opensearch': {
                    'username': 'test-user',
                    'password': 'test-pass'
                }
            },
            'llm_fallback': {
                'enabled': False,
                'similarity_threshold': 0.3
            },
            'related_tags': {
                'enabled': False
            }
        }
    
    @patch.dict(os.environ, {}, clear=True)
    @patch('pipeline.yaml.safe_load')
    @patch('builtins.open')
    def test_load_config_no_env_vars(self, mock_open, mock_yaml_load):
        """Test config loading without environment variable overrides."""
        mock_yaml_load.return_value = self.base_config.copy()
        
        config = load_config('config.yaml')
        
        self.assertEqual(config['aws']['s3']['bucket'], 'test-bucket')
        self.assertEqual(config['aws']['opensearch']['username'], 'test-user')
    
    @patch.dict(os.environ, {
        'S3_BUCKET_NAME': 'env-bucket',
        'OPENSEARCH_USERNAME': 'env-user',
        'OPENSEARCH_PASSWORD': 'env-pass',
        'LLM_FALLBACK_ENABLED': 'true',
        'RELATED_TAGS_ENABLED': 'false',
        'SIMILARITY_THRESHOLD': '0.5'
    })
    @patch('pipeline.yaml.safe_load')
    @patch('builtins.open')
    def test_load_config_with_env_vars(self, mock_open, mock_yaml_load):
        """Test config loading with environment variable overrides."""
        mock_yaml_load.return_value = self.base_config.copy()
        
        config = load_config('config.yaml')
        
        # Check environment overrides
        self.assertEqual(config['aws']['s3']['bucket'], 'env-bucket')
        self.assertEqual(config['aws']['opensearch']['username'], 'env-user')
        self.assertEqual(config['aws']['opensearch']['password'], 'env-pass')
        self.assertTrue(config['llm_fallback']['enabled'])
        self.assertFalse(config['related_tags']['enabled'])
        self.assertEqual(config['llm_fallback']['similarity_threshold'], 0.5)
    
    @patch('pipeline.SearchIndexService')
    @patch('pipeline.EmbeddingService')
    @patch('pipeline.DataIngestionService')
    @patch('pipeline.load_config')
    def test_run_pipeline_success(self, mock_load_config, mock_ingestion, 
                                   mock_embedding, mock_index):
        """Test successful pipeline execution."""
        # Mock config
        mock_load_config.return_value = self.base_config
        
        # Mock services
        mock_products = [
            {'id': '1', 'name': 'Sofa'},
            {'id': '2', 'name': 'Chair'}
        ]
        mock_products_with_embeddings = [
            {'id': '1', 'name': 'Sofa', 'text_embedding': [0.1] * 1024},
            {'id': '2', 'name': 'Chair', 'text_embedding': [0.2] * 1024}
        ]
        
        mock_ingestion_instance = Mock()
        mock_ingestion_instance.ingest_data.return_value = mock_products
        mock_ingestion.return_value = mock_ingestion_instance
        
        mock_embedding_instance = Mock()
        mock_embedding_instance.enrich_products_with_embeddings.return_value = mock_products_with_embeddings
        mock_embedding.return_value = mock_embedding_instance
        
        mock_index_instance = Mock()
        mock_index_instance.get_index_stats.return_value = {
            'text_index': {'doc_count': 2},
            'image_index': {'doc_count': 2}
        }
        mock_index.return_value = mock_index_instance
        
        # Run pipeline
        run_pipeline('config.yaml')
        
        # Verify service calls
        mock_ingestion_instance.ingest_data.assert_called_once()
        mock_embedding_instance.enrich_products_with_embeddings.assert_called_once_with(mock_products)
        mock_index_instance.create_text_index.assert_called_once()
        mock_index_instance.create_image_index.assert_called_once()
        mock_index_instance.index_products.assert_called_once_with(mock_products_with_embeddings)
        mock_index_instance.get_index_stats.assert_called_once()
    
    @patch('pipeline.DataIngestionService')
    @patch('pipeline.load_config')
    def test_run_pipeline_ingestion_failure(self, mock_load_config, mock_ingestion):
        """Test pipeline failure during data ingestion."""
        mock_load_config.return_value = self.base_config
        
        mock_ingestion_instance = Mock()
        mock_ingestion_instance.ingest_data.side_effect = Exception("S3 connection failed")
        mock_ingestion.return_value = mock_ingestion_instance
        
        # Pipeline should raise exception
        with self.assertRaises(Exception) as context:
            run_pipeline('config.yaml')
        
        self.assertIn("S3 connection failed", str(context.exception))


if __name__ == '__main__':
    unittest.main()
