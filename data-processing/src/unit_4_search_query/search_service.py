"""
Unit 4: Search Query Service (Production)
Main search APIs integrated with Bedrock and OpenSearch.
Includes Feature 5 (LLM Fallback) and Feature 6 (Related Tags).
"""

import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
import json
import logging
import time
import re
from typing import Dict, List, Optional, Tuple
import base64

from .llm_service import ClaudeLLMService
from .tag_index_service import TagIndexService

logger = logging.getLogger(__name__)


class SearchQueryService:
    """Production search service with real AWS integrations."""
    
    def __init__(self, config: Dict):
        self.config = config
        
        # Initialize Bedrock client (use bedrock_region for us-east-1)
        bedrock_region = config['aws'].get('bedrock_region', config['aws']['region'])
        self.bedrock_client = boto3.client(
            'bedrock-runtime',
            region_name=bedrock_region
        )
        
        # Initialize OpenSearch client (use main region for ap-southeast-1)
        opensearch_config = config['aws']['opensearch']
        
        # SSL configuration (allow disabling for SSH tunnels)
        verify_certs = opensearch_config.get('verify_certs', True)
        ssl_show_warn = opensearch_config.get('ssl_show_warn', True)
        
        if opensearch_config.get('use_iam_auth', True):
            credentials = boto3.Session().get_credentials()
            auth = AWSV4SignerAuth(credentials, config['aws']['region'])
            
            self.opensearch_client = OpenSearch(
                hosts=[{'host': opensearch_config['endpoint'].replace('https://', ''), 
                       'port': 443}],
                http_auth=auth,
                use_ssl=True,
                verify_certs=verify_certs,
                ssl_show_warn=ssl_show_warn,
                connection_class=RequestsHttpConnection
            )
        else:
            # Load credentials from environment variables or config
            import os
            username = os.getenv('OPENSEARCH_USERNAME') or opensearch_config.get('username')
            password = os.getenv('OPENSEARCH_PASSWORD') or opensearch_config.get('password')
            
            if not username or not password:
                raise ValueError("OpenSearch username/password not found in environment or config")
            
            self.opensearch_client = OpenSearch(
                hosts=[opensearch_config['endpoint']],
                http_auth=(username, password),
                use_ssl=True,
                verify_certs=verify_certs,
                ssl_show_warn=ssl_show_warn
            )
        
        self.text_index = opensearch_config['indices']['text_index']
        self.image_index = opensearch_config['indices']['image_index']
        self.text_model_id = config['aws']['bedrock']['text_model_id']
        self.image_model_id = config['aws']['bedrock']['image_model_id']
        
        # Initialize LLM service for Features 5 & 6
        self.llm_service = ClaudeLLMService(config)
        
        # Initialize Tag Index Service for Feature 6 (pre-computed tags)
        self.tag_index = TagIndexService(config)
    
    def extract_filters(self, query: str) -> Dict:
        """Extract filters from natural language query using config-based patterns."""
        filters = {}
        query_lower = query.lower()
        filter_config = self.config['search_query']['filters']
        catalog = self.config.get('catalog', {})
        
        # Extract price filters using config patterns
        price_patterns = filter_config.get('price_patterns', [])
        for pattern_config in price_patterns:
            pattern = pattern_config['pattern']
            pattern_type = pattern_config['type']
            
            match = re.search(pattern, query_lower, re.IGNORECASE)
            if match:
                if pattern_type == 'max':
                    price_str = match.group(1).replace(',', '')
                    filters['price_max'] = float(price_str)
                    break
                elif pattern_type == 'min':
                    price_str = match.group(1).replace(',', '')
                    filters['price_min'] = float(price_str)
                    break
                elif pattern_type == 'range':
                    min_str = match.group(1).replace(',', '')
                    max_str = match.group(2).replace(',', '')
                    filters['price_min'] = float(min_str)
                    filters['price_max'] = float(max_str)
                    break
                elif pattern_type == 'approximate':
                    price_str = match.group(1).replace(',', '')
                    price = float(price_str)
                    variance = pattern_config.get('variance_percent', 20) / 100
                    filters['price_min'] = price * (1 - variance)
                    filters['price_max'] = price * (1 + variance)
                    break
        
        # Extract colors (from unified catalog)
        colors = catalog.get('colors', [])
        found_colors = self._match_filter_values(query_lower, colors)
        if found_colors:
            filters['colors'] = found_colors
        
        # Extract materials (from unified catalog)
        materials = catalog.get('materials', [])
        found_materials = self._match_filter_values(query_lower, materials)
        if found_materials:
            filters['materials'] = found_materials
        
        # Extract categories (from unified catalog)
        categories = catalog.get('categories', [])
        found_categories = self._match_filter_values(query_lower, categories)
        if found_categories:
            filters['categories'] = found_categories
        
        # Extract sizes (from unified catalog)
        sizes = catalog.get('sizes', [])
        found_sizes = self._match_filter_values(query_lower, sizes)
        if found_sizes:
            filters['sizes'] = found_sizes
        
        # Extract styles (from unified catalog)
        styles = catalog.get('styles', [])
        found_styles = self._match_filter_values(query_lower, styles)
        if found_styles:
            filters['styles'] = found_styles
        
        # Extract room types (from unified catalog)
        rooms = catalog.get('rooms', [])
        found_rooms = self._match_filter_values(query_lower, rooms)
        if found_rooms:
            filters['rooms'] = found_rooms
        
        # Extract features (from unified catalog)
        features = catalog.get('features', [])
        found_features = self._match_filter_values(query_lower, features)
        if found_features:
            filters['features'] = found_features
        
        # Extract conditions (from unified catalog)
        conditions = catalog.get('conditions', [])
        found_conditions = self._match_filter_values(query_lower, conditions)
        if found_conditions:
            filters['conditions'] = found_conditions
        
        return filters
    
    def _match_filter_values(self, query: str, values: List[str]) -> List[str]:
        """Match filter values using word boundary matching for accuracy."""
        found = []
        for value in values:
            # Use word boundary matching to avoid partial matches
            # e.g., "oak" shouldn't match "soaking"
            pattern = r'\b' + re.escape(value.lower()) + r'\b'
            if re.search(pattern, query, re.IGNORECASE):
                found.append(value)
        return found
    
    def generate_query_embedding(self, query: str) -> List[float]:
        """Generate embedding for search query using Bedrock."""
        try:
            body = json.dumps({"inputText": query})
            
            response = self.bedrock_client.invoke_model(
                modelId=self.text_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            response_body = json.loads(response['body'].read())
            return response_body.get('embedding', [])
            
        except Exception as e:
            logger.error(f"Error generating query embedding: {str(e)}")
            raise
    
    def knn_search(self, query_embedding: List[float], filters: Dict, k: int = 50) -> List[Dict]:
        """Perform KNN search on OpenSearch with soft filter boosting."""
        query_body = {
            "size": k,
            "query": {
                "knn": {
                    "text_embedding": {
                        "vector": query_embedding,
                        "k": k
                    }
                }
            }
        }
        
        # Get filter boost values from config
        filter_boosts = self.config['search_query'].get('filter_boosts', {})
        
        # Use filters as boosting signals (soft filtering - boosts matches but doesn't exclude non-matches)
        if filters:
            should_clauses = []
            must_clauses = []
            
            # Price filters (hard filter - must match)
            if 'price_max' in filters:
                must_clauses.append({"range": {"price": {"lte": filters['price_max']}}})
            
            if 'price_min' in filters:
                must_clauses.append({"range": {"price": {"gte": filters['price_min']}}})
            
            # Category filters - boost matching products (soft filter)
            if 'categories' in filters and filters['categories']:
                for category in filters['categories']:
                    # Text fields (variant_name, product_name) - use match with fuzziness
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": category, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": category, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword fields - use wildcard for partial matching
                    category_lower = category.lower()
                    should_clauses.extend([
                        {"wildcard": {"frontend_category": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0), "case_insensitive": True}}},
                        {"wildcard": {"frontend_subcategory": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0), "case_insensitive": True}}},
                        {"wildcard": {"product_type": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0) * 0.7, "case_insensitive": True}}}
                    ])
            
            # Color filters - boost matching products (soft filter)
            if 'colors' in filters and filters['colors']:
                for color in filters['colors']:
                    # Text fields
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": color, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": color, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword field
                    color_lower = color.lower()
                    should_clauses.append(
                        {"wildcard": {"color_tone": {"value": f"*{color_lower}*", "boost": filter_boosts.get('color', 2.5), "case_insensitive": True}}}
                    )
            
            # Material filters - boost matching products (soft filter)
            if 'materials' in filters and filters['materials']:
                for material in filters['materials']:
                    # Text fields
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": material, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": material, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword field
                    material_lower = material.lower()
                    should_clauses.append(
                        {"wildcard": {"material": {"value": f"*{material_lower}*", "boost": filter_boosts.get('material', 2.5), "case_insensitive": True}}}
                    )
            
            if should_clauses or must_clauses:
                query_body["query"] = {
                    "bool": {
                        "must": [query_body["query"]] + must_clauses,
                        "should": should_clauses
                    }
                }
        
        try:
            response = self.opensearch_client.search(
                index=self.text_index,
                body=query_body
            )
            
            results = []
            for hit in response['hits']['hits']:
                result = hit['_source']
                result['score'] = hit['_score']
                results.append(result)
            
            return results
            
        except Exception as e:
            logger.error(f"Error in KNN search: {str(e)}")
            raise
    
    def bm25_search(self, query: str, filters: Dict, k: int = 50) -> List[Dict]:
        """Perform BM25 keyword search on OpenSearch with soft filter boosting."""
        field_boosts = self.config['search_query']['field_boosts']
        filter_boosts = self.config['search_query'].get('filter_boosts', {})
        
        query_body = {
            "size": k,
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": [
                        f"product_name^{field_boosts['product_name']}",
                        f"variant_name^{field_boosts['variant_name']}",
                        f"description^{field_boosts['description']}",
                        f"frontend_category^{field_boosts['categories']}",
                        f"frontend_subcategory^{field_boosts['categories']}",
                        f"aggregated_text^{field_boosts['properties']}"
                    ],
                    "type": "best_fields"
                }
            }
        }
        
        # Use filters as boosting signals (soft filtering)
        if filters:
            should_clauses = []
            must_clauses = []
            
            # Price filters (hard filter - must match)
            if 'price_max' in filters:
                must_clauses.append({"range": {"price": {"lte": filters['price_max']}}})
            
            if 'price_min' in filters:
                must_clauses.append({"range": {"price": {"gte": filters['price_min']}}})
            
            # Category filters - boost matching products (soft filter)
            if 'categories' in filters and filters['categories']:
                for category in filters['categories']:
                    # Text fields (variant_name, product_name) - use match with fuzziness
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": category, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": category, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword fields - use wildcard for partial matching
                    category_lower = category.lower()
                    should_clauses.extend([
                        {"wildcard": {"frontend_category": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0), "case_insensitive": True}}},
                        {"wildcard": {"frontend_subcategory": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0), "case_insensitive": True}}},
                        {"wildcard": {"product_type": {"value": f"*{category_lower}*", "boost": filter_boosts.get('category', 3.0) * 0.7, "case_insensitive": True}}}
                    ])
            
            # Color filters - boost matching products (soft filter)
            if 'colors' in filters and filters['colors']:
                for color in filters['colors']:
                    # Text fields
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": color, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": color, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword field
                    color_lower = color.lower()
                    should_clauses.append(
                        {"wildcard": {"color_tone": {"value": f"*{color_lower}*", "boost": filter_boosts.get('color', 2.5), "case_insensitive": True}}}
                    )
            
            # Material filters - boost matching products (soft filter)
            if 'materials' in filters and filters['materials']:
                for material in filters['materials']:
                    # Text fields
                    should_clauses.extend([
                        {"match": {"variant_name": {"query": material, "fuzziness": "AUTO", "boost": filter_boosts.get('variant_name', 4.0)}}},
                        {"match": {"product_name": {"query": material, "fuzziness": "AUTO", "boost": filter_boosts.get('product_name', 3.5)}}}
                    ])
                    # Keyword field
                    material_lower = material.lower()
                    should_clauses.append(
                        {"wildcard": {"material": {"value": f"*{material_lower}*", "boost": filter_boosts.get('material', 2.5), "case_insensitive": True}}}
                    )
            
            if should_clauses or must_clauses:
                query_body["query"] = {
                    "bool": {
                        "must": [query_body["query"]] + must_clauses,
                        "should": should_clauses
                    }
                }
        
        try:
            response = self.opensearch_client.search(
                index=self.text_index,
                body=query_body
            )
            
            results = []
            for hit in response['hits']['hits']:
                result = hit['_source']
                result['score'] = hit['_score']
                results.append(result)
            
            return results
            
        except Exception as e:
            logger.error(f"Error in BM25 search: {str(e)}")
            raise
    
    def reciprocal_rank_fusion(self, knn_results: List[Dict], 
                               bm25_results: List[Dict], k: int = 60) -> List[Dict]:
        """Combine KNN and BM25 results using Reciprocal Rank Fusion."""
        rrf_scores = {}
        
        # Calculate RRF scores for KNN results
        for rank, result in enumerate(knn_results, 1):
            variant_id = result['variant_id']
            rrf_scores[variant_id] = rrf_scores.get(variant_id, 0) + 1 / (k + rank)
        
        # Calculate RRF scores for BM25 results
        for rank, result in enumerate(bm25_results, 1):
            variant_id = result['variant_id']
            rrf_scores[variant_id] = rrf_scores.get(variant_id, 0) + 1 / (k + rank)
        
        # Create result map
        result_map = {}
        for result in knn_results + bm25_results:
            variant_id = result['variant_id']
            if variant_id not in result_map:
                result_map[variant_id] = result
        
        # Sort by RRF score
        sorted_results = sorted(
            result_map.items(),
            key=lambda x: rrf_scores[x[0]],
            reverse=True
        )
        
        # Add RRF scores to results
        final_results = []
        for variant_id, result in sorted_results:
            result['score'] = rrf_scores[variant_id]
            final_results.append(result)
        
        return final_results
    
    def get_text_results(self, user_search_string: str) -> Dict:
        """
        Main API: Get text search results.
        Includes Feature 5 (LLM Fallback) and Feature 6 (Related Tags).
        Returns JSON response with search results.
        """
        start_time = time.time()
        
        try:
            # Validate input
            if not user_search_string or not user_search_string.strip():
                return {
                    "status": "error",
                    "error_code": "EMPTY_QUERY",
                    "message": "empty search query"
                }
            
            # Extract filters
            filters = self.extract_filters(user_search_string)
            
            # Get search mode
            search_mode = self.config['search_query']['default_search_mode']
            max_results = self.config['search_query']['max_results']
            
            # Perform initial search
            results, top_score = self._perform_search(
                user_search_string, filters, search_mode, max_results
            )
            
            # Feature 5: LLM Fallback for low-quality results
            llm_fallback_used = False
            enhanced_query = None
            original_query = user_search_string
            
            if self.llm_service.should_trigger_fallback(top_score):
                logger.info(f"Triggering LLM fallback for '{user_search_string}' (score: {top_score})")
                
                # Extract intents using Claude
                intents = self.llm_service.extract_intents(user_search_string)
                enhanced_query = intents.get('enhanced_query', user_search_string)
                
                if enhanced_query != user_search_string:
                    # Re-search with enhanced query
                    enhanced_filters = self.extract_filters(enhanced_query)
                    results, _ = self._perform_search(
                        enhanced_query, enhanced_filters, search_mode, max_results
                    )
                    llm_fallback_used = True
                    logger.info(f"LLM enhanced query: '{enhanced_query}'")
            
            # Check if no results after fallback
            if not results:
                return {
                    "status": "error",
                    "error_code": "NO_RESULTS",
                    "message": "no results found for query",
                    "llm_fallback_used": llm_fallback_used,
                    "enhanced_query": enhanced_query
                }
            
            # Format results
            formatted_results = self._format_results(results)
            
            # Feature 6: Generate related tags using two-tier approach
            related_tags = self.llm_service.generate_related_tags(
                user_search_string, formatted_results, self.tag_index
            )
            
            response_time = int((time.time() - start_time) * 1000)
            
            return {
                "status": "success",
                "total_results": len(formatted_results),
                "results": formatted_results,
                "related_tags": related_tags,  # Feature 6
                "search_metadata": {
                    "query": original_query,
                    "search_mode": search_mode,
                    "filters_applied": filters,
                    "response_time_ms": response_time,
                    "llm_fallback_used": llm_fallback_used,  # Feature 5
                    "enhanced_query": enhanced_query  # Feature 5
                }
            }
            
        except Exception as e:
            logger.error(f"Error in get_text_results: {str(e)}")
            return {
                "status": "error",
                "error_code": "SEARCH_FAILED",
                "message": str(e)
            }
    
    def _perform_search(
        self,
        query: str,
        filters: Dict,
        search_mode: str,
        max_results: int
    ) -> Tuple[List[Dict], float]:
        """
        Perform search and return results with top score.
        Returns (results, top_score) tuple.
        """
        if search_mode == 'knn':
            query_embedding = self.generate_query_embedding(query)
            results = self.knn_search(query_embedding, filters, max_results)
            
        elif search_mode == 'bm25':
            results = self.bm25_search(query, filters, max_results)
            
        elif search_mode == 'hybrid':
            query_embedding = self.generate_query_embedding(query)
            knn_results = self.knn_search(query_embedding, filters, max_results)
            bm25_results = self.bm25_search(query, filters, max_results)
            rrf_k = self.config['search_query']['rrf']['k']
            results = self.reciprocal_rank_fusion(knn_results, bm25_results, rrf_k)
            results = results[:max_results]
        else:
            raise ValueError(f"Unknown search mode: {search_mode}")
        
        # Get top score for fallback decision
        top_score = results[0].get('score', 0.0) if results else 0.0
        
        return results, top_score
    
    def _format_results(self, results: List[Dict]) -> List[Dict]:
        """Format search results for API response with complete metadata."""
        formatted_results = []
        for rank, result in enumerate(results, 1):
            # Get default image
            default_image = ""
            if result.get('images'):
                for img in result['images']:
                    if img.get('is_default'):
                        default_image = img.get('url', '')
                        break
                if not default_image and result['images']:
                    default_image = result['images'][0].get('url', '')
            
            formatted_results.append({
                "variant_id": result.get('variant_id', ''),
                "product_id": result.get('product_id', ''),
                "product_name": result.get('product_name', ''),
                "variant_name": result.get('variant_name', ''),
                "description": result.get('description', ''),
                "price": result.get('price', 0),
                "currency": result.get('currency', 'SGD'),
                "image_url": default_image,
                "score": round(result.get('score', 0), 4),
                "rank": rank,
                "review_rating": result.get('review_rating', 0),
                "review_count": result.get('review_count', 0),
                "stock_status": result.get('stock_status', ''),
                "lifecycle_status": result.get('lifecycle_status', ''),
                "frontend_category": result.get('frontend_category', ''),
                "frontend_subcategory": result.get('frontend_subcategory', ''),
                "backend_category": result.get('backend_category', ''),
                "product_type": result.get('product_type', ''),
                "material": result.get('material', ''),
                "color_tone": result.get('color_tone', ''),
                "collection": result.get('collection', ''),
                "other_properties": result.get('other_properties', ''),
                "variant_url": result.get('variant_url', ''),
                "aggregated_text": result.get('aggregated_text', ''),
                "images": result.get('images', []),
                "properties": result.get('properties', {}),
                "options": result.get('options', [])
            })
        
        return formatted_results
    
    def get_image_match_result(self, image_base64: str) -> Dict:
        """
        Main API: Get image similarity search results.
        Returns JSON response with similar products.
        """
        start_time = time.time()
        
        try:
            # Validate image format
            if not image_base64:
                return {
                    "status": "error",
                    "error_code": "INVALID_IMAGE",
                    "message": "invalid uploaded image format"
                }
            
            # Generate image embedding
            body = json.dumps({"inputImage": image_base64})
            
            response = self.bedrock_client.invoke_model(
                modelId=self.image_model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            response_body = json.loads(response['body'].read())
            image_embedding = response_body.get('embedding', [])
            
            # Perform KNN search on image index
            max_results = self.config['search_query']['max_results']
            
            query_body = {
                "size": max_results,
                "query": {
                    "knn": {
                        "image_embedding": {
                            "vector": image_embedding,
                            "k": max_results
                        }
                    }
                }
            }
            
            response = self.opensearch_client.search(
                index=self.image_index,
                body=query_body
            )
            
            results = []
            for hit in response['hits']['hits']:
                result = hit['_source']
                result['score'] = hit['_score']
                results.append(result)
            
            if not results:
                return {
                    "status": "error",
                    "error_code": "NO_RESULTS",
                    "message": "no results found for query"
                }
            
            # Format results with full product metadata
            formatted_results = []
            for rank, result in enumerate(results, 1):
                formatted_results.append({
                    "variant_id": result['variant_id'],
                    "product_id": result.get('product_id', ''),
                    "product_name": result.get('product_name', ''),
                    "variant_name": result.get('variant_name', ''),
                    "description": result.get('description', ''),
                    "price": result.get('price', 0),
                    "currency": result.get('currency', 'SGD'),
                    "image_url": result.get('image_url', ''),
                    "image_type": result.get('image_type', ''),
                    "image_position": result.get('image_position', 1),
                    "is_default": result.get('is_default', False),
                    "score": round(result.get('score', 0), 4),
                    "rank": rank,
                    "frontend_category": result.get('frontend_category', ''),
                    "frontend_subcategory": result.get('frontend_subcategory', ''),
                    "backend_category": result.get('backend_category', ''),
                    "product_type": result.get('product_type', ''),
                    "review_rating": result.get('review_rating', 0),
                    "review_count": result.get('review_count', 0),
                    "stock_status": result.get('stock_status', ''),
                    "material": result.get('material', ''),
                    "color_tone": result.get('color_tone', ''),
                    "collection": result.get('collection', ''),
                    "variant_url": result.get('variant_url', '')
                })
            
            # Generate related tags based on image search results
            related_tags = self._generate_tags_from_results(formatted_results)
            
            response_time = int((time.time() - start_time) * 1000)
            
            return {
                "status": "success",
                "total_results": len(formatted_results),
                "results": formatted_results,
                "related_tags": related_tags,  # Add tags for image search
                "search_metadata": {
                    "search_type": "image_similarity",
                    "response_time_ms": response_time
                }
            }
            
        except Exception as e:
            logger.error(f"Error in get_image_match_result: {str(e)}")
            return {
                "status": "error",
                "error_code": "SEARCH_FAILED",
                "message": str(e)
            }
    
    def refine_search_by_tag(self, original_query: str, tag: str, tag_type: str) -> Dict:
        """
        Feature 6: Refine search based on selected tag.
        
        Args:
            original_query: The original search query
            tag: The selected tag value (e.g., "Dining Chairs", "Under $1,000")
            tag_type: Type of tag (category, price_range, material, style, color)
        
        Returns:
            Search results refined by the selected tag
        """
        # Build refined query based on tag type
        if tag_type == 'price_range':
            # Parse price range and add as filter
            refined_query = f"{original_query} {tag}"
        elif tag_type == 'category':
            # Add category to query
            refined_query = f"{tag} {original_query}"
        else:
            # Add attribute to query
            refined_query = f"{original_query} {tag}"
        
        # Perform search with refined query
        return self.get_text_results(refined_query)
    
    def _generate_tags_from_results(self, results: List[Dict]) -> List[Dict]:
        """
        Generate tags from image search results based on common attributes.
        
        Args:
            results: List of search result products
            
        Returns:
            List of tag dicts with tag, type, relevance_score
        """
        if not results:
            return []
        
        # Collect attributes from top results
        categories = {}
        materials = {}
        colors = {}
        
        for result in results[:10]:  # Use top 10 results
            # Count categories
            category = result.get('frontend_category', '')
            if category:
                categories[category] = categories.get(category, 0) + 1
            
            # Count materials
            material = result.get('material', '')
            if material:
                materials[material] = materials.get(material, 0) + 1
            
            # Count colors
            color = result.get('color_tone', '')
            if color:
                colors[color] = colors.get(color, 0) + 1
        
        # Build tags from most common attributes
        tags = []
        
        # Add top categories
        sorted_categories = sorted(categories.items(), key=lambda x: x[1], reverse=True)
        for category, count in sorted_categories[:3]:
            tags.append({
                'tag': category,
                'type': 'category',
                'relevance_score': min(0.9, count / 10)
            })
        
        # Add top materials
        sorted_materials = sorted(materials.items(), key=lambda x: x[1], reverse=True)
        for material, count in sorted_materials[:2]:
            tags.append({
                'tag': material,
                'type': 'material',
                'relevance_score': min(0.8, count / 10)
            })
        
        # Add top colors
        sorted_colors = sorted(colors.items(), key=lambda x: x[1], reverse=True)
        for color, count in sorted_colors[:2]:
            tags.append({
                'tag': color,
                'type': 'color',
                'relevance_score': min(0.7, count / 10)
            })
        
        # Add generic style tags
        tags.append({'tag': 'Modern', 'type': 'style', 'relevance_score': 0.6})
        
        # Add price range tags based on results
        prices = [r.get('price', 0) for r in results[:10]]
        avg_price = sum(prices) / len(prices) if prices else 0
        
        if avg_price < 1000:
            tags.append({'tag': 'Under $1,000', 'type': 'price_range', 'relevance_score': 0.5})
        elif avg_price < 2000:
            tags.append({'tag': 'Under $2,000', 'type': 'price_range', 'relevance_score': 0.5})
        else:
            tags.append({'tag': 'Premium', 'type': 'price_range', 'relevance_score': 0.5})
        
        return tags[:10]  # Limit to 10 tags


def main():
    """Test the search service."""
    import yaml
    
    # Load config
    with open('../config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Initialize service
    service = SearchQueryService(config)
    
    # Test text search
    print("Testing text search...")
    result = service.get_text_results("grey sofa under $1000")
    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    main()
