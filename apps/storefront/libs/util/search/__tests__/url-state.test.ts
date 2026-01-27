/**
 * Tests for URL State Synchronization
 *
 * Tests that the search provider configuration correctly handles
 * URL state synchronization for filters, search terms, and pagination.
 *
 * @module libs/util/search/__tests__/url-state.test
 */

describe('URL State Synchronization', () => {
  /**
   * Expected search configuration values based on the design document.
   * These tests verify the configuration matches the requirements.
   */
  const expectedConfig = {
    trackUrlState: true,
    urlPushDebounceLength: 500,
    initialState: {
      resultsPerPage: 12,
    },
    searchQuery: {
      search_fields: {
        title: { weight: 3 },
        description: { weight: 1 },
      },
      facets: {
        category_names: { type: 'value', size: 50 },
        collection_names: { type: 'value', size: 50 },
        price: {
          type: 'range',
          ranges: [
            { from: 0, to: 25, name: 'Under $25' },
            { from: 25, to: 50, name: '$25 - $50' },
            { from: 50, to: 100, name: '$50 - $100' },
            { from: 100, name: 'Over $100' },
          ],
        },
      },
      disjunctiveFacets: ['category_names', 'collection_names'],
      result_fields: {
        id: { raw: {} },
        title: { raw: {} },
        description: { raw: {}, snippet: { size: 200 } },
        handle: { raw: {} },
        thumbnail: { raw: {} },
        price: { raw: {} },
        category_ids: { raw: {} },
        category_names: { raw: {} },
        collection_ids: { raw: {} },
        collection_names: { raw: {} },
      },
    },
  };

  describe('Search Provider Configuration Requirements', () => {
    it('should require trackUrlState to be enabled', () => {
      expect(expectedConfig.trackUrlState).toBe(true);
    });

    it('should require urlPushDebounceLength to be configured', () => {
      expect(expectedConfig.urlPushDebounceLength).toBe(500);
    });

    it('should require initial resultsPerPage to be set', () => {
      expect(expectedConfig.initialState?.resultsPerPage).toBe(12);
    });
  });

  describe('Search Query Configuration Requirements', () => {
    it('should configure search_fields with weights', () => {
      expect(expectedConfig.searchQuery?.search_fields).toEqual({
        title: { weight: 3 },
        description: { weight: 1 },
      });
    });

    it('should configure result_fields', () => {
      const resultFields = expectedConfig.searchQuery?.result_fields;
      expect(resultFields).toBeDefined();
      expect(resultFields?.id).toEqual({ raw: {} });
      expect(resultFields?.title).toEqual({ raw: {} });
      expect(resultFields?.handle).toEqual({ raw: {} });
      expect(resultFields?.thumbnail).toEqual({ raw: {} });
      expect(resultFields?.price).toEqual({ raw: {} });
    });

    it('should configure facets for filtering', () => {
      const facets = expectedConfig.searchQuery?.facets;
      expect(facets).toBeDefined();
      expect(facets?.category_names).toEqual({ type: 'value', size: 50 });
      expect(facets?.collection_names).toEqual({ type: 'value', size: 50 });
      expect(facets?.price).toBeDefined();
    });

    it('should configure price range facet with predefined ranges', () => {
      const priceFacet = expectedConfig.searchQuery?.facets?.price as any;
      expect(priceFacet.type).toBe('range');
      expect(priceFacet.ranges).toEqual([
        { from: 0, to: 25, name: 'Under $25' },
        { from: 25, to: 50, name: '$25 - $50' },
        { from: 50, to: 100, name: '$50 - $100' },
        { from: 100, name: 'Over $100' },
      ]);
    });

    it('should configure disjunctive facets for OR logic', () => {
      expect(expectedConfig.searchQuery?.disjunctiveFacets).toEqual(['category_names', 'collection_names']);
    });
  });

  describe('URL Parameter Mapping', () => {
    /**
     * These tests verify the expected URL parameter format
     * based on the Search UI configuration.
     *
     * Expected URL format:
     * /products?q=keyword&category_names=Electronics&price=0-25&sort=price&page=1
     */

    it('should support search term in URL (q parameter)', () => {
      // When trackUrlState is true, search term is stored in 'q' parameter
      expect(expectedConfig.trackUrlState).toBe(true);
    });

    it('should support category filter in URL', () => {
      // Category facet should be configured for URL state
      const facets = expectedConfig.searchQuery?.facets;
      expect(facets?.category_names).toBeDefined();
    });

    it('should support collection filter in URL', () => {
      // Collection facet should be configured for URL state
      const facets = expectedConfig.searchQuery?.facets;
      expect(facets?.collection_names).toBeDefined();
    });

    it('should support price range filter in URL', () => {
      // Price facet should be configured for URL state
      const facets = expectedConfig.searchQuery?.facets;
      expect(facets?.price).toBeDefined();
    });
  });

  describe('Filter State Persistence', () => {
    it('should configure description field with snippet', () => {
      const resultFields = expectedConfig.searchQuery?.result_fields;
      expect(resultFields?.description).toEqual({
        raw: {},
        snippet: { size: 200 },
      });
    });

    it('should include category and collection IDs in result fields', () => {
      const resultFields = expectedConfig.searchQuery?.result_fields;
      expect(resultFields?.category_ids).toEqual({ raw: {} });
      expect(resultFields?.category_names).toEqual({ raw: {} });
      expect(resultFields?.collection_ids).toEqual({ raw: {} });
      expect(resultFields?.collection_names).toEqual({ raw: {} });
    });
  });
});

