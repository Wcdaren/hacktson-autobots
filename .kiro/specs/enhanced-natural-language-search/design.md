# Enhanced Natural Language Search - Technical Design

## Overview

This design document describes the technical implementation for enhancing the existing hybrid search system to better handle natural language queries.

### First Principles Analysis

**Problem:** Users search with natural language queries like "comfortable modern sofa for small apartment" but don't get good results.

**Root Causes:**
1. Image embeddings are too generic (Rekognition labels like "Furniture, Couch" lack detail)
2. Keyword search configuration is suboptimal (wrong field weights, wrong match type)
3. Searchable text doesn't include rich visual descriptions

**Key Insight:** The existing hybrid search architecture is sound. The semantic search (via embeddings) already handles:
- Synonym matching (embeddings for "sofa" and "couch" are similar)
- Intent understanding (embeddings capture semantic meaning)
- Cross-language similarity (if we embed multilingual content)

**What we actually need:**
1. **Richer searchable content** - Generate detailed image descriptions that users might search for
2. **Better keyword search config** - Optimize field weights and match type
3. **Include descriptions in embeddings** - So semantic search can match visual descriptions

**What we DON'T need:**
- Real-time AI query analysis (adds latency, cost, complexity)
- Rule-based synonym maps (embeddings already handle this)
- Complex intent classification (semantic search handles conceptual queries)

### Solution: Enrich Content at Index Time, Not Search Time

The key insight is that **all the intelligence should happen at indexing time**, not search time:

1. **At Indexing Time (Claude 3 Sonnet):**
   - Generate rich bilingual image descriptions
   - Include descriptions in searchable text
   - Generate high-quality embeddings from enriched content

2. **At Search Time (No AI needed):**
   - Use existing hybrid search with optimized configuration
   - Semantic search naturally matches "comfortable sofa" to products with descriptions mentioning comfort
   - No additional latency or cost

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          Product Indexing Flow                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Product ──► Image Description Generator ──► Build Searchable Text ──► Index│
│     │               │                              │                         │
│     │               ▼                              ▼                         │
│     │        ┌──────────────┐             ┌──────────────┐                  │
│     │        │ Claude 3     │             │ Combine:     │                  │
│     │        │ Sonnet       │             │ - Title      │                  │
│     │        │ (Multimodal) │             │ - Description│                  │
│     │        └──────────────┘             │ - Image Desc │                  │
│     │               │                     │ - Categories │                  │
│     │               ▼                     └──────────────┘                  │
│     │        ┌──────────────┐                    │                          │
│     │        │ EN + ZH      │                    ▼                          │
│     │        │ Descriptions │             ┌──────────────┐                  │
│     │        └──────────────┘             │ Titan Embed  │                  │
│     │                                     │ V2 (1024 dim)│                  │
│     │                                     └──────────────┘                  │
│     │                                            │                          │
│     │                                            ▼                          │
│     │                                     ┌──────────────┐                  │
│     │                                     │ OpenSearch   │                  │
│     │                                     │ Index        │                  │
│     │                                     └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           Search Request Flow                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  User Query ──────────────────────────────────────────────► Hybrid Search   │
│       │                                                          │          │
│       │  No AI needed at search time!                           │          │
│       │  Semantic search naturally matches                       │          │
│       │  "comfortable sofa" to products with                    │          │
│       │  descriptions mentioning comfort                         │          │
│       │                                                          │          │
│       └──────────────────────────────────────────────────────────┘          │
│                                        │                                     │
│                              ┌─────────┴─────────┐                          │
│                              │                   │                          │
│                              ▼                   ▼                          │
│                       ┌──────────┐        ┌──────────┐                      │
│                       │ Keyword  │        │ Semantic │                      │
│                       │ Search   │        │ Search   │                      │
│                       │ (BM25)   │        │ (k-NN)   │                      │
│                       └──────────┘        └──────────┘                      │
│                              │                   │                          │
│                              └─────────┬─────────┘                          │
│                                        │                                     │
│                                        ▼                                     │
│                              ┌──────────────────┐                           │
│                              │ Merge & Diversify│                           │
│                              └──────────────────┘                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Image Description Generator Service

**Location**: `apps/medusa/src/modules/embedding/image-description.ts`

This service uses Claude 3 Sonnet multimodal model to generate rich natural language descriptions of product images at indexing time.

