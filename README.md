# Friendly Paw: Intern Day

Friendly Paw: Intern Day is a workplace-simulation chat game about a software engineering intern’s very full day at a pet-food delivery company. The goal is not simply to click through every interruption: it is to keep focus, ask useful questions, help the team thoughtfully, and get FP-142 to a sensible end-of-day report.

## Live demo

[Play the deployed game](https://friendlypaw.netlify.app)

## Run locally

Prerequisite: Node.js 22 or newer.

```sh
npm install
npm run web
```

Then open the local URL shown by Expo. Useful checks:

```sh
npm run typecheck
npm test
npm run build:web
```

`npm run build:web` exports a static production build to `dist/`.

## The experience

The day begins after the opening meetings at 11:00. Thirty seconds of real time equals one in-game hour, with quarter-hour updates so the calendar can surface moments such as the 14:15 attachment argument.

The intern works through FP-142, a pet-birthday benefit. They can visit team chat pages to ask scripted work questions, write in the colleague feed, decide whether to take distractions, and manage check-ins before they become overdue. The intent is to make it to the end of the day with a credible implementation story—not to chase every entertaining office event.

The game currently focuses on:

- keeping FP-142 moving through clarification, implementation, QA, and reporting;
- a calendar that makes time pressure visible;
- work-related chat choices alongside optional distractions;
- R / D / C / P values: Responsibility, Discipline, Consistency, and Proactivity;
- rapport with colleagues, reflected in Rafa’s end-of-day feedback;
- a full-screen final review with a Try again path.

## Team roster

| Colleague | Role | Personality and working style |
| --- | --- | --- |
| Rafa 🦉 | Mentor | Calm, practical mentor. She asks the intern to clarify uncertainty early and concentrate on the useful edge cases. |
| Marcus 🐻 | Tech lead | Dry, terse, and delivery-focused. His updates are blunt, but usually point to the real dependency. |
| Sofia 🦊 | Product manager | Customer-focused and outcome-led. She protects the meaning of a requirement, even when that means changing it mid-task. |
| Dev 🐱 | QA engineer | Technical, precise, and evidence-first. Boundary values and missing attachments both matter to him. |
| Jay 🦜 | Software engineer | Talkative, excitable, and easily distracted by jokes, rumours, and clever shortcuts. |
| Grace 🐘 | HR partner | Caring and supportive. She keeps an eye on the human side of the day, from water breaks to team check-ins. |

Robin, Rafa’s dog, is the office visitor. Grace announces the visit and the intern chooses whether to welcome Robin briefly, spend thirty minutes with the team, or stay focused.

## Key design decisions

### A friendly interface around real trade-offs

The UI is deliberately warm, simple, and chat-led: animals, soft colours, a small calendar, and short messages keep the simulation approachable. Underneath, the choices are about practical engineering behaviour—clarifying a service boundary, asking QA for evidence, reporting risks honestly, and deciding when a distraction is worth it.

### Time is part of the evaluation

The intern has to watch the clock. The mid-day progress report, QA feedback, and final report do not force their way onto the screen. When a designated check-in is missed, the relevant calendar item and assignment panel turn red. Completing the right work through the appropriate team chat at the right moment is intended to be rewarding; helping with every issue can improve rapport, but competes with delivery time.

### Team chats instead of task pop-ups

The assignment tells the player what comes next, but team members live in the Team area. This keeps the interaction model consistent: go to a person, open their chat, choose a work message, receive the response, then confirm the plan.

### Modular enough to extend

The playable UI is currently concentrated in `src/ui/GameScreen.js` for rapid iteration. The repository also contains a separated data/engine shape from the earlier build: agent data, timeline/event data, scripted dialogue, and UI components are designed to be split further without changing the game’s intent.

For a production iteration, the next refactor would move the current screen’s schedule, notification queue, rapport, task-completion, and evaluation rules into dedicated modules, for example:

```text
src/
  data/          # agents, calendar, backlog, scripted dialogue
  game/          # clock, task state, scoring, rapport, evaluation
  ui/            # calendar, colleague feed, team chat, notification, review
```

This would make it much easier to extend each colleague independently, add tests for every deadline, and swap hard-coded scripts for data-driven conversation flows.

## Backlog: what the Friendly Paw team is working on

The backlog is intentionally visible as a direction for future player choice:

| Item | Owner | What the player could choose |
| --- | --- | --- |
| FP-142: pet birthday benefit | Intern + Rafa | Clarify the notification path, customer eligibility, boundary cases, QA evidence, and reporting. |
| FP-141: delivery-radius regression | Dev | Help with the 9.99 / 10.00 / 10.01-mile test cases. |
| Checkout hand-off cleanup | Jay | Help untangle the checkout-to-benefit integration, at the risk of losing focus on FP-142. |
| Regular-customer eligibility | Sofia | Help validate the customer rule when the requirement changes. |
| Attachment reliability | Marcus + Jay | Help resolve the attachment problem appearing in the team chat. |
| New-starter support | Grace | Help with team check-ins and office support.

With more time, this backlog would become selectable at the start of the day: the intern could choose a primary task and one optional support task, then receive a practical evaluation based on the scope they accepted, the deadlines they met, the quality of their questions, and the evidence in their report.

## Game logic and evaluation

The game should favour practical judgement over novelty features. A strong evaluation looks at:

- **delivery:** did the intern complete the accepted FP-142 path and submit a useful report?
- **timing:** did they handle progress, QA, and final-report checkpoints before the grace period expired?
- **engineering quality:** did they clarify requirements, seek evidence, and test boundary cases?
- **focus:** did optional jokes, rumours, and office events crowd out core work?
- **collaboration:** did they help teammates when it was useful, and what rapport did they build?
- **communication:** was the final report honest about progress, risks, and blockers?

Fun events should support these trade-offs rather than replace them. Jay’s interruptions, Robin’s visit, and the team’s arguments exist to make prioritisation observable.

## What I would improve with more time

- Make every team member fully functional, with a complete personal task, FP-142 dependency, problem thread, rapport response, and end-of-day contribution.
- Make every calendar checkpoint a real, tested task state rather than a presentational reminder.
- Turn the backlog into a task-selection system with scoped acceptance criteria and realistic trade-offs.
- Move clock, notification, scoring, rapport, and report logic out of the screen component into testable game modules.
- Add automated tests for on-time versus late work, rapport effects, distraction chains, and the three final evaluation outcomes.
- Improve the end-of-day review so colleagues give short, specific evidence-based feedback instead of a single aggregate result.
- Persist a completed run locally and show a compact run history.
- Add accessibility review, keyboard navigation, and richer responsive polish.

## AI tools used

This project was developed with AI assistance, alongside personal editing and direction.

- **Codex** was used as the main coding assistant. It had tighter usage limits during the work, so it was used deliberately for implementation, debugging, iteration, local builds, tests, Git commits, and README creation.
- **Claude Code** was also used during exploration and drafting.

The process was iterative:

1. Draft a system-requirements plan from the brief, then edit it and add personal ideas.
2. Organise the requirements by features: agents, events, scripts, UI, screens, and game logic.
3. Turn the requirements into detailed prompts for app creation with Codex.
4. Ask for the initial application structure, then fix major bugs and incorrectly implemented features.
5. Iterate repeatedly on timing, dialogue, notifications, team chats, and the evaluation flow.
6. Roll back features that worked well before a recent update, then integrate the useful older behaviour with the newer structure.
7. Create and refine this README quickly as a handoff document.

The AI tools accelerated drafting, implementation, and debugging. Product choices—such as prioritising practical intern evaluation, the tone of each colleague, the task flow, and the final scope—were reviewed and directed manually.

## Project notes

- The app is an Expo / React Native Web project.
- Dialogue and interaction are scripted; no runtime AI API or secret is required.
- The deployed build is static and can be hosted from `dist/`.
