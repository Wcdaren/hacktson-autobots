# OpenSearch Configuration Guide

This project uses **OpenSearch** for AI-powered search capabilities (semantic search, image search, hybrid search). This is a **core feature** and required for the application to work properly.

---

## 🏗️ Architecture Overview

```
Local Development → Local Docker OpenSearch → AWS Bedrock (Embeddings)
                                           → AWS Rekognition (Image Search)

OR

Local Development → SSH Tunnel → AWS OpenSearch (Production) → AWS Bedrock
                                                             → AWS Rekognition
```

**Two OpenSearch Options:**
1. **Local Docker OpenSearch** (recommended for development) - Simple, no authentication
2. **Production OpenSearch via SSH Tunnel** - Test with production data

**AWS Services (always required):**
- AWS Bedrock for generating embeddings
- AWS Rekognition for image search

---

## ⚡ Quick Setup - Option 1: Local Docker (Recommended)

### Step 1: Start Docker OpenSearch

```bash
cd apps/medusa
docker compose up -d opensearch

# Wait for container to be healthy
docker ps | grep opensearch
# Should show: (healthy)
```

### Step 2: Configure Environment

Your `apps/medusa/.env` should have:

```bash
# OpenSearch Connection (Local Docker)
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false
# No username/password needed - Docker has DISABLE_SECURITY_PLUGIN=true

# Enable auto-sync
ENABLE_OPENSEARCH_SYNC=true

# AWS Credentials (for Bedrock embeddings)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY_HERE

# Bedrock Configuration
BEDROCK_REGION=us-east-1
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# Image Search
REKOGNITION_ENABLED=true
```

### Step 3: Test Connection

```bash
# Test OpenSearch
curl http://localhost:9200/_cluster/health
# Should return: {"cluster_name":"docker-cluster","status":"green"...}

# Test Bedrock
node test-bedrock.js
# Should return: ✅ Bedrock connection successful
```

### Step 4: Start Medusa

```bash
yarn dev --filter=medusa
```

---

## ⚡ Quick Setup - Option 2: Production via SSH Tunnel

Use this option if you need to test with production data or don't want to run Docker locally.

### Step 1: Start SSH Tunnel

The OpenSearch cluster is in a private VPC. You need an SSH tunnel to access it from your local machine.

```bash
# Start tunnel (runs in background)
nohup ssh -o ServerAliveInterval=60 \
  -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 \
  -N rick_gao@jumphost-sg.castlery.com > /tmp/ssh-tunnel.log 2>&1 &
```

**Verify tunnel is running:**
```bash
lsof -i :9201  # Should show ssh process
```

### Step 2: Configure Environment

Your `apps/medusa/.env` should have:

```bash
# OpenSearch Connection (via SSH tunnel)
OPENSEARCH_HOST=https://localhost:9201
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=YOUR_PASSWORD_HERE

# Enable auto-sync
ENABLE_OPENSEARCH_SYNC=true

# AWS Credentials (for Bedrock embeddings)
AWS_REGION=ap-southeast-1
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY_HERE

# Bedrock Configuration
BEDROCK_REGION=us-east-1
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# Image Search
REKOGNITION_ENABLED=true
```

### Step 3: Test Connection

```bash
# Test OpenSearch
curl -k -u "hackathon:YOUR_PASSWORD" https://localhost:9201/_cluster/health
# Should return: JSON with cluster health

# Test Bedrock
node test-bedrock.js
# Should return: ✅ Bedrock connection successful
```

### Step 4: Start Medusa

```bash
yarn dev --filter=medusa
```

---

## 🔄 Switching Between Options

### From SSH Tunnel to Local Docker

```bash
# 1. Stop SSH tunnel
pkill -f "ssh.*9201"

# 2. Start Docker OpenSearch
cd apps/medusa
docker compose up -d opensearch

# 3. Update .env
# Change: OPENSEARCH_HOST=http://localhost:9200
# Remove: OPENSEARCH_USERNAME and OPENSEARCH_PASSWORD

# 4. Restart Medusa
yarn dev --filter=medusa
```

### From Local Docker to SSH Tunnel

```bash
# 1. Start SSH tunnel
ssh -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N rick_gao@jumphost-sg.castlery.com

# 2. Update .env
# Change: OPENSEARCH_HOST=https://localhost:9201
# Add: OPENSEARCH_USERNAME=hackathon
# Add: OPENSEARCH_PASSWORD=YOUR_PASSWORD

# 3. Restart Medusa
yarn dev --filter=medusa
```

---

## ✅ Verify Setup

Run the test script to verify everything works:

```bash
cd apps/medusa
node test-opensearch-sync.js
```

**Expected output:**
- ✅ OpenSearch connection successful
- ✅ Bedrock embeddings working
- ✅ Products indexed successfully

---

## 🐛 Troubleshooting

### Issue 1: Docker OpenSearch Not Starting

**Symptoms:** Container exits or shows unhealthy status

**Solution:**
```bash
# Check container status
docker ps -a | grep opensearch

# Check logs
docker logs hacktson-autobots-opensearch

# Restart container
cd apps/medusa
docker compose down opensearch
docker compose up -d opensearch

# Wait for healthy status
docker ps | grep opensearch
```

### Issue 2: Vector Space Type Error

**Symptoms:** `"hnsw" configuration does not support space type: "cosinesimil"`

**Cause:** OpenSearch 2.11.0 has different vector space type support than AWS OpenSearch

