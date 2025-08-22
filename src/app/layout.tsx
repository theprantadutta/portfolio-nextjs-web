import './globals.css'

import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
// import { Analytics } from '@vercel/analytics/react'

import { Header } from '@/components/header'
import { ActiveSectionContextProvider } from '@/context/active-section-context'
import { Footer } from '@/components/footer'
import { ThemeSwitch } from '@/components/theme-switch'
import { ThemeContextProvider } from '@/context/theme-context'
// import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pranta Dutta | Personal Portfolio',
  description: 'Pranta is a full-stack developer with 4 years of experience.',
}

interface IRootLayoutProps {
  children?: ReactNode
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang='en' className='!scroll-smooth'>
      <body
        className={`${inter.className} relative bg-gray-50 pt-28 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 sm:pt-36`}
      >
        {/* <div className='special-border absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]' />
        <div className='special-border absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]' /> */}

        {/* Enhanced gradient background orbs */}
        <div className='animate-float fixed right-[8rem] top-[-4rem] -z-10 h-[25rem] w-[25rem] rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-3xl sm:h-[35rem] sm:w-[35rem]' />
        <div
          className='animate-float fixed left-[-20rem] top-[5rem] -z-10 h-[30rem] w-[40rem] rounded-full bg-gradient-to-br from-purple-400/15 via-pink-400/15 to-blue-400/15 blur-3xl sm:h-[40rem] sm:w-[50rem] md:left-[-15rem] lg:left-[-10rem] xl:left-[-5rem] 2xl:left-[0rem]'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='animate-float fixed bottom-[10rem] right-[-10rem] -z-10 h-[20rem] w-[30rem] rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 blur-2xl'
          style={{ animationDelay: '4s' }}
        />

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position='top-right' />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        {/* <Analytics />
        <SpeedInsights /> */}
      </body>
    </html>
  )
}

export default RootLayout
