# Logical Design Addendum: Features 5 & 6

## Feature 5: LLM Fallback for Intent Extraction

### New Value Objects

#### intents.py

```python
from dataclasses import dataclass, field
from typing import List, Dict, Optional
from domain.value_objects.filters import SearchFilters

@dataclass
class CatalogKnowledge:
    """Knowledge base of valid catalog attributes for LLM context"""
    categories: List[str] = field(default_factory=list)
    materials: List[str] = field(default_factory=list)
    colors: List[str] = field(default_factory=list)
    styles: List[str] = field(default_factory=list)
    price_ranges: List[str] = field(default_factory=list)
    
    def to_prompt_context(self) -> str:
        """Format catalog knowledge for LLM prompt"""
        return f"""
Available Categories: {', '.join(self.categories)}
Available Materials: {', '.join(self.materials)}
Available Colors: {', '.join(self.colors)}
Available Styles: {', '.join(self.styles)}
Price Ranges: {', '.join(self.price_ranges)}
"""
    
    def validate_attribute(self, attr: str) -> bool:
        """Check if attribute exists in catalog"""
        all_values = (self.categories + self.materials + 
                     self.colors + self.styles)
        return attr.lower() in [v.lower() for v in all_values]
```


@dataclass
class ExtractedIntents:
    """Result of LLM intent extraction"""
    original_query: str
    abstract_terms: List[str]  # e.g., ["royal", "modern"]
    concrete_attributes: Dict[str, List[str]]  # {"royal": ["ornate", "elegant"]}
    suggested_filters: SearchFilters
    enhanced_query: str
    
    def to_dict(self) -> dict:
        return {
            "original_query": self.original_query,
            "abstract_terms": self.abstract_terms,
            "concrete_attributes": self.concrete_attributes,
            "enhanced_query": self.enhanced_query
        }
    
    def get_enhanced_query(self) -> str:
        """Get the reformulated query with concrete attributes"""
        return self.enhanced_query
```

### New Domain Services

#### intent_extraction_service.py

```python
from typing import Optional
from domain.value_objects.intents import ExtractedIntents, CatalogKnowledge
from domain.repositories.llm_response_cache import LLMResponseCache
from infrastructure.bedrock.claude_llm_adapter import ClaudeLLMAdapter
from infrastructure.config.config_loader import Config
import logging

logger = logging.getLogger(__name__)

class IntentExtractionService:
    """Domain service for extracting intents from abstract queries using LLM"""
    
    def __init__(self):
        self.config = Config.get('llm_fallback', {})
        self.cache = LLMResponseCache()
        self.llm_adapter = ClaudeLLMAdapter()
        self.similarity_threshold = self.config.get('similarity_threshold', 0.3)
    
    def should_trigger_fallback(self, top_score: float) -> bool:
        """Determine if LLM fallback should be triggered"""
        if not self.config.get('enabled', True):
            return False
        return top_score < self.similarity_threshold
    
    def extract_intents(
        self,
        query: str,
        catalog_knowledge: CatalogKnowledge
    ) -> ExtractedIntents:
        """Use Claude LLM to extract concrete attributes from abstract query"""
        # Check cache first
        if self.config.get('cache_enabled', True):
            cached = self.cache.get(query)
            if cached:
                logger.info(f"Cache hit for query: {query}")
                return cached
        
        # Build prompt and call LLM
        prompt = self.llm_adapter.build_intent_extraction_prompt(
            query, catalog_knowledge
        )
        
        response = self.llm_adapter.invoke_claude(
            prompt,
            self.config.get('model_id', 'anthropic.claude-3-sonnet-20240229-v1:0')
        )
        
        # Parse response
        intents = self.llm_adapter.parse_intent_response(response, query)
        
        # Cache result
        if self.config.get('cache_enabled', True):
            ttl = self.config.get('cache_ttl_seconds', 3600)
            self.cache.set(query, intents, ttl)
        
        return intents
    
    def enhance_query(
        self,
        original_query: str,
        extracted_intents: ExtractedIntents
    ) -> str:
        """Reformulate query with extracted concrete attributes"""
        return extracted_intents.get_enhanced_query()
