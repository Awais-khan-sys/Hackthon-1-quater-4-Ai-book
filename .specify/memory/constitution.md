<!--
Sync Impact Report:
- Version change: 0.1.0 → 1.0.0
- Modified principles: All principles updated with project-specific content
- Added sections: None
- Removed sections: None
- Templates requiring updates: ✅ Updated
- Follow-up TODOs: None
-->
# AI-Native Book + RAG Chatbot Constitution

## Core Principles

### I. Spec-Driven, AI-Generated Development
Every feature and implementation starts from a well-defined specification; All code generation is AI-assisted following the Spec-Kit Plus methodology; Manual coding is only for refinement and edge cases after AI generation.

### II. Retrieval-Augmented Generation (RAG) Integrity
All chatbot responses must be grounded in retrieved content from the book; No hallucinations allowed - responses must cite specific sources from the knowledge base; Full-book and selected-text Q&A must maintain factual accuracy to source materials.

### III. Minimal Viable Demo
Focus on core functionality: Docusaurus book generation and RAG chatbot integration; No extra UI components or features beyond the essential deliverables; Keep scope constrained to ensure demo-ready state.

### IV. Reproducible Setup
Environment variables for all secrets and configurations; Infrastructure-as-code approach with clear setup instructions; All dependencies and services documented for easy reproduction.

### V. Free-Tier Service Compliance
All technology choices must remain within free-tier limits of respective services; Monitor costs actively and implement safeguards against unexpected charges; Neon Serverless Postgres and Qdrant Cloud Free tier utilization.

### VI. Public Deployment and Accessibility
GitHub Pages deployment for public accessibility; Open-source documentation and code; Grounded answers only - no proprietary or sensitive information in responses.

## Technology Stack Requirements

Backend: FastAPI for robust API endpoints; SDK: OpenAI Agents / ChatKit for intelligent interactions; Database: Neon Serverless Postgres for scalable storage; Vector Database: Qdrant Cloud (Free) for efficient similarity search; Frontend: Docusaurus for book generation and chatbot embedding.

## Development Workflow

Spec-first approach using Spec-Kit Plus templates; AI-assisted code generation with Claude Code; Small, testable pull requests referencing specific code locations; Environment-based secrets management without hardcoding.

## Governance

This constitution governs all development decisions for the AI-Native Book + RAG Chatbot project; All features must comply with the core principles of spec-driven development and RAG integrity; Amendments require explicit documentation of changes and their impact on project goals.

**Version**: 1.0.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17
