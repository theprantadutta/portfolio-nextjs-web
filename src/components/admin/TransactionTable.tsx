import Link from 'next/link'
import { FiEye } from 'react-icons/fi'

interface Transaction {
  id: number
  transactionId: string
  customerEmail: string
  customerName: string | null
  amount: number
  currency: string
  status: string
  paymentMethod: string
  sourceApp: string | null
  createdAt: string
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'refunded':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  if (transactions.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-gray-500 dark:text-gray-400'>
          No transactions found matching your filters.
        </p>
      </div>
    )
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-200 dark:border-gray-700'>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Transaction ID
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Customer
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Amount
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Status
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Method
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Source
            </th>
            <th className='pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Date
            </th>
            <th className='pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className='hover:bg-white/50 dark:hover:bg-white/5'
            >
              <td className='py-4'>
                <Link
                  href={`/admin/transactions/${transaction.id}`}
                  className='font-mono text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
                >
                  {transaction.transactionId.substring(0, 12)}...
                </Link>
              </td>
              <td className='py-4'>
                <div className='text-sm font-medium text-gray-900 dark:text-white'>
                  {transaction.customerName || 'N/A'}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  {transaction.customerEmail}
                </div>
              </td>
              <td className='py-4 text-sm font-medium text-gray-900 dark:text-white'>
                {formatCurrency(transaction.amount, transaction.currency)}
              </td>
              <td className='py-4'>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </td>
              <td className='py-4 text-sm text-gray-900 dark:text-white'>
                {transaction.paymentMethod}
              </td>
              <td className='py-4 text-sm text-gray-600 dark:text-gray-400'>
                {transaction.sourceApp || '-'}
              </td>
              <td className='py-4 text-sm text-gray-600 dark:text-gray-400'>
                {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className='py-4 text-right'>
                <Link
                  href={`/admin/transactions/${transaction.id}`}
                  className='inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white/50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-white/70 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70'
                >
                  <FiEye className='h-4 w-4' />
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
