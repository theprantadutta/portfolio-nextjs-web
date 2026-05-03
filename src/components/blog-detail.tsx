import Image from 'next/image'
import Link from 'next/link'
import {
  FiArrowLeft,
  FiClock,
  FiHeart,
  FiMessageCircle,
  FiCalendar,
  FiExternalLink,
} from 'react-icons/fi'

import { DevToArticleDetail } from '@/types/blog-types'

interface BlogDetailProps {
  article: DevToArticleDetail
}

export const BlogDetail = ({ article }: BlogDetailProps) => {
  return (
    <div className='relative min-h-screen'>
      {/* Background Gradients */}
      <div className='fixed inset-0 -z-10'>
        <div className='from-primary-500/20 to-secondary-600/20 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-linear-to-br blur-3xl' />
        <div
          className='from-accent-500/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-linear-to-br to-orange-500/20 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-linear-to-br from-green-500/15 to-teal-500/15 blur-3xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Back Button */}
      <div className='fixed top-4 left-4 z-50'>
        <Link
          href='/blogs'
          className='special-border glass-card group flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
        >
          <FiArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className='text-sm font-medium'>Back to Blogs</span>
        </Link>
      </div>

      {/* Hero Section */}

      <section
        className='animate-fade-in-up relative px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8'
        style={{ '--animation-delay': '100ms' } as React.CSSProperties}
      >
        <div className='mx-auto max-w-4xl'>
          {/* Cover Image */}
          {article.cover_image && (
            <div className='special-border relative mb-8 aspect-video overflow-hidden'>
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px'
                className='object-cover'
              />
            </div>
          )}

          {/* Title */}
          <h1 className='mb-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl md:text-5xl dark:from-white dark:via-gray-100 dark:to-white'>
            {article.title}
          </h1>

          {/* Meta Row */}
          <div className='mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
            <span className='flex items-center gap-1.5'>
              <FiCalendar className='h-4 w-4' />
              {article.readable_publish_date}
            </span>
            <span className='flex items-center gap-1.5'>
              <FiClock className='h-4 w-4' />
              {article.reading_time_minutes} min read
            </span>
            <span className='flex items-center gap-1.5'>
              <FiHeart className='h-4 w-4 text-red-500' />
              {article.public_reactions_count} reactions
            </span>
            <span className='flex items-center gap-1.5'>
              <FiMessageCircle className='h-4 w-4 text-blue-500' />
              {article.comments_count} comments
            </span>
          </div>

          {/* Tags */}
          <div className='mb-8 flex flex-wrap gap-2'>
            {article.tag_list.map((tag) => (
              <span
                key={tag}
                className='special-border glass-card bg-linear-to-r from-gray-500/10 to-gray-600/10 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article Body */}

      <section
        className='animate-fade-in-up px-4 pb-16 sm:px-6 lg:px-8'
        style={{ '--animation-delay': '300ms' } as React.CSSProperties}
      >
        <div className='mx-auto max-w-4xl'>
          <div className='special-border glass-card overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xs dark:border-gray-700/30 dark:bg-gray-900/20'>
            <div
              className='prose prose-lg prose-gray dark:prose-invert max-w-none p-6 sm:p-8 md:p-10'
              dangerouslySetInnerHTML={{ __html: article.body_html }}
            />
          </div>

          {/* Footer - Read on dev.to */}
          <div className='mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between'>
            <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
              <span className='flex items-center gap-1.5'>
                <FiHeart className='h-4 w-4 text-red-500' />
                {article.public_reactions_count} reactions
              </span>
              <span className='flex items-center gap-1.5'>
                <FiMessageCircle className='h-4 w-4 text-blue-500' />
                {article.comments_count} comments
              </span>
            </div>

            <a
              href={article.url}
              target='_blank'
              rel='noopener noreferrer'
              className='btn-primary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
            >
              <span>Read on dev.to</span>
              <FiExternalLink className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
