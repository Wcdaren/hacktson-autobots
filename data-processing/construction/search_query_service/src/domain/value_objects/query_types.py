"""Query Type Value Objects"""
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
            if not (decoded.startswith(b'\xff\xd8\xff') or decoded.startswith(b'\x89PNG')):
                raise ValueError("Invalid image format (only JPG/PNG supported)")
            if len(decoded) > 5 * 1024 * 1024:
                raise ValueError("Image too large (max 5MB)")
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
    
    def to_list(self) -> List[float]:
        return list(self.vector)
