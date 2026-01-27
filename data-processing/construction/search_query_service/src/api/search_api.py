"""Main API Functions for Search Service"""
from typing import Dict
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def get_text_results(user_search_string: str) -> Dict:
    """
    Main API function for text search.
    
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
        
        # Import here to avoid circular dependencies
        from application.text_search_service import TextSearchService
        
        # Execute search
        service = TextSearchService()
        result = service.execute(user_search_string)
        
        # Return success response
        return {
            "status": "success",
            "total_results": result.total_count,
            "results": result.to_json()["results"],
            "search_metadata": result.to_json()["search_metadata"]
        }
        
    except ValueError as e:
        if "Invalid image" in str(e):
            return {
                "status": "error",
                "error_code": "INVALID_IMAGE",
                "message": "invalid uploaded image format"
            }
        return {
            "status": "error",
            "error_code": "VALIDATION_ERROR",
            "message": str(e)
        }
    except Exception as e:
        print(f"Text search failed: {str(e)}")
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
    """
    try:
        from application.image_search_service import ImageSearchService
        
        service = ImageSearchService()
        result = service.execute(image_base64)
        
        return {
            "status": "success",
            "total_results": result.total_count,
            "results": result.to_json()["results"],
            "search_metadata": result.to_json()["search_metadata"]
        }
        
    except ValueError as e:
        if "Invalid image" in str(e):
            return {
                "status": "error",
                "error_code": "INVALID_IMAGE",
                "message": "invalid uploaded image format"
            }
        return {
            "status": "error",
            "error_code": "VALIDATION_ERROR",
            "message": str(e)
        }
    except Exception as e:
        print(f"Image search failed: {str(e)}")
        return {
            "status": "error",
            "error_code": "SEARCH_FAILED",
            "message": str(e)
        }
