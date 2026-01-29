/**
 * Multimodal Search Service
 *
 * Orchestrates the multimodal search process by combining:
 * - Image analysis (using Image Analyzer service)
 * - Intent extraction (using Intent Extractor service)
 * - Search execution (using OpenSearch service)
 * - Embedding generation (using Embedding service)
 *
 * Supports three search modes:
 * - Text-only: Natural language queries with intent extraction
 * - Image-only: Visual similarity search with AI-generated descriptions
 * - Mixed-modal: Combined text and image search with constraint filtering
 */

import type { MedusaContainer } from '@medusajs/framework/types';
import type ImageAnalyzerService from '../image-analyzer/service';
import type IntentExtractorService from '../intent-extractor/service';
import type OpenSearchModuleService from '../opensearch/service';
import type EmbeddingService from '../embedding/service';
import type { SearchIntent, SearchConstraints } from '../intent-extractor/types';
import type { SearchImageAnalysis } from '../image-analyzer/types';
import type { SearchResult, FacetResult } from '../opensearch/types';
import type {
  MultimodalSearchServiceOptions,
  MultimodalSearchRequest,
  MultimodalSearchResponse,
  MultimodalSearchResult,
  MultimodalSearchMeta,
  SearchContext,
  ConstraintFilterOptions,
} from './types';
import { DEFAULT_SIZE, DEFAULT_KEYWORD_WEIGHT, DEFAULT_SEMANTIC_WEIGHT, DEFAULT_TIMEOUT_MS } from './types';

// Module identifiers for dependency resolution
import { IMAGE_ANALYZER_MODULE } from '../image-analyzer';
import { INTENT_EXTRACTOR_MODULE } from '../intent-extractor';
import { OPENSEARCH_MODULE } from '../opensearch';
import { EMBEDDING_MODULE } from '../embedding';

/**
 * Multimodal Search Service
 *
 * Provides intelligent search capabilities by orchestrating multiple AI services
 * to understand user intent from text, images, or combined inputs.
 */
export default class MultimodalSearchService {
  private options: MultimodalSearchServiceOptions;
  private container: MedusaContainer;

  /**
   * Creates a new Multimodal Search service instance
   * @param container - Medusa container for dependency resolution
   * @param options - Multimodal Search service configuration options
   */
  constructor(container: Record<string, unknown>, options: MultimodalSearchServiceOptions = {}) {
    this.container = container as MedusaContainer;
    this.options = {
      defaultSize: options.defaultSize ?? DEFAULT_SIZE,
      defaultKeywordWeight: options.defaultKeywordWeight ?? DEFAULT_KEYWORD_WEIGHT,
      defaultSemanticWeight: options.defaultSemanticWeight ?? DEFAULT_SEMANTIC_WEIGHT,
      timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
      enableAIEmbeddings: options.enableAIEmbeddings ?? true,
    };
  }

  /**
   * Resolve the Image Analyzer service from the container
   */
  private getImageAnalyzer(): ImageAnalyzerService {
    return this.container.resolve(IMAGE_ANALYZER_MODULE);
  }

  /**
   * Resolve the Intent Extractor service from the container
   */
  private getIntentExtractor(): IntentExtractorService {
    return this.container.resolve(INTENT_EXTRACTOR_MODULE);
  }

  /**
   * Resolve the OpenSearch service from the container
   */
  private getOpenSearch(): OpenSearchModuleService {
    return this.container.resolve(OPENSEARCH_MODULE);
  }

  /**
   * Resolve the Embedding service from the container
   */
  private getEmbedding(): EmbeddingService {
    return this.container.resolve(EMBEDDING_MODULE);
  }

