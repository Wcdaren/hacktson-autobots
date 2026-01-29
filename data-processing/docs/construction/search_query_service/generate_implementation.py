#!/usr/bin/env python3
"""
Script to generate Feature 5 & 6 components for Search Query Service.

This script adds NEW advanced features to the existing implementation:
- Feature 5: LLM Fallback for Intent Extraction (Claude-based query enhancement)
- Feature 6: Related Search Tags (Google Shopping-style tag suggestions)

Existing Features (already implemented):
- Feature 1: Data Ingestion Service (unit_1_data_ingestion)
- Feature 2: Embedding Generation Service (unit_2_embedding_generation)
- Feature 3: Search Index Service (unit_3_search_index)
- Feature 4: Search Query Service - Core (unit_4_search_query - basic search, filters, hybrid)

Target directory: ../../../src/unit_4_search_query/
"""
import os
import sys


def create_file(path, content):
    """Create a file with given content"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Created: {path}")


def generate_all_files():
    """
    Generate Feature 5 & 6 implementation files.
    
    Features 1-4 are already implemented in src/unit_1 through src/unit_4.
    This script adds the NEW advanced features (5 & 6) to unit_4_search_query.
    """
    
    # Get the project root (3 levels up from this script)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..', '..', '..'))
    base_dir = os.path.join(project_root, "src")
    
    if not os.path.exists(base_dir):
        print(f"❌ Error: src directory not found at {base_dir}")
        print("Please ensure you're running this from the correct location.")
        sys.exit(1)
    
    print(f"📁 Target directory: {base_dir}")
    print(f"🔧 Generating Feature 5 & 6 components...\n")
    
    # Generate value objects for Features 5 & 6
    generate_value_objects(base_dir)
    
    # Generate domain services for Features 5 & 6
    generate_domain_services(base_dir)
    
    # Generate infrastructure adapters
    generate_infrastructure(base_dir)
    
    # Generate cache implementations
    generate_cache(base_dir)
    
    print("\n✅ All Feature 5 & 6 files generated successfully!")
    print(f"\n📦 Generated components in {base_dir}/unit_4_search_query/:")
    print("  - Value Objects:")
    print("    • intents.py (Feature 5: CatalogKnowledge, ExtractedIntents)")
    print("    • tags.py (Feature 6: SearchTag, TagType, CatalogValues)")
    print("  - Services:")
    print("    • intent_extraction_service.py (Feature 5)")
    print("    • related_tags_service.py (Feature 6)")
    print("  - Infrastructure:")
    print("    • claude_llm_adapter.py (Features 5 & 6)")
    print("  - Cache:")
    print("    • llm_cache.py (Feature 5)")
    print("    • tag_cache.py (Feature 6)")
    print("\n📝 Next steps:")
    print("  1. Review generated files in src/unit_4_search_query/")
    print("  2. Complete minimal implementations with actual logic")
    print("  3. Update search_service.py to integrate Features 5 & 6")
    print("  4. Update llm_service.py if needed for LLM integration")
    print("  5. Update app.py to include related_tags in API response")
    print("  6. Add configuration for Features 5 & 6 in config.yaml")


def generate_value_objects(base_dir):
    """Generate Feature 5 & 6 value object files in unit_4_search_query"""
    
    unit4_dir = f"{base_dir}/unit_4_search_query"
    
    # intents.py (Feature 5)
    intents_content = '''"""Intent Extraction Value Objects - Feature 5"""
from dataclasses import dataclass, field
from typing import List, Dict


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


@dataclass
class ExtractedIntents:
    """Result of LLM intent extraction"""
    original_query: str
    abstract_terms: List[str]
    concrete_attributes: Dict[str, List[str]]
    enhanced_query: str
    
    def get_enhanced_query(self) -> str:
        """Get the reformulated query with concrete attributes"""
        return self.enhanced_query
'''
    create_file(f"{unit4_dir}/intents.py", intents_content)
    
    # tags.py (Feature 6)
    tags_content = '''"""Search Tags Value Objects - Feature 6"""
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
    tag: str
    tag_type: TagType
    count: Optional[int] = None
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
'''
    create_file(f"{unit4_dir}/tags.py", tags_content)


def generate_domain_services(base_dir):
    """Generate Feature 5 & 6 service files in unit_4_search_query"""
    
    unit4_dir = f"{base_dir}/unit_4_search_query"
    
    # intent_extraction_service.py (Feature 5)
    intent_service_content = '''"""Intent Extraction Service - Feature 5"""
from typing import Optional
from unit_4_search_query.intents import ExtractedIntents, CatalogKnowledge


class IntentExtractionService:
    """Domain service for extracting intents from abstract queries using LLM"""
    
    def __init__(self, config: dict = None):
        self.config = config or {}
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
        # Minimal implementation - to be completed
        return ExtractedIntents(
            original_query=query,
            abstract_terms=[],
            concrete_attributes={},
            enhanced_query=query
        )
'''
    create_file(f"{unit4_dir}/intent_extraction_service.py", intent_service_content)
    
    # related_tags_service.py (Feature 6)
    tags_service_content = '''"""Related Tags Service - Feature 6"""
from typing import List
from unit_4_search_query.tags import SearchTag, CatalogValues


class RelatedTagsService:
    """Domain service for generating personalized search tags using two-tier approach"""
    
    def __init__(self, config: dict = None):
        self.config = config or {}
        self.min_tags = self.config.get('min_tags', 3)
        self.max_tags = self.config.get('max_tags', 10)
    
    def get_tags(
        self,
        query: str,
        search_results: List = None,
        catalog_values: CatalogValues = None
    ) -> List[SearchTag]:
        """
        Get personalized tags using two-tier approach.
        Tier 1: Pre-computed index lookup (instant, <1ms)
        Tier 2: LLM generation for unique queries (1-2s)
        """
        # Minimal implementation - to be completed
        return []
    
    def validate_tags(
        self,
        tags: List[SearchTag],
        catalog_values: CatalogValues
    ) -> List[SearchTag]:
        """Filter tags to only include those in catalog"""
        if not catalog_values:
            return tags
        return [t for t in tags if catalog_values.is_valid_tag(t.tag, t.tag_type)]
'''
    create_file(f"{unit4_dir}/related_tags_service.py", tags_service_content)
    
    # Update existing tag_index_service.py (Feature 6) - note: file already exists
    print(f"ℹ️  Note: {unit4_dir}/tag_index_service.py already exists - review and update manually if needed")


def generate_infrastructure(base_dir):
    """Generate infrastructure adapter files in unit_4_search_query"""
    
    unit4_dir = f"{base_dir}/unit_4_search_query"
    
    # claude_llm_adapter.py (Features 5 & 6)
    claude_adapter_content = '''"""Claude LLM Adapter - Features 5 & 6"""
import boto3
import json
from typing import List, Dict
from unit_4_search_query.intents import ExtractedIntents, CatalogKnowledge
from unit_4_search_query.tags import SearchTag, TagType, CatalogValues


class ClaudeLLMAdapter:
    """Adapter for Claude LLM via Bedrock"""
    
    def __init__(self, config: dict = None):
        self.config = config or {}
        # Use bedrock_region for Bedrock (us-east-1)
        bedrock_region = self.config.get('bedrock_region', 'us-east-1')
        self.client = boto3.client(
            'bedrock-runtime',
            region_name=bedrock_region
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

Now analyze: "{query}"
"""
    
    def build_tag_generation_prompt(
        self,
        query: str,
        search_results: List = None,
        catalog_values: CatalogValues = None
    ) -> str:
        """Build prompt for tag generation"""
        results_context = ""
        if search_results:
            top_results = search_results[:5]
            results_context = "Top search results include: " + ", ".join(
                [str(r.get('product_name', '')) for r in top_results]
            )
        
        return f"""You are a furniture search assistant. Generate related search tags for the query: "{query}"

{results_context}

Generate 5-10 personalized, clickable tags that help refine the search.

Respond in JSON format:
{{
    "tags": [
        {{"tag": "Tag Name", "type": "category|material|style|color|price_range", "relevance": 0.9}}
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
            json_str = self._extract_json(response)
            data = json.loads(json_str)
            
            return ExtractedIntents(
                original_query=original_query,
                abstract_terms=data.get('abstract_terms', []),
                concrete_attributes=data.get('concrete_attributes', {}),
                enhanced_query=data.get('enhanced_query', original_query)
            )
        except Exception:
            return ExtractedIntents(
                original_query=original_query,
                abstract_terms=[],
                concrete_attributes={},
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
        except Exception:
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
'''
    create_file(f"{unit4_dir}/claude_llm_adapter.py", claude_adapter_content)


def generate_cache(base_dir):
    """Generate cache implementation files in unit_4_search_query"""
    
    unit4_dir = f"{base_dir}/unit_4_search_query"
    
    # llm_cache.py (Feature 5)
    llm_cache_content = '''"""LLM Response Cache - Feature 5"""
from typing import Optional, Dict
from datetime import datetime, timedelta
from unit_4_search_query.intents import ExtractedIntents
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
    
    def clear(self) -> None:
        """Clear all cached results"""
        self._cache.clear()
    
    def _normalize_key(self, query: str) -> str:
        """Normalize query for cache key"""
        return query.strip().lower()
'''
    create_file(f"{unit4_dir}/llm_cache.py", llm_cache_content)
    
    # tag_cache.py (Feature 6)
    tag_cache_content = '''"""Tag Cache - Feature 6"""
from typing import Optional, Dict
from datetime import datetime, timedelta
import threading


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
    
    def clear(self) -> None:
        """Clear all cached tags"""
        self._cache.clear()
    
    def _normalize_key(self, query: str) -> str:
        """Normalize query for cache key"""
        return query.strip().lower()
'''
    create_file(f"{unit4_dir}/tag_cache.py", tag_cache_content)


if __name__ == "__main__":
    generate_all_files()
