# Unit 2: Embedding Generation Service

## Overview
The Embedding Generation Service is responsible for creating vector embeddings for both text and images using AWS Bedrock Titan models. This unit transforms enriched product data into numerical representations that enable semantic and visual similarity search.

## Responsibilities
- Generate text embeddings using Bedrock Titan text model
- Generate image embeddings using Bedrock Titan multimodal model
- Download and validate product images
- Batch process embeddings for efficiency
- Handle API rate limits and retries
- Store embeddings with metadata
- Provide progress tracking and logging

## User Stories Included

### From Epic 2: Embedding Generation
- **US-2.1**: Text Embedding Generation using Bedrock Titan
- **US-2.2**: Image Embedding Generation using Bedrock Titan

## Acceptance Criteria Summary
- Generates embeddings for aggregated product text
- Generates embeddings for all product images (white background + lifestyle)
- Validates image formats (JPG, PNG only)
- Implements batch processing for efficiency
- Handles Bedrock API rate limits gracefully
- Retries failed operations with exponential backoff
- Stores embeddings with variant_id and metadata
- Tracks and logs progress

## Technical Components
- Bedrock client for Titan models
- Image downloader and validator
- Batch processing engine
- Retry mechanism with exponential backoff
- Embedding storage interface
- Progress tracker

## Dependencies
- **Upstream**: Data Ingestion Service (Unit 1) - enriched product data
- **Downstream**: Search Index Service (Unit 3)
- **External**: AWS Bedrock Titan models

## Interfaces

### Input Interface
```python
# From Unit 1
class EnrichedProduct:
    variant_id: str
    aggregated_text: str
    images: list[dict]
    # ... other fields
```

### Output Interface
```python
class TextEmbedding:
    variant_id: str
    embedding: list[float]  # Vector from Titan
    embedding_model: str
    text_length: int
    created_at: datetime

class ImageEmbedding:
    variant_id: str
    image_url: str
    image_type: str  # "White Background" or "Lifestyle"
    image_position: int
    is_default: bool
    embedding: list[float]  # Vector from Titan
    embedding_model: str
    created_at: datetime
```

### Configuration
```yaml
embedding_generation:
  bedrock:
    region: "us-east-1"
    text_model: "amazon.titan-embed-text-v1"
    image_model: "amazon.titan-embed-image-v1"
    max_retries: 3
    retry_delay: 1  # seconds
    batch_size: 25
  
  text_embedding:
    max_text_length: 8000  # characters
    truncate_strategy: "end"  # or "middle"
  
  image_embedding:
    supported_formats: ["jpg", "jpeg", "png"]
    max_image_size_mb: 5
    download_timeout: 30  # seconds
    cache_images: true
    cache_dir: "/tmp/image_cache"
  
  rate_limiting:
    requests_per_second: 10
    burst_size: 20
```

## Error Handling
- Bedrock API failure → Retry with exponential backoff (max 3 attempts)
- Rate limit exceeded → Wait and retry with backoff
- Invalid image format → Log error, skip image
- Image download failure → Retry, then skip if persistent
- Text too long → Truncate according to strategy
- Network timeout → Retry with increased timeout

## Performance Targets
- Generate text embeddings for 1000 products in under 5 minutes
- Generate image embeddings for 5000 images in under 15 minutes
- Handle rate limits without failures
- Batch processing efficiency >80%

## Testing Requirements
- Unit tests for text embedding generation
- Unit tests for image embedding generation
- Mock Bedrock API for testing
- Test retry logic with simulated failures
- Test rate limiting behavior
- Integration test with real Bedrock API (small sample)
- Validate embedding dimensions and format

## Non-Functional Requirements
- Efficient batch processing
- Graceful handling of API limits
- Comprehensive error logging
- Progress tracking
- Resumable operations (can restart from failure point)
- Cost-efficient API usage
