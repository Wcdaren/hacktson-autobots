/**
 * EmbeddingService Unit Tests
 *
 * Tests for the embedding service that generates text and image embeddings
 * using AWS Bedrock and Rekognition.
 */

import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import EmbeddingService from '../service';
import type { EmbeddingServiceOptions } from '../types';
import { EMBEDDING_DIMENSION, DEFAULT_MAX_RETRIES, DEFAULT_RETRY_BASE_DELAY_MS } from '../types';

// Mock AWS SDK clients
jest.mock('@aws-sdk/client-bedrock-runtime', () => ({
  BedrockRuntimeClient: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
  })),
  InvokeModelCommand: jest.fn().mockImplementation((params) => params),
}));

jest.mock('@aws-sdk/client-rekognition', () => ({
  RekognitionClient: jest.fn().mockImplementation(() => ({
    send: jest.fn(),
  })),
  DetectLabelsCommand: jest.fn().mockImplementation((params) => params),
}));

describe('EmbeddingService', () => {
  let service: EmbeddingService;
  let mockBedrockSend: jest.Mock;
  let mockRekognitionSend: jest.Mock;

  const defaultOptions: EmbeddingServiceOptions = {
    awsRegion: 'us-east-1',
    bedrockModelId: 'amazon.titan-embed-text-v2:0',
    rekognitionEnabled: true,
    maxRetries: 3,
    retryBaseDelayMs: 10, // Short delay for tests
  };

  // Helper to create a mock embedding response
  const createMockEmbeddingResponse = (dimension: number = EMBEDDING_DIMENSION) => ({
    body: new TextEncoder().encode(
      JSON.stringify({
        embedding: Array(dimension).fill(0.1),
        inputTextTokenCount: 10,
      }),
    ),
  });

  // Helper to create mock Rekognition response
  const createMockRekognitionResponse = (labels: string[]) => ({
    Labels: labels.map((name) => ({ Name: name, Confidence: 95 })),
  });

  beforeEach(() => {
    jest.clearAllMocks();

    service = new EmbeddingService({}, defaultOptions);

    // Get mock send functions
    mockBedrockSend = service.getBedrockClient().send as jest.Mock;
    const rekognitionClient = service.getRekognitionClient();
    if (rekognitionClient) {
      mockRekognitionSend = rekognitionClient.send as jest.Mock;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with provided options', () => {
      expect(service.getBedrockClient()).toBeDefined();
      expect(service.getRekognitionClient()).toBeDefined();
    });

    it('should not initialize Rekognition client when disabled', () => {
      const serviceWithoutRekognition = new EmbeddingService({}, { ...defaultOptions, rekognitionEnabled: false });
      expect(serviceWithoutRekognition.getRekognitionClient()).toBeNull();
    });
  });

  describe('generateTextEmbedding', () => {
    it('should generate text embedding successfully', async () => {
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse());

      const result = await service.generateTextEmbedding('test text');

      expect(result.embedding).toHaveLength(EMBEDDING_DIMENSION);
      expect(result.inputTokens).toBe(10);
      expect(mockBedrockSend).toHaveBeenCalledTimes(1);
    });

    it('should return embedding with correct dimension', async () => {
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse(EMBEDDING_DIMENSION));

      const result = await service.generateTextEmbedding('test text');

      expect(result.embedding.length).toBe(EMBEDDING_DIMENSION);
    });

    it('should retry on failure with exponential backoff', async () => {
      const error = new Error('Temporary failure');
      mockBedrockSend
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(createMockEmbeddingResponse());

      const result = await service.generateTextEmbedding('test text');

      expect(result.embedding).toHaveLength(EMBEDDING_DIMENSION);
      expect(mockBedrockSend).toHaveBeenCalledTimes(3);
    });

    it('should throw after max retries exceeded', async () => {
      const error = new Error('Persistent failure');
      mockBedrockSend.mockRejectedValue(error);

      await expect(service.generateTextEmbedding('test text')).rejects.toThrow(
        /generateTextEmbedding failed after 3 attempts/,
      );
      expect(mockBedrockSend).toHaveBeenCalledTimes(DEFAULT_MAX_RETRIES);
    });
  });

  describe('generateImageEmbedding', () => {
    it('should generate image embedding successfully', async () => {
      mockRekognitionSend.mockResolvedValueOnce(createMockRekognitionResponse(['Furniture', 'Sofa', 'Living Room']));
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse());

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.generateImageEmbedding(imageBuffer);

      expect(result.embedding).toHaveLength(EMBEDDING_DIMENSION);
      expect(result.labels).toContain('Furniture');
      expect(result.labels).toContain('Sofa');
      expect(mockRekognitionSend).toHaveBeenCalledTimes(1);
    });

    it('should throw error when Rekognition is disabled', async () => {
      const serviceWithoutRekognition = new EmbeddingService({}, { ...defaultOptions, rekognitionEnabled: false });

      const imageBuffer = Buffer.from('fake-image-data');
      await expect(serviceWithoutRekognition.generateImageEmbedding(imageBuffer)).rejects.toThrow(
        'Rekognition is not enabled',
      );
    });

    it('should handle empty labels from Rekognition', async () => {
      mockRekognitionSend.mockResolvedValueOnce({ Labels: [] });
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse());

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.generateImageEmbedding(imageBuffer);

      expect(result.embedding).toHaveLength(EMBEDDING_DIMENSION);
      expect(result.labels).toHaveLength(0);
    });

    it('should filter out empty label names', async () => {
      mockRekognitionSend.mockResolvedValueOnce({
        Labels: [
          { Name: 'Furniture', Confidence: 95 },
          { Name: '', Confidence: 90 },
          { Name: 'Chair', Confidence: 85 },
        ],
      });
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse());

      const imageBuffer = Buffer.from('fake-image-data');
      const result = await service.generateImageEmbedding(imageBuffer);

      expect(result.labels).toEqual(['Furniture', 'Chair']);
    });
  });

  describe('batchGenerateTextEmbeddings', () => {
    it('should process multiple texts in batches', async () => {
      mockBedrockSend.mockResolvedValue(createMockEmbeddingResponse());

      const texts = ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'];
      const results = await service.batchGenerateTextEmbeddings(texts);

      expect(results).toHaveLength(6);
      results.forEach((result) => {
        expect(result.embedding).toHaveLength(EMBEDDING_DIMENSION);
      });
    });

    it('should handle empty input array', async () => {
      const results = await service.batchGenerateTextEmbeddings([]);

      expect(results).toHaveLength(0);
      expect(mockBedrockSend).not.toHaveBeenCalled();
    });

    it('should process single text', async () => {
      mockBedrockSend.mockResolvedValueOnce(createMockEmbeddingResponse());

      const results = await service.batchGenerateTextEmbeddings(['single text']);

      expect(results).toHaveLength(1);
      expect(mockBedrockSend).toHaveBeenCalledTimes(1);
    });
  });
});
