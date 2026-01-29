# 🚀 Medusa 2 + Remix E-Commerce Platform

Full-stack e-commerce platform with **AI-powered search**: Medusa v2 (headless commerce) + Remix (React Router v7) storefront.

**Key Features:** Semantic search, image search, product reviews, Stripe payments, Docker-based development.

---

## ⚡ Quick Start

**New to the project?** → [5-Minute Quick Start Guide](./docs/QUICK_START.md)

### Prerequisites

- **Node.js 20+** ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/)) - Must be running
- **AWS Account** - For Bedrock (AI embeddings) and Rekognition (image search)

### Setup (3 Steps)

```bash
# 1. Install dependencies
yarn install

# 2. Start Docker services (PostgreSQL, Redis, OpenSearch)
cd apps/medusa && docker compose up -d && cd ../..

# 3. Configure AWS credentials in apps/medusa/.env, then initialize
yarn setup
```

### Start Development

```bash
yarn dev
```

Wait ~30 seconds, then access:

- **🛍️ Storefront**: http://localhost:3000
- **⚙️ Admin**: http://localhost:9000/app
  - Email: `admin@medusa.local.com`
  - Password: `supersecret`
- **📡 API**: http://localhost:9000

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| **[Quick Start](./docs/QUICK_START.md)** | 5-minute setup guide for new developers |
| **[Setup Guide](./docs/SETUP.md)** | Complete setup with troubleshooting |
| **[OpenSearch Config](./docs/OPENSEARCH.md)** | AI search setup (Docker vs SSH tunnel) |
| **[Architecture](./docs/architecture-design-en.md)** | System design and technical decisions |
| **[Contributing](./docs/CONTRIBUTING.md)** | How to contribute to the project |

---

## 🔧 Common Commands

```bash
# Development
yarn dev                      # Start all services
yarn dev --filter=medusa      # Backend only
yarn dev --filter=storefront  # Frontend only

# Database
yarn setup                    # Reset and reinitialize everything
cd apps/medusa
yarn migrate                  # Run migrations
yarn seed                     # Seed data

# Code Quality
yarn format                   # Format code (Biome)
yarn typecheck               # Type check all
yarn build                   # Build all apps

# Testing
cd apps/medusa
yarn test:unit               # Unit tests
yarn test:integration:http   # API tests
```

---

## 🐛 Troubleshooting

### Quick Fixes

```bash
# Docker not running?
docker ps  # Should see postgres and redis

# Port conflicts?
lsof -ti:9000 | xargs kill -9  # Kill Medusa
lsof -ti:3000 | xargs kill -9  # Kill Storefront

# OpenSearch connection error?
cd apps/medusa && ./start-opensearch.sh

# Database issues?
cd apps/medusa
docker compose down -v  # Delete all data
docker compose up -d
yarn migrate && yarn seed

# Complete reset?
yarn setup
```

### Common Issues

| Problem | Solution |
|---------|----------|
| 502 Error on storefront | Run `yarn setup` to regenerate config |
| Database connection failed | Check Docker: `docker ps` |
| Port already in use | Kill process: `lsof -ti:PORT \| xargs kill -9` |
| OpenSearch connection error | Run `cd apps/medusa && ./start-opensearch.sh` |

**Need more help?** See [Setup Guide](./docs/SETUP.md) or [OpenSearch Config](./docs/OPENSEARCH.md)

---

## 🎯 Features

### Core E-Commerce
- ✅ Product catalog with variants, collections, categories
- ✅ Shopping cart and checkout flow
- ✅ Order management
- ✅ Customer accounts
- ✅ Product reviews

### AI-Powered Search
- 🔍 **Semantic Search** - AI understands user intent (AWS Bedrock)
- 🖼️ **Image Search** - Find products by uploading images (AWS Rekognition)
- 🔀 **Hybrid Search** - Combined keyword + semantic search
- 📊 **Faceted Filtering** - Filter by categories, price, tags

### Payments
- 💳 Stripe integration with Express Checkout
- 🍎 Apple Pay
- 🤖 Google Pay

---

## 📁 Project Structure

```
apps/
├── medusa/          # Backend API + Admin (Port 9000)
│   ├── src/
│   │   ├── api/         # REST API endpoints
│   │   ├── modules/     # Custom modules (OpenSearch, Embeddings)
│   │   ├── workflows/   # Business workflows
│   │   └── subscribers/ # Event handlers
│   └── .env
│
└── storefront/      # Remix Frontend (Port 3000)
    ├── app/
    │   ├── routes/      # Page routes
    │   ├── components/  # React components
    │   └── hooks/       # Custom hooks
    └── .env
```

---

## 🛠️ Tech Stack

### Backend
- Medusa v2.7.0 (Headless Commerce)
- Node.js 20+ / TypeScript 5.7+
- PostgreSQL + Redis
- OpenSearch (Search Engine)
- AWS Bedrock (AI Embeddings)
- AWS Rekognition (Image Recognition)

### Frontend
- Remix (React Router v7.5.3)
- React 19
- Tailwind CSS 3.3.5
- Zustand (State Management)
- Stripe React SDK

### DevOps
- Docker + Docker Compose
- Turborepo (Monorepo)
- Biome (Linting/Formatting)

---

## 🎓 Learn More

- [Medusa Documentation](https://docs.medusajs.com/)
- [Remix Documentation](https://remix.run/docs)
- [Setup Guide](./docs/SETUP.md)
- [Architecture Design](./docs/architecture-design-en.md)

---

## 📄 License

MIT

---

**Questions?** Check the [Setup Guide](./docs/SETUP.md) or open an issue.
