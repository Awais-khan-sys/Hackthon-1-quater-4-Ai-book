# Quickstart: ROS 2 Fundamentals Module

## Setup Instructions

1. **Initialize Docusaurus Project**
   ```bash
   npx create-docusaurus@latest website classic
   cd website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create ROS Module Directory**
   ```bash
   mkdir docs/ros-module
   ```

4. **Add Module Content**
   Create the three chapter files in `docs/ros-module/`:
   - `fundamentals.md` - ROS 2 Fundamentals
   - `communication.md` - ROS 2 Communication
   - `urdf-modeling.md` - Humanoid Modeling with URDF

5. **Configure Navigation**
   Update `sidebars.js` to include the ROS module chapters in proper learning order.

6. **Run Development Server**
   ```bash
   npm run start
   ```

## Building the Documentation

```bash
npm run build
```

## Deployment to GitHub Pages

1. Configure `docusaurus.config.js` with GitHub Pages settings
2. Push changes to repository
3. GitHub Actions will automatically deploy to GitHub Pages

## Content Creation Guidelines

- Each chapter should include learning objectives at the beginning
- Use Docusaurus MDX features for interactive elements
- Include code examples with proper syntax highlighting
- Add exercises at the end of each chapter
- Use consistent terminology throughout all chapters