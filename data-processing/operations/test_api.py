"""
Test script for deployed search API.
Tests both text and image search endpoints.
"""

import requests
import json
import base64
import sys
import time
from pathlib import Path


def test_text_search(api_endpoint: str):
    """Test text search endpoint."""
    print("\n" + "=" * 60)
    print("Testing Text Search API")
    print("=" * 60)
    
    test_queries = [
        "grey sofa under $1000",
        "wooden dining table",
        "comfortable bed",
        "modern chair",
        "leather sofa"
    ]
    
    for query in test_queries:
        print(f"\nQuery: {query}")
        
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{api_endpoint}/search/text",
                headers={'Content-Type': 'application/json'},
                json={'query': query},
                timeout=10
            )
            
            elapsed_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                result = response.json()
                
                if result['status'] == 'success':
                    print(f"✓ Success: {result['total_results']} results")
                    print(f"  Response time: {elapsed_time:.0f}ms")
                    print(f"  Search mode: {result['search_metadata']['search_mode']}")
                    print(f"  Filters: {result['search_metadata']['filters_applied']}")
                    
                    if result['results']:
                        top_result = result['results'][0]
                        print(f"  Top result: {top_result['product_name']} (${top_result['price']})")
                        print(f"  Score: {top_result['score']}")
                else:
                    print(f"✗ Error: {result.get('message', 'Unknown error')}")
            else:
                print(f"✗ HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            print(f"✗ Exception: {str(e)}")


def test_image_search(api_endpoint: str, image_path: str = None):
    """Test image search endpoint."""
    print("\n" + "=" * 60)
    print("Testing Image Search API")
    print("=" * 60)
    
    if not image_path:
        print("⚠ No image provided, skipping image search test")
        print("  Usage: python test_api.py <api_endpoint> <image_path>")
        return
    
    if not Path(image_path).exists():
        print(f"✗ Image file not found: {image_path}")
        return
    
    print(f"\nImage: {image_path}")
    
    try:
        # Read and encode image
        with open(image_path, 'rb') as f:
            image_bytes = f.read()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        start_time = time.time()
        
        response = requests.post(
            f"{api_endpoint}/search/image",
            headers={'Content-Type': 'application/json'},
            json={'image': image_base64},
            timeout=30
        )
        
        elapsed_time = (time.time() - start_time) * 1000
        
        if response.status_code == 200:
            result = response.json()
            
            if result['status'] == 'success':
                print(f"✓ Success: {result['total_results']} results")
                print(f"  Response time: {elapsed_time:.0f}ms")
                
                if result['results']:
                    top_result = result['results'][0]
                    print(f"  Top result: {top_result['product_name']} (${top_result['price']})")
                    print(f"  Score: {top_result['score']}")
                    print(f"  Image: {top_result['image_url']}")
            else:
                print(f"✗ Error: {result.get('message', 'Unknown error')}")
        else:
            print(f"✗ HTTP {response.status_code}: {response.text}")
            
    except Exception as e:
        print(f"✗ Exception: {str(e)}")


def test_error_handling(api_endpoint: str):
    """Test error handling."""
    print("\n" + "=" * 60)
    print("Testing Error Handling")
    print("=" * 60)
    
    # Test empty query
    print("\nTest: Empty query")
    try:
        response = requests.post(
            f"{api_endpoint}/search/text",
            headers={'Content-Type': 'application/json'},
            json={'query': ''},
            timeout=10
        )
        
        result = response.json()
        if result.get('error_code') == 'EMPTY_QUERY':
            print("✓ Empty query error handled correctly")
        else:
            print(f"✗ Unexpected response: {result}")
    except Exception as e:
        print(f"✗ Exception: {str(e)}")
    
    # Test invalid image
    print("\nTest: Invalid image format")
    try:
        response = requests.post(
            f"{api_endpoint}/search/image",
            headers={'Content-Type': 'application/json'},
            json={'image': 'invalid_base64'},
            timeout=10
        )
        
        result = response.json()
        if result.get('error_code') in ['INVALID_IMAGE', 'SEARCH_FAILED']:
            print("✓ Invalid image error handled correctly")
        else:
            print(f"✗ Unexpected response: {result}")
    except Exception as e:
        print(f"✗ Exception: {str(e)}")


def test_performance(api_endpoint: str, num_requests: int = 10):
    """Test API performance."""
    print("\n" + "=" * 60)
    print(f"Testing Performance ({num_requests} requests)")
    print("=" * 60)
    
    query = "modern sofa"
    response_times = []
    
    for i in range(num_requests):
        start_time = time.time()
        
        try:
            response = requests.post(
                f"{api_endpoint}/search/text",
                headers={'Content-Type': 'application/json'},
                json={'query': query},
                timeout=10
            )
            
            elapsed_time = (time.time() - start_time) * 1000
            response_times.append(elapsed_time)
            
            print(f"  Request {i+1}: {elapsed_time:.0f}ms")
            
        except Exception as e:
            print(f"  Request {i+1}: Failed - {str(e)}")
    
    if response_times:
        avg_time = sum(response_times) / len(response_times)
        min_time = min(response_times)
        max_time = max(response_times)
        
        print(f"\nPerformance Summary:")
        print(f"  Average: {avg_time:.0f}ms")
        print(f"  Min: {min_time:.0f}ms")
        print(f"  Max: {max_time:.0f}ms")
        print(f"  Success rate: {len(response_times)}/{num_requests}")
        
        if avg_time < 3000:
            print("  ✓ Performance target met (<3s)")
        else:
            print("  ⚠ Performance target not met (>3s)")


def main():
    """Main test runner."""
    if len(sys.argv) < 2:
        print("Usage: python test_api.py <api_endpoint> [image_path]")
        print("\nExample:")
        print("  python test_api.py https://abc123.execute-api.us-east-1.amazonaws.com/dev")
        print("  python test_api.py https://abc123.execute-api.us-east-1.amazonaws.com/dev test_image.jpg")
        sys.exit(1)
    
    api_endpoint = sys.argv[1].rstrip('/')
    image_path = sys.argv[2] if len(sys.argv) > 2 else None
    
    print("=" * 60)
    print("Semantic Search API Test Suite")
    print("=" * 60)
    print(f"API Endpoint: {api_endpoint}")
    print("=" * 60)
    
    # Run tests
    test_text_search(api_endpoint)
    test_image_search(api_endpoint, image_path)
    test_error_handling(api_endpoint)
    test_performance(api_endpoint, num_requests=5)
    
    print("\n" + "=" * 60)
    print("Test Suite Complete")
    print("=" * 60)


if __name__ == '__main__':
    main()