```


## Feature 6: Related Search Tags

### New Value Objects

#### tags.py

```python
from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum

class TagType(Enum):
    CATEGORY = "category"
    PRICE_RANGE = "price_range"
    MATERIAL = "material"
    STYLE = "style"
    COLOR = "color"

@dataclass
class SearchTag:
    """A clickable search tag for refining results"""
    tag: str  # Display text, e.g., "Dining Chairs"
    tag_type: TagType
    count: Optional[int] = None  # Products matching this tag
    relevance_score: float = 0.0
    
    def to_dict(self) -> dict:
        return {
            "tag": self.tag,
            "type": self.tag_type.value,
            "count": self.count,
            "relevance_score": self.relevance_score
        }

@dataclass
class CatalogValues:
    """Valid catalog values for tag validation"""
    categories: List[str] = field(default_factory=list)
    price_ranges: List[str] = field(default_factory=list)
    materials: List[str] = field(default_factory=list)
    styles: List[str] = field(default_factory=list)
    colors: List[str] = field(default_factory=list)
    
    def is_valid_tag(self, tag: str, tag_type: TagType) -> bool:
        """Check if tag is valid for given type"""
        values_map = {
            TagType.CATEGORY: self.categories,
            TagType.PRICE_RANGE: self.price_ranges,
            TagType.MATERIAL: self.materials,
            TagType.STYLE: self.styles,
            TagType.COLOR: self.colors
        }
        values = values_map.get(tag_type, [])
        return tag.lower() in [v.lower() for v in values]
```


### New Domain Services

#### tag_index_service.py

```python
import json
import logging
from typing import Dict, List, Set
from collections import defaultdict
from domain.value_objects.tags import SearchTag, TagType, CatalogValues

logger = logging.getLogger(__name__)

