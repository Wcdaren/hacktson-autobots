#!/usr/bin/env python3
"""
AWS Services Connectivity Test
Tests connectivity to all required AWS services.
"""

import os
import sys
import boto3
import json
import time
from pathlib import Path
from dotenv import load_dotenv

# Clear any conflicting AWS environment variables
print("Clearing any conflicting AWS environment variables...")
for key in list(os.environ.keys()):
    if key.startswith('AWS_'):
        del os.environ[key]
        print(f"  Cleared: {key}")

# Load .env file
env_path = Path('.env')
if env_path.exists():
    load_dotenv(env_path, override=True)
    print("\n✓ Loaded .env file\n")
else:
    print("\n❌ .env file not found")
    print("   Create it: cp .env.example .env\n")
    sys.exit(1)

# Configuration
AWS_REGION = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
S3_BUCKET = os.getenv('S3_BUCKET_NAME', 'your-bucket-name')
OPENSEARCH_ENDPOINT = 'https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com'
OPENSEARCH_USERNAME = os.getenv('OPENSEARCH_USERNAME')
OPENSEARCH_PASSWORD = os.getenv('OPENSEARCH_PASSWORD')
JUMPHOST = os.getenv('JUMPHOST', 'jumphost-sg.castlery.com')
JUMPHOST_USER = os.getenv('JUMPHOST_USER', 'ec2-user')
SSH_KEY_PATH = os.path.expanduser(os.getenv('SSH_KEY_PATH', '~/.ssh/id_rsa'))

print(f"Configuration:")
print(f"  AWS Region: {AWS_REGION}")
print(f"  S3 Bucket: {S3_BUCKET}")
print(f"  OpenSearch: {OPENSEARCH_ENDPOINT}")
print(f"  Jumphost: {JUMPHOST}")
print(f"  SSH Key: {SSH_KEY_PATH}")
print()

# Test 1: AWS Credentials
print("=" * 70)
print("TEST 1: AWS Credentials")
print("=" * 70)

try:
    sts = boto3.client('sts', region_name=AWS_REGION)
    identity = sts.get_caller_identity()
    
    print("✓ AWS Credentials Valid")
    print(f"  Account: {identity['Account']}")
    print(f"  User/Role: {identity['Arn']}")
    print()
    
except Exception as e:
    print(f"❌ AWS Credentials Failed: {str(e)}")
    print()
    sys.exit(1)

# Test 2: S3 Access
print("=" * 70)
print("TEST 2: S3 Access")
print("=" * 70)

try:
    s3 = boto3.client('s3', region_name=AWS_REGION)
    response = s3.list_buckets()
    
    print(f"✓ S3 Access Successful")
    print(f"  Total buckets: {len(response['Buckets'])}")
    
    bucket_names = [b['Name'] for b in response['Buckets']]
    if S3_BUCKET in bucket_names:
        print(f"  ✓ Bucket '{S3_BUCKET}' found")
        
        objects = s3.list_objects_v2(Bucket=S3_BUCKET, MaxKeys=5)
        if 'Contents' in objects:
            print(f"  ✓ Can list objects ({len(objects['Contents'])} files)")
            print(f"    Sample files:")
            for obj in objects['Contents'][:3]:
                print(f"      - {obj['Key']}")
    else:
        print(f"  ❌ Bucket '{S3_BUCKET}' not found")
    print()
        
except Exception as e:
    print(f"❌ S3 Access Failed: {str(e)}")
    print()

# Test 3: Bedrock Access
print("=" * 70)
print("TEST 3: Bedrock Access")
print("=" * 70)

try:
    bedrock = boto3.client('bedrock', region_name=AWS_REGION)
    response = bedrock.list_foundation_models()
    
    print(f"✓ Bedrock Access Successful")
    print(f"  Total models: {len(response['modelSummaries'])}")
    
    required_models = [
        'amazon.titan-embed-text-v2:0',
        'amazon.titan-embed-image-v1',
        'anthropic.claude-sonnet-4-5'
    ]
    
    for model_id in required_models:
        found = any(model_id in m['modelId'] for m in response['modelSummaries'])
        status = "✓" if found else "❌"
        print(f"  {status} {model_id}")
    print()
        
except Exception as e:
    print(f"❌ Bedrock Access Failed: {str(e)}")
    print()

