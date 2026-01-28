# Comprehensive Test Coverage Plan

## Current Status

### Completed Test Files
1. ✅ **test_data_ingestion_service.py** - 10 tests (expanded from 3)
2. ✅ **test_embedding_service_complete.py** - 20 tests (new comprehensive file)
3. ✅ **test_index_service.py** - 12 tests (new file)
4. ⚠️  **test_pipeline.py** - 4 tests (needs expansion)
5. ⚠️  **test_search_service.py** - 2 tests (needs major expansion)

### Tests Still Needed

#### Unit 4 - LLM Service (test_llm_service.py) - ~15 tests needed
- `test_init`
- `test_should_trigger_fallback_enabled`
- `test_should_trigger_fallback_disabled`
- `test_should_trigger_fallback_below_threshold`
- `test_should_trigger_fallback_above_threshold`
- `test_invoke_claude_success`
- `test_invoke_claude_error`
- `test_extract_json_valid`
- `test_extract_json_invalid`
- `test_extract_intents_success`
- `test_extract_intents_with_cache`
- `test_extract_intents_error`
- `test_generate_related_tags_success`
- `test_generate_related_tags_with_llm`
- `test_is_valid_tag`

#### Unit 4 - Tag Index Service (test_tag_index_service.py) - ~12 tests needed
- `test_init`
- `test_build_tag_index`
- `test_generate_category_tags`
- `test_get_related_categories`
- `test_get_common_materials`
- `test_build_query_pattern_index`
- `test_infer_tag_type`
- `test_get_tags_for_query_exact_match`
- `test_get_tags_for_query_partial_match`
- `test_get_tags_for_query_no_match`
- `test_should_use_llm_fallback`
- `test_export_and_load_index`

#### Unit 4 - Search Service Expansion (test_search_service_complete.py) - ~20 tests needed
- `test_init`
- `test_extract_filters_price`
- `test_extract_filters_colors`
- `test_extract_filters_materials`
- `test_extract_filters_categories`
- `test_extract_filters_combined`
- `test_generate_query_embedding`
- `test_knn_search_success`
- `test_knn_search_with_filters`
- `test_knn_search_error`
- `test_bm25_search_success`
- `test_bm25_search_with_filters`
- `test_bm25_search_error`
- `test_reciprocal_rank_fusion`
- `test_get_text_results_knn_mode`
- `test_get_text_results_bm25_mode`
- `test_get_text_results_hybrid_mode`
- `test_get_text_results_with_llm_fallback`
- `test_get_image_match_result`
- `test_refine_search_by_tag`

#### API/Lambda Tests (test_api_handlers.py) - ~10 tests needed
- `test_lambda_handler_text_search`
- `test_lambda_handler_image_search`
- `test_lambda_handler_invalid_request`
- `test_flask_health_check`
- `test_flask_text_search`
- `test_flask_image_search`
- `test_flask_refine_search`
- `test_flask_error_handlers`
- `test_load_config_with_env`
- `test_init_service`

#### Pipeline Tests Expansion (test_pipeline_complete.py) - ~6 additional tests needed
- `test_load_config_missing_file`
- `test_run_pipeline_embedding_failure`
- `test_run_pipeline_indexing_failure`
- `test_run_pipeline_with_custom_config`
- `test_main_with_args`
- `test_main_error_handling`

## Total Test Count Target

| Module | Current | Target | Status |
|--------|---------|--------|--------|
| Unit 1 - Data Ingestion | 10 | 10 | ✅ Complete |
| Unit 2 - Embedding | 20 | 20 | ✅ Complete |
| Unit 3 - Index | 12 | 12 | ✅ Complete |
| Unit 4 - Search | 2 | 20 | ⚠️ 10% |
| Unit 4 - LLM | 0 | 15 | ❌ 0% |
| Unit 4 - Tag Index | 0 | 12 | ❌ 0% |
| Pipeline | 4 | 10 | ⚠️ 40% |
| API/Lambda | 0 | 10 | ❌ 0% |
| **TOTAL** | **48** | **109** | **44%** |

## Test File Organization

```
tests/unit/
├── test_data_ingestion_service.py          ✅ 10 tests
├── test_embedding_service.py               ⚠️  4 tests (old)
├── test_embedding_service_complete.py      ✅ 20 tests (new)
├── test_index_service.py                   ✅ 12 tests (new)
├── test_search_service.py                  ⚠️  2 tests (needs expansion)
├── test_search_service_complete.py         ❌ TODO: 20 tests
├── test_llm_service.py                     ❌ TODO: 15 tests
├── test_tag_index_service.py               ❌ TODO: 12 tests
├── test_pipeline.py                        ⚠️  4 tests (needs expansion)
├── test_pipeline_complete.py               ❌ TODO: 10 tests
├── test_api_handlers.py                    ❌ TODO: 10 tests
└── run_unit_tests.sh                       ✅ Test runner
```

## How to Use Tests as Documentation

Each test serves as executable documentation showing:

1. **How to initialize** the service/class
2. **What parameters** are required
3. **What the expected output** looks like
4. **How to handle errors**
5. **Edge cases** to consider

### Example: Learning from Tests

```python
# From test_embedding_service_complete.py

def test_generate_text_embedding_success(self):
    """
    This test shows:
    1. How to create an EmbeddingService
    2. How to call generate_text_embedding()
    3. What the response looks like (1024-dim vector)
    4. What parameters are passed to Bedrock API
    """
    service = EmbeddingService(self.config)
    embedding = service.generate_text_embedding("modern grey sofa")
    
    # Expected: 1024-dimensional vector
    assert len(embedding) == 1024
```

## Running Tests

### Run All Unit Tests
```bash
./src/tests/unit/run_unit_tests.sh
```

### Run Specific Test File
```bash
python -m unittest tests.unit.test_embedding_service_complete -v
```

### Run Specific Test
```bash
python -m unittest tests.unit.test_embedding_service_complete.TestEmbeddingServiceComplete.test_generate_text_embedding_success
```

### Run with Coverage Report (if pytest-cov installed)
```bash
pytest tests/unit/ --cov=src --cov-report=html
```

## Next Steps

To complete the test suite:

1. Create `test_llm_service.py` with 15 tests
2. Create `test_tag_index_service.py` with 12 tests  
3. Expand `test_search_service.py` to 20 tests
4. Expand `test_pipeline.py` to 10 tests
5. Create `test_api_handlers.py` with 10 tests

This would bring total coverage to **109 unit tests** covering all business logic.

## Benefits of Comprehensive Tests

1. **Documentation** - Tests show exactly how to use each function
2. **Confidence** - Know your code works before deploying
3. **Refactoring Safety** - Change code without breaking functionality
4. **Bug Prevention** - Catch issues before they reach production
5. **Onboarding** - New developers learn from tests
6. **CI/CD** - Automated testing in deployment pipeline
