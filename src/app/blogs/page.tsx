import { Metadata } from 'next'

import { Blogs } from '@/components/blogs'
import { getAllArticles } from '@/lib/devto'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog | Pranta Dutta',
  description:
    'Technical articles and insights about Flutter, mobile development, web technologies, and software engineering by Pranta Dutta.',
  openGraph: {
    title: 'Blog | Pranta Dutta',
    description:
      'Technical articles and insights about Flutter, mobile development, and software engineering.',
    url: '/blogs',
    type: 'website',
  },
}

export default async function BlogsPage() {
  const articles = await getAllArticles()

  return (
    <main className='flex flex-col items-center px-4 pt-28 pb-20'>
      <Blogs articles={articles} />
    </main>
  )
}
