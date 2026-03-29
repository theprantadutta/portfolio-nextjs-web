'use client'

import { useRouter } from 'next/navigation'
import { BsArrowRight } from 'react-icons/bs'

import { DevToArticle } from '@/types/blog-types'
import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { BlogCard } from '@/components/blog-card'

interface PopularBlogsProps {
  articles: DevToArticle[]
}

export const PopularBlogs: React.FC<PopularBlogsProps> = ({ articles }) => {
  const router = useRouter()

  return (
    <section id='blog' className='scroll-mt-28'>
      <SectionMarker section='Blogs' threshold={0.3} />
      <SectionHeading>Popular Blog Posts</SectionHeading>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article) => (
          <BlogCard key={article.id} article={article} />
        ))}
      </div>
      <div className='flex justify-center'>
        <button
          onClick={() => router.push('/blogs')}
          type='button'
          className='btn-primary special-border group relative mt-8 overflow-hidden px-5 py-2.5'
        >
          <span className='relative z-10 flex items-center gap-2'>
            View All Posts
            <BsArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
          </span>
          <div className='animate-gradient from-primary-600 via-secondary-600 to-primary-600 absolute inset-0 bg-linear-to-r bg-size-[200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        </button>
      </div>
    </section>
  )
}
