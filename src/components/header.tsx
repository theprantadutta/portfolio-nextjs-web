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
    delay: 0,
    staggerDelay: 20,
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
    // eslint-disable-next-line react-hooks/purity -- Date.now() is called in event handler, not during render
    setTimeOfLastClick(Date.now())
    setIsMenuOpen(false)
  }

  return (
    <header className='relative z-10'>
      {/* Desktop Navigation */}
      <nav
        ref={containerRef}
        className={`fixed top-6 left-1/2 z-1000 hidden -translate-x-1/2 transform rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-3xl transition-all duration-500 ease-out sm:block ${
          isScrolled
            ? 'border border-white/30 bg-white/20 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-gray-900/40'
            : 'border border-transparent bg-transparent'
        }`}
      >
        {/* Enhanced gradient overlay - only when scrolled */}
        <div
          className='from-primary-500/10 via-secondary-500/10 to-primary-500/10 absolute inset-0 rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-3xl bg-linear-to-r transition-opacity duration-500'
          style={{
            opacity: isScrolled ? 1 : 0,
          }}
        />

        <ul className='relative z-10 flex items-center gap-1 px-4 py-2'>
          {links.map((link, index) => {
            const IconComponent =
              navigationIcons[link.name as keyof typeof navigationIcons]
            const itemClassName = getItemClassName(index)

            return (
              <li className={`relative ${itemClassName}`} key={link.hash}>
                <Link
                  className={clsx(
                    'group relative flex items-center gap-2 rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-3xl px-4 py-2.5 text-sm font-medium transition-all duration-300',
                    {
                      'from-primary-600 to-secondary-600 shadow-primary-500/25 bg-linear-to-r text-white shadow-lg':
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
                    <div className='from-primary-500/10 to-secondary-500/10 absolute inset-0 rounded-xl bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className='fixed top-4 right-4 z-1001 sm:hidden'>
        <button
          onClick={toggleMenu}
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          className={`special-border glass-card relative h-12 w-12 transform border-white/30 bg-white/20 shadow-lg backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 dark:border-white/20 dark:bg-gray-900/40 ${isMenuOpen ? 'bg-linear-to-r from-red-500 to-pink-500 text-white shadow-red-500/25' : 'text-gray-700 dark:text-gray-300'} `}
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
                ? 'bg-linear-to-r from-red-500 to-pink-500 opacity-20 blur-lg'
                : 'from-primary-500 to-secondary-500 bg-linear-to-r opacity-0 blur-lg hover:opacity-20'
            } `}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='fixed inset-0 z-999 bg-black/60 backdrop-blur-xs transition-opacity duration-300 sm:hidden'
          onClick={toggleMenu}
        >
          {/* Mobile Menu Panel */}
          <div
            className={`glass-card special-border absolute top-20 right-4 w-72 transform border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/20 dark:bg-gray-900/40 ${isMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} `}
            style={{
              padding: '1.5rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced gradient background */}
            <div className='special-border from-primary-500/10 via-secondary-500/10 to-accent-500/10 absolute inset-0 bg-linear-to-br' />
            {/* Additional blur layer */}
            <div className='special-border absolute inset-0 backdrop-blur-lg' />

            <div className='relative'>
              {/* Menu Header */}
              <div className='mb-6'>
                <h3 className='mb-1 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                  Navigation
                </h3>
                <div className='from-primary-500 to-secondary-500 h-1 w-12 rounded-full bg-linear-to-r' />
              </div>

              {/* Menu Items */}
              <ul className='space-y-2'>
                {links.map((link, index) => {
                  const IconComponent =
                    navigationIcons[link.name as keyof typeof navigationIcons]

                  return (
                    <li
                      key={link.hash}
                      className={`transform transition-all duration-200 ease-out ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'} `}
                      style={{
                        transitionDelay: `${index * 30}ms`,
                      }}
                    >
                      <Link
                        href={link.hash}
                        className={clsx(
                          'group relative flex items-center gap-3 overflow-hidden rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-3xl px-4 py-3 text-base font-medium transition-all duration-300',
                          {
                            'from-primary-600 to-secondary-600 bg-linear-to-r text-white shadow-lg':
                              activeSection === link.name,
                            'hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 text-gray-700 hover:bg-linear-to-r dark:text-gray-300':
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
                              : 'from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 bg-linear-to-br group-hover:scale-110'
                          } `}
                        >
                          {IconComponent && (
                            <IconComponent
                              className={`h-4 w-4 transition-colors duration-300 ${
                                activeSection === link.name
                                  ? 'text-white'
                                  : 'text-primary-600 dark:text-primary-400'
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
                        <div className='from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 absolute inset-0 rounded-xl bg-linear-to-r transition-all duration-300' />
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
