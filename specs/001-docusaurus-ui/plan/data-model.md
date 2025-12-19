# Data Model: Docusaurus UI Styling Variables

## Design Tokens

### Color Palette

#### Primary Colors
- `--ifm-color-primary`: #2563eb (Modern blue, replacing #1a73e8)
- `--ifm-color-primary-dark`: #1d4ed8 (Darker blue)
- `--ifm-color-primary-darker`: #1e40af
- `--ifm-color-primary-darkest`: #1e3a8a
- `--ifm-color-primary-light`: #3b82f6 (Lighter blue)
- `--ifm-color-primary-lighter`: #60a5fa
- `--ifm-color-primary-lightest`: #93c5fd

#### Secondary Colors
- `--ifm-color-secondary`: #6b7280 (Modern gray)
- `--ifm-color-secondary-dark`: #4b5563
- `--ifm-color-secondary-darker`: #374151
- `--ifm-color-secondary-light`: #9ca3af
- `--ifm-color-secondary-lighter`: #d1d5db
- `--ifm-color-secondary-lightest`: #f3f4f6

#### Semantic Colors
- `--ifm-color-success`: #10b981 (Emerald green)
- `--ifm-color-info`: #0ea5e9 (Sky blue)
- `--ifm-color-warning`: #f59e0b (Amber)
- `--ifm-color-danger`: #ef4444 (Red)

#### Background & Surface Colors
- `--ifm-color-background`: #ffffff (Page background)
- `--ifm-color-surface`: #f9fafb (Card/surface background)
- `--ifm-color-surface-dark`: #f3f4f6

#### Text Colors
- `--ifm-color-content`: #1f2937 (Primary text)
- `--ifm-color-content-secondary`: #6b7280 (Secondary text)
- `--ifm-color-content-inverse`: #ffffff (Text on dark backgrounds)

### Typography Scale

#### Font Stack
- `--ifm-font-family-base`: 'Inter', system-ui, -apple-system, sans-serif
- `--ifm-font-family-monospace`: 'Fira Code', Consolas, monospace

#### Heading Sizes
- `--ifm-h1-font-size`: clamp(2.5rem, 5vw, 3rem) (Responsive H1)
- `--ifm-h2-font-size`: clamp(2rem, 4vw, 2.5rem) (Responsive H2)
- `--ifm-h3-font-size`: clamp(1.75rem, 3vw, 2rem) (Responsive H3)
- `--ifm-h4-font-size`: clamp(1.5rem, 2.5vw, 1.75rem) (Responsive H4)
- `--ifm-h5-font-size`: clamp(1.25rem, 2vw, 1.5rem) (Responsive H5)
- `--ifm-h6-font-size`: clamp(1.1rem, 1.5vw, 1.25rem) (Responsive H6)

#### Body Text
- `--ifm-font-size-base`: 1rem (Base font size)
- `--ifm-line-height-base`: 1.65 (Improved readability)
- `--ifm-font-weight-light`: 300
- `--ifm-font-weight-normal`: 400
- `--ifm-font-weight-semibold`: 600
- `--ifm-font-weight-bold`: 700

### Spacing Scale
Based on 4px base unit for consistent spacing:

- `--ifm-spacing-unit`: 1rem (4px base × 4 = 16px)
- `--ifm-spacing-xs`: calc(var(--ifm-spacing-unit) * 0.25) (4px)
- `--ifm-spacing-sm`: calc(var(--ifm-spacing-unit) * 0.5) (8px)
- `--ifm-spacing-md`: calc(var(--ifm-spacing-unit)) (16px)
- `--ifm-spacing-lg`: calc(var(--ifm-spacing-unit) * 1.5) (24px)
- `--ifm-spacing-xl`: calc(var(--ifm-spacing-unit) * 2) (32px)
- `--ifm-spacing-2xl`: calc(var(--ifm-spacing-unit) * 3) (48px)
- `--ifm-spacing-3xl`: calc(var(--ifm-spacing-unit) * 4) (64px)
- `--ifm-spacing-4xl`: calc(var(--ifm-spacing-unit) * 6) (96px)
- `--ifm-spacing-5xl`: calc(var(--ifm-spacing-unit) * 8) (128px)

### Breakpoints
- `--ifm-breakpoint-xs`: 0px (Mobile first)
- `--ifm-breakpoint-sm`: 576px (Small devices)
- `--ifm-breakpoint-md`: 768px (Medium devices)
- `--ifm-breakpoint-lg`: 992px (Large devices)
- `--ifm-breakpoint-xl`: 1200px (Extra large devices)

### Elevation & Shadows
- `--ifm-shadow-xs`: 0 1px 2px 0 rgba(0, 0, 0, 0.05) (Subtle shadow)
- `--ifm-shadow-sm`: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
- `--ifm-shadow-md`: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
- `--ifm-shadow-lg`: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
- `--ifm-shadow-xl`: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)

### Border Radius
- `--ifm-radius-small`: 4px
- `--ifm-radius-medium`: 8px
- `--ifm-radius-large`: 12px
- `--ifm-radius-full`: 9999px (Circular)

### Z-Index Scale
- `--ifm-z-index-dropdown`: 1000
- `--ifm-z-index-sticky`: 1020
- `--ifm-z-index-fixed`: 1030
- `--ifm-z-index-overlay`: 1040
- `--ifm-z-index-modal`: 1050
- `--ifm-z-index-popover`: 1060
- `--ifm-z-index-tooltip`: 1070

### Component-Specific Variables

#### Navigation
- `--ifm-navbar-height`: 4rem
- `--ifm-navbar-padding-horizontal`: var(--ifm-spacing-md)
- `--ifm-navbar-padding-vertical`: var(--ifm-spacing-sm)
- `--ifm-sidebar-width`: 16rem
- `--ifm-sidebar-width-flipped`: 18rem (when expanded)

#### Cards & Content
- `--ifm-card-padding`: var(--ifm-spacing-lg)
- `--ifm-card-radius`: var(--ifm-radius-medium)
- `--ifm-card-shadow`: var(--ifm-shadow-sm)

#### Buttons
- `--ifm-button-padding-horizontal`: var(--ifm-spacing-lg)
- `--ifm-button-padding-vertical`: var(--ifm-spacing-sm)
- `--ifm-button-radius`: var(--ifm-radius-medium)
- `--ifm-button-size-small`: 0.875rem
- `--ifm-button-size-normal`: 1rem
- `--ifm-button-size-large`: 1.125rem

### Dark Mode Adjustments
For `[data-theme='dark']` selector:

#### Background & Text
- `--ifm-color-background`: #0f172a (Dark background)
- `--ifm-color-surface`: #1e293b (Dark surface)
- `--ifm-color-content`: #f1f5f9 (Light text on dark)
- `--ifm-color-content-secondary`: #cbd5e1 (Secondary light text)

#### Primary Colors (Dark Mode)
- `--ifm-color-primary`: #3b82f6 (Lighter blue for contrast)
- `--ifm-color-primary-dark`: #2563eb
- `--ifm-color-primary-darker`: #1d4ed8
- `--ifm-color-primary-darkest`: #1e40af
- `--ifm-color-primary-light`: #60a5fa
- `--ifm-color-primary-lighter`: #93c5fd
- `--ifm-color-primary-lightest`: #bfdbfe

#### Shadows (Dark Mode)
- `--ifm-shadow-xs`: 0 1px 3px 0 rgba(0, 0, 0, 0.3)
- `--ifm-shadow-sm`: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)