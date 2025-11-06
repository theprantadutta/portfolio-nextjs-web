import { Suspense } from 'react'
import { CustomersPageContent } from '@/components/admin/CustomersPageContent'

export default function CustomersPage() {
  return (
    <Suspense fallback={<CustomersPageSkeleton />}>
      <CustomersPageContent />
    </Suspense>
  )
}

function CustomersPageSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Customer Insights
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          View customer purchase history and lifetime value
        </p>
      </div>

      {/* Summary Stats Skeleton */}
      <div className='grid gap-6 sm:grid-cols-3'>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'
          >
            <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />
            <div className='relative space-y-2'>
              <div className='h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
              <div className='h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700' />
            </div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className='py-12 text-center text-gray-600 dark:text-gray-400'>
        Loading customers...
      </div>
    </div>
  )
}
