# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
# Development
bun dev                       # Start development server (calls clean first)
bun clean                     # Remove the .next directory

# Building and Production
bun run build                 # Build for production (prebuild cleans .next)
bun start                     # Start production server

# Code Quality
bun run lint                  # Run ESLint
bun format                    # Check code formatting with Prettier
bun format:fix                # Fix code formatting with Prettier
npx tsc --noEmit              # Typecheck

# Git Hooks
bun prepare                   # Set up Husky git hooks
bun lint-staged               # Run lint-staged (used by pre-commit hook)
```

Note: `bun run build`/`bun run lint` (not bare `bun build`/`bun lint`) — `bun build`
is Bun's own bundler and will not invoke the package script.

## Project Architecture

This is a Next.js 16 portfolio website with server-side rendering, featuring:

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
- **Intersection Observer**: `useIntersectionObserver` backs section tracking for
  nav highlighting only. Scroll reveals are pure CSS — see below

### Data Layer

- **Strapi Integration**: Headless CMS for managing portfolio content
  - Uses Bearer token authentication (`STRAPI_API_KEY`)
  - Fetches experiences, projects, and skills dynamically
  - Supports both development and production API URLs
- **Server-side Fetching**: Data fetched at build time using Next.js server components

#### Two Strapi origins (`src/constants/urls.ts`)

The app deliberately resolves Strapi through two separate constants. Do not
collapse them:

- `STRAPI_URL` — browser-facing, from `NEXT_PUBLIC_STRAPI_{DEV,PROD}_API_URL`.
  Inlined into the client bundle at build time and used by `getStrapiMedia()`
  for `<Image>` sources, so it **must** be a publicly reachable URL.
- `STRAPI_SERVER_URL` / `STRAPI_API_URL` — server-only, from
  `STRAPI_INTERNAL_URL`, falling back to `STRAPI_URL` when unset. In production
  this points at the Strapi container over the shared Docker network
  (`http://portfolio-strapi-cms:1337`), skipping the public roundtrip and TLS.

Because `STRAPI_INTERNAL_URL` has no `NEXT_PUBLIC_` prefix it is a true runtime
variable (change it in compose and restart — no rebuild), and it is replaced
with `undefined` in the client bundle, so the internal hostname never reaches a
browser.

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

See `.env.example`. Local development reads `.env.local`.

