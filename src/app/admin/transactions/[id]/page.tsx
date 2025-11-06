'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi'

interface TransactionDetails {
  id: number
  transactionId: string
  productId: number | null
  customerEmail: string
  customerName: string | null
  customerMetadata: Record<string, any>
  amount: number
  currency: string
  status: string
  paymentMethod: string
  polarOrderId: string | null
  polarCheckoutId: string | null
  polarCustomerId: string | null
  polarSubscriptionId: string | null
  refundId: string | null
  refundReason: string | null
  refundedAt: string | null
  notes: string | null
  sourceApp: string | null
  ipAddress: string | null
  userAgent: string | null
  metadata: Record<string, any>
  createdAt: string
  completedAt: string | null
  updatedAt: string
}

export default function TransactionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  )

  useEffect(() => {
    params.then(setResolvedParams)
  }, [params])

  useEffect(() => {
    if (resolvedParams) {
      fetchTransaction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams])

  const fetchTransaction = async () => {
    if (!resolvedParams) return

    try {
      const response = await fetch(
        `/api/admin/transactions/${resolvedParams.id}`
      )

      if (!response.ok) throw new Error('Failed to fetch transaction')

      const data = await response.json()
      setTransaction(data)
      setError(null)
    } catch (err) {
      setError('Failed to load transaction details')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <div className='text-lg text-gray-600 dark:text-gray-400'>
          Loading transaction...
        </div>
      </div>
    )
  }

  if (error || !transaction) {
    return (
      <div className='space-y-6'>
        <Link
          href='/admin/transactions'
          className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
        >
          <FiArrowLeft />
          Back to Transactions
        </Link>
        <div className='flex h-96 items-center justify-center'>
          <div className='text-lg text-red-600 dark:text-red-400'>
            {error || 'Transaction not found'}
          </div>
        </div>
      </div>
    )
  }

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
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const InfoRow = ({
    label,
    value,
  }: {
    label: string
    value: React.ReactNode
  }) => (
    <div className='border-b border-gray-200 py-3 dark:border-gray-700'>
      <dt className='text-sm font-medium text-gray-600 dark:text-gray-400'>
        {label}
      </dt>
      <dd className='mt-1 text-sm text-gray-900 dark:text-white'>
        {value || '-'}
      </dd>
    </div>
  )

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <Link
          href='/admin/transactions'
          className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
        >
          <FiArrowLeft />
          Back to Transactions
        </Link>
      </div>

      <div>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
          Transaction Details
        </h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          View complete transaction information
        </p>
      </div>

      {/* Main Info Card */}
      <div className='special-border overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
        <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-50' />

        <div className='relative p-6'>
          <div className='mb-6 flex items-start justify-between'>
            <div>
              <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                Transaction ID
              </h2>
              <p className='mt-1 font-mono text-sm text-gray-600 dark:text-gray-400'>
                {transaction.transactionId}
              </p>
            </div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadgeClass(
                transaction.status
              )}`}
            >
              {transaction.status}
            </span>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            {/* Payment Information */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
                Payment Information
              </h3>
              <dl>
                <InfoRow
                  label='Amount'
                  value={formatCurrency(
                    transaction.amount,
                    transaction.currency
                  )}
                />
                <InfoRow
                  label='Currency'
                  value={transaction.currency.toUpperCase()}
                />
                <InfoRow
                  label='Payment Method'
                  value={transaction.paymentMethod}
                />
                <InfoRow label='Source App' value={transaction.sourceApp} />
              </dl>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
                Customer Information
              </h3>
              <dl>
                <InfoRow label='Name' value={transaction.customerName} />
                <InfoRow label='Email' value={transaction.customerEmail} />
                <InfoRow label='IP Address' value={transaction.ipAddress} />
              </dl>
            </div>

            {/* Polar Information */}
            {transaction.polarOrderId && (
              <div>
                <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
                  Polar Information
                </h3>
                <dl>
                  <InfoRow
                    label='Order ID'
                    value={
                      <div className='flex items-center gap-2'>
                        <span className='font-mono'>
                          {transaction.polarOrderId}
                        </span>
                        <a
                          href={`https://polar.sh/admin/orders/${transaction.polarOrderId}`}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:text-blue-700 dark:text-blue-400'
                        >
                          <FiExternalLink className='h-4 w-4' />
                        </a>
                      </div>
                    }
                  />
                  <InfoRow
                    label='Checkout ID'
                    value={transaction.polarCheckoutId}
                  />
                  <InfoRow
                    label='Customer ID'
                    value={transaction.polarCustomerId}
                  />
                  <InfoRow
                    label='Subscription ID'
                    value={transaction.polarSubscriptionId}
                  />
                </dl>
              </div>
            )}

            {/* Timestamps */}
            <div>
              <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
                Timeline
              </h3>
              <dl>
                <InfoRow
                  label='Created At'
                  value={new Date(transaction.createdAt).toLocaleString()}
                />
                <InfoRow
                  label='Completed At'
                  value={
                    transaction.completedAt
                      ? new Date(transaction.completedAt).toLocaleString()
                      : null
                  }
                />
                <InfoRow
                  label='Updated At'
                  value={new Date(transaction.updatedAt).toLocaleString()}
                />
              </dl>
            </div>
          </div>

          {/* Refund Information */}
          {transaction.refundId && (
            <div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
              <h3 className='mb-4 text-lg font-semibold text-gray-900 dark:text-white'>
                Refund Information
              </h3>
              <dl className='grid gap-6 md:grid-cols-2'>
                <InfoRow label='Refund ID' value={transaction.refundId} />
                <InfoRow
                  label='Refunded At'
                  value={
                    transaction.refundedAt
                      ? new Date(transaction.refundedAt).toLocaleString()
                      : null
                  }
                />
                <InfoRow
                  label='Refund Reason'
                  value={transaction.refundReason}
                />
              </dl>
            </div>
          )}

          {/* Notes */}
          {transaction.notes && (
            <div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                Notes
              </h3>
              <p className='text-sm text-gray-700 dark:text-gray-300'>
                {transaction.notes}
              </p>
            </div>
          )}

          {/* Metadata */}
          {Object.keys(transaction.metadata).length > 0 && (
            <div className='mt-6 border-t border-gray-200 pt-6 dark:border-gray-700'>
              <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                Metadata
              </h3>
              <pre className='overflow-x-auto rounded-lg bg-gray-100 p-4 text-xs text-gray-900 dark:bg-gray-800 dark:text-gray-100'>
                {JSON.stringify(transaction.metadata, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
