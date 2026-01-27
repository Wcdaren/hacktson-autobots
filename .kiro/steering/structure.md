---
inclusion: always
---

# Project Structure & Organization

## Monorepo Architecture

Turborepo-managed monorepo with two primary applications:

```
.
├── apps/
│   ├── medusa/          # Backend: Medusa v2 API + Admin
│   └── storefront/      # Frontend: Remix storefront
├── helm-charts/         # Kubernetes deployment
├── .kiro/steering/      # AI guidance documents
└── [root configs]       # turbo.json, biome.json, package.json
```

**Working Directory Rules:**
- Backend work: `cd apps/medusa`
- Frontend work: `cd apps/storefront`
- Monorepo commands: Run from root with `yarn` or `turbo`

---

## Medusa Backend Structure

### Directory Layout

```
apps/medusa/src/
├── api/              # HTTP endpoints (see medusa-api-routes.md)
│   ├── admin/        # Admin-only endpoints
│   └── store/        # Public storefront endpoints
├── modules/          # Custom domain modules (see medusa-modules.md)
├── workflows/        # Multi-step processes (see medusa-workflows.md)
├── subscribers/      # Event handlers (see medusa-subscribers.md)
├── jobs/            # Scheduled tasks (see medusa-jobs.md)
├── links/           # Module relationships
├── scripts/         # CLI utilities (seed, migrate)
└── admin/           # Admin UI customizations (see medusa-admin-ui.md)
```

### File Placement Rules

**API Routes:**
- Admin: `src/api/admin/[resource]/route.ts`
- Store: `src/api/store/[resource]/route.ts`
- Each route exports HTTP method handlers: `GET`, `POST`, `DELETE`

**Modules:**
- Location: `src/modules/[module-name]/`
- Structure: `models/`, `services/`, `migrations/`, `index.ts`
- Export module definition from `index.ts`

**Workflows:**
- Location: `src/workflows/[workflow-name].ts`
- Export workflow definition with steps
- Use for multi-step operations requiring rollback

**Subscribers:**
- Location: `src/subscribers/[event-name].ts`
- Export default subscriber function
- Subscribe to Medusa events (e.g., `order.placed`)

---

## Storefront Structure

### Directory Layout

```
apps/storefront/app/
├── components/       # React components (feature-organized)
│   ├── common/       # Reusable UI primitives
│   ├── cart/         # Cart drawer, line items
│   ├── checkout/     # Checkout flow
│   ├── product/      # Product displays
│   ├── reviews/      # Review system
│   └── layout/       # Header, footer, nav
├── routes/           # File-based routing (Remix)
├── hooks/            # Custom React hooks
├── providers/        # Context providers
├── templates/        # Page templates
└── styles/           # Global CSS

apps/storefront/libs/
├── config/site/      # Site settings, navigation
└── util/
    ├── server/       # Server-side utilities
    │   └── data/     # Data fetching (*.server.ts)
    ├── forms/        # Form utilities
    └── addresses/    # Address handling
```

### Component Organization

**Placement Rules:**
- **Common components** → `app/components/common/[category]/`
  - Examples: `buttons/`, `forms/`, `card/`, `modals/`, `images/`
- **Feature components** → `app/components/[feature]/`
  - Examples: `cart/`, `checkout/`, `product/`, `reviews/`
- **Layout components** → `app/components/layout/`
  - Examples: `Header.tsx`, `Footer.tsx`, `Navigation.tsx`

**Component File Structure:**
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests (optional)
└── index.ts               # Re-export
```

### Routing Conventions

**File-based routing in `app/routes/`:**
- `_index.tsx` → `/` (homepage)
- `products.$handle.tsx` → `/products/:handle`
- `collections.$handle.tsx` → `/collections/:handle`
- `checkout._index.tsx` → `/checkout`
- `checkout.payment.tsx` → `/checkout/payment`

**Route File Structure:**
```typescript
// loader: Server-side data fetching
export async function loader({ params, request }: LoaderFunctionArgs) {}

// action: Form submissions
export async function action({ request }: ActionFunctionArgs) {}

// Component: UI rendering
export default function Route() {}
```

### Data Fetching

**Server-side data functions in `libs/util/server/data/`:**
- `products.server.ts` - Product queries
- `cart.server.ts` - Cart operations
- `customer.server.ts` - Customer data
- `orders.server.ts` - Order management
- `collections.server.ts` - Collection queries

**Usage Pattern:**
```typescript
// In route loader
import { getProduct } from '@libs/util/server/data/products.server'

