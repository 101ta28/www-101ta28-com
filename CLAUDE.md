# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Vue 3, Vuetify 3, and Vite. The site features a modern Japanese language interface and includes sections for home, work portfolio, blog links, and contact information. The site has been recently redesigned with improved UX, visual design, and functionality.

## Common Commands

- **Development server**: `npm run dev` or `yarn dev` or `bun dev` (runs on http://localhost:3000)
- **Build for production**: `npm run build` or `yarn build` or `bun build`
- **Preview production build**: `npm run preview` or `yarn preview` or `bun preview`
- **Lint code**: `npm run lint` or `yarn lint` or `bun lint` (auto-fixes issues)

## Architecture & Key Technologies

### Core Stack
- **Vue 3** with Composition API and `<script setup>` syntax
- **Vuetify 3** for Material Design components and theming
- **Vite** for build tooling and development server
- **Vue Router** with automatic file-based routing via `unplugin-vue-router`

### File-Based Routing
- Pages are automatically generated from `src/pages/*.vue` files
- Route definitions are handled by `unplugin-vue-router`
- Special file: `src/pages/[...path].vue` handles 404/catch-all routes

### Component Structure
- **Main app**: `src/App.vue` provides the basic layout with AppBar and router-view
- **Pages**: Located in `src/pages/` - these are route components that typically import corresponding components from `src/components/`
- **Components**: Located in `src/components/` - reusable UI components with modern card-based layouts
- **Global AppBar**: `src/components/AppBar.vue` handles navigation, theme switching, and mobile drawer

### Page-Specific Components

#### IndexComp.vue (Home Page)
- Hero section with profile avatar and call-to-action buttons
- About Me section with cards and chip-based interests
- Skills section organized by frontend/backend/tools categories
- Contact call-to-action section
- Compact spacing optimized for both desktop and mobile

#### WorkComp.vue (Portfolio Page) 
- Advanced filtering system by category and technology stack
- Card-based work showcase with images, descriptions, and tech chips
- Category badges and year indicators
- Empty state handling for filtered results
- Responsive grid layout with hover effects

#### ContactComp.vue (Contact Page)
- Social media links with platform-specific styling
- GPG encryption information in collapsible panel
- Copy-to-clipboard functionality for GPG fingerprint and public key
- No contact form (removed per requirements)
- Updated platform names (X instead of Twitter)

#### AppBar.vue (Header Navigation)
- Logo with profile image and brand name
- Active route highlighting for navigation items
- Scroll-based shadow effects and backdrop blur
- Mobile-first responsive drawer with profile information
- Theme toggle with animation effects
- External link indicators

### Styling & Theming
- Uses Vuetify's built-in theming system with enhanced light/dark mode toggle
- Custom SCSS configuration in `src/styles/settings.scss`
- Material Design Icons (`@mdi/font`) for iconography
- Roboto font loaded via `unplugin-fonts`
- Consistent spacing using Vuetify's spacing system (mb-8, pa-6, etc.)
- Custom animations and hover effects throughout

### Key Plugins & Configuration
- **Auto-importing**: Components are automatically imported via `unplugin-vue-components`
- **Asset handling**: Vuetify's `transformAssetUrls` for proper asset resolution
- **Alias**: `@` points to `src/` directory
- **Port**: Development server runs on port 3000

### Deployment
- Configured for Netlify deployment with `netlify.toml`
- Includes CORS headers configuration
- Uses `public/_redirects` for SPA routing support

## Design Patterns & Code Standards

### Component Design
- Use card-based layouts with elevation and hover effects
- Implement responsive design with Vuetify's breakpoint system
- Follow consistent spacing patterns (mb-8 for sections, pa-6 for cards)
- Use chip components for tags and technology stacks
- Implement loading states and empty state handling

### Data Structure
- Work items include: id, year, title, text, tech, techArray, category, categoryColor
- Social links include: title, icon, iconColor, color, link, description, external
- Navigation links include: icon, text, pageLink, external flags

### Interactivity
- Filter functionality using computed properties and reactive data
- Copy-to-clipboard with user feedback via snackbars
- Theme switching with persistent state
- Mobile drawer with smooth animations
- Active route detection and highlighting

### Performance Considerations
- Use computed properties for filtering and derived state
- Implement efficient scroll event handling with lifecycle hooks
- Lazy load images where appropriate
- Minimize re-renders with proper reactive patterns

## Code Patterns

- Use Vue 3 Composition API with `<script setup>` syntax exclusively
- Components use Vuetify's `v-` prefixed components with consistent props
- Responsive design with `useDisplay()` composable and breakpoint classes
- Theme switching via `useTheme()` composable with animation effects
- Route awareness using `useRoute()` for active state detection
- External links handled with `target="_blank"` and appropriate indicators
- Color theming using Vuetify's color system (primary, secondary, etc.)
- Consistent use of Material Design Icons with semantic naming