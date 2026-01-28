# Logical Design: Search Query Service

## Overview
This document provides the logical design for implementing the Search Query Service based on the Domain-Driven Design domain model. It defines the software architecture, module structure, class designs, and implementation patterns.

---

## Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Application Layer                            │
│  - API Endpoints (get_text_results, get_image_match_result)     │
│  - Request/Response DTOs                                         │
│  - Application Services (orchestration)                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Domain Layer                                │
│  - Aggregates (SearchQuery, SearchResult)                        │
│  - Value Objects                                                 │
│  - Domain Services                                               │
│  - Domain Events                                                 │
│  - Policies                                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Infrastructure Layer                           │
│  - OpenSearch Client                                             │
│  - Bedrock Client                                                │
│  - Repositories (implementations)                                │
│  - Adapters                                                      │
│  - Configuration                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Module Structure

```
search_query_service/
├── __init__.py
├── api/
│   ├── __init__.py
│   ├── search_api.py              # Main API functions
│   └── dtos.py                    # Request/Response DTOs
├── application/
│   ├── __init__.py
│   ├── text_search_service.py    # Text search orchestration
│   ├── image_search_service.py   # Image search orchestration
│   └── exceptions.py              # Application exceptions
├── domain/
│   ├── __init__.py
│   ├── aggregates/
│   │   ├── __init__.py
│   │   ├── search_query.py
│   │   └── search_result.py
│   ├── value_objects/
│   │   ├── __init__.py
│   │   ├── query_types.py
│   │   ├── filters.py
│   │   ├── scores.py
│   │   ├── product_data.py
│   │   ├── intents.py             # NEW - Feature 5: ExtractedIntents, CatalogKnowledge
│   │   └── tags.py                # NEW - Feature 6: SearchTag, TagType, CatalogValues
│   ├── services/
│   │   ├── __init__.py
│   │   ├── filter_extraction_service.py
│   │   ├── embedding_service.py
│   │   ├── search_strategy_service.py
│   │   ├── rrf_service.py
│   │   ├── ranking_service.py
│   │   ├── intent_extraction_service.py  # NEW - Feature 5
│   │   ├── related_tags_service.py       # NEW - Feature 6
│   │   └── tag_refinement_service.py     # NEW - Feature 6
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── opensearch_repository.py  # Interface
│   │   ├── search_result_repository.py  # Interface
│   │   ├── llm_response_cache.py     # NEW - Feature 5
│   │   ├── tag_cache.py              # NEW - Feature 6
│   │   └── catalog_tag_repository.py # NEW - Feature 6
│   ├── events/
│   │   ├── __init__.py
│   │   └── search_events.py
│   └── policies/
│       ├── __init__.py
│       ├── search_policies.py
│       ├── llm_fallback_policy.py    # NEW - Feature 5
│       └── tag_generation_policy.py  # NEW - Feature 6
├── infrastructure/
│   ├── __init__.py
│   ├── opensearch/
│   │   ├── __init__.py
│   │   ├── opensearch_client.py
│   │   ├── opensearch_repository_impl.py
│   │   └── query_builder.py
│   ├── bedrock/
│   │   ├── __init__.py
│   │   ├── bedrock_client.py
│   │   ├── embedding_service_impl.py
│   │   └── claude_llm_adapter.py     # NEW - Feature 5 & 6
│   ├── cache/
│   │   ├── __init__.py
│   │   ├── result_cache.py
│   │   ├── llm_cache_impl.py         # NEW - Feature 5
│   │   └── tag_cache_impl.py         # NEW - Feature 6
│   └── config/
│       ├── __init__.py
│       └── config_loader.py
└── utils/
    ├── __init__.py
    ├── logger.py
    └── validators.py
```

---

## Detailed Class Designs


### 1. API Layer

#### search_api.py
Main entry points for the search service.

```python
from typing import Dict
from application.text_search_service import TextSearchService
from application.image_search_service import ImageSearchService
from application.exceptions import EmptyQueryError, InvalidImageError
from utils.logger import get_logger

logger = get_logger(__name__)

def get_text_results(user_search_string: str) -> Dict:
    """
    Main API function for text search.
    
    Args:
        user_search_string: Natural language search query
        
    Returns:
        Dict containing search results in JSON format
        
    Raises:
        ValueError: If query is empty
    """
    try:
        if not user_search_string or not user_search_string.strip():
            return {
                "status": "error",
                "error_code": "EMPTY_QUERY",
                "message": "empty search query"
            }
        
        service = TextSearchService()
        result = service.execute(user_search_string)
        
        return {
            "status": "success",
            "total_results": result.total_count,
            "results": result.to_json()["results"],
            "search_metadata": result.to_json()["search_metadata"]
        }
        
    except Exception as e:
        logger.error(f"Text search failed: {str(e)}")
        return {
            "status": "error",
            "error_code": "SEARCH_FAILED",
            "message": str(e)
        }

def get_image_match_result(image_base64: str) -> Dict:
    """
    Main API function for image similarity search.
    
    Args:
        image_base64: Base64 encoded image (JPG or PNG)
        
    Returns:
        Dict containing search results in JSON format
        
    Raises:
        ValueError: If image format is invalid
    """
    try:
        service = ImageSearchService()
        result = service.execute(image_base64)
        
        return {
            "status": "success",
            "total_results": result.total_count,
            "results": result.to_json()["results"],
            "search_metadata": result.to_json()["search_metadata"]
        }
        
    except InvalidImageError as e:
        return {
            "status": "error",
            "error_code": "INVALID_IMAGE",
            "message": "invalid uploaded image format"
        }
    except Exception as e:
        logger.error(f"Image search failed: {str(e)}")
        return {
            "status": "error",
            "error_code": "SEARCH_FAILED",
            "message": str(e)
        }
```

