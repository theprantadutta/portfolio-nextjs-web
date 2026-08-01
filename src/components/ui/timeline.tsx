import React, { ReactNode } from 'react'

interface TimelineItemProps {
  date: string
  title: string
  location?: string
  description: string
  icon?: ReactNode
  isLast?: boolean
  animate?: boolean
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
  animate = true,
}) => {
  return (
    <div
      className={`group relative flex items-start ${animate ? 'reveal' : ''}`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className='group-hover:from-primary-400 group-hover:to-secondary-400 absolute top-12 left-4 h-full w-0.5 bg-linear-to-b from-gray-300 to-gray-200 transition-all duration-500 dark:from-gray-600 dark:to-gray-700' />
      )}

      {/* Icon container */}
      <div className='relative z-10 shrink-0'>
        <div className='from-primary-500 to-secondary-600 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl'>
          {icon || <div className='h-3 w-3 rounded-full bg-white' />}
        </div>

        {/* Glow effect */}
        <div className='from-primary-500 to-secondary-600 absolute inset-0 h-8 w-8 rounded-full bg-linear-to-br opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20' />
      </div>

      {/* Content */}
      <div className='ml-6 min-w-0 flex-1'>
        {/* Date badge */}
        <div className='special-border from-primary-100 to-secondary-100 text-primary-800 dark:from-primary-900/30 dark:to-secondary-900/30 dark:text-primary-300 mb-3 inline-flex items-center bg-linear-to-r px-3 py-1 text-xs font-medium'>
          {date}
        </div>

        {/* Content card */}
        {/* <div className='special-border border border-gray-200 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 p-6 shadow-xs backdrop-blur-xs transition-all duration-300 group-hover:border-blue-200 group-hover:shadow-md dark:border-gray-700 dark:group-hover:border-blue-700'> */}
        <div className='special-border glass-card relative mx-auto max-w-4xl overflow-hidden border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:shadow-2xl dark:border-gray-700/30 dark:bg-gray-900/20 dark:hover:bg-gray-900/30'>
          {/* Enhanced gradient overlay */}
          <div className='from-primary-500/10 via-secondary-500/10 to-accent-500/10 absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

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
  if (items.length > 0) {
    return (
      <div className='mx-auto max-w-3xl py-8'>
        <div className='space-y-10 sm:space-y-12'>
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              {...item}
              isLast={index === items.length - 1}
              animate={animate}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-4xl py-8'>
      <div className='space-y-10 sm:space-y-12'>{children}</div>
    </div>
  )
}
export default VerticalTimeline
