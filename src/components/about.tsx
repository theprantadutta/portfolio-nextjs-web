'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
import {
  useAnimationOnScroll,
  useStaggeredAnimation,
} from '@/lib/animation-hooks'
import { SectionHeading } from '@/components/section-heading'

interface IAboutProps {
  children?: ReactNode
}

export const About: React.FC<IAboutProps> = () => {
  const { ref } = useSectionInView('About', 0.5)

  const sectionAnimation = useAnimationOnScroll<HTMLDivElement>({
    delay: 100,
    animationClass: 'animate-fade-in-up',
  })

  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 4, // Number of paragraphs
      delay: 300,
      staggerDelay: 150,
      animationClass: 'animate-fade-in-up',
    })

  return (
    <section ref={ref} id='about' className='section-spacing scroll-mt-28'>
      {/* Background Elements */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute right-0 top-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 blur-3xl' />
        <div className='absolute bottom-1/4 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-3xl' />
      </div>

      <div className='content-container'>
        {/* Section Header */}
        <div
          className={`mb-16 text-center ${sectionAnimation.className}`}
          ref={sectionAnimation.ref}
        >
          <SectionHeading>About Me</SectionHeading>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400'>
            Get to know more about my journey, passion, and expertise in
            technology
          </p>
        </div>

        {/* Content Grid */}
        <div className='grid items-start gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Text Content */}
          <div ref={containerRef} className='space-y-6 text-lg leading-relaxed'>
            <p className={`${getItemClassName(0)}`}>
              I graduated with a{' '}
              <span className='text-gradient font-semibold'>
                Computer Science
              </span>{' '}
              degree, then became a{' '}
              <span className='text-gradient-accent font-medium'>
                self-taught programmer
              </span>
              . I like to do{' '}
              <span className='font-medium underline decoration-blue-500'>
                full-stack web and mobile development
              </span>
              , but I mostly work with{' '}
              <span className='mono rounded bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 text-sm font-semibold dark:from-blue-900/30 dark:to-purple-900/30'>
                React Native & Flutter
              </span>
              .
            </p>

            <p className={`${getItemClassName(1)}`}>
              Programming is not just a profession for me; it&apos;s a{' '}
              <span className='text-gradient font-semibold'>passion</span>. I
              love diving into{' '}
              <span className='text-gradient-accent font-medium'>
                new technologies
              </span>{' '}
              and exploring innovative ways to solve problems. The thrill of
              debugging and the{' '}
              <span className='font-medium underline decoration-purple-500'>
                satisfaction
              </span>{' '}
              of building something from scratch are what drive me.
            </p>

            <p className={`${getItemClassName(2)}`}>
              I also have extensive experience in{' '}
              <span className='text-gradient font-semibold'>System Design</span>
              . I designed and implemented a robust{' '}
              <span className='mono rounded bg-gradient-to-r from-green-100 to-blue-100 px-2 py-1 text-sm font-medium dark:from-green-900/30 dark:to-blue-900/30'>
                Ubuntu server
              </span>{' '}
              infrastructure featuring{' '}
              <span className='font-medium underline decoration-green-500'>
                GitLab, Docker, CI/CD, Prometheus and Grafana
              </span>{' '}
              with comprehensive monitoring and backup strategies.
            </p>

            <p className={`${getItemClassName(3)}`}>
              These days, I&apos;ve published several{' '}
              <span className='text-gradient-accent font-semibold'>
                apps on the Google Play Store
              </span>
              , built with{' '}
              <span className='font-medium'>Flutter and React Native</span>.
              Each reflects my attention to detail, focus on performance, and
              love for clean UI/UX.
            </p>
          </div>

          {/* Skills & Highlights */}
          <div className='space-y-8'>
            {/* Tech Stack Highlights */}
            <div className={`card special-border ${getItemClassName(1)}`}>
              <h3 className='text-gradient mb-4 text-xl font-semibold'>
                Core Technologies
              </h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <h4 className='font-medium text-gray-800 dark:text-gray-200'>
                    Mobile
                  </h4>
                  <div className='space-y-1 text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-blue-500' />
                      <span>React Native</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-cyan-500' />
                      <span>Flutter</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-emerald-500' />
                      <span>Android/IOS</span>
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <h4 className='font-medium text-gray-800 dark:text-gray-200'>
                    Backend
                  </h4>
                  <div className='space-y-1 text-sm'>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-teal-500' />
                      <span>ASP.Net Core</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-green-500' />
                      <span>Node.js</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='h-2 w-2 rounded-full bg-purple-500' />
                      <span>System Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Highlights */}
            <div className={`card special-border ${getItemClassName(2)}`}>
              <h3 className='text-gradient-accent mb-4 text-xl font-semibold'>
                Achievements
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-emerald-500'>
                    <span className='text-sm font-bold text-white'>📱</span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-800 dark:text-gray-200'>
                      Published Apps
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Google Play Store
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-500'>
                    <span className='text-sm font-bold text-white'>🏗️</span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-800 dark:text-gray-200'>
                      Infrastructure Design
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Enterprise Solutions
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-red-500'>
                    <span className='text-sm font-bold text-white'>⚡</span>
                  </div>
                  <div>
                    <p className='font-medium text-gray-800 dark:text-gray-200'>
                      3+ Years Experience
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Full-Stack Development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