---

### 2. Application Layer

#### text_search_service.py
Orchestrates text search workflow.

```python
from domain.aggregates.search_query import SearchQuery
from domain.aggregates.search_result import SearchResult
from domain.value_objects.query_types import QueryText, SearchMode
from domain.services.filter_extraction_service import FilterExtractionService
from domain.services.embedding_service import EmbeddingService
from domain.services.search_strategy_service import SearchStrategyService
from domain.policies.search_policies import SearchTimeoutPolicy, ResultLimitPolicy
from infrastructure.config.config_loader import Config
import time

class TextSearchService:
    def __init__(self):
        self.filter_service = FilterExtractionService()
        self.embedding_service = EmbeddingService()
        self.search_service = SearchStrategyService()
        self.timeout_policy = SearchTimeoutPolicy()
        self.result_limit_policy = ResultLimitPolicy()
        self.config = Config.get_search_query_config()
    
    def execute(self, query_string: str) -> SearchResult:
        """Execute text search workflow"""
        start_time = time.time()
        
        # 1. Create domain query
        query_text = QueryText(query_string)
        
        # 2. Extract filters
        filters = self.filter_service.extract_filters(query_text)
        
        # 3. Generate embedding
        embedding = self.embedding_service.embed_text(query_text)
        
        # 4. Create SearchQuery aggregate
        search_query = SearchQuery.create_text_query(
            query_text=query_text,
            embedding=embedding,
            filters=filters,
            search_mode=SearchMode(self.config['default_search_mode'])
        )
        
        # 5. Execute search strategy
        matches = self.search_service.search(search_query)
        
        # 6. Apply policies
        matches = self.result_limit_policy.enforce(matches)
        
        # 7. Create SearchResult aggregate
        response_time = int((time.time() - start_time) * 1000)
        result = SearchResult.create(
            query=search_query,
            matches=matches,
            response_time_ms=response_time
        )
        
        return result
```

#### image_search_service.py
Orchestrates image search workflow.

```python
from domain.aggregates.search_query import SearchQuery
from domain.aggregates.search_result import SearchResult
from domain.value_objects.query_types import QueryImage, SearchMode
from domain.services.embedding_service import EmbeddingService
from domain.services.search_strategy_service import SearchStrategyService
from domain.policies.search_policies import ResultLimitPolicy
import time

class ImageSearchService:
    def __init__(self):
        self.embedding_service = EmbeddingService()
        self.search_service = SearchStrategyService()
        self.result_limit_policy = ResultLimitPolicy()
        self.config = Config.get_search_query_config()
    
    def execute(self, image_base64: str) -> SearchResult:
        """Execute image search workflow"""
        start_time = time.time()
        
        # 1. Create domain query image
        query_image = QueryImage(image_base64)
        query_image.validate()  # Validates format
        
        # 2. Generate embedding
        embedding = self.embedding_service.embed_image(query_image)
        
        # 3. Create SearchQuery aggregate
        search_query = SearchQuery.create_image_query(
            query_image=query_image,
            embedding=embedding,
            search_mode=SearchMode.KNN  # Image search always uses KNN
        )
        
        # 4. Execute KNN search
        matches = self.search_service.search(search_query)
        
        # 5. Apply policies
        matches = self.result_limit_policy.enforce(matches)
        
        # 6. Create SearchResult aggregate
        response_time = int((time.time() - start_time) * 1000)
        result = SearchResult.create(
            query=search_query,
            matches=matches,
            response_time_ms=response_time
        )
        
        return result
```

---

### 3. Domain Layer - Aggregates

#### search_query.py

```python
from dataclasses import dataclass
from typing import Optional, Union
from datetime import datetime
import uuid
from domain.value_objects.query_types import (
    QueryText, QueryImage, QueryEmbedding, SearchMode, QueryType
)
from domain.value_objects.filters import SearchFilters

@dataclass
class SearchQuery:
    """Aggregate Root for search queries"""
    
    query_id: str
    query_type: QueryType
    query_content: Union[QueryText, QueryImage]
    query_embedding: QueryEmbedding
    filters: SearchFilters
    search_mode: SearchMode
    created_at: datetime
    
    @classmethod
    def create_text_query(
        cls,
        query_text: QueryText,
        embedding: QueryEmbedding,
        filters: SearchFilters,
        search_mode: SearchMode
    ) -> 'SearchQuery':
        """Factory method for text queries"""
        return cls(
            query_id=str(uuid.uuid4()),
            query_type=QueryType.TEXT,
            query_content=query_text,
            query_embedding=embedding,
            filters=filters,
            search_mode=search_mode,
            created_at=datetime.now()
        )
    
    @classmethod
    def create_image_query(
        cls,
        query_image: QueryImage,
        embedding: QueryEmbedding,
        search_mode: SearchMode = SearchMode.KNN
    ) -> 'SearchQuery':
        """Factory method for image queries"""
        return cls(
            query_id=str(uuid.uuid4()),
            query_type=QueryType.IMAGE,
            query_content=query_image,
            query_embedding=embedding,
            filters=SearchFilters.empty(),
            search_mode=search_mode,
            created_at=datetime.now()
        )
    
    def validate(self) -> bool:
        """Validate query invariants"""
        if self.query_type == QueryType.TEXT:
            assert isinstance(self.query_content, QueryText)
        elif self.query_type == QueryType.IMAGE:
            assert isinstance(self.query_content, QueryImage)
        
        self.query_content.validate()
        self.query_embedding.validate()
        self.filters.validate()
        
        return True
```

