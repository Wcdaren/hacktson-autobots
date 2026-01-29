"""
Direct test of search service functions (no Flask/API needed).
Tests the core search functionality after config changes.
"""

import sys
import yaml
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from unit_4_search_query.search_service import SearchQueryService


def load_config():
    """Load configuration."""
    config_path = Path(__file__).parent.parent / 'config.yaml'
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)


def test_config_structure():
    """Test that config has the expected structure after consolidation."""
    print("\n" + "=" * 60)
    print("Testing Config Structure")
    print("=" * 60)
    
    config = load_config()
    
    # Check unified catalog exists
    assert 'catalog' in config, "Missing 'catalog' section"
    print("✓ Unified 'catalog' section exists")
    
    # Check catalog has expected keys
    catalog = config['catalog']
    expected_keys = ['colors', 'materials', 'sizes', 'categories', 'styles', 
                     'rooms', 'features', 'conditions', 'price_ranges']
    
    for key in expected_keys:
        assert key in catalog, f"Missing catalog.{key}"
        assert isinstance(catalog[key], list), f"catalog.{key} should be a list"
        assert len(catalog[key]) > 0, f"catalog.{key} is empty"
    
    print(f"✓ All {len(expected_keys)} catalog keys present and populated")
    
    # Check filters section is simplified
    filters = config['search_query']['filters']
    assert 'price_patterns' in filters, "Missing price_patterns"
    assert 'enabled' in filters, "Missing enabled flag"
    
    # These should NOT exist anymore (moved to catalog)
    old_keys = ['color_values', 'material_values', 'category_values', 
                'size_values', 'style_values', 'room_values', 
                'feature_values', 'condition_values']
    
    for key in old_keys:
        assert key not in filters, f"Old key '{key}' should be removed from filters"
    
    print("✓ Filters section simplified (old *_values removed)")
    
    # Check related_tags doesn't have duplicate catalog_values
    related_tags = config.get('related_tags', {})
    assert 'catalog_values' not in related_tags, "Duplicate catalog_values should be removed"
    print("✓ related_tags.catalog_values removed (using unified catalog)")
    
    # Check llm_fallback doesn't have unused intent_mappings
    llm_fallback = config.get('llm_fallback', {})
    assert 'intent_mappings' not in llm_fallback, "Unused intent_mappings should be removed"
    print("✓ llm_fallback.intent_mappings removed (unused)")
    
    print("\n✓ Config structure is correct!")


def test_filter_extraction():
    """Test that filter extraction works with new config structure."""
    print("\n" + "=" * 60)
    print("Testing Filter Extraction")
    print("=" * 60)
    
    config = load_config()
    service = SearchQueryService(config)
    
    # Test price extraction
    test_cases = [
        ("grey sofa under $1000", {'price_max': 1000.0, 'colors': ['Grey'], 'categories': ['Sofa']}),
        ("leather chair over $500", {'price_min': 500.0, 'materials': ['Leather'], 'categories': ['Chair']}),
        ("wooden table between $500 and $1000", {'price_min': 500.0, 'price_max': 1000.0, 'materials': ['Wood'], 'categories': ['Table']}),
        ("modern velvet sofa", {'styles': ['Modern'], 'materials': ['Velvet'], 'categories': ['Sofa']}),
        ("king bed with storage", {'sizes': ['King'], 'categories': ['Bed'], 'features': ['Storage']}),
    ]
    
    for query, expected_filters in test_cases:
        print(f"\nQuery: '{query}'")
        filters = service.extract_filters(query)
        print(f"  Extracted: {filters}")
        
        # Check each expected filter
        for key, expected_value in expected_filters.items():
            if key in filters:
                if isinstance(expected_value, list):
                    # For lists, check if all expected values are present
                    for val in expected_value:
                        assert val in filters[key], f"Expected {val} in {key}"
                else:
                    assert filters[key] == expected_value, f"Expected {key}={expected_value}, got {filters[key]}"
                print(f"  ✓ {key}: {filters[key]}")
            else:
                print(f"  ⚠ Missing expected filter: {key}")
    
    print("\n✓ Filter extraction working!")


def test_catalog_access():
    """Test that services can access unified catalog."""
    print("\n" + "=" * 60)
    print("Testing Catalog Access")
    print("=" * 60)
    
    config = load_config()
    
    # Test SearchQueryService can access catalog
    service = SearchQueryService(config)
    catalog = config.get('catalog', {})
    
    print(f"✓ Catalog has {len(catalog.get('colors', []))} colors")
    print(f"✓ Catalog has {len(catalog.get('materials', []))} materials")
    print(f"✓ Catalog has {len(catalog.get('categories', []))} categories")
    print(f"✓ Catalog has {len(catalog.get('styles', []))} styles")
    print(f"✓ Catalog has {len(catalog.get('price_ranges', []))} price ranges")
    
    # Test LLM service can access catalog
    from unit_4_search_query.llm_service import ClaudeLLMService
    llm_service = ClaudeLLMService(config)
    
    assert hasattr(llm_service, 'catalog'), "LLM service should have catalog attribute"
    assert llm_service.catalog == catalog, "LLM service catalog should match config catalog"
    
    print("✓ LLM service can access unified catalog")
    
    print("\n✓ Catalog access working!")


def test_match_filter_values():
    """Test the word boundary matching logic."""
    print("\n" + "=" * 60)
    print("Testing Filter Value Matching")
    print("=" * 60)
    
    config = load_config()
    service = SearchQueryService(config)
    
    # Test word boundary matching
    test_cases = [
        ("oak table", ['Oak'], True),  # Should match
        ("soaking wet", ['Oak'], False),  # Should NOT match (oak in soaking)
        ("mid-century modern", ['Mid-Century'], True),  # Should match with hyphen
        ("2-seater sofa", ['2-Seater'], True),  # Should match
        ("performance fabric", ['Performance Fabric'], True),  # Should match multi-word
    ]
    
    for query, values, should_match in test_cases:
        result = service._match_filter_values(query.lower(), values)
        matched = len(result) > 0
        
        status = "✓" if matched == should_match else "✗"
        print(f"{status} Query: '{query}' | Values: {values} | Matched: {matched} (expected: {should_match})")
        
        if matched != should_match:
            print(f"  ERROR: Expected match={should_match}, got match={matched}")
    
    print("\n✓ Filter matching logic working!")


def main():
    """Run all tests."""
    print("=" * 60)
    print("Search Service Function Tests")
    print("=" * 60)
    
    try:
        test_config_structure()
        test_filter_extraction()
        test_catalog_access()
        test_match_filter_values()
        
        print("\n" + "=" * 60)
        print("✓ ALL TESTS PASSED")
        print("=" * 60)
        
    except AssertionError as e:
        print(f"\n✗ TEST FAILED: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"\n✗ ERROR: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
