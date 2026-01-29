"""
Test search functions with SSH tunnel to OpenSearch.
Tests both text_search and image_search functionality.
Outputs detailed JSON logs for diagnostics.
"""
import os
import sys
import time
import yaml
import json
from pathlib import Path
from datetime import datetime
from sshtunnel import SSHTunnelForwarder
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Add parent to path
sys.path.append(str(Path(__file__).parent))

from unit_4_search_query.search_service import SearchQueryService


def setup_ssh_tunnel():
    """Setup SSH tunnel to OpenSearch."""
    ssh_key_path = os.path.expanduser(os.getenv('SSH_KEY_PATH', '~/.ssh/id_rsa'))
    
    tunnel = SSHTunnelForwarder(
        ('jumphost-sg.castlery.com', 22),
        ssh_username='autobots',
        ssh_pkey=ssh_key_path,
        remote_bind_address=(
            'vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com',
            443
        ),
        local_bind_address=('127.0.0.1', 9200)
    )
    tunnel.start()
    time.sleep(2)
    return tunnel


def test_text_search(search_service, results_data):
    """Test text search functionality."""
    print("\n" + "=" * 80)
    print("TEST 1: Text Search")
    print("=" * 80)
    
    test_queries = [
        # Filter Extraction Tests (Price + Attributes)
        "leather sectional sofa under $3000",
        "walnut dining table between $500 and $1500",
        "velvet armchair around $800",
        "marble coffee table over $1000",
        "grey fabric sofa under $2000",
        
        # Multi-Attribute Queries
        "modern minimalist oak bed frame",
        "traditional leather dining chairs with arms",
        "scandinavian white bookshelf with storage",
        "industrial metal bar stools black",
        "mid-century walnut nightstand with drawers",
        
        # Room-Based Queries
        "living room furniture modern grey under $5000",
        "bedroom set king size walnut",
        "outdoor patio furniture weather resistant",
        "home office desk with storage under $1000",
        
        # Abstract/Subjective Queries (LLM Fallback Triggers)
        "cozy reading chair for small spaces",
        "elegant dining set for formal occasions",
        "minimalist bedroom furniture calming neutral tones",
        "luxurious velvet sofa statement piece",
        
        # Complex Multi-Filter Queries
        "extendable dining table seats 6-8 people walnut or oak under $2000",
        "3-seater fabric sofa grey or beige modern style under $1500"
    ]
    
    text_search_results = []
    
    for idx, query in enumerate(test_queries, 1):
        query_start_time = time.time()
        timestamp = datetime.now().isoformat()
        
        print(f"\n[{idx}/{len(test_queries)}] Query: '{query}'")
        print("-" * 80)
        
        query_result = {
            "query_number": idx,
            "query": query,
            "timestamp": timestamp,
            "status": "pending"
        }
        
        try:
            result = search_service.get_text_results(query)
            query_time = (time.time() - query_start_time) * 1000
            
            if result.get('status') == 'success':
                print(f"✓ Status: {result['status']}")
                print(f"✓ Total results: {result.get('total_results', 0)}")
                print(f"✓ Query execution time: {query_time:.2f}ms")
                
                # Get top 10 results with complete metadata
                results = result.get('results', [])[:10]
                
                # Format results with all metadata
                formatted_results = []
                for rank, item in enumerate(results, 1):
                    formatted_results.append({
                        "rank": rank,
                        "variant_id": item.get('variant_id'),
                        "product_id": item.get('product_id', ''),
                        "variant_name": item.get('variant_name', ''),
                        "product_name": item.get('product_name', ''),
                        "description": item.get('description', ''),
                        "price": item.get('price', 0),
                        "currency": item.get('currency', 'SGD'),
                        "similarity_score": item.get('score', 0),
                        "frontend_category": item.get('frontend_category', ''),
                        "frontend_subcategory": item.get('frontend_subcategory', ''),
                        "backend_category": item.get('backend_category', ''),
                        "product_type": item.get('product_type', ''),
                        "material": item.get('material', ''),
                        "color_tone": item.get('color_tone', ''),
                        "collection": item.get('collection', ''),
                        "review_rating": item.get('review_rating', 0),
                        "review_count": item.get('review_count', 0),
                        "stock_status": item.get('stock_status', ''),
                        "variant_url": item.get('variant_url', ''),
                        "image_url": item.get('image_url', '')
                    })
                
                print(f"\nTop 3 results:")
                for i in range(min(3, len(formatted_results))):
                    item = formatted_results[i]
                    print(f"  {i+1}. {item['variant_name']}")
                    print(f"     Price: ${item['price']:.2f} {item['currency']}")
                    print(f"     Score: {item['similarity_score']:.4f}")
                    print(f"     Category: {item['frontend_category']}")
                
                # Get metadata
                metadata = result.get('search_metadata', {})
                print(f"\nMetadata:")
                print(f"  Search mode: {metadata.get('search_mode', 'N/A')}")
                print(f"  Filters applied: {metadata.get('filters_applied', {})}")
                print(f"  LLM fallback used: {metadata.get('llm_fallback_used', False)}")
                
                # Related tags
                tags = result.get('related_tags', [])
                if tags:
                    print(f"  Related tags: {', '.join([t['tag'] for t in tags[:5]])}")
                
                query_result.update({
                    "status": "success",
                    "total_results": result.get('total_results', 0),
                    "query_execution_time_ms": query_time,
                    "top_10_results": formatted_results,
                    "search_metadata": {
                        "search_mode": metadata.get('search_mode', ''),
                        "filters_applied": metadata.get('filters_applied', {}),
                        "llm_fallback_used": metadata.get('llm_fallback_used', False),
                        "enhanced_query": metadata.get('enhanced_query', None),
                        "response_time_ms": metadata.get('response_time_ms', 0)
                    },
                    "related_tags": tags
                })
                
            else:
                error_msg = result.get('message', 'Unknown error')
                print(f"✗ Error: {error_msg}")
                query_result.update({
                    "status": "error",
                    "error_message": error_msg,
                    "error_code": result.get('error_code', 'UNKNOWN'),
                    "query_execution_time_ms": query_time
                })
                
        except Exception as e:
            error_msg = str(e)
            print(f"✗ Exception: {error_msg}")
            query_result.update({
                "status": "exception",
                "error_message": error_msg,
                "query_execution_time_ms": (time.time() - query_start_time) * 1000
            })
        
        text_search_results.append(query_result)
    
    results_data["text_search"] = text_search_results