**Solution:**
The code has been updated to use `l2` (Euclidean distance) with `nmslib` engine instead of `cosinesimil` with `faiss`. This is compatible with the Docker OpenSearch version.

**If you see this error:**
```bash
# Delete the existing index
curl -X DELETE http://localhost:9200/products

# Restart Medusa to recreate with correct configuration
yarn dev --filter=medusa
```

**Note:** Production AWS OpenSearch may support different configurations. The code automatically adapts based on the OpenSearch version.

### Issue 2: OpenSearch Connection Failed (Docker)

**Test connection:**
```bash
curl http://localhost:9200/_cluster/health
```

**Expected response:** JSON with `"status":"green"` or `"status":"yellow"`

**Common issues:**
- Container not running: `docker compose up -d opensearch`
- Wrong URL in .env: Should be `http://localhost:9200` (HTTP, not HTTPS)
- Port conflict: Check if another service is using port 9200

### Issue 3: SSH Tunnel Disconnected

**Symptoms:** Medusa logs show `ConnectionError: Connection Error` when using SSH tunnel

**Solution:**
```bash
# Check if tunnel is running
lsof -i :9201

# If not running, restart it
pkill -f "ssh.*9201"  # Kill old process
ssh -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N rick_gao@jumphost-sg.castlery.com &
```

### Issue 4: SSL Protocol Error

**Symptoms:** `write EPROTO...SSL routines:ssl3_get_record:wrong version number`

**Cause:** Wrong protocol or port in OPENSEARCH_HOST

**Solution:**
```bash
# Check your configuration
cat apps/medusa/.env | grep OPENSEARCH_HOST

# For Docker: http://localhost:9200 (HTTP)
# For SSH tunnel: https://localhost:9201 (HTTPS)
```

### Issue 5: Bedrock Permission Errors

**Test Bedrock access:**
```bash
cd apps/medusa
node test-bedrock.js
```

**Common causes:**
- Invalid AWS credentials
- IAM permissions not configured
- Wrong region (must be us-east-1 for Bedrock)

### Issue 6: Products Not Syncing

**Check Medusa logs for:**
- `Successfully synced product {id} to OpenSearch` (success)
- `Failed to sync product {id} to OpenSearch: {error}` (failure)

**Manual sync:**
```bash
# Trigger full sync via API
curl -X POST http://localhost:9000/admin/opensearch/sync
```

---

## 🔧 Environment Configuration

### Local Development with Docker (.env)

```bash
# Use local Docker OpenSearch (no authentication)
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false
# No username/password needed
```

### Local Development with SSH Tunnel (.env)

```bash
# Use SSH tunnel to production OpenSearch
OPENSEARCH_HOST=https://localhost:9201
OPENSEARCH_PRODUCT_INDEX=products
OPENSEARCH_USE_AWS_AUTH=false
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=YOUR_PASSWORD_HERE
```

### Production Deployment (.env.production)

```bash
# Direct connection within VPC
OPENSEARCH_HOST=https://vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com
OPENSEARCH_USE_AWS_AUTH=true  # Use IAM authentication
AWS_REGION=ap-southeast-1
# No username/password needed with IAM auth
```

**Key Differences:**
- **Docker**: HTTP, port 9200, no auth
- **SSH Tunnel**: HTTPS, port 9201, basic auth
- **Production**: HTTPS, direct VPC, IAM auth

---

## 📚 Technical Details

### What Gets Synced

When a product is created or updated, the system:
1. Queries product data from Medusa
2. Generates embeddings using AWS Bedrock
3. Indexes to OpenSearch with vector embeddings
4. Removes unpublished products from index

### Search Capabilities

1. **Keyword Search** - Full-text search on title, description, categories, tags
2. **Semantic Search** - Vector similarity search using text embeddings
3. **Image Search** - Visual similarity search using image embeddings
4. **Hybrid Search** - Combined keyword + semantic search with weighted scoring
5. **Faceted Filtering** - Filter by categories, collections, tags, price, metadata

### Performance

- Embedding generation: ~1.5 seconds per product
- Batch processing: 5 products at a time
- Vector dimension: 1024 (Titan Embeddings V2)
- Index refresh: Immediate

### Related Files

- `src/subscribers/product-sync.ts` - Auto-sync on product changes
- `src/workflows/sync-products.ts` - Main sync workflow
- `src/workflows/steps/generate-embeddings.ts` - Bedrock embedding generation
- `src/workflows/steps/sync-products.ts` - OpenSearch indexing
- `src/modules/opensearch/` - OpenSearch module
- `src/modules/embedding/` - Embedding generation module

---

## 🚀 Helper Script

For convenience, use the automated setup script:

```bash
cd apps/medusa
./start-opensearch.sh
```

This script will:
- Check if SSH tunnel is running
- Start tunnel if needed
- Test OpenSearch connection
- Verify .env configuration
- Prompt to enable sync if disabled

---

## 💡 Tips

- ✅ Keep SSH tunnel running while developing
- ✅ Tunnel auto-reconnects with `ServerAliveInterval=60`
- ✅ Check tunnel status: `lsof -i :9201`
- ✅ View tunnel logs: `tail -f /tmp/ssh-tunnel.log`
- ✅ Stop tunnel: `pkill -f "ssh.*9201"`

---

**Need help?** Check the [Setup Guide](./SETUP.md) or open an issue.
