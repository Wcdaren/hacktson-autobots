#!/bin/bash

# Deployment script for Semantic Search System
# This script packages and deploys the Lambda functions

set -e

echo "=========================================="
echo "Semantic Search System - Deployment"
echo "=========================================="

# Configuration
STACK_NAME="semantic-search-stack"
ENVIRONMENT="dev"
S3_BUCKET=""
OPENSEARCH_ENDPOINT=""
AWS_REGION="us-east-1"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --bucket)
      S3_BUCKET="$2"
      shift 2
      ;;
    --opensearch)
      OPENSEARCH_ENDPOINT="$2"
      shift 2
      ;;
    --region)
      AWS_REGION="$2"
      shift 2
      ;;
    --environment)
      ENVIRONMENT="$2"
      shift 2
      ;;
    --stack-name)
      STACK_NAME="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

# Validate required parameters
if [ -z "$S3_BUCKET" ]; then
  echo "Error: --bucket parameter is required"
  echo "Usage: ./deploy.sh --bucket <s3-bucket> --opensearch <endpoint>"
  exit 1
fi

if [ -z "$OPENSEARCH_ENDPOINT" ]; then
  echo "Error: --opensearch parameter is required"
  echo "Usage: ./deploy.sh --bucket <s3-bucket> --opensearch <endpoint>"
  exit 1
fi

echo "Configuration:"
echo "  Stack Name: $STACK_NAME"
echo "  Environment: $ENVIRONMENT"
echo "  S3 Bucket: $S3_BUCKET"
echo "  OpenSearch: $OPENSEARCH_ENDPOINT"
echo "  Region: $AWS_REGION"
echo ""

# Load environment variables from .env file
if [ -f .env ]; then
  echo "Loading credentials from .env file..."
  export $(cat .env | grep -v '^#' | grep -v '^$' | xargs)
  echo "✓ Credentials loaded"
else
  echo "Warning: .env file not found. Credentials must be set manually in Lambda."
  echo "Create .env file from .env.example and add your credentials."
fi
echo ""

# Create deployment package
echo "Creating Lambda deployment package..."
rm -rf lambda_package lambda_package.zip
mkdir -p lambda_package

# Copy source code
cp -r unit_4_search_query lambda_package/
cp lambda_handler.py lambda_package/
cp config.yaml lambda_package/

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt -t lambda_package/ --quiet

# Create zip file
echo "Creating zip file..."
cd lambda_package
zip -r ../lambda_package.zip . -q
cd ..

echo "✓ Lambda package created: lambda_package.zip"
echo ""

# Deploy CloudFormation stack
echo "Deploying CloudFormation stack..."
aws cloudformation deploy \
  --template-file cloudformation_template.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides \
    S3BucketName=$S3_BUCKET \
    OpenSearchEndpoint=$OPENSEARCH_ENDPOINT \
    Environment=$ENVIRONMENT \
  --capabilities CAPABILITY_NAMED_IAM \
  --region $AWS_REGION

echo "✓ CloudFormation stack deployed"
echo ""

# Get Lambda function names
TEXT_FUNCTION=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs[?OutputKey=='TextSearchFunctionArn'].OutputValue" \
  --output text \
  --region $AWS_REGION | awk -F: '{print $NF}')

IMAGE_FUNCTION=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs[?OutputKey=='ImageSearchFunctionArn'].OutputValue" \
  --output text \
  --region $AWS_REGION | awk -F: '{print $NF}')

# Update Lambda functions with code
echo "Updating Lambda function code..."
aws lambda update-function-code \
  --function-name $TEXT_FUNCTION \
  --zip-file fileb://lambda_package.zip \
  --region $AWS_REGION \
  --no-cli-pager > /dev/null

aws lambda update-function-code \
  --function-name $IMAGE_FUNCTION \
  --zip-file fileb://lambda_package.zip \
  --region $AWS_REGION \
  --no-cli-pager > /dev/null

echo "✓ Lambda functions updated"
echo ""

# Update Lambda environment variables with credentials from .env
if [ -n "$OPENSEARCH_USERNAME" ] && [ -n "$OPENSEARCH_PASSWORD" ]; then
  echo "Setting Lambda environment variables..."
  
  # Prepare environment variables JSON
  ENV_VARS="{"
  ENV_VARS="${ENV_VARS}\"OPENSEARCH_USERNAME\":\"$OPENSEARCH_USERNAME\","
  ENV_VARS="${ENV_VARS}\"OPENSEARCH_PASSWORD\":\"$OPENSEARCH_PASSWORD\","
  ENV_VARS="${ENV_VARS}\"S3_BUCKET_NAME\":\"${S3_BUCKET_NAME:-$S3_BUCKET}\","
  ENV_VARS="${ENV_VARS}\"OPENSEARCH_ENDPOINT\":\"$OPENSEARCH_ENDPOINT\","
  ENV_VARS="${ENV_VARS}\"ENVIRONMENT\":\"$ENVIRONMENT\","
  ENV_VARS="${ENV_VARS}\"SEARCH_MODE\":\"hybrid\","
  ENV_VARS="${ENV_VARS}\"MAX_RESULTS\":\"50\""
  
  # Add optional feature flags if set
  if [ -n "$LLM_FALLBACK_ENABLED" ]; then
    ENV_VARS="${ENV_VARS},\"LLM_FALLBACK_ENABLED\":\"$LLM_FALLBACK_ENABLED\""
  fi
  
  if [ -n "$RELATED_TAGS_ENABLED" ]; then
    ENV_VARS="${ENV_VARS},\"RELATED_TAGS_ENABLED\":\"$RELATED_TAGS_ENABLED\""
  fi
  
  if [ -n "$SIMILARITY_THRESHOLD" ]; then
    ENV_VARS="${ENV_VARS},\"SIMILARITY_THRESHOLD\":\"$SIMILARITY_THRESHOLD\""
  fi
  
  ENV_VARS="${ENV_VARS}}"
  
  # Update text search function
  aws lambda update-function-configuration \
    --function-name $TEXT_FUNCTION \
    --environment "Variables=$ENV_VARS" \
    --region $AWS_REGION \
    --no-cli-pager > /dev/null
  
  # Update image search function
  aws lambda update-function-configuration \
    --function-name $IMAGE_FUNCTION \
    --environment "Variables=$ENV_VARS" \
    --region $AWS_REGION \
    --no-cli-pager > /dev/null
  
  echo "✓ Lambda environment variables configured"
  echo ""
else
  echo "Warning: OPENSEARCH_USERNAME or OPENSEARCH_PASSWORD not set in .env"
  echo "Lambda functions will not have credentials configured."
  echo ""
fi

# Get API endpoint
API_ENDPOINT=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs[?OutputKey=='APIEndpoint'].OutputValue" \
  --output text \
  --region $AWS_REGION)

echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo ""
echo "API Endpoints:"
echo "  Text Search: $API_ENDPOINT/search/text"
echo "  Image Search: $API_ENDPOINT/search/image"
echo ""
echo "Test with curl:"
echo "  curl -X POST $API_ENDPOINT/search/text \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"query\": \"grey sofa under \$1000\"}'"
echo ""
echo "=========================================="

# Cleanup
rm -rf lambda_package lambda_package.zip
