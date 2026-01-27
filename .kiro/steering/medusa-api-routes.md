---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/api/**/*"
---

# Custom API Routes

API routes (also called "endpoints") are the primary way to expose custom functionality to storefronts and admin dashboards.

## Path Conventions

### Store API Routes (Storefront)
- **Path prefix**: `/store/<rest-of-path>`
- **Authentication**: SDK automatically includes publishable API key

### Admin API Routes (Dashboard)
- **Path prefix**: `/admin/<rest-of-path>`
- **Authentication**: SDK automatically includes auth headers (bearer/session)

## HTTP Methods

**⚠️ IMPORTANT**: Medusa uses only GET, POST and DELETE as a convention.
- **GET** for reads
- **POST** for mutations (create/update)
- **DELETE** for deletions

Don't use PUT or PATCH.

## Middleware Validation

**⚠️ CRITICAL**: Always validate request bodies using Zod schemas and the `validateAndTransformBody` middleware.

### Combining Multiple Middlewares

When you need both authentication AND validation, pass them as an array:

```typescript
// ✅ CORRECT - Multiple middlewares in array
export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/products/:id/reviews",
      method: "POST",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
        validateAndTransformBody(CreateReviewSchema)
      ],
    },
  ],
})
```

### Middleware Export Pattern

Middlewares are exported as **named arrays**, NOT default exports:

```typescript
// ✅ CORRECT - Named export of MiddlewareRoute array
// api/store/reviews/middlewares.ts
export const reviewMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/store/reviews",
    method: "POST",
    middlewares: [validateAndTransformBody(CreateReviewSchema)],
  },
]

// api/middlewares.ts
import { reviewMiddlewares } from "./store/reviews/middlewares"

export default defineMiddlewares({
  routes: [...reviewMiddlewares],
})
```

### Using Typed req.validatedBody

**⚠️ CRITICAL**: Pass the inferred Zod schema type as a type argument to `MedusaRequest`:

```typescript
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CreateMySchema } from "./middlewares"

// ✅ CORRECT: Pass the Zod schema type as type argument
export async function POST(
  req: MedusaRequest<CreateMySchema>,
  res: MedusaResponse
) {
  const { email, name } = req.validatedBody
  // ...
}
```

## Request Query Config for List Endpoints

For API routes that retrieve lists, use request query config:

```typescript
// middlewares.ts
import { createFindParams } from "@medusajs/medusa/api/utils/validators"

export const GetProductsSchema = createFindParams()

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/products",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(GetProductsSchema, {
          defaults: ["id", "title", "variants.*"],
          isList: true,
          defaultLimit: 15,
        }),
      ],
    },
  ],
})
```

**⚠️ CRITICAL**: When using `req.queryConfig`, do NOT explicitly set the `fields` property:

```typescript
// ✅ CORRECT: Only use ...req.queryConfig
const { data: products } = await query.graph({
  entity: "product",
  ...req.queryConfig,
})

// ❌ WRONG: Don't set fields explicitly when using queryConfig
const { data: products } = await query.graph({
  entity: "product",
  fields: ["id", "title"], // ❌ Type error!
  ...req.queryConfig,
})
```

## Import Organization

**⚠️ CRITICAL**: Always import workflows at the TOP of the file:

```typescript
// ✅ CORRECT - Imports at top
import { createReviewWorkflow } from "../../../workflows/create-review"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await createReviewWorkflow(req.scope).run({
    input: req.validatedBody
  })
  return res.json({ review: result })
}

// ❌ WRONG - Dynamic imports in route body
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { createReviewWorkflow } = await import("../../../workflows/create-review")
  // ...
}
```

## Protected Routes

### Default Protected Routes

- `/admin/*` - Requires authenticated admin user
- `/store/customers/me/*` - Requires authenticated customer

### Custom Protected Routes

```typescript
import { authenticate } from "@medusajs/framework/http"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/reviews*",
      middlewares: [authenticate("customer", ["session", "bearer"])],
    },
  ],
})
```

### Accessing Authenticated User

**⚠️ CRITICAL**: Use `AuthenticatedMedusaRequest` for protected routes:

```typescript
import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const customerId = req.auth_context.actor_id
  // ...
}
```

## Error Handling

```typescript
import { MedusaError } from "@medusajs/framework/utils"

throw new MedusaError(MedusaError.Types.NOT_FOUND, "Resource not found")
throw new MedusaError(MedusaError.Types.INVALID_DATA, "Invalid input")
throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "Authentication required")
throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "Permission denied")
throw new MedusaError(MedusaError.Types.CONFLICT, "Resource already exists")
```

## Using Workflows in API Routes

**⚠️ BEST PRACTICE**: Workflows are the standard way to perform mutations. API routes should execute workflows and return their response.

```typescript
import { myCustomWorkflow } from "../../workflows/my-workflow"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await myCustomWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  return res.json({ result })
}
```
