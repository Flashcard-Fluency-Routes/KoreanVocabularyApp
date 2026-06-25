/**
 * Application Bootstrap
 *
 * Startup orchestrator imported by both index.html and flashcards.html.
 * Guarantees the IndexedDB database is ready (created + seeded) before
 * any service or repository call is made.
 *
 * Usage:
 *   import { bootstrap } from './init/app_bootstrap.js';
 *   await bootstrap();
 *   // DB is ready — safe to call services
 */

import { initDatabase, seedFlashcardsIfEmpty } from '../db/db_init.js';

/**
 * Initialises the database and seeds flashcard data if this is the first run.
 * Subsequent calls are fast — openDB() returns a cached connection and
 * seedFlashcardsIfEmpty() exits immediately when data already exists.
 * @returns {Promise<void>}
 */
export async function bootstrap() {
    await initDatabase();
    await seedFlashcardsIfEmpty();
}
