#!/usr/bin/env python3
"""
Demo script for Search Query Service
Demonstrates the core search functionality with in-memory mock data
"""
import json
from typing import List, Dict
from dataclasses import dataclass, field
from enum import Enum


# ============================================================================
# VALUE OBJECTS
# ============================================================================

class SearchMode(Enum):
    KNN = "knn"
    BM25 = "bm25"
    HYBRID = "hybrid"


class TagType(Enum):
    """Feature 6: Tag types"""
    CATEGORY = "category"
    PRICE_RANGE = "price_range"
    MATERIAL = "material"
    STYLE = "style"
    COLOR = "color"


@dataclass
class SearchTag:
    """Feature 6: A clickable search tag"""
    tag: str
    tag_type: TagType
    relevance_score: float = 0.5
    
    def to_dict(self) -> dict:
        return {
            "tag": self.tag,
            "type": self.tag_type.value,
            "relevance_score": round(self.relevance_score, 2)
        }


@dataclass
class SearchFilters:
    """Search filters extracted from query"""
    price_max: float = None
    price_min: float = None
    colors: List[str] = field(default_factory=list)
    materials: List[str] = field(default_factory=list)
    categories: List[str] = field(default_factory=list)
    
    def is_empty(self) -> bool:
        return (self.price_max is None and self.price_min is None and
                not self.colors and not self.materials and not self.categories)


@dataclass
class ProductMatch:
    """A product match with score"""
    variant_id: str
    product_name: str
    description: str
    price: float
    currency: str
    image_url: str
    score: float
    rank: int
    
    def to_dict(self) -> dict:
        return {
            "variant_id": self.variant_id,
            "product_name": self.product_name,
            "description": self.description,
            "price": self.price,
            "currency": self.currency,
            "image_url": self.image_url,
            "score": round(self.score, 4),
            "rank": self.rank
        }


# ============================================================================
# MOCK DATA (In-memory product database)
# ============================================================================

MOCK_PRODUCTS = [
    {
        "variant_id": "147",
        "product_name": "Peri Coffee Table",
        "description": "Peri's rounded yet rectangular form harks back to mid-century aesthetics while its walnut veneer exudes sleek sophistication.",
        "price": 549.0,
        "currency": "SGD",
        "color": "brown",
        "material": "wood",
        "category": "table",
        "image_url": "https://res.cloudinary.com/castlery/image/private/Peri-Coffee-Table-Front.png"
    },
    {
        "variant_id": "148",
        "product_name": "Andre Coffee Table",
        "description": "More than meets the eye, Andre marries architectural elegance and rotatable storage functionality in perfect harmony.",
        "price": 549.0,
        "currency": "SGD",
        "color": "brown",
        "material": "wood",
        "category": "table",
        "image_url": "https://res.cloudinary.com/castlery/image/private/Andre-Coffee-Table-Front.png"
    },
    {
        "variant_id": "7544",
        "product_name": "Adams 2 Seater Sofa",
        "description": "Adams is a timeless piece that boasts of sleek, customisable legs. Its modern, tailored silhouette will sit well in any home.",
        "price": 999.0,
        "currency": "SGD",
        "color": "grey",
        "material": "fabric",
        "category": "sofa",
        "image_url": "https://res.cloudinary.com/castlery/image/private/Adams-2-Seater-Sofa-Front.png"
    },
    {
        "variant_id": "493",
        "product_name": "Seb King Size Bed",
        "description": "Durable solid acacia wood and a padded headboard—Seb is designed to last through countless late-night scrolls and slow mornings.",
        "price": 1099.0,
        "currency": "SGD",
        "color": "brown",
        "material": "wood",
        "category": "bed",
        "image_url": "https://res.cloudinary.com/castlery/image/private/Seb-King-Bed-Front.png"
    },
    {
        "variant_id": "25329",
        "product_name": "Madison Armchair",
        "description": "Biscuit tufting that stays firm and holds its shape, with Performance fabric that stands up to spills.",
        "price": 649.0,
        "currency": "SGD",
        "color": "grey",
        "material": "fabric",
        "category": "chair",
        "image_url": "https://res.cloudinary.com/castlery/image/private/Madison-Armchair-Front.png"
    }
]


# ============================================================================
# SERVICES
# ============================================================================

