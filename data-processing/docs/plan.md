# Project Plan: E-Commerce Semantic Search Engine

## Current Phase: Phase 1 - Inception
## Current Step: Step 1.1 - Create User Stories

---

## Plan Steps

### Phase 1: Inception

#### Step 1.1: Create User Stories ✅ COMPLETED
- [x] Analyze the data structure from CSV files
- [x] Understand the requirements for semantic search and image similarity search
- [x] Gather clarifications from stakeholder
- [x] Create comprehensive user stories for the backend search system
- [x] Document user stories in /inception/user_stories.md
- [x] Request review and approval - APPROVED

**Questions:**
- [Question] What is the expected response time for search queries (text and image)?
- [Answer] Max 3 seconds (hackathon demo, not production)

- [Question] Should the search results include ranking/scoring information in the response?
- [Answer] Yes

- [Question] What is the expected maximum number of results to return per query?
- [Answer] Max 50 results

- [Question] Are there any specific filtering requirements (e.g., by price range, category, availability)?
- [Answer] Yes, extract filters from search query (price, material, size, color, etc.)

- [Question] Should the system support pagination for search results?
- [Answer] No (hackathon demo only)

- [Question] What image formats should be supported for image similarity search?
- [Answer] JPG and PNG

- [Question] Should the system handle multi-language search queries?
- [Answer] No, English only

- [Question] What fields should be returned in JSON response?
- [Answer] Configurable, return entire variant JSON by default

- [Question] Image similarity threshold?
- [Answer] Configurable via YAML config

- [Question] Hybrid search weighting approach?
- [Answer] Use reciprocal rank fusion, configurable via YAML

- [Question] Error handling approach?
- [Answer] Return error codes with messages for: no results, invalid format, empty query

- [Question] Data ingestion requirements?
- [Answer] One-time bulk load from S3 only

- [Question] Search scope?
- [Answer] All text fields: name, description, properties, materials, dimensions, reviews, ratings, price, color, comfort, size, theme

- [Question] Image embedding scope?
- [Answer] All product images (both white background and lifestyle) for each variant 

#### Step 1.2: Grouping User Stories into Units ✅ COMPLETED
- [x] Review user stories from Step 1.1
- [x] Identify cohesive groups of functionality
- [x] Create loosely coupled units
- [x] Document units in /inception/units/ folder:
  - Unit 1: Data Ingestion Service
  - Unit 2: Embedding Generation Service
  - Unit 3: Search Index Service
  - Unit 4: Search Query Service
  - Unit 5: Configuration Management
- [x] Create integration contract in /inception/units/integration_contract.md
- [x] Request review and approval

---

## Notes

### Data Structure Analysis (from /data/active_only/)

**Available CSV Files:**
1. **variant.csv** - Core product variant information including:
   - market, variant_id, product_id, sku, variant_name, product_name
   - lifecycle_status, product_type, categories (backend/frontend)
   - pricing (original_price, sale_price, currency)
   - descriptions, reviews (count, rating)
   - stock status, delivery times
   - URLs, images

2. **variant_affinity.csv** - Product relationships/sets
   - affinity_type, affinity_group_variant_id, variant_id

3. **variant_file.csv** - Associated files (assembly instructions, etc.)
   - variant_id, file_type, file_value, file_url

4. **variant_image.csv** - Product images
   - variant_id, image_type, image_url, image_position, default_image

5. **variant_option.csv** - Product options/configurations
   - variant_id, product_id, option_type, option_value, swatch_variant_id

6. **variant_property.csv** - Detailed product properties
   - variant_id, property_category, property_type, property_value, property_explanation

### Key Requirements:
- Backend system only (frontend already developed)
- Two main functions:
  - `get_text_results(String user_search_string)` - semantic text search
  - `get_image_match_result(base64 image object)` - image similarity search
- Data source: CSV files on S3
- Embedding: AWS Bedrock Titan embeddings model
- Search infrastructure: AWS OpenSearch Service
- Search approaches to experiment: BM25, KNN, Reciprocal Rank Fusion, Hybrid
- Available AWS resources: OpenSearch, RDS, S3, EC2, SageMaker, Bedrock
- Return format: JSON array of products with parameters and image URLs

---

## Status: Phase 3 (Operations) - Complete! ✅ Ready for deployment
## Status: Phase 4 (UI Demo) - Complete! ✅ UI ready for demo

---

## Phase 3: Operations (Deployment)

### Step 3.1: Configuration Setup ✅ COMPLETED
- [x] Create production config.yaml with AWS resource settings
- [x] Define search parameters and filter configurations
- [x] Set up logging and monitoring configuration

