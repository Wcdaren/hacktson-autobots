"""
Comprehensive unit tests for EmbeddingService (Unit 2)
Tests all embedding generation functions.
"""

import unittest
from unittest.mock import Mock, patch, MagicMock, call
import json
import sys
from pathlib import Path
from io import BytesIO
import base64

# Add parent directory to path
sys.path.append(str(Path(__file__).parent.parent.parent))

from unit_2_embedding_generation.embedding_service import EmbeddingService


class TestEmbeddingServiceComplete(unittest.TestCase):
    """Comprehensive test cases for EmbeddingService."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.config = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock_region': 'us-east-1',
                'bedrock': {
                    'text_model_id': 'amazon.titan-embed-text-v2:0',
                    'image_model_id': 'amazon.titan-embed-image-v1',
                    'max_retries': 3
                }
            },
            'embedding_generation': {
                'batch_size': 25,
                'max_workers': 2
            }
        }
        self.mock_embedding_1024 = [0.1] * 1024
    
    # =========================================================================
    # Initialization Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_init_with_bedrock_region(self, mock_boto_client):
        """Test service initialization with explicit bedrock_region."""
        service = EmbeddingService(self.config)
        
        self.assertEqual(service.text_model_id, 'amazon.titan-embed-text-v2:0')
        self.assertEqual(service.image_model_id, 'amazon.titan-embed-image-v1')
        self.assertEqual(service.max_retries, 3)
        mock_boto_client.assert_called_once_with(
            'bedrock-runtime',
            region_name='us-east-1'
        )
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_init_without_bedrock_region(self, mock_boto_client):
        """Test service initialization falls back to main region."""
        config_no_bedrock_region = {
            'aws': {
                'region': 'ap-southeast-1',
                'bedrock': {
                    'text_model_id': 'amazon.titan-embed-text-v2:0',
                    'image_model_id': 'amazon.titan-embed-image-v1',
                    'max_retries': 3
                }
            },
            'embedding_generation': {'batch_size': 25, 'max_workers': 2}
        }
        
        service = EmbeddingService(config_no_bedrock_region)
        
        mock_boto_client.assert_called_once_with(
            'bedrock-runtime',
            region_name='ap-southeast-1'
        )
    
    # =========================================================================
    # Text Embedding Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embedding_success(self, mock_boto_client):
        """Test successful text embedding generation."""
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        embedding = service.generate_text_embedding("modern grey sofa")
        
        self.assertEqual(len(embedding), 1024)
        self.assertEqual(embedding, self.mock_embedding_1024)
        
        # Verify API call
        mock_bedrock.invoke_model.assert_called_once()
        call_args = mock_bedrock.invoke_model.call_args
        self.assertEqual(call_args[1]['modelId'], 'amazon.titan-embed-text-v2:0')
        self.assertEqual(call_args[1]['contentType'], 'application/json')
        
        body = json.loads(call_args[1]['body'])
        self.assertEqual(body['inputText'], 'modern grey sofa')
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embedding_empty_string(self, mock_boto_client):
        """Test embedding generation with empty string."""
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        embedding = service.generate_text_embedding("")
        
        self.assertEqual(len(embedding), 1024)
        mock_bedrock.invoke_model.assert_called_once()
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embedding_long_text(self, mock_boto_client):
        """Test embedding generation with long text."""
        long_text = "sofa " * 1000  # Very long text
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        embedding = service.generate_text_embedding(long_text)
        
        self.assertEqual(len(embedding), 1024)
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embedding_error(self, mock_boto_client):
        """Test error handling in text embedding generation."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("Bedrock API error")
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        
        with self.assertRaises(Exception) as context:
            service.generate_text_embedding("test")
        
        self.assertIn("Bedrock API error", str(context.exception))
    
    # =========================================================================
    # Batch Text Embedding Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embeddings_batch_small(self, mock_boto_client):
        """Test batch embedding generation with small batch."""
        def mock_invoke(*args, **kwargs):
            # Create a new BytesIO for each call to avoid stream exhaustion
            return {
                'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
            }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = mock_invoke
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        texts = ["sofa", "chair", "table"]
        embeddings = service.generate_text_embeddings_batch(texts)
        
        self.assertEqual(len(embeddings), 3)
        # All embeddings should be successful
        for embedding in embeddings:
            self.assertEqual(len(embedding), 1024)
        self.assertEqual(mock_bedrock.invoke_model.call_count, 3)
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embeddings_batch_large(self, mock_boto_client):
        """Test batch embedding generation with large batch."""
        def mock_invoke(*args, **kwargs):
            # Create a new BytesIO for each call to avoid stream exhaustion
            return {
                'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
            }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = mock_invoke
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        texts = [f"product {i}" for i in range(50)]  # 50 texts, batch_size=25
        embeddings = service.generate_text_embeddings_batch(texts)
        
        self.assertEqual(len(embeddings), 50)
        self.assertEqual(mock_bedrock.invoke_model.call_count, 50)
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_text_embeddings_batch_with_failures(self, mock_boto_client):
        """Test batch embedding handles individual failures."""
        call_count = [0]
        
        def mock_invoke(*args, **kwargs):
            call_count[0] += 1
            if call_count[0] == 2:  # Fail on second call
                raise Exception("API error")
            return {'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())}
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = mock_invoke
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        texts = ["text1", "text2", "text3"]
        embeddings = service.generate_text_embeddings_batch(texts)
        
        # Should have 3 results total
        self.assertEqual(len(embeddings), 3)
        
        # Due to as_completed, order is not preserved, but we should have:
        # - 2 successful embeddings (1024 dimensions each)
        # - 1 failed embedding (empty list)
        successful = [e for e in embeddings if len(e) == 1024]
        failed = [e for e in embeddings if len(e) == 0]
        
        self.assertEqual(len(successful), 2, "Should have 2 successful embeddings")
        self.assertEqual(len(failed), 1, "Should have 1 failed embedding")
        self.assertEqual(failed[0], [], "Failed embedding should be empty list")
    
    # =========================================================================
    # Image Embedding Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_image_embedding_success(self, mock_boto_client):
        """Test successful image embedding generation."""
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        
        # Create fake image bytes
        fake_image = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR'
        embedding = service.generate_image_embedding(fake_image)
        
        self.assertEqual(len(embedding), 1024)
        
        # Verify API call
        mock_bedrock.invoke_model.assert_called_once()
        call_args = mock_bedrock.invoke_model.call_args
        self.assertEqual(call_args[1]['modelId'], 'amazon.titan-embed-image-v1')
        
        body = json.loads(call_args[1]['body'])
        self.assertIn('inputImage', body)
        # Verify it's base64 encoded
        decoded = base64.b64decode(body['inputImage'])
        self.assertEqual(decoded, fake_image)
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_image_embedding_error(self, mock_boto_client):
        """Test error handling in image embedding generation."""
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.side_effect = Exception("Invalid image format")
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        
        with self.assertRaises(Exception) as context:
            service.generate_image_embedding(b'invalid')
        
        self.assertIn("Invalid image format", str(context.exception))
    
    # =========================================================================
    # Query Embedding Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_query_embedding(self, mock_boto_client):
        """Test query embedding generation (should be same as text embedding)."""
        mock_response = {
            'body': BytesIO(json.dumps({'embedding': self.mock_embedding_1024}).encode())
        }
        
        mock_bedrock = Mock()
        mock_bedrock.invoke_model.return_value = mock_response
        mock_boto_client.return_value = mock_bedrock
        
        service = EmbeddingService(self.config)
        query_embedding = service.generate_query_embedding("grey sofa under $1000")
        
        self.assertEqual(len(query_embedding), 1024)
        mock_bedrock.invoke_model.assert_called_once()
    
    # =========================================================================
    # Product Enrichment Tests
    # =========================================================================
    
    @patch.object(EmbeddingService, 'generate_text_embeddings_batch')
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_enrich_products_with_embeddings(self, mock_boto_client, mock_batch):
        """Test enriching products with text embeddings."""
        mock_boto_client.return_value = Mock()
        mock_batch.return_value = [
            self.mock_embedding_1024,
            self.mock_embedding_1024
        ]
        
        service = EmbeddingService(self.config)
        
        products = [
            {'variant_id': '1', 'aggregated_text': 'grey sofa'},
            {'variant_id': '2', 'aggregated_text': 'wooden chair'}
        ]
        
        enriched = service.enrich_products_with_embeddings(products)
        
        self.assertEqual(len(enriched), 2)
        self.assertIn('text_embedding', enriched[0])
        self.assertIn('text_embedding', enriched[1])
        self.assertEqual(len(enriched[0]['text_embedding']), 1024)
        
        # Verify batch method was called with correct texts
        mock_batch.assert_called_once()
        call_args = mock_batch.call_args[0][0]
        self.assertEqual(call_args, ['grey sofa', 'wooden chair'])
    
    @patch.object(EmbeddingService, 'generate_text_embeddings_batch')
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_enrich_products_empty_list(self, mock_boto_client, mock_batch):
        """Test enriching empty product list."""
        mock_boto_client.return_value = Mock()
        mock_batch.return_value = []
        
        service = EmbeddingService(self.config)
        enriched = service.enrich_products_with_embeddings([])
        
        self.assertEqual(len(enriched), 0)
        mock_batch.assert_called_once_with([])
    
    # =========================================================================
    # Image Embeddings for Products Tests
    # =========================================================================
    
    @patch('unit_2_embedding_generation.embedding_service.boto3.client')
    def test_generate_image_embeddings_for_products(self, mock_boto_client):
        """Test image embedding generation for products (currently not implemented)."""
        mock_boto_client.return_value = Mock()
        
        service = EmbeddingService(self.config)
        products = [{'variant_id': '1', 'images': []}]
        
        # Should return products unchanged (not implemented)
        result = service.generate_image_embeddings_for_products(products)
        
        self.assertEqual(result, products)


if __name__ == '__main__':
    unittest.main()
