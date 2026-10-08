import { createInitialState, advance, getReview } from '../src/engine/game.js';
import { applyEffects } from '../src/engine/effects.js';
import { validateHrSchedule } from '../src/engine/hr.js';
import { getBrain } from '../src/agents/registry.js';
import { agentById } from '../src/data/agents.js';
import { timeline } from '../src/data/timeline.js';

const play = (name, choiceAt) => { let state=createInitialState(name); while (state.phase==='playing') state=advance(state, choiceAt(state)); return state; };
test('good and poor paths have meaningfully different reviews', () => { const good=play('A',(state)=>state.availableChoices.find((choice)=>/Ask|Flag|honest|Help|briefly|align|professional|carefully|Submit/.test(choice.label))?.id||state.availableChoices[0].id); const poor=play('B',(state)=>state.availableChoices.at(-1).id); expect(good.values.Proactivity).toBeGreaterThan(poor.values.Proactivity); expect(getReview(good).mentorFeedback).not.toEqual(getReview(poor).mentorFeedback); });
test('effects clamp values and opinions and set flags', () => { const state=applyEffects(createInitialState('A'),[{type:'value',target:'Responsibility',amount:100},{type:'opinion',target:'rafa',amount:-200},{type:'flag',target:'flagged_risk',value:'true'}]); expect(state.values.Responsibility).toBe(100); expect(state.agentMemory.rafa.opinion).toBe(-100); expect(state.agentMemory.rafa.flags.flagged_risk).toBe(true); });
test('clock only changes after choice and events occur once', () => { const state=createInitialState('A'); expect(state.clock).toBe('09:00'); const later=advance(state,state.availableChoices[0].id); expect(later.clock).toBe('09:05'); const end=play('A',(s)=>s.availableChoices[0].id); expect(new Set(end.triggeredEvents).size).toBe(5); });
test('hr schedule has exactly two player checks', () => expect(validateHrSchedule()).toBe(true));
test('brain depends on memory callback and mentor starts reflective', () => { const agent=agentById.rafa; const base={agent,mood:'calm',memory:{flags:{},opinion:0,notes:[]},opinion:0,step:timeline[0],history:[]}; expect(getBrain('rafa').respond(base).messages[0]).toMatch(/What/); const callback=getBrain('rafa').respond({...base,memory:{...base.memory,flags:{petted_dog:true}}}).messages.join(''); expect(callback).toMatch(/dog/); });
test('all shipped choices carry effects', () => { let state=createInitialState('A'); while(state.phase==='playing'){ expect(state.availableChoices.every((choice)=>choice.effects.length>0)).toBe(true); state=advance(state,state.availableChoices[0].id); } });
