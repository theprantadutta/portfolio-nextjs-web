'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeSwitchLazy } from '@/components/theme-switch-lazy'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isCheckoutPage = pathname?.startsWith('/checkout')
  const isAdminPage = pathname?.startsWith('/admin')

  if (isCheckoutPage || isAdminPage) {
    // Checkout & Admin pages: clean layout, no header, no footer, no padding
    return <>{children}</>
  }

  // Regular portfolio pages: with header, footer, padding, background effects
  return (
    <div className='relative pt-20 sm:pt-24'>
      {/* Background gradient effects for portfolio pages */}
      <div className='pointer-events-none fixed inset-0 -z-10 hidden lg:block'>
        <div className='absolute -top-16 right-40 h-96 w-[24rem] rounded-full bg-linear-to-br from-blue-400/15 via-purple-400/15 to-cyan-400/15 opacity-75 blur-2xl' />
        <div className='absolute top-24 -left-60 h-120 w-152 rounded-full bg-linear-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-70 blur-2xl' />
        <div className='absolute -right-32 bottom-32 h-72 w-md rounded-full bg-linear-to-br from-cyan-400/10 to-blue-500/10 opacity-60 blur-xl' />
      </div>

      <Header />
      {children}
      <Footer />
      <ThemeSwitchLazy />
    </div>
  )
}
