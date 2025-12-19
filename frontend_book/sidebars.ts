import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'ROS 2 Fundamentals Module',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Getting Started',
          items: [
            'intro',
            'ros-module/fundamentals',
          ],
        },
        {
          type: 'category',
          label: 'Core Concepts',
          items: [
            'ros-module/communication',
            'ros-module/urdf-modeling',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Digital Twin Simulation Module',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Core Concepts',
          items: [
            'digital-twin-sim/digital-twins-physics',
            'digital-twin-sim/simulation-environments',
            'digital-twin-sim/sensor-simulation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'The AI-Robot Brain (NVIDIA Isaac)',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Core Concepts',
          items: [
            'isaac-robot-brain/isaac-sim-photorealistic',
            'isaac-robot-brain/isaac-ros-slam-nav',
            'isaac-robot-brain/nav2-path-planning',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Core Concepts',
          items: [
            'module-4-vla/index',
            'module-4-vla/voice-to-action',
            'module-4-vla/cognitive-planning',
            'module-4-vla/autonomous-humanoid',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
