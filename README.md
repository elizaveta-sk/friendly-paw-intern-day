# Friendly Paw: Intern Day

A mobile-first workplace-simulation chat game about a software engineering intern’s one very full day at a pet-food delivery company. Make predefined choices, clarify the hidden edges of FP-142, navigate five small workplace disruptions, and see how the team experiences your working style.

_Screenshot placeholder: run the web build and capture the name-entry and review screens here._

## Quick start

Prerequisite: Node 22+. Then run:

```sh
npm install
npm run web
npm test
npm run lint
npm run typecheck
npm run build:web
```

Enter a name, work through the timeline from 09:00 to 17:00, and select one of the provided responses at each moment. The review explains task quality, values, and colleague perceptions. The mute toggle controls the one incoming-chat blip.

## Architecture

`ui → state → engine → agents → data → types`. The engine is pure JavaScript and does not import React. Static content is bundled; there are no runtime network calls or API keys. Choices declare effects, which change task progress, values, mood, opinion, and memory flags. More detail is in [DESIGN.md](docs/DESIGN.md), and requirement coverage is in [REQUIREMENTS_TRACE.md](docs/REQUIREMENTS_TRACE.md).

To replace the scripted brain with an LLM later: implement `AgentBrain.respond(ctx)` from `src/agents/brain.js`, register it in `src/agents/registry.js`, and use the context’s agent, mood, memory, opinion, values, step, choice, and history. That change deliberately requires revisiting the offline/no-network constraint.

Animal placeholders live in `src/assets/icons.js`; replace each emoji map value with a local image-backed avatar implementation. Add dialogue in `src/data/dialogue/scripted.js`, events in `src/data/events.js`, and timeline moments in `src/data/timeline.js`.

## Deployment

The included GitHub Pages workflow builds `dist/` and deploys on pushes to `main` or `master`. Create a GitHub repository, push this project, and enable Pages with GitHub Actions as the source. No live URL is recorded because this workspace has no remote configured. Netlify and Vercel can both publish `dist/` after `npm run build:web`.

## Scope and limitations

Out of scope: account systems, multiplayer, persistent saves, and non-chat audio/animation. The narrow exception is the optional Web Audio incoming-message blip. The game has bundled scripted dialogue only.