```typescript
interface ImageDescriptionGeneratorOptions {
  awsRegion: string;
  modelId: string; // anthropic.claude-3-sonnet-20240229-v1:0
  maxTokens: number;
  temperature: number;
}

interface ImageDescriptionResult {
  descriptionEn: string;  // English description (50-200 words)
  descriptionZh: string;  // Chinese description (50-200 words)
  searchableKeywords: string[];  // Extracted keywords for search
  success: boolean;
  fallbackUsed: boolean;  // True if fell back to Rekognition labels
}

class ImageDescriptionGenerator {
  constructor(options: ImageDescriptionGeneratorOptions);
  
  /**
   * Generate bilingual descriptions for a product image
   * @param imageBuffer - Image data as Buffer
   * @param productContext - Optional product title/category for context
   * @returns Bilingual descriptions and extracted keywords
   */
  async generateDescription(
    imageBuffer: Buffer,
    productContext?: { title?: string; category?: string }
  ): Promise<ImageDescriptionResult>;
}
```

**Claude 3 Sonnet API Integration**:

```typescript
// Request body structure for Claude 3 Sonnet multimodal
const requestBody = {
  anthropic_version: "bedrock-2023-05-31",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: base64EncodedImage
          }
        },
        {
          type: "text",
          text: `You are analyzing a product image for an e-commerce furniture store.

Generate detailed descriptions that will help users find this product when they search with natural language queries.

Product context: ${productContext?.title || 'Unknown'}, Category: ${productContext?.category || 'Unknown'}

Provide:
1. English description (50-200 words): Describe visual attributes like color, style, material appearance, shape, design elements, and potential use cases. Include terms users might search for.
2. Chinese description (50-200 words): Same information in Chinese.
3. Searchable keywords: List of terms in both languages that users might search for.

Format as JSON:
{
  "descriptionEn": "...",
  "descriptionZh": "...",
  "searchableKeywords": ["keyword1", "keyword2", "关键词1", "关键词2"]
}`
        }
      ]
    }
  ],
  temperature: 0.3,
  top_p: 0.9
};
```

**Why this works for natural language search:**
- User searches "comfortable modern sofa for small apartment"
- Image description contains: "This modern sofa features a compact design perfect for small spaces. The plush cushions provide exceptional comfort..."
- Semantic search matches the query to the description naturally
- No need for synonym maps or query expansion - embeddings handle semantic similarity

### 2. Enhanced Text Builder

**Location**: `apps/medusa/src/modules/embedding/text-builder.ts`

Builds the searchable text that gets embedded, combining all product information including the new image descriptions.

```typescript
interface ProductTextInput {
  title: string;
  subtitle?: string;
  description?: string;
  categoryNames?: string[];
  tagValues?: string[];
  imageDescriptionEn?: string;
  imageDescriptionZh?: string;
  searchableKeywords?: string[];
}

class ProductTextBuilder {
  /**
   * Build comprehensive searchable text for embedding
   * Combines all product information into a single text for embedding
   */
  buildSearchableText(product: ProductTextInput): string {
    const parts: string[] = [];
    
    // Title is most important
    parts.push(product.title);
    
    if (product.subtitle) {
      parts.push(product.subtitle);
    }
    
    if (product.description) {
      parts.push(product.description);
    }
    
    // Image descriptions are key for natural language search
    if (product.imageDescriptionEn) {
      parts.push(product.imageDescriptionEn);
    }
    if (product.imageDescriptionZh) {
      parts.push(product.imageDescriptionZh);
    }
    
    // Keywords help with specific term matching
    if (product.searchableKeywords?.length) {
      parts.push(product.searchableKeywords.join(', '));
    }
    
    // Categories and tags
    if (product.categoryNames?.length) {
      parts.push(product.categoryNames.join(', '));
    }
    if (product.tagValues?.length) {
      parts.push(product.tagValues.join(', '));
    }
    
    return parts.join('. ');
  }
}
```

### 3. Optimized Hybrid Search Configuration

**Updates to**: `apps/medusa/src/modules/opensearch/service.ts`

The key changes are in the keyword search configuration - no new services needed, just better configuration.

