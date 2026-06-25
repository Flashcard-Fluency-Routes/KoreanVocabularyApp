/**
 * IndexedDB Adapter
 *
 * The single module responsible for all raw IndexedDB interactions.
 * No other module in this application may call indexedDB.open, db.transaction,
 * or objectStore directly. All persistence flows through this adapter.
 *
 * Database: flashcard_app_db (v1)
 * Object stores:
 *   flashcards   — keyPath: 'WordID'  (integer)
 *   user_progress — keyPath: 'WordID' (integer)
 *   user_state   — keyPath: 'key'     (string key/value store)
 */

const DB_NAME = 'flashcard_app_db';
const DB_VERSION = 1;

let db = null; // module-level connection cache — not application state

/**
 * Opens (or returns cached) the IndexedDB connection.
 * Creates object stores on first run via onupgradeneeded.
 * @returns {Promise<IDBDatabase>}
 */
export function openDB() {
    if (db) return Promise.resolve(db);

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const database = event.target.result;

            if (!database.objectStoreNames.contains('flashcards')) {
                database.createObjectStore('flashcards', { keyPath: 'WordID' });
            }

            if (!database.objectStoreNames.contains('user_progress')) {
                database.createObjectStore('user_progress', { keyPath: 'WordID' });
            }

            if (!database.objectStoreNames.contains('user_state')) {
                database.createObjectStore('user_state', { keyPath: 'key' });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(new Error(`IndexedDB open failed: ${event.target.error}`));
        };
    });
}

/**
 * Retrieves all records from an object store.
 * @param {string} storeName
 * @returns {Promise<Array>}
 */
export async function getAll(storeName) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error(`getAll failed on ${storeName}: ${request.error}`));
    });
}

/**
 * Retrieves a single record by primary key.
 * Returns undefined if the record does not exist.
 * @param {string} storeName
 * @param {number|string} key
 * @returns {Promise<Object|undefined>}
 */
export async function get(storeName, key) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([storeName], 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error(`get failed on ${storeName}[${key}]: ${request.error}`));
    });
}

/**
 * Inserts or updates a record (upsert). The record must contain the keyPath field.
 * @param {string} storeName
 * @param {Object} record
 * @returns {Promise<void>}
 */
export async function put(storeName, record) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(record);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`put failed on ${storeName}: ${request.error}`));
    });
}

/**
 * Clears all records from an object store.
 * @param {string} storeName
 * @returns {Promise<void>}
 */
export async function clear(storeName) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = database.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`clear failed on ${storeName}: ${request.error}`));
    });
}

/**
 * Bulk-inserts an array of records using a single transaction.
 * Significantly faster than calling put() individually for large datasets.
 * @param {string} storeName
 * @param {Array<Object>} records
 * @returns {Promise<void>}
 */
export function bulkPut(storeName, records) {
    return openDB().then((database) => {
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);

            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(new Error(`bulkPut transaction failed on ${storeName}: ${transaction.error}`));
            transaction.onabort = () => reject(new Error(`bulkPut transaction aborted on ${storeName}`));

            for (const record of records) {
                store.put(record);
            }
        });
    });
}
