#!/usr/bin/env python3
"""
Test script to verify .env file loading and config override.
Run this to ensure credentials are properly loaded from environment.
"""

import os
import yaml
from pathlib import Path
from dotenv import load_dotenv

def test_env_loading():
    """Test that .env file is loaded and overrides config."""
    
    print("=" * 60)
    print("Testing Environment Variable Loading")
    print("=" * 60)
    print()
    
    # Check if .env file exists
    env_file = Path('.env')
    if not env_file.exists():
        print("❌ ERROR: .env file not found!")
        print("   Create it from .env.example:")
        print("   cp .env.example .env")
        print()
        return False
    
    print("✓ .env file found")
    print()
    
    # Load .env file
    load_dotenv()
    print("✓ .env file loaded")
    print()
    
    # Check required environment variables
    print("Checking required environment variables:")
    print("-" * 60)
    
    required_vars = {
        'OPENSEARCH_USERNAME': 'OpenSearch username',
        'OPENSEARCH_PASSWORD': 'OpenSearch password',
        'S3_BUCKET_NAME': 'S3 bucket name'
    }
    
    all_present = True
    for var, description in required_vars.items():
        value = os.getenv(var)
        if value:
            # Mask password
            if 'PASSWORD' in var:
                display_value = '*' * len(value)
            else:
                display_value = value
            print(f"✓ {var}: {display_value}")
        else:
            print(f"❌ {var}: NOT SET")
            all_present = False
    
    print()
    
    # Check optional environment variables
    print("Checking optional environment variables:")
    print("-" * 60)
    
    optional_vars = {
        'LLM_FALLBACK_ENABLED': 'Enable LLM fallback',
        'RELATED_TAGS_ENABLED': 'Enable related tags',
        'SIMILARITY_THRESHOLD': 'Similarity threshold'
    }
    
    for var, description in optional_vars.items():
        value = os.getenv(var)
        if value:
            print(f"✓ {var}: {value}")
        else:
            print(f"  {var}: not set (will use default)")
    
    print()
    
    # Load config and test override
    print("Testing config override:")
    print("-" * 60)
    
    with open('config.yaml', 'r') as f:
        config = yaml.safe_load(f)
    
    print(f"Config before override:")
    print(f"  S3 bucket: {config['aws']['s3']['bucket']}")
    print(f"  OpenSearch username: {config['aws']['opensearch'].get('username', 'NOT SET')}")
    print(f"  OpenSearch password: {config['aws']['opensearch'].get('password', 'NOT SET')}")
    print()
    
    # Override with environment variables
    if os.getenv('S3_BUCKET_NAME'):
        config['aws']['s3']['bucket'] = os.getenv('S3_BUCKET_NAME')
    
    if os.getenv('OPENSEARCH_USERNAME'):
        config['aws']['opensearch']['username'] = os.getenv('OPENSEARCH_USERNAME')
    
    if os.getenv('OPENSEARCH_PASSWORD'):
        config['aws']['opensearch']['password'] = os.getenv('OPENSEARCH_PASSWORD')
    
    print(f"Config after override:")
    print(f"  S3 bucket: {config['aws']['s3']['bucket']}")
    print(f"  OpenSearch username: {config['aws']['opensearch'].get('username', 'NOT SET')}")
    password = config['aws']['opensearch'].get('password', 'NOT SET')
    print(f"  OpenSearch password: {'*' * len(password) if password != 'NOT SET' else 'NOT SET'}")
    print()
    
    # Final result
    print("=" * 60)
    if all_present:
        print("✅ SUCCESS: All required environment variables are set!")
        print("   You can now run pipeline.py or deploy.sh")
    else:
        print("❌ FAILURE: Some required environment variables are missing")
        print("   Edit .env file and add missing credentials")
    print("=" * 60)
    print()
    
    return all_present


if __name__ == '__main__':
    import sys
    success = test_env_loading()
    sys.exit(0 if success else 1)