class FilterExtractionService:
    """Extract filters from natural language queries"""
    
    def extract_filters(self, query: str) -> SearchFilters:
        """Extract filters from query text"""
        query_lower = query.lower()
        filters = SearchFilters()
        
        # Extract price
        if "under" in query_lower or "below" in query_lower:
            import re
            match = re.search(r'(?:under|below)\s*\$?(\d+)', query_lower)
            if match:
                filters.price_max = float(match.group(1))
        
        # Extract colors
        if "grey" in query_lower or "gray" in query_lower:
            filters.colors.append("grey")
        if "brown" in query_lower:
            filters.colors.append("brown")
        
        # Extract materials
        if "wood" in query_lower or "wooden" in query_lower:
            filters.materials.append("wood")
        if "fabric" in query_lower:
            filters.materials.append("fabric")
        
        # Extract categories
        if "sofa" in query_lower or "couch" in query_lower:
            filters.categories.append("sofa")
        if "table" in query_lower:
            filters.categories.append("table")
        if "chair" in query_lower:
            filters.categories.append("chair")
        if "bed" in query_lower:
            filters.categories.append("bed")
        
        return filters


class MockSearchService:
    """Mock search service using simple keyword matching"""
    
    # Feature 5: Intent mappings for abstract terms
    INTENT_MAPPINGS = {
        "royal": ["ornate", "elegant", "traditional", "gold", "luxurious"],
        "modern": ["clean lines", "minimalist", "contemporary", "sleek"],
        "cozy": ["soft", "comfortable", "plush", "warm"],
        "rustic": ["wood", "natural", "farmhouse", "handcrafted"],
        "minimalist": ["simple", "clean", "neutral", "sleek"]
    }
    
    # Feature 6: Valid catalog values for tags
    CATALOG_VALUES = {
        "categories": ["Sofas", "Tables", "Chairs", "Beds", "Coffee Tables", "Armchairs"],
        "materials": ["Wood", "Fabric", "Leather", "Metal"],
        "styles": ["Modern", "Traditional", "Minimalist", "Mid-Century"],
        "colors": ["Grey", "Brown", "White", "Black"],
        "price_ranges": ["Under $500", "Under $1,000", "$500-$1,000", "Over $1,000"]
    }
    
    def __init__(self):
        self.filter_service = FilterExtractionService()
        self.similarity_threshold = 0.5  # Feature 5: Fallback threshold (raised for demo)
    
    def search_text(self, query: str, max_results: int = 50) -> tuple:
        """
        Perform text search with filter extraction.
        Returns (matches, top_score, llm_fallback_used, enhanced_query)
        """
        # Extract filters
        filters = self.filter_service.extract_filters(query)
        
        # Filter products
        filtered_products = self._apply_filters(MOCK_PRODUCTS, filters)
        
        # Score products based on keyword matching
        scored_products = self._score_products(filtered_products, query)
        
        # Sort by score and limit results
        scored_products.sort(key=lambda x: x.score, reverse=True)
        
        # Get top score for fallback decision
        top_score = scored_products[0].score if scored_products else 0.0
        
        # Feature 5: LLM Fallback for low-quality results
        llm_fallback_used = False
        enhanced_query = None
        
        if top_score < self.similarity_threshold:
            # Extract intents from abstract query
            intents = self._extract_intents(query)
            if intents.get('enhanced_query') != query:
                enhanced_query = intents['enhanced_query']
                llm_fallback_used = True
                
                # Re-search with enhanced query
                enhanced_filters = self.filter_service.extract_filters(enhanced_query)
                filtered_products = self._apply_filters(MOCK_PRODUCTS, enhanced_filters)
                scored_products = self._score_products(filtered_products, enhanced_query)
                scored_products.sort(key=lambda x: x.score, reverse=True)
        
        results = scored_products[:max_results]
        
        # Assign ranks
        for i, match in enumerate(results, 1):
            match.rank = i
        
        return results, top_score, llm_fallback_used, enhanced_query
    
    def _extract_intents(self, query: str) -> dict:
        """Feature 5: Extract concrete attributes from abstract query (mock LLM)"""
        query_lower = query.lower()
        abstract_terms = []
        concrete_attributes = {}
        
        for term, attributes in self.INTENT_MAPPINGS.items():
            if term in query_lower:
                abstract_terms.append(term)
                concrete_attributes[term] = attributes
        
        # Build enhanced query
        if abstract_terms:
            enhanced_parts = [query]
            for term in abstract_terms:
                enhanced_parts.extend(self.INTENT_MAPPINGS[term][:2])
            enhanced_query = " ".join(enhanced_parts)
        else:
            enhanced_query = query
        
        return {
            "abstract_terms": abstract_terms,
            "concrete_attributes": concrete_attributes,
            "enhanced_query": enhanced_query
        }
    
    def generate_related_tags(self, query: str, results: List[ProductMatch]) -> List[SearchTag]:
        """Feature 6: Generate personalized search tags"""
        tags = []
        query_lower = query.lower()
        
        # Generate category tags based on query
        if "chair" in query_lower:
            tags.append(SearchTag("Armchairs", TagType.CATEGORY, 0.9))
            tags.append(SearchTag("Dining Chairs", TagType.CATEGORY, 0.8))
        if "sofa" in query_lower:
            tags.append(SearchTag("Sectionals", TagType.CATEGORY, 0.85))
        if "table" in query_lower:
            tags.append(SearchTag("Coffee Tables", TagType.CATEGORY, 0.9))
            tags.append(SearchTag("Dining Tables", TagType.CATEGORY, 0.8))
        
        # Add material tags
        if "leather" not in query_lower:
            tags.append(SearchTag("Leather", TagType.MATERIAL, 0.7))
        if "wood" not in query_lower:
            tags.append(SearchTag("Wood", TagType.MATERIAL, 0.65))
        
        # Add style tags
        tags.append(SearchTag("Modern", TagType.STYLE, 0.6))
        tags.append(SearchTag("Mid-Century", TagType.STYLE, 0.55))
        
        # Add price range tags
        tags.append(SearchTag("Under $1,000", TagType.PRICE_RANGE, 0.5))
        
        # Limit to max 10 tags
        return tags[:10]
    
    def _apply_filters(self, products: List[Dict], filters: SearchFilters) -> List[Dict]:
        """Apply filters to products"""
        filtered = products
        
        if filters.price_max:
            filtered = [p for p in filtered if p["price"] <= filters.price_max]
        
        if filters.price_min:
            filtered = [p for p in filtered if p["price"] >= filters.price_min]
        
        if filters.colors:
            filtered = [p for p in filtered if p["color"] in filters.colors]
        
        if filters.materials:
            filtered = [p for p in filtered if p["material"] in filters.materials]
        
        if filters.categories:
            filtered = [p for p in filtered if p["category"] in filters.categories]
        
        return filtered
    
    def _score_products(self, products: List[Dict], query: str) -> List[ProductMatch]:
        """Score products based on keyword matching"""
        query_lower = query.lower()
        query_words = set(query_lower.split())
        
        matches = []
        for product in products:
            # Calculate simple relevance score
            text = f"{product['product_name']} {product['description']}".lower()
            text_words = set(text.split())
            
            # Count matching words
            matching_words = query_words.intersection(text_words)
            score = len(matching_words) / len(query_words) if query_words else 0.0
            
            # Boost if product name matches
            if any(word in product['product_name'].lower() for word in query_words):
                score += 0.5
            
            match = ProductMatch(
                variant_id=product["variant_id"],
                product_name=product["product_name"],
                description=product["description"],
                price=product["price"],
                currency=product["currency"],
                image_url=product["image_url"],
                score=min(score, 1.0),  # Cap at 1.0
                rank=0  # Will be assigned later
            )
            matches.append(match)
        
        return matches


