# Contributing Guide

Thank you for your interest in contributing to the Medusa 2 Starter with Remix Storefront!

## Development Setup

### Prerequisites

- Node.js 20+
- Yarn 4.5.0
- Docker Desktop (running)
- Git

### Initial Setup

1. Fork and clone the repository
2. Install dependencies: `yarn`
3. Generate environment files: `yarn generate-env`
4. Initialize database: `yarn medusa:init`
5. Start development: `yarn dev`

## Project Structure

```
hacktson-autobots/
├── apps/
│   ├── medusa/              # Medusa v2 Backend
│   │   ├── src/
│   │   │   ├── api/         # API routes (admin & store)
│   │   │   ├── modules/     # Custom Medusa modules
│   │   │   ├── workflows/   # Multi-step business processes
│   │   │   ├── subscribers/ # Event handlers
│   │   │   └── scripts/     # Seed and utility scripts
│   │   └── integration-tests/
│   └── storefront/          # Remix Frontend
│       ├── app/
│       │   ├── components/  # React components
│       │   ├── routes/      # File-based routing
│       │   ├── hooks/       # Custom React hooks
│       │   └── providers/   # Context providers
│       └── libs/
│           ├── config/      # App configuration
│           └── util/        # Utility functions
├── helm-charts/             # Kubernetes deployment
└── [config files]
```

## Development Workflow

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes locally
4. Format code: `yarn format`
5. Type check: `yarn typecheck`
6. Commit with clear messages
7. Push and create a Pull Request

### Code Style

We use **Biome** for code formatting and linting:

```bash
# Format all files
yarn format

# Check TypeScript types
yarn typecheck
```

**Conventions:**
- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Types/Interfaces**: PascalCase with descriptive suffixes

### Testing

#### Backend Tests

```bash
cd apps/medusa

# Unit tests
yarn test:unit

# Integration tests
yarn test:integration:http
yarn test:integration:modules
```

#### Frontend Tests

```bash
cd apps/storefront

# Run tests (when implemented)
yarn test
```

## Adding Features

### Adding a New Medusa Module

1. Create module directory: `apps/medusa/src/modules/my-module/`
2. Define models in `models/`
3. Implement services in `services/`
4. Create migrations in `migrations/`
5. Export module in `index.ts`

Example structure:
```
modules/my-module/
├── models/
│   └── my-entity.ts
├── services/
│   └── my-service.ts
├── migrations/
│   └── Migration20240101000000.ts
└── index.ts
```

### Adding a New API Route

**Admin Route:**
```typescript
// apps/medusa/src/api/admin/my-resource/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Implementation
}
```

**Store Route:**
```typescript
// apps/medusa/src/api/store/my-resource/route.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Implementation
}
```

### Adding a New Storefront Component

1. Create component file: `apps/storefront/app/components/my-component/MyComponent.tsx`
2. Add styles using Tailwind CSS
3. Export from `index.ts` if needed
4. Use in routes or other components

Example:
```tsx
// apps/storefront/app/components/my-component/MyComponent.tsx
export function MyComponent({ title }: { title: string }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}
```

### Adding a New Route

Create a file in `apps/storefront/app/routes/`:

```tsx
// apps/storefront/app/routes/my-page.tsx
import { json, type LoaderFunctionArgs } from "react-router"
import { useLoaderData } from "react-router"

export async function loader({ request }: LoaderFunctionArgs) {
  // Fetch data
  return json({ data: "example" })
}

export default function MyPage() {
  const { data } = useLoaderData<typeof loader>()
  return <div>{data}</div>
}
```

## Database Changes

### Creating a Migration

```bash
cd apps/medusa
yarn medusa db:generate MyMigrationName
```

### Running Migrations

```bash
yarn medusa db:migrate
```

### Seeding Data

Edit `apps/medusa/src/scripts/seed.ts` and run:

```bash
yarn medusa:init
```

## Environment Variables

### Adding New Environment Variables

1. Add to `.env.template` files
2. Document in README.md
3. Update relevant configuration files

### Required Variables

**Medusa:**
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `STRIPE_API_KEY` - Stripe secret key (optional)

**Storefront:**
- `MEDUSA_PUBLISHABLE_KEY` - Medusa API key
- `STRIPE_PUBLIC_KEY` - Stripe public key (optional)
- `STRIPE_SECRET_KEY` - Stripe secret key (optional)

## Common Tasks

### Reset Database

```bash
yarn medusa:init
```

### Clear Cache

```bash
rm -rf apps/medusa/.medusa
rm -rf apps/storefront/.react-router
```

### Update Dependencies

```bash
yarn upgrade-interactive
```

### Build for Production

```bash
yarn build
```

## Troubleshooting Development Issues

### Port Conflicts

If ports 3000 or 9000 are in use:

```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:9000 | xargs kill -9
```

### Docker Issues

```bash
# Restart containers
cd apps/medusa
docker-compose down
docker-compose up -d
```

### Module Resolution Issues

```bash
# Clear node_modules and reinstall
yarn clean
yarn
```

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows project conventions
- [ ] All tests pass
- [ ] Code is formatted (`yarn format`)
- [ ] TypeScript types are correct (`yarn typecheck`)
- [ ] Changes are documented
- [ ] Commit messages are clear

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code formatted
- [ ] Tests added/updated
- [ ] Documentation updated
```

## Getting Help

- **Documentation**: Check [Medusa Docs](https://docs.medusajs.com/) and [Remix Docs](https://remix.run/docs)
- **Issues**: Search existing GitHub issues
- **Discord**: Join the Medusa community
- **Questions**: Open a GitHub discussion

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing! 🎉
