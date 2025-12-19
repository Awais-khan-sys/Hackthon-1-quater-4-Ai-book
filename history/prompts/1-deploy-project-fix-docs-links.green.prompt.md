---
id: 6
title: fix-docs-links
stage: green
date_iso: 2025-12-19
surface: agent
model: Claude Sonnet 4.5
feature: deploy-project
branch: 1-deploy-project
user: user
command: fix docs links
labels: ["documentation", "docusaurus", "links", "fix"]
links:
  spec: "specs/1-deploy-project/spec.md"
  plan: "specs/1-deploy-project/plan.md"
  tasks: "specs/1-deploy-project/tasks.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "frontend_book/docs/module-4-vla/autonomous-humanoid.md"
  - "frontend_book/docs/module-4-vla/cognitive-planning.md"
  - "frontend_book/docs/module-4-vla/voice-to-action.md"
tests_yaml: []
---

# Prompt

```
You are an expert Docusaurus documentation engineer. I have a Docusaurus project with broken links in my markdown files under the folder "docs/module-4-vla/". The broken links are:

1. /docs/module-4-vla/autonomous-humanoid/ links to:
   - ./voice-to-action/
   - ./cognitive-planning/

2. /docs/module-4-vla/cognitive-planning/ links to:
   - ./autonomous-humanoid/
   - ./voice-to-action/

3. /docs/module-4-vla/voice-to-action/ links to:
   - ./cognitive-planning/

Please do the following:

1. Check the folder structure under "docs/module-4-vla/" and identify the correct relative paths for all links.
2. Rewrite the markdown link references in each file so that they point to the correct paths.
3. Make sure all links are relative (use ./ for current folder, ../ for parent folder) and will not break the Docusaurus build.
4. Output the **fixed markdown content for each file** without changing the text content, only fixing the links.

Do not add any new text or sections, just fix the broken links.
```

# Response

Identified and fixed broken links in Docusaurus documentation files under `frontend_book/docs/module-4-vla/`. The issue was that the links were pointing to subdirectories (e.g., `./voice-to-action/`) instead of the actual markdown files (e.g., `./voice-to-action.md`).

## Files Fixed:

1. `frontend_book/docs/module-4-vla/autonomous-humanoid.md`:
   - Fixed link: `[Voice-to-Action](./voice-to-action)` → `[Voice-to-Action](./voice-to-action.md)`
   - Fixed link: `[Cognitive Planning with LLMs](./cognitive-planning)` → `[Cognitive Planning with LLMs](./cognitive-planning.md)`

2. `frontend_book/docs/module-4-vla/cognitive-planning.md`:
   - Fixed link: `[The Autonomous Humanoid Capstone](./autonomous-humanoid)` → `[The Autonomous Humanoid Capstone](./autonomous-humanoid.md)`
   - Fixed link: `[Voice-to-Action](./voice-to-action)` → `[Voice-to-Action](./voice-to-action.md)`

3. `frontend_book/docs/module-4-vla/voice-to-action.md`:
   - Fixed link: `[Cognitive Planning with LLMs](./cognitive-planning)` → `[Cognitive Planning with LLMs](./cognitive-planning.md)`

All links now correctly point to the .md files in the same directory, which will resolve properly in the Docusaurus build process.