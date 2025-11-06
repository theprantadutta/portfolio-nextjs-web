'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  FiHome,
  FiDollarSign,
  FiUsers,
  FiLogOut,
  FiActivity,
} from 'react-icons/fi'
import { useState } from 'react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { name: 'Transactions', href: '/admin/transactions', icon: FiDollarSign },
  { name: 'Customers', href: '/admin/customers', icon: FiUsers },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className='flex h-full w-64 flex-col border-r border-white/30 bg-white/20 backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'>
      {/* Logo */}
      <div className='border-b border-white/30 p-6 dark:border-white/20'>
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'>
            <FiActivity className='h-6 w-6' />
          </div>
          <div>
            <h1 className='text-lg font-bold text-gray-900 dark:text-white'>
              Admin Panel
            </h1>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              Payment Gateway
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1 p-4'>
        {navigation.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white/50 dark:text-gray-300 dark:hover:bg-white/10'
              }`}
            >
              <Icon className='h-5 w-5' />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className='border-t border-white/30 p-4 dark:border-white/20'>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className='flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-red-500/10 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:text-red-400'
        >
          <FiLogOut className='h-5 w-5' />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  )
}
