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
  primary: 'text-primary-600',
  white: 'text-white',
  gray: 'text-gray-600',
  accent: 'text-secondary-600',
}

// Combined circles with bars
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
