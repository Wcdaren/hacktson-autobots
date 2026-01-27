---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/**/*"
---

# Querying Data in Medusa

Medusa's Query API (`query.graph()`) is the primary way to retrieve data, especially across modules.

## When to Use Query vs Module Services

**USE QUERY FOR:**
- ✅ Retrieving data **across modules** (products with linked brands)
- ✅ Reading data with linked entities
- ✅ Complex queries with multiple relations

**USE MODULE SERVICES FOR:**
- ✅ Retrieving data **within a single module** (products with variants)
- ✅ Using `listAndCount` for pagination within one module
- ✅ Mutations (always use module services or workflows)

## Basic Query Structure

```typescript
const query = req.scope.resolve("query")

const { data } = await query.graph({
  entity: "entity_name",
  fields: ["id", "name"],
  filters: { status: "active" },
  pagination: { take: 10, skip: 0 },
})
```

## In Workflows

Use `useQueryGraphStep`:

```typescript
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"

const { data: products } = useQueryGraphStep({
  entity: "product",
  fields: ["id", "title"],
  filters: { id: input.product_id },
})
```

## Field Selection

```typescript
const { data } = await query.graph({
  entity: "product",
  fields: [
    "id",
    "title",
    "variants.*",      // All fields from variants
    "variants.sku",    // Specific variant field
    "category.id",
    "category.name",
  ],
})
```

**⚠️ Performance Tip**: Only retrieve fields you'll actually use.

## Filtering

```typescript
// Exact match
filters: { email: "user@example.com" }

// Multiple values (IN)
filters: { id: ["id1", "id2", "id3"] }

// Range queries
filters: {
  created_at: {
    $gte: startDate,
    $lte: endDate,
  }
}

// Text search (LIKE)
filters: { name: { $like: "%search%" } }

// Not equal
filters: { status: { $ne: "deleted" } }
```

## Important Filtering Limitation

**⚠️ CRITICAL**: You **CANNOT** filter by fields from linked data models (different modules).

```typescript
// ❌ THIS DOES NOT WORK
const { data: products } = await query.graph({
  entity: "product",
  fields: ["id", "title", "brand.*"],
  filters: {
    "brand.name": "Nike" // ❌ Cannot filter by linked module field
  }
})

// ✅ CORRECT: Query from the other side
const { data: brands } = await query.graph({
  entity: "brand",
  fields: ["id", "name", "products.*"],
  filters: { name: "Nike" }
})

const nikeProducts = brands[0]?.products || []
```

## Pagination

```typescript
const { data, metadata } = await query.graph({
  entity: "product",
  fields: ["id", "title"],
  pagination: {
    skip: 0,
    take: 10,
    order: { created_at: "DESC" },
  },
})

console.log(`Total: ${metadata.count}`)
```

## Querying Linked Data

```typescript
const { data: products } = await query.graph({
  entity: "product",
  fields: ["id", "title", "brand.*"],
  filters: { id: "prod_123" },
})

console.log(products[0].brand.name)
```

## Validation with throwIfKeyNotFound

```typescript
const { data } = await query.graph({
  entity: "product",
  fields: ["id", "title"],
  filters: { id: productId },
}, {
  throwIfKeyNotFound: true, // Throws if product doesn't exist
})
```

## Performance Best Practices

1. **Only Query What You Need**
```typescript
// ❌ BAD
fields: ["*"]

// ✅ GOOD
fields: ["id", "title", "price"]
```

2. **Limit Relation Depth**
3. **Use Pagination for Large Result Sets**
4. **Filter Early** to reduce the data set
