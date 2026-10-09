import type { Agent, GameEvent, GameState, Message } from './domain.js';

export const asAgents = <T extends readonly Agent[]>(agents: T): T => agents;
export const asEvents = <T extends readonly GameEvent[]>(events: T): T => events;
export const asMessages = <T extends readonly Message[]>(messages: T): T => messages;
export const asGameState = <T extends GameState>(state: T): T => state;
