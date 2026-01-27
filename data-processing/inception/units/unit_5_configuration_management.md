# Unit 5: Configuration Management

## Overview
The Configuration Management unit provides centralized configuration for all system components via YAML files. This unit ensures consistent configuration across services, enables easy parameter tuning without code changes, and validates configuration on startup.

## Responsibilities
- Load and parse YAML configuration files
- Validate configuration values
- Provide configuration access to all services
- Support environment-specific configurations
- Handle configuration errors gracefully
- Provide configuration documentation

## User Stories Included

### From Epic 6: Configuration Management
- **US-6.1**: YAML Configuration System

## Acceptance Criteria Summary
- Reads configuration from YAML file(s)
- Validates configuration on startup
- Provides clear error messages for invalid config
- Supports all configurable parameters across all units
- Configuration is accessible to all services
- Environment variables can override config values

## Technical Components
- YAML parser
- Configuration validator
- Configuration schema definitions
- Configuration accessor/provider
- Environment variable handler

## Dependencies
- **Downstream**: All other units (1, 2, 3, 4) consume configuration

## Interfaces

### Configuration File Structure
```yaml
# config.yaml

# Environment
environment: "development"  # development, staging, production

# AWS Configuration
aws:
  region: "us-east-1"
  credentials:
    access_key_id: "${AWS_ACCESS_KEY_ID}"  # From env var
    secret_access_key: "${AWS_SECRET_ACCESS_KEY}"  # From env var
  
  s3:
    bucket: "your-ecommerce-data-bucket"
    prefix: "data/active_only/"
  
  bedrock:
    region: "us-east-1"
    text_model: "amazon.titan-embed-text-v1"
    image_model: "amazon.titan-embed-image-v1"
    max_retries: 3
    retry_delay_seconds: 1
    timeout_seconds: 30
  
  opensearch:
    endpoint: "https://your-domain.region.es.amazonaws.com"
    port: 443
    username: "${OPENSEARCH_USERNAME}"  # From env var
    password: "${OPENSEARCH_PASSWORD}"  # From env var
    use_ssl: true
    verify_certs: true
    connection_timeout: 30
    max_retries: 3

# Data Ingestion Configuration
data_ingestion:
  csv_files:
    - variant.csv
    - variant_affinity.csv
    - variant_file.csv
    - variant_image.csv
    - variant_option.csv
    - variant_property.csv
  
  text_aggregation:
    field_weights:
      variant_name: 3.0
      product_name: 3.0
      description: 2.0
      categories: 1.5
      properties: 1.0
      options: 1.0
    max_text_length: 8000
  
  batch_size: 100
  output_format: "json"

# Embedding Generation Configuration
embedding_generation:
  text:
    batch_size: 25
    max_text_length: 8000
    truncate_strategy: "end"  # end, middle, or start
  
  image:
    supported_formats: ["jpg", "jpeg", "png"]
    max_size_mb: 5
    download_timeout_seconds: 30
    cache_enabled: true
    cache_dir: "/tmp/image_cache"
    batch_size: 25
  
  rate_limiting:
    requests_per_second: 10
    burst_size: 20

# Search Index Configuration
search_index:
  text_index:
    name: "product_text_embeddings"
    shards: 2
    replicas: 1
    knn_dimension: 1536
    knn_method: "hnsw"
    knn_space_type: "cosinesimil"
    ef_search: 512
  
  image_index:
    name: "product_image_embeddings"
    shards: 2
    replicas: 1
    knn_dimension: 1024
    knn_method: "hnsw"
    knn_space_type: "cosinesimil"
    ef_search: 512
  
  indexing:
    bulk_size: 500
    bulk_timeout_seconds: 60
    refresh_interval: "1s"
    max_retries: 3
    retry_delay_seconds: 2

# Search Query Configuration
search_query:
  # Search behavior
  default_search_mode: "hybrid"  # knn, bm25, or hybrid
  max_results: 50
  response_timeout_seconds: 3
  
  # KNN settings
  knn:
    k: 100
    min_score: 0.0
  
  # BM25 settings
  bm25:
    k1: 1.2
    b: 0.75
    field_boosts:
      variant_name: 3.0
      product_name: 3.0
      description: 2.0
      aggregated_text: 1.0
      properties: 1.0
  
  # Hybrid search settings
  hybrid:
    rrf_k: 60
    knn_weight: 0.5
    bm25_weight: 0.5
  
  # Image search settings
  image_search:
    min_similarity_threshold: 0.0
    supported_formats: ["jpg", "jpeg", "png"]
    max_image_size_mb: 5
  
  # Filter extraction
  filter_extraction:
    enabled: true
    extract_price_range: true
    extract_materials: true
    extract_colors: true
    extract_sizes: true
    extract_categories: true
    extract_dimensions: true
    extract_availability: true
  
  # Response configuration
  response:
    include_fields: "all"  # or list: ["variant_id", "name", "price", ...]
    include_scores: true
    include_metadata: true
  
  # Performance
  cache_enabled: true
  cache_ttl_seconds: 3600
  parallel_search: true

# Logging Configuration
logging:
  level: "INFO"  # DEBUG, INFO, WARN, ERROR
  format: "json"  # json or text
  output: "stdout"  # stdout, file, or cloudwatch
  file_path: "/var/log/search_engine.log"  # if output=file
  cloudwatch_log_group: "/aws/search-engine"  # if output=cloudwatch
  
  # What to log
  log_requests: true
  log_responses: false  # Can be large
  log_performance: true
  log_errors: true

# Performance & Monitoring
performance:
  enable_metrics: true
  metrics_interval_seconds: 60
  slow_query_threshold_seconds: 2.0
```