class TagIndexService:
    """
    Pre-compute and index tags for instant retrieval.
    Built during data ingestion phase, provides <1ms lookup at query time.
    """
    
    def __init__(self, config: Dict):
        self.config = config
        self.catalog_values = config.get('catalog_values', {})
        
        # Pre-computed indices
        self.category_tags: Dict[str, List[Dict]] = {}
        self.query_pattern_tags: Dict[str, List[Dict]] = {}
        self.term_to_tags: Dict[str, Set[str]] = defaultdict(set)
        
        # Load or build index
        index_path = config.get('tag_index_path')
        if index_path:
            try:
                self.load_index(index_path)
            except FileNotFoundError:
                self._build_index()
        else:
            self._build_index()
    
    def _build_index(self):
        """Build pre-computed tag index from catalog values"""
        logger.info("Building tag index...")
        
        # 1. Category-based tags
        categories = self.catalog_values.get('categories', [])
        for category in categories:
            self.category_tags[category.lower()] = self._generate_category_tags(category)
        
        # 2. Common query patterns
        self._build_query_pattern_index()
        
        # 3. Build inverted index
        self._build_inverted_index()
        
        logger.info(f"Tag index built: {len(self.category_tags)} categories, "
                   f"{len(self.query_pattern_tags)} patterns")
    
    def _generate_category_tags(self, category: str) -> List[Dict]:
        """Generate tags for a specific category"""
        tags = []
        
        # Add related categories
        related = self._get_related_categories(category)
        for cat in related[:3]:
            tags.append({'tag': cat, 'type': 'category', 'relevance_score': 0.9})
        
        # Add common materials
        materials = self._get_common_materials(category)
        for mat in materials[:2]:
            tags.append({'tag': mat, 'type': 'material', 'relevance_score': 0.7})
        
        # Add common styles
        for style in ['Modern', 'Traditional'][:2]:
            tags.append({'tag': style, 'type': 'style', 'relevance_score': 0.6})
        
        # Add price range
        tags.append({'tag': 'Under $1,000', 'type': 'price_range', 'relevance_score': 0.5})
        
        return tags
    
    def _get_related_categories(self, category: str) -> List[str]:
        """Get related categories"""
        category_map = {
            'sofas': ['Sectionals', '2-Seater', '3-Seater', 'Loveseats'],
            'tables': ['Coffee Tables', 'Dining Tables', 'Side Tables'],
            'chairs': ['Dining Chairs', 'Armchairs', 'Office Chairs'],
            'beds': ['King Beds', 'Queen Beds', 'Nightstands']
        }
        return category_map.get(category.lower(), [category])
    
    def _get_common_materials(self, category: str) -> List[str]:
        """Get common materials for category"""
        material_map = {
            'sofas': ['Fabric', 'Leather', 'Velvet'],
            'tables': ['Wood', 'Marble', 'Glass'],
            'chairs': ['Fabric', 'Leather', 'Wood'],
            'beds': ['Wood', 'Fabric']
        }
        return material_map.get(category.lower(), ['Wood', 'Fabric'])
    
    def _build_query_pattern_index(self):
        """Build index for common query patterns"""
        patterns = {
            'sofa': ['Sectionals', 'Fabric', 'Leather', 'Modern', 'Under $1,000'],
            'chair': ['Dining Chairs', 'Armchairs', 'Leather', 'Wood', 'Modern'],
            'table': ['Coffee Tables', 'Dining Tables', 'Wood', 'Marble', 'Modern'],
            'bed': ['King Beds', 'Queen Beds', 'Wood', 'Fabric', 'Under $2,000'],
            'modern': ['Minimalist', 'Contemporary', 'Clean Lines'],
            'leather': ['Fabric', 'Velvet', 'Brown', 'Black'],
            'wood': ['Walnut', 'Oak', 'Teak', 'Natural']
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
        """Infer tag type from tag value"""
        tag_lower = tag.lower()
        
        if any(p in tag_lower for p in ['under', '$', 'over']):
            return 'price_range'
        
        for key, values in self.catalog_values.items():
            if tag_lower in [v.lower() for v in values]:
                type_map = {
                    'categories': 'category',
                    'materials': 'material',
                    'styles': 'style',
                    'colors': 'color',
                    'price_ranges': 'price_range'
                }
                return type_map.get(key, 'category')
        
        return 'category'
    
    def _build_inverted_index(self):
        """Build inverted index: term -> tags"""
        for category, tags in self.category_tags.items():
            for tag in tags:
                self.term_to_tags[category].add(tag['tag'])
        
        for pattern, tags in self.query_pattern_tags.items():
            for tag in tags:
                self.term_to_tags[pattern].add(tag['tag'])
    
    def has_tags_for_query(self, query: str) -> bool:
        """Check if query exists in pre-computed index"""
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        for term in query_terms:
            if term in self.category_tags or term in self.query_pattern_tags:
                return True
        return False
    
    def get_tags_for_query(self, query: str, max_tags: int = 10) -> List[SearchTag]:
        """
        Get pre-computed tags for query (instant lookup <1ms).
        """
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        all_tags = []
        seen_tags = set()
        
        # Check for matches
        for term in query_terms:
            if term in self.category_tags:
                for tag_dict in self.category_tags[term]:
                    if tag_dict['tag'] not in seen_tags:
                        all_tags.append(SearchTag(
                            tag=tag_dict['tag'],
                            tag_type=TagType(tag_dict['type']),
                            relevance_score=tag_dict['relevance_score']
                        ))
                        seen_tags.add(tag_dict['tag'])
            
            if term in self.query_pattern_tags:
                for tag_dict in self.query_pattern_tags[term]:
                    if tag_dict['tag'] not in seen_tags:
                        all_tags.append(SearchTag(
                            tag=tag_dict['tag'],
                            tag_type=TagType(tag_dict['type']),
                            relevance_score=tag_dict['relevance_score']
                        ))
                        seen_tags.add(tag_dict['tag'])
        
        # Sort by relevance and limit
        all_tags.sort(key=lambda x: x.relevance_score, reverse=True)
        return all_tags[:max_tags]
    
    def add_query_pattern(self, query: str, tags: List[SearchTag]):
        """Add new query pattern from LLM results"""
        query_lower = query.lower()
        tag_dicts = [{'tag': t.tag, 'type': t.tag_type.value, 'relevance_score': t.relevance_score} 
                     for t in tags]
        self.query_pattern_tags[query_lower] = tag_dicts
        logger.info(f"Added query pattern to index: {query}")
    
    def export_index(self, filepath: str):
        """Export index to JSON"""
        index_data = {
            'category_tags': self.category_tags,
            'query_pattern_tags': self.query_pattern_tags,
            'term_to_tags': {k: list(v) for k, v in self.term_to_tags.items()}
        }
        with open(filepath, 'w') as f:
            json.dump(index_data, f, indent=2)
        logger.info(f"Tag index exported to {filepath}")
    
    def load_index(self, filepath: str):
        """Load index from JSON"""
        with open(filepath, 'r') as f:
            index_data = json.load(f)
        self.category_tags = index_data['category_tags']
        self.query_pattern_tags = index_data['query_pattern_tags']
        self.term_to_tags = {k: set(v) for k, v in index_data['term_to_tags'].items()}
        logger.info(f"Tag index loaded from {filepath}")
```

#### related_tags_service.py

```python
from typing import List, Optional
from domain.value_objects.tags import SearchTag, TagType, CatalogValues
from domain.value_objects.product_data import ProductMatch
from domain.repositories.tag_cache import TagCache
from domain.services.tag_index_service import TagIndexService
from infrastructure.bedrock.claude_llm_adapter import ClaudeLLMAdapter
from infrastructure.config.config_loader import Config
import logging

logger = logging.getLogger(__name__)

class RelatedTagsService:
    """Domain service for generating personalized search tags using two-tier approach"""
    
    def __init__(self):
        self.config = Config.get('related_tags', {})
        self.tag_cache = TagCache()
        self.tag_index = TagIndexService(self.config)  # Pre-computed index
        self.llm_adapter = ClaudeLLMAdapter()
        self.min_tags = self.config.get('min_tags', 3)
        self.max_tags = self.config.get('max_tags', 10)
        self.use_precomputed = self.config.get('use_precomputed_index', True)
    
    def get_tags(
        self,
        query: str,
        search_results: List[ProductMatch] = None,
        catalog_values: CatalogValues = None
    ) -> List[SearchTag]:
        """
        Get personalized tags using two-tier approach.
        
        Tier 1 (Primary): Pre-computed index lookup (instant, <1ms)
        Tier 2 (Fallback): LLM generation for unique queries (1-2s)
        """
        if not self.config.get('enabled', True):
            return []
        
        # Tier 1: Try pre-computed index first
        if self.use_precomputed and self.tag_index.has_tags_for_query(query):
            logger.info(f"Using pre-computed tags for: {query}")
            tags = self.tag_index.get_tags_for_query(query, self.max_tags)
            return tags
        
        # Tier 2: Check cache for LLM-generated tags
        if self.config.get('cache_enabled', True):
            cached = self.tag_cache.get(query)
            if cached:
                logger.info(f"Tag cache hit for: {query}")
                return cached
        
        # Tier 2: Generate with LLM for unique queries
        logger.info(f"Generating tags with LLM for unique query: {query}")
        tags = self.generate_tags_with_llm(query, search_results, catalog_values)
        
        # Cache LLM result
        if self.config.get('cache_enabled', True):
            ttl = self.config.get('cache_ttl_seconds', 1800)
            self.tag_cache.set(query, tags, ttl)
        
        # Add to pre-computed index for future use
        if self.use_precomputed:
            self.tag_index.add_query_pattern(query, tags)
        
        return tags
    
    def generate_tags_with_llm(
        self,
        query: str,
        search_results: List[ProductMatch] = None,
        catalog_values: CatalogValues = None
    ) -> List[SearchTag]:
        """Generate tags using LLM for unique queries"""
        # Build prompt and call LLM
        prompt = self.llm_adapter.build_tag_generation_prompt(
            query, search_results, catalog_values
        )
        
        response = self.llm_adapter.invoke_claude(
            prompt,
            self.config.get('llm_model_id', 'anthropic.claude-3-sonnet-20240229-v1:0')
        )
        
        # Parse and validate tags
        tags = self.llm_adapter.parse_tag_response(response)
        tags = self.validate_tags(tags, catalog_values)
        tags = self.balance_tag_types(tags)
        
        return tags
    
    def validate_tags(
        self,
        tags: List[SearchTag],
        catalog_values: CatalogValues
    ) -> List[SearchTag]:
        """Filter tags to only include those in catalog"""
        if not catalog_values:
            return tags
        return [t for t in tags if catalog_values.is_valid_tag(t.tag, t.tag_type)]
    
    def balance_tag_types(self, tags: List[SearchTag]) -> List[SearchTag]:
        """Ensure balanced mix of tag types within limits"""
        if len(tags) <= self.min_tags:
            return tags
        return tags[:self.max_tags]
```


### Infrastructure Layer

#### claude_llm_adapter.py

```python
import boto3
import json
from typing import List, Dict, Optional
from domain.value_objects.intents import ExtractedIntents, CatalogKnowledge
from domain.value_objects.tags import SearchTag, TagType, CatalogValues
from domain.value_objects.product_data import ProductMatch
from domain.value_objects.filters import SearchFilters
from infrastructure.config.config_loader import Config
import logging

logger = logging.getLogger(__name__)

class ClaudeLLMAdapter:
    """Adapter for Claude LLM via Bedrock"""
    
    def __init__(self):
        self.config = Config.get('aws', {})
        self.client = boto3.client(
            'bedrock-runtime',
            region_name=self.config.get('region', 'us-east-1')
        )
    
    def build_intent_extraction_prompt(
        self,
        query: str,
        catalog_knowledge: CatalogKnowledge
    ) -> str:
        """Build prompt for intent extraction"""
        return f"""You are a furniture search assistant. A user searched for: "{query}"

This query contains abstract or subjective terms. Your task is to extract concrete, searchable product attributes.

{catalog_knowledge.to_prompt_context()}

Analyze the query and respond in JSON format:
{{
    "abstract_terms": ["list of abstract/subjective terms found"],
    "concrete_attributes": {{
        "abstract_term": ["list of concrete attributes it maps to"]
    }},
    "enhanced_query": "reformulated query with concrete terms"
}}

Example:
Query: "royal yet modern dining table"
Response:
{{
    "abstract_terms": ["royal", "modern"],
    "concrete_attributes": {{
        "royal": ["ornate", "elegant", "gold accents", "traditional"],
        "modern": ["clean lines", "minimalist", "contemporary"]
    }},
    "enhanced_query": "elegant ornate dining table with clean lines contemporary style"
}}

Now analyze: "{query}"
"""

    
    def build_tag_generation_prompt(
        self,
        query: str,
        search_results: List[ProductMatch] = None,
        catalog_values: CatalogValues = None
    ) -> str:
        """Build prompt for tag generation"""
        results_context = ""
        if search_results:
            top_results = search_results[:5]
            results_context = "Top search results include: " + ", ".join(
                [r.product_data.product_name for r in top_results]
            )
        
        catalog_context = ""
        if catalog_values:
            catalog_context = f"""
Valid Categories: {', '.join(catalog_values.categories[:20])}
Valid Materials: {', '.join(catalog_values.materials)}
Valid Styles: {', '.join(catalog_values.styles)}
Valid Colors: {', '.join(catalog_values.colors)}
Valid Price Ranges: {', '.join(catalog_values.price_ranges)}
"""
        
        return f"""You are a furniture search assistant. Generate related search tags for the query: "{query}"

{results_context}

{catalog_context}

Generate 5-10 personalized, clickable tags that help refine the search.
Tags should be diverse (mix of categories, materials, styles, colors, price ranges).
Tags must be from the valid values listed above.

Respond in JSON format:
{{
    "tags": [
        {{"tag": "Tag Name", "type": "category|material|style|color|price_range", "relevance": 0.9}}
    ]
}}

Example for "brown leather chair":
{{
    "tags": [
        {{"tag": "Dining Chairs", "type": "category", "relevance": 0.9}},
        {{"tag": "Armchairs", "type": "category", "relevance": 0.85}},
        {{"tag": "Under $1,000", "type": "price_range", "relevance": 0.7}},
        {{"tag": "Modern", "type": "style", "relevance": 0.6}},
        {{"tag": "Walnut", "type": "material", "relevance": 0.5}}
    ]
}}
"""

    
    def invoke_claude(self, prompt: str, model_id: str) -> str:
        """Call Claude via Bedrock and return response"""
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1024,
            "messages": [
                {"role": "user", "content": prompt}
            ]
        })
        
        response = self.client.invoke_model(
            modelId=model_id,
            body=body,
            contentType='application/json',
            accept='application/json'
        )
        
        response_body = json.loads(response['body'].read())
        return response_body['content'][0]['text']
    
    def parse_intent_response(self, response: str, original_query: str) -> ExtractedIntents:
        """Parse Claude response to ExtractedIntents"""
        try:
            # Extract JSON from response
            json_str = self._extract_json(response)
            data = json.loads(json_str)
            
            return ExtractedIntents(
                original_query=original_query,
                abstract_terms=data.get('abstract_terms', []),
                concrete_attributes=data.get('concrete_attributes', {}),
                suggested_filters=SearchFilters(),
                enhanced_query=data.get('enhanced_query', original_query)
            )
        except Exception as e:
            logger.error(f"Failed to parse intent response: {e}")
            return ExtractedIntents(
                original_query=original_query,
                abstract_terms=[],
                concrete_attributes={},
                suggested_filters=SearchFilters(),
                enhanced_query=original_query
            )
    
    def parse_tag_response(self, response: str) -> List[SearchTag]:
        """Parse Claude response to SearchTags"""
        try:
            json_str = self._extract_json(response)
            data = json.loads(json_str)
            
            tags = []
            for tag_data in data.get('tags', []):
                tag_type = self._map_tag_type(tag_data.get('type', 'category'))
                tags.append(SearchTag(
                    tag=tag_data['tag'],
                    tag_type=tag_type,
                    relevance_score=tag_data.get('relevance', 0.5)
                ))
            return tags
        except Exception as e:
            logger.error(f"Failed to parse tag response: {e}")
            return []
    
    def _extract_json(self, text: str) -> str:
        """Extract JSON from text response"""
        start = text.find('{')
        end = text.rfind('}') + 1
        if start >= 0 and end > start:
            return text[start:end]
        return text
    
    def _map_tag_type(self, type_str: str) -> TagType:
        """Map string to TagType enum"""
        mapping = {
            'category': TagType.CATEGORY,
            'price_range': TagType.PRICE_RANGE,
            'material': TagType.MATERIAL,
            'style': TagType.STYLE,
            'color': TagType.COLOR
        }
        return mapping.get(type_str.lower(), TagType.CATEGORY)