#### search_result.py

```python
from dataclasses import dataclass, field
from typing import List
from domain.aggregates.search_query import SearchQuery
from domain.value_objects.product_data import ProductMatch
from domain.value_objects.scores import SearchMetadata

@dataclass
class SearchResult:
    """Aggregate Root for search results"""
    
    search_id: str
    query: SearchQuery
    matches: List[ProductMatch] = field(default_factory=list)
    total_count: int = 0
    search_metadata: SearchMetadata = None
    response_time_ms: int = 0
    
    @classmethod
    def create(
        cls,
        query: SearchQuery,
        matches: List[ProductMatch],
        response_time_ms: int
    ) -> 'SearchResult':
        """Factory method for search results"""
        import uuid
        
        # Rank matches
        ranked_matches = cls._rank_matches(matches)
        
        # Create metadata
        metadata = SearchMetadata(
            query_text=query.query_content.value if query.query_type == QueryType.TEXT else None,
            search_mode=query.search_mode,
            filters_applied=query.filters,
            response_time_ms=response_time_ms,
            total_results=len(ranked_matches)
        )
        
        return cls(
            search_id=str(uuid.uuid4()),
            query=query,
            matches=ranked_matches,
            total_count=len(ranked_matches),
            search_metadata=metadata,
            response_time_ms=response_time_ms
        )
    
    @staticmethod
    def _rank_matches(matches: List[ProductMatch]) -> List[ProductMatch]:
        """Rank matches by score"""
        sorted_matches = sorted(matches, key=lambda m: m.score.value, reverse=True)
        for i, match in enumerate(sorted_matches, 1):
            match.rank.position = i
        return sorted_matches
    
    def to_json(self) -> dict:
        """Convert to JSON response format"""
        return {
            "results": [match.to_dict() for match in self.matches],
            "search_metadata": self.search_metadata.to_dict()
        }
```

---

### 4. Domain Layer - Value Objects

#### query_types.py

```python
from dataclasses import dataclass
from typing import List
from enum import Enum
import base64

class QueryType(Enum):
    TEXT = "text"
    IMAGE = "image"

class SearchMode(Enum):
    KNN = "knn"
    BM25 = "bm25"
    HYBRID = "hybrid"

@dataclass(frozen=True)
class QueryText:
    """Value object for text queries"""
    value: str
    
    def validate(self):
        if not self.value or not self.value.strip():
            raise ValueError("Query text cannot be empty")
        if len(self.value) > 1000:
            raise ValueError("Query text too long (max 1000 chars)")
    
    def normalize(self) -> str:
        return self.value.strip().lower()

@dataclass(frozen=True)
class QueryImage:
    """Value object for image queries"""
    base64_data: str
    
    def validate(self):
        try:
            decoded = base64.b64decode(self.base64_data)
            # Check format (JPG/PNG magic bytes)
            if not (decoded.startswith(b'\xff\xd8\xff') or  # JPG
                    decoded.startswith(b'\x89PNG')):  # PNG
                raise ValueError("Invalid image format")
            
            # Check size
            if len(decoded) > 5 * 1024 * 1024:  # 5MB
                raise ValueError("Image too large")
        except Exception as e:
            raise ValueError(f"Invalid image: {str(e)}")
    
    def decode(self) -> bytes:
        return base64.b64decode(self.base64_data)

@dataclass(frozen=True)
class QueryEmbedding:
    """Value object for embeddings"""
    vector: List[float]
    dimension: int
    model: str
    
    def validate(self):
        if len(self.vector) != self.dimension:
            raise ValueError(f"Vector length {len(self.vector)} != dimension {self.dimension}")
        if not all(isinstance(v, (int, float)) for v in self.vector):
            raise ValueError("All vector values must be numeric")
    
    def to_list(self) -> List[float]:
        return list(self.vector)
```


#### filters.py

```python
from dataclasses import dataclass, field
from typing import Optional, List

@dataclass
class PriceRange:
    """Value object for price ranges"""
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    currency: str = "SGD"
    
    def validate(self):
        if self.min_price is not None and self.min_price < 0:
            raise ValueError("Min price cannot be negative")
        if self.max_price is not None and self.max_price < 0:
            raise ValueError("Max price cannot be negative")
        if (self.min_price is not None and self.max_price is not None and
            self.min_price > self.max_price):
            raise ValueError("Min price cannot exceed max price")
    
    def contains(self, price: float) -> bool:
        if self.min_price is not None and price < self.min_price:
            return False
        if self.max_price is not None and price > self.max_price:
            return False
        return True

@dataclass
class SearchFilters:
    """Value object for search filters"""
    price_range: Optional[PriceRange] = None
    colors: List[str] = field(default_factory=list)
    materials: List[str] = field(default_factory=list)
    sizes: List[str] = field(default_factory=list)
    categories: List[str] = field(default_factory=list)
    dimensions: Optional[str] = None
    in_stock_only: bool = False
    
    @classmethod
    def empty(cls) -> 'SearchFilters':
        return cls()
    
    def is_empty(self) -> bool:
        return (self.price_range is None and
                not self.colors and
                not self.materials and
                not self.sizes and
                not self.categories and
                self.dimensions is None and
                not self.in_stock_only)
    
    def validate(self):
        if self.price_range:
            self.price_range.validate()
    
    def to_opensearch_filter(self) -> dict:
        """Convert to OpenSearch filter format"""
        filters = []
        
        if self.price_range:
            if self.price_range.min_price is not None:
                filters.append({"range": {"price": {"gte": self.price_range.min_price}}})
            if self.price_range.max_price is not None:
                filters.append({"range": {"price": {"lte": self.price_range.max_price}}})
        
        if self.colors:
            filters.append({"terms": {"color": self.colors}})
        
        if self.materials:
            filters.append({"terms": {"material": self.materials}})
        
        if self.sizes:
            filters.append({"terms": {"size": self.sizes}})
        
        if self.categories:
            filters.append({"terms": {"categories.frontend_category": self.categories}})
        
        if self.in_stock_only:
            filters.append({"term": {"is_in_stock": True}})
        
        return {"bool": {"must": filters}} if filters else {}
```