```typescript
/**
 * Optimized keyword query for natural language search
 * Key changes from current implementation:
 * 1. Added subtitle field
 * 2. Increased description weight
 * 3. Added image_description fields
 * 4. Changed to cross_fields for better phrase matching
 */
function buildOptimizedKeywordQuery(query: string): object {
  return {
    multi_match: {
      query: query,
      fields: [
        'title^3',              // Product name - highest weight
        'subtitle^1.5',         // NEW: Subtitle for additional context
        'description^2',        // INCREASED: From 1 to 2
        'image_description_en^2', // NEW: Claude-generated English description
        'image_description_zh^2', // NEW: Claude-generated Chinese description
        'category_names^1.5',
        'tag_values^1',
        'searchable_keywords^1.5', // NEW: Extracted keywords
      ],
      type: 'cross_fields',     // CHANGED: From best_fields for better NL handling
      operator: 'or',
      fuzziness: 'AUTO',
      minimum_should_match: '30%',
    },
  };
}
```

**Why `cross_fields` is better for natural language:**
- `best_fields` (current): Finds documents where ONE field matches well
- `cross_fields`: Treats all fields as one big field, better for queries like "comfortable modern sofa"
  - "comfortable" might be in description
  - "modern" might be in image_description
  - "sofa" might be in title
  - `cross_fields` combines these matches properly

### 4. Result Diversifier

**Location**: `apps/medusa/src/modules/search/result-diversifier.ts`

Simple utility to ensure search results show variety.

```typescript
interface DiversifyOptions {
  diversityFactor: number;  // 0-1, 0 = no diversity, 1 = max diversity
  maxPerCategory: number;   // Max results from same category in top N
}

function diversifyResults(
  results: SearchResult[],
  options: DiversifyOptions
): SearchResult[] {
  if (options.diversityFactor === 0) return results;
  
  const diversified: SearchResult[] = [];
  const categoryCount = new Map<string, number>();
  const deferred: SearchResult[] = [];
  
  for (const result of results) {
    const category = result.document.category_names?.[0] || 'unknown';
    const count = categoryCount.get(category) || 0;
    
    if (count < options.maxPerCategory) {
      diversified.push(result);
      categoryCount.set(category, count + 1);
    } else {
      deferred.push(result);
    }
  }
  
  // Add deferred results at the end
  return [...diversified, ...deferred];
}
```

## Data Models

### Updated ProductDocument

```typescript
interface ProductDocument {
  // Existing fields
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  handle: string;
  thumbnail?: string;
  
  // New image description fields
  image_description_en?: string;  // Claude-generated English description
  image_description_zh?: string;  // Claude-generated Chinese description
  image_attributes?: {
    colors: string[];
    style: string;
    materials: string[];
    shapes: string[];
  };
  
  // Existing embedding fields
  text_embedding?: number[];
  image_embedding?: number[];
  
  // New bilingual embedding fields (optional, for advanced use)
  text_embedding_en?: number[];  // Embedding of English content
  text_embedding_zh?: number[];  // Embedding of Chinese content
  
  // ... other existing fields
}
```

### OpenSearch Index Mapping Updates

```json
{
  "mappings": {
    "properties": {
      "subtitle": { 
        "type": "text",
        "analyzer": "standard"
      },
      "image_description_en": { 
        "type": "text",
        "analyzer": "english"
      },
      "image_description_zh": { 
        "type": "text",
        "analyzer": "smartcn"
      },
      "image_attributes": {
        "type": "object",
        "properties": {
          "colors": { "type": "keyword" },
          "style": { "type": "keyword" },
          "materials": { "type": "keyword" },
          "shapes": { "type": "keyword" }
        }
      }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "smartcn": {
          "type": "smartcn"
        }
      }
    }
  }
}
```

## API Updates

### Enhanced Hybrid Search Endpoint

**Location**: `apps/medusa/src/api/store/search/hybrid/route.ts`

```typescript
interface EnhancedHybridSearchBody {
  query: string;
  size?: number;
  filters?: Record<string, unknown>;
  regionId?: string;
  
  // New parameters
  useAIAnalysis?: boolean;     // Enable AI query analysis (default: true)
  keywordWeight?: number;      // Manual override (0-1)
  semanticWeight?: number;     // Manual override (0-1)
  diversityFactor?: number;    // Result diversity (0-1, default: 0.1)
}

interface EnhancedHybridSearchResponse {
  results: EnhancedSearchResult[];
  facets: Record<string, FacetResult>;
  meta: {
    query: string;
    total: number;
    responseTimeMs: number;
    // AI analysis results (when useAIAnalysis is true)
    queryAnalysis?: {
      detectedLanguage: 'en' | 'zh' | 'mixed';
      intent: QueryIntent;
      expandedTerms: string[];
    };
    appliedWeights: { keyword: number; semantic: number };
    regionId?: string;
  };
}
```

## Workflow Updates

