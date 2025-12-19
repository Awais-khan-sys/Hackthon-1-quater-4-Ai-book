# ROS 2 Fundamentals Module - Development & Maintenance Guide

## Project Structure

- `docs/ros-module/` - Main content for the ROS 2 Fundamentals module
  - `fundamentals.md` - ROS 2 basics and core concepts
  - `communication.md` - Communication patterns in ROS 2
  - `urdf-modeling.md` - Humanoid robot modeling with URDF
  - `_category_.json` - Docusaurus category configuration

## Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm package manager

### Initial Setup
1. Clone the repository
2. Navigate to the `frontend_book` directory
3. Install dependencies: `npm install`
4. Start development server: `npm start`

### Development Commands
- `npm start` - Start local development server with hot reloading
- `npm run build` - Build static site for production
- `npm run serve` - Serve built site locally for testing
- `npm run deploy` - Deploy to GitHub Pages (if configured)

## Content Creation Guidelines

### Adding New Content
1. Create new `.md` files in the appropriate directory under `docs/`
2. Add the file to the sidebar configuration in `sidebars.ts`
3. Use proper heading hierarchy (H1, H2, H3, etc.)
4. Include learning objectives using the `<LearningObjectives>` component
5. Follow the existing content structure and formatting

### Docusaurus Features Used
- **Custom Components**: LearningObjectives component for learning outcomes
- **Search**: Local search functionality using `@cmfcmf/docusaurus-search-local`
- **Sidebar Navigation**: Organized by module and chapter
- **Markdown Extensions**: Support for admonitions, code blocks, and embedded components

## Maintenance Tasks

### Regular Maintenance
- Update dependencies periodically with `npm update`
- Test builds regularly with `npm run build`
- Verify all internal links continue to work
- Review content for accuracy and relevance

### Updating Content
1. Edit the appropriate `.md` file in `docs/ros-module/`
2. Preview changes with `npm start`
3. Test build with `npm run build`
4. Commit changes with descriptive commit messages

### Deployment
The site is configured for GitHub Pages deployment:
- The GitHub Actions workflow in `.github/workflows/deploy.yml` handles automatic deployment
- Push changes to the main branch to trigger deployment
- The site will be built and deployed automatically

## Troubleshooting

### Common Issues
- **Broken Links**: Run `npm run build` to identify any broken internal links
- **Search Not Working**: Verify `@cmfcmf/docusaurus-search-local` is properly installed
- **Build Failures**: Check for syntax errors in markdown files or configuration issues

### Performance
- The site uses local search indexing which may take time on initial build
- Large content updates may require rebuilding the search index

## Dependencies

Key dependencies include:
- Docusaurus v3 (core framework)
- @cmfcmf/docusaurus-search-local (search functionality)
- React and related packages (component framework)

Keep dependencies updated for security and feature improvements.