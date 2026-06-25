/**
 * Progress Service
 *
 * Business logic for user learning progress.
 * Handles the "create on first interaction" pattern — a missing progress
 * record in IndexedDB means the card has never been interacted with
 * and defaults to a clean new state.
 *
 * Records are NEVER pre-populated for all flashcards. The store starts
 * empty and grows only as users interact with cards.
 */

import {
    getProgress as repoGetProgress,
    upsertProgress,
} from '../repositories/progress_repository.js';

const DEFAULT_PROGRESS = Object.freeze({
    WordSeenQty: 0,
    WordCompleted: '0',
    WordCompletedDate: '',
    AudioPlayback: 0,
    MetroVisitsQty: 0,
    NeighborhoodVisitedQty: 0,
    SponsorSeen: 0,
    PersonalNote: '',
    WordGameScore: 0,
    WordGameWordCompleted: '0',
});

/**
 * Returns the progress record for a card, or a default "new card" object
 * if no record exists. Does NOT write the default to the database.
 *
 * @param {number} wordId — integer WordID
 * @returns {Promise<Object>}
 */
export async function getProgress(wordId) {
    const stored = await repoGetProgress(wordId);
    if (stored !== undefined) return stored;
    return { ...DEFAULT_PROGRESS, WordID: wordId };
}

/**
 * Merges updates into the existing progress record (or the default if new)
 * and persists the result. Creates the record on first interaction.
 *
 * @param {number} wordId — integer WordID
 * @param {Object} updates — partial progress fields to apply
 * @returns {Promise<Object>} — the fully merged record after save
 */
export async function updateProgress(wordId, updates) {
    const current = await getProgress(wordId);
    const merged = { ...current, ...updates, WordID: wordId };
    if ('WordCompleted' in updates) {
        merged.WordCompletedDate = updates.WordCompleted === '1'
            ? new Date().toISOString().slice(0, 10)
            : '';
    }
    await upsertProgress(wordId, merged);
    return merged;
}
