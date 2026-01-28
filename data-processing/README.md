# E-Commerce Semantic Search Engine

Backend search system for furniture e-commerce enabling semantic text search and image similarity search using AWS Bedrock and OpenSearch.

---

## 🚀 Quick Start

**Everything you need is in one guide:**

👉 **[docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** 👈

### Multi-Region AWS Setup

This project uses a multi-region architecture:
- **Bedrock** (Titan, Claude): `us-east-1` (models only available here)
- **S3, OpenSearch, RDS**: `ap-southeast-1` (data locality)

### 5-Minute Deployment

```bash
cd operations

# 1. Setup
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# 2. Configure
cp .env.example .env
vim .env  # Add: OPENSEARCH_USERNAME, OPENSEARCH_PASSWORD, S3_BUCKET_NAME
vim config.yaml  # Add: OpenSearch endpoint

# 3. Run pipeline
python pipeline.py

# 4. Deploy
./start_server.sh  # EC2
# OR
./deploy.sh --bucket BUCKET --opensearch DOMAIN  # Lambda
```

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | Complete deployment guide (start here!) |
| **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** | Technical documentation & architecture |
| **[notebooks/3. aws_connectivity_test.ipynb](notebooks/3.%20aws_connectivity_test.ipynb)** | Test AWS connectivity |
| **[inception/](inception/)** | Requirements & user stories (AIDLC Phase 1) |
| **[construction/](construction/)** | Domain model & logical design (AIDLC Phase 2) |

---

## 🎯 Features

- **Text Search**: Semantic search with natural language filters
- **Image Search**: Visual similarity search
- **Hybrid Search**: Combines KNN + BM25 with RRF
- **LLM Fallback**: Claude extracts intent from abstract queries
- **Related Tags**: Google Shopping-style clickable tags
- **Filter Extraction**: Auto-detects price, color, material, category

---

## 🏗️ Architecture

```
User Request
    ↓
API (Flask on EC2 or Lambda)
    ↓
┌─────────────┬──────────────┬─────────┐
│   Bedrock   │  OpenSearch  │   S3    │
│ (Embeddings)│   (Search)   │ (Data)  │
└─────────────┴──────────────┴─────────┘
```

---

## 📊 Project Structure

```
.
├── operations/
│   ├── COMPLETE_GUIDE.md          # 👈 Complete deployment guide
│   ├── .env.example               # Credentials template
│   ├── config.yaml                # AWS configuration
│   ├── pipeline.py                # Data pipeline
│   ├── app.py                     # Flask API (EC2)
│   ├── lambda_handler.py          # Lambda handler
│   └── unit_*_*/                  # Service implementations
│
├── notebooks/
│   └── 3. aws_connectivity_test.ipynb  # Connectivity testing
│
├── data/
│   └── active_only/               # Product CSV files
│
├── inception/                     # Requirements & design
├── construction/                  # Domain model & implementation
└── PROJECT_SUMMARY.md             # Project overview
```

---

## 🧪 Testing

### Test Connectivity (Recommended First Step)

```bash
cd notebooks
jupyter notebook "3. aws_connectivity_test.ipynb"
```

Tests: AWS credentials, S3, Bedrock, SSH tunnel, OpenSearch

### Test API

```bash
cd operations
python test_api.py http://your-endpoint
```

---

## 🔧 Requirements

- **Python**: 3.9+
- **AWS**: S3, Bedrock (us-east-1), OpenSearch (ap-southeast-1)
- **EC2**: t3.medium+ (for EC2 deployment)
- **SSH**: Access to jumphost-sg.castlery.com (username: autobots) for local dev

---

## 💰 Cost Estimate

- **EC2 Deployment**: ~$85-120/month
- **Lambda Deployment**: ~$58-95/month

*Based on 10,000 searches/day*

---

## 🆘 Support

1. Read [operations/COMPLETE_GUIDE.md](operations/COMPLETE_GUIDE.md)
2. Check [Troubleshooting](operations/COMPLETE_GUIDE.md#troubleshooting) section
3. Test connectivity with notebook
4. Review error messages

---

**Ready to deploy?** Open [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) and follow the Quick Start section.

---

## 📁 Final Structure

```
Root (3 main docs):
├── README.md                      # This file - Quick start
├── DEPLOYMENT_GUIDE.md            # Complete deployment guide
├── PROJECT_DOCUMENTATION.md       # Technical documentation
├── AIDLC workshop system prompt.md # AIDLC methodology
└── plan.md                        # Project plan

Preserved folders:
├── inception/                     # Phase 1: Requirements (kept as-is)
├── construction/                  # Phase 2: Design (kept as-is)
├── operations/                    # Phase 3: Implementation
├── notebooks/                     # Data exploration & testing
└── data/                          # Product CSV files
```
