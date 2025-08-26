# 🌟 Pranta Dutta - Full Stack Developer Portfolio

A **high-performance**, **visually stunning** portfolio website built with Next.js 15, showcasing modern web development best practices and achieving a **perfect 100 Lighthouse score**.

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
- **Bundle Splitting**: Optimized webpack chunks with vendor separation
- **ISR**: Incremental Static Regeneration with 1-hour revalidation

### 🛠 **Technical Stack**

- **Framework**: Next.js 15 with App Router and React Server Components
- **Styling**: Tailwind CSS with custom animations and utility classes
- **TypeScript**: Fully typed codebase with strict configuration
- **Content**: Strapi CMS integration for dynamic portfolio content
- **Email**: React Email templates with Resend API integration
- **Analytics**: Vercel Analytics and Speed Insights

### 📱 **Dynamic Content**

- **Project Showcase**: Interactive project cards with detailed modal views
- **Experience Timeline**: Professional experience with smooth animations
- **Skills Grid**: Technology stack visualization with hover effects
- **Contact Form**: Server-side validation with email notifications
- **Image Galleries**: Optimized galleries with thumbnail navigation

## 🚀 **Getting Started**

### Prerequisites

- Node.js ≥ 20.0.0
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/prantadutta/portfolio-nextjs-web.git

# Navigate to project directory
cd portfolio-nextjs-web

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Strapi CMS Configuration
STRAPI_API_KEY=your_strapi_api_key
NEXT_PUBLIC_STRAPI_DEV_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_PROD_API_URL=your_production_strapi_url

# Email Configuration
RESEND_API_KEY=your_resend_api_key
```

### Development Commands

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn format       # Check code formatting
yarn format:fix   # Fix code formatting
```

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
