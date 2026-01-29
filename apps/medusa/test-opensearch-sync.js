/**
 * Test script to verify OpenSearch sync workflow
 * Tests: Bedrock embeddings + OpenSearch indexing
 */

require('dotenv').config();
const { Client } = require('@opensearch-project/opensearch');

async function testOpenSearchSync() {
  console.log('🧪 Testing OpenSearch Sync Workflow\n');

  // Test 1: OpenSearch Connection
  console.log('1️⃣  Testing OpenSearch connection...');
  const client = new Client({
    node: process.env.OPENSEARCH_HOST,
    auth: {
      username: process.env.OPENSEARCH_USERNAME,
      password: process.env.OPENSEARCH_PASSWORD,
    },
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    const health = await client.cluster.health();
    console.log(`   ✅ OpenSearch connected: ${health.body.cluster_name}`);
    console.log(`   Status: ${health.body.status}`);
    console.log(`   Nodes: ${health.body.number_of_nodes}`);
  } catch (error) {
    console.error(`   ❌ OpenSearch connection failed: ${error.message}`);
    return false;
  }

  // Test 2: Check if products index exists
  console.log('\n2️⃣  Checking products index...');
  const indexName = process.env.OPENSEARCH_PRODUCT_INDEX || 'products';

  try {
    const exists = await client.indices.exists({ index: indexName });
    if (exists.body) {
      const count = await client.count({ index: indexName });
      console.log(`   ✅ Index "${indexName}" exists`);
      console.log(`   Document count: ${count.body.count}`);
    } else {
      console.log(`   ⚠️  Index "${indexName}" does not exist yet`);
      console.log(`   It will be created automatically on first sync`);
    }
  } catch (error) {
    console.error(`   ❌ Failed to check index: ${error.message}`);
  }

  // Test 3: Test Bedrock embeddings
  console.log('\n3️⃣  Testing Bedrock embeddings...');
  const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

  const bedrockClient = new BedrockRuntimeClient({
    region: process.env.BEDROCK_REGION || 'us-east-1',
  });

  try {
    const request = {
      inputText: 'Test product for embedding generation',
      dimensions: 1024,
      normalize: true,
    };

    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID || 'amazon.titan-embed-text-v2:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(request),
    });

    const startTime = Date.now();
    const response = await bedrockClient.send(command);
    const duration = Date.now() - startTime;
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log(`   ✅ Bedrock embeddings working`);
    console.log(`   Duration: ${duration}ms`);
    console.log(`   Embedding dimension: ${responseBody.embedding.length}`);
  } catch (error) {
    console.error(`   ❌ Bedrock failed: ${error.message}`);
    return false;
  }

  // Test 4: Check sync status
  console.log('\n4️⃣  Checking sync configuration...');
  console.log(`   ENABLE_OPENSEARCH_SYNC: ${process.env.ENABLE_OPENSEARCH_SYNC || 'false'}`);

  if (process.env.ENABLE_OPENSEARCH_SYNC === 'true') {
    console.log(`   ✅ Auto-sync is ENABLED`);
    console.log(`   Products will be synced automatically on create/update`);
  } else {
    console.log(`   ⚠️  Auto-sync is DISABLED`);
    console.log(`   Set ENABLE_OPENSEARCH_SYNC=true to enable`);
  }

  console.log('\n✅ All tests passed! OpenSearch sync is ready.\n');
  return true;
}

// Run tests
testOpenSearchSync()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
