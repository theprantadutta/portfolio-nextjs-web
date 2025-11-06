'use client'

import { useState } from 'react'
import { FiMail, FiUser, FiCreditCard } from 'react-icons/fi'

interface CheckoutFormProps {
  product: any // Polar product object
  productId: string // Polar product ID
  priceAmount: string // Price in dollars
}

export function CheckoutForm({
  product,
  productId,
  priceAmount,
}: CheckoutFormProps) {
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [amount, setAmount] = useState(priceAmount)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate inputs
      if (!customerEmail || !customerName) {
        throw new Error('Please fill in all required fields')
      }

      // Build checkout URL with query parameters
      const checkoutUrl = new URL(`/api/polar/checkout`, window.location.origin)
      checkoutUrl.searchParams.set('products', productId)
      checkoutUrl.searchParams.set('customerEmail', customerEmail)
      checkoutUrl.searchParams.set('customerName', customerName)

      // Add custom metadata
      const metadata = {
        product_name: product.name,
        product_id: productId,
        source: 'direct_checkout',
      }
      checkoutUrl.searchParams.set('metadata', JSON.stringify(metadata))

      // Redirect to Polar checkout
      window.location.href = checkoutUrl.toString()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Customer Name */}
      <div>
        <label
          htmlFor='customerName'
          className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Full Name <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
            <FiUser className='text-gray-400' />
          </div>
          <input
            type='text'
            id='customerName'
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder='John Doe'
            className='w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500'
          />
        </div>
      </div>

      {/* Customer Email */}
      <div>
        <label
          htmlFor='customerEmail'
          className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Email Address <span className='text-red-500'>*</span>
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
            <FiMail className='text-gray-400' />
          </div>
          <input
            type='email'
            id='customerEmail'
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
            placeholder='john@example.com'
            className='w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500'
          />
        </div>
        <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
          You&apos;ll receive your purchase confirmation and access details here
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className='rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400'>
          {error}
        </div>
      )}

      {/* Order Summary */}
      <div className='rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50'>
        <div className='mb-2 flex justify-between text-sm text-gray-600 dark:text-gray-400'>
          <span>Subtotal</span>
          <span>${amount}</span>
        </div>
        <div className='flex justify-between border-t border-gray-200 pt-2 text-lg font-bold text-gray-900 dark:border-gray-800 dark:text-white'>
          <span>Total</span>
          <span>${amount}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isLoading}
        className='flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600'
      >
        {isLoading ? (
          <>
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <FiCreditCard />
            <span>Proceed to Secure Checkout</span>
          </>
        )}
      </button>

      <p className='text-center text-xs text-gray-500 dark:text-gray-400'>
        By continuing, you agree to our terms of service. Your payment is
        securely processed by Polar.sh.
      </p>
    </form>
  )
}
