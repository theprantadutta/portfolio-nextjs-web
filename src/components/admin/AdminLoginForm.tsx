'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FiLock, FiUser, FiAlertCircle } from 'react-icons/fi'

export function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Login failed')
        setIsLoading(false)
        return
      }

      // Redirect to dashboard or requested page
      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      {/* Background Effects */}
      <div className='pointer-events-none fixed inset-0 -z-10 hidden lg:block'>
        <div className='absolute right-[10rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-cyan-400/15 opacity-75 blur-2xl' />
        <div className='absolute left-[-15rem] top-[6rem] h-[30rem] w-[38rem] rounded-full bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-70 blur-2xl' />
      </div>

      <div className='flex min-h-screen items-center justify-center px-4 py-12'>
        <div className='w-full max-w-md'>
          {/* Logo/Title */}
          <div className='mb-8 text-center'>
            <h1 className='mb-2 text-4xl font-bold text-gray-900 dark:text-white'>
              Admin Panel
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Sign in to access the dashboard
            </p>
          </div>

          {/* Login Card */}
          <div className='special-border relative overflow-hidden rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg border border-white/30 bg-white/20 p-8 shadow-xl backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
            {/* Gradient overlay */}
            <div className='absolute inset-0 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10' />

            {/* Form Content */}
            <div className='relative'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Error Message */}
                {error && (
                  <div className='flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400'>
                    <FiAlertCircle className='flex-shrink-0' />
                    <span>{error}</span>
                  </div>
                )}

                {/* Username Field */}
                <div>
                  <label
                    htmlFor='username'
                    className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Username
                  </label>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <FiUser className='text-gray-400' />
                    </div>
                    <input
                      type='text'
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className='block w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-400'
                      placeholder='Enter your username'
                      required
                      autoComplete='username'
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor='password'
                    className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Password
                  </label>
                  <div className='relative'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <FiLock className='text-gray-400' />
                    </div>
                    <input
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='block w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-3 text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-400'
                      placeholder='Enter your password'
                      required
                      autoComplete='current-password'
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
            <p>Protected admin area</p>
          </div>
        </div>
      </div>
    </div>
  )
}
