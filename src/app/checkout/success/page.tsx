import Link from 'next/link'
import { FiCheckCircle, FiMail, FiHome } from 'react-icons/fi'

export const metadata = {
  title: 'Payment Successful - Thank You!',
  description: 'Your payment has been processed successfully',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const checkoutId = params.checkout_id as string | undefined

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      <div className='mx-4 w-full max-w-2xl'>
        <div className='rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-900 md:p-12'>
          {/* Success Icon */}
          <div className='mb-8 flex justify-center'>
            <div className='rounded-full bg-green-100 p-6 dark:bg-green-900/30'>
              <FiCheckCircle className='text-6xl text-green-600 dark:text-green-400' />
            </div>
          </div>

          {/* Success Message */}
          <div className='text-center'>
            <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
              Payment Successful!
            </h1>
            <p className='mb-8 text-lg text-gray-600 dark:text-gray-400'>
              Thank you for your purchase. Your payment has been processed
              successfully.
            </p>
            {checkoutId && (
              <div className='mb-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400'>
                Order Reference: {checkoutId}
              </div>
            )}
          </div>

          {/* What's Next */}
          <div className='mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/50'>
            <h2 className='mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white'>
              <FiMail />
              What&apos;s Next?
            </h2>
            <ul className='space-y-3 text-gray-700 dark:text-gray-300'>
              <li className='flex items-start gap-3'>
                <span className='flex-shrink-0 text-green-600'>✓</span>
                <span>
                  You&apos;ll receive a confirmation email with your order
                  details
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='flex-shrink-0 text-green-600'>✓</span>
                <span>
                  For digital products, download links will be sent to your
                  email
                </span>
              </li>
              <li className='flex items-start gap-3'>
                <span className='flex-shrink-0 text-green-600'>✓</span>
                <span>
                  If you don&apos;t receive an email within 10 minutes, please
                  check your spam folder
                </span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Link
              href='/'
              className='flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
            >
              <FiHome />
              <span>Return Home</span>
            </Link>
            <Link
              href='/checkout'
              className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition-all hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              <span>View More Products</span>
            </Link>
          </div>

          {/* Support */}
          <div className='mt-8 text-center'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Need help? Contact us at{' '}
              <a
                href='mailto:support@pranta.dev'
                className='font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400'
              >
                support@pranta.dev
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
