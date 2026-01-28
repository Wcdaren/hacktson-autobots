/**
 * Embedding Module
 * Provides text and image embedding generation for semantic search
 */

import { Module } from '@medusajs/framework/utils';
import EmbeddingService from './service';

export const EMBEDDING_MODULE = 'embedding';

export default Module(EMBEDDING_MODULE, {
  service: EmbeddingService,
});

export { EmbeddingService };
export * from './types';
