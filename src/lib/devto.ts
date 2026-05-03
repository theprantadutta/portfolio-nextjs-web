import { DevToArticle, DevToArticleDetail } from '@/types/blog-types'

const DEVTO_API_BASE = 'https://dev.to/api'
const DEVTO_USERNAME = 'pranta'
const ONE_HOUR = 60 * 60

// Build-time prerender fans out per-article fetches in parallel; cap concurrency
// so we don't trip dev.to's anonymous rate limit (~30 req / 30s).
const MAX_CONCURRENT_REQUESTS = 3
const MAX_RETRIES = 4
const BASE_BACKOFF_MS = 750

type DevToFetchOptions = {
  revalidate: number
  tags: string[]
}

let inflight = 0
const waiters: Array<() => void> = []

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

const computeBackoff = (response: Response, attempt: number): number => {
  const header = response.headers.get('retry-after')
  const retryAfterSec = header ? Number(header) : NaN
  if (Number.isFinite(retryAfterSec) && retryAfterSec > 0) {
    return retryAfterSec * 1000
  }
  return BASE_BACKOFF_MS * 2 ** attempt + Math.random() * 500
}

const fetchDevTo = async (
  url: string,
  { revalidate, tags }: DevToFetchOptions
): Promise<Response> => {
  await acquireSlot()
  try {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
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
      await sleep(computeBackoff(response, attempt))
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
