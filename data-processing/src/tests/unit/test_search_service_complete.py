"""
Comprehensive unit tests for Search Query Service
Tests all search functionality including KNN, BM25, hybrid search, and image search.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
from io import BytesIO
import json
import base64

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from unit_4_search_query.search_service import SearchQueryService


class TestSearchQueryService(unittest.TestCase):
    """Test Search Query Service."""
    
    def setUp(self):
        """Set up test configuration."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock_region': 'us-east-1',
                'bedrock': {
                    'text_model_id': 'amazon.titan-embed-text-v2:0',
                    'image_model_id': 'amazon.titan-embed-image-v1',
                    'max_retries': 3
                },
                'opensearch': {
                    'endpoint': 'https://test-domain.ap-southeast-1.es.amazonaws.com',
                    'use_iam_auth': False,
                    'username': 'admin',
                    'password': 'password',
                    'indices': {
                        'text_index': 'products-text',
                        'image_index': 'products-image'
                    }
                }
            },
            'search_query': {
                'default_search_mode': 'hybrid',
                'max_results': 50,
                'field_boosts': {
                    'product_name': 3.0,
                    'variant_name': 2.0,
                    'description': 1.5,
                    'categories': 2.5,
                    'properties': 1.0
                },
                'rrf': {
                    'k': 60
                },
                'filters': {
                    'color_values': ['grey', 'brown', 'white', 'black'],
                    'material_values': ['wood', 'fabric', 'leather', 'metal'],
                    'category_values': ['sofas', 'tables', 'chairs', 'beds'],
                    'size_values': ['small', 'medium', 'large']
                }
            },
            'llm_fallback': {
                'enabled': True,
                'similarity_threshold': 0.3,
                'model_id': 'anthropic.claude-sonnet-4-5-20250929-v1:0',
                'cache_enabled': True,
                'cache_ttl_seconds': 3600
            },
            'related_tags': {
                'enabled': True,
                'llm_model_id': 'anthropic.claude-sonnet-4-5-20250929-v1:0',
                'cache_enabled': True,
                'cache_ttl_seconds': 1800,
                'min_tags': 3,
                'max_tags': 10,
                'catalog_values': {
                    'categories': ['Sofas', 'Tables', 'Chairs'],
                    'materials': ['Wood', 'Fabric', 'Leather'],
                    'styles': ['Modern', 'Traditional'],
                    'colors': ['Grey', 'Brown', 'White'],
                    'price_ranges': ['Under $1,000', '$1,000-$2,000']
                }
            }
        }
        
        self.mock_embedding = [0.1] * 1024
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_init_with_iam_auth(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test service initialization with IAM auth."""
        config = self.config.copy()
        config['aws']['opensearch']['use_iam_auth'] = True
        
        service = SearchQueryService(config)
        
        # Verify Bedrock client created with correct region
        mock_boto_client.assert_called_with(
            'bedrock-runtime',
            region_name='us-east-1'
        )
        
        # Verify OpenSearch client created
        self.assertTrue(mock_opensearch.called)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_init_with_basic_auth(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test service initialization with basic auth."""
        service = SearchQueryService(self.config)
        
        # Verify OpenSearch client created with username/password
        call_args = mock_opensearch.call_args
        self.assertIn('http_auth', call_args[1])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_price_under(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting 'under' price filter."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("sofa under $1000")
        
        self.assertIn('price_max', filters)
        self.assertEqual(filters['price_max'], 1000.0)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_price_between(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting 'between' price filter."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("table between $500 and $1500")
        
        self.assertIn('price_min', filters)
        self.assertIn('price_max', filters)
        self.assertEqual(filters['price_min'], 500.0)
        self.assertEqual(filters['price_max'], 1500.0)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_colors(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting color filters."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("grey and brown sofa")
        
        self.assertIn('colors', filters)
        self.assertIn('grey', filters['colors'])
        self.assertIn('brown', filters['colors'])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_materials(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting material filters."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("leather sofa with wood legs")
        
        self.assertIn('materials', filters)
        self.assertIn('leather', filters['materials'])
        self.assertIn('wood', filters['materials'])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_categories(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting category filters."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("modern sofas and chairs")
        
        self.assertIn('categories', filters)
        self.assertIn('sofas', filters['categories'])
        self.assertIn('chairs', filters['categories'])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_extract_filters_sizes(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test extracting size filters."""
        service = SearchQueryService(self.config)
        
        filters = service.extract_filters("large sofa")
        
        self.assertIn('sizes', filters)
        self.assertIn('large', filters['sizes'])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_generate_query_embedding_success(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test successful query embedding generation."""
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = SearchQueryService(self.config)
        embedding = service.generate_query_embedding("test query")
        
        self.assertEqual(len(embedding), 1024)
        self.assertEqual(embedding, self.mock_embedding)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_generate_query_embedding_error(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test query embedding generation error handling."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("API error")
        mock_boto_client.return_value = mock_bedrock
        
        service = SearchQueryService(self.config)
        
        with self.assertRaises(Exception):
            service.generate_query_embedding("test query")
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_knn_search_success(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test successful KNN search."""
        mock_os_response = {
            'hits': {
                'hits': [
                    {
                        '_source': {
                            'variant_id': '1',
                            'product_name': 'Grey Sofa',
                            'price': 999.0
                        },
                        '_score': 0.95
                    }
                ]
            }
        }
        
        mock_os_client = Mock()
        mock_os_client.search.return_value = mock_os_response
        mock_opensearch.return_value = mock_os_client
        
        service = SearchQueryService(self.config)
        results = service.knn_search(self.mock_embedding, {}, k=50)
        
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['variant_id'], '1')
        self.assertEqual(results[0]['score'], 0.95)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_knn_search_with_price_filter(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test KNN search with price filter."""
        mock_os_client = Mock()
        mock_os_client.search.return_value = {'hits': {'hits': []}}
        mock_opensearch.return_value = mock_os_client
        
        service = SearchQueryService(self.config)
        filters = {'price_max': 1000.0, 'price_min': 500.0}
        service.knn_search(self.mock_embedding, filters, k=50)
        
        # Verify filter was applied
        call_args = mock_os_client.search.call_args
        query_body = call_args[1]['body']
        self.assertIn('bool', query_body['query'])
        self.assertIn('filter', query_body['query']['bool'])
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_knn_search_error(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test KNN search error handling."""
        mock_os_client = Mock()
        mock_os_client.search.side_effect = Exception("OpenSearch error")
        mock_opensearch.return_value = mock_os_client
        
        service = SearchQueryService(self.config)
        
        with self.assertRaises(Exception):
            service.knn_search(self.mock_embedding, {}, k=50)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_bm25_search_success(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test successful BM25 search."""
        mock_os_response = {
            'hits': {
                'hits': [
                    {
                        '_source': {
                            'variant_id': '2',
                            'product_name': 'Modern Chair',
                            'price': 299.0
                        },
                        '_score': 12.5
                    }
                ]
            }
        }
        
        mock_os_client = Mock()
        mock_os_client.search.return_value = mock_os_response
        mock_opensearch.return_value = mock_os_client
        
        service = SearchQueryService(self.config)
        results = service.bm25_search("modern chair", {}, k=50)
        
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]['variant_id'], '2')
        self.assertEqual(results[0]['score'], 12.5)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_bm25_search_with_field_boosts(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test BM25 search applies field boosts."""
        mock_os_client = Mock()
        mock_os_client.search.return_value = {'hits': {'hits': []}}
        mock_opensearch.return_value = mock_os_client
        
        service = SearchQueryService(self.config)
        service.bm25_search("test query", {}, k=50)
        
        # Verify field boosts were applied
        call_args = mock_os_client.search.call_args
        query_body = call_args[1]['body']
        fields = query_body['query']['multi_match']['fields']
        
        # Check that boosts are present
        self.assertTrue(any('^3.0' in f for f in fields))  # product_name boost
        self.assertTrue(any('^2.0' in f for f in fields))  # variant_name boost
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_reciprocal_rank_fusion(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test Reciprocal Rank Fusion combines results correctly."""
        service = SearchQueryService(self.config)
        
        knn_results = [
            {'variant_id': '1', 'product_name': 'Product 1', 'score': 0.9},
            {'variant_id': '2', 'product_name': 'Product 2', 'score': 0.8},
            {'variant_id': '3', 'product_name': 'Product 3', 'score': 0.7}
        ]
        
        bm25_results = [
            {'variant_id': '2', 'product_name': 'Product 2', 'score': 15.0},
            {'variant_id': '4', 'product_name': 'Product 4', 'score': 12.0},
            {'variant_id': '1', 'product_name': 'Product 1', 'score': 10.0}
        ]
        
        results = service.reciprocal_rank_fusion(knn_results, bm25_results, k=60)
        
        # Should have 4 unique products
        self.assertEqual(len(results), 4)
        
        # Product 2 should rank highest (appears in both lists)
        self.assertEqual(results[0]['variant_id'], '2')
        
        # All results should have RRF scores
        for result in results:
            self.assertIn('score', result)
            self.assertGreater(result['score'], 0)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_reciprocal_rank_fusion_no_overlap(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test RRF with no overlapping results."""
        service = SearchQueryService(self.config)
        
        knn_results = [
            {'variant_id': '1', 'product_name': 'Product 1', 'score': 0.9}
        ]
        
        bm25_results = [
            {'variant_id': '2', 'product_name': 'Product 2', 'score': 15.0}
        ]
        
        results = service.reciprocal_rank_fusion(knn_results, bm25_results, k=60)
        
        # Should have both products
        self.assertEqual(len(results), 2)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_format_results(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test result formatting."""
        service = SearchQueryService(self.config)
        
        raw_results = [
            {
                'variant_id': '1',
                'product_name': 'Grey Sofa',
                'variant_name': 'Grey Fabric Sofa',
                'description': 'Modern grey sofa',
                'price': 999.0,
                'currency': 'SGD',
                'score': 0.95,
                'review_rating': 4.5,
                'review_count': 100,
                'stock_status': 'in_stock',
                'frontend_category': 'Sofas',
                'images': [
                    {'url': 'http://example.com/img1.jpg', 'is_default': True},
                    {'url': 'http://example.com/img2.jpg', 'is_default': False}
                ],
                'properties': {'Material': 'Fabric'},
                'options': [{'type': 'Color', 'value': 'Grey'}]
            }
        ]
        
        formatted = service._format_results(raw_results)
        
        self.assertEqual(len(formatted), 1)
        result = formatted[0]
        
        # Check all required fields present
        self.assertEqual(result['variant_id'], '1')
        self.assertEqual(result['product_name'], 'Grey Sofa')
        self.assertEqual(result['price'], 999.0)
        self.assertEqual(result['rank'], 1)
        self.assertEqual(result['image_url'], 'http://example.com/img1.jpg')
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_format_results_no_default_image(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test result formatting when no default image."""
        service = SearchQueryService(self.config)
        
        raw_results = [
            {
                'variant_id': '1',
                'product_name': 'Test Product',
                'price': 100.0,
                'score': 0.5,
                'images': [
                    {'url': 'http://example.com/img1.jpg', 'is_default': False}
                ]
            }
        ]
        
        formatted = service._format_results(raw_results)
        
        # Should use first image as default
        self.assertEqual(formatted[0]['image_url'], 'http://example.com/img1.jpg')
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_get_text_results_empty_query(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test text search with empty query."""
        service = SearchQueryService(self.config)
        
        result = service.get_text_results("")
        
        self.assertEqual(result['status'], 'error')
        self.assertEqual(result['error_code'], 'EMPTY_QUERY')
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_get_image_match_result_invalid_image(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test image search with invalid image."""
        service = SearchQueryService(self.config)
        
        result = service.get_image_match_result("")
        
        self.assertEqual(result['status'], 'error')
        self.assertEqual(result['error_code'], 'INVALID_IMAGE')
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_refine_search_by_tag_category(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test refining search by category tag."""
        # Mock get_text_results
        service = SearchQueryService(self.config)
        service.get_text_results = Mock(return_value={'status': 'success'})
        
        result = service.refine_search_by_tag("sofa", "Dining Chairs", "category")
        
        # Should call get_text_results with refined query
        service.get_text_results.assert_called_once()
        call_args = service.get_text_results.call_args[0][0]
        self.assertIn("Dining Chairs", call_args)
        self.assertIn("sofa", call_args)
    
    @patch('unit_4_search_query.search_service.TagIndexService')
    @patch('unit_4_search_query.search_service.ClaudeLLMService')
    @patch('unit_4_search_query.search_service.OpenSearch')
    @patch('unit_4_search_query.search_service.boto3.client')
    def test_refine_search_by_tag_price_range(self, mock_boto_client, mock_opensearch, mock_llm, mock_tag_index):
        """Test refining search by price range tag."""
        service = SearchQueryService(self.config)
        service.get_text_results = Mock(return_value={'status': 'success'})
        
        result = service.refine_search_by_tag("sofa", "Under $1,000", "price_range")
        
        # Should call get_text_results with price in query
        service.get_text_results.assert_called_once()
        call_args = service.get_text_results.call_args[0][0]
        self.assertIn("Under $1,000", call_args)


if __name__ == '__main__':
    unittest.main()
