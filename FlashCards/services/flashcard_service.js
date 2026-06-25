/**
 * Flashcard Service
 *
 * Application logic for retrieving and filtering flashcards.
 * Filtering is performed in-memory after loading from IndexedDB
 * (acceptable at ~1000 records — no DB indexes required).
 *
 * Filter semantics:
 *   OR within a field  — a card matches if its value for that field
 *                        is ANY of the selected values
 *   AND between fields — a card must satisfy ALL fields that have
 *                        active (non-empty) selections
 *
 * A field is considered inactive (no restriction) when its array
 * is empty [] or contains only the empty-string sentinel [""].
 */

import { getAllFlashcards } from '../repositories/flashcard_repository.js';

const FILTER_FIELDS = [
    'WordCategory',
    'WordListName',
    'RouteName',
    'RouteNameSeq',
    'Neighborhood',
    'PlaceOfInterestNameEng',
    'POICategory',
    'NearestMetro',
    'NearestMetroCode',
];

/**
 * Returns flashcards that match the provided filters.
 * Pass null, undefined, or an empty-arrays object to return all cards.
 *
 * @param {Object|null} filters — e.g. { WordCategory: ['Food'], RouteName: ['Level-1'] }
 * @returns {Promise<Array<Object>>}
 */
export async function getFilteredFlashcards(filters) {
    const allCards = await getAllFlashcards();

    if (!filters) return allCards;

    // Determine which fields have active selections
    const activeFields = FILTER_FIELDS.filter((field) => {
        const values = filters[field];
        if (!values || !Array.isArray(values)) return false;
        // A field is active only when it has at least one non-empty value selected
        return values.some((v) => v !== '' && v !== null && v !== undefined);
    });

    if (activeFields.length === 0) return allCards;

    return allCards.filter((card) => {
        // AND between fields — card must satisfy every active field
        return activeFields.every((field) => {
            const selectedValues = filters[field];
            const cardValue = String(card[field] ?? '');
            // OR within field — card value must match any of the selected values
            return selectedValues.includes(cardValue);
        });
    });
}

// ─── Route Mode ───────────────────────────────────────────────────────────────

/**
 * Returns distinct RouteName values for cards that belong to a named route
 * (any card with a non-empty RouteName is included, regardless of RouteNameSeq).
 * Each entry is `{ name, isCustom }` — `isCustom` is true when the route's
 * cards came from a custom import (WordListName === 'My List'), so the UI can
 * tag them. Used by index.html to populate the route selector.
 * @returns {Promise<Array<{name: string, isCustom: boolean}>>}
 */
export async function getRouteNames() {
    const allCards = await getAllFlashcards();
    const routes = new Map();
    for (const c of allCards) {
        if (c.RouteName && c.RouteName !== '' && !routes.has(c.RouteName)) {
            routes.set(c.RouteName, {
                name: c.RouteName,
                isCustom: c.WordListName === 'My List',
            });
        }
    }
    return [...routes.values()].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns the current batch of route cards (grouped by NearestMetro) plus
 * metadata about the next batch.
 *
 * ALL cards with the given RouteName are included:
 *   - Cards with a numeric RouteNameSeq come first, sorted ascending by that value.
 *   - Cards with an empty/missing RouteNameSeq come after, sorted by WordID.
 *
 * Position is tracked by WordID (not RouteNameSeq) so it works for both
 * sequenced and unsequenced cards.
 *
 * @param {string} routeName
 * @param {number|null} startWordID — WordID of the first card to show (null = beginning)
 * @returns {Promise<{batch: Object[], nextWordID: number|null, nextMetro: string|null,
 *           currentMetro: string|null, isComplete: boolean, totalCards: number}>}
 */
export async function getRouteBatch(routeName, startWordID) {
    const allCards = await getAllFlashcards();

    const routeCards = allCards.filter(c => c.RouteName === routeName);
    if (routeCards.length === 0) {
        return { batch: [], nextWordID: null, nextMetro: null,
                 currentMetro: null, isComplete: true, totalCards: 0 };
    }

    // Sequenced cards first (sorted by RouteNameSeq), then unsequenced (sorted by WordID)
    const sequenced = routeCards
        .filter(c => c.RouteNameSeq !== '' && c.RouteNameSeq != null)
        .sort((a, b) => parseInt(a.RouteNameSeq) - parseInt(b.RouteNameSeq));

    const unsequenced = routeCards
        .filter(c => c.RouteNameSeq === '' || c.RouteNameSeq == null)
        .sort((a, b) => a.WordID - b.WordID);

    const ordered = [...sequenced, ...unsequenced];

    // Find start position by WordID; null means start from the beginning
    let startIdx = 0;
    if (startWordID != null) {
        const found = ordered.findIndex(c => c.WordID === startWordID);
        startIdx = found === -1 ? 0 : found;
    }

    const currentMetro = ordered[startIdx].NearestMetro;

    // Collect consecutive cards that share this NearestMetro
    const batch = [];
    let i = startIdx;
    while (i < ordered.length && ordered[i].NearestMetro === currentMetro) {
        batch.push(ordered[i]);
        i++;
    }

    const isComplete = i >= ordered.length;
    const nextWordID = isComplete ? null : ordered[i].WordID;
    const nextMetro = isComplete ? null : ordered[i].NearestMetro;

    return { batch, nextWordID, nextMetro, currentMetro, isComplete, totalCards: ordered.length };
}

// ─── Word Game ───────────────────────────────────────────────────────────────

/**
 * Returns a map of distinct WordGameName values to their associated
 * WordGameInstruction values. Used by index.html to render the game info section.
 * @returns {Promise<Object<string, string[]>>}
 */
export async function getWordGameNames() {
    const allCards = await getAllFlashcards();
    const games = {};
    for (const c of allCards) {
        if (c.WordGameName && c.WordGameName !== '') {
            if (!games[c.WordGameName]) {
                games[c.WordGameName] = [];
            }
            if (c.WordGameInstruction && c.WordGameInstruction !== ''
                && !games[c.WordGameName].includes(c.WordGameInstruction)) {
                games[c.WordGameName].push(c.WordGameInstruction);
            }
        }
    }
    return games;
}

/**
 * Returns all flashcards at a given metro station.
 * Used by flashcards.html in Word Game mode.
 * @param {string} metroStation — NearestMetro value
 * @returns {Promise<Array<Object>>}
 */
export async function getWordGameCards(metroStation) {
    const allCards = await getAllFlashcards();
    return allCards.filter(c => c.NearestMetro === metroStation);
}

/**
 * Returns all flashcards that have any WordGameName value (across all metros).
 * Used to compute distances to correct words in the game summary card.
 * @returns {Promise<Array<Object>>}
 */
export async function getAllWordGameCards() {
    const allCards = await getAllFlashcards();
    return allCards.filter(c => c.WordGameName && c.WordGameName !== '');
}