  /**
   * Execute a multimodal search combining text and/or image inputs
   *
   * @param request - Search request with optional text and image
   * @returns Search results with relevance metadata
   * @throws Error if neither query nor image is provided
   */
  async search(request: MultimodalSearchRequest): Promise<MultimodalSearchResponse> {
    const startTime = Date.now();

    // Validate request - at least one of query or image must be provided
    if (!request.query?.trim() && !request.image) {
      throw new Error('At least one of query or image must be provided');
    }

    // Determine search type based on input
    const searchType = this.determineSearchType(request);

    // Create search context
    const context: SearchContext = {
      request,
      searchType,
      startTime,
    };

    try {
      // Execute search based on type
      switch (searchType) {
        case 'text_only':
          return await this.executeTextOnlySearch(context);
        case 'image_only':
          return await this.executeImageOnlySearch(context);
        case 'mixed_modal':
          return await this.executeMixedModalSearch(context);
        default:
          throw new Error(`Unknown search type: ${searchType}`);
      }
    } catch (error) {
      // Log error and attempt fallback to basic search
      console.error('Multimodal search failed, attempting fallback:', (error as Error).message);
      return await this.executeFallbackSearch(context, error as Error);
    }
  }

  /**
   * Determine the search type based on the request inputs
   */
  private determineSearchType(request: MultimodalSearchRequest): 'text_only' | 'image_only' | 'mixed_modal' {
    const hasQuery = request.query && request.query.trim().length > 0;
    const hasImage = !!request.image;

    if (hasQuery && hasImage) {
      return 'mixed_modal';
    } else if (hasImage) {
      return 'image_only';
    } else {
      return 'text_only';
    }
  }

  /**
   * Execute text-only search with intent extraction
   */
  private async executeTextOnlySearch(context: SearchContext): Promise<MultimodalSearchResponse> {
    const { request } = context;
    const query = request.query!.trim();

    // Extract intent from the query
    const intentExtractor = this.getIntentExtractor();
    const intent = await intentExtractor.extractIntent(query);
    context.intent = intent;

    // Generate query embedding for semantic search
    const embedding = this.getEmbedding();
    const { embedding: queryEmbedding } = await embedding.generateTextEmbedding(query);
    context.queryEmbedding = queryEmbedding;

    // Build filters from extracted constraints
    const filters = this.buildFiltersFromConstraints(intent.constraints, request.filters);

    // Execute hybrid search
    const openSearch = this.getOpenSearch();
    const searchResults = await openSearch.hybridSearchWithFacets(query, queryEmbedding, {
      size: request.size ?? this.options.defaultSize,
      filters,
      keywordWeight: request.keywordWeight ?? this.options.defaultKeywordWeight,
      semanticWeight: request.semanticWeight ?? this.options.defaultSemanticWeight,
      regionId: request.regionId,
    });

    // Map results to multimodal format
    const results = this.mapToMultimodalResults(searchResults.results, 'text');

    return this.buildResponse(context, results, searchResults.facets, searchResults.total, intent);
  }

  /**
   * Execute image-only search with AI analysis
   */
  private async executeImageOnlySearch(context: SearchContext): Promise<MultimodalSearchResponse> {
    const { request } = context;
    const imageBuffer = request.image!;

    // Analyze the uploaded image
    const imageAnalyzer = this.getImageAnalyzer();
    const imageAnalysis = await imageAnalyzer.analyzeSearchImage(imageBuffer);
    context.imageAnalysis = imageAnalysis;

    // Create intent from image analysis
    const intent: SearchIntent = {
      original_query: '',
      detected_language: 'en',
      visual_reference: imageAnalysis.description,
      constraints: {
        colors: imageAnalysis.dominant_colors,
        styles: imageAnalysis.style_keywords,
        categories: imageAnalysis.suggested_category ? [imageAnalysis.suggested_category] : undefined,
      },
      search_type: 'image_only',
    };
    context.intent = intent;

    // Generate embedding from the image description
    const embedding = this.getEmbedding();
    const searchText = this.buildSearchTextFromImageAnalysis(imageAnalysis);
    const { embedding: queryEmbedding } = await embedding.generateTextEmbedding(searchText);
    context.queryEmbedding = queryEmbedding;

    // Build filters from image analysis
    const filters = this.buildFiltersFromConstraints(intent.constraints, request.filters);

    // Execute semantic search with image-derived embedding
    const openSearch = this.getOpenSearch();
    const searchResults = await openSearch.hybridSearchWithFacets(searchText, queryEmbedding, {
      size: request.size ?? this.options.defaultSize,
      filters,
      keywordWeight: 0.3, // Lower keyword weight for image search
      semanticWeight: 0.7, // Higher semantic weight for visual similarity
      regionId: request.regionId,
    });

    // Map results to multimodal format
    const results = this.mapToMultimodalResults(searchResults.results, 'visual');

    return this.buildResponse(context, results, searchResults.facets, searchResults.total, intent);
  }

