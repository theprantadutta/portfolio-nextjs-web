import Image from 'next/image'
import type { ReactNode } from 'react'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'

import profilePic from '@/../public/profile.png'
import { CV_PATH, GITHUB_LINK, LINKED_IN_LINK } from '@/constants/selectors'
import { SectionMarker } from '@/components/section-marker'
import { SectionLink } from '@/components/section-link'

interface IIntroProps {
  children?: ReactNode
}

export const Intro: React.FC<IIntroProps> = () => {
  return (
    <section
      id='home'
      className='relative flex min-h-[70vh] scroll-mt-28 flex-col items-center justify-center gap-8 px-4 text-center sm:mb-0'
    >
      <SectionMarker section='Home' threshold={0.5} />

      {/* Background accents */}
      <div className='pointer-events-none absolute inset-0 -z-10 hidden md:block'>
        <div className='absolute left-1/2 top-1/4 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-pink-400/15 opacity-70 blur-2xl' />
        <div className='absolute right-[12%] top-[32%] h-[16rem] w-[16rem] rounded-full bg-gradient-to-br from-cyan-400/15 to-blue-500/15 opacity-60 blur-xl' />
        <div className='absolute bottom-[18%] left-[18%] h-[18rem] w-[18rem] rounded-full bg-gradient-to-br from-purple-400/15 to-pink-500/15 opacity-60 blur-xl' />
      </div>

      {/* Profile */}
      <div className='flex items-center justify-center'>
        <div className='relative h-36 w-36'>
          <span className='absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-25 blur-md' />
          <div className='relative h-36 w-36 overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-gray-800'>
            <Image
              src={profilePic}
              alt='Pranta Dutta - Full Stack Developer'
              fill
              priority
              sizes='144px'
              className='object-cover'
            />
          </div>
          <div className='absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg'>
            <span className='text-lg'>👋</span>
          </div>
          <div className='absolute right-0 top-0 h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg dark:border-gray-800'>
            <div className='h-full w-full animate-ping rounded-full bg-green-300 opacity-75' />
          </div>
        </div>
      </div>

      {/* Intro copy */}
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold leading-tight text-gray-800 dark:text-gray-100 sm:text-5xl lg:text-6xl'>
          <span className='block'>
            Hello, I&apos;m <span className='heading-primary'>Pranta</span>
            <span className='text-2xl sm:text-4xl'>.</span>
          </span>
          <span className='mt-3 block text-xl font-medium text-gray-600 dark:text-gray-400 sm:text-3xl lg:text-4xl'>
            Full-stack developer with{' '}
            <span className='text-gradient font-semibold'>4 years</span> of
            experience.
          </span>
        </h1>

        {/* <p className='mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl'>
          I build production-ready mobile and web experiences with{' '}
          <span className='text-gradient font-semibold'>Flutter</span> and{' '}
          <span className='text-gradient font-semibold'>React Native</span>,
          focusing on performance, polish, usability and reliable production
          deployments.
        </p> */}
        <p className='mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl'>
          I build mobile apps, backend APIs, and the infrastructure that
          connects them. 4 years shipping production systems in{' '}
          <span className='text-gradient font-semibold'>Flutter</span>,{' '}
          <span className='text-gradient font-semibold'>React Native</span>,{' '}
          <span className='text-gradient font-semibold'>Go</span>, and{' '}
          <span className='text-gradient font-semibold'>.NET</span> — plus a
          growing obsession with{' '}
          <span className='text-gradient font-semibold'>
            AI/LLM integrations
          </span>
          .
        </p>
      </div>

      {/* Calls-to-action */}
      <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6'>
        <SectionLink
          href='#contact'
          section='Contact'
          className='btn-primary special-border group relative overflow-hidden px-5 py-2.5'
        >
          <span className='relative z-10 flex items-center gap-2'>
            Contact me here
            <BsArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
          </span>
          <span className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
        </SectionLink>

        <a
          className='btn-secondary special-border group relative overflow-hidden px-5 py-2.5'
          href={CV_PATH}
          download
        >
          <span className='relative z-10 flex items-center gap-2'>
            <HiDownload className='transition-transform duration-300 group-hover:translate-y-1' />
            Download CV
          </span>
        </a>
      </div>

      {/* Social links */}
      <div className='mt-8 flex justify-center gap-4'>
        <a
          className='glass-card special-border group relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
          href={LINKED_IN_LINK}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit my LinkedIn profile'
        >
          <BsLinkedin className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
          <span className='absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100' />
        </a>

        <a
          className='glass-card special-border group relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          href={GITHUB_LINK}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit my GitHub profile'
        >
          <FaGithubSquare className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
          <span className='absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-700/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100' />
        </a>
      </div>
    </section>
  )
}
