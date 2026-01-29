# prompts

## AWS Region Configuration

### Multi-Region Setup
This project uses a multi-region AWS architecture due to service availability constraints:

| Service | Region | Reason |
|---------|--------|--------|
| **Bedrock** (Titan Embeddings, Claude LLM) | `us-east-1` | Titan and Claude models only available in us-east-1 |
| **S3** (Product Data) | `ap-southeast-1` | Data locality |
| **OpenSearch** | `ap-southeast-1` | Data locality, accessed via SSH tunnel |
| **RDS** | `ap-southeast-1` | Data locality, accessed via SSH tunnel |

### SSH Tunnel Access
OpenSearch and RDS are accessed via a jumphost for local development:
- **Jumphost**: `jumphost-sg.castlery.com`
- **Username**: `autobots`
- **SSH Key Path**: `/Users/pillalamarrimallikarjun/OneDrive - Castlery Pte Ltd/workspace/Fun projects/autobots-semantic-search`

### Configuration
The `config.yaml` file handles this with separate region settings:
```yaml
aws:
  region: ap-southeast-1          # Default region for S3, OpenSearch
  bedrock_region: us-east-1       # Bedrock-specific region
```

---

## Feature Requirements

### Core Features (Implemented)
1. **Semantic Text Search** - User enters a phrase/sentence, system returns relevant products using embeddings
2. **Image Similarity Search** - User uploads an image, system returns visually similar products
3. **Filter Extraction** - Extract filters (price, color, material, category) from natural language queries
4. **Hybrid Search** - Combine KNN semantic search with BM25 keyword search using Reciprocal Rank Fusion

### New Features (To Be Implemented)

#### Feature 5: LLM Fallback for Intent Extraction
**Problem Statement:** When a user enters an abstract or creative query like "table that is modern yet royal", the semantic search may return no results or very low-quality results because these abstract terms don't directly match product attributes in the knowledge base.

**Solution:** Implement an LLM-powered fallback mechanism that:
1. Detects when search results are poor (similarity score below configurable threshold)
2. Uses Claude (via Bedrock) to extract meaningful intents from the abstract query
3. Maps abstract terms to concrete product attributes that exist in the catalog
4. Re-executes the search with the extracted intents
5. Returns results with a status indicating LLM fallback was used

**Requirements:**
- **LLM Model**: Claude via AWS Bedrock (configurable in YAML settings)
- **Trigger Condition**: When top result similarity score is below threshold (configurable, default: 0.3)
- **Knowledge Base**: Use actual product catalog data (categories, materials, colors, styles) to constrain LLM suggestions
- **Intent Mapping**: LLM maps abstract terms to concrete attributes:
  - "royal" → "ornate", "gold accents", "traditional", "vintage", "elegant"
  - "cozy" → "soft fabric", "plush", "comfortable", "warm colors"
  - "minimalist" → "clean lines", "simple", "modern", "neutral colors"
- **Response Flow**: 
  1. First response: `{"status": "no results found, falling back to LLM model to retrieve results"}`
  2. Second response: Actual search results from LLM-enhanced query
- **Caching**: Cache LLM responses for similar queries to reduce latency and cost
- **Response Time**: Additional 1-2 seconds acceptable for fallback scenario

**Configuration (YAML):**
```yaml
llm_fallback:
  enabled: true
  model_id: anthropic.claude-3-sonnet-20240229-v1:0  # Configurable
  similarity_threshold: 0.3  # Trigger fallback below this score
  cache_enabled: true
  cache_ttl_seconds: 3600  # 1 hour
  max_retries: 2
```

#### Feature 6: Related Search Tags (Google Shopping Style)
**Problem Statement:** Users often don't know exactly what they're looking for. Providing related search tags helps users discover products and refine their search, similar to Google Shopping's tag suggestions.

**Solution:** Generate personalized, clickable search tags based on the user's query using a **two-tier approach** for optimal performance:

**Tier 1: Pre-Computed Tag Index (Primary - Instant)**
- Pre-compute tags for all product categories during data ingestion phase
- Build inverted index mapping query terms to tags
- Store common query patterns and their associated tags
- Provide instant tag lookup (<1ms) for 95% of queries
- No LLM call needed for common queries

**Tier 2: LLM Tag Generation (Fallback - 1-2 seconds)**
- Use LLM only for unique/complex queries not in pre-computed index
- Cache LLM-generated tags for future use
- Acceptable 1-2 second delay for 5% of queries

**Requirements:**
- **Tag Generation Strategy**: 
  - **Primary**: Pre-computed index lookup (instant)
  - **Fallback**: LLM generates suggestions for unique queries
  - **Validation**: All tags filtered to only show what exists in catalog
