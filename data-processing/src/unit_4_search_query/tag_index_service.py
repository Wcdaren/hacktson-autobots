"""
Tag Index Service - Pre-compute and index tags for fast retrieval
This service pre-generates tags for common query patterns and product categories
to avoid LLM calls during search queries.
"""

import json
import logging
from typing import Dict, List, Set
from collections import defaultdict
from dataclasses import dataclass
from enum import Enum

logger = logging.getLogger(__name__)


class TagType(Enum):
    """Tag types for search refinement"""
    CATEGORY = "category"
    PRICE_RANGE = "price_range"
    MATERIAL = "material"
    STYLE = "style"
    COLOR = "color"


@dataclass
class SearchTag:
    """A clickable search tag"""
    tag: str
    tag_type: TagType
    relevance_score: float = 0.5
    count: int = None


class TagIndexService:
    """
    Pre-compute and index tags for fast retrieval.
    
    Strategy:
    1. Pre-generate tags for all product categories
    2. Pre-generate tags for common query patterns
    3. Build inverted index: query_term -> tags
    4. At query time: lookup tags instantly without LLM
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.catalog_values = config.get('related_tags', {}).get('catalog_values', {})
        
        # Pre-computed tag index
        self.category_tags: Dict[str, List[Dict]] = {}
        self.query_pattern_tags: Dict[str, List[Dict]] = {}
        self.term_to_tags: Dict[str, Set[str]] = defaultdict(set)
        
        # Initialize index
        self._build_tag_index()
    
    def _build_tag_index(self):
        """Build pre-computed tag index from catalog values."""
        logger.info("Building tag index...")
        
        # 1. Category-based tags
        categories = self.catalog_values.get('categories', [])
        for category in categories:
            self.category_tags[category.lower()] = self._generate_category_tags(category)
        
        # 2. Common query patterns
        self._build_query_pattern_index()
        
        # 3. Build term-to-tags inverted index
        self._build_inverted_index()
        
        logger.info(f"Tag index built: {len(self.category_tags)} categories, "
                   f"{len(self.query_pattern_tags)} patterns")
    
    def _generate_category_tags(self, category: str) -> List[Dict]:
        """Generate tags for a specific category."""
        tags = []
        
        # Add related categories
        related_categories = self._get_related_categories(category)
        for cat in related_categories[:3]:
            tags.append({
                'tag': cat,
                'type': 'category',
                'relevance_score': 0.9
            })
        
        # Add common materials for this category
        materials = self._get_common_materials(category)
        for mat in materials[:2]:
            tags.append({
                'tag': mat,
                'type': 'material',
                'relevance_score': 0.7
            })
        
        # Add common styles
        styles = ['Modern', 'Traditional', 'Minimalist']
        for style in styles[:2]:
            tags.append({
                'tag': style,
                'type': 'style',
                'relevance_score': 0.6
            })
        
        # Add price ranges
        tags.append({
            'tag': 'Under $1,000',
            'type': 'price_range',
            'relevance_score': 0.5
        })
        
        return tags

    
    def _get_related_categories(self, category: str) -> List[str]:
        """Get related categories for a given category."""
        # Pre-defined category relationships
        category_map = {
            'sofas': ['Sectionals', '2-Seater', '3-Seater', 'Loveseats'],
            'tables': ['Coffee Tables', 'Dining Tables', 'Side Tables', 'Console Tables'],
            'chairs': ['Dining Chairs', 'Armchairs', 'Office Chairs', 'Bar Stools'],
            'beds': ['King Beds', 'Queen Beds', 'Nightstands', 'Dressers'],
            'coffee tables': ['Side Tables', 'Console Tables', 'TV Units'],
            'dining chairs': ['Armchairs', 'Bar Stools', 'Benches'],
            'armchairs': ['Dining Chairs', 'Recliners', 'Ottomans']
        }
        return category_map.get(category.lower(), [category])
    
    def _get_common_materials(self, category: str) -> List[str]:
        """Get common materials for a category."""
        material_map = {
            'sofas': ['Fabric', 'Leather', 'Velvet'],
            'tables': ['Wood', 'Marble', 'Glass'],
            'chairs': ['Fabric', 'Leather', 'Wood'],
            'beds': ['Wood', 'Fabric', 'Leather']
        }
        return material_map.get(category.lower(), ['Wood', 'Fabric'])
    
    def _build_query_pattern_index(self):
        """Build index for common query patterns."""
        # Common furniture query patterns
        patterns = {
            'sofa': ['Sectionals', 'Fabric', 'Leather', 'Modern', 'Under $1,000'],
            'chair': ['Dining Chairs', 'Armchairs', 'Leather', 'Wood', 'Modern'],
            'table': ['Coffee Tables', 'Dining Tables', 'Wood', 'Marble', 'Modern'],
            'bed': ['King Beds', 'Queen Beds', 'Wood', 'Fabric', 'Under $2,000'],
            'modern': ['Minimalist', 'Contemporary', 'Clean Lines', 'Neutral Colors'],
            'leather': ['Fabric', 'Velvet', 'Brown', 'Black', 'Modern'],
            'wood': ['Walnut', 'Oak', 'Teak', 'Natural', 'Traditional'],
            'grey': ['White', 'Black', 'Beige', 'Neutral', 'Modern'],
            'brown': ['Walnut', 'Oak', 'Leather', 'Wood', 'Traditional']
        }
        
        for pattern, tag_list in patterns.items():
            tags = []
            for i, tag in enumerate(tag_list):
                tag_type = self._infer_tag_type(tag)
                tags.append({
                    'tag': tag,
                    'type': tag_type,
                    'relevance_score': 0.9 - (i * 0.1)
                })
            self.query_pattern_tags[pattern] = tags
    
    def _infer_tag_type(self, tag: str) -> str:
        """Infer tag type from tag value."""
        tag_lower = tag.lower()
        
        if any(price_word in tag_lower for price_word in ['under', '$', 'over']):
            return 'price_range'
        
        categories = [c.lower() for c in self.catalog_values.get('categories', [])]
        if tag_lower in categories:
            return 'category'
        
        materials = [m.lower() for m in self.catalog_values.get('materials', [])]
        if tag_lower in materials:
            return 'material'
        
        styles = [s.lower() for s in self.catalog_values.get('styles', [])]
        if tag_lower in styles:
            return 'style'
        
        colors = [c.lower() for c in self.catalog_values.get('colors', [])]
        if tag_lower in colors:
            return 'color'
        
        return 'category'  # Default
    
    def _build_inverted_index(self):
        """Build inverted index: term -> tags."""
        # Index category tags
        for category, tags in self.category_tags.items():
            for tag in tags:
                self.term_to_tags[category].add(tag['tag'])
        
        # Index query pattern tags
        for pattern, tags in self.query_pattern_tags.items():
            for tag in tags:
                self.term_to_tags[pattern].add(tag['tag'])
    
    def has_tags_for_query(self, query: str) -> bool:
        """
        Check if pre-computed tags exist for this query.
        
        Args:
            query: User search query
            
        Returns:
            True if tags exist in index, False otherwise
        """
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        # Check if any term matches our index
        for term in query_terms:
            if term in self.category_tags or term in self.query_pattern_tags:
                return True
        
        return False
    
    def get_tags_for_query(self, query: str, max_tags: int = 10) -> List[Dict]:
        """
        Get pre-computed tags for a query (instant lookup).
        
        Args:
            query: User search query
            max_tags: Maximum number of tags to return
            
        Returns:
            List of tag dicts with tag, type, relevance_score
        """
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        # Collect tags from all matching patterns
        all_tags = []
        seen_tags = set()
        
        # 1. Check for exact category matches
        for term in query_terms:
            if term in self.category_tags:
                for tag in self.category_tags[term]:
                    if tag['tag'] not in seen_tags:
                        all_tags.append(tag)
                        seen_tags.add(tag['tag'])
        
        # 2. Check for query pattern matches
        for term in query_terms:
            if term in self.query_pattern_tags:
                for tag in self.query_pattern_tags[term]:
                    if tag['tag'] not in seen_tags:
                        all_tags.append(tag)
                        seen_tags.add(tag['tag'])
        
        # 3. If no matches, return generic popular tags
        if not all_tags:
            all_tags = self._get_generic_tags()
        
        # Sort by relevance and limit
        all_tags.sort(key=lambda x: x['relevance_score'], reverse=True)
        return all_tags[:max_tags]
    
    def _get_generic_tags(self) -> List[Dict]:
        """Get generic popular tags when no specific match."""
        return [
            {'tag': 'Modern', 'type': 'style', 'relevance_score': 0.6},
            {'tag': 'Under $1,000', 'type': 'price_range', 'relevance_score': 0.5},
            {'tag': 'Wood', 'type': 'material', 'relevance_score': 0.5},
            {'tag': 'Fabric', 'type': 'material', 'relevance_score': 0.5},
            {'tag': 'Leather', 'type': 'material', 'relevance_score': 0.5}
        ]
    
    def should_use_llm_fallback(self, query: str) -> bool:
        """
        Determine if LLM should be used for tag generation.
        Use LLM only for complex/unique queries not in index.
        """
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        # Check if any term matches our index
        for term in query_terms:
            if term in self.category_tags or term in self.query_pattern_tags:
                return False  # Use pre-computed tags
        
        # Use LLM for unique/complex queries
        return True
    
    def export_index(self, filepath: str):
        """Export tag index to JSON file for persistence."""
        index_data = {
            'category_tags': self.category_tags,
            'query_pattern_tags': self.query_pattern_tags,
            'term_to_tags': {k: list(v) for k, v in self.term_to_tags.items()}
        }
        
        with open(filepath, 'w') as f:
            json.dump(index_data, f, indent=2)
        
        logger.info(f"Tag index exported to {filepath}")
    
    def load_index(self, filepath: str):
        """Load tag index from JSON file."""
        with open(filepath, 'r') as f:
            index_data = json.load(f)
        
        self.category_tags = index_data['category_tags']
        self.query_pattern_tags = index_data['query_pattern_tags']
        self.term_to_tags = {k: set(v) for k, v in index_data['term_to_tags'].items()}
        
        logger.info(f"Tag index loaded from {filepath}")
