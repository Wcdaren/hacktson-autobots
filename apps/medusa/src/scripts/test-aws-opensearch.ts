/**
 * Test AWS OpenSearch Connection via SSH Tunnel
 *
 * Prerequisites:
 * 1. SSH tunnel must be running:
 *    ssh -i ./autobots-shared-ssh-key -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com
 *
 * 2. Environment variables set in .env:
 *    OPENSEARCH_HOST=https://localhost:9201
 *    OPENSEARCH_USERNAME=hackathon
 *    OPENSEARCH_PASSWORD=01$sCyKeS!ZnTlh*Mf
 *
 * Usage: npx tsx ./src/scripts/test-aws-opensearch.ts
 */
import 'dotenv/config';
import { Client } from '@opensearch-project/opensearch';

const INDEX_NAME = 'products_test_aws';

async function testAwsOpenSearch() {
  const host = process.env.OPENSEARCH_HOST || 'https://localhost:9201';
  const username = process.env.OPENSEARCH_USERNAME;
  const password = process.env.OPENSEARCH_PASSWORD;

  console.log('========================================');
  console.log('Testing AWS OpenSearch via SSH Tunnel');
  console.log('========================================');
  console.log(`Host: ${host}`);
  console.log(`Username: ${username}`);
  console.log(`Password: ${password ? '****' : '(not set)'}`);
  console.log('');

  // Check if tunnel is likely running
  if (host.includes('localhost:9201')) {
    console.log('⚠️  Make sure SSH tunnel is running on port 9201');
    console.log(
      '   Command: ssh -i ./autobots-shared-ssh-key -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com',
    );
    console.log('');
  }

  const client = new Client({
    node: host,
    auth: username && password ? { username, password } : undefined,
    ssl: {
      rejectUnauthorized: false, // Required for SSH tunnel
    },
  });

  try {
    // 1. Test connection
    console.log('1. Testing connection...');
    const health = await client.cluster.health();
    console.log(`   ✅ Connected!`);
    console.log(`   Cluster: ${health.body.cluster_name}`);
    console.log(`   Status: ${health.body.status}`);
    console.log(`   Nodes: ${health.body.number_of_nodes}`);

    // 2. List existing indices
    console.log('\n2. Listing existing indices...');
    const indices = await client.cat.indices({ format: 'json' });
    if (indices.body && indices.body.length > 0) {
      console.log('   Existing indices:');
      indices.body.forEach((idx: any) => {
        console.log(`   - ${idx.index} (${idx['docs.count']} docs)`);
      });
    } else {
      console.log('   No indices found');
    }

    // 3. Create test index with k-NN
    console.log('\n3. Creating test index with k-NN mapping...');
    const indexExists = await client.indices.exists({ index: INDEX_NAME });
    if (indexExists.body) {
      await client.indices.delete({ index: INDEX_NAME });
      console.log(`   Deleted existing test index`);
    }

    await client.indices.create({
      index: INDEX_NAME,
      body: {
        settings: {
          'index.knn': true,
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            title: { type: 'text' },
            text_embedding: {
              type: 'knn_vector',
              dimension: 1024,
              method: {
                name: 'hnsw',
                space_type: 'cosinesimil',
                engine: 'faiss',
              },
            },
          },
        },
      },
    });
    console.log(`   ✅ Created index: ${INDEX_NAME}`);

    // 4. Index test document
    console.log('\n4. Indexing test document...');
    const fakeEmbedding = Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
    await client.index({
      index: INDEX_NAME,
      id: 'test_1',
      body: {
        id: 'test_1',
        title: 'Test Product from Local',
        text_embedding: fakeEmbedding,
      },
      refresh: true,
    });
    console.log(`   ✅ Indexed test document`);

    // 5. Test k-NN search
    console.log('\n5. Testing k-NN search...');
    const queryEmbedding = Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
    const searchResult = await client.search({
      index: INDEX_NAME,
      body: {
        size: 1,
        query: {
          knn: {
            text_embedding: {
              vector: queryEmbedding,
              k: 1,
            },
          },
        },
      },
    });
    console.log(`   ✅ k-NN search returned ${searchResult.body.hits.hits.length} result(s)`);
    if (searchResult.body.hits.hits.length > 0) {
      console.log(`   Title: ${searchResult.body.hits.hits[0]._source.title}`);
      console.log(`   Score: ${searchResult.body.hits.hits[0]._score}`);
    }

    // 6. Cleanup
    console.log('\n6. Cleaning up...');
    await client.indices.delete({ index: INDEX_NAME });
    console.log(`   ✅ Deleted test index`);

    console.log('\n========================================');
    console.log('✅ AWS OpenSearch Test PASSED!');
    console.log('========================================');
    console.log('\nYour local environment can successfully:');
    console.log('- Connect to AWS OpenSearch via SSH tunnel');
    console.log('- Create indices with k-NN mapping');
    console.log('- Index documents with embeddings');
    console.log('- Perform k-NN vector search');

    return true;
  } catch (error: any) {
    console.log(`\n❌ Test FAILED: ${error.message}`);

    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 SSH tunnel is not running. Start it with:');
      console.log(
        '   ssh -i ./autobots-shared-ssh-key -L 9201:vpc-hackathon-autobots-apse1-fbn25iam65pez2wksf4jhojbne.ap-southeast-1.es.amazonaws.com:443 -N autobots@jumphost-sg.castlery.com',
      );
    } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.log('\n💡 Authentication failed. Check username/password in .env');
    } else if (error.message.includes('SSL') || error.message.includes('EPROTO')) {
      console.log('\n💡 SSL error. Make sure tunnel maps to port 443 (HTTPS)');
    }

    return false;
  }
}

testAwsOpenSearch();
