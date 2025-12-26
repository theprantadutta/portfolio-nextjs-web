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
      className='special-border glass-card group fixed bottom-5 right-5 z-[998] flex h-[3.5rem] w-[3.5rem] items-center justify-center border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25 active:scale-95 dark:border-white/20 dark:bg-gray-900/40'
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
    >
      {/* Background gradient overlay */}
      <div className='special-border absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      {/* Glowing background for active state */}
      <div
        className={`special-border absolute inset-0 transition-all duration-500 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-100'
            : 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-100'
        }`}
      />

      {/* Icon container */}
      <div className='relative z-10 transition-transform duration-300 group-hover:scale-110'>
        {theme === 'light' ? (
          <BsSun
            className={`h-5 w-5 text-orange-600 transition-all duration-300 group-hover:rotate-180 group-hover:text-orange-500 dark:text-orange-400`}
          />
        ) : (
          <BsMoon
            className={`h-5 w-5 text-blue-600 transition-all duration-300 group-hover:-rotate-12 group-hover:text-blue-500 dark:text-blue-400`}
          />
        )}
      </div>

      {/* Pulsing indicator */}
      <div
        className={`absolute right-1 top-1 h-2 w-2 rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'animate-pulse bg-yellow-400'
            : 'animate-pulse bg-blue-400'
        }`}
      />

      {/* Hover glow effect */}
      <div
        className={`special-border absolute inset-0 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50 ${
          theme === 'light'
            ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
            : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}
      />
    </button>
  )
}