### Configuration Access Interface
```python
class Config:
    """Singleton configuration manager"""
    
    @staticmethod
    def load(config_path: str) -> None:
        """Load configuration from YAML file"""
        pass
    
    @staticmethod
    def get(key_path: str, default=None):
        """
        Get configuration value by dot-notation path.
        Example: Config.get('aws.bedrock.text_model')
        """
        pass
    
    @staticmethod
    def get_aws_config() -> dict:
        """Get AWS configuration"""
        pass
    
    @staticmethod
    def get_data_ingestion_config() -> dict:
        """Get data ingestion configuration"""
        pass
    
    @staticmethod
    def get_embedding_config() -> dict:
        """Get embedding generation configuration"""
        pass
    
    @staticmethod
    def get_search_index_config() -> dict:
        """Get search index configuration"""
        pass
    
    @staticmethod
    def get_search_query_config() -> dict:
        """Get search query configuration"""
        pass
    
    @staticmethod
    def get_logging_config() -> dict:
        """Get logging configuration"""
        pass
    
    @staticmethod
    def validate() -> list[str]:
        """
        Validate configuration.
        Returns list of validation errors (empty if valid)
        """
        pass
```

### Environment Variable Support
```bash
# Environment variables can override config values
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export OPENSEARCH_USERNAME="admin"
export OPENSEARCH_PASSWORD="your-password"
export ENVIRONMENT="production"
export LOG_LEVEL="INFO"
```

## Configuration Validation Rules

### Required Fields
- aws.region
- aws.s3.bucket
- aws.bedrock.text_model
- aws.bedrock.image_model
- aws.opensearch.endpoint
- search_query.max_results
- search_query.response_timeout_seconds

### Value Constraints
- search_query.max_results: 1-100
- search_query.response_timeout_seconds: 1-10
- search_query.hybrid.rrf_k: >0
- search_query.hybrid.knn_weight: 0.0-1.0
- search_query.hybrid.bm25_weight: 0.0-1.0
- embedding_generation.text.batch_size: 1-100
- embedding_generation.image.batch_size: 1-100
- search_index.*.shards: 1-10
- search_index.*.replicas: 0-3

### Validation Errors
```python
# Example validation errors
[
    "Missing required field: aws.region",
    "Invalid value for search_query.max_results: 150 (must be 1-100)",
    "Invalid search mode: 'invalid' (must be 'knn', 'bm25', or 'hybrid')",
    "Sum of knn_weight and bm25_weight must equal 1.0"
]
```

## Error Handling
- Missing config file → Clear error message with expected path
- Invalid YAML syntax → Parse error with line number
- Missing required fields → List all missing fields
- Invalid values → Specific error for each invalid value
- Environment variable not set → Error with variable name

## Testing Requirements
- Unit tests for config loading
- Unit tests for config validation
- Unit tests for environment variable substitution
- Test with valid config file
- Test with invalid config files (various errors)
- Test with missing config file
- Test config access methods

## Non-Functional Requirements
- Fast loading (<1 second)
- Clear error messages
- Support for environment-specific configs
- Documentation for all config parameters
- Schema validation
- Type checking for config values

## Configuration Documentation
Each configuration parameter should be documented with:
- Description
- Type
- Default value
- Valid range/values
- Example
- Impact on system behavior
