#!/usr/bin/env python3
"""Test Cohere embedding models"""

import os
import boto3
import json
from pathlib import Path
from dotenv import load_dotenv

# Clear conflicting env vars
for key in list(os.environ.keys()):
    if key.startswith('AWS_'):
        del os.environ[key]

# Load .env
env_path = Path('.env')
load_dotenv(env_path, override=True)

AWS_REGION = os.getenv('AWS_DEFAULT_REGION', 'ap-southeast-1')
bedrock_runtime = boto3.client('bedrock-runtime', region_name=AWS_REGION)

print("Testing Cohere Embed V4 (latest model)")
print("=" * 70)

try:
    test_text = "grey sofa under $1000"
    
    # Cohere Embed V4 request format
    body = json.dumps({
        "texts": [test_text],
        "input_type": "search_document",
        "embedding_types": ["float"]
    })
    
    response = bedrock_runtime.invoke_model(
        modelId='cohere.embed-v4:0',
        body=body,
        contentType='application/json',
        accept='application/json'
    )
    
    result = json.loads(response['body'].read())
    
    if 'embeddings' in result and 'float' in result['embeddings']:
        embeddings = result['embeddings']['float']
        if embeddings and len(embeddings) > 0:
            embedding = embeddings[0]
            print(f"✓ Cohere Embed V4 Working!")
            print(f"  Model: cohere.embed-v4:0")
            print(f"  Test text: '{test_text}'")
            print(f"  Embedding dimension: {len(embedding)}")
            print(f"  Sample values: {embedding[:3]}...")
            print()
            print("✅ SUCCESS! Use this model in your config.yaml")
            print()
            print("Update config.yaml:")
            print("  text_embedding_model: cohere.embed-v4:0")
            print("  text_embedding_dimension: 1024")
        else:
            print("❌ Empty embeddings returned")
    else:
        print(f"❌ Unexpected response format: {result}")
        
except Exception as e:
    print(f"❌ Failed: {str(e)}")
    print()
    
    # Try Cohere V3 as fallback
    print("\nTrying Cohere Embed English V3 (fallback)...")
    print("-" * 70)
    
    try:
        body = json.dumps({
            "texts": [test_text],
            "input_type": "search_document"
        })
        
        response = bedrock_runtime.invoke_model(
            modelId='cohere.embed-english-v3',
            body=body,
            contentType='application/json',
            accept='application/json'
        )
        
        result = json.loads(response['body'].read())
        
        if 'embeddings' in result and len(result['embeddings']) > 0:
            embedding = result['embeddings'][0]
            print(f"✓ Cohere Embed English V3 Working!")
            print(f"  Model: cohere.embed-english-v3")
            print(f"  Test text: '{test_text}'")
            print(f"  Embedding dimension: {len(embedding)}")
            print(f"  Sample values: {embedding[:3]}...")
            print()
            print("✅ SUCCESS! Use this model in your config.yaml")
            print()
            print("Update config.yaml:")
            print("  text_embedding_model: cohere.embed-english-v3")
            print("  text_embedding_dimension: 1024")
        else:
            print(f"❌ Unexpected response format: {result}")
            
    except Exception as e2:
        print(f"❌ Also failed: {str(e2)}")
