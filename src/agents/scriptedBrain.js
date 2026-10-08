// @ts-check
import { dialogue } from '../data/dialogue/scripted.js';

/** @param {import('./brain.js').AgentContext} ctx @returns {import('./brain.js').AgentReply} */
export function scriptedRespond(ctx) {
  const situation = ctx.step.kind === 'event' ? (ctx.step.id === 'gossip' ? 'gossip' : ctx.step.id === 'requirement-change' ? 'requirement_change' : 'arrival') : ctx.step.kind;
  const agentLines = dialogue[ctx.agent.id]?.[situation] || dialogue[ctx.agent.id]?.arrival;
  const moodLines = agentLines?.[ctx.mood] || Object.values(agentLines || {})[0];
  const base = moodLines?.default || [`${ctx.agent.name} is considering the next move.`];
  const callback = ctx.memory.flags.handled_gossip && ctx.agent.id === 'grace' ? ' I noticed you kept lunchtime professional.' : ctx.memory.flags.petted_dog && ctx.agent.id === 'rafa' ? ' The dog has entered a favorable review.' : '';
  return { messages: base.map((line) => `${line}${callback}`) };
}
