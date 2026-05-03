import { DevToArticle, DevToArticleDetail } from '@/types/blog-types'

const DEVTO_API_BASE = 'https://dev.to/api'
const DEVTO_USERNAME = 'pranta'
const ONE_HOUR = 60 * 60

export const getAllArticles = async (): Promise<DevToArticle[]> => {
  const response = await fetch(
    `${DEVTO_API_BASE}/articles?username=${DEVTO_USERNAME}&per_page=1000`,
    {
      next: {
        revalidate: ONE_HOUR,
        tags: ['blogs'],
      },
    }
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
  const response = await fetch(
    `${DEVTO_API_BASE}/articles/${DEVTO_USERNAME}/${slug}`,
    {
      next: {
        revalidate: ONE_HOUR,
        tags: ['blog-detail', `blog-detail:${slug}`],
      },
    }
  )

  // Article truly doesn't exist on dev.to — caller should render a 404.
  if (response.status === 404) {
    return null
  }

  // Any other non-OK (429 rate limit, 5xx, network blip) is a TRANSIENT
  // failure. Throw so Next.js does not cache the response. Returning null
  // here would cause notFound() upstream to be cached for the full
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
