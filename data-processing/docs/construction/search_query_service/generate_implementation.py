#!/usr/bin/env python3
"""
Script to generate the complete implementation of Search Query Service.
This creates all necessary Python files with minimal working implementations.
"""
import os


def create_file(path, content):
    """Create a file with given content"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print(f"Created: {path}")


def generate_all_files():
    """Generate all implementation files"""
    
    base_dir = "src"
    
    # Create all __init__.py files
    init_files = [
        f"{base_dir}/__init__.py",
        f"{base_dir}/api/__init__.py",
        f"{base_dir}/application/__init__.py",
        f"{base_dir}/domain/__init__.py",
        f"{base_dir}/domain/aggregates/__init__.py",
        f"{base_dir}/domain/value_objects/__init__.py",
        f"{base_dir}/domain/services/__init__.py",
        f"{base_dir}/infrastructure/__init__.py",
        f"{base_dir}/infrastructure/opensearch/__init__.py",
        f"{base_dir}/infrastructure/bedrock/__init__.py",
    ]
    
    for init_file in init_files:
        create_file(init_file, '"""Package init"""')
    
    # Generate scores.py
    scores_content = '''"""Score and Rank Value Objects"""
from dataclasses import dataclass
from enum import Enum
from typing import Optional


class ScoreType(Enum):
    SIMILARITY = "similarity"
    BM25 = "bm25"
    RRF = "rrf"


@dataclass
class Score:
    """Value object for scores"""
    value: float
    score_type: ScoreType
    
    def __lt__(self, other):
        return self.value < other.value
    
    def __gt__(self, other):
        return self.value > other.value


@dataclass
class Rank:
    """Value object for rank positions"""
    position: int = 1
    
    def __post_init__(self):
        if self.position < 1:
            self.position = 1
'''
    create_file(f"{base_dir}/domain/value_objects/scores.py", scores_content)
    
    # Generate product_data.py
    product_data_content = '''"""Product Data Value Objects"""
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
            "images": [{"url": img.url, "type": img.type, "position": img.position, "is_default": img.is_default} for img in self.images],
            "categories": self.categories,
            "properties": self.properties,
            "options": self.options,
            "review_rating": self.review_rating,
            "review_count": self.review_count,
            "is_in_stock": self.is_in_stock,
            **self.metadata
        }


@dataclass
class ProductMatch:
    """Entity representing a product match"""
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
'''
    create_file(f"{base_dir}/domain/value_objects/product_data.py", product_data_content)
    
    print("\n✅ All files generated successfully!")
    print(f"\nGenerated in: {os.path.abspath(base_dir)}")


if __name__ == "__main__":
    generate_all_files()