#### scores.py

```python
from dataclasses import dataclass
from enum import Enum

class ScoreType(Enum):
    SIMILARITY = "similarity"
    BM25 = "bm25"
    RRF = "rrf"

@dataclass
class Score:
    """Value object for scores"""
    value: float
    score_type: ScoreType
    
    def normalize(self) -> float:
        """Normalize score to 0-1 range"""
        return max(0.0, min(1.0, self.value))
    
    def __lt__(self, other: 'Score') -> bool:
        return self.value < other.value
    
    def __gt__(self, other: 'Score') -> bool:
        return self.value > other.value
    
    def __eq__(self, other: 'Score') -> bool:
        return abs(self.value - other.value) < 1e-6

@dataclass
class Rank:
    """Value object for rank positions"""
    position: int
    
    def __post_init__(self):
        if self.position < 1:
            raise ValueError("Rank position must be >= 1")
    
    def __lt__(self, other: 'Rank') -> bool:
        return self.position < other.position

@dataclass
class SearchMetadata:
    """Value object for search metadata"""
    query_text: Optional[str]
    search_mode: SearchMode
    filters_applied: SearchFilters
    response_time_ms: int
    total_results: int
    
    def to_dict(self) -> dict:
        return {
            "query": self.query_text,
            "search_mode": self.search_mode.value,
            "filters_applied": self._filters_to_dict(),
            "response_time_ms": self.response_time_ms
        }
    
    def _filters_to_dict(self) -> dict:
        if self.filters_applied.is_empty():
            return {}
        
        result = {}
        if self.filters_applied.price_range:
            result["price"] = {
                "min": self.filters_applied.price_range.min_price,
                "max": self.filters_applied.price_range.max_price
            }
        if self.filters_applied.colors:
            result["colors"] = self.filters_applied.colors
        if self.filters_applied.materials:
            result["materials"] = self.filters_applied.materials
        if self.filters_applied.sizes:
            result["sizes"] = self.filters_applied.sizes
        if self.filters_applied.categories:
            result["categories"] = self.filters_applied.categories
        
        return result
```

#### product_data.py

```python
from dataclasses import dataclass, field
from typing import List, Optional, Dict
from domain.value_objects.scores import Score, Rank

@dataclass
class ImageData:
    """Value object for image data"""
    url: str
    type: str
    position: int
    is_default: bool

@dataclass
class ProductData:
    """Value object for product data"""
    variant_id: str
    product_id: str
    variant_name: str
    product_name: str
    description: str
    price: float
    currency: str
    images: List[ImageData] = field(default_factory=list)
    categories: Dict = field(default_factory=dict)
    properties: Dict = field(default_factory=dict)
    options: Dict = field(default_factory=dict)
    review_rating: Optional[float] = None
    review_count: Optional[int] = None
    is_in_stock: bool = True
    metadata: Dict = field(default_factory=dict)
    
    def to_dict(self) -> dict:
        return {
            "variant_id": self.variant_id,
            "product_id": self.product_id,
            "variant_name": self.variant_name,
            "product_name": self.product_name,
            "description": self.description,
            "price": self.price,
            "currency": self.currency,
            "images": [
                {
                    "url": img.url,
                    "type": img.type,
                    "position": img.position,
                    "is_default": img.is_default
                }
                for img in self.images
            ],
            "categories": self.categories,
            "properties": self.properties,
            "options": self.options,
            "review_rating": self.review_rating,
            "review_count": self.review_count,
            "is_in_stock": self.is_in_stock,
            **self.metadata
        }
    
    def get_primary_image(self) -> Optional[ImageData]:
        """Get the default/primary image"""
        for img in self.images:
            if img.is_default:
                return img
        return self.images[0] if self.images else None

@dataclass
class ProductMatch:
    """Entity representing a product match in search results"""
    match_id: str
    variant_id: str
    product_data: ProductData
    score: Score
    rank: Rank
    
    def to_dict(self) -> dict:
        result = self.product_data.to_dict()
        result["rank"] = self.rank.position
        result["score"] = self.score.value
        return result
```

---

### 5. Domain Layer - Services

#### filter_extraction_service.py

