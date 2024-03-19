'use client'

import { useTheme } from '@/context/theme-context'
import React, { ReactNode } from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

interface IThemeSwitchProps {
  children?: ReactNode
}

export const ThemeSwitch: React.FC<IThemeSwitchProps> = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className='special-border fixed bottom-5 right-5 flex h-[3rem] w-[3rem] items-center justify-center border border-white border-opacity-40 bg-gray-300 bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:bg-gray-950'
      onClick={toggleTheme}
    >
      {theme === 'light' ? <BsSun /> : <BsMoon />}
    </button>
  )
}
