# CLAUDE.md — Main Workspace Rules

## Context Budget
- Load only files directly relevant to the current task. Don't read the whole workspace.
- For web/UI builds: read only the specific file being modified, not the entire project.
- Don't re-read files you already have in context this session.

## Building Websites & Full Projects
Full builds are totally fine. Keep sessions task-scoped:
- One session = one component, one page, or one bug fix.
- If context grows past ~20 exchanges, summarize progress and start fresh.
- When building HTML/CSS/JS: deliver working, complete code on the first response.
  Don't split output across multiple messages unless Cliff explicitly asks.

## Data — Never Paste Dumps
If Cliff pastes raw JSON, CSV, or game data:
- Work from the fields relevant to the task only. Ask which fields if unclear.
- Champion data: name + specific stats only. Never hold full stat blocks in context.
- Database schema work: schema + 2-3 row sample is enough. Never need full dataset.

## Response Style
- Code: deliver complete, working output. No placeholder comments like "// add your logic here"
  unless Cliff is writing that part himself.
- Explanations: brief. Skip restating the question. Skip summarizing what you just did.
- Don't add "Let me know if you need changes!" closers unless actually useful.

## Long Sessions
If a coding session runs long and context is getting heavy:
- Offer to continue in a focused new session with a one-line handoff summary.
- Don't silently degrade — flag when context is getting large.

## lol-overlay
This project has its own Haiku-based AI pipeline. Don't touch that pipeline.
For overlay feature work: read only the specific file being changed.
Don't load coaching/claude.js or data/ files unless explicitly working on AI logic.
