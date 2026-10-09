export type AgentId = 'rafa' | 'marcus' | 'sofia' | 'dev' | 'jay' | 'grace';
export type Mood = 'calm' | 'cheerful' | 'stressed' | 'annoyed' | 'distracted' | 'worried' | 'amused';
export type ValueName = 'Responsibility' | 'Discipline' | 'Consistency' | 'Proactivity';
export type EventKind = 'requirement_change' | 'production_bug' | 'miscommunication' | 'gossip' | 'dog_visit';
export type TaskStatus = 'not_started' | 'in_progress' | 'submitted';
export type GamePhase = 'name_entry' | 'playing' | 'review';
export type SenderId = AgentId | 'player' | 'system';

export interface AgentRoutineItem { readonly time: string; readonly activity: string; }
export interface AgentFlaw { readonly description: string; readonly mistakeType: string; readonly catchableBy: string; }
export interface Agent { readonly id: AgentId; readonly name: string; readonly role: string; readonly personality: string; readonly startingMood: Mood; readonly communicationStyle: string; readonly goal: string; readonly routine: readonly AgentRoutineItem[]; readonly flaw: AgentFlaw; readonly iconKey: AgentId; }

export interface Values { readonly Responsibility: number; readonly Discipline: number; readonly Consistency: number; readonly Proactivity: number; }
export interface Message { readonly id: string; readonly senderId: SenderId; readonly text: string; readonly timestamp: string; readonly threadId: string; readonly attachment?: { readonly name: string }; }
export interface Effect { readonly type: 'value' | 'opinion' | 'flag' | 'mood' | 'progress' | 'time' | 'trigger' | 'ambiguity' | 'report'; readonly target?: string; readonly amount?: number; readonly value?: string; }
export interface Choice { readonly id: string; readonly label: string; readonly effects: readonly Effect[]; }
export interface GameEvent { readonly id: string; readonly kind: EventKind; readonly triggerCondition: string; readonly agentIds: readonly AgentId[]; readonly messages: readonly string[]; readonly choices: readonly Choice[]; readonly effects: readonly Effect[]; }
export interface AgentMemory { readonly flags: Readonly<Record<string, boolean>>; readonly opinion: number; readonly notes: readonly string[]; }
export interface TaskState { readonly id: 'FP-142'; readonly status: TaskStatus; readonly progress: number; readonly discoveredAmbiguities: readonly string[]; readonly requirementsVersion: number; readonly description: string; readonly quality?: string; }
export interface GameState { readonly clock: string; readonly playerName: string; readonly currentStepId: string; readonly threads: Readonly<Record<string, readonly Message[]>>; readonly agentMoods: Readonly<Record<AgentId, Mood>>; readonly agentMemory: Readonly<Record<AgentId, AgentMemory>>; readonly values: Values; readonly task: TaskState; readonly triggeredEvents: readonly string[]; readonly reportsSent: readonly string[]; readonly hrCheckLog: readonly string[]; readonly phase: GamePhase; readonly muted: boolean; readonly availableChoices: readonly Choice[]; }
export type GameAction = { readonly type: 'START_GAME'; readonly playerName: string } | { readonly type: 'CHOOSE'; readonly choiceId: string } | { readonly type: 'RESTART' } | { readonly type: 'TOGGLE_MUTE' };
