/**
 * AWS Services Connection Test Script
 *
 * Tests connectivity to:
 * 1. AWS Bedrock (Titan Embeddings) - No SSH tunnel needed
 * 2. AWS Rekognition (DetectLabels) - No SSH tunnel needed
 * 3. AWS OpenSearch (VPC) - Requires SSH tunnel
 *
 * Usage: npx tsx ./src/scripts/test-aws-services.ts
 */

import 'dotenv/config';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { RekognitionClient, DetectLabelsCommand } from '@aws-sdk/client-rekognition';
import { Client } from '@opensearch-project/opensearch';
import * as https from 'https';

const AWS_REGION = process.env.AWS_REGION || 'ap-southeast-1';

async function testBedrock(): Promise<boolean> {
  console.log('\n========================================');
  console.log('Testing AWS Bedrock (Titan Embeddings)');
  console.log('========================================');

  try {
    const client = new BedrockRuntimeClient({ region: AWS_REGION });

    const testText = 'This is a test for semantic search embeddings';
    const payload = {
      inputText: testText,
      dimensions: 1024,
      normalize: true,
    };

    console.log(`Region: ${AWS_REGION}`);
    console.log(`Model: amazon.titan-embed-text-v2:0`);
    console.log(`Test text: "${testText}"`);

    const command = new InvokeModelCommand({
      modelId: 'amazon.titan-embed-text-v2:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(payload),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    if (responseBody.embedding && Array.isArray(responseBody.embedding)) {
      console.log(`✅ Bedrock SUCCESS!`);
      console.log(`   Embedding dimensions: ${responseBody.embedding.length}`);
      console.log(
        `   First 5 values: [${responseBody.embedding
          .slice(0, 5)
          .map((v: number) => v.toFixed(4))
          .join(', ')}...]`,
      );
      return true;
    } else {
      console.log(`❌ Bedrock FAILED: Unexpected response format`);
      return false;
    }
  } catch (error: any) {
    console.log(`❌ Bedrock FAILED: ${error.message}`);
    if (error.name === 'AccessDeniedException') {
      console.log('   → Check if Titan Embeddings model access is enabled in Bedrock console');
    } else if (error.name === 'CredentialsProviderError') {
      console.log('   → Check AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)');
    }
    return false;
  }
}

async function testRekognition(): Promise<boolean> {
  console.log('\n========================================');
  console.log('Testing AWS Rekognition (DetectLabels)');
  console.log('========================================');

  try {
    const client = new RekognitionClient({ region: AWS_REGION });

    // Create a simple 10x10 red PNG image for testing
    // This is a minimal valid PNG that Rekognition can process
    const testImageBase64 = createTestImage();

    console.log(`Region: ${AWS_REGION}`);
    console.log(`Testing with a simple generated test image...`);

    const command = new DetectLabelsCommand({
      Image: {
        Bytes: Buffer.from(testImageBase64, 'base64'),
      },
      MaxLabels: 5,
      MinConfidence: 50,
    });

    const response = await client.send(command);

    console.log(`✅ Rekognition SUCCESS!`);
    console.log(`   Labels detected: ${response.Labels?.length || 0}`);
    if (response.Labels && response.Labels.length > 0) {
      response.Labels.forEach((label) => {
        console.log(`   - ${label.Name} (${label.Confidence?.toFixed(1)}%)`);
      });
    } else {
      console.log(`   (No labels detected in test image - this is expected for a simple test image)`);
    }
    return true;
  } catch (error: any) {
    console.log(`❌ Rekognition FAILED: ${error.message}`);
    if (error.name === 'AccessDeniedException') {
      console.log('   → Check IAM permissions for rekognition:DetectLabels');
    } else if (error.name === 'CredentialsProviderError') {
      console.log('   → Check AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)');
    } else if (error.name === 'InvalidImageFormatException') {
      console.log('   → Test image format issue (this is a test script limitation)');
      console.log('   → The Rekognition API is accessible, just the test image is invalid');
      return true; // API is accessible, just test image issue
    }
    return false;
  }
}

async function testOpenSearch(): Promise<boolean> {
  console.log('\n========================================');
  console.log('Testing AWS OpenSearch (VPC)');
  console.log('========================================');

  const host = process.env.OPENSEARCH_HOST || 'https://localhost:9200';
  const username = process.env.OPENSEARCH_USERNAME;
  const password = process.env.OPENSEARCH_PASSWORD;

  console.log(`Host: ${host}`);
  console.log(`Username: ${username ? username : '(not set)'}`);
  console.log(`Password: ${password ? '****' : '(not set)'}`);

  if (host.includes('localhost')) {
    console.log('\n⚠️  OpenSearch is configured for localhost (SSH tunnel mode)');
    console.log('   To test, first establish SSH tunnel:');
    console.log(
      '   ssh -i ./autobots-shared-ssh-key -L 9200:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com',
    );
  }

  try {
    const clientOptions: any = {
      node: host,
      ssl: {
        rejectUnauthorized: false, // For self-signed certs through tunnel
      },
    };

    if (username && password) {
      clientOptions.auth = {
        username,
        password,
      };
    }

    const client = new Client(clientOptions);

    const health = await client.cluster.health();

    console.log(`✅ OpenSearch SUCCESS!`);
    console.log(`   Cluster name: ${health.body.cluster_name}`);
    console.log(`   Status: ${health.body.status}`);
    console.log(`   Number of nodes: ${health.body.number_of_nodes}`);
    return true;
  } catch (error: any) {
    console.log(`❌ OpenSearch FAILED: ${error.message}`);
    if (error.message.includes('ECONNREFUSED')) {
      console.log('   → SSH tunnel is not running. Start it with:');
      console.log(
        '   ssh -i ./autobots-shared-ssh-key -L 9200:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com',
      );
    } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('   → Check OPENSEARCH_USERNAME and OPENSEARCH_PASSWORD');
    }
    return false;
  }
}

