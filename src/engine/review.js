// @ts-check
import { agents } from '../data/agents.js';
import { getHighestValue, getLowestValue } from './values.js';
/** @param {import('../types/game.js').GameState} state */
export function buildReview(state) {
  const high = getHighestValue(state.values); const low = getLowestValue(state.values);
  return {
    accomplishments: [`FP-142 ${state.task.status}`, `${state.task.discoveredAmbiguities.length}/4 ambiguities clarified`, `${state.reportsSent.length} reports sent`, `${state.triggeredEvents.length} events handled`],
    perceptions: agents.map((agent) => ({agentId:agent.id,name:agent.name,text: state.agentMemory[agent.id].opinion > 5 ? 'felt you made their day easier' : state.agentMemory[agent.id].opinion < -5 ? 'wanted clearer follow-through' : 'saw a thoughtful intern finding their rhythm'})),
    values: state.values,
    mentorFeedback: `Rafa praises your ${high.toLowerCase()}; next, build your ${low.toLowerCase()} with one deliberate habit tomorrow.`
  };
}
