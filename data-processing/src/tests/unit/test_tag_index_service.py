"""
Unit tests for Tag Index Service (Feature 6)
Tests pre-computed tag index for fast tag retrieval.
"""

import unittest
from unittest.mock import Mock, patch
import json
import tempfile
import os

import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from unit_4_search_query.tag_index_service import TagIndexService, TagType, SearchTag


class TestTagIndexService(unittest.TestCase):
    """Test Tag Index Service."""
    
    def setUp(self):
        """Set up test configuration."""
        self.config = {
            'related_tags': {
                'catalog_values': {
                    'categories': ['Sofas', 'Tables', 'Chairs', 'Beds', 'Coffee Tables', 
                                  'Dining Tables', 'Dining Chairs', 'Armchairs'],
                    'materials': ['Wood', 'Fabric', 'Leather', 'Metal', 'Marble', 'Glass'],
                    'styles': ['Modern', 'Traditional', 'Minimalist', 'Contemporary'],
                    'colors': ['Grey', 'Brown', 'White', 'Black', 'Beige'],
                    'price_ranges': ['Under $1,000', '$1,000-$2,000', 'Over $2,000']
                }
            }
        }
    
    def test_init(self):
        """Test service initialization."""
        service = TagIndexService(self.config)
        
        # Check that indexes were built
        self.assertGreater(len(service.category_tags), 0)
        self.assertGreater(len(service.query_pattern_tags), 0)
        self.assertGreater(len(service.term_to_tags), 0)
    
    def test_generate_category_tags(self):
        """Test category tag generation."""
        service = TagIndexService(self.config)
        
        tags = service._generate_category_tags('Sofas')
        
        # Should have multiple tags
        self.assertGreater(len(tags), 0)
        
        # Should have different tag types
        tag_types = [t['type'] for t in tags]
        self.assertIn('category', tag_types)
        self.assertIn('material', tag_types)
        self.assertIn('style', tag_types)
        self.assertIn('price_range', tag_types)
        
        # All tags should have required fields
        for tag in tags:
            self.assertIn('tag', tag)
            self.assertIn('type', tag)
            self.assertIn('relevance_score', tag)
    
    def test_get_related_categories(self):
        """Test getting related categories."""
        service = TagIndexService(self.config)
        
        # Test known category
        related = service._get_related_categories('sofas')
        self.assertIn('Sectionals', related)
        
        # Test unknown category returns itself
        related = service._get_related_categories('unknown')
        self.assertEqual(related, ['unknown'])
    
    def test_get_common_materials(self):
        """Test getting common materials for category."""
        service = TagIndexService(self.config)
        
        # Test known category
        materials = service._get_common_materials('sofas')
        self.assertIn('Fabric', materials)
        self.assertIn('Leather', materials)
        
        # Test unknown category returns defaults
        materials = service._get_common_materials('unknown')
        self.assertIn('Wood', materials)
    
    def test_infer_tag_type_price_range(self):
        """Test tag type inference for price ranges."""
        service = TagIndexService(self.config)
        
        self.assertEqual(service._infer_tag_type('Under $1,000'), 'price_range')
        self.assertEqual(service._infer_tag_type('Over $2,000'), 'price_range')
    
    def test_infer_tag_type_category(self):
        """Test tag type inference for categories."""
        service = TagIndexService(self.config)
        
        self.assertEqual(service._infer_tag_type('Sofas'), 'category')
        self.assertEqual(service._infer_tag_type('Tables'), 'category')
    
    def test_infer_tag_type_material(self):
        """Test tag type inference for materials."""
        service = TagIndexService(self.config)
        
        self.assertEqual(service._infer_tag_type('Wood'), 'material')
        self.assertEqual(service._infer_tag_type('Fabric'), 'material')
    
    def test_infer_tag_type_style(self):
        """Test tag type inference for styles."""
        service = TagIndexService(self.config)
        
        self.assertEqual(service._infer_tag_type('Modern'), 'style')
        self.assertEqual(service._infer_tag_type('Traditional'), 'style')
    
    def test_infer_tag_type_color(self):
        """Test tag type inference for colors."""
        service = TagIndexService(self.config)
        
        self.assertEqual(service._infer_tag_type('Grey'), 'color')
        self.assertEqual(service._infer_tag_type('Brown'), 'color')
    
    def test_get_tags_for_query_category_match(self):
        """Test getting tags for query with category match."""
        service = TagIndexService(self.config)
        
        tags = service.get_tags_for_query("sofa", max_tags=5)
        
        # Should return tags
        self.assertGreater(len(tags), 0)
        self.assertLessEqual(len(tags), 5)
        
        # All tags should have required fields
        for tag in tags:
            self.assertIn('tag', tag)
            self.assertIn('type', tag)
            self.assertIn('relevance_score', tag)
    
    def test_get_tags_for_query_multiple_terms(self):
        """Test getting tags for multi-word query."""
        service = TagIndexService(self.config)
        
        tags = service.get_tags_for_query("modern grey sofa", max_tags=10)
        
        # Should combine tags from multiple matching terms
        self.assertGreater(len(tags), 0)
        
        # Should not have duplicates
        tag_names = [t['tag'] for t in tags]
        self.assertEqual(len(tag_names), len(set(tag_names)))
    
    def test_get_tags_for_query_no_match(self):
        """Test getting tags for query with no matches."""
        service = TagIndexService(self.config)
        
        tags = service.get_tags_for_query("xyzabc123", max_tags=5)
        
        # Should return generic tags
        self.assertGreater(len(tags), 0)
        
        # Should include common tags
        tag_names = [t['tag'] for t in tags]
        self.assertIn('Modern', tag_names)
    
    def test_get_tags_for_query_respects_max_tags(self):
        """Test that get_tags_for_query respects max_tags limit."""
        service = TagIndexService(self.config)
        
        tags = service.get_tags_for_query("sofa chair table", max_tags=3)
        
        self.assertLessEqual(len(tags), 3)
    
    def test_get_tags_for_query_sorted_by_relevance(self):
        """Test that tags are sorted by relevance score."""
        service = TagIndexService(self.config)
        
        tags = service.get_tags_for_query("sofa", max_tags=10)
        
        # Check that scores are in descending order
        scores = [t['relevance_score'] for t in tags]
        self.assertEqual(scores, sorted(scores, reverse=True))
    
    def test_get_generic_tags(self):
        """Test getting generic popular tags."""
        service = TagIndexService(self.config)
        
        tags = service._get_generic_tags()
        
        # Should return some tags
        self.assertGreater(len(tags), 0)
        
        # Should include common tags
        tag_names = [t['tag'] for t in tags]
        self.assertIn('Modern', tag_names)
        self.assertIn('Wood', tag_names)
    
    def test_should_use_llm_fallback_known_term(self):
        """Test LLM fallback decision for known terms."""
        service = TagIndexService(self.config)
        
        # Known terms should not use LLM
        self.assertFalse(service.should_use_llm_fallback("sofa"))
        self.assertFalse(service.should_use_llm_fallback("modern chair"))
    
    def test_should_use_llm_fallback_unknown_term(self):
        """Test LLM fallback decision for unknown terms."""
        service = TagIndexService(self.config)
        
        # Unknown/unique terms should use LLM
        self.assertTrue(service.should_use_llm_fallback("royal elegant furniture"))
        self.assertTrue(service.should_use_llm_fallback("xyzabc"))
    
    def test_export_and_load_index(self):
        """Test exporting and loading tag index."""
        service = TagIndexService(self.config)
        
        # Create temporary file
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
            temp_file = f.name
        
        try:
            # Export index
            service.export_index(temp_file)
            
            # Verify file was created
            self.assertTrue(os.path.exists(temp_file))
            
            # Create new service and load index
            new_service = TagIndexService(self.config)
            new_service.load_index(temp_file)
            
            # Verify loaded data matches
            self.assertEqual(
                len(service.category_tags),
                len(new_service.category_tags)
            )
            self.assertEqual(
                len(service.query_pattern_tags),
                len(new_service.query_pattern_tags)
            )
            
        finally:
            # Clean up
            if os.path.exists(temp_file):
                os.remove(temp_file)
    
    def test_export_index_format(self):
        """Test that exported index has correct format."""
        service = TagIndexService(self.config)
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
            temp_file = f.name
        
        try:
            service.export_index(temp_file)
            
            # Load and verify JSON structure
            with open(temp_file, 'r') as f:
                data = json.load(f)
            
            self.assertIn('category_tags', data)
            self.assertIn('query_pattern_tags', data)
            self.assertIn('term_to_tags', data)
            
        finally:
            if os.path.exists(temp_file):
                os.remove(temp_file)
    
    def test_build_query_pattern_index(self):
        """Test building query pattern index."""
        service = TagIndexService(self.config)
        
        # Check that common patterns are indexed
        self.assertIn('sofa', service.query_pattern_tags)
        self.assertIn('chair', service.query_pattern_tags)
        self.assertIn('table', service.query_pattern_tags)
        self.assertIn('modern', service.query_pattern_tags)
        
        # Check pattern tags have correct structure
        sofa_tags = service.query_pattern_tags['sofa']
        self.assertGreater(len(sofa_tags), 0)
        
        for tag in sofa_tags:
            self.assertIn('tag', tag)
            self.assertIn('type', tag)
            self.assertIn('relevance_score', tag)
    
    def test_build_inverted_index(self):
        """Test building inverted index."""
        service = TagIndexService(self.config)
        
        # Check that terms are indexed
        self.assertGreater(len(service.term_to_tags), 0)
        
        # Check that indexed terms have tags
        for term, tags in service.term_to_tags.items():
            self.assertGreater(len(tags), 0)
            self.assertIsInstance(tags, set)


