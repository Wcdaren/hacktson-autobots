---
inclusion: fileMatch
fileMatchPattern: 'apps/storefront/**/*.{ts,tsx}'
---

# Remix Form Handling with remix-hook-form

## Overview

This project uses `remix-hook-form` with Zod validation for form handling. This provides type-safe forms with React Hook Form integration.

## Key Dependencies

- `remix-hook-form`: 5.1.1
- `@hookform/resolvers`: For Zod schema resolution
- `zod`: For schema validation
- `@lambdacurry/forms`: ^0.13.4 (pre-built form components)

## Form Validation

### Zod Schema Definition

```typescript
import { z } from "zod"

const schema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  age: z.number().min(18, "Must be at least 18 years old").optional(),
})

type FormData = z.infer<typeof schema>
```

## Form Components

### Basic Form Setup

```typescript
import { RemixFormProvider, useRemixForm } from "remix-hook-form"
import { TextField, Textarea, Checkbox } from "@lambdacurry/forms/remix-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export default function MyForm() {
  const form = useRemixForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  return (
    <RemixFormProvider {...form}>
      <form method="post">
        <TextField 
          name="name" 
          label="Name" 
          required 
        />
        <TextField 
          name="email" 
          label="Email" 
          type="email"
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </RemixFormProvider>
  )
}
```

### Available Form Components

From `@lambdacurry/forms/remix-hook-form`:
- `TextField` - Text input fields
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox input
- Other pre-built components

## Form Submission

### Action Handler

```typescript
import type { ActionFunctionArgs } from "@remix-run/node"
import { data } from "@remix-run/node"
import { getValidatedFormData } from "remix-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data: formData,
    receivedValues,
  } = await getValidatedFormData<FormData>(request, zodResolver(schema))

  if (errors) {
    return data({ errors }, { status: 400 })
  }

  try {
    // Process form data
    await processForm(formData)
    return data({ success: true })
  } catch (error) {
    return data(
      { errors: { root: { message: "Something went wrong" } } },
      { status: 500 }
    )
  }
}
```

## Error Handling

### Field-Level Errors

Automatically handled by form components when validation fails.

### Form-Level Errors

```typescript
import { FieldErrors } from 'react-hook-form'

// For form-wide errors:
return data(
  { errors: { root: { message: 'Error message' } } as FieldErrors },
  { status: 400 }
)
```

### Using Form Context

```typescript
import { useRemixFormContext } from "remix-hook-form"

function CustomComponent() {
  const { formState: { errors } } = useRemixFormContext()
  
  return (
    <div>
      {errors.root && (
        <div className="error">{errors.root.message}</div>
      )}
    </div>
  )
}
```

## Response Handling

Always use `data` from `@remix-run/node` for responses:

```typescript
import { data } from '@remix-run/node'

// Success response
return data({ success: true }, { headers: responseHeaders })

// Error response
return data({ errors: { root: { message: 'Error' } } }, { status: 400 })
```

## Migration Notes

This replaces the older `remix-validated-form` + Yup pattern. Key changes:

1. **Validation**: Yup → Zod
2. **Form Provider**: `ValidatedForm` → `RemixFormProvider`
3. **Form Context**: `useField` → `useRemixFormContext`
4. **Components**: Custom fields → `@lambdacurry/forms` components
5. **Submission**: Built-in validation → `getValidatedFormData` with Zod resolver
6. **Responses**: `json` → `data` function

## Best Practices

- Define Zod schemas at the top of your route file
- Use TypeScript inference with `z.infer<typeof schema>`
- Handle both field-level and form-level errors
- Use pre-built components from `@lambdacurry/forms` when possible
- Always validate on the server side in actions
- Return proper HTTP status codes (400 for validation, 500 for errors)
