# Product Overview

## E-Commerce Semantic Search Engine

Backend search system for furniture e-commerce enabling semantic text search and image similarity search using AWS Bedrock and OpenSearch.

## Core Capabilities

- **Text Search**: Natural language queries with semantic understanding and filter extraction
- **Image Search**: Visual similarity search using product images
- **Hybrid Search**: Combines KNN vector search + BM25 keyword search with Reciprocal Rank Fusion
- **LLM Fallback**: Claude extracts intent from abstract queries (e.g., "modern yet royal table")
- **Related Tags**: Google Shopping-style clickable refinement tags
- **Smart Filters**: Auto-detects price, color, material, category, size from queries

## Architecture

```
User Request → API (Flask/Lambda) → Bedrock (Embeddings/LLM) + OpenSearch (Search) + S3 (Data)
```

## Key Features

### Feature 5: LLM Fallback for Intent Extraction
When search results have low similarity scores (< 0.3 threshold), Claude LLM extracts concrete product attributes from abstract terms:
- "royal" → "ornate", "elegant", "traditional", "gold accents"
- "cozy" → "soft fabric", "plush", "comfortable", "warm colors"

### Feature 6: Related Search Tags
Two-tier tag generation system:
- **Tier 1 (95%)**: Pre-computed tag index for instant retrieval (<1ms)
- **Tier 2 (5%)**: LLM-generated tags for unique queries (1-2s)
- All tags validated against product catalog

## Product Catalog

- 3,693 furniture products (sofas, tables, chairs, beds, etc.)
- Multiple images per product (white background + lifestyle)
- Rich metadata: materials, dimensions, colors, styles, prices
- Categories, properties, options, reviews, ratings

## Performance Targets

- Response time: <3 seconds (p95)
- Max results: 50 per query
- Data ingestion: <10 minutes for full catalog
