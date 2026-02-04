'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray' | 'accent'
  className?: string
}

// Size mappings
const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
}

// Color mappings
const colorClasses = {
  primary: 'text-blue-600',
  white: 'text-white',
  gray: 'text-gray-600',
  accent: 'text-purple-600',
}

// Simple spinning circle loader
export const CircleSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <svg
        className='h-full w-full animate-spin'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        />
        <path
          className='opacity-75'
          fill='currentColor'
          d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  )
}

// Dots spinner (replacement for CirclesWithBar)
export const DotsSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4',
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${dotSizes[size]} bg-current ${colorClasses[color]} animate-pulse rounded-full`}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  )
}

// Bars spinner
export const BarsSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const barSizes = {
    sm: 'w-0.5 h-4',
    md: 'w-1 h-8',
    lg: 'w-1.5 h-12',
    xl: 'w-2 h-16',
  }

  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`${barSizes[size]} bg-current ${colorClasses[color]} animate-bounce rounded-sm`}
          style={{
            animationDelay: `${index * 0.1}s`,
            animationDuration: '1.2s',
          }}
        />
      ))}
    </div>
  )
}

// Gradient circle spinner (modern style)
export const GradientSpinner: React.FC<
  LoadingSpinnerProps & { gradient?: string }
> = ({
  size = 'md',
  className = '',
  gradient = 'from-purple-600 to-blue-600',
}) => {
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div
        className={`h-full w-full rounded-full bg-linear-to-r ${gradient} relative animate-spin`}
      >
        <div className='absolute inset-1 rounded-full bg-white dark:bg-gray-900'></div>
        <div
          className={`absolute inset-0 rounded-full bg-linear-to-r ${gradient} animate-ping opacity-75`}
        ></div>
      </div>
    </div>
  )
}

// Morphing shapes spinner
export const MorphSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      <div className='relative h-full w-full'>
        <div className='absolute inset-0 animate-ping rounded-full bg-current opacity-75'></div>
        <div className='absolute inset-0 animate-pulse rounded-full bg-current'></div>
        <div className='absolute inset-2 animate-bounce rounded-full bg-current'></div>
      </div>
    </div>
  )
}

// Ripple effect spinner
export const RippleSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  return (
    <div
      className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}
    >
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`absolute border-2 border-current ${colorClasses[color]} animate-ping rounded-full opacity-75`}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: '2s',
            width: `${100 - index * 20}%`,
            height: `${100 - index * 20}%`,
          }}
        />
      ))}
    </div>
  )
}

// Combined circles with bars (direct replacement for CirclesWithBar)
export const CirclesWithBars: React.FC<
  LoadingSpinnerProps & {
    outerCircleColor?: string
    innerCircleColor?: string
    barColor?: string
  }
> = ({
  size = 'md',
  color = 'white',
  className = '',
  outerCircleColor,
  innerCircleColor,
  barColor,
}) => {
  const finalColor = outerCircleColor || colorClasses[color]

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* Outer rotating circle */}
      <div
        className={`h-full w-full border-4 border-transparent border-t-current ${finalColor} animate-spin rounded-full`}
      />

      {/* Inner pulsing circle */}
      <div
        className={`absolute inset-2 border-2 border-current ${innerCircleColor || finalColor} animate-pulse rounded-full opacity-60`}
      />

      {/* Center bars */}
      <div className='absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
        <div className={`flex items-end space-x-0.5`}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-2 w-0.5 bg-current ${barColor || finalColor} animate-bounce rounded-sm`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Skeleton loader for content
export const SkeletonLoader: React.FC<{
  className?: string
  rows?: number
  showAvatar?: boolean
}> = ({ className = '', rows = 3, showAvatar = false }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {showAvatar && (
        <div className='mb-4 flex items-center space-x-4'>
          <div className='h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700'></div>
          <div className='flex-1 space-y-2'>
            <div className='h-4 w-1/4 rounded-sm bg-gray-300 dark:bg-gray-700'></div>
            <div className='h-3 w-1/2 rounded-sm bg-gray-300 dark:bg-gray-700'></div>
          </div>
        </div>
      )}
      <div className='space-y-3'>
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className='h-4 rounded-sm bg-gray-300 dark:bg-gray-700'
            style={{ width: `${100 - index * 10}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// Page transition loader
export const PageLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs dark:bg-gray-900/80'>
      <div className='text-center'>
        <GradientSpinner
          size='xl'
          gradient='from-purple-600 via-blue-600 to-cyan-600'
        />
        <p className='mt-4 font-medium text-gray-600 dark:text-gray-400'>
          Loading...
        </p>
      </div>
    </div>
  )
}

// Export default spinner (most commonly used)
export default CircleSpinner
