'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CustomerCard } from '@/components/admin/CustomerCard'
import { FiUsers, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Customer {
  email: string
  name: string | null
  transactionCount: number
  totalSpent: number
  firstPurchase: string
  lastPurchase: string
  statuses: string[]
}

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

export function CustomersPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<
    'totalSpent' | 'transactionCount' | 'recent'
  >('totalSpent')

  const currentPage = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    fetchCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchParams])

  const fetchCustomers = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('sortBy', sortBy)
      params.set('page', currentPage.toString())
      params.set('limit', '20')

      const response = await fetch(`/api/admin/customers?${params}`)

      if (!response.ok) throw new Error('Failed to fetch customers')

      const data = await response.json()
      setCustomers(data.customers)
      setPagination(data.pagination)
      setError(null)
    } catch (err) {
      setError('Failed to load customers')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/customers?${params.toString()}`)
  }

  const handleSortChange = (
    newSort: 'totalSpent' | 'transactionCount' | 'recent'
  ) => {
    setSortBy(newSort)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', '1') // Reset to first page on sort change
    router.push(`/admin/customers?${params.toString()}`)
  }

  const getTotalRevenue = () => {
    return customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

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

      {/* Summary Stats */}
      <div className='grid gap-6 sm:grid-cols-3'>
        <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
          <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />
          <div className='relative'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Customers
            </p>
            <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>
              {pagination?.totalCount || customers.length}
            </p>
          </div>
        </div>

        <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
          <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />
          <div className='relative'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Total Revenue
            </p>
            <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>
              {formatCurrency(getTotalRevenue())}
            </p>
          </div>
        </div>

        <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-6 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
          <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />
          <div className='relative'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
              Avg. Customer Value
            </p>
            <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>
              {formatCurrency(
                customers.length > 0 ? getTotalRevenue() / customers.length : 0
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Sort Controls and Results Count */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as any)}
            className='rounded-lg border border-gray-300 bg-white/50 px-4 py-2 text-sm backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
          >
            <option value='totalSpent'>Total Spent (Highest)</option>
            <option value='transactionCount'>Transaction Count</option>
            <option value='recent'>Recent Activity</option>
          </select>
        </div>

        {/* Results Count */}
        {pagination && (
          <div className='text-sm text-gray-600 dark:text-gray-400'>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
            {Math.min(
              pagination.page * pagination.limit,
              pagination.totalCount
            )}{' '}
            of {pagination.totalCount} customers
          </div>
        )}
      </div>

      {/* Customers Grid */}
      {isLoading ? (
        <div className='py-12 text-center text-gray-600 dark:text-gray-400'>
          Loading customers...
        </div>
      ) : error ? (
        <div className='py-12 text-center text-red-600 dark:text-red-400'>
          {error}
        </div>
      ) : customers.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-12'>
          <FiUsers className='mb-4 h-16 w-16 text-gray-400' />
          <p className='text-gray-600 dark:text-gray-400'>
            No customers found yet
          </p>
        </div>
      ) : (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {customers.map((customer) => (
            <CustomerCard key={customer.email} customer={customer} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70'
          >
            <FiChevronLeft />
            Previous
          </button>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              Page {pagination.page} of {pagination.totalPages}
            </span>
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasMore}
            className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70'
          >
            Next
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
