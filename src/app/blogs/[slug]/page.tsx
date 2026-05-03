import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogDetail } from '@/components/blog-detail'
import { getAllArticles, getArticleBySlug } from '@/lib/devto'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    return { title: 'Blog Post Not Found' }
  }

  return {
    title: `${article.title} | Pranta Dutta`,
    description: article.description,
    alternates: {
      canonical: article.canonical_url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.cover_image ? [{ url: article.cover_image }] : [],
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.user.name],
      tags: article.tag_list,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.cover_image ? [article.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!slug || typeof slug !== 'string') {
    notFound()
  }

  // Let transient fetch errors propagate — Next.js does not cache thrown
  // errors, so the next request retries against dev.to. notFound() only
  // fires when getArticleBySlug confirms a real 404.
  const article = await getArticleBySlug(slug)
  if (!article) {
    notFound()
  }

  return <BlogDetail article={article} />
}
