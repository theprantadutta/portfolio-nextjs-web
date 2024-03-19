import { Header } from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import { ActiveSectionContextProvider } from '@/context/active-section-context'
import { Footer } from '@/components/footer'
import { ThemeSwitch } from '@/components/theme-switch'
import { ThemeContextProvider } from '@/context/theme-context'
import { Toaster } from 'react-hot-toast'
import React, { ReactNode } from 'react'

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
        <div className='special-border absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]'></div>
        <div className='special-border absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <Toaster position='top-right' />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