- **Tag Count**: Minimum 3, Maximum 10 tags (configurable in YAML)
- **Tag Types** (all included):
  - Categories: Sofas, Tables, Chairs, Beds, Desks
  - Price Ranges: Under $500, Under $1,000, $1,000-$2,000
  - Materials: Leather, Fabric, Wood, Metal, Glass
  - Styles: Modern, Traditional, Minimalist, Scandinavian, Industrial
  - Colors: Brown, Grey, White, Black, Beige
- **Personalization**: Tags are contextual to the query:
  - Query: "brown leather chair" → Tags: "Swivel", "Dining Chairs", "Recliners", "Armchairs", "Under $1,000"
  - Query: "modern sofa" → Tags: "Sectional", "2-Seater", "3-Seater", "Fabric", "Leather", "Grey"
- **Clickable Behavior**: Clicking a tag updates the search results to be relevant to that tag (acts as a filter/refinement)
- **Validation**: All generated tags must exist in the product catalog before being shown
- **Performance**: 
  - 95% of queries return tags instantly (<1ms) using pre-computed index
  - 5% of queries use LLM (1-2 seconds) for unique queries

**Configuration (YAML):**
```yaml
related_tags:
  enabled: true
  min_tags: 3
  max_tags: 10
  use_precomputed_index: true  # Primary strategy
  tag_index_path: /data/tag_index.json  # Pre-computed index location
  llm_fallback_enabled: true  # For unique queries
  tag_types:
    - categories
    - price_ranges
    - materials
    - styles
    - colors
  llm_model_id: anthropic.claude-3-sonnet-20240229-v1:0
  cache_enabled: true
  cache_ttl_seconds: 1800  # 30 minutes
```

**API Response Format:**
```json
{
  "status": "success",
  "total_results": 15,
  "results": [...],
  "related_tags": [
    {"tag": "Dining Chairs", "type": "category", "count": 45},
    {"tag": "Recliners", "type": "category", "count": 23},
    {"tag": "Under $1,000", "type": "price_range", "count": 89},
    {"tag": "Leather", "type": "material", "count": 34},
    {"tag": "Swivel", "type": "style", "count": 12}
  ],
  "search_metadata": {
    "query": "brown leather chair",
    "llm_fallback_used": false,
    "tags_generated": true
  }
}
```

---

## Phase 1: Inception

### Step 1.1: Create User Stories
```
Your Role: You are an expert product manager and are tasked with creating well defined user stories that becomes the contract for developing the system as mentioned in the Task section below.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: I would like to build a search engine for my e-commerce website that enables semantic search and allows image similarity search as well. I only want the backend system as the frontent is already developed. In this system, the user is able to upload an image to do similarity search or types a phrase or sentence in the search bar. The knowledge base and images are available in csv files on s3. Each product and each variant of a product have the following associated data. You can read the data and see some samples to decide the appropriate way to handel in on /data/active_only folder in the root directory. There are attributes for a product and some are also optional. I want to use bedrock titan embeddings model to embed the attributes and the images of the data and use opensearch service in aws, after which the top results for a user's query or image upload will be matched. I want to experiment with BM25, knn,  reciprocal rank fusion or hybrid approach. I have to provide the results to 2 functions, i.e get_text_results(String user_search_string) and get_image_match_result(base64 image object). Both these functions should return the json array of products, along with some other parameters and image urls. I have access to opensearch service, RDS, S3, ec2, sagemaker and bedrock and nothing else. DO not assume that I have access to any other AWS resources

**Additional Features to Include:**

1. **LLM Fallback for Intent Extraction (Feature 5):**
   - When search results have low similarity scores (below configurable threshold), fall back to Claude LLM (via Bedrock) to extract meaningful intents from abstract queries
   - Map abstract terms like "royal", "cozy", "minimalist" to concrete product attributes
   - Use actual product catalog data (categories, materials, colors, styles) to constrain LLM suggestions
   - Return a two-part response: first indicating fallback is being used, then the actual results
   - Cache LLM responses for similar queries

2. **Related Search Tags - Google Shopping Style (Feature 6):**
   - Generate personalized, clickable search tags based on user's query (like Google Shopping)
   - Tags should include: categories, price ranges, materials, styles, colors
   - LLM generates suggestions, but filter to only show tags that exist in the product catalog
   - Show minimum 3, maximum 10 tags (configurable)
   - Tags must be personalized to the query context
   - Clicking a tag should update/refine the search results

Refer to the "Feature Requirements" section at the top of this document for detailed specifications.

Create an /inception/ directory and write the user stories to user_stories.md in the inception directory. Only foucs on user stories and nothing else.

```

