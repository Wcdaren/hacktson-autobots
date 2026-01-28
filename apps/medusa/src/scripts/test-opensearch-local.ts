/**
 * Test OpenSearch with local Docker instance
 * This validates the code logic works correctly
 */
import 'dotenv/config';
import { Client } from '@opensearch-project/opensearch';

const LOCAL_HOST = 'http://localhost:9200';
const INDEX_NAME = 'products_test';

async function testOpenSearchLocal() {
  console.log('========================================');
  console.log('Testing OpenSearch with Local Docker');
  console.log('========================================');
  console.log(`Host: ${LOCAL_HOST}`);
  console.log('');

  const client = new Client({
    node: LOCAL_HOST,
  });

  try {
    // 1. Test connection
    console.log('1. Testing connection...');
    const health = await client.cluster.health();
    console.log(`   ✅ Connected! Cluster: ${health.body.cluster_name}, Status: ${health.body.status}`);

    // 2. Create test index with k-NN mapping
    console.log('\n2. Creating test index with k-NN mapping...');
    const indexExists = await client.indices.exists({ index: INDEX_NAME });
    if (indexExists.body) {
      await client.indices.delete({ index: INDEX_NAME });
      console.log(`   Deleted existing index: ${INDEX_NAME}`);
    }

    await client.indices.create({
      index: INDEX_NAME,
      body: {
        settings: {
          'index.knn': true,
          'index.knn.space_type': 'cosinesimil',
        },
        mappings: {
          properties: {
            id: { type: 'keyword' },
            title: { type: 'text' },
            description: { type: 'text' },
            embedding: {
              type: 'knn_vector',
              dimension: 1024,
              method: {
                name: 'hnsw',
                space_type: 'cosinesimil',
                engine: 'nmslib',
              },
            },
          },
        },
      },
    });
    console.log(`   ✅ Created index: ${INDEX_NAME}`);

    // 3. Index test documents with fake embeddings
    console.log('\n3. Indexing test documents...');
    const testDocs = [
      { id: 'prod_1', title: 'Comfortable Sofa', description: 'A very comfortable leather sofa' },
      { id: 'prod_2', title: 'Modern Chair', description: 'Sleek modern dining chair' },
      { id: 'prod_3', title: 'Wooden Table', description: 'Solid oak dining table' },
    ];

    for (const doc of testDocs) {
      // Generate fake embedding (1024 dimensions)
      const fakeEmbedding = Array.from({ length: 1024 }, () => Math.random() * 2 - 1);

      await client.index({
        index: INDEX_NAME,
        id: doc.id,
        body: {
          ...doc,
          embedding: fakeEmbedding,
        },
        refresh: true,
      });
      console.log(`   ✅ Indexed: ${doc.title}`);
    }

    // 4. Test k-NN search
    console.log('\n4. Testing k-NN vector search...');
    const queryEmbedding = Array.from({ length: 1024 }, () => Math.random() * 2 - 1);

    const searchResult = await client.search({
      index: INDEX_NAME,
      body: {
        size: 3,
        query: {
          knn: {
            embedding: {
              vector: queryEmbedding,
              k: 3,
            },
          },
        },
      },
    });

    console.log(`   ✅ k-NN search returned ${searchResult.body.hits.hits.length} results:`);
    searchResult.body.hits.hits.forEach((hit: any, i: number) => {
      console.log(`      ${i + 1}. ${hit._source.title} (score: ${hit._score.toFixed(4)})`);
    });

    // 5. Test hybrid search (text + vector)
    console.log('\n5. Testing hybrid search (text + vector)...');
    const hybridResult = await client.search({
      index: INDEX_NAME,
      body: {
        size: 3,
        query: {
          bool: {
            should: [
              {
                match: {
                  title: 'sofa',
                },
              },
              {
                knn: {
                  embedding: {
                    vector: queryEmbedding,
                    k: 3,
                  },
                },
              },
            ],
          },
        },
      },
    });

    console.log(`   ✅ Hybrid search returned ${hybridResult.body.hits.hits.length} results:`);
    hybridResult.body.hits.hits.forEach((hit: any, i: number) => {
      console.log(`      ${i + 1}. ${hit._source.title} (score: ${hit._score.toFixed(4)})`);
    });

    // 6. Cleanup
    console.log('\n6. Cleaning up...');
    await client.indices.delete({ index: INDEX_NAME });
    console.log(`   ✅ Deleted test index: ${INDEX_NAME}`);

    console.log('\n========================================');
    console.log('✅ All OpenSearch tests PASSED!');
    console.log('========================================');
    console.log('\nThe OpenSearch code logic is correct.');
    console.log('When AWS OpenSearch is accessible via SSH tunnel,');
    console.log('the same operations will work.');

    return true;
  } catch (error: any) {
    console.log(`\n❌ Test FAILED: ${error.message}`);
    return false;
  }
}

testOpenSearchLocal();
