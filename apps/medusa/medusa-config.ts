import { defineConfig, loadEnv } from '@medusajs/framework/utils';
import path from 'path';
import { config } from 'dotenv';

// Load .env file explicitly
config({ path: path.join(__dirname, '.env') });

const REDIS_URL = process.env.REDIS_URL;
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;
const IS_TEST = process.env.NODE_ENV === 'test';

const cacheModule = IS_TEST
  ? { resolve: '@medusajs/medusa/cache-inmemory' }
  : {
      resolve: '@medusajs/medusa/cache-redis',
      options: {
        redisUrl: REDIS_URL,
      },
    };

const eventBusModule = IS_TEST
  ? { resolve: '@medusajs/medusa/event-bus-local' }
  : {
      resolve: '@medusajs/medusa/event-bus-redis',
      options: {
        redisUrl: REDIS_URL,
      },
    };

const workflowEngineModule = IS_TEST
  ? { resolve: '@medusajs/medusa/workflow-engine-inmemory' }
  : {
      resolve: '@medusajs/medusa/workflow-engine-redis',
      options: {
        redis: {
          redisUrl: REDIS_URL,
        },
      },
    };

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: DATABASE_URL || process.env.DATABASE_URL,
    databaseDriverOptions: {
      ssl: false,
    },
    redisUrl: REDIS_URL,

    redisPrefix: process.env.REDIS_PREFIX,
    http: {
      storeCors: process.env.STORE_CORS || '',
      adminCors: process.env.ADMIN_CORS || '',
      authCors: process.env.AUTH_CORS || '',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  plugins: [],
  modules: [
    // Stripe disabled - no API key configured
    // {
    //   resolve: '@medusajs/medusa/payment',
    //   options: {
    //     providers: [
    //       {
    //         resolve: '@medusajs/medusa/payment-stripe',
    //         id: 'stripe',
    //         options: {
    //           apiKey: STRIPE_API_KEY,
    //         },
    //       },
    //     ],
    //   },
    // },
    cacheModule,
    eventBusModule,
    workflowEngineModule,
    // OpenSearch module for product search indexing
    {
      resolve: './src/modules/opensearch',
      options: {
        host: process.env.OPENSEARCH_HOST || 'http://localhost:9200',
        productIndexName: process.env.OPENSEARCH_PRODUCT_INDEX || 'products',
        // Enable AWS IAM authentication when using AWS OpenSearch Service with IAM
        useAwsAuth: process.env.OPENSEARCH_USE_AWS_AUTH === 'true',
        awsRegion: process.env.AWS_REGION || 'us-east-1',
        // Basic authentication (username/password) for OpenSearch with fine-grained access control
        username: process.env.OPENSEARCH_USERNAME,
        password: process.env.OPENSEARCH_PASSWORD,
      },
    },
    // Embedding module for semantic search
    {
      resolve: './src/modules/embedding',
      options: {
        awsRegion: process.env.BEDROCK_REGION || process.env.AWS_REGION || 'us-east-1',
        bedrockModelId: process.env.BEDROCK_MODEL_ID || 'amazon.titan-embed-text-v2:0',
        rekognitionEnabled: process.env.REKOGNITION_ENABLED === 'true',
      },
    },
    // Image analyzer module for AI-powered product image analysis using Claude
    {
      resolve: './src/modules/image-analyzer',
      options: {
        awsRegion: process.env.AWS_REGION || 'us-east-1',
        bedrockModelId: process.env.BEDROCK_CLAUDE_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0',
      },
    },
    // Intent extractor module for AI-powered query understanding
    {
      resolve: './src/modules/intent-extractor',
      options: {
        awsRegion: process.env.AWS_REGION || 'us-east-1',
        bedrockModelId: process.env.BEDROCK_CLAUDE_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0',
      },
    },
    // Multimodal search module for intelligent search combining text and images
    {
      resolve: './src/modules/multimodal-search',
      options: {
        defaultSize: 20,
        defaultKeywordWeight: 0.5,
        defaultSemanticWeight: 0.5,
        enableAIEmbeddings: true,
      },
    },
  ],
  admin: {
    backendUrl: process.env.ADMIN_BACKEND_URL,
  },
});