```python
import re
from typing import List, Optional
from domain.value_objects.query_types import QueryText
from domain.value_objects.filters import SearchFilters, PriceRange

class FilterExtractionService:
    """Domain service for extracting filters from natural language"""
    
    # Pattern dictionaries
    COLOR_PATTERNS = {
        'grey': ['grey', 'gray'],
        'white': ['white', 'ivory', 'cream'],
        'black': ['black', 'dark'],
        'brown': ['brown', 'walnut', 'oak', 'teak'],
        'blue': ['blue', 'navy'],
        'green': ['green'],
        'red': ['red'],
        'beige': ['beige', 'tan', 'taupe']
    }
    
    MATERIAL_PATTERNS = {
        'wood': ['wood', 'wooden', 'timber'],
        'leather': ['leather'],
        'fabric': ['fabric', 'cloth', 'upholstered'],
        'metal': ['metal', 'steel', 'iron'],
        'glass': ['glass'],
        'marble': ['marble']
    }
    
    SIZE_PATTERNS = {
        'king': ['king', 'king size'],
        'queen': ['queen', 'queen size'],
        'single': ['single'],
        'double': ['double'],
        'large': ['large', 'big'],
        'small': ['small', 'compact'],
        'medium': ['medium']
    }
    
    CATEGORY_PATTERNS = {
        'sofa': ['sofa', 'couch', 'sectional'],
        'table': ['table', 'desk'],
        'chair': ['chair', 'armchair', 'stool'],
        'bed': ['bed', 'bedframe'],
        'cabinet': ['cabinet', 'storage', 'dresser'],
        'dining': ['dining']
    }
    
    def extract_filters(self, query_text: QueryText) -> SearchFilters:
        """Extract filters from query text"""
        text = query_text.normalize()
        
        return SearchFilters(
            price_range=self._extract_price_range(text),
            colors=self._extract_colors(text),
            materials=self._extract_materials(text),
            sizes=self._extract_sizes(text),
            categories=self._extract_categories(text),
            in_stock_only=self._extract_stock_filter(text)
        )
    
    def _extract_price_range(self, text: str) -> Optional[PriceRange]:
        """Extract price range from text"""
        # Pattern: "under $500", "below 500", "less than $500"
        under_match = re.search(r'(?:under|below|less than)\s*\$?(\d+)', text)
        if under_match:
            return PriceRange(max_price=float(under_match.group(1)))
        
        # Pattern: "over $500", "above 500", "more than $500"
        over_match = re.search(r'(?:over|above|more than)\s*\$?(\d+)', text)
        if over_match:
            return PriceRange(min_price=float(over_match.group(1)))
        
        # Pattern: "between $200 and $500"
        between_match = re.search(r'between\s*\$?(\d+)\s*and\s*\$?(\d+)', text)
        if between_match:
            return PriceRange(
                min_price=float(between_match.group(1)),
                max_price=float(between_match.group(2))
            )
        
        return None
    
    def _extract_colors(self, text: str) -> List[str]:
        """Extract colors from text"""
        colors = []
        for color, patterns in self.COLOR_PATTERNS.items():
            if any(pattern in text for pattern in patterns):
                colors.append(color)
        return colors
    
    def _extract_materials(self, text: str) -> List[str]:
        """Extract materials from text"""
        materials = []
        for material, patterns in self.MATERIAL_PATTERNS.items():
            if any(pattern in text for pattern in patterns):
                materials.append(material)
        return materials
    
    def _extract_sizes(self, text: str) -> List[str]:
        """Extract sizes from text"""
        sizes = []
        for size, patterns in self.SIZE_PATTERNS.items():
            if any(pattern in text for pattern in patterns):
                sizes.append(size)
        return sizes
    
    def _extract_categories(self, text: str) -> List[str]:
        """Extract categories from text"""
        categories = []
        for category, patterns in self.CATEGORY_PATTERNS.items():
            if any(pattern in text for pattern in patterns):
                categories.append(category)
        return categories
    
    def _extract_stock_filter(self, text: str) -> bool:
        """Check if in-stock filter is requested"""
        return 'in stock' in text or 'available' in text
```


#### search_strategy_service.py

