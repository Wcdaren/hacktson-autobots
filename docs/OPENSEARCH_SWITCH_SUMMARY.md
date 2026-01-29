# OpenSearch Configuration Switch Summary

**Date**: 2026-01-29  
**Change**: Switched from SSH tunnel to local Docker OpenSearch

---

## What Changed

### 1. Configuration Update

**Before (SSH Tunnel to Production):**
```bash
OPENSEARCH_HOST=https://localhost:9201
OPENSEARCH_USE_AWS_AUTH=false
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=01$sCyKeS!ZnTlh*Mf
```

**After (Local Docker):**
```bash
OPENSEARCH_HOST=http://localhost:9200
OPENSEARCH_USE_AWS_AUTH=false
# No username/password needed
```

### 2. Key Differences

| Aspect | SSH Tunnel | Docker OpenSearch |
|--------|-----------|-------------------|
| **Protocol** | HTTPS | HTTP |
| **Port** | 9201 | 9200 |
| **Authentication** | Basic auth (username/password) | None (DISABLE_SECURITY_PLUGIN=true) |
| **Setup** | Requires SSH tunnel | Just `docker compose up -d` |
| **Data** | Production data | Local development data |
| **Maintenance** | Tunnel can disconnect | Always available when Docker is running |

### 3. Files Updated

- `apps/medusa/.env` - Changed to Docker configuration
- `apps/medusa/.env.template` - Documented both options
- `docs/OPENSEARCH.md` - Added Docker option as primary
- `docs/SETUP.md` - Updated to use Docker by default

---

## Current Status

✅ Docker OpenSearch container running (healthy)  
✅ Cluster status: green  
✅ Configuration updated in `.env`  
✅ Documentation updated  
✅ Vector space type fixed for OpenSearch 2.11.0 compatibility

---

## Important Notes

### Vector Space Type Compatibility

OpenSearch 2.11.0 (Docker) and AWS OpenSearch have different support for vector similarity algorithms:

- **Docker OpenSearch 2.11.0**: Uses `l2` (Euclidean distance) with `nmslib` engine
- **AWS OpenSearch**: May support `cosinesimil` with `faiss` engine

The code has been updated to use the Docker-compatible configuration. If you switch to production OpenSearch and encounter vector-related errors, you may need to adjust the space type in `apps/medusa/src/modules/opensearch/service.ts`.

**Current configuration:**
```typescript
space_type: 'l2',        // Euclidean distance
engine: 'nmslib',        // Compatible with OpenSearch 2.11.0
```

**Alternative for AWS OpenSearch (if needed):**
```typescript
space_type: 'cosinesimilarity',  // Cosine similarity
engine: 'faiss',                 // May be available on AWS
```  

---

## How to Use

### Start Development

```bash
# 1. Ensure Docker is running
docker ps

# 2. Start all services (if not already running)
cd apps/medusa
docker compose up -d

# 3. Start Medusa
yarn dev --filter=medusa
```

### Verify Connection

```bash
# Test OpenSearch
curl http://localhost:9200/_cluster/health

# Should return: {"cluster_name":"docker-cluster","status":"green"...}
```

### Check Indices

```bash
# List all indices
curl http://localhost:9200/_cat/indices?v

# After seeding products, you should see a "products" index
```

---

## Switching Back to SSH Tunnel

If you need to test with production data:

```bash
# 1. Start SSH tunnel
ssh -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N rick_gao@jumphost-sg.castlery.com &

# 2. Update apps/medusa/.env
OPENSEARCH_HOST=https://localhost:9201
OPENSEARCH_USERNAME=hackathon
OPENSEARCH_PASSWORD=01$sCyKeS!ZnTlh*Mf

# 3. Restart Medusa
yarn dev --filter=medusa
```

---

## Benefits of Docker OpenSearch

1. **Simpler Setup** - No SSH tunnel management
2. **Always Available** - No disconnection issues
3. **Faster** - Local connection, no network latency
4. **Isolated** - Your own data, won't affect production
5. **No Authentication** - Easier for development

---

## Next Steps

1. ✅ Docker OpenSearch is running
2. ⏭️ Start Medusa: `yarn dev --filter=medusa`
3. ⏭️ Seed products: Products will auto-sync to OpenSearch
4. ⏭️ Test search: Visit storefront at http://localhost:3000

---

**For more details, see:**
- [OpenSearch Configuration Guide](./OPENSEARCH.md)
- [Setup Guide](./SETUP.md)
