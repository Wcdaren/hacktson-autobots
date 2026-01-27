---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/workflows/**/*"
---

# Creating Workflows

Workflows are the standard way to perform mutations (create, update, delete) in Medusa. If you have built a custom module and need to perform mutations, you should create a workflow.

## Basic Workflow Structure

```typescript
// src/workflows/steps/create-my-model.ts
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"

export const createMyModelStep = createStep(
  "create-my-model",
  async (input: Input, { container }) => {
    const myModule = container.resolve("my")
    const [newMy] = await myModule.createMyModels({ ...input })

    return new StepResponse(newMy, newMy.id)
  },
  // Compensation function (rollback)
  async (id, { container }) => {
    const myModule = container.resolve("my")
    await myModule.deleteMyModels(id)
  }
)

// src/workflows/create-my-model.ts
import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createMyModelStep } from "./steps/create-my-model"

const createMyModel = createWorkflow(
  "create-my-model",
  function (input: Input) {
    const newMy = createMyModelStep(input)
    return new WorkflowResponse({ newMy })
  }
)

export default createMyModel
```

## Workflow Composition Rules

**The workflow function has critical constraints:**

```typescript
// ✅ CORRECT
const myWorkflow = createWorkflow(
  "name",
  function (input) { // Regular function, not async, not arrow
    const result = myStep(input) // No await
    return new WorkflowResponse(result)
  }
)

// ❌ WRONG
const myWorkflow = createWorkflow(
  "name",
  async (input) => { // ❌ No async, no arrow functions
    const result = await myStep(input) // ❌ No await
    if (input.condition) { /* ... */ } // ❌ No conditionals
    return new WorkflowResponse(result)
  }
)
```

**Constraints:**
- No async/await (runs at load time)
- No arrow functions (use `function`)
- No conditionals/ternaries (use `when()`)
- No variable manipulation (use `transform()`)

## Using Steps Multiple Times

**⚠️ CRITICAL**: Rename each step invocation with `.config()`:

```typescript
// ✅ CORRECT
const customer1 = fetchCustomerStep(customers[0])
const customer2 = fetchCustomerStep(customers[1]).config({
  name: "fetch-customer-2"
})

// ❌ WRONG - Duplicate step names cause runtime errors
const customer1 = fetchCustomerStep(customers[0])
const customer2 = fetchCustomerStep(customers[1])
```

## Using Built-in Steps

```typescript
import { createRemoteLinkStep, dismissRemoteLinkStep, useQueryGraphStep } from "@medusajs/medusa/core-flows"
```

### Creating Links

**⚠️ CRITICAL - Link Order**: Order MUST match `defineLink()`:

```typescript
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"

// If defineLink has review first, then product:
const linkData = transform({ review, input }, ({ review, input }) => [{
  [REVIEW_MODULE]: { review_id: review.id },
  [Modules.PRODUCT]: { product_id: input.product_id },
}])

createRemoteLinkStep(linkData)
```

### Querying Data

```typescript
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"

const { data: products } = useQueryGraphStep({
  entity: "product",
  fields: ["id", "title", "reviews.*"],
  filters: { id: input.product_id },
})
```

## Business Logic Placement

**CRITICAL**: All business logic and validation must be in workflow steps, NOT in API routes:

```typescript
// ✅ CORRECT - Validation in workflow step
export const deleteReviewStep = createStep(
  "delete-review",
  async ({ reviewId, customerId }: Input, { container }) => {
    const reviewModule = container.resolve("review")
    const review = await reviewModule.retrieveReview(reviewId)

    if (review.customer_id !== customerId) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "You can only delete your own reviews"
      )
    }

    await reviewModule.deleteReviews(reviewId)
    return new StepResponse({ id: reviewId }, reviewId)
  }
)
```

## Step Best Practices

1. **One mutation per step**: Ensures rollback mechanisms work correctly
2. **Idempotency**: Design steps to be safely retryable
3. **Explicit compensation input**: Specify what data the compensation function needs
4. **Return StepResponse**: Always wrap your return value
