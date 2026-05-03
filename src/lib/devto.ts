import { DevToArticle, DevToArticleDetail } from '@/types/blog-types'

const DEVTO_API_BASE = 'https://dev.to/api'
const DEVTO_USERNAME = 'pranta'
const ONE_HOUR = 60 * 60

// Build-time prerender fans out per-article fetches in parallel; cap
// concurrency to 1 AND enforce a minimum gap between requests so a cold-cache
// build (~50 articles) stays under dev.to's anonymous rate limit. Vercel's
// egress IP is shared across many projects, so the limit is effectively even
// stricter than dev.to's nominal ~30 req / 30s per IP. We keep ~0.8 req/sec
// sustained to leave headroom.
const MAX_CONCURRENT_REQUESTS = 1
const MIN_REQUEST_INTERVAL_MS = 1250
const MAX_RETRIES = 6
const BASE_BACKOFF_MS = 1000
const MAX_BACKOFF_MS = 30_000
const MAX_RETRY_AFTER_MS = 60_000

type DevToFetchOptions = {
  revalidate: number
  tags: string[]
}

let inflight = 0
const waiters: Array<() => void> = []
let nextAllowedAt = 0

const acquireSlot = (): Promise<void> => {
  if (inflight < MAX_CONCURRENT_REQUESTS) {
    inflight++
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    waiters.push(() => {
      inflight++
      resolve()
    })
  })
}

const releaseSlot = () => {
  inflight--
  const next = waiters.shift()
  if (next) next()
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// Reserve the next request slot in monotonic order so concurrent callers
// don't all read the same `nextAllowedAt` and stampede.
const waitForRateLimitWindow = async () => {
  const now = Date.now()
  const scheduledAt = Math.max(now, nextAllowedAt)
  nextAllowedAt = scheduledAt + MIN_REQUEST_INTERVAL_MS
  if (scheduledAt > now) {
    await sleep(scheduledAt - now)
  }
}

const computeBackoff = (response: Response, attempt: number): number => {
  const header = response.headers.get('retry-after')
  const retryAfterSec = header ? Number(header) : NaN
  if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
    return Math.min(retryAfterSec * 1000, MAX_RETRY_AFTER_MS)
  }
  // 1s, 2s, 4s, 8s, 16s, 30s (capped) + jitter — totals ~61s of retry budget,
  // long enough to outlast dev.to's typical 30s rate-limit window.
  const exponential = Math.min(BASE_BACKOFF_MS * 2 ** attempt, MAX_BACKOFF_MS)
  return exponential + Math.random() * 500
}

const fetchDevTo = async (
  url: string,
  { revalidate, tags }: DevToFetchOptions
): Promise<Response> => {
  await acquireSlot()
  try {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      await waitForRateLimitWindow()
      const response = await fetch(url, { next: { revalidate, tags } })

      // Definitive outcomes — don't retry success or genuine 404.
      if (response.ok || response.status === 404) {
        return response
      }

      const isTransient = response.status === 429 || response.status >= 500
      if (!isTransient || attempt === MAX_RETRIES) {
        return response
      }

      // Drain body so the connection can be released cleanly before sleeping.
      await response.arrayBuffer().catch(() => {})
      const backoffMs = computeBackoff(response, attempt)
      console.warn(
        `[devto] ${response.status} ${response.statusText} for ${url} — retry ${attempt + 1}/${MAX_RETRIES} in ${Math.round(backoffMs)}ms`
      )
      await sleep(backoffMs)
    }
    // Unreachable: loop returns or throws.
    throw new Error('fetchDevTo: exhausted retries without returning')
  } finally {
    releaseSlot()
  }
}

export const getAllArticles = async (): Promise<DevToArticle[]> => {
  const response = await fetchDevTo(
    `${DEVTO_API_BASE}/articles?username=${DEVTO_USERNAME}&per_page=1000`,
    { revalidate: ONE_HOUR, tags: ['blogs'] }
  )

  if (!response.ok) {
    throw new Error(
      `Dev.to request failed – ${response.status} ${response.statusText}`
    )
  }

  return (await response.json()) as DevToArticle[]
}

export const getArticleBySlug = async (
  slug: string
): Promise<DevToArticleDetail | null> => {
  const response = await fetchDevTo(
    `${DEVTO_API_BASE}/articles/${DEVTO_USERNAME}/${slug}`,
    { revalidate: ONE_HOUR, tags: ['blog-detail', `blog-detail:${slug}`] }
  )

  // Article truly doesn't exist on dev.to — caller should render a 404.
  if (response.status === 404) {
    return null
  }

  // Any other non-OK after retries (sustained 429, 5xx, network blip) is a
  // TRANSIENT failure. Throw so Next.js does not cache the response. Returning
  // null here would cause notFound() upstream to be cached for the full
  // revalidate window, pinning a real article as 404 for an hour.
  if (!response.ok) {
    throw new Error(
      `Dev.to request failed for slug "${slug}" — ${response.status} ${response.statusText}`
    )
  }

  const article = (await response.json()) as DevToArticleDetail

  // The detail endpoint returns tag_list as a string, normalize to array
  if (typeof article.tag_list === 'string') {
    article.tag_list = (article.tag_list as unknown as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
  }

  return article
}

export const getMostLikedArticles = async (
  count: number = 3
): Promise<DevToArticle[]> => {
  const articles = await getAllArticles()
  return articles
    .sort((a, b) => b.public_reactions_count - a.public_reactions_count)
    .slice(0, count)
}
