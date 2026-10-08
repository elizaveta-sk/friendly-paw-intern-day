// @ts-check
const negative = new Set(['stressed','annoyed','worried','distracted']);
/** @param {import('../types/game.js').Mood} mood @param {number} opinion */
export const moodFromOpinion = (mood, opinion) => opinion > 20 ? 'cheerful' : opinion < -20 ? 'annoyed' : mood;
/** @param {import('../types/game.js').Mood} mood @param {import('../types/game.js').Mood} starting */
export const settleMood = (mood, starting) => mood === starting ? mood : negative.has(mood) === negative.has(starting) ? starting : starting;
