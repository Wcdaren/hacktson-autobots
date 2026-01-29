/**
 * Test script to verify AWS Bedrock connectivity and embedding generation
 */

require('dotenv').config();
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

async function testBedrock() {
  console.log('Testing AWS Bedrock connectivity...\n');
  console.log('AWS Region:', process.env.AWS_REGION || 'us-east-1');
  console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID ? '✓ Set' : '✗ Not set');
  console.log('AWS Secret Access Key:', process.env.AWS_SECRET_ACCESS_KEY ? '✓ Set' : '✗ Not set');
  console.log();

  // Initialize Bedrock client
  const client = new BedrockRuntimeClient({
    region: process.env.BEDROCK_REGION || process.env.AWS_REGION || 'us-east-1',
  });

  try {
    // Test embedding generation
    const testText = 'Modern comfortable sofa with premium fabric';
    console.log(`Generating embedding for: "${testText}"`);

    const request = {
      inputText: testText,
      dimensions: 1024,
      normalize: true,
    };

    const command = new InvokeModelCommand({
      modelId: 'amazon.titan-embed-text-v2:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(request),
    });

    const startTime = Date.now();
    const response = await client.send(command);
    const duration = Date.now() - startTime;

    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    console.log('\n✅ SUCCESS!');
    console.log(`Duration: ${duration}ms`);
    console.log(`Embedding dimension: ${responseBody.embedding.length}`);
    console.log(`Input tokens: ${responseBody.inputTextTokenCount}`);
    console.log(`First 5 values: [${responseBody.embedding.slice(0, 5).join(', ')}]`);

    return true;
  } catch (error) {
    console.error('\n❌ FAILED!');
    console.error('Error:', error.message);
    if (error.$metadata) {
      console.error('HTTP Status:', error.$metadata.httpStatusCode);
    }
    return false;
  }
}

// Run test
testBedrock()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