### Enhanced Generate Embeddings Step

**Updates to**: `apps/medusa/src/workflows/steps/generate-embeddings.ts`

```typescript
type GenerateEmbeddingsStepInput = {
  products: Array<{
    id: string;
    title: string;
    description?: string | null;
    thumbnail?: string | null;
    category_names?: string[];
    tag_values?: string[];
  }>;
  generateImageEmbeddings?: boolean;
  generateImageDescriptions?: boolean;  // New option
};

type GenerateEmbeddingsStepOutput = {
  products: Array<Record<string, unknown>>;
  textEmbeddingsGenerated: number;
  imageEmbeddingsGenerated: number;
  imageDescriptionsGenerated: number;  // New counter
};
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Image Description Bilingual Generation

*For any* product image processed by the Image_Description_Generator, the result SHALL contain both `descriptionEn` and `descriptionZh` fields as non-empty strings, each containing between 50-200 words.

**Validates: Requirements 1.2, 1.4**

### Property 2: Image Description Attribute Extraction

*For any* successfully generated image description, the `attributes` object SHALL contain non-empty arrays for `colors`, `materials`, and `shapes`, and a non-empty string for `style`.

**Validates: Requirements 1.3**

### Property 3: Image Description Fallback Behavior

*For any* image description generation that fails (Claude API error, timeout, invalid response), the system SHALL fall back to Rekognition labels and set `fallbackUsed: true` in the result.

**Validates: Requirements 1.6**

### Property 4: AI Query Analysis Response Structure

*For any* query analyzed by the QueryAnalyzer, the result SHALL contain:
- `detectedLanguage` with value in ['en', 'zh', 'mixed']
- `intent` with value in ['product_type', 'attribute', 'style', 'use_case', 'general']
- `confidence` with value between 0 and 1
- `expandedTermsEn` as a non-empty array (always includes original query terms)
- `expandedTermsZh` as an array (may be empty for English-only queries)
- `suggestedWeights` with `keywordWeight` and `semanticWeight` summing to 1.0

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.5**

### Property 5: Weight Optimization by Intent

*For any* query analysis result:
- If intent is 'product_type', suggestedWeights.keywordWeight SHALL be >= 0.6
- If intent is 'style' or 'use_case', suggestedWeights.semanticWeight SHALL be >= 0.6
- If intent is 'attribute', both weights SHALL be between 0.4 and 0.6

**Validates: Requirements 3.2, 3.3, 3.4, 4.1**

### Property 6: Manual Weight Override

*For any* search request with explicit `keywordWeight` and `semanticWeight` parameters, the applied weights SHALL match the provided values exactly, ignoring AI-suggested weights.

**Validates: Requirements 4.4**

### Property 7: Language-Aware Field Boosting

*For any* search query:
- If detected language is 'zh', `image_description_zh` field boost SHALL be >= `image_description_en` boost
- If detected language is 'en', `image_description_en` field boost SHALL be >= `image_description_zh` boost

**Validates: Requirements 5.5, 5.6**

### Property 8: Result Diversity

*For any* search result set with diversityFactor > 0 and size >= 10:
- No single category SHALL have more than 40% of the top 10 results
- If two results have scores within 5% of each other, the one from a less-represented category SHALL be ranked higher

**Validates: Requirements 7.1, 7.2, 7.4**

### Property 9: Synonym Expansion Includes Original Terms

*For any* query analyzed by the QueryAnalyzer, the `expandedTermsEn` array SHALL always include the original query (or its English translation for Chinese queries).

**Validates: Requirements 8.5**

### Property 10: Cross-Language Term Expansion

*For any* query containing common furniture terms (e.g., 'sofa', '沙发', 'chair', '椅子'), the QueryAnalyzer SHALL include cross-language equivalents in the expanded terms.

**Validates: Requirements 8.4, 6.5**

## Error Handling

### Image Description Generation Errors

```typescript
// Error types and handling
enum ImageDescriptionError {
  CLAUDE_API_ERROR = 'CLAUDE_API_ERROR',
  INVALID_IMAGE = 'INVALID_IMAGE',
  TIMEOUT = 'TIMEOUT',
  RATE_LIMIT = 'RATE_LIMIT',
  INVALID_RESPONSE = 'INVALID_RESPONSE',
}

