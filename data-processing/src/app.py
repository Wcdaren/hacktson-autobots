#!/usr/bin/env python3
"""
Standalone Flask API Server for Semantic Search
Run this on EC2 instance instead of using Lambda.

Usage:
    python app.py

The server will start on http://0.0.0.0:5000
"""

import json
import yaml
import logging
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sys
from pathlib import Path

# Load environment variables
load_dotenv()

# Add current directory to path
sys.path.append(str(Path(__file__).parent))

from unit_4_search_query.search_service import SearchQueryService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global search service instance
search_service = None


def load_config_with_env():
    """Load configuration from YAML and override with environment variables."""
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    # Override with environment variables for security
    if os.getenv('S3_BUCKET_NAME'):
        config['aws']['s3']['bucket'] = os.getenv('S3_BUCKET_NAME')
    
    if os.getenv('OPENSEARCH_USERNAME'):
        config['aws']['opensearch']['username'] = os.getenv('OPENSEARCH_USERNAME')
    
    if os.getenv('OPENSEARCH_PASSWORD'):
        config['aws']['opensearch']['password'] = os.getenv('OPENSEARCH_PASSWORD')
    
    # Optional: Override feature flags
    if os.getenv('LLM_FALLBACK_ENABLED'):
        config['llm_fallback']['enabled'] = os.getenv('LLM_FALLBACK_ENABLED').lower() == 'true'
    
    if os.getenv('RELATED_TAGS_ENABLED'):
        config['related_tags']['enabled'] = os.getenv('RELATED_TAGS_ENABLED').lower() == 'true'
    
    if os.getenv('SIMILARITY_THRESHOLD'):
        config['llm_fallback']['similarity_threshold'] = float(os.getenv('SIMILARITY_THRESHOLD'))
    
    return config


def init_service():
    """Initialize search service on startup."""
    global search_service
    
    try:
        logger.info("Initializing search service...")
        config = load_config_with_env()
        search_service = SearchQueryService(config)
        logger.info("✓ Search service initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize search service: {str(e)}", exc_info=True)
        raise


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'semantic-search-api',
        'version': '1.0.0'
    })


@app.route('/search/text', methods=['POST'])
def text_search():
    """
    Text search endpoint.
    
    Request body:
    {
        "query": "grey sofa under $1000"
    }
    
    Response:
    {
        "status": "success",
        "total_results": 10,
        "results": [...],
        "search_metadata": {...}
    }
    """
    try:
        # Parse request
        data = request.get_json()
        
        if not data or 'query' not in data:
            return jsonify({
                'status': 'error',
                'error_code': 'INVALID_REQUEST',
                'message': 'Missing required field: query'
            }), 400
        
        query = data.get('query', '')
        
        # Perform search
        logger.info(f"Text search request: {query}")
        result = search_service.get_text_results(query)
        
        # Return response
        status_code = 200 if result.get('status') == 'success' else 400
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error(f"Error in text search: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'error_code': 'INTERNAL_ERROR',
            'message': str(e)
        }), 500


@app.route('/search/image', methods=['POST'])
def image_search():
    """
    Image search endpoint.
    
    Request body:
    {
        "image": "base64_encoded_image_string"
    }
    
    Response:
    {
        "status": "success",
        "total_results": 10,
        "results": [...],
        "search_metadata": {...}
    }
    """
    try:
        # Parse request
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({
                'status': 'error',
                'error_code': 'INVALID_REQUEST',
                'message': 'Missing required field: image'
            }), 400
        
        image_base64 = data.get('image', '')
        
        # Perform search
        logger.info("Image search request received")
        result = search_service.get_image_match_result(image_base64)
        
        # Return response
        status_code = 200 if result.get('status') == 'success' else 400
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error(f"Error in image search: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'error_code': 'INTERNAL_ERROR',
            'message': str(e)
        }), 500


@app.route('/search/refine', methods=['POST'])
def refine_search():
    """
    Refine search by tag (Feature 6).
    
    Request body:
    {
        "original_query": "modern sofa",
        "tag": "Under $1,000",
        "tag_type": "price_range"
    }
    
    Response:
    {
        "status": "success",
        "total_results": 5,
        "results": [...],
        "search_metadata": {...}
    }
    """
    try:
        # Parse request
        data = request.get_json()
        
        if not data or 'original_query' not in data or 'tag' not in data:
            return jsonify({
                'status': 'error',
                'error_code': 'INVALID_REQUEST',
                'message': 'Missing required fields: original_query, tag'
            }), 400
        
        original_query = data.get('original_query', '')
        tag = data.get('tag', '')
        tag_type = data.get('tag_type', 'category')
        
        # Perform refined search
        logger.info(f"Refine search request: {original_query} + {tag}")
        result = search_service.refine_search_by_tag(original_query, tag, tag_type)
        
        # Return response
        status_code = 200 if result.get('status') == 'success' else 400
        return jsonify(result), status_code
        
    except Exception as e:
        logger.error(f"Error in refine search: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'error_code': 'INTERNAL_ERROR',
            'message': str(e)
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        'status': 'error',
        'error_code': 'NOT_FOUND',
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    return jsonify({
        'status': 'error',
        'error_code': 'INTERNAL_ERROR',
        'message': 'Internal server error'
    }), 500


def main():
    """Main entry point."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Semantic Search API Server')
    parser.add_argument(
        '--host',
        type=str,
        default='0.0.0.0',
        help='Host to bind to (default: 0.0.0.0)'
    )
    parser.add_argument(
        '--port',
        type=int,
        default=5000,
        help='Port to bind to (default: 5000)'
    )
    parser.add_argument(
        '--debug',
        action='store_true',
        help='Enable debug mode'
    )
    
    args = parser.parse_args()
    
    # Initialize service
    logger.info("=" * 60)
    logger.info("Semantic Search API Server")
    logger.info("=" * 60)
    
    try:
        init_service()
    except Exception as e:
        logger.error("Failed to start server")
        sys.exit(1)
    
    # Start server
    logger.info(f"Starting server on {args.host}:{args.port}")
    logger.info("=" * 60)
    logger.info("Available endpoints:")
    logger.info(f"  GET  http://{args.host}:{args.port}/health")
    logger.info(f"  POST http://{args.host}:{args.port}/search/text")
    logger.info(f"  POST http://{args.host}:{args.port}/search/image")
    logger.info(f"  POST http://{args.host}:{args.port}/search/refine")
    logger.info("=" * 60)
    
    app.run(
        host=args.host,
        port=args.port,
        debug=args.debug,
        threaded=True  # Enable multi-threading for concurrent requests
    )


if __name__ == '__main__':
    main()
