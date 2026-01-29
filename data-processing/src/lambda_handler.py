"""
AWS Lambda Handler for Search API
Provides serverless endpoints for text and image search.
"""

import json
import yaml
import logging
import os
from dotenv import load_dotenv
from unit_4_search_query.search_service import SearchQueryService

# Load environment variables (for local testing)
# In Lambda, environment variables are set in the Lambda configuration
if os.path.exists('.env'):
    load_dotenv()

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Load configuration
config = None
search_service = None


def load_config_with_env():
    """Load configuration from YAML and override with environment variables."""
    config_str = os.environ.get('SEARCH_CONFIG')
    if config_str:
        config = yaml.safe_load(config_str)
    else:
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
    
    return config


def init_service():
    """Initialize search service (called once per Lambda container)."""
    global config, search_service
    
    if search_service is None:
        config = load_config_with_env()
        search_service = SearchQueryService(config)
        logger.info("Search service initialized")


def lambda_handler(event, context):
    """
    Main Lambda handler for API Gateway requests.
    
    Expected event structure:
    {
        "httpMethod": "POST",
        "path": "/search/text" or "/search/image",
        "body": JSON string with query or image
    }
    """
    try:
        # Initialize service if needed
        init_service()
        
        # Parse request
        http_method = event.get('httpMethod', 'POST')
        path = event.get('path', '')
        body = json.loads(event.get('body', '{}'))
        
        logger.info(f"Request: {http_method} {path}")
        
        # Route to appropriate handler
        if path == '/search/text' or path == '/text':
            # Text search (includes Feature 5 LLM fallback & Feature 6 related tags)
            query = body.get('query', '')
            result = search_service.get_text_results(query)
            
        elif path == '/search/image' or path == '/image':
            # Image search
            image_base64 = body.get('image', '')
            result = search_service.get_image_match_result(image_base64)
        
        elif path == '/search/refine' or path == '/refine':
            # Feature 6: Refine search by tag
            original_query = body.get('original_query', '')
            tag = body.get('tag', '')
            tag_type = body.get('tag_type', 'category')
            result = search_service.refine_search_by_tag(original_query, tag, tag_type)
            
        else:
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'status': 'error',
                    'message': f'Unknown endpoint: {path}'
                })
            }
        
        # Return response
        status_code = 200 if result.get('status') == 'success' else 400
        
        return {
            'statusCode': status_code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'status': 'error',
                'error_code': 'INTERNAL_ERROR',
                'message': str(e)
            })
        }


# For local testing
if __name__ == '__main__':
    # Test text search
    test_event = {
        'httpMethod': 'POST',
        'path': '/search/text',
        'body': json.dumps({'query': 'grey sofa under $1000'})
    }
    
    response = lambda_handler(test_event, None)
    print(json.dumps(json.loads(response['body']), indent=2))
