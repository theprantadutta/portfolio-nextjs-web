'use client'

import React, { ReactNode } from 'react'
// import { motion } from 'motion/react'
import * as m from 'motion/react-m'

interface ISectionDividerProps {
  children?: ReactNode
}

export const SectionDivider: React.FC<ISectionDividerProps> = () => {
  return (
    <m.div
      className='special-border my-24 hidden h-16 w-1 bg-gray-200 dark:bg-opacity-20 sm:block'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    ></m.div>
  )
}
