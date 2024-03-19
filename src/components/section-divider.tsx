'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ISectionDividerProps {
  children?: ReactNode
}

export const SectionDivider: React.FC<ISectionDividerProps> = () => {
  return (
    <motion.div
      className='special-border my-24 hidden h-16 w-1 bg-gray-200 dark:bg-opacity-20 sm:block'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
    ></motion.div>
  )
}
