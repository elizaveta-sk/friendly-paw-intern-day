// @ts-check
/** @param {number} value @param {number} [min] @param {number} [max] */
export const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value));
/** @param {import('../types/game.js').Values} values */
export const getHighestValue = (values) => Object.entries(values).sort((a,b) => b[1] - a[1])[0][0];
/** @param {import('../types/game.js').Values} values */
export const getLowestValue = (values) => Object.entries(values).sort((a,b) => a[1] - b[1])[0][0];