```


### Cache Implementations

#### llm_cache_impl.py

```python
from typing import Optional, Dict
from datetime import datetime, timedelta
from domain.value_objects.intents import ExtractedIntents
import threading

class LLMResponseCache:
    """In-memory cache for LLM responses with TTL"""
    
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._cache: Dict[str, tuple] = {}
        return cls._instance
    
    def get(self, query: str) -> Optional[ExtractedIntents]:
        """Get cached intent extraction result"""
        key = self._normalize_key(query)
        if key in self._cache:
            intents, expiry = self._cache[key]
            if datetime.now() < expiry:
                return intents
            del self._cache[key]
        return None
    
    def set(self, query: str, intents: ExtractedIntents, ttl_seconds: int) -> None:
        """Cache intent extraction result"""
        key = self._normalize_key(query)
        expiry = datetime.now() + timedelta(seconds=ttl_seconds)
        self._cache[key] = (intents, expiry)
    
    def invalidate(self, query: str) -> None:
        """Invalidate cached result"""
        key = self._normalize_key(query)
        self._cache.pop(key, None)
    
    def clear(self) -> None:
        """Clear all cached results"""
        self._cache.clear()
    
    def _normalize_key(self, query: str) -> str:
        """Normalize query for cache key"""
        return query.strip().lower()


