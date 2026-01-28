"""
Unit tests for SearchQueryService (Unit 4)
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
import json
import sys
from pathlib import Path

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from unit_4_search_query.search_service import SearchQueryService


class TestSearchQueryService(unittest.TestCase):
    """Test cases for SearchQueryService."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock_region': 'us-east-1',
                'bedrock': {
                    'text_model_id': 'amazon.titan-embed-text-v2:0',
                    'text_embedding_dimension': 1024,
                    'image_model_id': 'amazon.titan-embed-image-v1',
                    'image_embedding_dimension': 1024
                },
                'opensearch': {
                    'endpoint': 'https://test-domain.es.amazonaws.com',
                    'use_iam_auth': True,
                    'indices': {
                        'text_index': 'product-text-embeddings',
                        'image_index': 'product-image-embeddings'
                    }
                }
            },
            'search_query': {
                'max_results': 50,
                'response_timeout_seconds': 3,
                'default_search_mode': 'hybrid',
                'min_similarity_score': 0.0,
                'filters': {
                    'enabled': True,
                    'price_keywords': ['under', 'below', 'less than', 'max'],
                    'color_values': ['grey', 'brown', 'white', 'black'],
                    'material_values': ['wood', 'leather', 'fabric', 'metal'],
                    'size_values': ['small', 'medium', 'large'],
                    'category_values': ['sofa', 'table', 'chair', 'bed']
                }
            },
            'llm_fallback': {
                'enabled': True,
                'model_id': 'anthropic.claude-sonnet-4-5-20250929-v1:0',
                'similarity_threshold': 0.3
            },
            'related_tags': {
                'enabled': True,
                'llm_model_id': 'anthropic.claude-sonnet-4-5-20250929-v1:0'
            }
        }
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    @patch('unit_4_search_query.search_service.boto3.Session')
    def test_init(self, mock_session, mock_boto_client, mock_opensearch, 
                  mock_llm_service, mock_tag_service):
        """Test service initialization."""
        service = SearchQueryService(self.config)
        
        # Verify Bedrock client uses correct region
        mock_boto_client.assert_called_with(
            'bedrock-runtime',
            region_name='us-east-1'
        )
        
        # Verify LLM and Tag services initialized
        mock_llm_service.assert_called_once()
        mock_tag_service.assert_called_once()
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    @patch('unit_4_search_query.search_service.boto3.Session')
    def test_extract_filters_price(self, mock_session, mock_boto_client, 
                                   mock_opensearch, mock_llm_service, mock_tag_service):
        """Test price filter extraction from query."""
        service = SearchQueryService(self.config)
        
        # Test price extraction with "under" keyword
        filters = service.extract_filters("sofa under $1000")
        self.assertIn('price_max', filters)
        self.assertEqual(filters['price_max'], 1000.0)
        
        # Test category extraction
        filters = service.extract_filters("leather chair")
        self.assertIn('categories', filters)
        self.assertIn('chair', filters['categories'])
        
        # Test material extraction
        filters = service.extract_filters("leather sofa")
        self.assertIn('materials', filters)
        self.assertIn('leather', filters['materials'])


if __name__ == '__main__':
    unittest.main()
