'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'
import Link from 'next/link'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'
import { useSectionInView } from '@/lib/hooks'
import { useActiveSectionContext } from '@/context/active-section-context'
import {
  useAnimationOnScroll,
  useStaggeredAnimation,
} from '@/lib/animation-hooks'
import profilePic from '@/../public/profile.png'
import { CV_PATH, GITHUB_LINK, LINKED_IN_LINK } from '@/constants/selectors'

interface IIntroProps {
  children?: ReactNode
}

export const Intro: React.FC<IIntroProps> = () => {
  const { ref } = useSectionInView('Home', 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  const profileAnimation = useAnimationOnScroll<HTMLDivElement>({
    delay: 100,
    animationClass: 'animate-scale-in',
  })

  const textAnimation = useAnimationOnScroll<HTMLDivElement>({
    delay: 300,
    animationClass: 'animate-fade-in-up',
  })

  const { containerRef: buttonsRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 4, // Profile image + buttons + social links
      delay: 500,
      staggerDelay: 100,
      animationClass: 'animate-fade-in-up',
    })

  return (
    <section
      ref={ref}
      id='home'
      className='relative mb-10 flex min-h-[80vh] max-w-[50rem] scroll-mt-[100rem] flex-col justify-center text-center sm:mb-0'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10'>
        {/* Main gradient orb */}
        <div className='animate-float absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl' />

        {/* Secondary gradient orbs */}
        <div
          className='animate-float absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-cyan-400/15 to-blue-500/15 blur-2xl'
          style={{ animationDelay: '1s' }}
        />
        <div
          className='animate-float absolute bottom-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-purple-400/15 to-pink-500/15 blur-2xl'
          style={{ animationDelay: '2s' }}
        />

        {/* Subtle pattern overlay */}
        <div className='bg-pattern-dots absolute inset-0 opacity-30 dark:opacity-10' />
      </div>

      {/* Profile Image Section */}
      <div
        className={`mb-8 flex items-center justify-center ${profileAnimation.className}`}
        ref={profileAnimation.ref}
      >
        <div className='group relative'>
          {/* Gradient border ring */}
          <div className='animate-glow absolute inset-0 h-28 w-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-sm transition-all duration-500 group-hover:opacity-100 group-hover:blur-md' />

          {/* Profile image container */}
          <div className='relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-110 dark:border-gray-800'>
            <Image
              src={profilePic}
              alt='pranta-portrait'
              fill
              quality='95'
              priority={true}
              className='object-cover transition-transform duration-500 group-hover:scale-110'
            />

            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
          </div>

          {/* Floating emoji */}
          <div className='absolute -bottom-2 -right-2 animate-bounce text-2xl transition-transform duration-300 group-hover:scale-125'>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'>
              <span className='text-lg'>👋</span>
            </div>
          </div>

          {/* Status indicator */}
          <div className='absolute right-0 top-0 h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg dark:border-gray-800'>
            <div className='h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <div
        className={`mb-10 px-4 ${textAnimation.className}`}
        ref={textAnimation.ref}
      >
        <h1 className='mb-6 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl'>
          <span className='mb-2 block'>
            <span className='text-gray-800 dark:text-gray-200'>
              Hello, I&apos;m{' '}
            </span>
            <span className='heading-primary'>Pranta</span>
            <span className='text-2xl sm:text-4xl'>.</span>
          </span>
          <span className='block text-xl font-medium text-gray-600 dark:text-gray-400 sm:text-3xl lg:text-4xl'>
            I&apos;m a{' '}
            <span className='text-gradient font-semibold'>
              full-stack developer
            </span>{' '}
            with <span className='text-gradient font-semibold'>3 years</span> of
            experience.
          </span>
        </h1>

        <div className='mx-auto max-w-2xl'>
          <p className='text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl'>
            My focus is{' '}
            <span className='text-gradient font-semibold'>Flutter</span> &{' '}
            <span className='text-gradient font-semibold'>React Native</span>
            {', crafting beautiful mobile experiences that users love.'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        ref={buttonsRef}
        className='flex flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:gap-6'
      >
        {/* Primary CTA */}
        <Link
          href='#contact'
          className={`btn-primary special-border group relative overflow-hidden px-8 py-4 ${getItemClassName(0)}`}
          onClick={() => {
            setActiveSection('Contact')
            setTimeOfLastClick(Date.now())
          }}
        >
          <span className='relative z-10 flex items-center gap-2'>
            Contact me here
            <BsArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
          </span>

          {/* Animated background */}
          <div className='animate-gradient absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        </Link>

        {/* Download CV */}
        <a
          className={`btn-secondary special-border group relative overflow-hidden px-8 py-4 ${getItemClassName(1)}`}
          href={CV_PATH}
          download
        >
          <span className='relative z-10 flex items-center gap-2'>
            <HiDownload className='transition-transform duration-300 group-hover:translate-y-1' />
            Download CV
          </span>
        </a>
      </div>

      {/* Social Links */}
      <div className={`mt-8 flex justify-center gap-4 ${getItemClassName(2)}`}>
        <a
          className='glass-card special-border group relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          href={LINKED_IN_LINK}
          target='_blank'
          rel='noopener noreferrer'
        >
          <BsLinkedin className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />

          {/* Hover glow */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100' />
        </a>

        <a
          className='glass-card special-border group relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          href={GITHUB_LINK}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithubSquare className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />

          {/* Hover glow */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100' />
        </a>
      </div>

      {/* Availability Badge */}
      <div className={`mt-8 flex justify-center ${getItemClassName(3)}`}>
        <div className='glass-card special-border border border-green-200 px-4 py-2 dark:border-green-800'>
          <div className='flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400'>
            <div className='h-2 w-2 animate-pulse rounded-full bg-green-500' />
            <span>Available to hire</span>
          </div>
        </div>
      </div>
    </section>
  )
}
