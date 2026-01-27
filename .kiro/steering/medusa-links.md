---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/links/**/*"
---

# Module Links

Module links create associations between data models in different modules while maintaining module isolation.

## When to Use Links

- **Extend commerce entities**: Add brands to products, wishlists to customers
- **Cross-module associations**: Connect custom modules to each other
- **Maintain isolation**: Keep modules independent and reusable

## Defining a Link

**⚠️ CRITICAL: Create ONE link definition per file.**

```typescript
// src/links/product-brand.ts
import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import BrandModule from "../modules/brand"

export default defineLink(
  ProductModule.linkable.product,
  BrandModule.linkable.brand
)
```

**If one model links to multiple others, create multiple files:**

```typescript
// ✅ CORRECT - src/links/review-product.ts
export default defineLink(
  ReviewModule.linkable.review,
  ProductModule.linkable.product
)

// ✅ CORRECT - src/links/review-customer.ts
export default defineLink(
  ReviewModule.linkable.review,
  CustomerModule.linkable.customer
)

// ❌ WRONG - Don't export array of links from one file
export default [
  defineLink(ReviewModule.linkable.review, ProductModule.linkable.product),
  defineLink(ReviewModule.linkable.review, CustomerModule.linkable.customer),
]
```

**IMPORTANT:** The `.linkable` property is automatically added to all modules. You do NOT need to add `.linkable()` to your data models.

## Link Configuration Options

### List Links (One-to-Many)

```typescript
export default defineLink(
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
  BrandModule.linkable.brand
)
```

### Delete Cascades

```typescript
export default defineLink(ProductModule.linkable.product, {
  linkable: BrandModule.linkable.brand,
  deleteCascade: true,
})
```

## After Defining Links

**⚠️ CRITICAL: Run migrations immediately:**

```bash
npx medusa db:migrate
```

## Managing Links

**⚠️ CRITICAL - Link Order**: Order MUST match `defineLink()`:

### In Workflow Composition Functions

```typescript
import { createRemoteLinkStep, dismissRemoteLinkStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

// If defineLink has product first, then brand:
const linkData = transform({ input }, ({ input }) => [{
  [Modules.PRODUCT]: { product_id: input.product_id },
  [BRAND_MODULE]: { brand_id: input.brand_id },
}])

createRemoteLinkStep(linkData)
// or
dismissRemoteLinkStep(linkData)
```

### Outside Workflows

```typescript
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

const link = container.resolve(ContainerRegistrationKeys.LINK)

// Create a link
await link.create({
  [Modules.PRODUCT]: { product_id: "prod_123" },
  [BRAND_MODULE]: { brand_id: "brand_456" },
})

// Dismiss a link
await link.dismiss({
  [Modules.PRODUCT]: { product_id: "prod_123" },
  [BRAND_MODULE]: { brand_id: "brand_456" },
})
```

## Querying Linked Data

```typescript
const query = container.resolve("query")

const { data: products } = await query.graph({
  entity: "product",
  fields: ["id", "title", "brand.*"],
  filters: { id: "prod_123" },
})

// Access linked data
console.log(products[0].brand.name)
```

## Advanced: Link with Custom Columns

```typescript
export default defineLink(
  ProductModule.linkable.product,
  BrandModule.linkable.brand,
  {
    database: {
      extraColumns: {
        featured: {
          type: "boolean",
          defaultValue: "false",
        },
      },
    },
  }
)
```

Set custom column values:

```typescript
await link.create({
  product: { product_id: "prod_123" },
  brand: { brand_id: "brand_456" },
  data: { featured: true },
})
```
