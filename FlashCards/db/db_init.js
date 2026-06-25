/**
 * Database Initialisation
 *
 * Responsible for:
 * 1. Opening the database connection (initDatabase)
 * 2. One-time seeding of the flashcards store from /brand/flashcards.json (seedFlashcardsIfEmpty)
 *
 * The seed runs exactly once — if the flashcards store already contains data it is skipped.
 * WordID is already present as an integer in flashcards.json and is used as the primary key.
 */

import { openDB, getAll, bulkPut, clear } from './indexeddb_adapter.js';
import { BRAND_BASE } from '../../brand_loader.js';

/**
 * Opens the database connection and ensures object stores exist.
 * Must be called before any repository or service operation.
 * @returns {Promise<void>}
 */
export async function initDatabase() {
    await openDB();
}

/**
 * Seeds the flashcards object store from /brand/flashcards.json if it is empty.
 * flashcards.json is an array of records; each record already contains WordID as the primary key.
 * Uses a single bulk transaction for performance (~1000 records in one write cycle).
 * @returns {Promise<void>}
 */
export async function seedFlashcardsIfEmpty() {
    const existing = await getAll('flashcards');

    if (existing.length > 0) {
        return; // Already seeded — do nothing
    }

    const response = await fetch(BRAND_BASE + 'flashcards.json');
    if (!response.ok) {
        throw new Error(`Failed to fetch flashcards seed data: ${response.status} ${response.statusText}`);
    }

    const records = await response.json();

    await bulkPut('flashcards', records);
    console.log(`[db_init] Seeded ${records.length} flashcard records into IndexedDB.`);
}

/**
 * Clears the flashcards store and re-seeds it from /brand/flashcards.json.
 * Use this to pick up changes to the source data file after initial seeding.
 * @returns {Promise<number>} Number of records imported
 */
export async function reImportFlashcards() {
    const response = await fetch(BRAND_BASE + 'flashcards.json');
    if (!response.ok) {
        throw new Error(`Failed to fetch flashcards data: ${response.status} ${response.statusText}`);
    }

    const records = await response.json();

    await clear('flashcards');
    await bulkPut('flashcards', records);
    console.log(`[db_init] Re-imported ${records.length} flashcard records into IndexedDB.`);
    return records.length;
}
