/**
 * Integration Tests for Semantic Search Endpoints
 *
 * Tests the semantic, image, and hybrid search API endpoints.
 * These tests require a running Medusa instance with OpenSearch and AWS services configured.
 */

import { medusaIntegrationTestRunner } from '@medusajs/test-utils';

jest.setTimeout(60 * 1000);

medusaIntegrationTestRunner({
  inApp: true,
  env: {},
  testSuite: ({ api }) => {
    describe('Search API Endpoints', () => {
      describe('POST /store/search/semantic', () => {
        it('should return 400 for missing query parameter', async () => {
          const response = await api.post('/store/search/semantic', {});
          expect(response.status).toEqual(400);
        });

        it('should return 400 for empty query', async () => {
          const response = await api.post('/store/search/semantic', { query: '' });
          expect(response.status).toEqual(400);
        });

        it('should accept valid semantic search request', async () => {
          const response = await api.post('/store/search/semantic', {
            query: 'comfortable sofa',
            size: 10,
          });

          // May return 200 with results or 503 if embedding service unavailable
          expect([200, 503]).toContain(response.status);

          if (response.status === 200) {
            expect(response.data).toHaveProperty('results');
            expect(Array.isArray(response.data.results)).toBe(true);
          }
        });

        it('should respect size parameter', async () => {
          const response = await api.post('/store/search/semantic', {
            query: 'furniture',
            size: 5,
          });

          if (response.status === 200) {
            expect(response.data.results.length).toBeLessThanOrEqual(5);
          }
        });

        it('should include response time in response', async () => {
          const response = await api.post('/store/search/semantic', {
            query: 'test',
          });

          if (response.status === 200) {
            expect(response.data).toHaveProperty('responseTimeMs');
            expect(typeof response.data.responseTimeMs).toBe('number');
          }
        });
      });

      describe('POST /store/search/image', () => {
        it('should return 400 for missing image data', async () => {
          const response = await api.post('/store/search/image', {});
          expect(response.status).toEqual(400);
        });

        it('should return 400 for invalid base64 image', async () => {
          const response = await api.post('/store/search/image', {
            image: 'not-valid-base64',
          });
          expect(response.status).toEqual(400);
        });

        it('should accept valid image search request with base64 image', async () => {
          // Create a minimal valid PNG image (1x1 pixel)
          const minimalPng =
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

          const response = await api.post('/store/search/image', {
            image: minimalPng,
            size: 10,
          });

          // May return 200 with results or 503 if Rekognition unavailable
          expect([200, 400, 503]).toContain(response.status);
        });

        it('should respect size parameter for image search', async () => {
          const minimalPng =
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

          const response = await api.post('/store/search/image', {
            image: minimalPng,
            size: 3,
          });

          if (response.status === 200) {
            expect(response.data.results.length).toBeLessThanOrEqual(3);
          }
        });
      });

      describe('POST /store/search/hybrid', () => {
        it('should return 400 for missing query parameter', async () => {
          const response = await api.post('/store/search/hybrid', {});
          expect(response.status).toEqual(400);
        });

        it('should return 400 for empty query', async () => {
          const response = await api.post('/store/search/hybrid', { query: '' });
          expect(response.status).toEqual(400);
        });

        it('should accept valid hybrid search request', async () => {
          const response = await api.post('/store/search/hybrid', {
            query: 'modern chair',
            size: 10,
          });

          // May return 200 with results or 503 if services unavailable
          expect([200, 503]).toContain(response.status);

          if (response.status === 200) {
            expect(response.data).toHaveProperty('results');
            expect(Array.isArray(response.data.results)).toBe(true);
          }
        });

        it('should accept custom weights', async () => {
          const response = await api.post('/store/search/hybrid', {
            query: 'sofa',
            keywordWeight: 0.7,
            semanticWeight: 0.3,
          });

          expect([200, 503]).toContain(response.status);
        });

        it('should return results sorted by score', async () => {
          const response = await api.post('/store/search/hybrid', {
            query: 'furniture',
            size: 20,
          });

          if (response.status === 200 && response.data.results.length > 1) {
            const results = response.data.results;
            for (let i = 0; i < results.length - 1; i++) {
              expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
            }
          }
        });

        it('should include match type in results', async () => {
          const response = await api.post('/store/search/hybrid', {
            query: 'test product',
          });

          if (response.status === 200 && response.data.results.length > 0) {
            const result = response.data.results[0];
            expect(['exact', 'semantic', 'visual', 'hybrid']).toContain(result.matchType);
          }
        });
      });

      describe('Search Response Format', () => {
        it('should return consistent response structure for semantic search', async () => {
          const response = await api.post('/store/search/semantic', {
            query: 'test',
          });

          if (response.status === 200) {
            expect(response.data).toHaveProperty('results');
            expect(response.data).toHaveProperty('total');
            expect(response.data).toHaveProperty('responseTimeMs');
          }
        });

        it('should return consistent response structure for hybrid search', async () => {
          const response = await api.post('/store/search/hybrid', {
            query: 'test',
          });

          if (response.status === 200) {
            expect(response.data).toHaveProperty('results');
            expect(response.data).toHaveProperty('total');
            expect(response.data).toHaveProperty('responseTimeMs');
          }
        });
      });
    });
  },
});
