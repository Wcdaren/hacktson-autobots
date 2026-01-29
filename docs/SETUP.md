# Setup Guide

Complete step-by-step guide to set up the Medusa 2 + Remix E-Commerce Platform from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configure AI Services](#configure-ai-services)
4. [Start Development](#start-development)
5. [Verify Setup](#verify-setup)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js 20+** - [Download](https://nodejs.org/)
- **Yarn 4.5.0** - Auto-installs when you run `yarn`
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
  - Must be running before setup
- **SSH Access** - For connecting to OpenSearch cluster
  - Ensure you have SSH key configured for `jumphost-sg.castlery.com`

### Required Accounts & Credentials

- **AWS Account** - For Bedrock (AI embeddings) and Rekognition (image search)
  - Access Key ID
  - Secret Access Key
  - Permissions for Bedrock and Rekognition services

### Optional

- **Stripe Account** - For payment processing (can be added later)
- **Production OpenSearch Access** - Only if you want to test with production data via SSH tunnel (Docker OpenSearch is included by default)

---

## Initial Setup

### Step 1: Clone and Install

```bash
# Clone repository
git clone <repository-url>
cd hacktson-autobots

# Install dependencies
yarn install
```

### Step 2: Start Docker Services

```bash
# Ensure Docker Desktop is running
docker ps

# Start PostgreSQL, Redis, and OpenSearch
cd apps/medusa
docker compose up -d
cd ../..

# Wait for services to start
sleep 10

# Verify containers are running
docker ps
# Should see: postgres, redis, and opensearch containers (opensearch should show "healthy")
```

### Step 3: Configure Environment Files

The `.env.template` files contain placeholders. You need to configure actual values.

#### Backend Configuration

```bash
cd apps/medusa

# Copy template
cp .env.template .env

# Edit .env and configure:
# 1. Database (already configured for local Docker)
# 2. Redis (already configured for local Docker)
# 3. AWS credentials (REQUIRED for AI features)
# 4. OpenSearch credentials (REQUIRED for search)
```

**Required Changes in `apps/medusa/.env`:**

```bash
# ===========================================
# AWS Configuration (REQUIRED)
# ===========================================
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY_HERE

# ===========================================
# Bedrock Configuration (REQUIRED)
# ===========================================
BEDROCK_REGION=us-east-1
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# ===========================================
# Rekognition (REQUIRED for image search)
# ===========================================
REKOGNITION_ENABLED=true

# ===========================================
# OpenSearch (REQUIRED for search)
# ===========================================
# Use local Docker OpenSearch (recommended for development)
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false

# Enable auto-sync
ENABLE_OPENSEARCH_SYNC=true
```

**⚠️ CRITICAL:** Without AWS credentials, the application will fail to start because:
- Product sync requires Bedrock for generating embeddings
- Search features require OpenSearch connection
- These are core features, not optional

---

## Configure AI Services

### Step 1: Test OpenSearch Connection

The Docker OpenSearch should already be running from Step 2.

```bash
# Test connection
curl http://localhost:9200/_cluster/health

# Should return JSON with "status":"green" or "status":"yellow"
```

**If connection fails:**
```bash
# Check container status
docker ps | grep opensearch

# Restart if needed
cd apps/medusa
docker compose up -d opensearch
cd ../..
```

### Step 2: Test AWS Bedrock Connection

```bash
# Still in apps/medusa directory
node test-bedrock.js
```

**Expected output:**
```
✅ Bedrock connection successful
✅ Generated embedding vector (1024 dimensions)
```

**If it fails:**
- Check AWS credentials in `.env`
- Verify IAM permissions for Bedrock
- Ensure `BEDROCK_REGION=us-east-1` (Bedrock is region-specific)

### Step 3: Verify OpenSearch Index

After starting Medusa, check that the OpenSearch index was created:

```bash
# Check if products index exists
curl http://localhost:9200/_cat/indices?v

# Should show: products index
```

---

## Start Development

### Step 1: Initialize Database

```bash
# From project root
yarn setup
```

**What this does:**
1. Deletes all existing data (nukedb)
2. Runs database migrations
3. Seeds sample products
4. Creates admin users
5. Extracts publishable key
6. Configures storefront `.env` automatically

**⚠️ WARNING:** This will DELETE all existing data!

**Expected output:**
```
✅ Medusa initialization completed
✅ Publishable key extracted: pk_xxxxx
✅ Storefront .env configured
✅ Initialization complete!
```

**Admin credentials created:**
- Email: `admin@medusa.local.com` / Password: `supersecret`
- Email: `admin@medusa.dev` / Password: `password`

### Step 2: Verify Storefront Configuration

```bash
# Check that publishable key was configured
cat apps/storefront/.env

# Should contain:
# MEDUSA_PUBLISHABLE_KEY='pk_xxxxx'
# PUBLIC_MEDUSA_API_URL='http://localhost:9000'
# STOREFRONT_URL='http://localhost:3000'
```

### Step 3: Start Development Servers

```bash
# Start all services
yarn dev

# Or start individually
yarn dev --filter=medusa      # Backend only (port 9000)
yarn dev --filter=storefront  # Frontend only (port 3000)
```

**Wait ~30 seconds for services to start.**

---

## Verify Setup

### 1. Check Backend Health

```bash
curl http://localhost:9000/health
# Should return: {"status":"ok"}
```

### 2. Access Admin Panel

Open: http://localhost:9000/app

Login with:
- Email: `admin@medusa.local.com`
- Password: `supersecret`

### 3. Access Storefront

Open: http://localhost:3000

You should see the storefront with products.

### 4. Test OpenSearch Sync

```bash
cd apps/medusa
node test-opensearch-sync.js
```

**Expected output:**
```
✅ OpenSearch connection successful
✅ Bedrock embeddings working
✅ Products indexed successfully
```

### 5. Check Medusa Logs

Look for successful product sync messages:
```
Successfully synced product prod_xxx to OpenSearch
```

**If you see errors:**
```
Failed to sync product prod_xxx to OpenSearch: [error]
```

See [Troubleshooting](#troubleshooting) section.

---

## Troubleshooting

### Issue 1: Docker Containers Won't Start

```bash
# Check Docker Desktop is running
docker ps

# If containers are not running
cd apps/medusa
docker compose down
docker compose up -d

# Check logs
docker logs hacktson-autobots-postgres
docker logs hacktson-autobots-redis
```

### Issue 2: Database Connection Failed

**Symptoms:** `yarn setup` fails with database connection error

**Solution:**
```bash
# Ensure Docker containers are running
docker ps | grep postgres

# Check database is accessible
psql -h localhost -U postgres -d hacktson-autobots -c "SELECT 1;"

# If fails, restart Docker
cd apps/medusa
docker compose down -v  # Delete all data
docker compose up -d
sleep 10
```

### Issue 3: OpenSearch Connection Failed

**Symptoms:** `ConnectionError: Connection Error` in Medusa logs

**Solution:**
```bash
# Check if OpenSearch container is running
docker ps | grep opensearch
# Should show: (healthy)

# If not running, start it
cd apps/medusa
docker compose up -d opensearch

# Check logs
docker logs hacktson-autobots-opensearch

# Test connection
curl http://localhost:9200/_cluster/health

# Verify .env configuration
cat apps/medusa/.env | grep OPENSEARCH_HOST
# Should be: http://localhost:9200 (HTTP, not HTTPS)
```

### Issue 4: Bedrock Permission Errors

**Symptoms:** `AccessDeniedException` when syncing products

**Solution:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# Test Bedrock access
cd apps/medusa
node test-bedrock.js

# Check IAM permissions
# Your AWS user/role needs:
# - bedrock:InvokeModel
# - bedrock:InvokeModelWithResponseStream
```

### Issue 5: OpenSearch Authentication Failed

**This should not happen with Docker OpenSearch** (no authentication required).

If you're using SSH tunnel to production OpenSearch:
```bash
# Verify credentials in .env
cat apps/medusa/.env | grep OPENSEARCH

# Test connection manually
curl -k -u "hackathon:YOUR_PASSWORD" https://localhost:9201/_cluster/health

# Check:
# 1. SSH tunnel is running (lsof -i :9201)
# 2. Password is correct in .env
# 3. OPENSEARCH_HOST=https://localhost:9201 (HTTPS for tunnel)
```

### Issue 5.5: SSL Protocol Error (wrong version number)

**Symptoms:** `write EPROTO...SSL routines:ssl3_get_record:wrong version number`

**Cause:** Wrong port or protocol in OPENSEARCH_HOST

**Solution:**
```bash
# Check your configuration
cat apps/medusa/.env | grep OPENSEARCH_HOST

# Should be one of:
# - http://localhost:9200   (local Docker OpenSearch - recommended)
# - https://localhost:9201  (SSH tunnel to production)

# Common mistakes:
# ❌ https://localhost:9200 - Wrong protocol (Docker uses HTTP)
# ❌ http://localhost:9201  - Wrong protocol (tunnel requires HTTPS)
# ✅ http://localhost:9200  - Correct for Docker
# ✅ https://localhost:9201 - Correct for SSH tunnel

# Fix it in .env and restart Medusa
yarn dev --filter=medusa
```

### Issue 6: Storefront Shows 502 Error

**Symptoms:** Storefront loads but shows 502 Bad Gateway

**Solution:**
```bash
# Check backend is running
curl http://localhost:9000/health

# Check publishable key is configured
cat apps/storefront/.env | grep MEDUSA_PUBLISHABLE_KEY

# If missing or wrong, re-run setup
yarn setup
```

### Issue 7: Products Not Syncing to OpenSearch

**Symptoms:** Products created but not searchable

**Check Medusa logs for:**
```
Failed to sync product prod_xxx to OpenSearch: [error]
```

**Common causes:**
1. **SSH tunnel disconnected** - Restart tunnel
2. **Bedrock credentials invalid** - Check AWS credentials
3. **OpenSearch auth failed** - Check username/password
4. **ENABLE_OPENSEARCH_SYNC=false** - Set to `true` in `.env`

**Manual sync:**
```bash
# Trigger full sync via API
curl -X POST http://localhost:9000/admin/opensearch/sync
```

### Issue 8: Port Already in Use

```bash
# Find and kill processes
lsof -ti:9000 | xargs kill -9  # Medusa
lsof -ti:3000 | xargs kill -9  # Storefront
lsof -ti:5432 | xargs kill -9  # PostgreSQL
lsof -ti:6379 | xargs kill -9  # Redis
lsof -ti:9201 | xargs kill -9  # SSH tunnel
```

### Issue 9: Complete Reset

If everything is broken, start fresh:

```bash
# Stop all services
pkill -f "yarn dev"
pkill -f "ssh.*9201"

# Delete all Docker data
cd apps/medusa
docker compose down -v

# Clean node_modules (optional)
cd ../..
rm -rf node_modules apps/*/node_modules

# Start fresh
yarn install
yarn setup
cd apps/medusa && ./start-opensearch.sh && cd ../..
yarn dev
```

---

## Development Commands

### Project-Level

```bash
yarn install              # Install dependencies
yarn setup                # Initialize database (deletes all data)
yarn dev                  # Start all services
yarn build                # Build all apps
yarn format               # Format code
yarn typecheck            # Type check
```

### Medusa Backend

```bash
cd apps/medusa

# Database
yarn migrate              # Run migrations
yarn seed                 # Seed data
yarn nukedb               # Reset database

# Development
yarn dev                  # Start dev server
yarn build                # Build for production

# Testing
yarn test:unit            # Unit tests
yarn test:integration:http # API tests

# OpenSearch
node test-bedrock.js      # Test Bedrock
node test-opensearch-sync.js # Test full sync
./start-opensearch.sh     # Start SSH tunnel
```

### Storefront

```bash
cd apps/storefront

yarn dev                  # Start dev server
yarn build                # Build for production
yarn typecheck            # Type check
```

---

## Port Allocation

| Service | Port | Description |
|---------|------|-------------|
| Medusa API | 9000 | Backend API and admin |
| Storefront | 3000 | Frontend storefront |
| PostgreSQL | 5432 | Database |
| Redis | 6379 | Cache |
| OpenSearch (SSH) | 9201 | Via SSH tunnel |

---

## Next Steps

1. ✅ Complete setup
2. ✅ Verify all services are running
3. 📖 Read [OpenSearch Configuration](./OPENSEARCH.md)
4. 📖 Read [Architecture Design](./architecture-design-en.md)
5. 🔍 Check `.kiro/steering/` for development patterns
6. 🚀 Start developing!

---

## Getting Help

- **OpenSearch Setup**: [OPENSEARCH.md](./OPENSEARCH.md)
- **Production Config**: [PRODUCTION_ENV.md](./PRODUCTION_ENV.md) (gitignored)
- **Medusa Docs**: https://docs.medusajs.com/
- **Remix Docs**: https://remix.run/docs

---

**Last Updated**: 2026-01-29
