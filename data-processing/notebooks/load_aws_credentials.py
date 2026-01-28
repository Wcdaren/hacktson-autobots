"""
Helper module to load AWS credentials for notebooks.
Import this at the start of your notebook to ensure credentials are loaded.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv

def load_credentials():
    """Load AWS credentials from operations/.env file"""
    
    # Get the path to operations/.env (one level up from notebooks)
    notebook_dir = Path(__file__).parent
    env_path = notebook_dir.parent / 'operations' / '.env'
    
    if not env_path.exists():
        print(f"❌ .env file not found at {env_path}")
        print("   Create it: cp operations/.env.example operations/.env")
        return False
    
    # Load the .env file
    load_dotenv(env_path, override=True)
    
    # Verify credentials are loaded
    access_key = os.getenv('AWS_ACCESS_KEY_ID')
    secret_key = os.getenv('AWS_SECRET_ACCESS_KEY')
    region = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
    
    if not access_key or not secret_key:
        print("❌ AWS credentials not found in .env file")
        return False
    
    print("✓ AWS credentials loaded successfully")
    print(f"  Access Key: {access_key[:20]}...")
    print(f"  Region: {region}")
    
    return True

# Auto-load when imported
if __name__ != "__main__":
    load_credentials()
