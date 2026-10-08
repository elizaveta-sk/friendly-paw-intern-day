// @ts-check
import { scriptedRespond } from './scriptedBrain.js';
/** @type {import('./brain.js').AgentBrain} */
const scriptedBrain = { respond: scriptedRespond };
/** @param {import('../types/game.js').AgentId} _agentId @returns {import('./brain.js').AgentBrain} */
export const getBrain = (_agentId) => scriptedBrain;
