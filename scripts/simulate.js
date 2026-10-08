import { createInitialState, advance, getReview } from '../src/engine/game.js';
let state = createInitialState('Sam');
while (state.phase === 'playing') { console.log(`[${state.clock}] ${state.currentStepId}`); state = advance(state, state.availableChoices[0]?.id || ''); }
console.log(getReview(state));
