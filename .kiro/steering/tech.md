---
inclusion: always
---

# Technology Stack

## Build System

**Turborepo** - Monorepo build orchestration with caching
**Package Manager**: Yarn 4.5.0 (Berry)
**Node Version**: 20+

## Backend Stack (Medusa)

- **Framework**: Medusa v2.7.0 (headless commerce)
- **Runtime**: Node.js with TypeScript 5.7+
- **Database**: PostgreSQL with MikroORM 6.4.3
- **API**: RESTful endpoints (admin + store)
- **Testing**: Jest with SWC
- **Plugins**: Product reviews (`@lambdacurry/medusa-product-reviews`)

## Frontend Stack (Storefront)

- **Framework**: Remix (React Router v7.5.3)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.3.5
- **Forms**: remix-hook-form with Yup validation
- **State**: Zustand
- **Payments**: Stripe React SDK
- **HTTP Client**: Medusa JS SDK 2.7.0
- **Build Tool**: Vite 5.4.14

## Code Quality

- **Linting/Formatting**: Biome 1.9.3
- **Type Checking**: TypeScript strict mode
- **Testing**: Jest (backend), React Testing Library (frontend)

## Infrastructure

- **Containerization**: Docker + Docker Compose
- **Orchestration**: Kubernetes (Helm charts provided)
- **Deployment**: Supports Vercel, Netlify, Cloudflare

---

## Common Commands

### Setup & Installation

```bash
# Install dependencies
yarn

# Generate .env files
yarn generate-env

# Initialize Medusa database (Docker must be running)
yarn medusa:init
```

### Development

```bash
# Start all apps in dev mode
yarn dev

# Start specific app
yarn dev --filter=medusa
yarn dev --filter=storefront

# Build all apps
yarn build

# Type checking
yarn typecheck

# Format code
yarn format
```

### Medusa Backend

```bash
# Navigate to medusa directory
cd apps/medusa

# Database operations
yarn migrate              # Run migrations
yarn sync                 # Sync module links
yarn seed                 # Seed database
yarn nukedb              # Reset database (Docker)

# Development
yarn dev                  # Start dev server (port 9000)
yarn build               # Build for production
yarn start               # Start production server

# Testing
yarn test:unit
yarn test:integration:http
yarn test:integration:modules

# User management
yarn add-user            # Create admin user
```

### Storefront

```bash
# Navigate to storefront directory
cd apps/storefront

# Development
yarn dev                 # Start dev server (port 3000)
yarn build              # Build for production
yarn start              # Start production server

# Type checking
yarn typecheck

# Format
yarn format
```

### Workspace Commands

```bash
# Clean all node_modules
yarn clean

# Run command in specific workspace
turbo run build --filter=medusa
turbo run dev --filter=storefront
```

---

## Environment Variables

### Medusa (.env)

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hacktson-autobots
STRIPE_API_KEY=sk_test_...
REDIS_URL=redis://localhost:6379
```

### Storefront (.env)

```bash
MEDUSA_PUBLISHABLE_KEY=pk_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
MEDUSA_BACKEND_URL=http://localhost:9000
```

---

## Port Configuration

- **Medusa Backend**: http://localhost:9000
- **Medusa Admin**: http://localhost:9000/app
- **Storefront**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

---

## Key Libraries & Versions

| Package | Version | Purpose |
|---------|---------|---------|
| @medusajs/framework | 2.7.0 | Core backend framework |
| @medusajs/js-sdk | 2.7.0 | API client |
| @react-router/dev | 7.5.3 | Remix framework |
| react | 19.0.0 | UI library |
| tailwindcss | 3.3.5 | Styling |
| stripe | 9.12.0 | Payment processing |
| zustand | 4.4.7 | State management |
| yup | 1.4.0 | Schema validation |

---

## Testing Frameworks

- **Backend**: Jest with @swc/jest for fast compilation
- **Frontend**: React Testing Library
- **E2E**: Integration tests in `apps/medusa/integration-tests/`
