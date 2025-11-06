import { Suspense } from 'react'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginPageSkeleton />}>
      <AdminLoginForm />
    </Suspense>
  )
}

function LoginPageSkeleton() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      <div className='flex min-h-screen items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          <div className='mb-8 text-center'>
            <h1 className='mb-2 text-4xl font-bold text-gray-900 dark:text-white'>
              Admin Panel
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Sign in to access the dashboard
            </p>
          </div>

          <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-8 shadow-xl backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
            <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10' />
            <div className='relative space-y-6'>
              <div className='h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700' />
              <div className='h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700' />
              <div className='h-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