// Fallback strategy
async function generateDescriptionWithFallback(
  imageBuffer: Buffer,
  productContext?: ProductContext
): Promise<ImageDescriptionResult> {
  try {
    return await claudeGenerator.generateDescription(imageBuffer, productContext);
  } catch (error) {
    console.warn('Claude description generation failed, falling back to Rekognition:', error);
    
    // Fallback to Rekognition labels
    const rekognitionResult = await embeddingService.generateImageEmbedding(imageBuffer);
    const labels = rekognitionResult.labels;
    
    return {
      descriptionEn: `Product image containing: ${labels.join(', ')}`,
      descriptionZh: `产品图片包含: ${translateLabelsToZh(labels).join(', ')}`,
      attributes: extractAttributesFromLabels(labels),
      success: true,
      fallbackUsed: true,
    };
  }
}
```

### Query Processing Errors

```typescript
// Graceful degradation for query preprocessing
function preprocessQuerySafe(query: string): PreprocessedQuery {
  try {
    return queryPreprocessor.preprocess(query);
  } catch (error) {
    console.warn('Query preprocessing failed, using basic normalization:', error);
    
    // Fallback to basic processing
    return {
      originalQuery: query,
      normalizedQuery: query.toLowerCase().trim(),
      expandedTerms: [query.toLowerCase().trim()],
      detectedLanguage: 'en',
      languageConfidence: 0.5,
    };
  }
}
```

### Search Execution Errors

```typescript
// Error handling in hybrid search
async function hybridSearchWithFallback(
  query: string,
  options: EnhancedHybridSearchOptions
): Promise<EnhancedSearchResult[]> {
  try {
    // Try enhanced hybrid search
    return await enhancedHybridSearch(query, options);
  } catch (error) {
    console.error('Enhanced hybrid search failed:', error);
    
    // Fallback to basic keyword search
    try {
      return await basicKeywordSearch(query, options);
    } catch (fallbackError) {
      console.error('Fallback search also failed:', fallbackError);
      return [];
    }
  }
}
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests:

- **Unit tests**: Verify specific examples, edge cases, API integration, and error conditions
- **Property tests**: Verify universal properties across all valid inputs using randomized testing

### Property-Based Testing Configuration

**Library**: fast-check (TypeScript property-based testing library)

**Configuration**:
- Minimum 100 iterations per property test
- Each test tagged with design property reference

### Test File Structure

```
apps/medusa/src/modules/
├── embedding/
│   └── __tests__/
│       ├── image-description.test.ts      # Unit tests
│       └── image-description.property.ts  # Property tests (P1, P2, P3)
├── search/
│   └── __tests__/
│       ├── query-analyzer.test.ts         # Unit tests for AI analyzer
│       ├── query-analyzer.property.ts     # Property tests (P4, P5, P9, P10)
│       ├── result-diversifier.test.ts     # Unit tests
│       └── result-diversifier.property.ts # Property tests (P8)
└── opensearch/
    └── __tests__/
        ├── enhanced-search.test.ts        # Integration tests
        └── enhanced-search.property.ts    # Property tests (P6, P7)
```

### Property Test Examples

