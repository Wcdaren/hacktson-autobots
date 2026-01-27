---
inclusion: always
---

# Product Overview

**Medusa 2 + Remix E-Commerce Platform** - A production-ready e-commerce monorepo for rapid development.

## What This Is

A full-stack e-commerce platform integrating:
- **Backend**: Medusa v2 headless commerce engine
- **Frontend**: Remix-based storefront with React Router v7
- **Features**: Product reviews, collections, categories, and full checkout flow

## Key Features

- Dynamic storefront with unlimited products, collections, categories, and tags
- Stripe payment integration with Express Checkout support (Apple Pay, Google Pay)
- Product review system via `@lambdacurry/medusa-product-reviews`
- Responsive design with Tailwind CSS
- TypeScript throughout for type safety
- Docker-based development environment

## Architecture

**Monorepo Structure**: Turborepo managing multiple apps
- `apps/medusa` - Backend API and admin
- `apps/storefront` - Customer-facing Remix app
- `helm-charts/` - Kubernetes deployment configs

## User Roles

- **Admin**: Manages products, orders, customers via Medusa Admin (port 9000)
- **Customer**: Browses products, adds to cart, checks out via storefront
