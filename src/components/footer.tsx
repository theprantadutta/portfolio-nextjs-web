import React, { ReactNode } from 'react'
import { Copyright } from '@/components/Copyright'

interface IFooterProps {
  children?: ReactNode
}

export const Footer: React.FC<IFooterProps> = () => {
  return (
    <footer className='mb-10 px-4 text-center text-gray-500'>
      <Copyright />
      <p className='text-xs font-semibold'>
        Built with Next.js, Tailwind CSS, Strapi and{' '}
        <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-transparent'>
          AI
        </span>
        {' ✨'}
      </p>
    </footer>
  )
}