  /**
   * Execute mixed-modal search combining image and text
   */
  private async executeMixedModalSearch(context: SearchContext): Promise<MultimodalSearchResponse> {
    const { request } = context;
    const query = request.query!.trim();
    const imageBuffer = request.image!;

    // Analyze the uploaded image
    const imageAnalyzer = this.getImageAnalyzer();
    const imageAnalysis = await imageAnalyzer.analyzeSearchImage(imageBuffer);
    context.imageAnalysis = imageAnalysis;

    // Extract intent from query with image context
    const intentExtractor = this.getIntentExtractor();
    const intent = await intentExtractor.extractIntent(query, imageAnalysis);
    context.intent = intent;

    // Generate combined embedding
    const embedding = this.getEmbedding();
    const combinedSearchText = this.buildCombinedSearchText(query, imageAnalysis);
    const { embedding: queryEmbedding } = await embedding.generateTextEmbedding(combinedSearchText);
    context.queryEmbedding = queryEmbedding;

    // Build filters from extracted constraints (text constraints override image)
    const filters = this.buildFiltersFromConstraints(intent.constraints, request.filters);

    // Execute hybrid search
    const openSearch = this.getOpenSearch();
    const searchResults = await openSearch.hybridSearchWithFacets(combinedSearchText, queryEmbedding, {
      size: request.size ?? this.options.defaultSize,
      filters,
      keywordWeight: request.keywordWeight ?? this.options.defaultKeywordWeight,
      semanticWeight: request.semanticWeight ?? this.options.defaultSemanticWeight,
      regionId: request.regionId,
    });

    // Map results to multimodal format
    const results = this.mapToMultimodalResults(searchResults.results, 'mixed');

    return this.buildResponse(context, results, searchResults.facets, searchResults.total, intent);
  }

  /**
   * Execute fallback search when primary search fails
   */
  private async executeFallbackSearch(context: SearchContext, originalError: Error): Promise<MultimodalSearchResponse> {
    const { request, startTime } = context;

    // Create a basic fallback intent
    const fallbackIntent: SearchIntent = {
      original_query: request.query || '',
      detected_language: 'en',
      constraints: {},
      search_type: context.searchType,
    };

    try {
      // If we have a query, try basic hybrid search
      if (request.query?.trim()) {
        const embedding = this.getEmbedding();
        const { embedding: queryEmbedding } = await embedding.generateTextEmbedding(request.query.trim());

        const openSearch = this.getOpenSearch();
        const searchResults = await openSearch.hybridSearchWithFacets(request.query.trim(), queryEmbedding, {
          size: request.size ?? this.options.defaultSize,
          filters: request.filters,
          regionId: request.regionId,
        });

        const results = this.mapToMultimodalResults(searchResults.results, 'text');

        return {
          results,
          intent: fallbackIntent,
          facets: searchResults.facets,
          meta: {
            total: searchResults.total,
            responseTimeMs: Date.now() - startTime,
            searchType: context.searchType,
            usedAIEmbeddings: false,
          },
        };
      }

      // If no query, return empty results
      return {
        results: [],
        intent: fallbackIntent,
        facets: {},
        meta: {
          total: 0,
          responseTimeMs: Date.now() - startTime,
          searchType: context.searchType,
          usedAIEmbeddings: false,
        },
      };
    } catch (fallbackError) {
      // If fallback also fails, return empty results with error info
      console.error('Fallback search also failed:', (fallbackError as Error).message);

      return {
        results: [],
        intent: fallbackIntent,
        facets: {},
        meta: {
          total: 0,
          responseTimeMs: Date.now() - startTime,
          searchType: context.searchType,
          usedAIEmbeddings: false,
        },
      };
    }
  }

