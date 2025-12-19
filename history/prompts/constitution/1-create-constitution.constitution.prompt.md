---
id: 1
title: Create Constitution
stage: constitution
date: 2025-12-17
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: user
command: /sp.constitution
labels: [constitution,setup,initialization]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

```text
/sp.constitution

Project: AI-Native Book + RAG Chatbot

Goal:
Use Claude Code and Spec-Kit Plus to generate a Docusaurus book, deploy it to GitHub Pages, and embed a RAG chatbot that answers only from book content.

Principles:
- Spec-driven, AI-generated only
- Retrieval-grounded answers (no hallucinations)
- Minimal scope, demo-ready
- Reproducible setup

Deliverables:
- Docusaurus book (GitHub Pages)
- Embedded RAG chatbot

Tech:
- Backend: FastAPI
- SDK: OpenAI Agents / ChatKit
- DB: Neon Serverless Postgres
- Vector DB: Qdrant Cloud (Free)
- Supports full-book + selected-text Q&A

Constraints:
- Free-tier services only
- No extra UI or features
- Env-based secrets

Success:
- Public deployment
- Grounded answers only
- Selected-text Q&A works

End.
```

## Response snapshot

Updated the constitution template with project-specific details for the AI-Native Book + RAG Chatbot project, establishing six core principles: I. Spec-Driven, AI-Generated Development; II. Retrieval-Augmented Generation (RAG) Integrity; III. Minimal Viable Demo; IV. Reproducible Setup; V. Free-Tier Service Compliance; VI. Public Deployment and Accessibility. Also added sections for Technology Stack Requirements, Development Workflow, and Governance, with version 1.0.0 ratified on 2025-12-17.

## Outcome

- ✅ Impact: Created foundational constitution document defining project principles and governance
- 🧪 Tests: none
- 📁 Files: Updated .specify/memory/constitution.md with project-specific constitution
- 🔁 Next prompts: Proceed with creating feature specifications using /sp.specify
- 🧠 Reflection: Constitution properly captures all specified principles and constraints from the project requirements

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS - All required principles incorporated
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Create initial feature specification