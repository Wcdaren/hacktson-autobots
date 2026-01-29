/**
 * Intent Extractor Module Types
 *
 * Type definitions for the Query Intent Extractor module that uses Claude AI
 * via AWS Bedrock to extract structured search parameters from natural language queries.
 */

/**
 * Configuration options for the Intent Extractor Service
 */
export interface IntentExtractorServiceOptions {
  /** AWS region for Bedrock service */
  awsRegion: string;
  /** Bedrock model ID for Claude (e.g., anthropic.claude-3-sonnet-20240229-v1:0) */
  bedrockModelId: string;
  /** Maximum retry attempts for failed requests */
  maxRetries?: number;
  /** Base delay in ms for exponential backoff */
  retryBaseDelayMs?: number;
  /** Timeout in ms for Claude API calls */
  timeoutMs?: number;
}

/**
 * Search constraints extracted from user queries
 * Contains structured filters for product search
 */
export interface SearchConstraints {
  /** Color preferences extracted from the query */
  colors?: string[];
  /** Minimum price constraint */
  price_min?: number;
  /** Maximum price constraint */
  price_max?: number;
  /** Material preferences extracted from the query */
  materials?: string[];
  /** Product category filters */
  categories?: string[];
  /** Style preferences (e.g., modern, traditional, minimalist) */
  styles?: string[];
  /** Size-related constraints as free text */
  size_constraints?: string;
  /** Additional custom filters not covered by standard fields */
  custom_filters?: Record<string, unknown>;
}

/**
 * Structured search intent extracted from user queries
 * Represents the parsed understanding of what the user is looking for
 */
export interface SearchIntent {
  /** The original query text submitted by the user */
  original_query: string;
  /** Detected language of the query */
  detected_language: 'en' | 'zh' | 'mixed';
  /** Description of visual style being sought (if any) */
  visual_reference?: string;
  /** Extracted search constraints */
  constraints: SearchConstraints;
  /** Type of search based on input modality */
  search_type: 'text_only' | 'image_only' | 'mixed_modal';
}

/**
 * Context from image analysis to enhance intent extraction
 * Provides visual context when user uploads an image with their query
 */
export interface SearchImageContext {
  /** Description of the image suitable for search matching */
  description: string;
  /** Dominant colors identified in the image */
  dominant_colors: string[];
  /** Style keywords extracted from the image */
  style_keywords: string[];
  /** Suggested product category based on image content */
  suggested_category: string;
}

/**
 * Claude AI message structure for Bedrock API
 */
export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: ClaudeContent[];
}

/**
 * Claude AI content block (text only for intent extraction)
 */
export type ClaudeContent = { type: 'text'; text: string };

/**
 * Claude AI request body for Bedrock
 */
export interface ClaudeRequest {
  anthropic_version: string;
  max_tokens: number;
  messages: ClaudeMessage[];
  temperature?: number;
}

/**
 * Claude AI response body from Bedrock
 */
export interface ClaudeResponse {
  id: string;
  type: string;
  role: string;
  content: Array<{ type: string; text: string }>;
  model: string;
  stop_reason: string;
  stop_sequence: string | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Raw intent extraction result from Claude AI
 * Internal type used for parsing Claude's JSON response
 */
export interface RawIntentExtractionResult {
  detected_language: 'en' | 'zh' | 'mixed';
  visual_reference?: string;
  constraints: {
    colors?: string[];
    price_min?: number | null;
    price_max?: number | null;
    materials?: string[];
    categories?: string[];
    styles?: string[];
    size_constraints?: string | null;
  };
  search_keywords?: string[];
}

/** Default max retries for API calls */
export const DEFAULT_MAX_RETRIES = 3;

/** Default base delay for exponential backoff (1 second) */
export const DEFAULT_RETRY_BASE_DELAY_MS = 1000;

/** Default timeout for Claude API calls (30 seconds) */
export const DEFAULT_TIMEOUT_MS = 30000;

/** Default Claude model ID */
export const DEFAULT_CLAUDE_MODEL_ID = 'anthropic.claude-3-sonnet-20240229-v1:0';

/** Anthropic API version for Bedrock */
export const ANTHROPIC_VERSION = 'bedrock-2023-05-31';
