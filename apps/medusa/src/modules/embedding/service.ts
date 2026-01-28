/**
 * Embedding Service
 * Generates text and image embeddings using AWS Bedrock and Rekognition
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { RekognitionClient, DetectLabelsCommand } from '@aws-sdk/client-rekognition';
import type {
  EmbeddingServiceOptions,
  TextEmbeddingResult,
  ImageEmbeddingResult,
  BedrockEmbeddingRequest,
  BedrockEmbeddingResponse,
} from './types';
import { EMBEDDING_DIMENSION, DEFAULT_MAX_RETRIES, DEFAULT_RETRY_BASE_DELAY_MS } from './types';

export default class EmbeddingService {
  private options: EmbeddingServiceOptions;
  private bedrockClient: BedrockRuntimeClient;
  private rekognitionClient: RekognitionClient | null = null;
  private maxRetries: number;
  private retryBaseDelayMs: number;

  /**
   * Creates a new Embedding service instance
   * @param _ - Container dependencies (unused, required by Medusa module pattern)
   * @param options - Embedding service configuration options
   */
  constructor(_: Record<string, unknown>, options: EmbeddingServiceOptions) {
    this.options = options;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryBaseDelayMs = options.retryBaseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;

    // Initialize Bedrock client
    this.bedrockClient = new BedrockRuntimeClient({
      region: options.awsRegion,
    });

    // Initialize Rekognition client if enabled
    if (options.rekognitionEnabled) {
      this.rekognitionClient = new RekognitionClient({
        region: options.awsRegion,
      });
    }
  }

  /**
   * Get the Bedrock client instance
   */
  getBedrockClient(): BedrockRuntimeClient {
    return this.bedrockClient;
  }

  /**
   * Get the Rekognition client instance
   */
  getRekognitionClient(): RekognitionClient | null {
    return this.rekognitionClient;
  }

  /**
   * Execute a function with exponential backoff retry
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
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Generate text embedding using AWS Bedrock Titan Embeddings V2
   * @param text - Text to generate embedding for
   * @returns Embedding result with vector and token count
   */
  async generateTextEmbedding(text: string): Promise<TextEmbeddingResult> {
    return this.withRetry(async () => {
      const request: BedrockEmbeddingRequest = {
        inputText: text,
        dimensions: EMBEDDING_DIMENSION,
        normalize: true,
      };

      const command = new InvokeModelCommand({
        modelId: this.options.bedrockModelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(request),
      });

      const response = await this.bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body)) as BedrockEmbeddingResponse;

      return {
        embedding: responseBody.embedding,
        inputTokens: responseBody.inputTextTokenCount,
      };
    }, 'generateTextEmbedding');
  }

  /**
   * Generate image embedding using AWS Rekognition labels + Bedrock
   * @param imageBuffer - Image buffer to process
   * @returns Embedding result with vector and detected labels
   */
  async generateImageEmbedding(imageBuffer: Buffer): Promise<ImageEmbeddingResult> {
    if (!this.rekognitionClient) {
      throw new Error('Rekognition is not enabled');
    }

    return this.withRetry(async () => {
      // Convert Buffer to Uint8Array for AWS SDK compatibility
      const imageBytes = new Uint8Array(imageBuffer.buffer, imageBuffer.byteOffset, imageBuffer.byteLength);

      // Use Rekognition to detect labels and generate a text description
      const detectCommand = new DetectLabelsCommand({
        Image: {
          Bytes: imageBytes,
        },
        MaxLabels: 20,
        MinConfidence: 70,
      });

      const detectResponse = await this.rekognitionClient!.send(detectCommand);
      const labels = (detectResponse.Labels || []).map((label) => label.Name || '').filter((name) => name.length > 0);

      // Generate text embedding from labels to create image embedding
      // This creates a semantic representation of the image content
      const labelText = labels.join(', ');
      const textResult = await this.generateTextEmbeddingInternal(`Image containing: ${labelText}`);

      return {
        embedding: textResult.embedding,
        labels,
      };
    }, 'generateImageEmbedding');
  }

  /**
   * Internal method for text embedding without retry (used by image embedding)
   */
  private async generateTextEmbeddingInternal(text: string): Promise<TextEmbeddingResult> {
    const request: BedrockEmbeddingRequest = {
      inputText: text,
      dimensions: EMBEDDING_DIMENSION,
      normalize: true,
    };

    const command = new InvokeModelCommand({
      modelId: this.options.bedrockModelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(request),
    });

    const response = await this.bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body)) as BedrockEmbeddingResponse;

    return {
      embedding: responseBody.embedding,
      inputTokens: responseBody.inputTextTokenCount,
    };
  }

  /**
   * Batch generate text embeddings with concurrency control
   * @param texts - Array of texts to generate embeddings for
   * @returns Array of embedding results
   */
  async batchGenerateTextEmbeddings(texts: string[]): Promise<TextEmbeddingResult[]> {
    // Process texts in parallel with concurrency limit
    const BATCH_SIZE = 5;
    const results: TextEmbeddingResult[] = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(batch.map((text) => this.generateTextEmbedding(text)));
      results.push(...batchResults);
    }

    return results;
  }
}
