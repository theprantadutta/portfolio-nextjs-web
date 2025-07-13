'use client'

import { LazyMotion, domAnimation } from 'motion/react'
import { ReactNode } from 'react'

export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
