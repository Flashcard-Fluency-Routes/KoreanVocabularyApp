/**
 * State Repository
 *
 * Key/value store for user application state (active filters, theme preference,
 * most recent card position, session data, etc.).
 *
 * Records are stored internally as { key: string, value: any }.
 * This wrapping/unwrapping is handled here — callers pass and receive plain values.
 *
 * Example stored record:
 *   { key: 'active_filters', value: { WordCategory: ['Food'], RouteName: [] } }
 */

import { get, put } from '../db/indexeddb_adapter.js';

const STORE = 'user_state';

/**
 * Returns the stored value for the given key, or undefined if not set.
 * @param {string} key
 * @returns {Promise<any|undefined>}
 */
export async function getState(key) {
    const record = await get(STORE, key);
    return record ? record.value : undefined;
}

/**
 * Stores a value under the given key. Overwrites any existing value.
 * @param {string} key
 * @param {any} value
 * @returns {Promise<void>}
 */
export async function setState(key, value) {
    return put(STORE, { key, value });
}
