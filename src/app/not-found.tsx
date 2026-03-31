import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Pranta Dutta',
}

export default function NotFound() {
  return (
    <main className='relative flex min-h-screen items-center justify-center overflow-hidden px-4'>
      {/* Background Gradient Blobs */}
      <div className='fixed inset-0 -z-10'>
        <div className='from-primary-500/20 to-secondary-600/20 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-linear-to-br blur-3xl' />
        <div
          className='from-accent-500/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-linear-to-br to-orange-500/20 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-linear-to-br from-green-500/15 to-teal-500/15 blur-3xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Content */}
      <div className='animate-fade-in-up relative text-center'>
        {/* Glass Card */}
        <div className='special-border glass-card relative overflow-hidden border border-white/10 px-8 py-12 sm:px-16 sm:py-16 dark:border-gray-700/30'>
          {/* Gradient overlay */}
          <div className='from-primary-500/5 via-secondary-500/5 to-accent-500/5 absolute inset-0 bg-linear-to-br' />

          {/* Decorative dots */}
          <div className='bg-primary-500 absolute top-6 right-6 h-2 w-2 animate-ping rounded-full' />
          <div className='bg-secondary-500 absolute bottom-6 left-6 h-2 w-2 animate-pulse rounded-full' />
          <div
            className='bg-accent-500 absolute top-6 left-6 h-1.5 w-1.5 animate-pulse rounded-full'
            style={{ animationDelay: '1s' }}
          />

          <div className='relative'>
            {/* 404 Number */}
            <h1 className='from-primary-500 to-secondary-500 animate-float mb-4 bg-linear-to-r bg-clip-text font-serif text-8xl font-bold text-transparent sm:text-9xl'>
              404
            </h1>

            {/* Heading */}
            <h2 className='mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl dark:from-white dark:via-gray-200 dark:to-white'>
              Page Not Found
            </h2>

            {/* Description */}
            <p className='mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-400'>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>

            {/* CTA Buttons */}
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Link
                href='/'
                className='btn-primary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
              >
                <svg
                  className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                  />
                </svg>
                <span>Go Home</span>
              </Link>

              <Link
                href='/projects'
                className='btn-secondary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
              >
                <span>View Projects</span>
                <svg
                  className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