```python
from typing import List
from domain.aggregates.search_query import SearchQuery
from domain.value_objects.product_data import ProductMatch
from domain.value_objects.query_types import SearchMode
from domain.services.rrf_service import ReciprocalRankFusionService
from domain.repositories.opensearch_repository import OpenSearchRepository
from infrastructure.config.config_loader import Config

class SearchStrategyService:
    """Domain service for executing search strategies"""
    
    def __init__(self):
        self.opensearch_repo = OpenSearchRepository()
        self.rrf_service = ReciprocalRankFusionService()
        self.config = Config.get_search_query_config()
    
    def search(self, query: SearchQuery) -> List[ProductMatch]:
        """Execute search based on query's search mode"""
        if query.search_mode == SearchMode.KNN:
            return self._search_knn(query)
        elif query.search_mode == SearchMode.BM25:
            return self._search_bm25(query)
        elif query.search_mode == SearchMode.HYBRID:
            return self._search_hybrid(query)
        else:
            raise ValueError(f"Unknown search mode: {query.search_mode}")
    
    def _search_knn(self, query: SearchQuery) -> List[ProductMatch]:
        """Perform KNN semantic search"""
        index_name = self._get_index_name(query)
        k = self.config['knn']['k']
        
        results = self.opensearch_repo.knn_search(
            index=index_name,
            embedding=query.query_embedding,
            filters=query.filters.to_opensearch_filter(),
            k=k
        )
        
        return self._convert_to_matches(results, ScoreType.SIMILARITY)
    
    def _search_bm25(self, query: SearchQuery) -> List[ProductMatch]:
        """Perform BM25 keyword search"""
        if query.query_type != QueryType.TEXT:
            raise ValueError("BM25 search requires text query")
        
        index_name = "product_text_embeddings"
        k = self.config['bm25'].get('k', 100)
        
        results = self.opensearch_repo.bm25_search(
            index=index_name,
            query_text=query.query_content.value,
            filters=query.filters.to_opensearch_filter(),
            k=k,
            field_boosts=self.config['bm25']['field_boosts']
        )
        
        return self._convert_to_matches(results, ScoreType.BM25)
    
    def _search_hybrid(self, query: SearchQuery) -> List[ProductMatch]:
        """Perform hybrid search with RRF"""
        if query.query_type != QueryType.TEXT:
            raise ValueError("Hybrid search requires text query")
        
        # Execute both searches in parallel (simplified here)
        knn_results = self._search_knn(query)
        bm25_results = self._search_bm25(query)
        
        # Fuse results using RRF
        fused_results = self.rrf_service.fuse_results(
            knn_results,
            bm25_results,
            k=self.config['hybrid']['rrf_k']
        )
        
        return fused_results
    
    def _get_index_name(self, query: SearchQuery) -> str:
        """Get appropriate index name based on query type"""
        if query.query_type == QueryType.TEXT:
            return "product_text_embeddings"
        elif query.query_type == QueryType.IMAGE:
            return "product_image_embeddings"
        else:
            raise ValueError(f"Unknown query type: {query.query_type}")
    
    def _convert_to_matches(
        self,
        opensearch_results: List[dict],
        score_type: ScoreType
    ) -> List[ProductMatch]:
        """Convert OpenSearch results to ProductMatch entities"""
        matches = []
        for i, result in enumerate(opensearch_results):
            product_data = self._extract_product_data(result['_source'])
            score = Score(value=result['_score'], score_type=score_type)
            rank = Rank(position=i + 1)
            
            match = ProductMatch(
                match_id=f"{result['_id']}_{i}",
                variant_id=result['_source']['variant_id'],
                product_data=product_data,
                score=score,
                rank=rank
            )
            matches.append(match)
        
        return matches
    
    def _extract_product_data(self, source: dict) -> ProductData:
        """Extract ProductData from OpenSearch source"""
        images = [
            ImageData(
                url=img['url'],
                type=img['type'],
                position=img['position'],
                is_default=img.get('is_default', False)
            )
            for img in source.get('images', [])
        ]
        
        return ProductData(
            variant_id=source['variant_id'],
            product_id=source['product_id'],
            variant_name=source['variant_name'],
            product_name=source['product_name'],
            description=source.get('description', ''),
            price=source['price'],
            currency=source.get('currency', 'SGD'),
            images=images,
            categories=source.get('categories', {}),
            properties=source.get('properties', {}),
            options=source.get('options', {}),
            review_rating=source.get('review_rating'),
            review_count=source.get('review_count'),
            is_in_stock=source.get('is_in_stock', True),
            metadata=source.get('metadata', {})
        )
```

#### rrf_service.py

```python
from typing import List, Dict
from domain.value_objects.product_data import ProductMatch
from domain.value_objects.scores import Score, ScoreType

class ReciprocalRankFusionService:
    """Domain service for Reciprocal Rank Fusion"""
    
    def fuse_results(
        self,
        knn_results: List[ProductMatch],
        bm25_results: List[ProductMatch],
        k: int = 60
    ) -> List[ProductMatch]:
        """
        Combine results using RRF algorithm.
        RRF_score(d) = Σ(1 / (k + rank_i(d)))
        """
        # Build RRF scores
        rrf_scores: Dict[str, float] = {}
        variant_to_match: Dict[str, ProductMatch] = {}
        
        # Add KNN results
        for match in knn_results:
            variant_id = match.variant_id
            rrf_scores[variant_id] = rrf_scores.get(variant_id, 0.0) + \
                                     (1.0 / (k + match.rank.position))
            variant_to_match[variant_id] = match
        
        # Add BM25 results
        for match in bm25_results:
            variant_id = match.variant_id
            rrf_scores[variant_id] = rrf_scores.get(variant_id, 0.0) + \
                                     (1.0 / (k + match.rank.position))
            if variant_id not in variant_to_match:
                variant_to_match[variant_id] = match
        
        # Create fused results
        fused_matches = []
        for variant_id, rrf_score in rrf_scores.items():
            match = variant_to_match[variant_id]
            # Update score to RRF score
            match.score = Score(value=rrf_score, score_type=ScoreType.RRF)
            fused_matches.append(match)
        
        # Sort by RRF score
        fused_matches.sort(key=lambda m: m.score.value, reverse=True)
        
        # Update ranks
        for i, match in enumerate(fused_matches, 1):
            match.rank.position = i
        
        return fused_matches
```

#### ranking_service.py

```python
from typing import List
from domain.value_objects.product_data import ProductMatch

class ResultRankingService:
    """Domain service for ranking and normalizing results"""
    
    def rank_results(
        self,
        matches: List[ProductMatch],
        max_results: int = 50
    ) -> List[ProductMatch]:
        """Rank results by score and limit to max"""
        # Sort by score descending
        sorted_matches = sorted(matches, key=lambda m: m.score.value, reverse=True)
        
        # Limit to max results
        limited_matches = sorted_matches[:max_results]
        
        # Update ranks
        for i, match in enumerate(limited_matches, 1):
            match.rank.position = i
        
        return limited_matches
    
    def normalize_scores(
        self,
        matches: List[ProductMatch]
    ) -> List[ProductMatch]:
        """Normalize scores to 0-1 range"""
        if not matches:
            return matches
        
        max_score = max(m.score.value for m in matches)
        min_score = min(m.score.value for m in matches)
        
        if max_score == min_score:
            return matches
        
        for match in matches:
            normalized = (match.score.value - min_score) / (max_score - min_score)
            match.score.value = normalized
        
        return matches
```

---

### 6. Domain Layer - Policies

#### search_policies.py

