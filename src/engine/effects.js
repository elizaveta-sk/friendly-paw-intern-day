// @ts-check
import { clamp } from './values.js';
import { agentById } from '../data/agents.js';
import { moodFromOpinion } from './mood.js';
/** @param {import('../types/game.js').GameState} state @param {import('../types/game.js').Effect[]} effects */
export function applyEffects(state, effects) {
  const next = structuredClone(state);
  for (const effect of effects) {
    if (effect.type === 'value' && effect.target) next.values[/** @type {import('../types/game.js').ValueName} */(effect.target)] = clamp(next.values[/** @type {import('../types/game.js').ValueName} */(effect.target)] + (effect.amount || 0));
    if (effect.type === 'opinion' && effect.target) {
      const id = /** @type {import('../types/game.js').AgentId} */(effect.target);
      next.agentMemory[id].opinion = clamp(next.agentMemory[id].opinion + (effect.amount || 0), -100, 100);
      next.agentMoods[id] = moodFromOpinion(next.agentMoods[id], next.agentMemory[id].opinion);
    }
    if (effect.type === 'flag' && effect.target) Object.values(next.agentMemory).forEach((memory) => { memory.flags[effect.target] = true; });
    if (effect.type === 'mood' && effect.target && effect.value) next.agentMoods[/** @type {import('../types/game.js').AgentId} */(effect.target)] = /** @type {import('../types/game.js').Mood} */(effect.value);
    if (effect.type === 'progress') next.task.progress = clamp(next.task.progress + (effect.amount || 0));
    if (effect.type === 'ambiguity' && effect.target && !next.task.discoveredAmbiguities.includes(effect.target)) next.task.discoveredAmbiguities.push(effect.target);
    if (effect.type === 'report' && effect.target) next.reportsSent.push(effect.target);
  }
  for (const agent of Object.values(agentById)) next.agentMoods[agent.id] = moodFromOpinion(next.agentMoods[agent.id], next.agentMemory[agent.id].opinion);
  return next;
}
