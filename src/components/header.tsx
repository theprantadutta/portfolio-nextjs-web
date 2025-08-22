'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

import { links } from '@/lib/data'
import { useActiveSectionContext } from '@/context/active-section-context'
import { useStaggeredAnimation } from '@/lib/animation-hooks'
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBriefcase,
  FiStar,
  FiMail,
} from 'react-icons/fi'

interface IHeaderProps {
  children?: ReactNode
}

// Icon mapping for navigation items
const navigationIcons = {
  Home: FiHome,
  About: FiUser,
  Projects: FiBriefcase,
  Skills: FiStar,
  Experience: FiBriefcase,
  Contact: FiMail,
}

export const Header: React.FC<IHeaderProps> = () => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { containerRef, getItemClassName } = useStaggeredAnimation({
    itemCount: links.length,
    delay: 100,
    staggerDelay: 50,
    animationClass: 'animate-fade-in',
  })

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (sectionName: any) => {
    setActiveSection(sectionName)
    setTimeOfLastClick(Date.now())
    setIsMenuOpen(false)
  }

  return (
    <header className='relative z-[10]'>
      {/* Desktop Navigation Background - Only visible when scrolled */}
      {isScrolled && (
        <div
          className='special-border glass-card fixed left-1/2 top-6 hidden -translate-x-1/2 border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-out dark:border-white/20 dark:bg-gray-900/40 sm:block'
          style={{
            width: 'fit-content',
            padding: '0.5rem',
          }}
        >
          {/* Enhanced gradient overlay */}
          <div className='special-border absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10' />
          {/* Additional blur layer for better separation */}
          <div className='special-border absolute inset-0 backdrop-blur-md' />
        </div>
      )}

      {/* Desktop Navigation */}
      <nav
        ref={containerRef}
        className='fixed left-1/2 top-[1.875rem] z-[1000] hidden -translate-x-1/2 sm:flex'
      >
        <ul className='flex items-center gap-1 px-2'>
          {links.map((link, index) => {
            const IconComponent =
              navigationIcons[link.name as keyof typeof navigationIcons]
            const itemClassName = getItemClassName(index)

            return (
              <li className={`relative ${itemClassName}`} key={link.hash}>
                <Link
                  className={clsx(
                    'special-border group relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-300',
                    {
                      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25':
                        activeSection === link.name,
                      [`text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${
                        isScrolled
                          ? 'hover:bg-white/50 dark:hover:bg-white/10'
                          : 'hover:bg-white/30 dark:hover:bg-white/5'
                      }`]: activeSection !== link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => handleNavClick(link.name)}
                >
                  {IconComponent && <IconComponent className='h-4 w-4' />}
                  <span>{link.name}</span>

                  {/* Hover effect */}
                  {activeSection !== link.name && (
                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className='fixed right-4 top-4 z-[1001] sm:hidden'>
        <button
          onClick={toggleMenu}
          className={`special-border glass-card relative h-12 w-12 transform border-white/30 bg-white/20 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 dark:border-white/20 dark:bg-gray-900/40 ${isMenuOpen ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25' : 'text-gray-700 dark:text-gray-300'} `}
        >
          <div className='flex h-full w-full items-center justify-center'>
            {isMenuOpen ? (
              <FiX className='h-5 w-5' />
            ) : (
              <FiMenu className='h-5 w-5' />
            )}
          </div>

          {/* Glow effect */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              isMenuOpen
                ? 'bg-gradient-to-r from-red-500 to-pink-500 opacity-20 blur-lg'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 blur-lg hover:opacity-20'
            } `}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:hidden'
          onClick={toggleMenu}
        >
          {/* Mobile Menu Panel */}
          <div
            className={`glass-card special-border absolute right-4 top-20 w-72 transform border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/20 dark:bg-gray-900/40 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `}
            style={{
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced gradient background */}
            <div className='special-border absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10' />
            {/* Additional blur layer */}
            <div className='special-border absolute inset-0 backdrop-blur-lg' />

            <div className='relative'>
              {/* Menu Header */}
              <div className='mb-6'>
                <h3 className='mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                  Navigation
                </h3>
                <div className='h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500' />
              </div>

              {/* Menu Items */}
              <ul className='space-y-2'>
                {links.map((link, index) => {
                  const IconComponent =
                    navigationIcons[link.name as keyof typeof navigationIcons]

                  return (
                    <li
                      key={link.hash}
                      className={`transform transition-all duration-300 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'} `}
                      style={{
                        transitionDelay: `${index * 50}ms`,
                      }}
                    >
                      <Link
                        href={link.hash}
                        className={clsx(
                          'special-border group relative flex items-center gap-3 overflow-hidden px-4 py-3 text-base font-medium transition-all duration-300',
                          {
                            'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg':
                              activeSection === link.name,
                            'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:text-gray-300 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20':
                              activeSection !== link.name,
                          }
                        )}
                        onClick={() => handleNavClick(link.name)}
                      >
                        {/* Icon */}
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 ${
                            activeSection === link.name
                              ? 'bg-white/20'
                              : 'bg-gradient-to-br from-blue-100 to-purple-100 group-hover:scale-110 dark:from-blue-900/30 dark:to-purple-900/30'
                          } `}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`h-4 w-4 transition-colors duration-300 ${
                                activeSection === link.name
                                  ? 'text-white'
                                  : 'text-blue-600 dark:text-blue-400'
                              } `}
                            />
                          )}
                        </div>

                        {/* Text */}
                        <span className='flex-1'>{link.name}</span>

                        {/* Active indicator */}
                        {activeSection === link.name && (
                          <div className='h-2 w-2 rounded-full bg-white' />
                        )}

                        {/* Hover effect */}
                        <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 transition-all duration-300 group-hover:from-blue-500/5 group-hover:to-purple-500/5' />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
