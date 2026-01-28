#!/usr/bin/env python3
"""Test that region configuration is working correctly"""

import os
import yaml
import boto3
from pathlib import Path
from dotenv import load_dotenv

# Clear and load env
for key in list(os.environ.keys()):
    if key.startswith('AWS_'):
        del os.environ[key]
load_dotenv(Path('.env'), override=True)

# Load config
with open('config.yaml', 'r') as f:
    config = yaml.safe_load(f)

print("=" * 70)
print("REGION CONFIGURATION TEST")
print("=" * 70)
print()

# Check config
print("Config.yaml settings:")
print(f"  aws.region: {config['aws']['region']}")
print(f"  aws.bedrock_region: {config['aws'].get('bedrock_region', 'NOT SET')}")
print()

# Test S3 (should use ap-southeast-1)
print("Testing S3 (should use ap-southeast-1):")
print("-" * 70)
s3_region = config['aws']['region']
s3_client = boto3.client('s3', region_name=s3_region)
try:
    response = s3_client.list_buckets()
    print(f"✓ S3 client created with region: {s3_region}")
    print(f"  Found {len(response['Buckets'])} buckets")
except Exception as e:
    print(f"❌ S3 failed: {e}")
print()

# Test Bedrock (should use us-east-1)
print("Testing Bedrock (should use us-east-1):")
print("-" * 70)
bedrock_region = config['aws'].get('bedrock_region', config['aws']['region'])
bedrock_client = boto3.client('bedrock-runtime', region_name=bedrock_region)
try:
    import json
    body = json.dumps({"inputText": "test"})
    response = bedrock_client.invoke_model(
        modelId='amazon.titan-embed-text-v2:0',
        body=body,
        contentType='application/json',
        accept='application/json'
    )
    result = json.loads(response['body'].read())
    embedding = result['embedding']
    print(f"✓ Bedrock client created with region: {bedrock_region}")
    print(f"  Model: amazon.titan-embed-text-v2:0")
    print(f"  Embedding dimension: {len(embedding)}")
except Exception as e:
    print(f"❌ Bedrock failed: {e}")
print()

# Test service initialization
print("Testing Service Initialization:")
print("-" * 70)

# Test embedding service
try:
    import sys
    sys.path.insert(0, '.')
    from unit_2_embedding_generation.embedding_service import EmbeddingService
    
    service = EmbeddingService(config)
    # Check which region the client is using
    print(f"✓ EmbeddingService initialized")
    print(f"  Bedrock client region: {service.bedrock_client.meta.region_name}")
    
    # Test actual embedding
    test_embedding = service.generate_text_embedding("test sofa")
    print(f"  Generated test embedding: {len(test_embedding)}D")
    
except Exception as e:
    print(f"❌ EmbeddingService failed: {e}")
print()

print("=" * 70)
print("SUMMARY")
print("=" * 70)
print()
print("Expected configuration:")
print("  S3: ap-southeast-1")
print("  Bedrock: us-east-1")
print("  OpenSearch: ap-southeast-1")
print()
print("If all tests passed, your multi-region setup is working correctly!")
