/**
 * Flashcard Repository
 *
 * Data access object for the 'flashcards' IndexedDB object store.
 * Provides a stable interface so the rest of the application is decoupled
 * from store names and raw adapter calls.
 *
 * UI code and services must never call the IndexedDB adapter directly —
 * all flashcard data access goes through this repository.
 */

import { getAll, get } from '../db/indexeddb_adapter.js';

const STORE = 'flashcards';

/**
 * Returns all flashcard records from the store.
 * Each record includes an integer WordID field injected at seed time.
 * @returns {Promise<Array<Object>>}
 */
export async function getAllFlashcards() {
    return getAll(STORE);
}

/**
 * Returns a single flashcard record by its integer WordID.
 * Returns undefined if no matching record exists.
 * @param {number} id — integer WordID
 * @returns {Promise<Object|undefined>}
 */
export async function getFlashcardById(id) {
    return get(STORE, id);
}