  /**
   * Build search text from image analysis for embedding generation
   */
  private buildSearchTextFromImageAnalysis(analysis: SearchImageAnalysis): string {
    const parts: string[] = [];

    if (analysis.description) {
      parts.push(analysis.description);
    }

    if (analysis.dominant_colors.length > 0) {
      parts.push(`colors: ${analysis.dominant_colors.join(', ')}`);
    }

    if (analysis.style_keywords.length > 0) {
      parts.push(`style: ${analysis.style_keywords.join(', ')}`);
    }

    if (analysis.suggested_category && analysis.suggested_category !== 'unknown') {
      parts.push(`category: ${analysis.suggested_category}`);
    }

    return parts.join('. ');
  }

  /**
   * Build combined search text from query and image analysis
   */
  private buildCombinedSearchText(query: string, analysis: SearchImageAnalysis): string {
    const imageText = this.buildSearchTextFromImageAnalysis(analysis);
    return `${query}. Visual reference: ${imageText}`;
  }

  /**
   * Build OpenSearch filters from extracted constraints
   */
  private buildFiltersFromConstraints(
    constraints: SearchConstraints,
    additionalFilters?: Record<string, unknown>,
  ): Record<string, unknown> {
    const filters: Record<string, unknown> = { ...additionalFilters };

    // Add color filter
    if (constraints.colors && constraints.colors.length > 0) {
      filters.ai_colors = constraints.colors;
    }

    // Add material filter
    if (constraints.materials && constraints.materials.length > 0) {
      filters.ai_materials = constraints.materials;
    }

    // Add category filter
    if (constraints.categories && constraints.categories.length > 0) {
      filters.category_names = constraints.categories;
    }

    // Add style filter
    if (constraints.styles && constraints.styles.length > 0) {
      filters.ai_style = constraints.styles;
    }

    // Add price range filter
    if (constraints.price_min !== undefined || constraints.price_max !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (constraints.price_min !== undefined) {
        // Convert to cents (assuming input is in dollars)
        priceFilter.gte = constraints.price_min * 100;
      }
      if (constraints.price_max !== undefined) {
        // Convert to cents (assuming input is in dollars)
        priceFilter.lte = constraints.price_max * 100;
      }
      filters.default_price = priceFilter;
    }

    return filters;
  }

  /**
   * Map OpenSearch results to multimodal search results
   */
  private mapToMultimodalResults(
    results: SearchResult[],
    defaultMatchType: 'text' | 'visual' | 'mixed' | 'semantic',
  ): MultimodalSearchResult[] {
    return results.map((result) => ({
      document: result.document,
      score: result.score,
      matchType: this.mapMatchType(result.matchType, defaultMatchType),
      similarityScore: result.similarityScore,
      regionPrice: result.regionPrice,
      regionCurrency: result.regionCurrency,
    }));
  }

  /**
   * Map OpenSearch match type to multimodal match type
   */
  private mapMatchType(
    opensearchType: 'exact' | 'semantic' | 'visual' | 'hybrid',
    defaultType: 'text' | 'visual' | 'mixed' | 'semantic',
  ): 'text' | 'visual' | 'mixed' | 'semantic' {
    switch (opensearchType) {
      case 'exact':
        return 'text';
      case 'semantic':
        return 'semantic';
      case 'visual':
        return 'visual';
      case 'hybrid':
        return defaultType === 'mixed' ? 'mixed' : 'semantic';
      default:
        return defaultType;
    }
  }

  /**
   * Build the final search response
   */
  private buildResponse(
    context: SearchContext,
    results: MultimodalSearchResult[],
    facets: Record<string, FacetResult>,
    total: number,
    intent: SearchIntent,
  ): MultimodalSearchResponse {
    const meta: MultimodalSearchMeta = {
      total,
      responseTimeMs: Date.now() - context.startTime,
      searchType: context.searchType,
      extractedConstraints: intent.constraints,
      imageAnalysis: context.imageAnalysis,
      usedAIEmbeddings: this.options.enableAIEmbeddings,
      detectedLanguage: intent.detected_language,
    };

    return {
      results,
      intent,
      facets,
      meta,
    };
  }
}