# ============================================================================
# API FUNCTIONS
# ============================================================================

def get_text_results(user_search_string: str) -> Dict:
    """
    Main API function for text search.
    Includes Feature 5 (LLM Fallback) and Feature 6 (Related Tags).
    
    Args:
        user_search_string: Natural language search query
        
    Returns:
        Dict containing search results in JSON format
    """
    try:
        # Validate input
        if not user_search_string or not user_search_string.strip():
            return {
                "status": "error",
                "error_code": "EMPTY_QUERY",
                "message": "empty search query"
            }
        
        # Perform search
        search_service = MockSearchService()
        matches, top_score, llm_fallback_used, enhanced_query = search_service.search_text(user_search_string)
        
        # Check if no results
        if not matches:
            return {
                "status": "error",
                "error_code": "NO_RESULTS",
                "message": "no results found for query",
                "llm_fallback_used": llm_fallback_used,
                "enhanced_query": enhanced_query
            }
        
        # Feature 6: Generate related tags
        related_tags = search_service.generate_related_tags(user_search_string, matches)
        
        # Return success response
        return {
            "status": "success",
            "total_results": len(matches),
            "results": [match.to_dict() for match in matches],
            "related_tags": [tag.to_dict() for tag in related_tags],  # Feature 6
            "search_metadata": {
                "query": user_search_string,
                "search_mode": "mock_keyword_matching",
                "filters_applied": {},
                "llm_fallback_used": llm_fallback_used,  # Feature 5
                "enhanced_query": enhanced_query  # Feature 5
            }
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error_code": "SEARCH_FAILED",
            "message": str(e)
        }


