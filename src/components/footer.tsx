import React, { ReactNode } from 'react'
import { Copyright } from '@/components/Copyright'

interface IFooterProps {
  children?: ReactNode
}

export const Footer: React.FC<IFooterProps> = () => {
  return (
    <footer className='mb-10 px-4 text-center text-gray-500'>
      <Copyright />
      <p className='text-xs'>
        <span className='font-semibold'>About this website:</span> built with
        React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS,
        Framer Motion, React Email & Resend, Vercel hosting.
      </p>
    </footer>
  )
}
