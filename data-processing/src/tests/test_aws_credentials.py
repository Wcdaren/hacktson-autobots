#!/usr/bin/env python3
"""Quick AWS credentials diagnostic script"""

import os
import boto3
from pathlib import Path
from dotenv import load_dotenv

# Load .env
env_path = Path('.env')
if env_path.exists():
    load_dotenv(env_path)
    print("✓ Loaded .env file\n")
else:
    print("❌ .env file not found\n")

# Display what's loaded
print("Environment Variables:")
print(f"  AWS_ACCESS_KEY_ID: {os.getenv('AWS_ACCESS_KEY_ID', 'NOT SET')[:20]}...")
print(f"  AWS_SECRET_ACCESS_KEY: {'SET' if os.getenv('AWS_SECRET_ACCESS_KEY') else 'NOT SET'}")
print(f"  AWS_DEFAULT_REGION: {os.getenv('AWS_DEFAULT_REGION', 'NOT SET')}")
print()

# Test 1: Check if boto3 can find credentials
print("Test 1: Boto3 Credential Detection")
print("=" * 60)
try:
    session = boto3.Session()
    credentials = session.get_credentials()
    
    if credentials:
        print("✓ Boto3 found credentials")
        print(f"  Access Key: {credentials.access_key[:20]}...")
        print(f"  Method: {credentials.method}")
    else:
        print("❌ Boto3 could not find credentials")
        print("\nTroubleshooting:")
        print("  1. Ensure .env file exists in operations/ folder")
        print("  2. Run: export AWS_ACCESS_KEY_ID=your_key")
        print("  3. Or configure: aws configure")
except Exception as e:
    print(f"❌ Error: {e}")

print()

# Test 2: Try to call AWS STS
print("Test 2: AWS STS GetCallerIdentity")
print("=" * 60)
try:
    sts = boto3.client('sts', region_name=os.getenv('AWS_DEFAULT_REGION', 'us-east-1'))
    identity = sts.get_caller_identity()
    
    print("✓ AWS API call successful!")
    print(f"  Account: {identity['Account']}")
    print(f"  User ARN: {identity['Arn']}")
    print(f"  User ID: {identity['UserId']}")
    
except boto3.exceptions.NoCredentialsError:
    print("❌ No credentials found")
    print("\nFix:")
    print("  Option 1: Set environment variables")
    print("    export AWS_ACCESS_KEY_ID=your_key")
    print("    export AWS_SECRET_ACCESS_KEY=your_secret")
    print("    export AWS_DEFAULT_REGION=ap-southeast-1")
    print()
    print("  Option 2: Use AWS CLI")
    print("    aws configure")
    
except boto3.exceptions.ClientError as e:
    error_code = e.response['Error']['Code']
    print(f"❌ AWS API Error: {error_code}")
    
    if error_code == 'InvalidClientTokenId':
        print("\nThe access key ID is invalid or doesn't exist")
        print("  - Check if the key is correct in .env")
        print("  - Verify the key is active in AWS IAM Console")
        
    elif error_code == 'SignatureDoesNotMatch':
        print("\nThe secret access key is incorrect")
        print("  - Check if the secret key is correct in .env")
        
    elif error_code == 'AccessDenied':
        print("\nThe credentials don't have permission")
        print("  - Check IAM policies for this user/role")
        
    else:
        print(f"\nError details: {e}")
        
except Exception as e:
    print(f"❌ Unexpected error: {e}")

print()

# Test 3: Check AWS CLI config (if exists)
print("Test 3: AWS CLI Configuration")
print("=" * 60)
aws_config = Path.home() / '.aws' / 'credentials'
if aws_config.exists():
    print(f"✓ AWS CLI config found at {aws_config}")
    print("  Note: boto3 will use this if env vars not set")
else:
    print("❌ No AWS CLI config found")
    print("  This is OK if using .env file")

print()
print("=" * 60)
print("DIAGNOSIS COMPLETE")
print("=" * 60)
