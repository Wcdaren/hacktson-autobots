"""
Unit 4: LLM Service for Features 5 & 6
Claude LLM integration via Bedrock for intent extraction and tag generation.
"""

import boto3
import json
import logging
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import threading

logger = logging.getLogger(__name__)


class LLMCache:
    """Thread-safe in-memory cache with TTL for LLM responses."""
    
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._cache: Dict[str, Tuple] = {}
        return cls._instance
    
    def get(self, key: str) -> Optional[Dict]:
        """Get cached value if not expired."""
        normalized_key = key.strip().lower()
        if normalized_key in self._cache:
            value, expiry = self._cache[normalized_key]
            if datetime.now() < expiry:
                return value
            del self._cache[normalized_key]
        return None
    
    def set(self, key: str, value: Dict, ttl_seconds: int) -> None:
        """Cache value with TTL."""
        normalized_key = key.strip().lower()
        expiry = datetime.now() + timedelta(seconds=ttl_seconds)
        self._cache[normalized_key] = (value, expiry)
    
    def clear(self) -> None:
        """Clear all cached values."""
        self._cache.clear()


class ClaudeLLMService:
    """Service for Claude LLM interactions via Bedrock."""
    
    def __init__(self, config: Dict):
        self.config = config
        # Use bedrock_region for Bedrock (us-east-1)
        bedrock_region = config['aws'].get('bedrock_region', config['aws']['region'])
        self.bedrock_client = boto3.client(
            'bedrock-runtime',
            region_name=bedrock_region
        )
        self.intent_cache = LLMCache()
        self.tag_cache = LLMCache()
        
        # Feature 5 config
        self.llm_fallback_config = config.get('llm_fallback', {})
        self.similarity_threshold = self.llm_fallback_config.get('similarity_threshold', 0.3)
        self.intent_model_id = self.llm_fallback_config.get(
            'model_id', 'anthropic.claude-sonnet-4-5-20250929-v1:0'
        )
        self.intent_cache_ttl = self.llm_fallback_config.get('cache_ttl_seconds', 3600)
        
        # Feature 6 config
        self.tags_config = config.get('related_tags', {})
        self.tag_model_id = self.tags_config.get(
            'llm_model_id', 'anthropic.claude-sonnet-4-5-20250929-v1:0'
        )
        self.tag_cache_ttl = self.tags_config.get('cache_ttl_seconds', 1800)
        self.min_tags = self.tags_config.get('min_tags', 3)
        self.max_tags = self.tags_config.get('max_tags', 10)
        
        # Unified catalog values (single source of truth)
        self.catalog = config.get('catalog', {})
    
    def should_trigger_fallback(self, top_score: float) -> bool:
        """Check if LLM fallback should be triggered based on similarity score."""
        if not self.llm_fallback_config.get('enabled', True):
            return False
        return top_score < self.similarity_threshold
    
    def _invoke_claude(self, prompt: str, model_id: str) -> str:
        """Call Claude via Bedrock."""
        try:
            body = json.dumps({
                "anthropic_version": "bedrock-2023-05-31",
                "max_tokens": 1024,
                "messages": [{"role": "user", "content": prompt}]
            })
            
            response = self.bedrock_client.invoke_model(
                modelId=model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']
        except Exception as e:
            logger.error(f"Claude invocation failed: {e}")
            raise
    
    def _extract_json(self, text: str) -> str:
        """Extract JSON from text response."""
        start = text.find('{')
        end = text.rfind('}') + 1
        if start >= 0 and end > start:
            return text[start:end]
        return text

    
    # =========================================================================
    # Feature 5: Intent Extraction
    # =========================================================================
    
    def extract_intents(self, query: str) -> Dict:
        """
        Extract concrete attributes from abstract query using Claude.
        
        Returns:
            Dict with keys: abstract_terms, concrete_attributes, enhanced_query
        """
        # Check cache
        if self.llm_fallback_config.get('cache_enabled', True):
            cached = self.intent_cache.get(query)
            if cached:
                logger.info(f"Intent cache hit for: {query}")
                return cached
        
        # Build catalog context
        catalog_context = self._build_catalog_context()
        
        prompt = f"""You are a furniture search assistant. A user searched for: "{query}"

This query may contain abstract or subjective terms. Extract concrete, searchable product attributes.

{catalog_context}

Analyze the query and respond ONLY with valid JSON (no other text):
{{
    "abstract_terms": ["list of abstract/subjective terms found"],
    "concrete_attributes": {{
        "abstract_term": ["list of concrete attributes it maps to"]
    }},
    "enhanced_query": "reformulated query with concrete terms"
}}

Example for "royal yet modern dining table":
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
        
        try:
            response = self._invoke_claude(prompt, self.intent_model_id)
            json_str = self._extract_json(response)
            result = json.loads(json_str)
            
            # Ensure required fields
            result.setdefault('abstract_terms', [])
            result.setdefault('concrete_attributes', {})
            result.setdefault('enhanced_query', query)
            
            # Cache result
            if self.llm_fallback_config.get('cache_enabled', True):
                self.intent_cache.set(query, result, self.intent_cache_ttl)
            
            logger.info(f"Extracted intents for '{query}': {result['abstract_terms']}")
            return result
            
        except Exception as e:
            logger.error(f"Intent extraction failed: {e}")
            return {
                'abstract_terms': [],
                'concrete_attributes': {},
                'enhanced_query': query
            }
    
    def _build_catalog_context(self) -> str:
        """Build catalog knowledge context for LLM prompt."""
        categories = self.catalog.get('categories', [])[:20]
        materials = self.catalog.get('materials', [])
        styles = self.catalog.get('styles', [])
        colors = self.catalog.get('colors', [])
        
        return f"""Available product attributes in our catalog:
Categories: {', '.join(categories)}
Materials: {', '.join(materials)}
Styles: {', '.join(styles)}
Colors: {', '.join(colors)}

Map abstract terms to these concrete attributes when possible."""

    
    # =========================================================================
    # Feature 6: Related Tags Generation
    # =========================================================================
    
    def generate_related_tags(
        self,
        query: str,
        search_results: List[Dict] = None,
        tag_index_service = None
    ) -> List[Dict]:
        """
        Generate personalized, clickable search tags using two-tier approach.
        
        Tier 1: Pre-computed index (instant, <1ms) - 95% of queries
        Tier 2: LLM generation (1-2s) - 5% of queries
        
        Returns:
            List of tag dicts with keys: tag, type, relevance_score
        """
        if not self.tags_config.get('enabled', True):
            return []
        
        # Tier 1: Try pre-computed tag index first
        if tag_index_service and tag_index_service.has_tags_for_query(query):
            logger.info(f"Using pre-computed tags for: {query}")
            tags = tag_index_service.get_tags_for_query(query, self.max_tags)
            # Tags are already dicts, return as-is
            return tags
        
        # Tier 2: Check cache for LLM-generated tags
        if self.tags_config.get('cache_enabled', True):
            cached = self.tag_cache.get(query)
            if cached:
                logger.info(f"Tag cache hit for: {query}")
                return cached
        
        # Tier 2: Generate with LLM for unique queries
        logger.info(f"Generating tags with LLM for unique query: {query}")
        tags = self._generate_tags_with_llm(query, search_results)
        
        # Cache LLM result
        if self.tags_config.get('cache_enabled', True):
            self.tag_cache.set(query, tags, self.tag_cache_ttl)
        
        # Note: We don't add to pre-computed index dynamically to avoid index bloat
        # The index should be rebuilt periodically with analytics data
        
        return tags
    
    def _generate_tags_with_llm(
        self,
        query: str,
        search_results: List[Dict] = None
    ) -> List[Dict]:
        """
        Generate personalized, clickable search tags.
        
        Returns:
            List of tag dicts with keys: tag, type, relevance_score
        """
        if not self.tags_config.get('enabled', True):
            return []
        
        # Check cache
        if self.tags_config.get('cache_enabled', True):
            cached = self.tag_cache.get(query)
            if cached:
                logger.info(f"Tag cache hit for: {query}")
                return cached
        
        # Build context from search results
        results_context = ""
        if search_results:
            top_names = [r.get('product_name', '') for r in search_results[:5]]
            results_context = f"Top search results: {', '.join(top_names)}"
        
        # Build catalog values context
        catalog_context = self._build_tag_catalog_context()
        
        prompt = f"""You are a furniture search assistant. Generate related search tags for: "{query}"

{results_context}

{catalog_context}

Generate {self.min_tags}-{self.max_tags} personalized, clickable tags to help refine the search.
Tags should be diverse (mix of categories, materials, styles, colors, price ranges).
Tags MUST be from the valid values listed above.

Respond ONLY with valid JSON (no other text):
{{
    "tags": [
        {{"tag": "Tag Name", "type": "category", "relevance": 0.9}},
        {{"tag": "Another Tag", "type": "material", "relevance": 0.8}}
    ]
}}

Valid types: category, price_range, material, style, color
"""
        
        try:
            response = self._invoke_claude(prompt, self.tag_model_id)
            json_str = self._extract_json(response)
            data = json.loads(json_str)
            
            tags = []
            for tag_data in data.get('tags', []):
                tag = {
                    'tag': tag_data.get('tag', ''),
                    'type': tag_data.get('type', 'category'),
                    'relevance_score': tag_data.get('relevance', 0.5)
                }
                # Validate against catalog
                if self._is_valid_tag(tag['tag'], tag['type']):
                    tags.append(tag)
            
            # Ensure within limits
            tags = tags[:self.max_tags]
            
            # Cache result
            if self.tags_config.get('cache_enabled', True):
                self.tag_cache.set(query, tags, self.tag_cache_ttl)
            
            logger.info(f"Generated {len(tags)} tags for '{query}'")
            return tags
            
        except Exception as e:
            logger.error(f"Tag generation failed: {e}")
            return []
    
    def _build_tag_catalog_context(self) -> str:
        """Build catalog values context for tag generation."""
        return f"""Valid tag values (ONLY use these):
Categories: {', '.join(self.catalog.get('categories', [])[:25])}
Materials: {', '.join(self.catalog.get('materials', []))}
Styles: {', '.join(self.catalog.get('styles', []))}
Colors: {', '.join(self.catalog.get('colors', []))}
Price Ranges: {', '.join(self.catalog.get('price_ranges', []))}"""
    
    def _is_valid_tag(self, tag: str, tag_type: str) -> bool:
        """Validate tag against catalog values."""
        type_map = {
            'category': 'categories',
            'price_range': 'price_ranges',
            'material': 'materials',
            'style': 'styles',
            'color': 'colors'
        }
        
        catalog_key = type_map.get(tag_type, 'categories')
        valid_values = self.catalog.get(catalog_key, [])
        
        # Case-insensitive comparison
        return tag.lower() in [v.lower() for v in valid_values]