```typescript
// Feature: enhanced-natural-language-search, Property 4: AI Query Analysis Response Structure
import * as fc from 'fast-check';
import { QueryAnalyzer } from '../query-analyzer';

describe('QueryAnalyzer - Property Tests', () => {
  const analyzer = new QueryAnalyzer(defaultOptions);

  it('P4: should return valid response structure for any query', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        async (query) => {
          const result = await analyzer.analyze(query);
          
          // Check all required fields exist
          expect(['en', 'zh', 'mixed']).toContain(result.detectedLanguage);
          expect(['product_type', 'attribute', 'style', 'use_case', 'general']).toContain(result.intent);
          expect(result.confidence).toBeGreaterThanOrEqual(0);
          expect(result.confidence).toBeLessThanOrEqual(1);
          expect(Array.isArray(result.expandedTermsEn)).toBe(true);
          expect(result.expandedTermsEn.length).toBeGreaterThan(0);
          
          // Weights must sum to 1.0
          const weightSum = result.suggestedWeights.keywordWeight + result.suggestedWeights.semanticWeight;
          expect(Math.abs(weightSum - 1.0)).toBeLessThan(0.01);
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('P5: should set high keyword weight for product_type intent', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('sofa', 'chair', 'table', 'bed', 'cabinet', '沙发', '椅子', '桌子'),
        async (productQuery) => {
          const result = await analyzer.analyze(productQuery);
          
          if (result.intent === 'product_type') {
            return result.suggestedWeights.keywordWeight >= 0.6;
          }
          return true; // Skip if intent is different
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: enhanced-natural-language-search, Property 8: Result Diversity
describe('ResultDiversifier - Property Tests', () => {
  it('P8: should limit category concentration in top results', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            document: fc.record({
              id: fc.uuid(),
              category_names: fc.array(fc.string(), { minLength: 1, maxLength: 3 }),
            }),
            score: fc.float({ min: 0, max: 1 }),
          }),
          { minLength: 10, maxLength: 50 }
        ),
        (results) => {
          const diversified = diversifier.diversify(results, {
            diversityFactor: 0.2,
            categoryField: 'category_names',
            maxPerCategory: 4,
          });
          
          // Check top 10 results
          const top10 = diversified.slice(0, 10);
          const categoryCounts = new Map<string, number>();
          
          for (const result of top10) {
            const category = result.document.category_names[0] || 'unknown';
            categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
          }
          
          // No category should have more than 40% of top 10
          for (const count of categoryCounts.values()) {
            if (count > 4) return false;
          }
          
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Test Examples

```typescript
// Integration test for enhanced hybrid search
describe('Enhanced Hybrid Search - Integration Tests', () => {
  it('should return results with AI analysis in meta', async () => {
    const response = await request(app)
      .post('/store/search/hybrid')
      .send({
        query: 'comfortable modern sofa for small apartment',
        useAIAnalysis: true,
        regionId: 'reg_us',
      });

    expect(response.status).toBe(200);
    expect(response.body.meta.queryAnalysis).toBeDefined();
    expect(response.body.meta.queryAnalysis.detectedLanguage).toBe('en');
    expect(response.body.meta.appliedWeights).toBeDefined();
  });

  it('should respect manual weight override', async () => {
    const response = await request(app)
      .post('/store/search/hybrid')
      .send({
        query: 'sofa',
        keywordWeight: 0.9,
        semanticWeight: 0.1,
        regionId: 'reg_us',
      });

    expect(response.status).toBe(200);
    expect(response.body.meta.appliedWeights.keyword).toBe(0.9);
    expect(response.body.meta.appliedWeights.semantic).toBe(0.1);
  });

  it('should handle Chinese queries correctly', async () => {
    const response = await request(app)
      .post('/store/search/hybrid')
      .send({
        query: '舒适的现代沙发',
        useAIAnalysis: true,
        regionId: 'reg_us',
      });

    expect(response.status).toBe(200);
    expect(response.body.meta.queryAnalysis.detectedLanguage).toBe('zh');
  });

  it('should work without AI analysis (fallback mode)', async () => {
    const response = await request(app)
      .post('/store/search/hybrid')
      .send({
        query: 'sofa',
        useAIAnalysis: false,
        regionId: 'reg_us',
      });

    expect(response.status).toBe(200);
    expect(response.body.meta.queryAnalysis).toBeUndefined();
  });
});
```

## Environment Variables

```bash
# Existing AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx

# Existing Bedrock Configuration
BEDROCK_MODEL_ID=amazon.titan-embed-text-v2:0

# New Claude Configuration for Image Descriptions
CLAUDE_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
CLAUDE_MAX_TOKENS=1000
CLAUDE_TEMPERATURE=0.3

# Search Configuration
SEARCH_AUTO_OPTIMIZE_WEIGHTS=true
SEARCH_DEFAULT_DIVERSITY_FACTOR=0.1
```

## Implementation Phases

### Phase 1: Image Description Generator (Backend)
- Create ImageDescriptionGenerator service with Claude 3 Sonnet integration
- Implement bilingual description generation
- Add fallback to Rekognition labels
- Update product indexing workflow to generate descriptions

### Phase 2: AI Query Analyzer (Backend)
- Create QueryAnalyzer service with Claude 3 Haiku integration
- Implement query analysis with language detection, intent classification, and term expansion
- Add caching for repeated queries (optional optimization)

### Phase 3: Enhanced Search Configuration (Backend)
- Update OpenSearch index mapping with new fields (image_description_en, image_description_zh)
- Update keyword query configuration (cross_fields, field weights)
- Implement language-aware field boosting

### Phase 4: Result Diversification (Backend)
- Create ResultDiversifier service
- Integrate with search result merging

### Phase 5: API Updates (Backend)
- Update hybrid search endpoint with new parameters
- Add AI analysis results to response meta
- Implement manual weight override

### Phase 6: Testing
- Write property-based tests for all properties
- Write unit tests for edge cases
- Write integration tests for API endpoints
