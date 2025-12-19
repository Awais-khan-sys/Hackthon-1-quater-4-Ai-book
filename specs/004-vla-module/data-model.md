# Data Model: VLA Module Documentation

## Documentation Entities

### Module-4-VLA (Main Module)
- **Name**: Vision-Language-Action (VLA) Module
- **Description**: Educational module explaining how language models, perception, and robotics actions converge to create autonomous humanoid behavior
- **Target Audience**: AI/robotics students with ROS 2 knowledge
- **Content Format**: Concept-first with minimal examples
- **Platform**: Docusaurus-compatible Markdown
- **Relationships**: Contains 3 chapters as sub-documents

### Voice-to-Action Chapter
- **Title**: Voice-to-Action
- **Content Focus**: Speech-to-text with OpenAI Whisper and translating voice commands into robot intents
- **Key Concepts**:
  - Speech recognition
  - Intent mapping
  - Voice command processing
  - OpenAI Whisper integration
- **Relationships**: Part of Module-4-VLA; Predecessor to Cognitive Planning chapter

### Cognitive Planning Chapter
- **Title**: Cognitive Planning with LLMs
- **Content Focus**: Using LLMs for task decomposition and converting natural language goals into ROS 2 action sequences
- **Key Concepts**:
  - Large Language Models
  - Task decomposition
  - Natural language processing
  - ROS 2 action sequences
  - Planning algorithms
- **Relationships**: Part of Module-4-VLA; Predecessor to Autonomous Humanoid chapter; Successor to Voice-to-Action chapter

### Autonomous Humanoid Capstone Chapter
- **Title**: Capstone: The Autonomous Humanoid
- **Content Focus**: End-to-end VLA pipeline with voice command → planning → navigation → perception → manipulation
- **Key Concepts**:
  - End-to-end pipeline integration
  - Voice command processing
  - Cognitive planning
  - Navigation systems
  - Perception systems
  - Manipulation systems
- **Relationships**: Part of Module-4-VLA; Successor to Cognitive Planning chapter; Integrates concepts from all previous chapters

## Navigation Structure

### Sidebar Entry
- **Label**: "Module 4: Vision-Language-Action (VLA)"
- **Type**: Category
- **Items**:
  - Link to Module-4-VLA index
  - Link to Voice-to-Action chapter
  - Link to Cognitive Planning chapter
  - Link to Autonomous Humanoid chapter

### Document Relationships
- Module-4-VLA serves as the parent container for all three chapters
- Chapters are ordered in pedagogical sequence (foundational → advanced → integrated)
- Cross-references between chapters for integrated concepts