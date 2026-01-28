# Project Structure

## Root Organization

```
.
├── inception/              # Phase 1: Requirements & design
├── construction/           # Phase 2: Domain model & logical design
├── operations/             # Phase 3: Implementation & deployment
├── notebooks/              # Data exploration & testing
├── data/                   # Product CSV files
└── [documentation files]   # README, guides, plans
```

## Inception Phase (`inception/`)

Requirements and system design following AIDLC methodology.

```
inception/
├── user_stories.md         # Complete user stories with acceptance criteria
└── units/                  # Service unit definitions
    ├── unit_1_data_ingestion_service.md
    ├── unit_2_embedding_generation_service.md
    ├── unit_3_search_index_service.md
    ├── unit_4_search_query_service.md
    ├── unit_5_configuration_management.md
    └── integration_contract.md
```

## Construction Phase (`construction/`)

Domain-driven design and logical architecture.

```
construction/
└── search_query_service/
    ├── domain_model.md                    # DDD domain model
    ├── logical_design.md                  # Layered architecture design
    ├── logical_design_features_5_6.md     # LLM fallback & tags design
    ├── generate_implementation.py         # Code generation script
    └── src/                               # Demo implementation
        ├── api/
        │   └── search_api.py
        └── domain/
            └── value_objects/
                ├── filters.py
                └── query_types.py
```

## Operations Phase (`operations/`)

Production implementation and deployment.

### Main Files
```
operations/
├── .env.example            # Credentials template
├── config.yaml             # AWS configuration
├── pipeline.py             # Data pipeline orchestrator
├── app.py                  # Flask API server (EC2)
├── lambda_handler.py       # Lambda handler (serverless)
├── start_server.sh         # Quick start script
├── deploy.sh               # Lambda deployment script
├── test_api.py             # API test suite
├── test_env_loading.py     # Environment validation
└── requirements.txt        # Python dependencies
```

### Service Units
```
operations/
├── unit_1_data_ingestion/
│   ├── __init__.py
│   └── data_ingestion_service.py      # S3 CSV loading & enrichment
├── unit_2_embedding_generation/
│   ├── __init__.py
│   └── embedding_service.py           # Bedrock Titan embeddings
├── unit_3_search_index/
│   ├── __init__.py
│   └── index_service.py               # OpenSearch index management
└── unit_4_search_query/
    ├── __init__.py
    ├── search_service.py              # Main search orchestration
    ├── llm_service.py                 # Claude LLM integration (Feature 5)
    └── tag_index_service.py           # Tag generation (Feature 6)
```

### Infrastructure
```
operations/
└── cloudformation_template.yaml       # Lambda infrastructure as code
```

## Data Directory (`data/`)

Product catalog CSV files.

```
data/
├── raw/                    # Original data
└── active_only/            # Filtered active products
    ├── variant.csv                    # 3,693 products
    ├── variant_image.csv              # 27,166 images
    ├── variant_property.csv           # 186,698 properties
    ├── variant_option.csv             # 7,981 options
    ├── variant_affinity.csv           # 3,745 relationships
    └── variant_file.csv               # 1,585 files
```

## Notebooks Directory (`notebooks/`)

Jupyter notebooks for exploration and testing.

```
notebooks/
├── 1.keep_active_only.ipynb          # Data filtering
├── 2. data exploration.ipynb         # Data analysis
└── 3. aws_connectivity_test.ipynb    # AWS connectivity testing
```

## Documentation Files

```
.
├── README.md                          # Quick start guide
├── PROJECT_DOCUMENTATION.md           # Technical documentation
├── DEPLOYMENT_GUIDE.md                # Complete deployment guide
├── plan.md                            # Project plan & status
└── AIDLC workshop system prompt.md    # AIDLC methodology
```

## Module Organization Patterns

### Service Unit Pattern
Each service unit follows this structure:
```
unit_X_service_name/
├── __init__.py
└── service_name_service.py
```

### Domain-Driven Design Pattern (Construction)
```
domain/
├── aggregates/             # Aggregate roots
├── value_objects/          # Immutable value objects
├── services/               # Domain services
├── repositories/           # Repository interfaces
├── events/                 # Domain events
└── policies/               # Business rules
```

### Layered Architecture Pattern (Construction)
```
api/                        # API endpoints & DTOs
application/                # Use cases & orchestration
domain/                     # Business logic
infrastructure/             # External integrations
utils/                      # Shared utilities
```

## Configuration Files

```
operations/
├── .env                    # Credentials (not in git)
├── .env.example            # Template
├── config.yaml             # AWS resources & search config
└── .gitignore              # Git ignore rules
```

## Key Conventions

### File Naming
- Python modules: `snake_case.py`
- Config files: `lowercase.yaml`, `.env`
- Documentation: `UPPERCASE.md` or `Title Case.md`
- Notebooks: `number. description.ipynb`

### Directory Naming
- Service units: `unit_N_service_name/`
- Phases: `lowercase/`
- Data: `snake_case/`

### Import Paths
```python
# Service units
from unit_1_data_ingestion.data_ingestion_service import DataIngestionService

# Domain layer (construction)
from domain.aggregates.search_query import SearchQuery
from domain.value_objects.filters import SearchFilters
```

## Environment-Specific Files

### Not in Git
- `.env` - Credentials
- `*.pyc` - Python bytecode
- `__pycache__/` - Python cache
- `venv/` - Virtual environment
- `.DS_Store` - macOS metadata

### In Git
- `.env.example` - Template
- `config.yaml` - Configuration structure
- All source code
- Documentation