| Variable                          | Scope                | Notes                                                                            |
| --------------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_STRAPI_PROD_API_URL` | build time           | Public Strapi URL, baked into the client bundle. Changing it needs a rebuild.    |
| `NEXT_PUBLIC_STRAPI_DEV_API_URL`  | build time           | Public Strapi URL for development.                                               |
| `STRAPI_API_KEY`                  | build + runtime      | Bearer token. Needed at build time too, since pages are prerendered from Strapi. |
| `RESEND_API_KEY`                  | runtime              | Contact form email delivery.                                                     |
| `STRAPI_INTERNAL_URL`             | runtime, server-only | Docker-internal Strapi origin. Optional; falls back to the public URL.           |

### Deployment (self-hosted VPS + Traefik)

The site is self-hosted (previously Vercel). `Dockerfile` + `compose.yml` mirror
the setup in `../portfolio-strapi-cms`.

- `next.config.ts` sets `output: 'standalone'`; the runtime image just runs
  `node server.js` on port 3000.
- Multi-stage build: install and build run on `oven/bun:1` (the repo is locked
  with `bun.lock`), then the runtime stage drops to `node:24-slim` and runs
  `node server.js` as the non-root `node` user.
  - Do **not** try to slim this down by copying the `bun` binary into a Node
    image — that fails with a wall of `IntegrityCheckFailed extracting tarball`
    errors during `bun install`. Use the official bun image for those stages.
- The container joins the **external** `proxy` network shared with Traefik and
  the Strapi container.
- Compose reads build args from `.env` via variable substitution and runtime
  values from `.env`/`.env.local` via `env_file`. Both are optional for
  `env_file`, but the build args are required — a build with no `.env` fails
  fast rather than baking an empty URL.

Routing: `pranta.dev` and `www.pranta.dev` on an exact-host router
(priority 100), plus a `*.pranta.dev` `HostRegexp` catch-all at **priority 1**.
The low priority is load-bearing — Traefik's default priority is the rule
length, and the wildcard rule is longer than the CMS's
``Host(`portfolio.pranta.dev`)``, so without it the wildcard would hijack the
backend.

Both routers use the **`cloudflare`** cert resolver, not `letsencrypt`. A
wildcard certificate can only be issued over a DNS-01 challenge, and the
`letsencrypt` resolver on the VPS is HTTP-01. The Traefik static config
(`/root/traefik/traefik.yml`, not in any repo) therefore defines two resolvers:

- `letsencrypt` — HTTP-01, used by every other service on the box. Untouched.
- `cloudflare` — DNS-01 via the Cloudflare provider, separate storage at
  `/acme-dns.json`, token supplied as `CF_DNS_API_TOKEN` from
  `/root/traefik/.env`.

Both routers declare identical `tls.domains` (`pranta.dev` + `*.pranta.dev`) so
a single certificate covers the apex, www, and all subdomains.

```bash
docker compose build
docker compose up -d --remove-orphans
```

### Development Notes

- Uses **Bun** as package manager (`bun.lock`); scripts shell out to `bunx`
- Husky + lint-staged for pre-commit hooks
- React 19. The React Compiler is not enabled
- No analytics. Vercel Analytics/Speed Insights were removed when the site left
  Vercel — they 404'd on every page load against the VPS
- ESLint uses the **flat config** (`eslint.config.mjs`); there is no `.eslintrc`
- Prettier + ESLint for code formatting and linting
- Node.js >=24 required (`engines`)

### Component Patterns

- Functional components with TypeScript interfaces
- Server components by default; `'use client'` only where there is real state,
  an event handler, or a browser API. Navigation uses `next/link`, never
  `useRouter().push` inside an `onClick` — that needlessly makes a component
  client-side and produces markup no keyboard or crawler can use
- Context providers wrapped at layout level for global state
- `useSectionInView` / `SectionMarker` are deliberate: tiny client sentinels
  that keep the active-section context in sync without making whole sections
  client components

### Performance Optimizations

- **Modern Image Formats**: Automatic WebP/AVIF serving via Next.js Image optimization
- **Font Optimization**: Local font loading with `font-display: swap` for zero layout shift
- **CSS Optimization**: Tailwind purging and GPU-accelerated animations (transform/opacity only)
- **Bundle Optimization**: Turbopack defaults
- **ISR**: Incremental Static Regeneration with 1-hour revalidation
- **Resource Hints**: Preconnect/DNS-prefetch for external resources
- **SEO**: Comprehensive metadata, OpenGraph, structured data, and Twitter cards

### Scroll reveal animations

The `reveal` utility in `globals.css` is the only reveal mechanism. It is pure
CSS, driven by `animation-timeline: view()` behind `@supports` and
`prefers-reduced-motion`.

Content is **visible by default** and the animation is layered on top. Do not
reintroduce JS-gated reveals: the previous `useAnimationOnScroll` /
`useStaggeredAnimation` hooks shipped elements as `opacity-0` and revealed them
from an IntersectionObserver callback, so anything that stopped the observer
firing left content invisible forever. That is exactly what happened — an
`IntersectionObserver` ratio is measured against the _target's_ area, so a
container taller than 10x the viewport could never cross the `0.1` threshold and
long project pages rendered blank.

For the same reason `animation-range` is length-based (`entry 0% entry 300px`),
not a percentage: a percentage of a very tall element is thousands of pixels of
scrolling.

### `ssr: false` is a last resort

`dynamic(..., { ssr: false })` keeps a component out of the prerendered HTML
entirely. It once wrapped a project page's whole body, so pages prerendered to
an empty shell. Only reach for it when a component genuinely cannot render on
the server (`theme-switch-lazy` is the legitimate case — it avoids a theme
hydration mismatch). Client components server-render fine; needing `useState`
is not a reason to disable SSR.
