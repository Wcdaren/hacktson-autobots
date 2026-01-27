#!/bin/bash

# 🚀 Automated Medusa + Storefront Initialization Script
# 
# ⚠️  WARNING: This script will DELETE all existing data!
# 
# What it does:
# 1. Runs medusa:init (nukedb + migrate + seed + create users)
# 2. Extracts publishable key from database
# 3. Automatically configures storefront .env

set -e  # Exit on error

echo "🚀 Starting initialization..."
echo ""
echo "⚠️  WARNING: This will DELETE all existing data and start fresh!"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Initialize Medusa (includes nukedb)
echo "�️  Step 1/2: Initializing Medusa (nukedb + migrate + seed + create users)..."
echo "   This will run: yarn medusa:init"
echo ""

cd apps/medusa
if yarn medusa:init; then
    echo -e "${GREEN}✓ Medusa initialization completed${NC}"
else
    echo -e "${RED}✗ Medusa initialization failed${NC}"
    cd ../..
    exit 1
fi

cd ../..

# Step 2: Extract publishable key and configure storefront
echo ""
echo "🔑 Step 2/2: Configuring storefront..."

# Query database for publishable key
PUBLISHABLE_KEY=$(docker exec hacktson-autobots-postgres psql -U postgres -d hacktson-autobots -t -c "SELECT token FROM api_key WHERE type = 'publishable' LIMIT 1;" 2>/dev/null | xargs)

if [ -z "$PUBLISHABLE_KEY" ]; then
    echo -e "${RED}✗ Failed to extract publishable key from database${NC}"
    echo -e "${YELLOW}⚠ You may need to create an API key manually in the admin panel${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Publishable key extracted: ${PUBLISHABLE_KEY}${NC}"

STOREFRONT_ENV="apps/storefront/.env"

# Create or update .env file
cat > "$STOREFRONT_ENV" << EOF
MEDUSA_PUBLISHABLE_KEY='${PUBLISHABLE_KEY}'
PUBLIC_MEDUSA_API_URL='http://localhost:9000'
STOREFRONT_URL='http://localhost:3000'
STRIPE_PUBLIC_KEY='pk_'
STRIPE_SECRET_KEY='sk_'
EOF

echo -e "${GREEN}✓ Storefront .env configured${NC}"

# Success message
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Initialization complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "📝 Configuration:"
echo "   Publishable Key: ${PUBLISHABLE_KEY}"
echo ""
echo "🌐 Access URLs:"
echo "   Storefront:  http://localhost:3000"
echo "   Admin:       http://localhost:9000/app"
echo "   API:         http://localhost:9000"
echo ""
echo "🔐 Admin Credentials:"
echo "   Email:    admin@medusa.local.com"
echo "   Password: supersecret"
echo ""
echo "   Email:    admin@medusa.dev"
echo "   Password: password"
echo ""
echo "🚀 Next step: Run 'yarn dev' to start development"
echo ""
