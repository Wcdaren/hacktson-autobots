/**
 * Search Utilities
 *
 * This module provides utilities for integrating with OpenSearch
 * via Elastic Search UI connectors.
 *
 * @module libs/util/search
 */

export {
  createSearchConnector,
  createSearchConnectorWithConfig,
  type SearchConnectorConfig,
} from './connector';

export {
  createHybridSearchConnector,
  type HybridSearchConnectorConfig,
} from './hybridSearchConnector';

export {
  createCategorySearchConnector,
  type CategorySearchConnectorConfig,
} from './categorySearchConnector';

export {
  createCollectionSearchConnector,
  type CollectionSearchConnectorConfig,
} from './collectionSearchConnector';

export {
  createMultimodalSearchConnector,
  type MultimodalSearchConnectorConfig,
} from './multimodalSearchConnector';
