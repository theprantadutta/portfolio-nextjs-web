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
        <div className='from-primary-400/15 via-secondary-400/15 to-primary-400/15 absolute -top-16 right-40 h-96 w-[24rem] rounded-full bg-linear-to-br opacity-75 blur-2xl' />
        <div className='from-secondary-400/10 via-accent-400/10 to-primary-400/10 absolute top-24 -left-60 h-120 w-152 rounded-full bg-linear-to-br opacity-70 blur-2xl' />
        <div className='from-primary-400/10 to-primary-500/10 absolute -right-32 bottom-32 h-72 w-md rounded-full bg-linear-to-br opacity-60 blur-xl' />
      </div>

      <Header />
      {children}
      <Footer />
      <ThemeSwitchLazy />
    </div>
  )
}