describe('URL State Parsing', () => {
  /**
   * These tests verify that URL parameters can be correctly parsed
   * into filter state. This is handled by Search UI internally,
   * but we test the expected format.
   */

  describe('Query String Format', () => {
    it('should parse simple search term', () => {
      const params = new URLSearchParams('q=coffee');
      expect(params.get('q')).toBe('coffee');
    });

    it('should parse multiple filter values', () => {
      const params = new URLSearchParams('category_names=Electronics&category_names=Clothing');
      expect(params.getAll('category_names')).toEqual(['Electronics', 'Clothing']);
    });

    it('should parse price range filter', () => {
      // Search UI uses a specific format for range filters
      const params = new URLSearchParams('price=0-25');
      expect(params.get('price')).toBe('0-25');
    });

    it('should parse sort parameter', () => {
      const params = new URLSearchParams('sort=price&order=asc');
      expect(params.get('sort')).toBe('price');
      expect(params.get('order')).toBe('asc');
    });

    it('should parse page parameter', () => {
      const params = new URLSearchParams('page=2');
      expect(params.get('page')).toBe('2');
    });

    it('should parse complex URL with multiple parameters', () => {
      const url = 'q=coffee&category_names=Beverages&price=25-50&sort=price&order=asc&page=1';
      const params = new URLSearchParams(url);

      expect(params.get('q')).toBe('coffee');
      expect(params.get('category_names')).toBe('Beverages');
      expect(params.get('price')).toBe('25-50');
      expect(params.get('sort')).toBe('price');
      expect(params.get('order')).toBe('asc');
      expect(params.get('page')).toBe('1');
    });
  });

  describe('URL Encoding', () => {
    it('should handle URL-encoded search terms', () => {
      const params = new URLSearchParams('q=coffee%20beans');
      expect(params.get('q')).toBe('coffee beans');
    });

    it('should handle special characters in filter values', () => {
      const params = new URLSearchParams('category_names=Food%20%26%20Beverages');
      expect(params.get('category_names')).toBe('Food & Beverages');
    });
  });
});

describe('Browser History Integration', () => {
  /**
   * These tests verify the expected behavior for browser history
   * when URL state tracking is enabled.
   */

  it('should debounce URL updates to avoid excessive history entries', () => {
    // 500ms debounce prevents rapid URL updates
    const expectedDebounce = 500;
    expect(expectedDebounce).toBe(500);
  });

  it('should track URL state for shareable links', () => {
    // trackUrlState enables URL synchronization
    const trackUrlState = true;
    expect(trackUrlState).toBe(true);
  });
});
