#!/usr/bin/env python3
"""Check available Bedrock models in your region"""

import os
import boto3
import json
import yaml
from pathlib import Path
from dotenv import load_dotenv

# Clear conflicting env vars
for key in list(os.environ.keys()):
    if key.startswith('AWS_'):
        del os.environ[key]

# Load .env
env_path = Path('.env')
if env_path.exists():
    load_dotenv(env_path, override=True)

# Load config to get Bedrock region
config_path = Path('config.yaml')
if config_path.exists():
    with open(config_path) as f:
        config = yaml.safe_load(f)
    BEDROCK_REGION = config.get('aws', {}).get('bedrock_region', 'us-east-1')
else:
    BEDROCK_REGION = 'us-east-1'

print(f"Checking Bedrock models in region: {BEDROCK_REGION}")
print("=" * 70)

try:
    # Try bedrock-runtime first (doesn't need ListFoundationModels permission)
    bedrock_runtime = boto3.client('bedrock-runtime', region_name=BEDROCK_REGION)
    
    # Test Amazon Titan embedding model IDs only
    test_models = [
        'amazon.titan-embed-text-v2:0',
        'amazon.titan-embed-image-v1',
    ]
    
    print("\nTesting Amazon Titan embedding models:")
    print("-" * 70)
    
    working_models = []
    
    for model_id in test_models:
        try:
            # Handle different input formats for text vs image models
            if 'image' in model_id:
                # Test image model with a minimal 1x1 pixel PNG
                # This is a base64-encoded 1x1 transparent PNG
                minimal_png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                body = json.dumps({"inputImage": minimal_png})
            else:
                body = json.dumps({"inputText": "test"})
            
            response = bedrock_runtime.invoke_model(
                modelId=model_id,
                body=body,
                contentType='application/json',
                accept='application/json'
            )
            
            result = json.loads(response['body'].read())
            if 'embedding' in result:
                dim = len(result['embedding'])
                model_type = "Image" if 'image' in model_id else "Text"
                print(f"✓ {model_id:45} [Working - {dim}D {model_type}]")
                working_models.append((model_id, dim))
            else:
                print(f"? {model_id:45} [Unknown response format]")
                
        except Exception as e:
            error_msg = str(e)
            if 'ValidationException' in error_msg:
                print(f"❌ {model_id:45} [Not available]")
            elif 'AccessDeniedException' in error_msg:
                print(f"🔒 {model_id:45} [No access - enable in console]")
            else:
                print(f"❌ {model_id:45} [{error_msg[:30]}...]")
    
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    
    if working_models:
        print(f"\n✓ Found {len(working_models)} working embedding model(s):")
        for model_id, dim in working_models:
            print(f"  - {model_id} ({dim} dimensions)")
        
        print(f"\n📝 Recommended model to use:")
        print(f"   {working_models[0][0]}")
        
    else:
        print("\n❌ No embedding models are currently accessible.")
        print("\nTo enable Bedrock models:")
        print("1. Go to AWS Console → Bedrock → Model access")
        print("2. Click 'Manage model access'")
        print("3. Enable: Amazon Titan Embeddings G1 - Text")
        print("4. Wait 5-10 minutes for access to be granted")
        print(f"\nDirect link: https://console.aws.amazon.com/bedrock/home?region={BEDROCK_REGION}#/modelaccess")
    
    # Also try to list models if permission exists
    print("\n" + "=" * 70)
    print("Attempting to list all available models...")
    print("=" * 70)
    
    try:
        bedrock = boto3.client('bedrock', region_name=BEDROCK_REGION)
        response = bedrock.list_foundation_models()
        
        print(f"\n✓ Found {len(response['modelSummaries'])} total models")
        
        # Filter Amazon Titan embedding models only
        embedding_models = [
            m for m in response['modelSummaries'] 
            if 'embed' in m['modelId'].lower() and 'amazon' in m.get('providerName', '').lower()
        ]
        
        if embedding_models:
            print(f"\nAmazon Titan embedding models available:")
            for model in embedding_models:
                print(f"  - {model['modelId']}")
                print(f"    Provider: {model.get('providerName', 'N/A')}")
                print(f"    Status: {model.get('modelLifecycle', {}).get('status', 'N/A')}")
        
    except Exception as e:
        if 'AccessDenied' in str(e):
            print("\n⚠️  No permission to list models (this is OK)")
            print("   The invoke test above is sufficient")
        else:
            print(f"\n⚠️  Could not list models: {str(e)}")

except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    print("\nMake sure:")
    print("1. AWS credentials are configured")
    print("2. You have bedrock:InvokeModel permission")
    print("3. Bedrock is available in your region")