// Create a minimal valid PNG image for testing
function createTestImage(): string {
  // This is a minimal 1x1 red pixel PNG
  // PNG header + IHDR + IDAT + IEND chunks
  const pngData = Buffer.from([
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a, // PNG signature
    0x00,
    0x00,
    0x00,
    0x0d, // IHDR length
    0x49,
    0x48,
    0x44,
    0x52, // IHDR
    0x00,
    0x00,
    0x00,
    0x01, // width: 1
    0x00,
    0x00,
    0x00,
    0x01, // height: 1
    0x08,
    0x02, // bit depth: 8, color type: 2 (RGB)
    0x00,
    0x00,
    0x00, // compression, filter, interlace
    0x90,
    0x77,
    0x53,
    0xde, // CRC
    0x00,
    0x00,
    0x00,
    0x0c, // IDAT length
    0x49,
    0x44,
    0x41,
    0x54, // IDAT
    0x08,
    0xd7,
    0x63,
    0xf8,
    0xcf,
    0xc0,
    0x00,
    0x00, // compressed data
    0x01,
    0x01,
    0x01,
    0x00, // CRC (approximate)
    0x00,
    0x00,
    0x00,
    0x00, // IEND length
    0x49,
    0x45,
    0x4e,
    0x44, // IEND
    0xae,
    0x42,
    0x60,
    0x82, // CRC
  ]);
  return pngData.toString('base64');
}

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   AWS Services Connection Test         ║');
  console.log('╚════════════════════════════════════════╝');
  console.log(`\nAWS Region: ${AWS_REGION}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const results = {
    bedrock: await testBedrock(),
    rekognition: await testRekognition(),
    opensearch: await testOpenSearch(),
  };

  console.log('\n========================================');
  console.log('Summary');
  console.log('========================================');
  console.log(`Bedrock:     ${results.bedrock ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Rekognition: ${results.rekognition ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`OpenSearch:  ${results.opensearch ? '✅ PASS' : '❌ FAIL'}`);

  const allPassed = Object.values(results).every(Boolean);
  console.log(`\nOverall: ${allPassed ? '✅ All services connected!' : '⚠️  Some services failed'}`);

  if (!results.opensearch) {
    console.log('\nNote: OpenSearch requires SSH tunnel for VPC access.');
    console.log('Bedrock and Rekognition should work directly with AWS credentials.');
  }
}

main().catch(console.error);