### Step 1.2: Grouping User Stories into Units
```
Your Role: You are an expert software architect and are tasked with grouping the user stories into multiple units that can be built independently as mentioned in the Task section below.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Your Task: Refer to the user stories in, /inception/user_stories.md file. Group the user stories into multiple units that can be built independently. Each unit contains highly cohesive user stories that can be built by a single team. The units must be loosely coupled with each other. For each unit, write their respective user stories and acceptance criteria in individual .md files in the /inception/units/ folder. Do not start the technical systems design yet.

**Important:** Ensure the following new features are properly grouped:
- **LLM Fallback Service (Feature 5):** May be a separate unit or part of the Search Query Service
- **Related Tags Generation (Feature 6):** May be a separate unit or part of the Search Query Service
- Consider creating a new "LLM Integration Service" unit if the LLM functionality is substantial enough

Create an integration contract for each of the units, note what API endpoints that each service expose and define the method in an /inception/units/integration_contract.md file. Include the new API endpoints for:
- LLM fallback intent extraction
- Related tags generation
- Tag-based search refinement

```

## Phase 2: Construction of one Unit

### Step 2.1: Design Domain Model with DDD

```
Your Role: You are an expert software architect and are tasked with designing the domain model using Domain Driven Design for a unit of of the software system. Refer to the Task section for more details.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on building the modules to return search results for either a text query entered by user or the image uploaded by user.

Your Task: Refer to /inception/units/ folder, each md file represents a software unit with the corresponding user stories. Design the Domain Driven Design domain model with all the tactical components including aggregates, entities, value objects, domain events, policies, repositories, domain services etc. Create a new /construction/ folder in the / directory, write the designs details in a /construction/{unit name}/domain_model.md file.

**Include domain models for new features:**
- **LLM Fallback (Feature 5):** 
  - IntentExtractionService domain service
  - ExtractedIntent value object
  - IntentMapping entity for caching
  - LLMFallbackPolicy for determining when to trigger fallback
- **Related Tags (Feature 6):**
  - RelatedTagsService domain service
  - SearchTag value object (tag, type, count)
  - TagGenerationPolicy for filtering valid tags
  - CatalogTagRepository for validating tags against product catalog

DO NOT generate code snippets.

```

### Step 2.2: Create Logical Design

```
Your Role: You are an expert software architect and are tasked with creating a logical design of a highly scalable, event-driven system according to a Domain Driven Design domain model. Refer to the Task section for more details.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on building the modules to return search results for either a text query entered by user or the image uploaded by user.

Your Task: Refer to /construction/{unit name}/domain_model.md file for the domain model and integration document with other services at /inception/units/integration_contract.md file. Generate a logical design for software source code implementation. Write the design document to the /construction/{unit name}/logical_design.md file.

**Include logical design for new features:**
- **LLM Fallback (Feature 5):**
  - LLMClient adapter for Bedrock Claude integration
  - IntentExtractionService with prompt engineering
  - ResponseCache for caching LLM responses
  - FallbackOrchestrator for managing the two-part response flow
  - Configuration loader for YAML settings
- **Related Tags (Feature 6):**
  - TagGeneratorService using LLM
  - CatalogValidator for filtering tags against product catalog
  - TagCache for caching generated tags
  - API response formatter including related_tags array

**Configuration Design:**
- YAML configuration structure for both features
- Environment variable overrides
- Feature flags for enabling/disabling

DO NOT generate code snippets.

```

### Step 2.3: Implement Source Code

```
Your Role: You are an expert software engineer and are tasked with implementing a highly scalable, event-driven system according to the Domain Driven Design logical design. Refer to the Task section for more details.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on building the modules to return search results for either a text query entered by user or the image uploaded by user.

Your Task: Refer to /construction/{unit name}/logical_design.md file for the logical design details. Generate a very simple and intuitive python implementation for the bounded context. Assume the repositories and the event stores are in-memory. Generate the classes in respective individual files but keep them in the /construction/{unit name}/src/ directory based on the proposed file structure. Create a simple demo script that can be run locally to verify the implementation.

**Implementation Requirements for New Features:**

1. **LLM Fallback (Feature 5):**
   - Implement LLMClient using boto3 for Bedrock Claude
   - Create IntentExtractionService with well-crafted prompts
   - Implement in-memory cache for LLM responses
   - Handle two-part response flow (status message, then results)
   - Load configuration from YAML file
   - Include fallback trigger logic based on similarity threshold

2. **Related Tags (Feature 6) - TWO-TIER APPROACH:**
   
   **Tier 1: Pre-Computed Tag Index (Primary - Instant)**
   - Create TagIndexService that pre-computes tags during data ingestion
   - Build inverted index: query_term → tags, category → tags
   - Store common query patterns and their tags
   - Provide instant lookup: `get_tags_for_query(query)` returns tags in <1ms
   - Export/import index to JSON for persistence
   - **Performance Target:** 95% of queries use pre-computed tags (instant)
   
   **Tier 2: LLM Tag Generation (Fallback - 1-2 seconds)**
   - Implement TagGeneratorService using LLM for unique/complex queries
   - Only call LLM when query not found in pre-computed index
   - Cache LLM-generated tags for future use
   - **Performance Target:** 5% of queries use LLM (acceptable 1-2s delay)
   
   **Tag Validation:**
   - Create CatalogValidator to filter tags against actual product data
   - Generate tags of all types: categories, price_ranges, materials, styles, colors
   - Ensure all tags exist in product catalog before returning
   
   **API Integration:**
   - Include tags in API response format
   - Support tag-click refinement (update search with selected tag)
   - Return tags instantly for most queries

3. **Configuration:**
   - Update config.yaml with new feature settings
   - Support feature flags (enabled/disabled)
   - Configurable thresholds, tag counts, cache TTLs
   - Tag index build settings (when to pre-compute vs use LLM)

**Performance Requirements:**
- Text search with pre-computed tags: <500ms (95% of queries)
- Text search with LLM tag generation: <3s (5% of queries)
- Tag index build time: <5 minutes during data ingestion

```

