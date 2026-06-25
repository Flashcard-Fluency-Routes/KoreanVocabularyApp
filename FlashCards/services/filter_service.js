/**
 * Filter Service
 *
 * Persists and retrieves the active filter selections made on the
 * index.html filter page. Filters are stored in the user_state object
 * store under the key 'active_filters'.
 *
 * When no filters have been saved, getFilters() returns an empty-arrays
 * default object — this causes flashcard_service to return all cards.
 */

import { getState, setState } from '../repositories/state_repository.js';

const FILTERS_KEY = 'active_filters';
const ROUTE_MODE_KEY = 'route_mode';
const WORD_GAME_KEY = 'word_game';

const DEFAULT_ROUTE_MODE = Object.freeze({
    active: false,
    routeName: '',
    nextWordID: null,   // WordID of first card in next batch (null = start from beginning)
    completedMetros: [],
});

const DEFAULT_WORD_GAME = Object.freeze({
    active: false,
    selectedMetro: '',
    correctCount: 0,
    incorrectCount: 0,
    sessionCardsSeen: 0,
    sessionMetroVisits: 0,
    helpCount: 0,
});

const EMPTY_FILTERS = Object.freeze({
    WordCategory: [],
    WordListName: [],
    RouteName: [],
    RouteNameSeq: [],
    Neighborhood: [],
    PlaceOfInterestNameEng: [],
    POICategory: [],
    NearestMetro: [],
    NearestMetroCode: [],
});

/**
 * Persists the active filter selections to IndexedDB.
 * @param {Object} filters — e.g. { WordCategory: ['Food'], RouteName: [] }
 * @returns {Promise<void>}
 */
export async function saveFilters(filters) {
    await setState(FILTERS_KEY, filters);
}

/**
 * Loads the previously saved filter selections from IndexedDB.
 * Returns an empty-arrays object if no filters have been saved yet.
 * @returns {Promise<Object>}
 */
export async function getFilters() {
    const stored = await getState(FILTERS_KEY);
    return stored ?? { ...EMPTY_FILTERS };
}

// ─── Route Mode ───────────────────────────────────────────────────────────────

/**
 * Persists the "Follow a Route" state to IndexedDB.
 * @param {Object} state — { active, routeName, nextWordID, completedMetros }
 * @returns {Promise<void>}
 */
export async function saveRouteMode(state) {
    await setState(ROUTE_MODE_KEY, state);
}

/**
 * Loads the saved route mode state from IndexedDB.
 * Returns an inactive default if nothing has been saved.
 * @returns {Promise<Object>}
 */
export async function getRouteMode() {
    const stored = await getState(ROUTE_MODE_KEY);
    return stored ?? { ...DEFAULT_ROUTE_MODE };
}

/**
 * Resets route mode to inactive defaults.
 * @returns {Promise<void>}
 */
export async function clearRouteMode() {
    await setState(ROUTE_MODE_KEY, { ...DEFAULT_ROUTE_MODE });
}

// ─── Word Game ───────────────────────────────────────────────────────────────

/**
 * Persists the Word Game state to IndexedDB.
 * @param {Object} state — { active, selectedMetro, correctCount, incorrectCount }
 * @returns {Promise<void>}
 */
export async function saveWordGame(state) {
    await setState(WORD_GAME_KEY, state);
}

/**
 * Loads the saved Word Game state from IndexedDB.
 * Returns an inactive default if nothing has been saved.
 * @returns {Promise<Object>}
 */
export async function getWordGame() {
    const stored = await getState(WORD_GAME_KEY);
    return stored ?? { ...DEFAULT_WORD_GAME };
}

/**
 * Resets Word Game state to inactive defaults.
 * @returns {Promise<void>}
 */
export async function clearWordGame() {
    await setState(WORD_GAME_KEY, { ...DEFAULT_WORD_GAME });
}
