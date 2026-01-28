#!/usr/bin/env python3
"""Test AWS credentials exactly as the notebook does"""

import os
import sys
import boto3
from pathlib import Path
from dotenv import load_dotenv

# Mimic notebook: Load .env from operations folder (one level up from notebooks)
env_path = Path('.env')  # We're running from operations/
if env_path.exists():
    load_dotenv(env_path)
    print("✓ Loaded .env file from operations/")
else:
    print("❌ .env file not found")
    sys.exit(1)

# Configuration
AWS_REGION = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')

print(f"\nEnvironment check:")
print(f"  AWS_ACCESS_KEY_ID: {os.getenv('AWS_ACCESS_KEY_ID', 'NOT SET')[:20]}...")
print(f"  AWS_SECRET_ACCESS_KEY: {'SET' if os.getenv('AWS_SECRET_ACCESS_KEY') else 'NOT SET'}")
print(f"  AWS_DEFAULT_REGION: {AWS_REGION}")
print()

print("Testing AWS Credentials...")
print("=" * 60)

try:
    sts = boto3.client('sts', region_name=AWS_REGION)
    identity = sts.get_caller_identity()
    
    print("✓ AWS Credentials Valid")
    print(f"  Account: {identity['Account']}")
    print(f"  User/Role: {identity['Arn']}")
    print()
    print("SUCCESS! Your notebook should work now.")
    
except Exception as e:
    print(f"❌ AWS Credentials Failed: {str(e)}")
    print()
    print("Troubleshooting:")
    print("  1. Close and reopen your terminal")
    print("  2. Make sure no AWS env vars are set: env | grep AWS")
    print("  3. Try running: source ~/.zshrc")
    sys.exit(1)
