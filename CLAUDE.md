# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
yarn clean && next dev        # Clean and start development server
yarn dev                      # Start development server (calls clean first)

# Building and Production
yarn build                    # Build for production
yarn start                    # Start production server

# Code Quality
yarn lint                     # Run ESLint
yarn format                   # Check code formatting with Prettier
yarn format:fix               # Fix code formatting with Prettier

# Git Hooks
yarn prepare                  # Set up Husky git hooks
yarn lint-staged              # Run lint-staged (used by pre-commit hook)
```

## Project Architecture

This is a Next.js 15 portfolio website with server-side rendering, featuring:

### Core Structure

- **App Router**: Uses Next.js 13+ app directory structure (`src/app/`)
- **TypeScript**: Fully typed codebase with strict TypeScript configuration
- **Tailwind CSS**: Utility-first styling with custom animations and responsive design
- **Content Management**: Strapi CMS integration for dynamic content (projects, experiences, skills)

### Key Directories

- `src/app/`: Next.js app router pages and layouts
- `src/components/`: Reusable React components organized by feature
- `src/context/`: React Context providers for state management
- `src/lib/`: Utility functions, hooks, and data fetching logic
- `src/actions/`: Server actions for form handling
- `src/types/`: TypeScript type definitions
- `src/constants/`: Application constants and configuration

### State Management

- **Active Section Context**: Tracks which portfolio section is currently in view for navigation highlighting
- **Theme Context**: Manages dark/light theme switching with localStorage persistence
- **Intersection Observer**: Custom hooks for section visibility detection and scroll animations

### Data Layer

- **Strapi Integration**: Headless CMS for managing portfolio content
  - Uses Bearer token authentication (`STRAPI_API_KEY`)
  - Fetches experiences, projects, and skills dynamically
  - Supports both development and production API URLs
- **Server-side Fetching**: Data fetched at build time using Next.js server components

### Email Integration

- **Resend API**: Handles contact form submissions via server actions
- **React Email**: Templated emails with React components

### Key Features

- Responsive design with mobile-first approach
- Smooth scroll animations and intersection observers
- Dark/light theme with system preference detection
- Contact form with server-side validation
- Project showcase with detailed pages
- Skills and experience timeline
- SEO optimized with proper metadata

### Environment Variables Required

- `STRAPI_API_KEY`: Authentication for Strapi CMS
- `NEXT_PUBLIC_STRAPI_DEV_API_URL`: Development Strapi URL
- `NEXT_PUBLIC_STRAPI_PROD_API_URL`: Production Strapi URL
- `RESEND_API_KEY`: For contact form email functionality

### Development Notes

- Uses Yarn as package manager
- Husky + lint-staged for pre-commit hooks
- React 19 with experimental React Compiler enabled
- Vercel Analytics and Speed Insights integrated
- Prettier + ESLint for code formatting and linting
- Node.js >=20 required

### Component Patterns

- Functional components with TypeScript interfaces
- Custom hooks for reusable logic (intersection observers, section tracking)
- Server components for data fetching, client components for interactivity
- Context providers wrapped at layout level for global state

### Performance Optimizations

- **Modern Image Formats**: Automatic WebP/AVIF serving via Next.js Image optimization
- **Lazy Loading**: Advanced intersection observer-based component lazy loading
- **Font Optimization**: Local font loading with `font-display: swap` for zero layout shift
- **CSS Optimization**: Tailwind purging and GPU-accelerated animations (transform/opacity only)
- **Bundle Optimization**: Webpack chunk splitting and vendor separation
- **ISR**: Incremental Static Regeneration with 1-hour revalidation
- **Resource Hints**: Preconnect/DNS-prefetch for external resources
- **SEO**: Comprehensive metadata, OpenGraph, structured data, and Twitter cards

### Lighthouse Score Optimizations

- All animations use `will-change`, `transform`, and `opacity` for GPU acceleration
- CSS containment (`contain: layout style paint`) for performance isolation
- Optimized image loading with blur placeholders and proper `sizes` attributes
- Advanced lazy loading with configurable intersection thresholds
- Static generation where possible with ISR for dynamic content