```python
from typing import List, Callable
import signal
from domain.value_objects.product_data import ProductMatch

class SearchTimeoutPolicy:
    """Policy to enforce search timeout"""
    
    def __init__(self, timeout_seconds: int = 3):
        self.timeout_seconds = timeout_seconds
    
    def enforce(self, search_operation: Callable) -> any:
        """Execute search with timeout"""
        def timeout_handler(signum, frame):
            raise TimeoutError(f"Search exceeded {self.timeout_seconds} seconds")
        
        # Set timeout
        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(self.timeout_seconds)
        
        try:
            result = search_operation()
            signal.alarm(0)  # Cancel alarm
            return result
        except TimeoutError:
            signal.alarm(0)
            raise

class ResultLimitPolicy:
    """Policy to limit number of results"""
    
    def __init__(self, max_results: int = 50):
        self.max_results = max_results
    
    def enforce(self, matches: List[ProductMatch]) -> List[ProductMatch]:
        """Limit results to max count"""
        return matches[:self.max_results]

class FilterValidationPolicy:
    """Policy to validate filters"""
    
    def validate(self, filters: SearchFilters) -> bool:
        """Validate filter consistency"""
        try:
            filters.validate()
            return True
        except ValueError as e:
            raise ValueError(f"Invalid filters: {str(e)}")
```

---

### 7. Infrastructure Layer

#### opensearch_repository_impl.py

```python
from typing import List, Dict
from opensearchpy import OpenSearch
from domain.repositories.opensearch_repository import OpenSearchRepository
from domain.value_objects.query_types import QueryEmbedding
from infrastructure.config.config_loader import Config

class OpenSearchRepositoryImpl(OpenSearchRepository):
    """Implementation of OpenSearch repository"""
    
    def __init__(self):
        self.config = Config.get_aws_config()['opensearch']
        self.client = self._create_client()
    
    def _create_client(self) -> OpenSearch:
        """Create OpenSearch client"""
        return OpenSearch(
            hosts=[{
                'host': self.config['endpoint'].replace('https://', ''),
                'port': self.config['port']
            }],
            http_auth=(self.config['username'], self.config['password']),
            use_ssl=self.config['use_ssl'],
            verify_certs=self.config['verify_certs'],
            connection_class=RequestsHttpConnection,
            timeout=self.config['connection_timeout']
        )
    
    def knn_search(
        self,
        index: str,
        embedding: QueryEmbedding,
        filters: dict,
        k: int
    ) -> List[dict]:
        """Perform KNN search"""
        query = {
            "size": k,
            "query": {
                "bool": {
                    "must": [
                        {
                            "knn": {
                                "text_embedding" if "text" in index else "image_embedding": {
                                    "vector": embedding.to_list(),
                                    "k": k
                                }
                            }
                        }
                    ],
                    "filter": filters.get("bool", {}).get("must", [])
                }
            }
        }
        
        response = self.client.search(index=index, body=query)
        return response['hits']['hits']
    
    def bm25_search(
        self,
        index: str,
        query_text: str,
        filters: dict,
        k: int,
        field_boosts: dict
    ) -> List[dict]:
        """Perform BM25 search"""
        # Build multi-match query with field boosts
        should_clauses = []
        for field, boost in field_boosts.items():
            should_clauses.append({
                "match": {
                    field: {
                        "query": query_text,
                        "boost": boost
                    }
                }
            })
        
        query = {
            "size": k,
            "query": {
                "bool": {
                    "should": should_clauses,
                    "filter": filters.get("bool", {}).get("must", []),
                    "minimum_should_match": 1
                }
            }
        }
        
        response = self.client.search(index=index, body=query)
        return response['hits']['hits']
```

#### embedding_service_impl.py

```python
import boto3
import json
from domain.services.embedding_service import EmbeddingService
from domain.value_objects.query_types import QueryText, QueryImage, QueryEmbedding
from infrastructure.config.config_loader import Config

class EmbeddingServiceImpl(EmbeddingService):
    """Implementation of embedding service using Bedrock"""
    
    def __init__(self):
        self.config = Config.get_aws_config()['bedrock']
        self.client = boto3.client(
            'bedrock-runtime',
            region_name=self.config['region']
        )
    
    def embed_text(self, query_text: QueryText) -> QueryEmbedding:
        """Generate text embedding using Bedrock Titan"""
        body = json.dumps({
            "inputText": query_text.value
        })
        
        response = self.client.invoke_model(
            modelId=self.config['text_model'],
            body=body
        )
        
        response_body = json.loads(response['body'].read())
        embedding_vector = response_body['embedding']
        
        return QueryEmbedding(
            vector=embedding_vector,
            dimension=1536,
            model=self.config['text_model']
        )
    
    def embed_image(self, query_image: QueryImage) -> QueryEmbedding:
        """Generate image embedding using Bedrock Titan"""
        body = json.dumps({
            "inputImage": query_image.base64_data
        })
        
        response = self.client.invoke_model(
            modelId=self.config['image_model'],
            body=body
        )
        
        response_body = json.loads(response['body'].read())
        embedding_vector = response_body['embedding']
        
        return QueryEmbedding(
            vector=embedding_vector,
            dimension=1024,
            model=self.config['image_model']
        )
```

---

## Sequence Diagrams

### Text Search Flow

