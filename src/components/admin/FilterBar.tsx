'use client'

import { useState, FormEvent } from 'react'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

export interface FilterParams {
  status?: string
  dateFrom?: string
  dateTo?: string
  minAmount?: string
  maxAmount?: string
  search?: string
  paymentMethod?: string
  sourceApp?: string
}

interface FilterBarProps {
  onFilterChange: (filters: FilterParams) => void
  onClearFilters: () => void
}

export function FilterBar({ onFilterChange, onClearFilters }: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterParams>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onFilterChange(filters)
  }

  const handleClear = () => {
    setFilters({})
    onClearFilters()
  }

  const updateFilter = (key: keyof FilterParams, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  return (
    <div className='special-border rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-4 backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Search Bar */}
        <div className='flex gap-2'>
          <div className='relative flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <FiSearch className='text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search by email, name, or transaction ID...'
              value={filters.search || ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              className='block w-full rounded-lg border border-gray-300 bg-white/50 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-400'
            />
          </div>
          <button
            type='button'
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex items-center gap-2 rounded-lg border border-gray-300 bg-white/50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white/70 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70'
          >
            <FiFilter />
            Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className='grid gap-4 border-t border-gray-200 pt-4 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4'>
            {/* Status Filter */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => updateFilter('status', e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              >
                <option value=''>All Statuses</option>
                <option value='pending'>Pending</option>
                <option value='completed'>Completed</option>
                <option value='failed'>Failed</option>
                <option value='refunded'>Refunded</option>
              </select>
            </div>

            {/* Date From */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Date From
              </label>
              <input
                type='date'
                value={filters.dateFrom || ''}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              />
            </div>

            {/* Date To */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Date To
              </label>
              <input
                type='date'
                value={filters.dateTo || ''}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Payment Method
              </label>
              <select
                value={filters.paymentMethod || ''}
                onChange={(e) => updateFilter('paymentMethod', e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              >
                <option value=''>All Methods</option>
                <option value='polar'>Polar</option>
                <option value='manual'>Manual</option>
              </select>
            </div>

            {/* Min Amount */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Min Amount ($)
              </label>
              <input
                type='number'
                step='0.01'
                value={filters.minAmount || ''}
                onChange={(e) => updateFilter('minAmount', e.target.value)}
                placeholder='0.00'
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              />
            </div>

            {/* Max Amount */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Max Amount ($)
              </label>
              <input
                type='number'
                step='0.01'
                value={filters.maxAmount || ''}
                onChange={(e) => updateFilter('maxAmount', e.target.value)}
                placeholder='0.00'
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              />
            </div>

            {/* Source App */}
            <div>
              <label className='mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300'>
                Source App
              </label>
              <input
                type='text'
                value={filters.sourceApp || ''}
                onChange={(e) => updateFilter('sourceApp', e.target.value)}
                placeholder='App name'
                className='block w-full rounded-lg border border-gray-300 bg-white/50 px-3 py-2 text-sm text-gray-900 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white'
              />
            </div>

            {/* Buttons */}
            <div className='flex items-end gap-2'>
              <button
                type='submit'
                className='flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700'
              >
                Apply
              </button>
              <button
                type='button'
                onClick={handleClear}
                className='flex items-center justify-center rounded-lg border border-gray-300 bg-white/50 p-2 text-gray-700 transition-colors hover:bg-white/70 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/70'
              >
                <FiX />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
