# Unit 1: Data Ingestion Service

## Overview
The Data Ingestion Service is responsible for loading product data from S3, enriching it by combining multiple CSV sources, and preparing it for embedding generation. This unit acts as the foundation of the search system by ensuring clean, complete, and structured data is available.

## Responsibilities
- Connect to S3 and retrieve CSV files
- Parse and validate CSV data
- Join data from multiple sources (variant, images, properties, options, affinity, files)
- Enrich product records with complete information
- Aggregate searchable text fields
- Store enriched data for downstream processing
- Handle errors and provide logging

## User Stories Included

### From Epic 1: Data Ingestion and Preparation
- **US-1.1**: Bulk Data Loading from S3
- **US-1.2**: Product Data Enrichment
- **US-1.3**: Text Content Aggregation for Embedding

## Acceptance Criteria Summary
- Successfully loads all 6 CSV files from S3
- Validates data integrity and logs errors
- Creates enriched product records with all metadata
- Aggregates text fields for semantic search
- Provides progress tracking and logging
- Idempotent operations (can be re-run safely)

## Technical Components
- S3 client for data retrieval
- CSV parser
- Data validation module
- Data enrichment engine (joins multiple sources)
- Text aggregation module
- Storage interface (for passing data to embedding service)

## Dependencies
- **Upstream**: S3 bucket with CSV files
- **Downstream**: Embedding Generation Service (Unit 2)

## Interfaces

### Output Interface
```python
class EnrichedProduct:
    variant_id: str
    product_id: str
    variant_name: str
    product_name: str
    description: str
    aggregated_text: str  # All searchable text combined
    price: float
    currency: str
    categories: dict
    images: list[dict]  # All images with metadata
    properties: dict
    options: dict
    affinity: list[str]  # Related variant IDs
    files: list[dict]
    reviews: dict
    metadata: dict  # All other fields
```

### Configuration
```yaml
data_ingestion:
  s3_bucket: "your-bucket-name"
  s3_prefix: "data/active_only/"
  csv_files:
    - variant.csv
    - variant_affinity.csv
    - variant_file.csv
    - variant_image.csv
    - variant_option.csv
    - variant_property.csv
  text_aggregation:
    fields:
      - variant_name: 3.0  # weight
      - product_name: 3.0
      - description: 2.0
      - categories: 1.5
      - properties: 1.0
      - options: 1.0
  output_format: "json"
  batch_size: 100
```

## Error Handling
- Invalid CSV format → Log error, skip record
- Missing required fields → Log warning, use defaults
- S3 connection failure → Retry with exponential backoff
- Data validation failure → Log error with details

## Performance Targets
- Load and enrich 1000 products in under 2 minutes
- Memory efficient processing (streaming where possible)

## Testing Requirements
- Unit tests for CSV parsing
- Unit tests for data enrichment logic
- Integration test with sample S3 data
- Validation of enriched output format

## Non-Functional Requirements
- Idempotent operations
- Comprehensive logging
- Progress tracking
- Graceful error handling
- Memory efficient for large datasets