class TestSearchTag(unittest.TestCase):
    """Test SearchTag dataclass."""
    
    def test_search_tag_creation(self):
        """Test creating a SearchTag."""
        tag = SearchTag(
            tag="Modern",
            tag_type=TagType.STYLE,
            relevance_score=0.9,
            count=100
        )
        
        self.assertEqual(tag.tag, "Modern")
        self.assertEqual(tag.tag_type, TagType.STYLE)
        self.assertEqual(tag.relevance_score, 0.9)
        self.assertEqual(tag.count, 100)
    
    def test_search_tag_defaults(self):
        """Test SearchTag default values."""
        tag = SearchTag(
            tag="Sofas",
            tag_type=TagType.CATEGORY
        )
        
        self.assertEqual(tag.relevance_score, 0.5)
        self.assertIsNone(tag.count)


class TestTagType(unittest.TestCase):
    """Test TagType enum."""
    
    def test_tag_type_values(self):
        """Test TagType enum values."""
        self.assertEqual(TagType.CATEGORY.value, "category")
        self.assertEqual(TagType.PRICE_RANGE.value, "price_range")
        self.assertEqual(TagType.MATERIAL.value, "material")
        self.assertEqual(TagType.STYLE.value, "style")
        self.assertEqual(TagType.COLOR.value, "color")
    
    def test_tag_type_from_string(self):
        """Test creating TagType from string."""
        tag_type = TagType("category")
        self.assertEqual(tag_type, TagType.CATEGORY)
        
        tag_type = TagType("material")
        self.assertEqual(tag_type, TagType.MATERIAL)


if __name__ == '__main__':
    unittest.main()
