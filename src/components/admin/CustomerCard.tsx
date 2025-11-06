interface CustomerCardProps {
  customer: {
    email: string
    name: string | null
    transactionCount: number
    totalSpent: number
    firstPurchase: string
    lastPurchase: string
    statuses: string[]
  }
}

export function CustomerCard({ customer }: CustomerCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
      {/* Gradient overlay */}
      <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />

      <div className='relative'>
        {/* Customer Info */}
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            {customer.name || 'Anonymous'}
          </h3>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            {customer.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Total Spent
            </p>
            <p className='mt-1 text-xl font-bold text-gray-900 dark:text-white'>
              {formatCurrency(customer.totalSpent)}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Transactions
            </p>
            <p className='mt-1 text-xl font-bold text-gray-900 dark:text-white'>
              {customer.transactionCount}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              First Purchase
            </p>
            <p className='mt-1 text-sm text-gray-900 dark:text-white'>
              {formatDate(customer.firstPurchase)}
            </p>
          </div>
          <div>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Last Purchase
            </p>
            <p className='mt-1 text-sm text-gray-900 dark:text-white'>
              {formatDate(customer.lastPurchase)}
            </p>
          </div>
        </div>

        {/* Status Badges */}
        {customer.statuses.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {customer.statuses.map((status) => (
              <span
                key={status}
                className='rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
              >
                {status}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
