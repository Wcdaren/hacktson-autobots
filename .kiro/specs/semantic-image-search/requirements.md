# Semantic Search and Image Search Feature Requirements

## Feature Overview

Add semantic search and image search capabilities to the e-commerce platform to enhance user search experience. The search is transparent to users - they simply search and get the best results without needing to understand the underlying technology.

Key features:
- **Hybrid Search** - Combines keyword matching and semantic understanding (transparent to users)
- **Image Search** - Upload an image to find visually similar products
- **Region-Aware Pricing** - Search results display correct prices based on user's region

Uses AWS ecosystem (Bedrock + Rekognition) as the AI service provider.

## User Stories

### 1. Smart Search (Hybrid - Transparent to Users)

#### 1.1 Natural Language Search
**As a** shopping user  
**I want to** describe the product I'm looking for using natural language  
**So that** I can find suitable products even without knowing the exact product name

**Acceptance Criteria:**
- 1.1.1 When user inputs "comfortable sofa for small living room", the system returns relevant sofa products
- 1.1.2 Search results are sorted by relevance (combining keyword match and semantic similarity)
- 1.1.3 Search response time does not exceed 2 seconds
- 1.1.4 Supports natural language queries in both English and Chinese
- 1.1.5 Users do NOT see "semantic" vs "keyword" match labels - search is transparent

#### 1.2 Search Flow
**As a** shopping user  
**I want to** search from the header and see results on a dedicated page  
**So that** I have a consistent and intuitive search experience

**Acceptance Criteria:**
- 1.2.1 Header contains a search input that navigates to /search page on submit
- 1.2.2 Search page displays results with filters and pagination
- 1.2.3 URL state is synchronized (shareable search links)
- 1.2.4 Mobile: Header shows search icon, tapping navigates to search page

### 2. Image Search

#### 2.1 Image Upload Search
**As a** shopping user  
**I want to** upload an image to search for similar products  
**So that** I can find products I've seen elsewhere that I like

**Acceptance Criteria:**
- 2.1.1 Camera icon displayed in search box on search page
- 2.1.2 Support drag-and-drop image upload
- 2.1.3 Support JPG, PNG, WebP formats, maximum 5MB
- 2.1.4 Display image preview and loading state after upload
- 2.1.5 Display visually similar product list after search completes

#### 2.2 Image Search Results
**As a** shopping user  
**I want to** see products visually similar to the uploaded image  
**So that** I can quickly find the products I want

**Acceptance Criteria:**
- 2.2.1 Results sorted by visual similarity
- 2.2.2 Support using filters on image search results
- 2.2.3 Can clear image search and return to normal search mode

### 3. Region-Aware Pricing

#### 3.1 Price Display by Region
**As a** shopping user  
**I want to** see prices in my region's currency  
**So that** I understand the actual cost of products

**Acceptance Criteria:**
- 3.1.1 Search results display prices based on user's selected region
- 3.1.2 Price shown as "From $XXX" (minimum variant price)
- 3.1.3 Price range filter works correctly per region
- 3.1.4 If region price not available, show default price

### 4. Backend Indexing

#### 4.1 Product Vector Indexing
**As a** system administrator  
**I want to** have product data automatically generate vector embeddings and index  
**So that** semantic search and image search features are supported

**Acceptance Criteria:**
- 4.1.1 Automatically generate text embedding vectors when products are created/updated
- 4.1.2 Automatically generate image embedding vectors for product images
- 4.1.3 Index per-region prices for each product
- 4.1.4 Vector data stored in OpenSearch k-NN index
- 4.1.5 Support batch index rebuild management function

#### 4.2 Embedding Service Integration
**As a** developer  
**I want to** use AWS Bedrock to generate text embeddings  
**So that** I can leverage the advantages of the AWS ecosystem

**Acceptance Criteria:**
- 4.2.1 Use AWS Bedrock Titan Embeddings model to generate text vectors
- 4.2.2 Use AWS Rekognition to process images
- 4.2.3 Retry mechanism when embedding generation fails (exponential backoff)
- 4.2.4 Log embedding generation costs and usage

### 5. Category/Collection Listing Pages (CLP)

#### 5.1 Category Page with Search Integration
**As a** shopping user  
**I want to** browse products by category with filtering capabilities  
**So that** I can narrow down products within a category

**Acceptance Criteria:**
- 5.1.1 Category page (`/categories/:handle`) uses OpenSearch with pre-applied category filter
- 5.1.2 Facet filters available: collections, tags, price range, materials (category facet excluded)
- 5.1.3 Child categories displayed as navigation chips for easy drilling down
- 5.1.4 Breadcrumb shows category hierarchy (e.g., "Furniture > Living Room > Sofas")
- 5.1.5 Price filter works correctly based on user's region

#### 5.2 Collection Page with Search Integration
**As a** shopping user  
**I want to** browse products by collection with filtering capabilities  
**So that** I can explore curated product sets with additional filters

**Acceptance Criteria:**
- 5.2.1 Collection page (`/collections/:handle`) uses OpenSearch with pre-applied collection filter
- 5.2.2 Facet filters available: categories, tags, price range, materials (collection facet excluded)
- 5.2.3 Price filter works correctly based on user's region

#### 5.3 Hierarchical Category Navigation
**As a** shopping user  
**I want to** see nested category structure in facets  
**So that** I can understand the category hierarchy and navigate efficiently

**Acceptance Criteria:**
- 5.3.1 Category facet displays as a tree structure (parent > child relationships)
- 5.3.2 Clicking a parent category shows products from all child categories
- 5.3.3 Category path indexed for each product (e.g., "Furniture > Living Room > Sofas")

## Technical Constraints

### AWS Services
- **Text Embeddings**: AWS Bedrock - Titan Text Embeddings V2 (1024-dimensional vectors)
- **Image Processing**: AWS Rekognition
- **Vector Storage**: OpenSearch k-NN plugin

### Performance Requirements
- Search response time < 2 seconds
- Image search response time < 3 seconds
- Support vector indexing for 100+ products

### Compatibility
- Compatible with existing @elastic/react-search-ui components
- Maintain existing filter and pagination functionality
- Support URL state synchronization

### Region Price Indexing
- Store per-region min_price as separate fields (e.g., `price_reg_us`, `price_reg_eu`)
- Support dynamic price field selection based on current region
- Price range facet aggregation per region

## Non-Functional Requirements

### Security
- AWS credentials configured via environment variables, not exposed to frontend
- Image uploads require file type and size validation
- API endpoints require appropriate rate limiting

### Observability
- Log search queries and response times
- Monitor AWS service call counts and costs
- Error logging and alerts

### Scalability
- Vector index design supports future product quantity growth
- Embedding service can be replaced with other providers

## Out of Scope

- Voice search
- Search history
- Personalized recommendations
- A/B testing framework
- Match type display (semantic vs keyword) - search is transparent to users