```
User -> API: get_text_results("grey sofa under $1000")
API -> TextSearchService: execute(query_string)
TextSearchService -> QueryText: create("grey sofa under $1000")
TextSearchService -> FilterExtractionService: extract_filters(query_text)
FilterExtractionService --> TextSearchService: SearchFilters(color=[grey], category=[sofa], price.max=1000)
TextSearchService -> EmbeddingService: embed_text(query_text)
EmbeddingService -> Bedrock: invoke_model(text)
Bedrock --> EmbeddingService: embedding_vector
EmbeddingService --> TextSearchService: QueryEmbedding
TextSearchService -> SearchQuery: create_text_query(...)
TextSearchService -> SearchStrategyService: search(search_query)
SearchStrategyService -> OpenSearchRepository: knn_search(...)
OpenSearchRepository -> OpenSearch: search(knn_query)
OpenSearch --> OpenSearchRepository: hits
OpenSearchRepository --> SearchStrategyService: List[ProductMatch]
SearchStrategyService --> TextSearchService: matches
TextSearchService -> ResultLimitPolicy: enforce(matches)
ResultLimitPolicy --> TextSearchService: limited_matches
TextSearchService -> SearchResult: create(query, matches, response_time)
SearchResult --> TextSearchService: search_result
TextSearchService --> API: search_result
API -> SearchResult: to_json()
SearchResult --> API: json_response
API --> User: {"status": "success", "results": [...]}
```

---

## Error Handling Strategy

### Exception Hierarchy

```python
class SearchException(Exception):
    """Base exception for search errors"""
    pass

class EmptyQueryError(SearchException):
    """Raised when query is empty"""
    pass

class InvalidImageError(SearchException):
    """Raised when image format is invalid"""
    pass

class SearchTimeoutError(SearchException):
    """Raised when search exceeds timeout"""
    pass

class NoResultsError(SearchException):
    """Raised when no results found"""
    pass

class ServiceUnavailableError(SearchException):
    """Raised when external service is unavailable"""
    pass
```

### Error Response Format

```python
def handle_error(error: Exception) -> dict:
    """Convert exceptions to error responses"""
    if isinstance(error, EmptyQueryError):
        return {
            "status": "error",
            "error_code": "EMPTY_QUERY",
            "message": "empty search query"
        }
    elif isinstance(error, InvalidImageError):
        return {
            "status": "error",
            "error_code": "INVALID_IMAGE",
            "message": "invalid uploaded image format"
        }
    elif isinstance(error, NoResultsError):
        return {
            "status": "error",
            "error_code": "NO_RESULTS",
            "message": "no results found for query"
        }
    elif isinstance(error, SearchTimeoutError):
        return {
            "status": "error",
            "error_code": "TIMEOUT",
            "message": "search timeout exceeded"
        }
    elif isinstance(error, ServiceUnavailableError):
        return {
            "status": "error",
            "error_code": "SERVICE_UNAVAILABLE",
            "message": str(error)
        }
    else:
        return {
            "status": "error",
            "error_code": "INTERNAL_ERROR",
            "message": "An unexpected error occurred"
        }
```

---

## Configuration Management

### Config Loader

```python
import yaml
import os
from typing import Any, Dict

class Config:
    """Singleton configuration manager"""
    _config: Dict = None
    
    @classmethod
    def load(cls, config_path: str = "config.yaml"):
        """Load configuration from YAML file"""
        with open(config_path, 'r') as f:
            cls._config = yaml.safe_load(f)
        
        # Substitute environment variables
        cls._substitute_env_vars(cls._config)
    
    @classmethod
    def _substitute_env_vars(cls, config: Dict):
        """Recursively substitute environment variables"""
        for key, value in config.items():
            if isinstance(value, str) and value.startswith('${') and value.endswith('}'):
                env_var = value[2:-1]
                config[key] = os.getenv(env_var, value)
            elif isinstance(value, dict):
                cls._substitute_env_vars(value)
    
    @classmethod
    def get(cls, key_path: str, default=None) -> Any:
        """Get config value by dot-notation path"""
        keys = key_path.split('.')
        value = cls._config
        for key in keys:
            if isinstance(value, dict):
                value = value.get(key)
            else:
                return default
        return value if value is not None else default
    
    @classmethod
    def get_search_query_config(cls) -> Dict:
        """Get search query configuration"""
        return cls._config.get('search_query', {})
    
    @classmethod
    def get_aws_config(cls) -> Dict:
        """Get AWS configuration"""
        return cls._config.get('aws', {})
```

---

## Testing Strategy

### Unit Tests
- Test each value object's validation logic
- Test domain services in isolation (with mocks)
- Test policies
- Test filter extraction patterns

### Integration Tests
- Test with real OpenSearch (test index)
- Test with real Bedrock (small samples)
- Test end-to-end search flow

### Performance Tests
- Measure response times
- Test with concurrent requests
- Test with large result sets

---

## Deployment Considerations

### Dependencies
```
boto3>=1.26.0
opensearch-py>=2.0.0
pyyaml>=6.0
python-dotenv>=0.19.0
```

### Environment Variables
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
OPENSEARCH_USERNAME
OPENSEARCH_PASSWORD
```

### Initialization
```python
# main.py
from infrastructure.config.config_loader import Config
from utils.logger import setup_logging

def initialize():
    """Initialize the search service"""
    # Load configuration
    Config.load("config.yaml")
    
    # Setup logging
    setup_logging(Config.get('logging', {}))
    
    # Validate configuration
    errors = validate_config()
    if errors:
        raise ValueError(f"Invalid configuration: {errors}")

if __name__ == "__main__":
    initialize()
```

---

## Summary

This logical design provides:
- **Clear layered architecture** (API, Application, Domain, Infrastructure)
- **Detailed class designs** with methods and attributes
- **Implementation patterns** for DDD concepts
- **Error handling strategy** with custom exceptions
- **Configuration management** approach
- **Testing strategy** for different levels
- **Deployment considerations**

The design is ready for implementation in Python with all necessary details specified.
