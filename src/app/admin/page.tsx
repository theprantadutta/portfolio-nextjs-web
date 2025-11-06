'use client'

import { useEffect, useState } from 'react'
import { StatCard } from '@/components/admin/StatCard'
import Link from 'next/link'
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight,
} from 'react-icons/fi'

interface DashboardStats {
  totalRevenue: number
  todayRevenue: number
  totalTransactions: number
  todayTransactions: number
  pendingTransactions: number
  completedTransactions: number
  failedTransactions: number
  refundedTransactions: number
  totalCustomers: number
  recentTransactions: Array<{
    id: number
    transactionId: string
    customerEmail: string
    customerName: string | null
    amount: number
    currency: string
    status: string
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
      setError(null)
    } catch (err) {
      setError('Failed to load dashboard statistics')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-lg text-gray-600 dark:text-gray-400'>
          Loading dashboard...
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-lg text-red-600 dark:text-red-400'>
          {error || 'Failed to load dashboard'}
        </div>
      </div>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Dashboard Overview
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Real-time statistics and recent activity
        </p>
      </div>

      {/* Revenue Stats */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Revenue'
          value={formatCurrency(stats.totalRevenue)}
          icon={<FiDollarSign className='h-6 w-6' />}
          subtitle='All time'
        />
        <StatCard
          title="Today's Revenue"
          value={formatCurrency(stats.todayRevenue)}
          icon={<FiDollarSign className='h-6 w-6' />}
          subtitle={`${stats.todayTransactions} transactions today`}
        />
        <StatCard
          title='Total Transactions'
          value={stats.totalTransactions}
          icon={<FiShoppingCart className='h-6 w-6' />}
          subtitle='All time'
        />
        <StatCard
          title='Total Customers'
          value={stats.totalCustomers}
          icon={<FiUsers className='h-6 w-6' />}
          subtitle='Unique emails'
        />
      </div>

      {/* Status Stats */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Pending'
          value={stats.pendingTransactions}
          icon={<FiClock className='h-6 w-6' />}
        />
        <StatCard
          title='Completed'
          value={stats.completedTransactions}
          icon={<FiCheckCircle className='h-6 w-6' />}
        />
        <StatCard
          title='Failed'
          value={stats.failedTransactions}
          icon={<FiAlertCircle className='h-6 w-6' />}
        />
        <StatCard
          title='Refunded'
          value={stats.refundedTransactions}
          icon={<FiDollarSign className='h-6 w-6' />}
        />
      </div>

      {/* Recent Transactions */}
      <div className='special-border overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
        {/* Gradient overlay */}
        <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />

        <div className='relative p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
              Recent Transactions
            </h2>
            <Link
              href='/admin/transactions'
              className='flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-200 dark:border-gray-700'>
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
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {stats.recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className='hover:bg-white/50 dark:hover:bg-white/5'
                  >
                    <td className='py-4'>
                      <div className='text-sm font-medium text-gray-900 dark:text-white'>
                        {transaction.customerName || 'N/A'}
                      </div>
                      <div className='text-xs text-gray-500 dark:text-gray-400'>
                        {transaction.customerEmail}
                      </div>
                    </td>
                    <td className='py-4 text-sm font-medium text-gray-900 dark:text-white'>
                      {formatCurrency(transaction.amount)}
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
                    <td className='py-4 text-sm text-gray-600 dark:text-gray-400'>
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