def get_image_match_result(image_base64: str) -> Dict:
    """
    Main API function for image similarity search.
    (Mock implementation - returns sample results)
    
    Args:
        image_base64: Base64 encoded image
        
    Returns:
        Dict containing search results
    """
    try:
        # Validate image format (basic check)
        if not image_base64:
            return {
                "status": "error",
                "error_code": "INVALID_IMAGE",
                "message": "invalid uploaded image format"
            }
        
        # Mock: Return first 3 products as "similar"
        matches = []
        for i, product in enumerate(MOCK_PRODUCTS[:3], 1):
            match = ProductMatch(
                variant_id=product["variant_id"],
                product_name=product["product_name"],
                description=product["description"],
                price=product["price"],
                currency=product["currency"],
                image_url=product["image_url"],
                score=0.9 - (i * 0.1),  # Mock similarity scores
                rank=i
            )
            matches.append(match)
        
        return {
            "status": "success",
            "total_results": len(matches),
            "results": [match.to_dict() for match in matches],
            "search_metadata": {
                "search_mode": "mock_image_similarity",
                "filters_applied": {}
            }
        }
        
    except Exception as e:
        return {
            "status": "error",
            "error_code": "SEARCH_FAILED",
            "message": str(e)
        }


# ============================================================================
# DEMO MAIN
# ============================================================================

def main():
    """Run demo searches"""
    print("=" * 80)
    print("SEARCH QUERY SERVICE - DEMO")
    print("Includes Feature 5 (LLM Fallback) and Feature 6 (Related Tags)")
    print("=" * 80)
    print()
    
    # Test 1: Simple text search
    print("Test 1: Simple text search")
    print("-" * 80)
    query1 = "sofa"
    print(f"Query: '{query1}'")
    result1 = get_text_results(query1)
    print(json.dumps(result1, indent=2))
    print()
    
    # Test 2: Text search with filters
    print("Test 2: Text search with filters")
    print("-" * 80)
    query2 = "grey sofa under $1000"
    print(f"Query: '{query2}'")
    result2 = get_text_results(query2)
    print(json.dumps(result2, indent=2))
    print()
    
    # Test 3: Empty query error
    print("Test 3: Empty query error")
    print("-" * 80)
    query3 = ""
    print(f"Query: '{query3}'")
    result3 = get_text_results(query3)
    print(json.dumps(result3, indent=2))
    print()
    
    # Test 4: Feature 5 - LLM Fallback with abstract query
    print("Test 4: Feature 5 - LLM Fallback (abstract query)")
    print("-" * 80)
    query4 = "royal yet modern dining table"
    print(f"Query: '{query4}'")
    result4 = get_text_results(query4)
    print(json.dumps(result4, indent=2))
    print()
    
    # Test 5: Feature 6 - Related Tags
    print("Test 5: Feature 6 - Related Tags")
    print("-" * 80)
    query5 = "grey chair"  # Changed to match mock data
    print(f"Query: '{query5}'")
    result5 = get_text_results(query5)
    if result5['status'] == 'success':
        print(f"Results: {result5['total_results']}")
        print(f"Related Tags: {[t['tag'] for t in result5.get('related_tags', [])]}")
    else:
        print(f"Status: {result5['status']}, Message: {result5.get('message')}")
    print()
    
    # Test 6: Image search (mock)
    print("Test 6: Image search (mock)")
    print("-" * 80)
    print("Image: <base64_encoded_image>")
    result6 = get_image_match_result("mock_base64_data")
    print(json.dumps(result6, indent=2))
    print()
    
    # Test 7: Feature 5 - Another abstract query
    print("Test 7: Feature 5 - Cozy furniture query")
    print("-" * 80)
    query7 = "cozy minimalist sofa"
    print(f"Query: '{query7}'")
    result7 = get_text_results(query7)
    metadata = result7.get('search_metadata', {})
    print(f"LLM Fallback Used: {metadata.get('llm_fallback_used', False)}")
    print(f"Enhanced Query: {metadata.get('enhanced_query')}")
    print(f"Results: {result7.get('total_results', 0)}")
    print()
    
    print("=" * 80)
    print("DEMO COMPLETE")
    print("=" * 80)


if __name__ == "__main__":
    main()
