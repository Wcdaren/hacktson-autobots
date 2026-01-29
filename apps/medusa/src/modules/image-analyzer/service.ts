/**
 * Image Analyzer Service
 *
 * Generates rich textual descriptions from product images using Claude AI
 * via AWS Bedrock. Supports bilingual (English/Chinese) descriptions and
 * extracts visual attributes for improved search relevance.
 *
 * Implements fallback to AWS Rekognition when Claude AI is unavailable.
 */

import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { RekognitionClient, DetectLabelsCommand } from '@aws-sdk/client-rekognition';
import type {
  ImageAnalyzerServiceOptions,
  ImageAnalysisResult,
  SearchImageAnalysis,
  ProductAttributes,
  ClaudeRequest,
  ClaudeResponse,
  ClaudeMessage,
} from './types';
import {
  DEFAULT_MAX_RETRIES,
  DEFAULT_RETRY_BASE_DELAY_MS,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_CLAUDE_MODEL_ID,
  ANTHROPIC_VERSION,
} from './types';

/**
 * Image Analyzer Service
 *
 * Provides methods for analyzing product images and user-uploaded search images
 * using Claude AI to generate rich, searchable descriptions.
 *
 * Implements fallback to AWS Rekognition when Claude AI is unavailable.
 */
export default class ImageAnalyzerService {
  private options: ImageAnalyzerServiceOptions;
  private bedrockClient: BedrockRuntimeClient;
  private rekognitionClient: RekognitionClient;
  private maxRetries: number;
  private retryBaseDelayMs: number;
  private timeoutMs: number;

