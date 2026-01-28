"""
Unit tests for LLM Service (Features 5 & 6)
Tests Claude LLM integration for intent extraction and tag generation.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock
from io import BytesIO
import json
from datetime import datetime, timedelta

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from unit_4_search_query.llm_service import ClaudeLLMService, LLMCache


class TestLLMCache(unittest.TestCase):
    """Test LLM cache functionality."""
    
    def setUp(self):
        """Set up test cache."""
        self.cache = LLMCache()
        self.cache.clear()
    
    def test_cache_singleton(self):
        """Test that LLMCache is a singleton."""
        cache1 = LLMCache()
        cache2 = LLMCache()
        self.assertIs(cache1, cache2)
    
    def test_cache_set_and_get(self):
        """Test basic cache set and get operations."""
        key = "test query"
        value = {"result": "test"}
        
        self.cache.set(key, value, ttl_seconds=60)
        retrieved = self.cache.get(key)
        
        self.assertEqual(retrieved, value)
    
    def test_cache_key_normalization(self):
        """Test that cache keys are normalized (lowercase, stripped)."""
        value = {"result": "test"}
        
        self.cache.set("  Test Query  ", value, ttl_seconds=60)
        
        # Should retrieve with different casing/spacing
        self.assertEqual(self.cache.get("test query"), value)
        self.assertEqual(self.cache.get("TEST QUERY"), value)
        self.assertEqual(self.cache.get("  test query  "), value)
    
    def test_cache_expiry(self):
        """Test that cached values expire after TTL."""
        key = "test query"
        value = {"result": "test"}
        
        # Set with 0 second TTL (immediate expiry)
        self.cache.set(key, value, ttl_seconds=0)
        
        # Should be expired
        self.assertIsNone(self.cache.get(key))
    
    def test_cache_miss(self):
        """Test cache miss returns None."""
        result = self.cache.get("nonexistent key")
        self.assertIsNone(result)
    
    def test_cache_clear(self):
        """Test clearing all cache entries."""
        self.cache.set("key1", {"val": 1}, ttl_seconds=60)
        self.cache.set("key2", {"val": 2}, ttl_seconds=60)
        
        self.cache.clear()
        
        self.assertIsNone(self.cache.get("key1"))
        self.assertIsNone(self.cache.get("key2"))


class TestClaudeLLMService(unittest.TestCase):
    """Test Claude LLM Service."""
    
    def setUp(self):
        """Set up test configuration and service."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock_region': 'us-east-1',
                'bedrock': {
                    'text_model_id': 'amazon.titan-embed-text-v2:0',
                    'image_model_id': 'amazon.titan-embed-image-v1'
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
                    'categories': ['Sofas', 'Tables', 'Chairs', 'Beds'],
                    'materials': ['Wood', 'Fabric', 'Leather', 'Metal'],
                    'styles': ['Modern', 'Traditional', 'Minimalist'],
                    'colors': ['Grey', 'Brown', 'White', 'Black'],
                    'price_ranges': ['Under $1,000', '$1,000-$2,000', 'Over $2,000']
                }
            }
        }
        
        # Clear caches before each test
        LLMCache().clear()
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_init(self, mock_boto_client):
        """Test service initialization."""
        service = ClaudeLLMService(self.config)
        
        # Check Bedrock client created with correct region
        mock_boto_client.assert_called_with(
            'bedrock-runtime',
            region_name='us-east-1'
        )
        
        # Check configuration loaded
        self.assertEqual(service.similarity_threshold, 0.3)
        self.assertEqual(service.min_tags, 3)
        self.assertEqual(service.max_tags, 10)
    
    def test_should_trigger_fallback_below_threshold(self):
        """Test fallback triggers when score is below threshold."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            # Score below threshold should trigger
            self.assertTrue(service.should_trigger_fallback(0.2))
            self.assertTrue(service.should_trigger_fallback(0.29))
    
    def test_should_trigger_fallback_above_threshold(self):
        """Test fallback doesn't trigger when score is above threshold."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            # Score above threshold should not trigger
            self.assertFalse(service.should_trigger_fallback(0.3))
            self.assertFalse(service.should_trigger_fallback(0.5))
            self.assertFalse(service.should_trigger_fallback(0.9))
    
    def test_should_trigger_fallback_disabled(self):
        """Test fallback doesn't trigger when disabled in config."""
        config = self.config.copy()
        config['llm_fallback']['enabled'] = False
        
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(config)
            
            # Should not trigger even with low score
            self.assertFalse(service.should_trigger_fallback(0.1))
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_invoke_claude_success(self, mock_boto_client):
        """Test successful Claude invocation."""
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': 'Test response'}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        result = service._invoke_claude("test prompt", service.intent_model_id)
        
        self.assertEqual(result, 'Test response')
        
        # Verify correct model called
        call_args = mock_bedrock.invoke_model.call_args
        self.assertEqual(call_args[1]['modelId'], 'anthropic.claude-sonnet-4-5-20250929-v1:0')
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_invoke_claude_error(self, mock_boto_client):
        """Test Claude invocation error handling."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("API error")
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        
        with self.assertRaises(Exception) as context:
            service._invoke_claude("test prompt", service.intent_model_id)
        
        self.assertIn("API error", str(context.exception))
    
    def test_extract_json_valid(self):
        """Test JSON extraction from text."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            text = 'Here is the result: {"key": "value"} and more text'
            result = service._extract_json(text)
            
            self.assertEqual(result, '{"key": "value"}')
    
    def test_extract_json_no_json(self):
        """Test JSON extraction when no JSON present."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            text = 'No JSON here'
            result = service._extract_json(text)
            
            self.assertEqual(result, text)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_extract_intents_success(self, mock_boto_client):
        """Test successful intent extraction."""
        claude_response = json.dumps({
            'abstract_terms': ['royal', 'modern'],
            'concrete_attributes': {
                'royal': ['ornate', 'elegant', 'gold accents'],
                'modern': ['clean lines', 'minimalist']
            },
            'enhanced_query': 'elegant ornate dining table with clean lines'
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        result = service.extract_intents("royal yet modern dining table")
        
        self.assertEqual(result['abstract_terms'], ['royal', 'modern'])
        self.assertIn('royal', result['concrete_attributes'])
        self.assertIn('modern', result['concrete_attributes'])
        self.assertIn('elegant', result['concrete_attributes']['royal'])
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_extract_intents_cache_hit(self, mock_boto_client):
        """Test intent extraction uses cache on second call."""
        claude_response = json.dumps({
            'abstract_terms': ['cozy'],
            'concrete_attributes': {'cozy': ['soft', 'comfortable']},
            'enhanced_query': 'soft comfortable sofa'
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        
        # First call - should invoke Claude
        result1 = service.extract_intents("cozy sofa")
        self.assertEqual(mock_bedrock.invoke_model.call_count, 1)
        
        # Second call - should use cache
        result2 = service.extract_intents("cozy sofa")
        self.assertEqual(mock_bedrock.invoke_model.call_count, 1)  # No additional call
        
        # Results should be identical
        self.assertEqual(result1, result2)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_extract_intents_error_handling(self, mock_boto_client):
        """Test intent extraction handles errors gracefully."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("API error")
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        result = service.extract_intents("test query")
        
        # Should return default structure on error
        self.assertEqual(result['abstract_terms'], [])
        self.assertEqual(result['concrete_attributes'], {})
        self.assertEqual(result['enhanced_query'], "test query")
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_with_llm(self, mock_boto_client):
        """Test tag generation with LLM."""
        claude_response = json.dumps({
            'tags': [
                {'tag': 'Sofas', 'type': 'category', 'relevance': 0.9},
                {'tag': 'Fabric', 'type': 'material', 'relevance': 0.8},
                {'tag': 'Modern', 'type': 'style', 'relevance': 0.7}
            ]
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        tags = service._generate_tags_with_llm("grey sofa")
        
        self.assertEqual(len(tags), 3)
        self.assertEqual(tags[0]['tag'], 'Sofas')
        self.assertEqual(tags[0]['type'], 'category')
        self.assertEqual(tags[1]['tag'], 'Fabric')
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_with_search_results(self, mock_boto_client):
        """Test tag generation includes search results context."""
        claude_response = json.dumps({
            'tags': [
                {'tag': 'Sofas', 'type': 'category', 'relevance': 0.9}
            ]
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        
        search_results = [
            {'product_name': 'Grey Sofa'},
            {'product_name': 'Blue Sofa'}
        ]
        
        tags = service._generate_tags_with_llm("sofa", search_results)
        
        # Verify search results were included in prompt
        call_args = mock_bedrock.invoke_model.call_args
        body = json.loads(call_args[1]['body'])
        prompt = body['messages'][0]['content']
        self.assertIn('Grey Sofa', prompt)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_respects_max_tags(self, mock_boto_client):
        """Test that tag generation respects max_tags limit."""
        # Generate more tags than max_tags
        tags_list = [
            {'tag': f'Tag{i}', 'type': 'category', 'relevance': 0.9 - i*0.05}
            for i in range(15)
        ]
        
        claude_response = json.dumps({'tags': tags_list})
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        tags = service._generate_tags_with_llm("test query")
        
        # Should be limited to max_tags (10)
        self.assertLessEqual(len(tags), 10)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_validates_against_catalog(self, mock_boto_client):
        """Test that generated tags are validated against catalog."""
        # Include both valid and invalid tags
        claude_response = json.dumps({
            'tags': [
                {'tag': 'Sofas', 'type': 'category', 'relevance': 0.9},  # Valid
                {'tag': 'InvalidCategory', 'type': 'category', 'relevance': 0.8},  # Invalid
                {'tag': 'Wood', 'type': 'material', 'relevance': 0.7}  # Valid
            ]
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        tags = service._generate_tags_with_llm("test query")
        
        # Should only include valid tags
        tag_names = [t['tag'] for t in tags]
        self.assertIn('Sofas', tag_names)
        self.assertIn('Wood', tag_names)
        self.assertNotIn('InvalidCategory', tag_names)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_cache(self, mock_boto_client):
        """Test that tag generation uses cache."""
        claude_response = json.dumps({
            'tags': [{'tag': 'Sofas', 'type': 'category', 'relevance': 0.9}]
        })
        
        mock_response = {
            'body': BytesIO(json.dumps({
                'content': [{'text': claude_response}]
            }).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        
        # First call
        tags1 = service._generate_tags_with_llm("sofa")
        self.assertEqual(mock_bedrock.invoke_model.call_count, 1)
        
        # Second call - should use cache
        tags2 = service._generate_tags_with_llm("sofa")
        self.assertEqual(mock_bedrock.invoke_model.call_count, 1)  # No additional call
        
        self.assertEqual(tags1, tags2)
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_disabled(self, mock_boto_client):
        """Test that tag generation returns empty when disabled."""
        config = self.config.copy()
        config['related_tags']['enabled'] = False
        
        service = ClaudeLLMService(config)
        tags = service._generate_tags_with_llm("test query")
        
        self.assertEqual(tags, [])
    
    @patch('unit_4_search_query.llm_service.boto3.client')
    def test_generate_related_tags_error_handling(self, mock_boto_client):
        """Test tag generation handles errors gracefully."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("API error")
        mock_boto_client.return_value = mock_bedrock
        
        service = ClaudeLLMService(self.config)
        tags = service._generate_tags_with_llm("test query")
        
        # Should return empty list on error
        self.assertEqual(tags, [])
    
    def test_is_valid_tag_category(self):
        """Test tag validation for categories."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            self.assertTrue(service._is_valid_tag('Sofas', 'category'))
            self.assertTrue(service._is_valid_tag('sofas', 'category'))  # Case insensitive
            self.assertFalse(service._is_valid_tag('InvalidCategory', 'category'))
    
    def test_is_valid_tag_material(self):
        """Test tag validation for materials."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            self.assertTrue(service._is_valid_tag('Wood', 'material'))
            self.assertTrue(service._is_valid_tag('Fabric', 'material'))
            self.assertFalse(service._is_valid_tag('InvalidMaterial', 'material'))
    
    def test_build_catalog_context(self):
        """Test catalog context building for prompts."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            context = service._build_catalog_context()
            
            self.assertIn('Categories:', context)
            self.assertIn('Materials:', context)
            self.assertIn('Sofas', context)
            self.assertIn('Wood', context)
    
    def test_build_tag_catalog_context(self):
        """Test tag catalog context building."""
        with patch('unit_4_search_query.llm_service.boto3.client'):
            service = ClaudeLLMService(self.config)
            
            context = service._build_tag_catalog_context()
            
            self.assertIn('Categories:', context)
            self.assertIn('Price Ranges:', context)
            self.assertIn('Under $1,000', context)


if __name__ == '__main__':
    unittest.main()
