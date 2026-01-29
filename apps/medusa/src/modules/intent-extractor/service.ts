/**
 * Intent Extractor Service
 *
 * Extracts structured search parameters from natural language queries using Claude AI
 * via AWS Bedrock. Supports bilingual (English/Chinese) query understanding and
 * handles complex constraint extraction including price ranges, colors, materials, etc.
 *
 * Implements fallback to basic intent when Claude AI is unavailable.
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import type {
  IntentExtractorServiceOptions,
  SearchIntent,
  SearchConstraints,
  SearchImageContext,
  ClaudeRequest,
  ClaudeResponse,
  ClaudeMessage,
  RawIntentExtractionResult,
} from './types';
import {
  DEFAULT_MAX_RETRIES,
  DEFAULT_RETRY_BASE_DELAY_MS,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_CLAUDE_MODEL_ID,
  ANTHROPIC_VERSION,
} from './types';

/**
 * Intent Extractor Service
 *
 * Provides methods for extracting structured search intent from natural language
 * queries using Claude AI. Supports both Chinese and English queries.
 *
 * Implements fallback to basic intent when Claude AI is unavailable.
 */
export default class IntentExtractorService {
  private options: IntentExtractorServiceOptions;
  private bedrockClient: BedrockRuntimeClient;
  private maxRetries: number;
  private retryBaseDelayMs: number;
  private timeoutMs: number;

  /**
   * Creates a new Intent Extractor service instance
   * @param _ - Container dependencies (unused, required by Medusa module pattern)
   * @param options - Intent Extractor service configuration options
   */
  constructor(_: Record<string, unknown>, options: IntentExtractorServiceOptions) {
    this.options = options;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryBaseDelayMs = options.retryBaseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    // Initialize Bedrock client
    this.bedrockClient = new BedrockRuntimeClient({
      region: options.awsRegion,
    });
  }

  /**
   * Get the Bedrock client instance
   */
  getBedrockClient(): BedrockRuntimeClient {
    return this.bedrockClient;
  }

