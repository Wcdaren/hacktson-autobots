# Semantic Search System - Complete Deployment Guide

**One guide for everything: setup, deployment, testing, and troubleshooting.**

---

## Table of Contents

1. [Quick Start (5 Minutes)](#quick-start-5-minutes)
2. [Prerequisites](#prerequisites)
3. [Environment Setup](#environment-setup)
4. [Connectivity Testing](#connectivity-testing)
5. [Data Pipeline](#data-pipeline)
6. [Deployment Options](#deployment-options)
   - [Option A: EC2 Deployment](#option-a-ec2-deployment)
   - [Option B: Lambda Deployment](#option-b-lambda-deployment)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Production Setup](#production-setup)

---

## Quick Start (5 Minutes)

### For EC2 Deployment

```bash
# 1. Clone and setup
git clone <your-repo>
cd semantic-search/operations
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Configure credentials
cp .env.example .env
vim .env  # Add: OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD, S3_BUCKET_NAME

# 3. Update config
vim config.yaml  # Add: OpenSearch endpoint

# 4. Test connectivity (optional but recommended)
cd ../notebooks
jupyter notebook "3. aws_connectivity_test.ipynb"

# 5. Run pipeline
cd ../operations
python pipeline.py

# 6. Start server
./start_server.sh
```

Your API is now at `http://your-ec2-ip:5000`

### For Lambda Deployment

```bash
# Steps 1-5 same as above, then:

# 6. Deploy to Lambda
./deploy.sh --bucket YOUR-BUCKET --opensearch YOUR-DOMAIN

# 7. Test
python test_api.py YOUR-API-ENDPOINT
```

---

## Prerequisites

### AWS Resources

| Resource | Requirement | Notes |
|----------|-------------|-------|
| **S3 Bucket** | Contains product CSV files | `data/active_only/*.csv` |
| **OpenSearch** | Version 2.x+, KNN enabled | t3.small.search minimum |
| **Bedrock** | Titan models enabled | Text + Image + Claude |
| **EC2** (Option A) | t3.medium+, 4GB+ RAM | For API server |
| **Lambda** (Option B) | Python 3.11 runtime | For serverless API |

### Local Development

| Tool | Version | Purpose |
|------|---------|---------|
| **Python** | 3.9+ | Runtime |
| **pip** | Latest | Package manager |
| **Git** | Any | Version control |
| **SSH Key** | RSA/ED25519 | Jumphost access |
| **Jupyter** | Optional | Connectivity testing |

### Network Access

- **Direct**: S3, Bedrock (via AWS SDK)
- **Via Jumphost**: OpenSearch, RDS (SSH tunnel required for local dev)
- **Jumphost**: `jumphost-sg.castlery.com`

---

## Environment Setup

### Step 1: Create .env File

```bash
cd operations
cp .env.example .env
```

### Step 2: Edit .env File

```bash
# ============================================
# REQUIRED: OpenSearch Credentials
# ============================================
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=your_actual_password

# ============================================
# REQUIRED: S3 Configuration
# ============================================
S3_BUCKET_NAME=your-bucket-name

# ============================================
# OPTIONAL: SSH Tunnel (for local dev)
# ============================================
JUMPHOST=jumphost-sg.castlery.com
JUMPHOST_USER=ec2-user
SSH_KEY_PATH=~/.ssh/id_rsa

# ============================================
# OPTIONAL: Feature Flags
# ============================================
LLM_FALLBACK_ENABLED=true
RELATED_TAGS_ENABLED=true
SIMILARITY_THRESHOLD=0.3
```

### Step 3: Update config.yaml

```yaml
aws:
  region: us-east-1
  
  s3:
    bucket: your-bucket-name  # Or use S3_BUCKET_NAME env var
  
  opensearch:
    endpoint: https://your-domain.us-east-1.es.amazonaws.com
    use_iam_auth: false  # Set true if using IAM
```

### Step 4: Verify Setup

```bash
python test_env_loading.py
```

Expected output:
```
✓ .env file found
✓ .env file loaded
✓ OPENSEARCH_USERNAME: admin
✓ OPENSEARCH_PASSWORD: ********
✓ S3_BUCKET_NAME: your-bucket-name
✅ SUCCESS: All required environment variables are set!
```

---

## Connectivity Testing

### Why Test First?

Testing connectivity before running the pipeline saves time by catching configuration issues early.

### Run Connectivity Test

```bash
# 1. Install Jupyter (if not installed)
pip install jupyter

# 2. Open test notebook
cd notebooks
jupyter notebook "3. aws_connectivity_test.ipynb"

# 3. Update configuration in first cell:
OPENSEARCH_ENDPOINT = 'your-domain.us-east-1.es.amazonaws.com'
SSH_KEY_PATH = os.path.expanduser('~/.ssh/id_rsa')

# 4. Run all cells (Cell → Run All)
```

### What Gets Tested

- ✅ AWS credentials (IAM access)
- ✅ S3 access (list buckets, read objects)
- ✅ Bedrock access (list models, generate embedding)
- ✅ SSH connection to jumphost
- ✅ OpenSearch via SSH tunnel (list indices)
- ✅ RDS via SSH tunnel (optional)

### Multi-Region Architecture

This project uses a multi-region setup due to AWS service availability:

| Service | Region | Reason |
|---------|--------|--------|
| **Bedrock** (Titan, Claude) | `us-east-1` | Models only available in us-east-1 |
| **S3, OpenSearch, RDS** | `ap-southeast-1` | Data locality |

The code handles this automatically via `config.yaml`:
```yaml
aws:
  region: ap-southeast-1          # S3, OpenSearch
  bedrock_region: us-east-1       # Bedrock Titan & Claude
```

### SSH Tunnel Setup (Local Development Only)

When working locally, OpenSearch/RDS are accessed through jumphost:

```
Your Local Machine
    ↓ SSH Tunnel
Jumphost (jumphost-sg.castlery.com)
    ↓ Direct Connection
OpenSearch / RDS
```

**SSH Key Setup:**
```bash
# SSH credentials location
# /Users/pillalamarrimallikarjun/OneDrive - Castlery Pte Ltd/workspace/Fun projects/autobots-semantic-search

# Test connection (username: autobots)
ssh -i /path/to/ssh/key autobots@jumphost-sg.castlery.com
```

**Note**: EC2 deployment doesn't need SSH tunnels (direct VPC access).

---

## Data Pipeline

### What It Does

1. **Ingests data** from S3 (3,693 products)
2. **Generates embeddings** via Bedrock Titan
3. **Creates indices** in OpenSearch
4. **Indexes products** with embeddings

### Run Pipeline

```bash
cd operations
python pipeline.py
```

### Expected Output

```
============================================================
SEMANTIC SEARCH PIPELINE - STARTING
============================================================
STEP 1: DATA INGESTION
✓ Ingested 3693 products

STEP 2: EMBEDDING GENERATION
✓ Generated embeddings for 3693 products

STEP 3: CREATE OPENSEARCH INDICES
✓ Text index created
✓ Image index created

STEP 4: INDEX PRODUCTS
✓ Indexed 3693 products

============================================================
PIPELINE COMPLETE
============================================================
Total time: 487.23 seconds
```

### Pipeline Duration

- **Full dataset**: 5-10 minutes
- **Bottleneck**: Bedrock API rate limits
- **Run once**: Or when data changes

---

## Deployment Options

### Option A: EC2 Deployment

**Best for**: No Lambda access, consistent traffic, easier debugging

#### EC2 Requirements

| Spec | Minimum | Recommended |
|------|---------|-------------|
| Instance Type | t3.medium | t3.large |
| vCPUs | 2 | 4 |
| Memory | 4 GB | 8 GB |
| Storage | 20 GB | 50 GB |

#### Security Group

Open these ports:
- Port 22 (SSH)
- Port 5000 (API)

#### IAM Role

Attach role with:
- `AmazonBedrockFullAccess`
- `AmazonS3ReadOnlyAccess`
- OpenSearch access policy

#### Deploy to EC2

```bash
# 1. SSH into EC2
ssh -i your-key.pem ec2-user@your-ec2-ip

# 2. Clone repository
git clone <your-repo>
cd semantic-search/operations

# 3. Setup environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Configure (steps from Environment Setup section)
cp .env.example .env
vim .env
vim config.yaml

# 5. Run pipeline
python pipeline.py

# 6. Start server
./start_server.sh
```

#### API Endpoints

- `GET http://your-ec2-ip:5000/health`
- `POST http://your-ec2-ip:5000/search/text`
- `POST http://your-ec2-ip:5000/search/image`
- `POST http://your-ec2-ip:5000/search/refine`

#### Run as Background Service

**Quick (using screen):**
```bash
screen -S api-server
./start_server.sh
# Press Ctrl+A, then D to detach

# Reattach later
screen -r api-server
```

**Production (using systemd):**
```bash
sudo vim /etc/systemd/system/semantic-search.service
```

Add:
```ini
[Unit]
Description=Semantic Search API Server
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/home/ec2-user/semantic-search/operations
Environment="PATH=/home/ec2-user/semantic-search/operations/venv/bin"
ExecStart=/home/ec2-user/semantic-search/operations/venv/bin/python app.py --host 0.0.0.0 --port 5000
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
sudo systemctl daemon-reload
sudo systemctl enable semantic-search
sudo systemctl start semantic-search
sudo systemctl status semantic-search
```

---

### Option B: Lambda Deployment

**Best for**: Serverless, auto-scaling, sporadic traffic

#### Deploy to Lambda

```bash
cd operations

# Deploy
./deploy.sh --bucket YOUR-BUCKET --opensearch YOUR-DOMAIN

# The script will:
# 1. Load .env file
# 2. Create Lambda package
# 3. Deploy CloudFormation stack
# 4. Update Lambda code
# 5. Set environment variables
# 6. Output API endpoints
```

#### API Endpoints

- `GET https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/search/text`
- `POST https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/search/image`

---

## Testing

### Test API

```bash
# Health check
curl http://your-endpoint/health

# Text search
curl -X POST http://your-endpoint/search/text \
  -H "Content-Type: application/json" \
  -d '{"query": "grey sofa under $1000"}'

# Image search
curl -X POST http://your-endpoint/search/image \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image"}'
```

### Run Test Suite

```bash
cd operations
python test_api.py http://your-endpoint
```

Expected output:
```
Testing: http://your-endpoint
✓ Health check passed
✓ Text search test 1 passed
✓ Text search test 2 passed
✓ Text search test 3 passed
✓ Error handling test passed
All tests passed!
```

---

## Troubleshooting

### Environment Issues

**Problem**: `.env file not found`
```bash
cd operations
cp .env.example .env
vim .env
```

**Problem**: `OPENSEARCH_USERNAME not set`
```bash
# Edit .env and add:
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=your_password
```

### SSH Tunnel Issues

**Problem**: `Permission denied (publickey)`
```bash
# Use correct username (autobots) and key path
chmod 600 /path/to/ssh/key
ssh -i /path/to/ssh/key autobots@jumphost-sg.castlery.com
```

**Problem**: `Connection refused`
```bash
# Check jumphost is accessible
ping jumphost-sg.castlery.com
telnet jumphost-sg.castlery.com 22
```

**Problem**: `Address already in use`
```bash
# Kill existing tunnel
lsof -ti:9200 | xargs kill -9
```

### OpenSearch Issues

**Problem**: `Authentication failed`
```bash
# Verify credentials
cat operations/.env | grep OPENSEARCH

# Test manually (with tunnel up)
curl -u username:password https://localhost:9200 -k
```

**Problem**: `Connection timeout`
```bash
# Check OpenSearch endpoint in config.yaml
# Verify security group allows access
# Check OpenSearch cluster health in AWS Console
```

### Bedrock Issues

**Problem**: `Access denied to Bedrock`
```bash
# Enable Bedrock in AWS Console
# Enable model access for Titan models
# Check IAM permissions
```

**Problem**: `Model not found`
```bash
# Verify model IDs in config.yaml:
# - amazon.titan-embed-text-v1
# - amazon.titan-embed-image-v1
# - anthropic.claude-3-sonnet-20240229-v1:0
```

### Pipeline Issues

**Problem**: `S3 bucket not found`
```bash
# Check bucket name in .env
# Verify bucket exists in AWS Console
# Check IAM permissions for S3
```

**Problem**: `Out of memory`
```bash
# Increase EC2 instance size
# Or reduce batch_size in config.yaml
```

### API Issues

**Problem**: `Server won't start`
```bash
# Check if port is in use
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

**Problem**: `Can't connect to API`
```bash
# Check security group allows port 5000
# Verify server is running
ps aux | grep app.py

# Check logs
tail -f api.log
```

---

## Production Setup

### 1. Use Nginx Reverse Proxy

```bash
# Install Nginx
sudo yum install nginx -y  # Amazon Linux
sudo apt install nginx -y  # Ubuntu

# Configure
sudo vim /etc/nginx/conf.d/semantic-search.conf
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

Start:
```bash
sudo nginx -t
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Add HTTPS with Let's Encrypt

```bash
# Install certbot
sudo yum install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is configured automatically
```

### 3. Use Gunicorn for Production

```bash
# Install
pip install gunicorn

# Run with multiple workers
gunicorn -w 4 -b 0.0.0.0:5000 app:app

# Update systemd service
ExecStart=/path/to/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 4. Enable Monitoring

**CloudWatch Logs:**
```bash
# Install CloudWatch agent
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo rpm -U ./amazon-cloudwatch-agent.rpm

# Configure and start
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard
```

**Application Logs:**
```bash
# View logs
tail -f ~/semantic-search/operations/api.log

# Or systemd logs
sudo journalctl -u semantic-search -f
```

### 5. Security Checklist

- [ ] `.env` file not committed to git
- [ ] SSH keys have correct permissions (600)
- [ ] Different credentials per environment
- [ ] HTTPS enabled with valid certificate
- [ ] Security groups properly configured
- [ ] IAM roles follow least privilege
- [ ] Regular credential rotation
- [ ] CloudWatch logging enabled
- [ ] Backup strategy in place

---

## Cost Estimation

### EC2 Deployment

| Resource | Cost/Month |
|----------|------------|
| EC2 (t3.medium) | $30 |
| OpenSearch (t3.small) | $30 |
| Bedrock (usage-based) | $20-50 |
| Data Transfer | $5-10 |
| **Total** | **$85-120** |

### Lambda Deployment

| Resource | Cost/Month |
|----------|------------|
| Lambda | $5-10 |
| API Gateway | $3-5 |
| OpenSearch (t3.small) | $30 |
| Bedrock (usage-based) | $20-50 |
| **Total** | **$58-95** |

*Based on 10,000 searches/day*

---

## Quick Reference

### Common Commands

```bash
# Test environment
python test_env_loading.py

# Run pipeline
python pipeline.py

# Start server (EC2)
./start_server.sh

# Deploy Lambda
./deploy.sh --bucket BUCKET --opensearch DOMAIN

# Test API
python test_api.py http://endpoint

# View logs (systemd)
sudo journalctl -u semantic-search -f

# Restart service
sudo systemctl restart semantic-search
```

### File Locations

```
operations/
├── .env                    # Your credentials (not in git)
├── config.yaml             # AWS resource configuration
├── pipeline.py             # Data pipeline
├── app.py                  # Flask API server (EC2)
├── lambda_handler.py       # Lambda handler
├── start_server.sh         # Quick start script
├── deploy.sh               # Lambda deployment
└── test_api.py             # API tests

notebooks/
└── 3. aws_connectivity_test.ipynb  # Connectivity testing
```

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/search/text` | POST | Text search |
| `/search/image` | POST | Image search |
| `/search/refine` | POST | Refine by tag |

### Request Examples

**Text Search:**
```json
{
  "query": "grey sofa under $1000"
}
```

**Image Search:**
```json
{
  "image": "base64_encoded_image_string"
}
```

**Refine Search:**
```json
{
  "original_query": "modern sofa",
  "tag": "Under $1,000",
  "tag_type": "price_range"
}
```

---

## Support

### Documentation

- This guide covers everything you need
- Check specific sections for detailed instructions
- Use Table of Contents to navigate

### Getting Help

1. Check [Troubleshooting](#troubleshooting) section
2. Review error messages carefully
3. Test connectivity with notebook
4. Check CloudWatch logs
5. Verify AWS resource configuration

---

**You're all set!** Follow the Quick Start section to deploy in 5 minutes.