# Test 4: Bedrock Runtime (Generate Embedding)
print("=" * 70)
print("TEST 4: Bedrock Runtime (Generate Text Embedding)")
print("=" * 70)

try:
    # Use us-east-1 for Bedrock (Titan models not available in ap-southeast-1)
    bedrock_region = 'us-east-1'
    bedrock_runtime = boto3.client('bedrock-runtime', region_name=bedrock_region)
    
    test_text = "grey sofa under $1000"
    body = json.dumps({"inputText": test_text})
    
    # Use Titan Text Embeddings V2 (1024D)
    response = bedrock_runtime.invoke_model(
        modelId='amazon.titan-embed-text-v2:0',
        body=body,
        contentType='application/json',
        accept='application/json'
    )
    
    result = json.loads(response['body'].read())
    embedding = result['embedding']
    
    print(f"✓ Bedrock Text Embedding Successful")
    print(f"  Region: {bedrock_region}")
    print(f"  Model: amazon.titan-embed-text-v2:0")
    print(f"  Test text: '{test_text}'")
    print(f"  Embedding dimension: {len(embedding)}")
    print(f"  Sample values: {embedding[:3]}...")
    print()
    
except Exception as e:
    print(f"❌ Bedrock Text Embedding Failed: {str(e)}")
    print(f"  Note: Titan models are in us-east-1, not {AWS_REGION}")
    print()

# Test 5: SSH Connection
print("=" * 70)
print("TEST 5: SSH Connection to Jumphost")
print("=" * 70)

try:
    import paramiko
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    print(f"Connecting to {JUMPHOST_USER}@{JUMPHOST}...")
    ssh.connect(
        hostname=JUMPHOST,
        username=JUMPHOST_USER,
        key_filename=SSH_KEY_PATH,
        timeout=10
    )
    
    print("✓ SSH Connection Successful")
    
    stdin, stdout, stderr = ssh.exec_command('hostname')
    hostname = stdout.read().decode().strip()
    print(f"  Jumphost hostname: {hostname}")
    print()
    
    ssh.close()
    
except FileNotFoundError:
    print(f"❌ SSH Key not found: {SSH_KEY_PATH}")
    print()
except Exception as e:
    print(f"❌ SSH Connection Failed: {str(e)}")
    print()

# Test 6: OpenSearch via SSH Tunnel
print("=" * 70)
print("TEST 6: OpenSearch via SSH Tunnel")
print("=" * 70)

try:
    from sshtunnel import SSHTunnelForwarder
    from opensearchpy import OpenSearch
    
    opensearch_host = OPENSEARCH_ENDPOINT.replace('https://', '').replace('http://', '')
    opensearch_port = 443
    
    print(f"Creating SSH tunnel to {opensearch_host}:{opensearch_port}...")
    
    tunnel = SSHTunnelForwarder(
        (JUMPHOST, 22),
        ssh_username=JUMPHOST_USER,
        ssh_pkey=SSH_KEY_PATH,
        remote_bind_address=(opensearch_host, opensearch_port),
        local_bind_address=('127.0.0.1', 9200)
    )
    
    tunnel.start()
    print(f"✓ SSH Tunnel established (local port: {tunnel.local_bind_port})")
    
    time.sleep(2)
    
    client = OpenSearch(
        hosts=[{'host': '127.0.0.1', 'port': tunnel.local_bind_port}],
        http_auth=(OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD),
        use_ssl=True,
        verify_certs=False,
        ssl_show_warn=False
    )
    
    info = client.info()
    print(f"✓ OpenSearch Connection Successful")
    print(f"  Cluster: {info['cluster_name']}")
    print(f"  Version: {info['version']['number']}")
    
    indices = client.cat.indices(format='json')
    print(f"  Total indices: {len(indices)}")
    if indices:
        print(f"  Sample indices:")
        for idx in indices[:3]:
            print(f"    - {idx['index']} ({idx['docs.count']} docs)")
    print()
    
    tunnel.stop()
    print("✓ SSH Tunnel closed")
    print()
    
except Exception as e:
    print(f"❌ OpenSearch Connection Failed: {str(e)}")
    print()

# Summary
print("=" * 70)
print("CONNECTIVITY TEST SUMMARY")
print("=" * 70)
print()
print("Review the output above:")
print("  ✓ = Success")
print("  ❌ = Failed")
print()
print("If all tests pass, you're ready to run the pipeline!")
print()
print("Next steps:")
print("  python pipeline.py")
print()
