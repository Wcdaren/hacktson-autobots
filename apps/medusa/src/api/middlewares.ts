/**
 * API Middlewares Configuration
 *
 * Central configuration file for all API route middlewares.
 * Middlewares are used for request validation, authentication, and other
 * pre-processing tasks before route handlers are executed.
 */

import { defineMiddlewares } from '@medusajs/framework/http';
import { multimodalSearchMiddlewares } from './store/search/multimodal/middlewares';

export default defineMiddlewares({
  routes: [
    // Multimodal search middlewares
    ...multimodalSearchMiddlewares,
  ],
});
