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

---

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

---

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
    
    def has_tags_for_query(self, query: str) -> bool:
        """Check if query exists in pre-computed index"""
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        for term in query_terms:
            if term in self.category_tags or term in self.query_pattern_tags:
                return True
        return False
    
    def get_tags_for_query(self, query: str, max_tags: int = 10) -> List[SearchTag]:
        """Get pre-computed tags for query (instant lookup <1ms)."""
        query_lower = query.lower()
        query_terms = query_lower.split()
        
        all_tags = []
        seen_tags = set()
        
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
        prompt = self.llm_adapter.build_tag_generation_prompt(
            query, search_results, catalog_values
        )
        
        response = self.llm_adapter.invoke_claude(
            prompt,
            self.config.get('llm_model_id', 'anthropic.claude-3-sonnet-20240229-v1:0')
        )
        
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

---

## Infrastructure Layer - Claude LLM Adapter

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

---

## Cache Implementations

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
        self.intent_service = IntentExtractionService()  # Feature 5
        self.tags_service = RelatedTagsService()  # Feature 6
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
            logger.info(f"Triggering LLM fallback for '{query_string}' (score: {top_score})")
            
            # Extract intents using Claude
            intents = self.intent_service.extract_intents(query_string, self._get_catalog_knowledge())
            enhanced_query = intents.get_enhanced_query()
            
            if enhanced_query != query_string:
                # Re-search with enhanced query
                results, _ = self._perform_search(enhanced_query)
                llm_fallback_used = True
        
        # 3. Generate related tags (Feature 6)
        related_tags = self.tags_service.get_tags(query_string, results)
        
        # 4. Format response
        response_time = int((time.time() - start_time) * 1000)
        
        return {
            "status": "success",
            "total_results": len(results),
            "results": [r.to_dict() for r in results],
            "related_tags": [t.to_dict() for t in related_tags],
            "search_metadata": {
                "query": query_string,
                "search_mode": self.config['default_search_mode'],
                "response_time_ms": response_time,
                "llm_fallback_used": llm_fallback_used,
                "enhanced_query": enhanced_query
            }
        }
```

---

## Summary

This logical design now includes:
- **Core search functionality** (KNN, BM25, Hybrid with RRF)
- **Feature 5: LLM Fallback** for intent extraction from abstract queries
- **Feature 6: Related Tags** with two-tier approach (pre-computed + LLM)
- **Caching** for LLM responses and tags
- **Multi-region support** (Bedrock in us-east-1, other services in ap-southeast-1)
