// @ts-check
import { agents, agentById } from '../data/agents.js';
import { events, eventById } from '../data/events.js';
import { timeline } from '../data/timeline.js';
import { fp142 } from '../data/task.js';
import { getBrain } from '../agents/registry.js';
import { applyEffects } from './effects.js';
import { settleMood } from './mood.js';
import { buildReview } from './review.js';

const choice = (id,label,effects) => ({id,label,effects});
/** @param {string} playerName @returns {import('../types/game.js').GameState} */
export function createInitialState(playerName = '') {
  /** @type {Record<import('../types/game.js').AgentId, import('../types/game.js').AgentMemory>} */
  const memory = /** @type {any} */({}); /** @type {Record<import('../types/game.js').AgentId, import('../types/game.js').Mood>} */ const moods = /** @type {any} */({});
  agents.forEach((agent) => { memory[agent.id] = {flags:{},opinion:0,notes:[]}; moods[agent.id] = agent.startingMood; });
  /** @type {import('../types/game.js').GameState} */
  const state = /** @type {any} */ ({clock:'09:00',playerName,currentStepId:'arrival',threads:{all:[]},agentMoods:moods,agentMemory:memory,values:{Responsibility:50,Discipline:50,Consistency:50,Proactivity:50},task:{id:'FP-142',status:'not_started',progress:0,discoveredAmbiguities:[],requirementsVersion:1,description:fp142.description},triggeredEvents:[],reportsSent:[],hrCheckLog:[],phase:playerName ? 'playing' : 'name_entry',muted:false,availableChoices:[]});
  return enterStep(state, 0);
}
/** @param {import('../types/game.js').GameState} state @param {number} index */
function enterStep(state,index) {
  const next = structuredClone(state); const step = timeline[index];
  next.currentStepId = step.id; next.clock = step.time;
  if (step.id === 'end') { next.phase = 'review'; next.availableChoices = []; return next; }
  const messages = []; for (const id of step.agentIds) { const agent = agentById[id]; const reply = /** @type {import('../agents/brain.js').AgentReply} */ (getBrain(id).respond({agent,mood:next.agentMoods[id],memory:next.agentMemory[id],opinion:next.agentMemory[id].opinion,values:next.values,step,lastChoice:undefined,history:next.threads.all})); reply.messages.forEach((text) => messages.push({id:`${step.id}-${id}-${messages.length}`,senderId:id,text,timestamp:step.time,threadId:id})); }
  next.threads.all.push(...messages);
  if (step.eventId) { const event = eventById[step.eventId]; next.triggeredEvents.push(event.id); next.availableChoices = event.choices; }
  else next.availableChoices = choicesFor(step, next);
  return next;
}
/** @param {import('../types/game.js').TimelineStep} step @param {import('../types/game.js').GameState} state */
function choicesFor(step,state) {
  if (step.id === 'assignment') return [choice('clarify-service','Ask which service to use',[{type:'ambiguity',target:'service'},{type:'value',target:'Proactivity',amount:4},{type:'flag',target:'clarified_deadline',value:'true'}]),choice('start-task','Start FP-142',[{type:'progress',amount:10}])];
  if (step.kind === 'focus') return [choice('work-carefully','Work carefully',[{type:'progress',amount:18},{type:'value',target:'Consistency',amount:3}]),choice('ask-regular','Ask what “regular” means',[{type:'ambiguity',target:'regular'},{type:'value',target:'Proactivity',amount:3}]),choice('ask-distance','Clarify exactly 10.0 miles',[{type:'ambiguity',target:'distance'},{type:'value',target:'Responsibility',amount:3}]),choice('suggest-test','Suggest a distance boundary test',[{type:'flag',target:'suggested_test',value:'true'},{type:'value',target:'Proactivity',amount:4}])];
  if (step.kind === 'report') return [choice(`report-${step.id}`,'Send an honest progress report',[{type:'report',target:step.id},{type:'value',target:'Consistency',amount:4},{type:'opinion',target:'grace',amount:3}]),choice('skip-report','Skip the report',[{type:'value',target:'Consistency',amount:-4}])];
  if (step.kind === 'mentor') return [choice('ask-leap','Ask about leap-day birthdays',[{type:'ambiguity',target:'leap-day'},{type:'value',target:'Proactivity',amount:3}]),choice('reflect','Reflect on the day',[{type:'opinion',target:'rafa',amount:4}])];
  if (step.kind === 'review') return [choice('submit-task','Submit FP-142',[{type:'progress',amount:10},{type:'value',target:'Discipline',amount:4}]),choice('help-dev','Help Dev reproduce the issue',[{type:'opinion',target:'dev',amount:5},{type:'value',target:'Responsibility',amount:3}])];
  return [choice(`continue-${step.id}`,'Continue',[{type:'value',target:'Discipline',amount:1}])];
}
/** @param {import('../types/game.js').GameState} state @param {string} playerChoiceId */
export function advance(state, playerChoiceId) {
  const selected = state.availableChoices.find((item) => item.id === playerChoiceId) || state.availableChoices[0];
  if (!selected) return state;
  let next = applyEffects(state, selected.effects);
  next.threads.all.push({id:`player-${state.currentStepId}`,senderId:'player',text:selected.label,timestamp:state.clock,threadId:'all'});
  if (playerChoiceId === 'start-task') next.task.status = 'in_progress';
  if (playerChoiceId === 'submit-task') { next.task.status = 'submitted'; next.task.quality = next.task.discoveredAmbiguities.length === 4 ? 'robust' : 'risky'; }
  const current = timeline.findIndex((step) => step.id === state.currentStepId);
  Object.entries(next.agentMoods).forEach(([id,mood]) => { next.agentMoods[/** @type {import('../types/game.js').AgentId} */(id)] = settleMood(mood, agentById[/** @type {import('../types/game.js').AgentId} */(id)].startingMood); });
  return enterStep(next, Math.min(current + 1, timeline.length - 1));
}
/** @param {import('../types/game.js').GameState} state */
export const getReview = (state) => buildReview(state);
