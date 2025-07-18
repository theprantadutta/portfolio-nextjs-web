'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
// import { motion } from 'motion/react'
import * as motion from 'motion/react-m'
import { SectionHeading } from '@/components/section-heading'

interface IAboutProps {
  children?: ReactNode
}

export const About: React.FC<IAboutProps> = () => {
  const { ref } = useSectionInView('About')

  return (
    <motion.section
      ref={ref}
      className='mb-28 max-w-[45rem] scroll-mt-28 text-center leading-8 sm:mb-40'
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id='about'
    >
      <SectionHeading>About me</SectionHeading>
      <p className='mb-3'>
        I graduated with a <span className='font-medium'>Computer Science</span>{' '}
        degree, then became a <span className='underline'>self-taught</span>{' '}
        programmer. I like to do{' '}
        <span className='underline'>full-stack web and mobile development</span>
        , but I mostly work with{' '}
        <span className='font-medium'>React Native & Flutter</span>.
      </p>

      <p className='mb-3'>
        Programming is not just a profession for me; it&apos;s a{' '}
        <span className='font-medium underline'>passion</span>. I love diving
        into <span className='underline'>new technologies</span> and exploring
        innovative ways to solve problems. The thrill of debugging and the{' '}
        <span className='underline'>satisfaction</span> of building something
        from scratch are what drive me. I spend a lot of time{' '}
        <span className='underline'>perfecting</span> my craft, constantly
        learning and evolving with the{' '}
        <span className='underline'>ever-changing tech landscape</span>.
      </p>

      <p className='mb-3'>
        I also did a good chunk of{' '}
        <span className='font-semibold'>System Design</span>. I designed and
        implemented a robust <span className='underline'>Ubuntu server</span>{' '}
        infrastructure for company operations, featuring{' '}
        <span className='font-medium underline'>
          GitLab, Docker, GitLab CI/CD, Prometheus and Grafana
        </span>{' '}
        with comprehensive health checks and a meticulous{' '}
        <span className='underline'>backup and restore policy</span> for system
        resilience.
      </p>

      <p>
        These days, I’ve also got a few{' '}
        <span className='font-semibold underline'>
          apps published on the Google Play Store
        </span>
        , built with{' '}
        <span className='font-medium'>Flutter and React Native</span>. Each one
        reflects my attention to detail, focus on performance, and love for
        clean UI/UX.
      </p>
    </motion.section>
  )
}