### Step 3.2: Data Pipeline Implementation ✅ COMPLETED
- [x] Implement Unit 1: Data Ingestion Service (S3 CSV loading)
- [x] Implement Unit 2: Embedding Generation Service (Bedrock integration)
- [x] Implement Unit 3: Search Index Service (OpenSearch management)
- [x] Create pipeline orchestration script

### Step 3.3: Search Service Deployment ✅ COMPLETED
- [x] Implement production Unit 4: Search Query Service
- [x] Create Lambda handler for serverless deployment
- [x] Integrate with Bedrock for query embeddings
- [x] Integrate with OpenSearch for KNN/BM25/Hybrid search

### Step 3.4: Infrastructure as Code ✅ COMPLETED
- [x] Create CloudFormation template for serverless stack
- [x] Define Lambda functions (text + image search)
- [x] Configure API Gateway endpoints
- [x] Set up IAM roles and permissions
- [x] Create deployment script (deploy.sh)

### Step 3.5: Documentation ✅ COMPLETED
- [x] Create comprehensive deployment guide
- [x] Document configuration options
- [x] Add troubleshooting section
- [x] Include cost estimation
- [x] Add performance optimization tips
- [x] Document monitoring and scaling strategies

### Step 3.6: AWS Connectivity & Multi-Region Setup ✅ COMPLETED
- [x] Fixed AWS credentials (cleared conflicting environment variables)
- [x] Configured multi-region setup (Bedrock in us-east-1, S3/OpenSearch in ap-southeast-1)
- [x] Updated service code to use correct regions (embedding_service.py, search_service.py, llm_service.py)
- [x] Fixed SSH tunnel configuration for OpenSearch access (autobots user, correct key path)
- [x] Created comprehensive connectivity test scripts (aws_connectivity_test.py, test_region_config.py)
- [x] Updated documentation with region configuration details
- [x] Verified all AWS services operational (S3, Bedrock, OpenSearch via SSH tunnel)
- [x] Organized test scripts into operations/tests/ directory
- [x] Cleaned up project structure (moved docs to docs/, removed demo code)

### Multi-Region Architecture Details
| Service | Region | Notes |
|---------|--------|-------|
| Bedrock (Titan, Claude) | us-east-1 | Models only available here |
| S3, OpenSearch, RDS | ap-southeast-1 | Data locality |
| SSH Tunnel | jumphost-sg.castlery.com | Username: autobots |

---

## Phase 4: UI Demo (Streamlit Interface)

### Step 4.1: UI Implementation ✅ COMPLETED
- [x] Create UI directory structure (`src/ui/`)
- [x] Implement SSH tunnel management utility
- [x] Implement search logging utility (hourly JSON logs)
- [x] Build main Streamlit app with Castlery branding
- [x] Implement text search interface
- [x] Implement image search interface with upload
- [x] Add loading states and error handling
- [x] Apply Castlery color scheme and styling
- [x] Create startup script (`start_ui.sh`)

### Step 4.2: Documentation ✅ COMPLETED
- [x] Create comprehensive UI guide (`docs/UI_GUIDE.md`)
- [x] Document running and testing procedures
- [x] Add troubleshooting guide with 8 common issues
- [x] Include performance benchmarks
- [x] Add quick reference commands
- [x] Create UI README (`src/ui/README.md`)

### UI Features Implemented
- **Text Search**: Natural language queries with filter extraction
- **Image Search**: Upload JPG/PNG images for visual similarity search
- **Automatic Logging**: All searches logged to hourly JSON files
- **Castlery Branding**: Minimalist design matching Castlery's aesthetic
- **Error Handling**: Graceful handling of SSH, OpenSearch, and search errors
- **Performance**: Loading indicators and response time display

### UI File Structure
```
src/ui/
├── app.py              # Main Streamlit application
├── utils/
│   ├── tunnel.py       # SSH tunnel management
│   └── logger.py       # Search logging utility
└── README.md           # UI documentation
```

### Running the UI
```bash
# Quick start
cd src
./start_ui.sh

# Or manually
streamlit run ui/app.py
```

### Testing Checklist
- [ ] Text search with simple queries
- [ ] Text search with complex filters
- [ ] Image upload and search
- [ ] Log files created in `src/unit_4_search_query/logs/`
- [ ] Error handling (empty query, invalid image)
- [ ] Performance (<3s per search)
- [ ] UI styling matches Castlery brand

### Known Limitations
- LLM features (Claude) may not work due to AWS account restrictions (gracefully handled)
- Related Tags (Feature 6) not yet implemented in UI (future enhancement)
- Search metadata panel not shown in UI (logged only)

### Next Steps
- Test UI with demo queries
- Prepare demo script
- Optional: Add Related Tags feature to UI
