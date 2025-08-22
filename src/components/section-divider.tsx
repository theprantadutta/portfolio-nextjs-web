'use client'

import React, { ReactNode } from 'react'
import { useAnimationOnScroll } from '@/lib/animation-hooks'

interface ISectionDividerProps {
  children?: ReactNode
}

export const SectionDivider: React.FC<ISectionDividerProps> = () => {
  const animation = useAnimationOnScroll<HTMLDivElement>({
    delay: 125,
    animationClass: 'animate-fade-in-up',
  })

  return (
    <div
      ref={animation.ref}
      className={`my-24 hidden sm:block ${animation.className}`}
    >
      <div className='flex justify-center'>
        <div className='h-16 w-1 rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-60 shadow-lg' />
      </div>
    </div>
  )
}
