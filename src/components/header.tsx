'use client'

import React, { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'

import { links } from '@/lib/data'
import { useActiveSectionContext } from '@/context/active-section-context'
import { FiMenu, FiX } from 'react-icons/fi'

interface IHeaderProps {
  children?: ReactNode
}

export const Header: React.FC<IHeaderProps> = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='relative z-[999]'>
      <motion.div
        className='sm:special-border fixed left-1/2 top-0 hidden h-[4.5rem] w-full rounded-none border border-white border-opacity-40 bg-white bg-opacity-80 shadow-lg shadow-black/[0.03] backdrop-blur-[0.5rem] dark:border-black/40 dark:bg-gray-950 dark:bg-opacity-75 sm:top-6 sm:block sm:h-[3.25rem] sm:w-[36rem]'
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
      ></motion.div>

      {/* Desktop Menu */}
      <nav className='fixed left-1/2 top-[0.15rem] hidden h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:flex sm:h-[initial] sm:py-0'>
        <ul className='flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map((link) => (
            <motion.li
              className='relative flex h-3/4 items-center justify-center'
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  'flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-300',
                  {
                    'text-gray-950 dark:text-gray-200':
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name)
                  setTimeOfLastClick(Date.now())
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className='special-border absolute inset-0 -z-10 bg-gray-100 dark:bg-gray-800'
                    layoutId='activeSection'
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className='fixed right-4 top-4 z-[1000] sm:hidden'>
        <button
          onClick={toggleMenu}
          className='special-border flex h-[3rem] w-[3rem] items-center justify-center border border-white border-opacity-40 bg-gray-300 bg-opacity-80 shadow-2xl backdrop-blur-[0.5rem] transition-all hover:scale-[1.15] active:scale-105 dark:bg-gray-950 dark:text-gray-50'
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='fixed inset-0 z-[998] bg-gray-900 bg-opacity-50 backdrop-blur-sm'
          onClick={toggleMenu}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='absolute right-4 top-20 w-64 rounded-lg bg-white p-4 shadow-xl dark:bg-gray-900'
            onClick={(e) => e.stopPropagation()}
          >
            <ul className='flex flex-col gap-y-2'>
              {links.map((link) => (
                <motion.li
                  key={link.hash}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + links.indexOf(link) * 0.03 }}
                  className='relative'
                >
                  <Link
                    href={link.hash}
                    className={clsx(
                      'block rounded-md px-3 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800',
                      {
                        'bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-gray-50':
                          activeSection === link.name,
                      }
                    )}
                    onClick={() => {
                      setActiveSection(link.name)
                      setTimeOfLastClick(Date.now())
                      toggleMenu()
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* Original Code
      <nav className='fixed left-1/2 top-[0.15rem] flex h-12 -translate-x-1/2 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0'>
        <ul className='flex w-[22rem] flex-wrap items-center justify-center gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:w-[initial] sm:flex-nowrap sm:gap-5'>
          {links.map((link) => (
            <motion.li
              className='relative flex h-3/4 items-center justify-center'
              key={link.hash}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Link
                className={clsx(
                  'flex w-full items-center justify-center px-3 py-3 transition hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-300',
                  {
                    'text-gray-950 dark:text-gray-200':
                      activeSection === link.name,
                  }
                )}
                href={link.hash}
                onClick={() => {
                  setActiveSection(link.name)
                  setTimeOfLastClick(Date.now())
                }}
              >
                {link.name}

                {link.name === activeSection && (
                  <motion.span
                    className='special-border absolute inset-0 -z-10 bg-gray-100 dark:bg-gray-800'
                    layoutId='activeSection'
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  ></motion.span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      */}
    </header>
  )
}
