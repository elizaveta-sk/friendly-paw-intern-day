# Friendly Paw design

```
ui → state → engine → agents → data → types
```

`AgentBrain.respond(context)` is the sole agent boundary. A future LLM implementation can replace the scripted registry entry without changing the engine or UI.

Choices carry declarative effects: values, opinions, flags, moods, task progress, time, ambiguity discovery, reports, and follow-up triggers. Values and opinions are clamped; moods settle toward their starting mood after each step. The UI never decides outcomes.

Mood states are calm, cheerful, stressed, annoyed, distracted, worried, and amused. Helpful, clear actions improve mood; ignored requests worsen it; each new step settles it one tier toward its starting state.

Conflicts resolved: the single Web Audio chat blip wins over the general no-sound rule; icons are emoji placeholders in `src/assets/icons.js`; choices are predefined, except for one-time name entry.

| Value | Example actions |
|---|---|
| Responsibility | flag risks, help production |
| Discipline | work deliberately, avoid speculation |
| Consistency | follow through on reports |
| Proactivity | clarify ambiguity, align leads |

Rafa selects a value-sensitive nudge at 15:30 and in his touchpoints: high Responsibility earns ownership feedback; low Proactivity draws a reflective challenge. Event callbacks are retained as memory flags and surface in Grace’s, Rafa’s, and review copy.
