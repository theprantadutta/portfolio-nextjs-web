# syntax=docker/dockerfile:1

# This repo is locked with bun.lock, so install/build run on the official bun
# image. `next build` with output: 'standalone' emits a plain node server.js, so
# the runtime stage drops back to a slim Node image.
ARG NODE_VERSION=24-slim
ARG BUN_VERSION=1

# ============================================
# Stage 1: install dependencies
# ============================================
FROM oven/bun:${BUN_VERSION} AS deps
WORKDIR /app
COPY package.json bun.lock .npmrc ./
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: build
# ============================================
FROM oven/bun:${BUN_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so they
# have to be present HERE. Setting them at runtime in compose does nothing for
# anything that ships to the browser.
ARG NEXT_PUBLIC_STRAPI_PROD_API_URL
ARG NEXT_PUBLIC_STRAPI_DEV_API_URL
ENV NEXT_PUBLIC_STRAPI_PROD_API_URL=${NEXT_PUBLIC_STRAPI_PROD_API_URL}
ENV NEXT_PUBLIC_STRAPI_DEV_API_URL=${NEXT_PUBLIC_STRAPI_DEV_API_URL}

# Strapi is queried during the build to prerender /projects/[slug] and friends.
# The builder is not attached to the `proxy` network, so this build talks to the
# public Strapi URL above — STRAPI_INTERNAL_URL is deliberately not set here.
ARG STRAPI_API_KEY
ENV STRAPI_API_KEY=${STRAPI_API_KEY}

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN bun run build

# ============================================
# Stage 3: runtime
# ============================================
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

# Writable prerender/ISR cache for the non-root user
RUN mkdir .next && chown node:node .next

# Output file tracing keeps only the dependencies actually reachable at runtime
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