### Step 2.4: Debugging Source Code

```
Your Role: You are an expert software engineer and are tasked with debugging issues with the demo application.Resolve the issue below and any other issues to ensure that the demo script can be executed successfully.Issue:

```

### Step 2.5: Create Tests

```
Your Role: You are an expert quality assurance engineer and are tasked with creating test plans according to the user requirements and technical design for the software systems.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on building the modules to return search results for either a text query entered by user or the image uploaded by user.

Your Task: Refer to /construction/{unit name}/domain_design.md and /construction/{unit name}/logical_design.md files for the software system design. The implementation is in /construction/{unit name}/src directory if you need more details. Refer to the business requirements for this software unit, including user stories and acceptance criteria in individual .md files in the /inception/units/{unit name}.md file. Generate test plans to test the backend system of this software unit.

**Include test cases for new features:**

1. **LLM Fallback (Feature 5) Tests:**
   - Test fallback triggers when similarity score below threshold
   - Test fallback does NOT trigger when results are good
   - Test intent extraction from abstract queries ("royal", "cozy", "minimalist")
   - Test LLM response caching (same query returns cached result)
   - Test two-part response flow
   - Test configuration loading (threshold, model_id, cache settings)
   - Test error handling when LLM service unavailable

2. **Related Tags (Feature 6) Tests:**
   - Test tag generation for various query types
   - Test tag filtering against product catalog (invalid tags removed)
   - Test tag count limits (min 3, max 10)
   - Test all tag types generated (categories, prices, materials, styles, colors)
   - Test tag personalization (different queries → different tags)
   - Test tag caching
   - Test tag-click search refinement
   - Test tags included in API response format

```

## Phase 3: Operations of one Unit

### Step 3.1: Create IaC Scripts

```
Your Role: You are an expert devops engineer and are tasked with creating deployment scripts in cloud formation to deploy the selected unit of software to an AWS account based on the specifications of the logical deisgn.Plan for the work ahead and write your steps in an md file (plan.md) with checkboxes for each step in the plan. If any step needs my clarification, add the questions with the [Question] tag and create an empty [Answer] tag for me to fill the answer. Do not make critical decisions on your own. Upon completing the plan, ask for my review and approval. After my approval, you can go ahead to execute the same plan one step at a time. Once you finish each step, mark the checkboxes as done in the plan.

Focus only on building the modules to return search results for either a text query entered by user or the image uploaded by user.

Your Task: Refer to /construction/{unit name}/logical_design.md files for the software system design. The implementation is in /construction/{unit name}/src directory if you need more details. Generate deployment scripts in cloud formation in /construction/{unit name}/deploy to deploy the backend system of this software unit to AWS in /operation/{unit name}/ directory. Create an API Gateway for this unit with relevant endpoints and methods according to the /inception/units/integration_contract.md, connect to a lambda function which will containing the backend source code. Tag all AWS resources for this unit with the unit's name.

**Include infrastructure for new features:**

1. **LLM Fallback (Feature 5):**
   - IAM permissions for Bedrock Claude model invocation
   - Environment variables for LLM configuration
   - Cache storage (consider DynamoDB or ElastiCache for production)
   - CloudWatch metrics for LLM fallback usage

2. **Related Tags (Feature 6):**
   - Same Bedrock permissions (shared with Feature 5)
   - Cache storage for tag responses
   - API Gateway response format to include related_tags

3. **Configuration:**
   - Store config.yaml in S3 or as Lambda environment variables
   - Support for feature flags via environment variables
   - Separate configurations for dev/staging/prod

```