  /**
   * Creates a new Image Analyzer service instance
   * @param _ - Container dependencies (unused, required by Medusa module pattern)
   * @param options - Image Analyzer service configuration options
   */
  constructor(_: Record<string, unknown>, options: ImageAnalyzerServiceOptions) {
    this.options = options;
    this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
    this.retryBaseDelayMs = options.retryBaseDelayMs ?? DEFAULT_RETRY_BASE_DELAY_MS;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

    // Initialize Bedrock client
    this.bedrockClient = new BedrockRuntimeClient({
      region: options.awsRegion,
    });

    // Initialize Rekognition client for fallback
    this.rekognitionClient = new RekognitionClient({
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
   * Get the Rekognition client instance
   */
  getRekognitionClient(): RekognitionClient {
    return this.rekognitionClient;
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
   * Detect the media type of an image from its buffer
   * @param imageBuffer - Image data buffer
   * @returns Media type string
   */
  private detectMediaType(imageBuffer: Buffer): 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' {
    // Check magic bytes to determine image type
    if (imageBuffer[0] === 0xff && imageBuffer[1] === 0xd8 && imageBuffer[2] === 0xff) {
      return 'image/jpeg';
    }
    if (imageBuffer[0] === 0x89 && imageBuffer[1] === 0x50 && imageBuffer[2] === 0x4e && imageBuffer[3] === 0x47) {
      return 'image/png';
    }
    if (imageBuffer[0] === 0x47 && imageBuffer[1] === 0x49 && imageBuffer[2] === 0x46) {
      return 'image/gif';
    }
    if (imageBuffer[0] === 0x52 && imageBuffer[1] === 0x49 && imageBuffer[2] === 0x46 && imageBuffer[3] === 0x46) {
      return 'image/webp';
    }
    // Default to JPEG if unknown
    return 'image/jpeg';
  }

  /**
   * Invoke Claude AI via Bedrock with the given messages
   * @param messages - Array of Claude messages
   * @param maxTokens - Maximum tokens in response
   * @returns Claude response
   */
  private async invokeClaudeAI(messages: ClaudeMessage[], maxTokens: number = 2048): Promise<ClaudeResponse> {
    const modelId = this.options.bedrockModelId || DEFAULT_CLAUDE_MODEL_ID;

    const request: ClaudeRequest = {
      anthropic_version: ANTHROPIC_VERSION,
      max_tokens: maxTokens,
      messages,
      temperature: 0.3, // Lower temperature for more consistent outputs
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
   * Analyze a product image and generate bilingual descriptions
   * @param imageBuffer - Image data as Buffer
   * @returns Bilingual descriptions with extracted attributes
   */
  async analyzeProductImage(imageBuffer: Buffer): Promise<ImageAnalysisResult> {
    return this.withRetry(async () => {
      const mediaType = this.detectMediaType(imageBuffer);
      const base64Image = imageBuffer.toString('base64');

      const prompt = `Analyze this product image for an e-commerce search system.

Provide a detailed description in both English and Chinese that would help customers find this product through search.

Extract and return the following in JSON format:
{
  "description_en": "Detailed English description focusing on visual attributes, style, and use cases",
  "description_zh": "详细的中文描述，重点描述视觉属性、风格和使用场景",
  "attributes": {
    "colors": ["primary color", "secondary colors"],
    "materials": ["visible or likely materials"],
    "style": "style classification (modern, traditional, minimalist, etc.)",
    "category": "product category",
    "design_elements": ["notable design features"]
  },
  "confidence": 0.95
}

Focus on attributes that customers would use when searching: colors, materials, style, size impression, and intended use.

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

      const messages: ClaudeMessage[] = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ];

      const response = await this.invokeClaudeAI(messages);
      const responseText = response.content[0]?.text || '';

      const result = this.parseJsonResponse<{
        description_en: string;
        description_zh: string;
        attributes: ProductAttributes;
        confidence?: number;
      }>(responseText);

      // Validate and normalize the result
      return {
        description_en: result.description_en || '',
        description_zh: result.description_zh || '',
        attributes: {
          colors: Array.isArray(result.attributes?.colors) ? result.attributes.colors : [],
          materials: Array.isArray(result.attributes?.materials) ? result.attributes.materials : [],
          style: result.attributes?.style || 'unknown',
          category: result.attributes?.category || 'unknown',
          design_elements: Array.isArray(result.attributes?.design_elements) ? result.attributes.design_elements : [],
        },
        confidence: typeof result.confidence === 'number' ? result.confidence : 0.8,
      };
    }, 'analyzeProductImage');
  }

  /**
   * Analyze an uploaded search image to extract search-relevant features
   * @param imageBuffer - Uploaded image data
   * @returns Search-oriented description and attributes
   */
  async analyzeSearchImage(imageBuffer: Buffer): Promise<SearchImageAnalysis> {
    try {
      return await this.analyzeSearchImageWithClaude(imageBuffer);
    } catch (error) {
      // Log the Claude failure and fall back to Rekognition
      console.warn('Claude AI analysis failed, falling back to Rekognition:', (error as Error).message);
      return await this.analyzeSearchImageWithRekognition(imageBuffer);
    }
  }

  /**
   * Analyze search image using Claude AI (primary method)
   * @param imageBuffer - Uploaded image data
   * @returns Search-oriented description and attributes
   */
  private async analyzeSearchImageWithClaude(imageBuffer: Buffer): Promise<SearchImageAnalysis> {
    return this.withRetry(async () => {
      const mediaType = this.detectMediaType(imageBuffer);
      const base64Image = imageBuffer.toString('base64');

      const prompt = `Analyze this image for product search purposes.

The user wants to find products similar to what's shown in this image.

Extract and return the following in JSON format:
{
  "description": "A concise description of the main subject suitable for search matching",
  "dominant_colors": ["list of dominant colors in the image"],
  "style_keywords": ["keywords describing the style, aesthetic, or design"],
  "suggested_category": "the most likely product category"
}

Focus on visual characteristics that would help match this image to similar products in an e-commerce catalog.

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

      const messages: ClaudeMessage[] = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ];

      const response = await this.invokeClaudeAI(messages, 1024);
      const responseText = response.content[0]?.text || '';

      const result = this.parseJsonResponse<{
        description: string;
        dominant_colors: string[];
        style_keywords: string[];
        suggested_category: string;
      }>(responseText);

      // Validate and normalize the result
      return {
        description: result.description || '',
        dominant_colors: Array.isArray(result.dominant_colors) ? result.dominant_colors : [],
        style_keywords: Array.isArray(result.style_keywords) ? result.style_keywords : [],
        suggested_category: result.suggested_category || 'unknown',
      };
    }, 'analyzeSearchImageWithClaude');
  }

  /**
   * Analyze search image using AWS Rekognition (fallback method)
   * Uses Rekognition's detectLabels API to extract labels and convert them
   * into a SearchImageAnalysis object.
   *
   * @param imageBuffer - Uploaded image data
   * @returns Search-oriented description and attributes derived from Rekognition labels
   */
  private async analyzeSearchImageWithRekognition(imageBuffer: Buffer): Promise<SearchImageAnalysis> {
    return this.withRetry(async () => {
      // Convert Buffer to Uint8Array for AWS SDK compatibility
      const imageBytes = new Uint8Array(imageBuffer.buffer, imageBuffer.byteOffset, imageBuffer.byteLength);

      // Use Rekognition to detect labels
      const detectCommand = new DetectLabelsCommand({
        Image: {
          Bytes: imageBytes,
        },
        MaxLabels: 20,
        MinConfidence: 70,
      });

      const detectResponse = await this.rekognitionClient.send(detectCommand);
      const labels = detectResponse.Labels || [];

      // Extract label names and categorize them
      const labelNames = labels.map((label) => label.Name || '').filter((name) => name.length > 0);

      // Extract colors from labels (Rekognition sometimes detects color-related labels)
      const colorKeywords = [
        'Red',
        'Blue',
        'Green',
        'Yellow',
        'Black',
        'White',
        'Brown',
        'Gray',
        'Grey',
        'Pink',
        'Purple',
        'Orange',
        'Gold',
        'Silver',
        'Beige',
        'Navy',
        'Teal',
        'Maroon',
      ];
      const dominantColors = labelNames.filter((label) =>
        colorKeywords.some((color) => label.toLowerCase().includes(color.toLowerCase())),
      );

      // Extract style-related keywords
      const styleKeywords = labelNames
        .filter((label) => !colorKeywords.some((color) => label.toLowerCase().includes(color.toLowerCase())))
        .slice(0, 10);

      // Determine suggested category from the highest confidence label
      // that looks like a category (typically broader terms)
      const categoryLabels = labels
        .filter((label) => (label.Confidence || 0) > 80)
        .sort((a, b) => (b.Confidence || 0) - (a.Confidence || 0));

      const suggestedCategory = categoryLabels[0]?.Name || 'unknown';

      // Generate description from labels
      const description =
        labelNames.length > 0
          ? `Image containing: ${labelNames.slice(0, 5).join(', ')}`
          : 'Unable to analyze image content';

      return {
        description,
        dominant_colors: dominantColors.length > 0 ? dominantColors : ['unknown'],
        style_keywords: styleKeywords.length > 0 ? styleKeywords : labelNames.slice(0, 5),
        suggested_category: suggestedCategory,
      };
    }, 'analyzeSearchImageWithRekognition');
  }
}
