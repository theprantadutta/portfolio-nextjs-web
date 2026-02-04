'use client'

import React, { ReactNode } from 'react'
import { useStaggeredAnimation } from '@/lib/animation-hooks'

interface TimelineItemProps {
  date: string
  title: string
  location?: string
  description: string
  icon?: ReactNode
  isLast?: boolean
  index?: number
  getItemClassName?: (index: number) => string
}

interface VerticalTimelineProps {
  children?: ReactNode
  lineColor?: string
  animate?: boolean
  items?: TimelineItemProps[]
}

// Individual timeline item component
export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  location,
  description,
  icon,
  isLast = false,
  index = 0,
  getItemClassName,
}) => {
  const itemClassName = getItemClassName ? getItemClassName(index) : ''

  return (
    <div className={`group relative flex items-start ${itemClassName}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className='absolute top-12 left-4 h-full w-0.5 bg-linear-to-b from-gray-300 to-gray-200 transition-all duration-500 group-hover:from-blue-400 group-hover:to-purple-400 dark:from-gray-600 dark:to-gray-700' />
      )}

      {/* Icon container */}
      <div className='relative z-10 shrink-0'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl'>
          {icon || <div className='h-3 w-3 rounded-full bg-white' />}
        </div>

        {/* Glow effect */}
        <div className='absolute inset-0 h-8 w-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20' />
      </div>

      {/* Content */}
      <div className='ml-6 min-w-0 flex-1'>
        {/* Date badge */}
        <div className='special-border mb-3 inline-flex items-center bg-linear-to-r from-blue-100 to-purple-100 px-3 py-1 text-xs font-medium text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300'>
          {date}
        </div>

        {/* Content card */}
        {/* <div className='special-border border border-gray-200 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 shadow-xs backdrop-blur-xs transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md dark:border-gray-700 dark:group-hover:border-blue-700'> */}
        <div className='special-border glass-card relative mx-auto max-w-4xl overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:shadow-2xl dark:border-gray-700/30 dark:bg-gray-900/20 dark:hover:bg-gray-900/30'>
          {/* Enhanced gradient overlay */}
          <div className='absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

          <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100'>
            {title}
          </h3>

          {location && (
            <p className='mb-3 text-sm font-medium text-gray-600 dark:text-gray-400'>
              {location}
            </p>
          )}

          <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Main vertical timeline component
export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
  children,
  lineColor = '',
  animate = true,
  items = [],
}) => {
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: items.length,
      delay: 200,
      staggerDelay: 150,
      animationClass: 'animate-fade-in-up',
    })

  if (items.length > 0) {
    return (
      <div ref={containerRef} className='mx-auto max-w-3xl py-8'>
        <div className='space-y-10 sm:space-y-12'>
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              index={index}
              isLast={index === items.length - 1}
              getItemClassName={animate ? getItemClassName : undefined}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className='mx-auto max-w-4xl py-8'>
      <div className='space-y-10 sm:space-y-12'>{children}</div>
    </div>
  )
}

// Horizontal timeline variant
export const HorizontalTimeline: React.FC<{
  items: TimelineItemProps[]
  animate?: boolean
}> = ({ items, animate = true }) => {
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: items.length,
      delay: 200,
      staggerDelay: 100,
      animationClass: 'animate-fade-in-up',
    })

  return (
    <div ref={containerRef} className='w-full py-8'>
      <div className='relative'>
        {/* Horizontal line */}
        <div className='absolute top-4 right-0 left-0 h-0.5 bg-linear-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800' />

        {/* Timeline items */}
        <div className='relative flex items-start justify-between'>
          {items.map((item, index) => {
            const itemClassName = animate ? getItemClassName(index) : ''

            return (
              <div
                key={index}
                className={`flex max-w-xs flex-col items-center ${itemClassName}`}
              >
                {/* Icon */}
                <div className='relative z-10 mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl'>
                  {item.icon || (
                    <div className='h-3 w-3 rounded-full bg-white' />
                  )}
                </div>

                {/* Content */}
                <div className='text-center'>
                  <div className='mb-2 inline-flex items-center rounded-full bg-linear-to-r from-blue-100 to-purple-100 px-2 py-1 text-xs font-medium text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300'>
                    {item.date}
                  </div>
                  <h4 className='mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100'>
                    {item.title}
                  </h4>
                  {item.location && (
                    <p className='mb-2 text-xs text-gray-600 dark:text-gray-400'>
                      {item.location}
                    </p>
                  )}
                  <p className='text-xs leading-relaxed text-gray-700 dark:text-gray-300'>
                    {item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Compact timeline variant
export const CompactTimeline: React.FC<{
  items: Pick<TimelineItemProps, 'date' | 'title' | 'description'>[]
  animate?: boolean
}> = ({ items, animate = true }) => {
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: items.length,
      delay: 100,
      staggerDelay: 50,
      animationClass: 'animate-fade-in-up',
    })

  return (
    <div ref={containerRef} className='space-y-4'>
      {items.map((item, index) => {
        const itemClassName = animate ? getItemClassName(index) : ''

        return (
          <div
            key={index}
            className={`flex items-start space-x-4 ${itemClassName}`}
          >
            <div className='mt-2 h-2 w-2 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-purple-600' />
            <div className='min-w-0 flex-1'>
              <div className='mb-1 flex items-center space-x-2'>
                <h4 className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  {item.title}
                </h4>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {item.date}
                </span>
              </div>
              <p className='text-sm text-gray-600 dark:text-gray-400'>
                {item.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Export the main component as default
export default VerticalTimeline