export async function loader({ params }: LoaderFunctionArgs) {
  const product = await getProduct(params.handle)
  return json({ product })
}
```

---

## Naming Conventions

### Files & Directories

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `ProductCard.tsx` |
| Utilities | camelCase | `formatPrice.ts` |
| Server utilities | camelCase + `.server.ts` | `products.server.ts` |
| Remix routes | Remix conventions | `products.$handle.tsx` |
| Tests | `*.test.ts` or `*.spec.ts` | `ProductCard.test.tsx` |
| Feature directories | kebab-case | `product-reviews/` |
| Component directories | PascalCase | `ProductCard/` |

### Code Identifiers

| Type | Convention | Example |
|------|-----------|---------|
| Classes/Interfaces | PascalCase | `ProductService`, `CartItem` |
| Functions/Variables | camelCase | `getProduct`, `cartTotal` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_CART_ITEMS` |
| Types | PascalCase + suffix | `ProductCardProps`, `CartState` |
| Enums | PascalCase | `OrderStatus` |

---

## Import Patterns

### Storefront Import Aliases

```typescript
// Configured in tsconfig.json
import { Button } from '@app/components/common/buttons'
import { formatPrice } from '@libs/util/formatters'
import { getProduct } from '@libs/util/server/data/products.server'
```

### Medusa Imports

```typescript
// Framework imports
import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

// Relative imports for local modules
import { MyModuleService } from '../modules/my-module/services/my-module'
```

---

## Testing Conventions

### Medusa Tests

```
apps/medusa/
├── integration-tests/http/    # API integration tests
│   └── [feature].spec.ts
└── src/modules/[module]/
    └── __tests__/            # Unit tests
        └── [service].test.ts
```

**Test file naming:** `[feature].spec.ts` or `[unit].test.ts`

### Storefront Tests

```
apps/storefront/app/components/
└── [component]/
    └── __tests__/
        └── [Component].test.tsx
```

**Test utilities:** React Testing Library, Jest

---

## Configuration Files

### Root Level
- `package.json` - Workspace dependencies
- `turbo.json` - Build pipeline configuration
- `biome.json` - Linting/formatting rules
- `.yarnrc.yml` - Yarn 4 configuration

### Medusa (`apps/medusa/`)
- `medusa-config.ts` - Medusa framework config (modules, plugins, database)
- `tsconfig.json` - TypeScript compiler options
- `jest.config.js` - Test runner configuration
- `docker-compose.yaml` - Local PostgreSQL/Redis services

### Storefront (`apps/storefront/`)
- `vite.config.ts` - Build tool configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `postcss.config.mjs` - PostCSS plugins

---

## Architecture Patterns

### Backend (Medusa)

**Module Pattern:**
- Self-contained domain logic with models, services, migrations
- Dependency injection via Medusa container
- Export module definition from `index.ts`

**Workflow Pattern:**
- Multi-step processes with automatic rollback on failure
- Use for complex operations (order fulfillment, returns)
- Define steps as separate functions

**Subscriber Pattern:**
- Event-driven side effects
- Subscribe to Medusa events (e.g., `order.placed`, `product.created`)
- Async handlers for non-blocking operations

**API Route Pattern:**
- RESTful endpoints with validation
- Separate admin and store routes
- Use middleware for authentication/authorization

### Frontend (Storefront)

**Loader Pattern:**
- Server-side data fetching in route loaders
- Return JSON data to components
- Handle errors with error boundaries

**Action Pattern:**
- Form submissions via Remix actions
- Server-side validation and mutations
- Return redirect or JSON responses

**Hook Pattern:**
- Reusable stateful logic
- Custom hooks in `app/hooks/`
- Examples: `useCart`, `useCustomer`, `useRegion`

**Provider Pattern:**
- Global state management with React Context
- Providers in `app/providers/`
- Examples: `StorefrontProvider`, `CheckoutProvider`

**Component Pattern:**
- Composable UI building blocks
- Feature-based organization
- Shared primitives in `common/`

---

## Environment Files

- `.env.template` - Template with all required variables
- `.env` - Local development (gitignored)
- `.env.production` - Production overrides (gitignored)

**Never commit `.env` files with secrets**

---

## File Creation Guidelines

**When creating new files:**

1. **Medusa API Route:** Use `src/api/[admin|store]/[resource]/route.ts`
2. **Medusa Module:** Create directory `src/modules/[name]/` with `index.ts`
3. **Medusa Workflow:** Use `src/workflows/[name].ts`
4. **Medusa Subscriber:** Use `src/subscribers/[event].ts`
5. **Storefront Component:** Use `app/components/[feature]/[Component].tsx`
6. **Storefront Route:** Use `app/routes/[path].tsx` (Remix conventions)
7. **Storefront Hook:** Use `app/hooks/use[Name].ts`
8. **Storefront Utility:** Use `libs/util/[category]/[name].ts`
9. **Server Utility:** Use `libs/util/server/[category]/[name].server.ts`

**Always:**
- Follow naming conventions
- Add TypeScript types
- Include JSDoc comments for public APIs
- Co-locate tests with implementation