def test_image_search(search_service, results_data):
    """Test image search functionality."""
    print("\n" + "=" * 80)
    print("TEST 2: Image Search")
    print("=" * 80)
    
    # Try to find a test image
    test_image_path = Path('../data/active_only/image_base64/batch1/images_base64_batch_001.csv')
    
    if not test_image_path.exists():
        msg = "✗ Test image file not found, skipping image search test"
        print(msg)
        results_data["image_search"] = {
            "status": "skipped",
            "message": msg
        }
        return
    
    try:
        # Read first image from CSV
        import pandas as pd
        df = pd.read_csv(test_image_path)
        
        if len(df) == 0:
            msg = "✗ No images in test file"
            print(msg)
            results_data["image_search"] = {
                "status": "skipped",
                "message": msg
            }
            return
        
        # Get first image
        first_row = df.iloc[0]
        image_base64 = first_row['image_base64']
        variant_id = first_row['variant_id']
        
        query_start_time = time.time()
        timestamp = datetime.now().isoformat()
        
        print(f"\nSearching with image from variant_id: {variant_id}")
        print(f"Timestamp: {timestamp}")
        print("-" * 80)
        
        result = search_service.get_image_match_result(image_base64)
        query_time = (time.time() - query_start_time) * 1000
        
        if result.get('status') == 'success':
            print(f"✓ Status: {result['status']}")
            print(f"✓ Total results: {result.get('total_results', 0)}")
            print(f"✓ Query execution time: {query_time:.2f}ms")
            
            # Get top 10 results with complete metadata
            results = result.get('results', [])[:10]
            
            # Format results with all metadata
            formatted_results = []
            for rank, item in enumerate(results, 1):
                formatted_results.append({
                    "rank": rank,
                    "variant_id": item.get('variant_id'),
                    "product_id": item.get('product_id', ''),
                    "variant_name": item.get('variant_name', ''),
                    "product_name": item.get('product_name', ''),
                    "description": item.get('description', ''),
                    "price": item.get('price', 0),
                    "currency": item.get('currency', 'SGD'),
                    "similarity_score": item.get('score', 0),
                    "image_url": item.get('image_url', ''),
                    "image_type": item.get('image_type', ''),
                    "image_position": item.get('image_position', 1),
                    "is_default": item.get('is_default', False),
                    "frontend_category": item.get('frontend_category', ''),
                    "frontend_subcategory": item.get('frontend_subcategory', ''),
                    "backend_category": item.get('backend_category', ''),
                    "product_type": item.get('product_type', ''),
                    "material": item.get('material', ''),
                    "color_tone": item.get('color_tone', ''),
                    "collection": item.get('collection', ''),
                    "review_rating": item.get('review_rating', 0),
                    "review_count": item.get('review_count', 0),
                    "stock_status": item.get('stock_status', ''),
                    "variant_url": item.get('variant_url', '')
                })
            
            print(f"\nTop 3 results:")
            for i in range(min(3, len(formatted_results))):
                item = formatted_results[i]
                print(f"  {i+1}. {item['variant_name']}")
                print(f"     Variant ID: {item['variant_id']}")
                print(f"     Price: ${item['price']:.2f} {item['currency']}")
                print(f"     Score: {item['similarity_score']:.4f}")
                print(f"     Category: {item['frontend_category']}")
            
            # Check metadata
            metadata = result.get('search_metadata', {})
            print(f"\nMetadata:")
            print(f"  Search type: {metadata.get('search_type', 'N/A')}")
            
            results_data["image_search"] = {
                "status": "success",
                "source_variant_id": str(variant_id),
                "timestamp": timestamp,
                "total_results": result.get('total_results', 0),
                "query_execution_time_ms": query_time,
                "top_10_results": formatted_results,
                "search_metadata": {
                    "search_type": metadata.get('search_type', ''),
                    "response_time_ms": metadata.get('response_time_ms', 0)
                }
            }
            
        else:
            error_msg = result.get('message', 'Unknown error')
            print(f"✗ Error: {error_msg}")
            results_data["image_search"] = {
                "status": "error",
                "error_message": error_msg,
                "error_code": result.get('error_code', 'UNKNOWN'),
                "query_execution_time_ms": query_time
            }
            
    except Exception as e:
        error_msg = str(e)
        print(f"✗ Exception: {error_msg}")
        results_data["image_search"] = {
            "status": "exception",
            "error_message": error_msg
        }


