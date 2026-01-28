/**
 * Embedding Service Types
 * AWS Bedrock + Rekognition integration for semantic search
 */

/**
 * Configuration options for the Embedding Service
 */
export interface EmbeddingServiceOptions {
  /** AWS region for Bedrock and Rekognition services */
  awsRegion: string;
  /** Bedrock model ID (e.g., amazon.titan-embed-text-v2:0) */
  bedrockModelId: string;
  /** Whether to enable Rekognition for image processing */
  rekognitionEnabled: boolean;
  /** Maximum retry attempts for failed requests */
  maxRetries?: number;
  /** Base delay in ms for exponential backoff */
  retryBaseDelayMs?: number;
}

/**
 * Result from text embedding generation
 */
export interface TextEmbeddingResult {
  /** 1024-dimensional embedding vector */
  embedding: number[];
  /** Number of input tokens processed */
  inputTokens: number;
}

/**
 * Result from image embedding generation
 */
export interface ImageEmbeddingResult {
  /** 1024-dimensional embedding vector */
  embedding: number[];
  /** Detected labels from the image */
  labels: string[];
}

/**
 * Bedrock Titan Embeddings V2 request body
 */
export interface BedrockEmbeddingRequest {
  inputText: string;
  dimensions?: number;
  normalize?: boolean;
}

/**
 * Bedrock Titan Embeddings V2 response body
 */
export interface BedrockEmbeddingResponse {
  embedding: number[];
  inputTextTokenCount: number;
}

/**
 * Rekognition detect labels response label
 */
export interface RekognitionLabel {
  Name: string;
  Confidence: number;
}

/** Default embedding vector dimension */
export const EMBEDDING_DIMENSION = 1024;

/** Default max retries */
export const DEFAULT_MAX_RETRIES = 3;

/** Default base delay for exponential backoff (1 second) */
export const DEFAULT_RETRY_BASE_DELAY_MS = 1000;
