export const IS_PROD = process.env.NODE_ENV === 'production'

/**
 * Browser-facing Strapi origin.
 *
 * This is inlined into the client bundle at build time (NEXT_PUBLIC_*), and is
 * what `getStrapiMedia()` uses to build `<Image>` sources. It MUST stay a
 * publicly reachable URL — a Docker-internal hostname would not resolve here.
 */
export const STRAPI_URL = IS_PROD
  ? process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL
  : process.env.NEXT_PUBLIC_STRAPI_DEV_API_URL

/**
 * Server-only Strapi origin used for data fetching.
 *
 * On the VPS the web and CMS containers share the external `proxy` network, so
 * `STRAPI_INTERNAL_URL` can point straight at the Strapi container
 * (http://portfolio-strapi-cms:1337) and skip the public roundtrip + TLS.
 *
 * It has no NEXT_PUBLIC_ prefix, so it is a true runtime variable — change it
 * in compose and restart, no image rebuild needed. In the client bundle it is
 * replaced with `undefined` and this falls back to the public URL, which is
 * also what happens during `docker build` (the builder is not attached to the
 * `proxy` network, so the build must reach Strapi over the public URL).
 */
export const STRAPI_SERVER_URL = process.env.STRAPI_INTERNAL_URL || STRAPI_URL

export const STRAPI_API_URL = STRAPI_SERVER_URL + '/api'
