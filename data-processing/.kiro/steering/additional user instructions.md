---
inclusion: always
---
---
inclusion: always
---

# Project-Specific Configuration

## Environment Setup

### Python Virtual Environment
- **Location**: `/Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search`
- Always activate this venv before running Python commands
- Use `source /Users/pillalamarrimallikarjun/Documents/python-envs/semantic-search/bin/activate`

### AWS Region Configuration
- **Bedrock services**: `us-east-1` (Titan embeddings, Claude LLM)
- **All other AWS services**: `ap-southeast-1` (OpenSearch, S3, RDS)
- Ensure region-specific endpoints are used in boto3 clients

### Network Access
- **OpenSearch and RDS**: Accessible only via SSH jumphost
- **Jumphost**: `jumphost-sg.castlery.com`
- **SSH credentials**: Located at `/Users/pillalamarrimallikarjun/OneDrive - Castlery Pte Ltd/workspace/Fun projects/autobots-semantic-search`
- **Username**: `autobots`

## Documentation Management

### Existing Documentation Files
Before creating new documentation, check and update these files first:
- `README.md` - Quick start and overview
- `docs/DEPLOYMENT_GUIDE.md` - Deployment instructions
- `docs/PROJECT_DOCUMENTATION.md` - Technical documentation
- `docs/plan.md` - Project roadmap and status
- `docs/starter_prompt.md` - Initial project context

### Documentation Rules
- Only create new `.md` files if content doesn't fit existing documentation
- Keep documentation consolidated to avoid fragmentation
- Clean up redundant or outdated files after creating new ones

## Change Management Workflow

### Before Making Code Changes
1. **Review design documents** in this order:
   - `docs/starter_prompt.md` - Project vision and context
   - `docs/plan.md` - Current roadmap and priorities
   - `docs/construction/search_query_service/domain_model.md` - Domain model
   - `docs/construction/search_query_service/logical_design.md` - Architecture design
   - Relevant steering documents in `.kiro/steering/`

2. **Propose documentation updates** if changes affect:
   - System architecture or design patterns
   - API contracts or interfaces
   - Configuration or deployment procedures
   - Feature specifications

3. **Get user approval** for documentation changes before modifying source code or tests

### Implementation Order
1. Update design/planning documents (if needed)
2. Get user review and approval
3. Implement code changes
4. Update or create tests
5. Update operational documentation (README, deployment guides)

## Code Quality

### File Management
- Remove temporary, duplicate, or obsolete files after refactoring
- Keep the workspace clean and organized
- Follow the project structure defined in `structure.md` steering document 