  /**
   * Execute a function with exponential backoff retry
   * @param fn - Function to execute
   * @param operationName - Name of the operation for logging
   * @returns Result of the function
   */
  private async withRetry<T>(fn: () => Promise<T>, operationName: string): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on the last attempt
        if (attempt < this.maxRetries - 1) {
          const delayMs = this.retryBaseDelayMs * Math.pow(2, attempt);
          console.warn(
            `${operationName} failed (attempt ${attempt + 1}/${this.maxRetries}), retrying in ${delayMs}ms:`,
            lastError.message,
          );
          await this.sleep(delayMs);
        }
      }
    }

    throw new Error(`${operationName} failed after ${this.maxRetries} attempts: ${lastError?.message}`);
  }

  /**
   * Sleep for specified milliseconds
   * @param ms - Milliseconds to sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Invoke Claude AI via Bedrock with the given messages
   * @param messages - Array of Claude messages
   * @param maxTokens - Maximum tokens in response
   * @returns Claude response
   */
  private async invokeClaudeAI(messages: ClaudeMessage[], maxTokens: number = 1024): Promise<ClaudeResponse> {
    const modelId = this.options.bedrockModelId || DEFAULT_CLAUDE_MODEL_ID;

    const request: ClaudeRequest = {
      anthropic_version: ANTHROPIC_VERSION,
      max_tokens: maxTokens,
      messages,
      temperature: 0.2, // Lower temperature for more consistent intent extraction
    };

    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(request),
    });

    const response = await this.bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body)) as ClaudeResponse;

    return responseBody;
  }

  /**
   * Parse JSON from Claude's response text
   * Handles cases where JSON might be wrapped in markdown code blocks
   * @param text - Response text from Claude
   * @returns Parsed JSON object
   */
  private parseJsonResponse<T>(text: string): T {
    // Try to extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const jsonString = jsonMatch ? jsonMatch[1].trim() : text.trim();

    try {
      return JSON.parse(jsonString) as T;
    } catch {
      throw new Error(`Failed to parse JSON response: ${text.substring(0, 200)}...`);
    }
  }

  /**
   * Build the prompt for intent extraction
   * @param query - User's search query
   * @param imageContext - Optional context from uploaded image
   * @returns Formatted prompt string
   */
  private buildIntentExtractionPrompt(query: string, imageContext?: SearchImageContext): string {
    let prompt = `Analyze this e-commerce search query and extract structured search parameters.

Query: "${query}"
`;

    if (imageContext) {
      prompt += `
Image Context (user uploaded an image with this query):
- Description: ${imageContext.description}
- Dominant Colors: ${imageContext.dominant_colors.join(', ')}
- Style Keywords: ${imageContext.style_keywords.join(', ')}
- Suggested Category: ${imageContext.suggested_category}
`;
    }

    prompt += `
Return a JSON object with:
{
  "detected_language": "en" | "zh" | "mixed",
  "visual_reference": "description of visual style being sought (if any, null otherwise)",
  "constraints": {
    "colors": ["specific colors mentioned or implied"],
    "price_min": number or null,
    "price_max": number or null,
    "materials": ["materials mentioned"],
    "categories": ["product categories"],
    "styles": ["style preferences"],
    "size_constraints": "any size requirements or null"
  },
  "search_keywords": ["key search terms extracted"]
}

IMPORTANT RULES:
1. Handle both Chinese and English queries correctly.
2. For Chinese price expressions:
   - "1000以下" or "1000元以下" → price_max: 1000
   - "500以上" or "500元以上" → price_min: 500
   - "500到1000" or "500-1000元" → price_min: 500, price_max: 1000
   - "1000左右" → price_min: 800, price_max: 1200 (approximate ±20%)
3. For English price expressions:
   - "under $100" or "below 100" → price_max: 100
   - "above $50" or "over 50" → price_min: 50
   - "between $50 and $100" → price_min: 50, price_max: 100
   - "around $100" → price_min: 80, price_max: 120 (approximate ±20%)
4. Extract colors in their standard form (e.g., "blue", "蓝色" → "blue")
5. If the query references an image (e.g., "like this", "similar to this", "这样的"), set visual_reference appropriately
6. Return ONLY the JSON object, no additional text or markdown formatting.`;

    return prompt;
  }

  /**
   * Determine the search type based on query and image context
   * @param query - User's search query
   * @param imageContext - Optional context from uploaded image
   * @returns Search type classification
   */
  private determineSearchType(
    query: string,
    imageContext?: SearchImageContext,
  ): 'text_only' | 'image_only' | 'mixed_modal' {
    const hasQuery = query && query.trim().length > 0;
    const hasImage = !!imageContext;

    if (hasQuery && hasImage) {
      return 'mixed_modal';
    } else if (hasImage) {
      return 'image_only';
    } else {
      return 'text_only';
    }
  }

  /**
   * Create a fallback intent when extraction fails
   * @param query - Original query text
   * @param imageContext - Optional image context
   * @returns Basic SearchIntent with original query
   */
  private createFallbackIntent(query: string, imageContext?: SearchImageContext): SearchIntent {
    // Simple language detection based on character ranges
    const hasChinese = /[\u4e00-\u9fff]/.test(query);
    const hasEnglish = /[a-zA-Z]/.test(query);

    let detectedLanguage: 'en' | 'zh' | 'mixed' = 'en';
    if (hasChinese && hasEnglish) {
      detectedLanguage = 'mixed';
    } else if (hasChinese) {
      detectedLanguage = 'zh';
    }

    return {
      original_query: query,
      detected_language: detectedLanguage,
      visual_reference: imageContext?.description,
      constraints: {},
      search_type: this.determineSearchType(query, imageContext),
    };
  }

  /**
   * Normalize and validate extracted constraints
   * @param rawConstraints - Raw constraints from Claude response
   * @returns Normalized SearchConstraints
   */
  private normalizeConstraints(rawConstraints: RawIntentExtractionResult['constraints']): SearchConstraints {
    const constraints: SearchConstraints = {};

    // Normalize colors
    if (Array.isArray(rawConstraints.colors) && rawConstraints.colors.length > 0) {
      constraints.colors = rawConstraints.colors.map((c) => c.toLowerCase().trim()).filter((c) => c.length > 0);
    }

    // Normalize price constraints
    if (typeof rawConstraints.price_min === 'number' && rawConstraints.price_min >= 0) {
      constraints.price_min = rawConstraints.price_min;
    }
    if (typeof rawConstraints.price_max === 'number' && rawConstraints.price_max > 0) {
      constraints.price_max = rawConstraints.price_max;
    }

    // Ensure price_min <= price_max
    if (constraints.price_min !== undefined && constraints.price_max !== undefined) {
      if (constraints.price_min > constraints.price_max) {
        // Swap if inverted
        [constraints.price_min, constraints.price_max] = [constraints.price_max, constraints.price_min];
      }
    }

    // Normalize materials
    if (Array.isArray(rawConstraints.materials) && rawConstraints.materials.length > 0) {
      constraints.materials = rawConstraints.materials.map((m) => m.toLowerCase().trim()).filter((m) => m.length > 0);
    }

    // Normalize categories
    if (Array.isArray(rawConstraints.categories) && rawConstraints.categories.length > 0) {
      constraints.categories = rawConstraints.categories.map((c) => c.toLowerCase().trim()).filter((c) => c.length > 0);
    }

    // Normalize styles
    if (Array.isArray(rawConstraints.styles) && rawConstraints.styles.length > 0) {
      constraints.styles = rawConstraints.styles.map((s) => s.toLowerCase().trim()).filter((s) => s.length > 0);
    }

    // Normalize size constraints
    if (typeof rawConstraints.size_constraints === 'string' && rawConstraints.size_constraints.trim().length > 0) {
      constraints.size_constraints = rawConstraints.size_constraints.trim();
    }

    return constraints;
  }

  /**
   * Extract structured intent from a natural language query
   * @param query - User's search query (Chinese or English)
   * @param imageContext - Optional context from uploaded image
   * @returns Structured search intent
   */
  async extractIntent(query: string, imageContext?: SearchImageContext): Promise<SearchIntent> {
    // Handle empty query case
    if (!query || query.trim().length === 0) {
      if (imageContext) {
        // Image-only search
        return {
          original_query: '',
          detected_language: 'en',
          visual_reference: imageContext.description,
          constraints: {
            colors: imageContext.dominant_colors,
            styles: imageContext.style_keywords,
            categories: imageContext.suggested_category ? [imageContext.suggested_category] : undefined,
          },
          search_type: 'image_only',
        };
      }
      // No query and no image - return empty intent
      return this.createFallbackIntent('', imageContext);
    }

    try {
      return await this.extractIntentWithClaude(query, imageContext);
    } catch (error) {
      // Log the Claude failure and fall back to basic intent
      console.warn('Claude AI intent extraction failed, falling back to basic intent:', (error as Error).message);
      return this.createFallbackIntent(query, imageContext);
    }
  }

  /**
   * Extract intent using Claude AI (primary method)
   * @param query - User's search query
   * @param imageContext - Optional context from uploaded image
   * @returns Structured search intent
   */
  private async extractIntentWithClaude(query: string, imageContext?: SearchImageContext): Promise<SearchIntent> {
    return this.withRetry(async () => {
      const prompt = this.buildIntentExtractionPrompt(query, imageContext);

      const messages: ClaudeMessage[] = [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ];

      const response = await this.invokeClaudeAI(messages);
      const responseText = response.content[0]?.text || '';

      const result = this.parseJsonResponse<RawIntentExtractionResult>(responseText);

      // Validate and normalize the result
      const detectedLanguage = ['en', 'zh', 'mixed'].includes(result.detected_language)
        ? result.detected_language
        : 'en';

      return {
        original_query: query,
        detected_language: detectedLanguage as 'en' | 'zh' | 'mixed',
        visual_reference: result.visual_reference || undefined,
        constraints: this.normalizeConstraints(result.constraints || {}),
        search_type: this.determineSearchType(query, imageContext),
      };
    }, 'extractIntentWithClaude');
  }
}
