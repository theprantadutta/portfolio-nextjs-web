import './globals.css'

import React, { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'

import { Header } from '@/components/header'
import { ActiveSectionContextProvider } from '@/context/active-section-context'
import { Footer } from '@/components/footer'
import { ThemeSwitch } from '@/components/theme-switch'
import { ThemeContextProvider } from '@/context/theme-context'
import { SpeedInsights } from '@vercel/speed-insights/next'
import TriggerAnalytics from '@/components/TriggerAnalytics'

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
        className={`${inter.className} dark:text-opacity-90 relative bg-gray-50 pt-28 text-gray-950 sm:pt-36 dark:bg-gray-900 dark:text-gray-50`}
      >
        {/* <div className='special-border absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]' />
        <div className='special-border absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]' /> */}

        <div className='special-border fixed top-[-6rem] right-[11rem] -z-10 h-[31.25rem] w-[31.25rem] bg-[#6ed0ac] blur-[10rem] sm:w-[68.75rem] dark:bg-[#204f57]' />
        <div className='special-border fixed top-[-1rem] left-[-35rem] -z-10 h-[31.25rem] w-[50rem] bg-[#9bd2d3] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#3e7055]' />

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position='top-right' />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
        <TriggerAnalytics />
      </body>
    </html>
  )
}

export default RootLayout
