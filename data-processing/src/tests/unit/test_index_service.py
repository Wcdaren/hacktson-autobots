"""
Comprehensive unit tests for SearchIndexService (Unit 3)
Tests all index creation and management functions.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock, call
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from unit_3_search_index.index_service import SearchIndexService


class TestSearchIndexService(unittest.TestCase):
    """Comprehensive test cases for SearchIndexService."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock': {
                    'text_embedding_dimension': 1024,
                    'image_embedding_dimension': 1024
                },
                'opensearch': {
                    'endpoint': 'https://test-domain.es.amazonaws.com',
                    'use_iam_auth': False,
                    'username': 'test-user',
                    'password': 'test-pass',
                    'indices': {
                        'text_index': 'product-text-embeddings',
                        'image_index': 'product-image-embeddings'
                    }
                }
            },
            'indexing': {
                'batch_size': 100,
                'refresh_interval': '1s',
                'number_of_shards': 2,
                'number_of_replicas': 1,
                'knn': {
                    'method': 'hnsw',
                    'engine': 'nmslib',
                    'space_type': 'l2',
                    'ef_construction': 512,
                    'm': 16
                }
            }
        }
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_init_with_basic_auth(self, mock_opensearch):
        """Test service initialization with basic authentication."""
        service = SearchIndexService(self.config)
        
        self.assertEqual(service.text_index, 'product-text-embeddings')
        self.assertEqual(service.image_index, 'product-image-embeddings')
        
        # Verify OpenSearch client created with basic auth
        mock_opensearch.assert_called_once()
        call_args = mock_opensearch.call_args
        self.assertEqual(call_args[1]['hosts'], ['https://test-domain.es.amazonaws.com'])
        self.assertEqual(call_args[1]['http_auth'], ('test-user', 'test-pass'))
        self.assertTrue(call_args[1]['use_ssl'])
    
    @patch('unit_3_search_index.index_service.boto3.Session')
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_init_with_iam_auth(self, mock_opensearch, mock_session):
        """Test service initialization with IAM authentication."""
        config_iam = self.config.copy()
        config_iam['aws']['opensearch']['use_iam_auth'] = True
        
        mock_credentials = Mock()
        mock_session.return_value.get_credentials.return_value = mock_credentials
        
        service = SearchIndexService(config_iam)
        
        # Verify IAM auth was used
        mock_session.assert_called_once()
        mock_opensearch.assert_called_once()
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_create_text_index_success(self, mock_opensearch):
        """Test successful text index creation."""
        mock_client = Mock()
        mock_client.indices.exists.return_value = False
        mock_client.indices.create.return_value = {'acknowledged': True}
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        service.create_text_index()
        
        # Verify index creation was called
        mock_client.indices.create.assert_called_once()
        call_args = mock_client.indices.create.call_args
        self.assertEqual(call_args[1]['index'], 'product-text-embeddings')
        
        # Verify index settings
        body = call_args[1]['body']
        self.assertIn('settings', body)
        self.assertIn('mappings', body)
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_create_text_index_already_exists(self, mock_opensearch):
        """Test text index creation when index already exists (deletes and recreates)."""
        mock_client = Mock()
        mock_client.indices.exists.return_value = True
        mock_client.indices.delete.return_value = {'acknowledged': True}
        mock_client.indices.create.return_value = {'acknowledged': True}
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        service.create_text_index()
        
        # Should delete existing index
        mock_client.indices.delete.assert_called_once_with(index='product-text-embeddings')
        # Then create new one
        mock_client.indices.create.assert_called_once()
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_create_image_index_success(self, mock_opensearch):
        """Test successful image index creation."""
        mock_client = Mock()
        mock_client.indices.exists.return_value = False
        mock_client.indices.create.return_value = {'acknowledged': True}
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        service.create_image_index()
        
        mock_client.indices.create.assert_called_once()
        call_args = mock_client.indices.create.call_args
        self.assertEqual(call_args[1]['index'], 'product-image-embeddings')
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_index_products_success(self, mock_opensearch):
        """Test successful product indexing."""
        mock_client = Mock()
        mock_client.bulk.return_value = {
            'errors': False,
            'items': [{'index': {'status': 201}}] * 2
        }
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        
        products = [
            {
                'variant_id': '1',
                'variant_name': 'Sofa',
                'text_embedding': [0.1] * 1024,
                'images': [{'url': 'http://example.com/img1.jpg'}]
            },
            {
                'variant_id': '2',
                'variant_name': 'Chair',
                'text_embedding': [0.2] * 1024,
                'images': [{'url': 'http://example.com/img2.jpg'}]
            }
        ]
        
        service.index_products(products)
        
        # Verify bulk indexing was called
        mock_client.bulk.assert_called()
        call_args = mock_client.bulk.call_args
        self.assertIn('body', call_args[1])
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_index_products_with_errors(self, mock_opensearch):
        """Test product indexing with some errors."""
        mock_client = Mock()
        mock_client.bulk.return_value = {
            'errors': True,
            'items': [
                {'index': {'status': 201}},
                {'index': {'status': 400, 'error': 'Invalid document'}}
            ]
        }
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        
        products = [
            {'variant_id': '1', 'text_embedding': [0.1] * 1024, 'images': []},
            {'variant_id': '2', 'text_embedding': [0.2] * 1024, 'images': []}
        ]
        
        # Should not raise exception, just log errors
        service.index_products(products)
        
        mock_client.bulk.assert_called_once()
    
    @patch('unit_3_search_index.index_service.OpenSearch')
    def test_get_index_stats(self, mock_opensearch):
        """Test retrieving index statistics."""
        mock_client = Mock()
        mock_client.indices.stats.side_effect = [
            {
                '_all': {
                    'primaries': {
                        'docs': {'count': 100},
                        'store': {'size_in_bytes': 1024000}
                    }
                }
            },
            {
                '_all': {
                    'primaries': {
                        'docs': {'count': 100},
                        'store': {'size_in_bytes': 1024000}
                    }
                }
            }
        ]
        mock_opensearch.return_value = mock_client
        
        service = SearchIndexService(self.config)
        stats = service.get_index_stats()
        
        self.assertIn('text_index', stats)
        self.assertIn('image_index', stats)
        self.assertEqual(stats['text_index']['doc_count'], 100)
        self.assertEqual(stats['image_index']['doc_count'], 100)
        self.assertEqual(stats['text_index']['size'], 1024000)


if __name__ == '__main__':
    unittest.main()