class TagCache:
    """In-memory cache for generated tags with TTL"""
    
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._cache: Dict[str, tuple] = {}
        return cls._instance
    
    def get(self, query: str) -> Optional[list]:
        """Get cached tags for query"""
        key = self._normalize_key(query)
        if key in self._cache:
            tags, expiry = self._cache[key]
            if datetime.now() < expiry:
                return tags
            del self._cache[key]
        return None
    
    def set(self, query: str, tags: list, ttl_seconds: int) -> None:
        """Cache tags for query"""
        key = self._normalize_key(query)
        expiry = datetime.now() + timedelta(seconds=ttl_seconds)
        self._cache[key] = (tags, expiry)
    
    def invalidate(self, query: str) -> None:
        """Invalidate cached tags"""
        key = self._normalize_key(query)
        self._cache.pop(key, None)
    
    def clear(self) -> None:
        """Clear all cached tags"""
        self._cache.clear()
    
    def _normalize_key(self, query: str) -> str:
        """Normalize query for cache key"""
        return query.strip().lower()
```

---

## Updated TextSearchService with Features 5 & 6

```python
class TextSearchService:
    """Updated text search service with LLM fallback and related tags"""
    
    def __init__(self):
        self.filter_service = FilterExtractionService()
        self.embedding_service = EmbeddingService()
        self.search_service = SearchStrategyService()
        self.intent_service = IntentExtractionService()  # NEW
        self.tags_service = RelatedTagsService()  # NEW
        self.timeout_policy = SearchTimeoutPolicy()
        self.result_limit_policy = ResultLimitPolicy()
        self.config = Config.get_search_query_config()
    
    def execute(self, query_string: str) -> dict:
        """Execute text search with fallback and tags"""
        start_time = time.time()
        
        # 1. Initial search
        results, top_score = self._perform_search(query_string)
        
        # 2. Check for LLM fallback (Feature 5)
        llm_fallback_used = False
        enhanced_query = None
        if self.intent_service.should_trigger_fallback(top_score):
            catalog_knowledge = self._get_catalog_knowledge()
            intents = self.intent_service.extract_intents(query_string, catalog_knowledge)
            enhanced_query = intents.get_enhanced_query()
            results, _ = self._perform_search(enhanced_query)
            llm_fallback_used = True
        
        # 3. Generate related tags (Feature 6)
        catalog_values = self._get_catalog_values()
        related_tags = self.tags_service.generate_tags(
            query_string, results, catalog_values
        )
        
        # 4. Build response
        response_time = int((time.time() - start_time) * 1000)
        return {
            "status": "success",
            "results": [r.to_dict() for r in results],
            "related_tags": [t.to_dict() for t in related_tags],
            "search_metadata": {
                "query": query_string,
                "llm_fallback_used": llm_fallback_used,
                "enhanced_query": enhanced_query,
                "response_time_ms": response_time
            }
        }
```

---

## Summary

Features 5 & 6 add:
- **LLM Fallback** (Feature 5): Intelligent intent extraction when search quality is low
- **Related Tags** (Feature 6): Google Shopping-style personalized tag suggestions
- **Caching**: In-memory caches for LLM responses and tags
- **Claude Integration**: Bedrock adapter for Claude LLM calls
- **Catalog Validation**: Tags validated against product catalog
