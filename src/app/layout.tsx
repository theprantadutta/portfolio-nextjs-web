import './globals.css'

import React, { ReactNode } from 'react'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'

import { ActiveSectionContextProvider } from '@/context/active-section-context'
import { ThemeContextProvider } from '@/context/theme-context'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { StructuredData } from '@/components/structured-data'
import { LayoutWrapper } from '@/components/layout-wrapper'

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
        className={`${jetbrains.className} bg-gray-50 text-gray-950 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
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
