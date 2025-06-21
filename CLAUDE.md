# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal portfolio website for Sunny Aggarwal, showcasing multiple professional and personal facets including technology ventures, outdoor adventures, and investments.

## Key Commands

```bash
# Install Ruby dependencies
bundle install

# Run development server (http://localhost:4000)
bundle exec jekyll serve

# Build static site to _site directory
bundle exec jekyll build

# Build with production environment
JEKYLL_ENV=production bundle exec jekyll build
```

## Architecture & Structure

### Technology Stack
- **Static Site Generator**: Jekyll 4.4.1
- **Frontend**: Vanilla JavaScript (no framework)
- **Maps**: MapLibre GL JS
- **Styling**: Custom CSS (no CSS framework)
- **Data**: YAML files in `_data/`

### JavaScript Component Architecture

The codebase uses a modular component system with the following reusable components:

1. **Lightbox** (`assets/js/lightbox.js`): Full-featured image gallery with keyboard navigation
2. **Modal** (`assets/js/modal.js`): Universal modal system with custom events
3. **PhotoGrid** (`assets/js/photo-grid.js`): Responsive photo grids with lightbox integration
4. **CustomTravelMap** (`assets/js/custom-travel-map.js`): Interactive MapLibre GL map with 152+ locations
5. **Adventure Components** (`assets/js/adventure-components.js`):
   - `createActivityHeader`, `createStorySection`, `createStatGrid`
   - `createAchievementList`, `createActivitySection`
   - Activity modal management functions

### Data Management

1. **YAML Data Files** (`_data/`):
   - `investments.yml`: Portfolio entries with metadata
   - `investment_categories.yml`: Investment categorization
   - `tokens.yml`: Cryptocurrency holdings

2. **JavaScript Data Objects**:
   - Project data embedded in `founder.html`
   - Photo collections in `adventurer.html`
   - Location data in `custom-travel-map.js`

### Page-Specific Features

- **Founder Page**: Card-based project showcase with FLIP animations
- **Adventurer Page**: Merit badge system, quest filtering, activity modals
- **Investor Page**: Portfolio filtering with smooth transitions
- **Homepage**: Dynamic navigation system

### Key Implementation Patterns

1. **Module Pattern**: Components use CommonJS exports for compatibility
2. **Event-Driven**: Custom events (e.g., `modal:opened`, `lightbox:change`)
3. **Animation Techniques**: FLIP animations, CSS transitions, transform-based effects
4. **Progressive Enhancement**: Features degrade gracefully without JavaScript
5. **Responsive Design**: Mobile-first CSS with media queries

## Development Workflow

1. **Adding New Components**:
   - Create new JS file in `assets/js/`
   - Use consistent module pattern with exports
   - Include error handling and mobile support

2. **Modifying Content**:
   - Static data: Edit YAML files in `_data/`
   - Dynamic data: Update JavaScript objects in HTML files
   - Images: Add to appropriate `assets/` subdirectory

3. **Styling Guidelines**:
   - Component-specific styles in dedicated CSS files
   - Use CSS custom properties for theming
   - Maintain mobile-first approach

4. **Testing Checklist**:
   - Run `bundle exec jekyll serve` for live reload
   - Test all interactive features
   - Verify responsive design at key breakpoints
   - Check browser console for errors
   - Test keyboard navigation and accessibility

## File Organization

```
assets/
├── js/
│   ├── lightbox.js           # Image gallery component
│   ├── modal.js              # Modal system
│   ├── photo-grid.js         # Photo grid layouts
│   ├── custom-travel-map.js  # Interactive map
│   └── adventure-components.js # Adventure page components
├── css/
│   ├── style.css            # Global styles
│   └── [page-name].css      # Page-specific styles
├── images/                  # General images
├── logos/                   # Company/project logos
├── merit_badges/            # Activity badges
└── token_logos/             # Cryptocurrency logos
```