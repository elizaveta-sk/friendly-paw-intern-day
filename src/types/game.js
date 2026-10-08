// @ts-check
/** @typedef {'rafa'|'marcus'|'sofia'|'dev'|'jay'|'grace'} AgentId */
/** @typedef {'calm'|'cheerful'|'stressed'|'annoyed'|'distracted'|'worried'|'amused'} Mood */
/** @typedef {'wrong_ticket_number'|'missing_attachment'|'ambiguous_deadline'|'wrong_suggestion'|'false_positive'|'rumour'} MistakeType */
/** @typedef {{description:string,mistakeType:MistakeType,catchableBy:string}} AgentFlaw */
/** @typedef {{time:string,activity:string}} RoutineItem */
/** @typedef {{id:AgentId,name:string,role:string,personality:string,startingMood:Mood,communicationStyle:string,goal:string,routine:RoutineItem[],flaw:AgentFlaw,iconKey:AgentId}} AgentDefinition */
/** @typedef {'asked_service'|'asked_regular'|'asked_distance'|'asked_leap_day'|'flagged_ticket'|'flagged_attachment'|'clarified_deadline'|'helped_bug'|'handled_gossip'|'petted_dog'|'ignored_dog'|'flagged_risk'|'suggested_test'|'ignored_context'|'reported_progress'} MemoryFlag */
/** @typedef {{flags:Record<string,boolean>,opinion:number,notes:string[]}} AgentMemory */
/** @typedef {'Responsibility'|'Discipline'|'Consistency'|'Proactivity'} ValueName */
/** @typedef {Record<ValueName,number>} Values */
/** @typedef {{type:'value'|'opinion'|'flag'|'mood'|'progress'|'time'|'trigger'|'ambiguity'|'report',target?:string,amount?:number,value?:string}} Effect */
/** @typedef {{id:string,label:string,effects:Effect[]}} Choice */
/** @typedef {{id:string,senderId:AgentId|'player'|'system',text:string,timestamp:string,attachment?:{name:string},threadId:string}} Message */
/** @typedef {{id:string,time:string,kind:string,agentIds:AgentId[],description:string,onEnter?:string,requiresChoice:boolean,nextRule:string,eventId?:string}} TimelineStep */
/** @typedef {{id:string,kind:'requirement_change'|'production_bug'|'miscommunication'|'gossip'|'dog_visit',triggerCondition:string,agentIds:AgentId[],messages:string[],choices:Choice[],effects:Effect[]}} GameEvent */
/** @typedef {{id:'FP-142',status:'not_started'|'in_progress'|'submitted',progress:number,discoveredAmbiguities:string[],requirementsVersion:number,description:string,quality?:string}} TaskState */
/** @typedef {{clock:string,playerName:string,currentStepId:string,threads:Record<string,Message[]>,agentMoods:Record<AgentId,Mood>,agentMemory:Record<AgentId,AgentMemory>,values:Values,task:TaskState,triggeredEvents:string[],reportsSent:string[],hrCheckLog:string[],phase:'name_entry'|'playing'|'review',muted:boolean,availableChoices:Choice[]}} GameState */
export {};
