// @ts-check
/**
 * AgentBrain is the only conversation boundary. Replace this scripted brain in
 * `registry.js` with an LLM-backed implementation later; engine and UI stay unchanged.
 * @typedef {{agent: import('../types/game.js').AgentDefinition,mood: import('../types/game.js').Mood,memory: import('../types/game.js').AgentMemory,opinion:number,step: import('../types/game.js').TimelineStep,lastChoice?:string,history: import('../types/game.js').Message[]}} AgentContext
 * @typedef {{messages:string[],choices?: import('../types/game.js').Choice[],effects?: import('../types/game.js').Effect[]}} AgentReply
 * @typedef {{respond:(ctx:AgentContext)=>Promise<AgentReply>|AgentReply}} AgentBrain
 */
export {};
