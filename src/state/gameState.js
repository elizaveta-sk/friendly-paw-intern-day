// @ts-check
import { advance, createInitialState } from '../engine/game.js';
/** @param {import('../types/game.js').GameState} state @param {{type:string,playerName?:string,choiceId?:string}} action */
export function gameReducer(state, action) {
  if (action.type === 'START_GAME') return createInitialState((action.playerName || '').trim());
  if (action.type === 'CHOOSE') return advance(state, action.choiceId || '');
  if (action.type === 'RESTART') return createInitialState('');
  if (action.type === 'TOGGLE_MUTE') return {...state, muted:!state.muted};
  return state;
}
export const selectors = { visibleThreads:(state) => state.threads.all, availableChoices:(state) => state.availableChoices, clockLabel:(state) => state.clock, taskProgress:(state) => state.task.progress, values:(state) => state.values, moods:(state) => state.agentMoods };