def main():
    """Main test runner."""
    # Create logs directory if it doesn't exist
    logs_dir = Path(__file__).parent / 'unit_4_search_query' / 'logs'
    logs_dir.mkdir(parents=True, exist_ok=True)
    
    # Create log file with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    json_log_path = logs_dir / f'test_results_{timestamp}.json'
    
    print("=" * 80)
    print("SEARCH FUNCTIONS TEST")
    print("=" * 80)
    print(f"JSON log file: {json_log_path}")
    
    # Initialize results data structure
    results_data = {
        "test_session": {
            "start_time": datetime.now().isoformat(),
            "test_type": "search_functions_diagnostic",
            "log_file": str(json_log_path)
        },
        "text_search": [],
        "image_search": {}
    }
    
    # Load config
    config_path = Path(__file__).parent / 'config.yaml'
    with open(config_path, 'r') as f:
        config = yaml.safe_load(f)
    
    # Override OpenSearch config for SSH tunnel
    config['aws']['opensearch']['endpoint'] = 'https://127.0.0.1:9200'
    config['aws']['opensearch']['use_iam_auth'] = False
    config['aws']['opensearch']['verify_certs'] = False
    config['aws']['opensearch']['ssl_show_warn'] = False
    
    # Setup SSH tunnel
    print("\nSetting up SSH tunnel...")
    tunnel = setup_ssh_tunnel()
    
    try:
        # Initialize search service
        print("Initializing search service...")
        search_service = SearchQueryService(config)
        print("✓ Search service initialized\n")
        
        # Run tests
        test_text_search(search_service, results_data)
        test_image_search(search_service, results_data)
        
        # Add end time
        results_data["test_session"]["end_time"] = datetime.now().isoformat()
        
        # Calculate summary statistics
        text_results = results_data.get("text_search", [])
        successful_queries = [r for r in text_results if r.get("status") == "success"]
        failed_queries = [r for r in text_results if r.get("status") != "success"]
        
        avg_query_time = sum(r.get("query_execution_time_ms", 0) for r in successful_queries) / len(successful_queries) if successful_queries else 0
        
        results_data["test_session"]["summary"] = {
            "total_text_queries": len(text_results),
            "successful_queries": len(successful_queries),
            "failed_queries": len(failed_queries),
            "average_query_time_ms": round(avg_query_time, 2),
            "image_search_status": results_data.get("image_search", {}).get("status", "unknown")
        }
        
        # Write JSON log
        with open(json_log_path, 'w') as f:
            json.dump(results_data, f, indent=2)
        
        print("\n" + "=" * 80)
        print("TESTS COMPLETE")
        print("=" * 80)
        print(f"Results saved to: {json_log_path}")
        print(f"\nSummary:")
        print(f"  Total queries: {len(text_results)}")
        print(f"  Successful: {len(successful_queries)}")
        print(f"  Failed: {len(failed_queries)}")
        print(f"  Average query time: {avg_query_time:.2f}ms")
        
    except Exception as e:
        print(f"\n✗ Fatal error: {str(e)}")
        results_data["test_session"]["fatal_error"] = str(e)
        results_data["test_session"]["end_time"] = datetime.now().isoformat()
        
        # Still write the JSON log with error info
        with open(json_log_path, 'w') as f:
            json.dump(results_data, f, indent=2)
        
        import traceback
        traceback.print_exc()
        
    finally:
        print("\nClosing SSH tunnel...")
        tunnel.stop()
        print("✓ Tunnel closed")


if __name__ == '__main__':
    main()
