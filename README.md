# 🌟 Pranta Dutta - Full Stack Developer Portfolio

A **high-performance**, **visually stunning** portfolio website built with Next.js 16, showcasing modern web development best practices and achieving a **perfect 100 Lighthouse score**.

## ⚡ **Perfect Lighthouse Score: 100/100**

This portfolio achieves **perfect scores across all Lighthouse metrics**:

- **Performance: 100** - Optimized images, lazy loading, GPU-accelerated animations
- **Accessibility: 100** - Semantic HTML, proper ARIA labels, keyboard navigation
- **Best Practices: 100** - Modern image formats (WebP/AVIF), secure HTTPS
- **SEO: 100** - Structured data, meta tags, OpenGraph optimization

## ✨ **Key Features**

### 🎨 **Visual Excellence**

- **Smooth Animations**: GPU-accelerated animations using only `transform` and `opacity`
- **Gradient Backgrounds**: Dynamic floating gradient orbs with staggered animations
- **Glass Morphism**: Modern UI with backdrop blur effects and gradient borders
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with fluid layouts

### ⚡ **Performance Optimizations**

- **Modern Image Formats**: Automatic WebP/AVIF serving with fallbacks
- **Advanced Lazy Loading**: Intersection Observer-based component loading
- **Font Optimization**: Local font loading with `font-display: swap`
- **CSS Purging**: Unused Tailwind classes automatically removed
- **Bundle Splitting**: Turbopack's automatic chunking and tree-shaking
- **ISR**: Incremental Static Regeneration with 1-hour revalidation

### 🛠 **Technical Stack**

- **Framework**: Next.js 16 with App Router and React Server Components
- **Styling**: Tailwind CSS v4 with custom animations and utility classes
- **TypeScript**: Fully typed codebase with strict configuration
- **Content**: Strapi CMS integration for dynamic portfolio content
- **Email**: React Email templates with Resend API integration
- **Analytics**: Vercel Analytics and Speed Insights
- **Hosting**: Self-hosted on a VPS via Docker + Traefik

### 📱 **Dynamic Content**

- **Project Showcase**: Interactive project cards with detailed modal views
- **Experience Timeline**: Professional experience with smooth animations
- **Skills Grid**: Technology stack visualization with hover effects
- **Contact Form**: Server-side validation with email notifications
- **Image Galleries**: Optimized galleries with thumbnail navigation

## 🚀 **Getting Started**

### Prerequisites

- Node.js ≥ 24.0.0
- [Bun](https://bun.com) package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/prantadutta/portfolio-nextjs-web.git

# Navigate to project directory
cd portfolio-nextjs-web

# Install dependencies
bun install

# Start development server
bun dev
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill it in:

```bash
# Strapi CMS Configuration
STRAPI_API_KEY=your_strapi_api_key
NEXT_PUBLIC_STRAPI_DEV_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_PROD_API_URL=your_production_strapi_url

# Email Configuration
RESEND_API_KEY=your_resend_api_key
```

Note that `NEXT_PUBLIC_*` values are inlined into the client bundle at **build
time** — changing them requires a rebuild, not just a restart.

### Development Commands

```bash
bun dev           # Start development server
bun run build     # Build for production
bun start         # Start production server
bun run lint      # Run ESLint
bun format        # Check code formatting
bun format:fix    # Fix code formatting
npx tsc --noEmit  # Typecheck
```

Use `bun run build` / `bun run lint` rather than `bun build` / `bun lint` —
the bare forms invoke Bun's own bundler and linter instead of the package
scripts.

## 🐳 **Deployment**

The site is self-hosted on a VPS behind [Traefik](https://traefik.io), alongside
the Strapi CMS container.

```bash
docker compose build
docker compose up -d --remove-orphans
```

- `next.config.ts` sets `output: 'standalone'`, so the runtime image only ships
  the traced dependencies and runs `node server.js` on port 3000.
- The container joins the external `proxy` network shared with Traefik and
  Strapi. Server-side data fetching can therefore talk to the CMS directly over
  the Docker network via `STRAPI_INTERNAL_URL`, skipping a public roundtrip.
  Browser-facing media URLs continue to use the public
  `NEXT_PUBLIC_STRAPI_PROD_API_URL`.
- Traefik serves `pranta.dev`, `www.pranta.dev`, and `*.pranta.dev`. The
  wildcard router runs at a deliberately low priority so `portfolio.pranta.dev`
  still resolves to the CMS.

> TLS is issued by a dedicated `cloudflare` DNS-01 resolver in Traefik — a
> wildcard certificate cannot be issued over the HTTP-01 challenge used by the
> other services on the host.

## 🏗 **Architecture**

### Performance Features

- **Static Generation**: Pages pre-rendered at build time for optimal speed
- **Image Optimization**: Next.js Image component with modern format support
- **Code Splitting**: Automatic bundle optimization with lazy loading
- **Resource Hints**: Preconnect and DNS-prefetch for external resources
- **CSS Containment**: Layout isolation for improved rendering performance

### SEO & Accessibility

- **Structured Data**: JSON-LD schema for enhanced search visibility
- **Meta Tags**: Comprehensive OpenGraph and Twitter Card support
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Keyboard Navigation**: Full accessibility support with focus management

## 📊 **Performance Metrics**

- **First Contentful Paint (FCP)**: < 1.2s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Bundle Size**: Optimized with tree-shaking and code splitting

## 🎨 **Design System**

The portfolio features a carefully crafted design system with:

- **Custom CSS Variables**: Dynamic theming support
- **Glass Morphism**: Modern UI patterns with backdrop effects
- **Gradient System**: Consistent color schemes across components
- **Typography Scale**: Harmonious font sizing and spacing
- **Animation Library**: GPU-optimized transitions and effects

## 📱 **Browser Support**

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern browsers with WebP/AVIF support for optimal image loading.

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by [Pranta Dutta](https://github.com/prantadutta)**
