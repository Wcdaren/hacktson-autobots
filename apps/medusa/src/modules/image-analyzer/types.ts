/**
 * Image Analyzer Module Types
 *
 * Type definitions for the Image Analyzer module that uses Claude AI
 * via AWS Bedrock to generate rich textual descriptions from product images.
 */

/**
 * Configuration options for the Image Analyzer Service
 */
export interface ImageAnalyzerServiceOptions {
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
 * Product attributes extracted from image analysis
 * Contains visual characteristics useful for search matching
 */
export interface ProductAttributes {
  /** Primary and secondary colors identified in the product */
  colors: string[];
  /** Materials visible or likely based on the product appearance */
  materials: string[];
  /** Style classification (e.g., modern, traditional, minimalist, industrial) */
  style: string;
  /** Product category classification */
  category: string;
  /** Notable design features and elements */
  design_elements: string[];
}

/**
 * Result from analyzing a product image
 * Contains bilingual descriptions and extracted attributes
 */
export interface ImageAnalysisResult {
  /** Detailed English description focusing on visual attributes, style, and use cases */
  description_en: string;
  /** 详细的中文描述，重点描述视觉属性、风格和使用场景 */
  description_zh: string;
  /** Extracted visual attributes for search matching */
  attributes: ProductAttributes;
  /** Confidence score for the analysis (0-1) */
  confidence: number;
}

/**
 * Result from analyzing a user-uploaded search image
 * Contains search-oriented description and attributes
 */
export interface SearchImageAnalysis {
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
 * Claude AI content block (text or image)
 */
export type ClaudeContent = { type: 'text'; text: string } | { type: 'image'; source: ClaudeImageSource };

/**
 * Claude AI image source for base64 encoded images
 */
export interface ClaudeImageSource {
  type: 'base64';
  media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
  data: string;
}

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
 * Fallback result when image analysis fails
 * Uses Rekognition labels as a backup
 */
export interface FallbackAnalysisResult {
  /** Whether fallback was used */
  fallback_used: true;
  /** Rekognition labels used for fallback */
  labels: string[];
  /** Basic description generated from labels */
  description: string;
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
