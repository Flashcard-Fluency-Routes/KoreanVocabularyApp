/**
 * Progress Repository
 *
 * Data access object for the 'user_progress' IndexedDB object store.
 * Progress records are never pre-populated — they are created only on
 * first user interaction with a card. A missing record means the card
 * is new and has no tracked progress.
 *
 * Callers must handle the undefined case returned by getProgress().
 * The service layer (progress_service.js) normalises this to default values.
 */

import { get, put, getAll } from '../db/indexeddb_adapter.js';

const STORE = 'user_progress';

/**
 * Returns the progress record for a given wordId, or undefined if none exists.
 * @param {number} wordId — integer WordID
 * @returns {Promise<Object|undefined>}
 */
export async function getProgress(wordId) {
    return get(STORE, wordId);
}

/**
 * Inserts or updates a progress record. Ensures WordID is always present
 * as the keyPath field required by IndexedDB.
 * @param {number} wordId — integer WordID
 * @param {Object} data — progress fields to store
 * @returns {Promise<void>}
 */
export async function upsertProgress(wordId, data) {
    return put(STORE, { ...data, WordID: wordId });
}

/**
 * Returns all progress records from the store.
 * @returns {Promise<Object[]>}
 */
export async function getAllProgress() {
    return getAll(STORE);
}
