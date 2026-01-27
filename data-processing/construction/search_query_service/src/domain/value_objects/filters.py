"""Filter Value Objects"""
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
        return (self.price_range is None and not self.colors and
                not self.materials and not self.sizes and
                not self.categories and self.dimensions is None and
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
