---
inclusion: always
---

# Project-Specific Rules

## Environment Configuration

### Python Environment
- Virtual environment: `/Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search`
- Always activate before running Python: `source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate`

### AWS Multi-Region Setup
- **Bedrock** (embeddings, LLM): `us-east-1`
- **All other services** (OpenSearch, S3, RDS): `ap-southeast-1`
- Ensure correct region in boto3 client initialization

### Network Access
- OpenSearch/RDS require SSH tunnel via `jumphost-sg.castlery.com` (username: `autobots`)
- SSH credentials: `/Users/pillalamarrimallikarjun/OneDrive - Castlery Pte Ltd/workspace/Fun projects/autobots-semantic-search`

## Data Ingestion Architecture

### Current Implementation (MVP)
- **Single-file ingestion**: Uses only `variant.csv` from S3
- **Simplified structure**: No multi-file enrichment, no empty arrays/dicts
- **Method**: `DataIngestionService.ingest_data_simple()`
- **Pipeline**: Always runs in simple mode (multi-file code commented out)

### Data Structure
Product documents contain only fields present in `variant.csv`:
- Core: `variant_id`, `product_id`
- Content: `variant_name`, `product_name`, `description`, `aggregated_text`
- Pricing: `price`, `currency`
- Categories: `product_type`, `frontend_category`, `frontend_subcategory`, `backend_category`
- Reviews: `review_count`, `review_rating`
- Additional: `collection`, `color_tone`, `material`, `other_properties`, `variant_url`
- Status: `stock_status`, `lifecycle_status`

### Legacy Code
Multi-file enrichment methods (`load_all_data()`, `enrich_variant_data()`, `ingest_data()`) are commented out but preserved for potential future use.

## Documentation Workflow

### Consolidation Rule
Update existing documentation before creating new files:
- `README.md` - Quick start
- `docs/PROJECT_DOCUMENTATION.md` - Technical details
- `docs/DEPLOYMENT_GUIDE.md` - Deployment steps
- `docs/plan.md` - Roadmap and status
- `docs/starter_prompt.md` - Project context

Only create new `.md` files when content doesn't fit existing structure.

### Change Management
Before implementing code changes:
1. Review design docs: `docs/starter_prompt.md`, `docs/plan.md`, `docs/construction/search_query_service/`
2. Propose documentation updates if changes affect architecture, APIs, or configuration
3. Get user approval before modifying code

Implementation sequence: Design docs → User approval → Code → Tests → Operational docs

## Code Quality Rules

### Test File Management
- Do NOT create new test files without explicit permission
- If permission denied, update existing test files instead
- Existing test locations: `src/tests/` and `src/tests/unit/`

### File Hygiene
- Remove temporary, duplicate, or obsolete files after refactoring
- Follow project structure in `structure.md` steering document
- Keep workspace organized per defined conventions
- Comment out (don't delete) code that may be needed later

### Code Style
- Follow existing code patterns and naming conventions
- Maintain consistent formatting and documentation style
- Ensure all new code includes appropriate docstrings and comments
- Adhere to the project's established architectural principles

### Security
- Never hardcode secrets or credentials in source files
- Use environment variables or AWS Secrets Manager for sensitive data
- Follow AWS security best practices for all services

### Performance
- Optimize database queries and API calls
- Implement proper caching strategies where applicable
- Monitor resource usage and scale appropriately
- Consider latency implications of architectural decisions
