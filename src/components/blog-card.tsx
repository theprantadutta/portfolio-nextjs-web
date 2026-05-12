'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FiClock, FiHeart, FiMessageCircle, FiCalendar } from 'react-icons/fi'

import { DevToArticle } from '@/types/blog-types'
import { useAnimationOnScroll } from '@/lib/animation-hooks'

interface BlogCardProps {
  article: DevToArticle
}

export const BlogCard: React.FC<BlogCardProps> = ({ article }) => {
  const router = useRouter()
  const animation = useAnimationOnScroll({
    delay: 200,
    animationClass: 'animate-fade-in-up',
  })

  return (
    /* eslint-disable react-hooks/refs -- Animation hook pattern: ref and className are designed to be used during render */
    <div
      ref={animation.ref as React.RefObject<HTMLDivElement>}
      className={`h-full ${animation.className}`}
    >
      {/* eslint-enable react-hooks/refs */}
      <div
        onClick={() => router.push(`/blogs/${article.slug}`)}
        className='special-border glass-card group relative flex h-full cursor-pointer flex-col overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xs transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:shadow-2xl dark:border-gray-700/30 dark:bg-gray-900/20 dark:hover:bg-gray-900/30'
      >
        {/* Gradient overlay on hover */}
        <div className='from-primary-500/10 via-secondary-500/10 to-accent-500/10 absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Cover Image — dev.to standard cover ratio is 1000:420; matching the
            container avoids the cover/cropping mismatch we'd see with aspect-video. */}
        <div className='relative aspect-[1000/420] shrink-0 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
          {article.cover_image ? (
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='from-primary-500/20 via-secondary-500/20 to-accent-500/20 flex h-full items-center justify-center bg-linear-to-br'>
              <FiBookOpenIcon className='h-12 w-12 text-gray-400 dark:text-gray-600' />
            </div>
          )}

          {/* Reading time badge */}
          <div className='special-border glass-card absolute top-3 right-3 bg-black/30 px-2.5 py-1 backdrop-blur-xs'>
            <span className='flex items-center gap-1 text-xs font-medium text-white'>
              <FiClock className='h-3 w-3' />
              {article.reading_time_minutes} min
            </span>
          </div>
        </div>

        {/* Content - grows to fill available space */}
        <div className='relative z-10 flex flex-1 flex-col space-y-3 p-5'>
          {/* Title - fixed 2-line height */}
          <h3 className='line-clamp-2 min-h-[3.25rem] bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-lg leading-tight font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white'>
            {article.title}
          </h3>

          {/* Description - fixed 2-line height */}
          <p className='line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
            {article.description}
          </p>

          {/* Tags - pushed to bottom of content area */}
          <div className='mt-auto flex flex-wrap gap-2'>
            {article.tag_list.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className='special-border glass-card bg-linear-to-r from-gray-500/10 to-gray-600/10 px-3 py-1 text-xs font-medium text-gray-700 transition-transform duration-200 hover:scale-105 dark:text-gray-300'
              >
                {tag}
              </span>
            ))}
            {article.tag_list.length > 3 && (
              <span className='special-border glass-card bg-linear-to-r from-orange-500/10 to-red-500/10 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400'>
                +{article.tag_list.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Stats Bar - always pinned to bottom */}
        <div className='shrink-0 border-t border-white/10 bg-white/5 px-5 py-3 dark:border-gray-700/30 dark:bg-gray-900/20'>
          <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-4'>
              <span className='flex items-center gap-1.5'>
                <FiHeart className='h-3.5 w-3.5 text-red-500' />
                {article.public_reactions_count}
              </span>
              <span className='flex items-center gap-1.5'>
                <FiMessageCircle className='h-3.5 w-3.5 text-blue-500' />
                {article.comments_count}
              </span>
            </div>
            <span className='flex items-center gap-1.5'>
              <FiCalendar className='h-3.5 w-3.5' />
              {article.readable_publish_date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple fallback icon for missing cover images
const FiBookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentColor'
    className={className}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.331 0 4.472.89 6.077 2.35m0-14.308A8.967 8.967 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.331 0-4.472.89-6.077 2.35'
    />
  </svg>
)
