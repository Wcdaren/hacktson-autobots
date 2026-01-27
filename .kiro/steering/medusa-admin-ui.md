---
inclusion: fileMatch
fileMatchPattern: "apps/medusa/src/admin/**/*"
---

# Medusa Admin Dashboard Customizations

Build custom UI extensions for the Medusa Admin dashboard using the Admin SDK and Medusa UI components.

## SDK Client Configuration

```tsx
// src/admin/lib/client.ts
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",
  debug: import.meta.env.DEV,
  auth: { type: "session" },
})
```

## Critical Data Loading Pattern

**ALWAYS follow this pattern - never load display data conditionally:**

```tsx
const RelatedProductsWidget = ({ data: product }) => {
  const [modalOpen, setModalOpen] = useState(false)

  // Display query - loads on mount (NO enabled condition!)
  const { data: displayProducts } = useQuery({
    queryFn: () => fetchSelectedProducts(selectedIds),
    queryKey: ["related-products-display", product.id],
  })

  // Modal query - loads when needed
  const { data: modalProducts } = useQuery({
    queryFn: () => sdk.admin.product.list({ limit: 10, offset: 0 }),
    queryKey: ["products-selection"],
    enabled: modalOpen, // OK for modal-only data
  })

  // Mutation with proper invalidation
  const updateProduct = useMutation({
    mutationFn: updateFunction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["related-products-display", product.id] })
    },
  })

  return (/* ... */)
}
```

## Widget Structure

```tsx
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Text } from "@medusajs/ui"
import { DetailWidgetProps } from "@medusajs/framework/types"
import { HttpTypes } from "@medusajs/types"

const MyWidget = ({ data }: DetailWidgetProps<HttpTypes.AdminProduct>) => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Section Title</Heading>
        <Button size="small" variant="secondary" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <div className="px-6 py-4">
        {/* Content */}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default MyWidget
```

## UI Route (Custom Page)

```tsx
import { defineRouteConfig } from "@medusajs/admin-sdk"

const CustomPage = () => {
  return <div>Page content</div>
}

export const config = defineRouteConfig({
  label: "Custom Page",
})

export default CustomPage
```

## Typography Guidelines

### Headings/Labels

```tsx
<Text size="small" leading="compact" weight="plus">
  {labelText}
</Text>
```

### Body/Descriptions

```tsx
<Text size="small" leading="compact" className="text-ui-fg-subtle">
  {descriptionText}
</Text>
```

**Rules:**
- Never use `<Heading>` for small sections within widgets
- Always use `size="small"` and `leading="compact"` for consistency
- Use `weight="plus"` for labels and headings
- Use `className="text-ui-fg-subtle"` for secondary text

## Design System

### Semantic Colors

- `bg-ui-bg-base`, `bg-ui-bg-component`, `bg-ui-bg-component-hover`
- `text-ui-fg-base`, `text-ui-fg-subtle`, `text-ui-fg-muted`
- `text-ui-fg-error`, `text-ui-fg-success`

### Spacing

- Section padding: `px-6 py-4`
- List gaps: `gap-2`
- Item gaps: `gap-3`

### Buttons

Always use `size="small"` for buttons in widgets and tables.

## Forms & Modals

### FocusModal vs Drawer

- **FocusModal**: Use for creating new entities
- **Drawer**: Use for editing existing entities

### FocusModal Example

```tsx
<FocusModal open={open} onOpenChange={setOpen}>
  <FocusModal.Content>
    <div className="flex h-full flex-col overflow-hidden">
      <FocusModal.Header>
        <div className="flex items-center justify-end gap-x-2">
          <FocusModal.Close asChild>
            <Button size="small" variant="secondary">Cancel</Button>
          </FocusModal.Close>
          <Button size="small" onClick={handleSubmit} isLoading={isPending}>
            Save
          </Button>
        </div>
      </FocusModal.Header>
      <FocusModal.Body className="flex-1 overflow-auto">
        {/* Form content */}
      </FocusModal.Body>
    </div>
  </FocusModal.Content>
</FocusModal>
```

### Drawer Example

```tsx
<Drawer open={open} onOpenChange={setOpen}>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Edit Settings</Drawer.Title>
    </Drawer.Header>
    <Drawer.Body className="flex-1 overflow-auto p-4">
      {/* Form content */}
    </Drawer.Body>
    <Drawer.Footer>
      <div className="flex items-center justify-end gap-x-2">
        <Drawer.Close asChild>
          <Button size="small" variant="secondary">Cancel</Button>
        </Drawer.Close>
        <Button size="small" onClick={handleSubmit}>Save</Button>
      </div>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer>
```

## Selection Patterns

### Small Datasets (2-10 options)

Use Select component.

### Large Datasets (Products, Categories, etc.)

Use DataTable with FocusModal:

```tsx
const table = useDataTable({
  data: data?.products || [],
  columns,
  getRowId: (row) => row.id,
  rowCount: data?.count || 0,
  isLoading,
  rowSelection: { state: rowSelection, onRowSelectionChange: setRowSelection },
  search: { state: searchValue, onSearchChange: setSearchValue },
  pagination: { state: pagination, onPaginationChange: setPagination },
})

<DataTable instance={table}>
  <DataTable.Toolbar>
    <DataTable.Search placeholder="Search..." />
  </DataTable.Toolbar>
  <DataTable.Table />
  <DataTable.Pagination />
</DataTable>
```

## Navigation

```tsx
import { Link, useNavigate, useParams } from "react-router-dom"

<Link to={`/products/${product.id}`}>View Product</Link>

const navigate = useNavigate()
navigate(`/products/${result.product.id}`)

const { id } = useParams()
```

## Backend Integration

```tsx
// Fetch from custom backend route
const { data } = useQuery({
  queryKey: ["reviews", product.id],
  queryFn: () => sdk.client.fetch(`/admin/products/${product.id}/reviews`),
})

// Mutation to custom backend route
const createReview = useMutation({
  mutationFn: (data) => sdk.client.fetch("/admin/reviews", {
    method: "POST",
    body: data
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["reviews", product.id] })
    toast.success("Review created")
  },
})
```
