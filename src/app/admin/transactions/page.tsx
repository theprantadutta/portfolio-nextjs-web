import { Suspense } from 'react'
import { TransactionsPageContent } from '@/components/admin/TransactionsPageContent'

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionsPageSkeleton />}>
      <TransactionsPageContent />
    </Suspense>
  )
}

function TransactionsPageSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Transactions
          </h1>
          <p className='mt-2 text-gray-600 dark:text-gray-400'>
            View and manage all payment transactions
          </p>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className='special-border overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
        <div className='py-12 text-center text-gray-600 dark:text-gray-400'>
          Loading transactions...
        </div>
      </div>
    </div>
  )
}
