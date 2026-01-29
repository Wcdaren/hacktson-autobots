# Test Suite

This directory contains comprehensive tests for the semantic search system.

## Test Structure

```
tests/
├── unit/                          # Unit tests for business logic
│   ├── test_data_ingestion_service.py
│   ├── test_embedding_service.py
│   ├── test_pipeline.py
│   ├── test_search_service.py
│   └── run_unit_tests.sh
├── test_env_loading.py            # Environment variable tests
├── test_aws_credentials.py        # AWS credential validation
├── test_region_config.py          # Multi-region configuration
├── test_notebook_credentials.py   # Jupyter notebook setup
├── check_bedrock_models.py        # Bedrock model availability
├── aws_connectivity_test.py       # Full AWS connectivity
├── test_api.py                    # API endpoint tests (requires deployed API)
└── run_all_tests.sh               # Run all tests
```

## Test Categories

### Integration Tests (6 tests)
Tests that verify AWS connectivity and environment setup:

- **test_env_loading.py** - Validates environment variables and config overrides
- **test_aws_credentials.py** - Checks AWS credential configuration
- **test_region_config.py** - Verifies multi-region setup (us-east-1 for Bedrock, ap-southeast-1 for others)
- **test_notebook_credentials.py** - Ensures Jupyter notebooks can access AWS
- **check_bedrock_models.py** - Tests Amazon Titan model availability
- **aws_connectivity_test.py** - Comprehensive AWS service connectivity (S3, Bedrock, OpenSearch via SSH)

### Unit Tests (13 tests)
Tests that verify business logic with mocked dependencies:

- **test_data_ingestion_service.py** (3 tests)
  - Service initialization
  - CSV loading from S3
  - Error handling

- **test_embedding_service.py** (4 tests)
  - Service initialization
  - Text embedding generation
  - Empty text handling
  - Region fallback logic

- **test_pipeline.py** (4 tests)
  - Config loading without env vars
  - Config loading with env var overrides
  - Successful pipeline execution
  - Pipeline failure handling

- **test_search_service.py** (2 tests)
  - Service initialization
  - Filter extraction (price, category, material)

## Running Tests

### Run All Tests (Integration + Unit)
```bash
./tests/run_all_tests.sh
```

### Run Only Integration Tests
```bash
cd tests
python test_env_loading.py
python test_aws_credentials.py
python test_region_config.py
python test_notebook_credentials.py
python check_bedrock_models.py
python aws_connectivity_test.py
```

### Run Only Unit Tests
```bash
./tests/unit/run_unit_tests.sh
```

Or with unittest discovery:
```bash
python -m unittest discover -s tests/unit -p "test_*.py" -v
```

### Run Specific Unit Test
```bash
python -m unittest tests.unit.test_pipeline.TestPipeline.test_run_pipeline_success
```

## Test Requirements

### Integration Tests
- Valid AWS credentials in `.env` file
- Access to:
  - S3 bucket (ap-southeast-1)
  - Bedrock (us-east-1)
  - OpenSearch (ap-southeast-1, via SSH jumphost)
- SSH access to jumphost-sg.castlery.com

### Unit Tests
- No AWS credentials required
- No external dependencies
- All dependencies mocked

## Current Test Coverage

- **Integration Tests**: 6/6 passing ✅
- **Unit Tests**: 13/13 passing ✅
- **Total**: 19/19 passing ✅

## What's NOT Tested

The following areas currently lack tests:

1. **Unit 3 (SearchIndexService)** - Index creation and management
2. **Unit 4 (LLMService)** - Claude LLM integration for intent extraction and tag generation
3. **Unit 4 (TagIndexService)** - Tag index management
4. **API endpoints** - Flask/Lambda handlers (test_api.py exists but requires deployed API)
5. **End-to-end workflows** - Complete data pipeline with real AWS services
6. **Performance tests** - Response time, throughput, concurrency
7. **Error recovery** - Retry logic, circuit breakers, fallback mechanisms

## Adding New Tests

### Unit Test Template
```python
import unittest
from unittest.mock import Mock, patch
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent.parent))

from your_module import YourClass

class TestYourClass(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures."""
        self.config = {...}
    
    @patch('your_module.dependency')
    def test_something(self, mock_dependency):
        """Test description."""
        # Arrange
        mock_dependency.return_value = expected_value
        
        # Act
        result = YourClass(self.config).method()
        
        # Assert
        self.assertEqual(result, expected_value)

if __name__ == '__main__':
    unittest.main()
```

### Integration Test Template
```python
#!/usr/bin/env python3
import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

# Load environment
env_path = Path('.env')
load_dotenv(env_path)

print("Testing Your Feature...")
print("=" * 70)

try:
    # Your test code here
    print("✓ Test passed")
except Exception as e:
    print(f"❌ Test failed: {str(e)}")
    sys.exit(1)
```

## CI/CD Integration

To integrate with CI/CD pipelines:

```yaml
# Example GitHub Actions
- name: Run Tests
  run: |
    source venv/bin/activate
    cd src
    ./tests/run_all_tests.sh
```

For CI environments without AWS access, run only unit tests:
```bash
./tests/unit/run_unit_tests.sh
```
