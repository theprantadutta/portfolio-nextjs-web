import './globals.css'

import React, { ReactNode } from 'react'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { Header } from '@/components/header'
import { ActiveSectionContextProvider } from '@/context/active-section-context'
import { Footer } from '@/components/footer'
import { ThemeContextProvider } from '@/context/theme-context'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { StructuredData } from '@/components/structured-data'
import { ThemeSwitchLazy } from '@/components/theme-switch-lazy'

const isProduction = process.env.NODE_ENV === 'production'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

const themeInitialiser = `
try {
  const storageKey = 'theme';
  const stored = window.localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} catch (error) {
  // Fail silently – theming will fall back to default.
}
`

export const metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://pranta.dev'
      : 'http://localhost:3000'
  ),
  title: 'Pranta Dutta | Full Stack Developer Portfolio',
  description:
    'Pranta Dutta is a skilled full-stack developer with 3+ years of experience in Flutter, React Native, and modern web technologies. Explore his projects and get in touch.',
  keywords:
    'Pranta Dutta, Full Stack Developer, Flutter, React Native, Web Development, Portfolio',
  authors: [{ name: 'Pranta Dutta' }],
  creator: 'Pranta Dutta',
  openGraph: {
    title: 'Pranta Dutta | Full Stack Developer Portfolio',
    description:
      'Skilled full-stack developer specializing in Flutter & React Native mobile apps and modern web development.',
    url: '/',
    siteName: 'Pranta Dutta Portfolio',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/profile.png',
        width: 400,
        height: 400,
        alt: 'Pranta Dutta - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranta Dutta | Full Stack Developer Portfolio',
    description:
      'Skilled full-stack developer specializing in Flutter & React Native mobile apps and modern web development.',
    images: ['/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

interface IRootLayoutProps {
  children?: ReactNode
}

const RootLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html
      lang='en'
      className={`!scroll-smooth ${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Resource hints for better performance */}
        <link rel='preconnect' href='https://res.cloudinary.com' />
        <link rel='preconnect' href='https://pranta.vps.webdock.cloud' />
        <link rel='dns-prefetch' href='https://placehold.co' />
        <script dangerouslySetInnerHTML={{ __html: themeInitialiser }} />
      </head>
      <body
        className={`${jetbrains.className} relative bg-gray-50 pt-28 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 sm:pt-36`}
      >
        {/* <div className='special-border absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] bg-[#fbe2e3] blur-[10rem] dark:bg-[#946263] sm:w-[68.75rem]' />
        <div className='special-border absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] bg-[#dbd7fb] blur-[10rem] dark:bg-[#676394] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]' /> */}

        <div className='pointer-events-none fixed inset-0 -z-10 hidden lg:block'>
          <div className='absolute right-[10rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-cyan-400/15 opacity-75 blur-2xl' />
          <div className='absolute left-[-15rem] top-[6rem] h-[30rem] w-[38rem] rounded-full bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-70 blur-2xl' />
          <div className='absolute bottom-[8rem] right-[-8rem] h-[18rem] w-[28rem] rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-60 blur-xl' />
        </div>

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />
            <ThemeSwitchLazy />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        {isProduction && <Analytics />}
        {isProduction && <SpeedInsights />}
        <StructuredData />
      </body>
    </html>
  )
}

export default RootLayout
