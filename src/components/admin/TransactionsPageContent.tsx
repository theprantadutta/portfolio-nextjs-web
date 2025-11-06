'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FilterBar, FilterParams } from '@/components/admin/FilterBar'
import { TransactionTable } from '@/components/admin/TransactionTable'
import { ExportButton } from '@/components/admin/ExportButton'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

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

interface PaginationInfo {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

export function TransactionsPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const currentPage = parseInt(searchParams.get('page') || '1')

  useEffect(() => {
    fetchTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams(searchParams.toString())
      const response = await fetch(`/api/admin/transactions?${params}`)

      if (!response.ok) throw new Error('Failed to fetch transactions')

      const data = await response.json()
      setTransactions(data.transactions)
      setPagination(data.pagination)
      setError(null)
    } catch (err) {
      setError('Failed to load transactions')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (filters: FilterParams) => {
    const params = new URLSearchParams()
    params.set('page', '1') // Reset to first page on filter change

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    router.push(`/admin/transactions?${params.toString()}`)
  }

  const handleClearFilters = () => {
    router.push('/admin/transactions')
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/transactions?${params.toString()}`)
  }

  // Convert searchParams to filter object for export
  const currentFilters = Object.fromEntries(searchParams.entries())

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
        <ExportButton filters={currentFilters} />
      </div>

      {/* Filters */}
      <FilterBar
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Results Count */}
      {pagination && (
        <div className='text-sm text-gray-600 dark:text-gray-400'>
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.totalCount)}{' '}
          of {pagination.totalCount} transactions
        </div>
      )}

      {/* Table */}
      <div className='special-border overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
        {/* Gradient overlay */}
        <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />

        <div className='relative p-6'>
          {isLoading ? (
            <div className='py-12 text-center text-gray-600 dark:text-gray-400'>
              Loading transactions...
            </div>
          ) : error ? (
            <div className='py-12 text-center text-red-600 dark:text-red-400'>
              {error}
            </div>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </div>
      </div>

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
