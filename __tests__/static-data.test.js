import { agents } from '../src/data/agents.js';
import { timeline } from '../src/data/timeline.js';
import { eventById } from '../src/data/events.js';
import { dialogue } from '../src/data/dialogue/scripted.js';

test('six complete named agents have one flaw', () => {
  expect(agents.map((agent) => agent.name)).toEqual(['Rafa','Marcus','Sofia','Dev','Jay','Grace']);
  agents.forEach((agent) => { expect(agent.role).toBeTruthy(); expect(agent.routine.length).toBeGreaterThan(0); expect(agent.flaw).toBeTruthy(); });
});
test('timeline is ordered and event references resolve', () => {
  expect(timeline.map((step) => step.time)).toEqual([...timeline.map((step) => step.time)].sort());
  timeline.filter((step) => step.eventId).forEach((step) => expect(eventById[step.eventId]).toBeTruthy());
});
test('dialogue covers required mistake types', () => {
  const text = JSON.stringify(dialogue);
  expect(text).toMatch(/FP-142/); expect(text).toMatch(/attached logs/); expect(text).toMatch(/thereabouts/);
});
