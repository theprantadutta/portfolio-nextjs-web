import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  subtitle?: string
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  subtitle,
}: StatCardProps) {
  return (
    <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
      {/* Gradient overlay */}
      <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />

      <div className='relative'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              {title}
            </p>
            <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>
              {value}
            </p>
            {subtitle && (
              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                {subtitle}
              </p>
            )}
            {trend && (
              <div className='mt-2 flex items-center gap-1'>
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {trend.isPositive ? '↑' : '↓'} {trend.value}
                </span>
              </div>
            )}
          </div>
          <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}
