# Quick Start Guide

Get the project running in 5 minutes.

---

## Prerequisites

- ✅ Docker Desktop running
- ✅ Node.js 20+ installed
- ✅ AWS credentials configured in `.env`

---

## Start Development (5 Steps)

### 1. Install Dependencies

```bash
yarn install
```

### 2. Start Docker Services

```bash
cd apps/medusa
docker compose up -d
cd ../..
```

**Verify:**
```bash
docker ps
# Should show: postgres, redis, opensearch (all running)
```

### 3. Configure Environment

Edit `apps/medusa/.env` and add your AWS credentials:

```bash
AWS_ACCESS_KEY_ID=YOUR_KEY_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_HERE
```

**Note:** OpenSearch is already configured for Docker (no changes needed).

### 4. Initialize Database

```bash
yarn setup
```

This will:
- Reset database
- Run migrations
- Seed products
- Create admin users
- Configure storefront

**Admin credentials:**
- Email: `admin@medusa.local.com`
- Password: `supersecret`

### 5. Start Development Servers

```bash
yarn dev
```

**Wait ~30 seconds**, then access:
- **Storefront**: http://localhost:3000
- **Admin Panel**: http://localhost:9000/app
- **API**: http://localhost:9000

---

## Verify Everything Works

### Check Backend Health

```bash
curl http://localhost:9000/health
# Should return: {"status":"ok"}
```

### Check OpenSearch

```bash
curl http://localhost:9200/_cluster/health
# Should return: {"status":"green"...}
```

### Check Products Index

```bash
curl http://localhost:9200/_cat/indices?v
# Should show: products index
```

---

## Common Issues

### Docker Not Running

```bash
# Start Docker Desktop, then:
cd apps/medusa
docker compose up -d
```

### Port Already in Use

```bash
# Kill processes on ports
lsof -ti:9000 | xargs kill -9  # Medusa
lsof -ti:3000 | xargs kill -9  # Storefront
```

### OpenSearch Connection Error

```bash
# Check container is healthy
docker ps | grep opensearch
# Should show: (healthy)

# Check .env configuration
cat apps/medusa/.env | grep OPENSEARCH_HOST
# Should be: http://localhost:9200
```

### AWS Bedrock Errors

```bash
# Test Bedrock connection
cd apps/medusa
node test-bedrock.js
# Should return: ✅ Bedrock connection successful
```

---

## Stop Development

```bash
# Stop dev servers
Ctrl+C

# Stop Docker containers (optional)
cd apps/medusa
docker compose down
```

---

## Full Documentation

- [Complete Setup Guide](./SETUP.md)
- [OpenSearch Configuration](./OPENSEARCH.md)
- [Architecture Design](./architecture-design-en.md)

---

**Need help?** Check the [Setup Guide](./SETUP.md) troubleshooting section.
