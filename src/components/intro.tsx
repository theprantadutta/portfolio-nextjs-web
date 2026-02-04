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
        <div className='from-primary-400/15 via-secondary-400/15 to-accent-400/15 absolute top-1/4 left-1/2 h-96 w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br opacity-70 blur-2xl' />
        <div className='from-primary-400/15 to-primary-500/15 absolute top-[32%] right-[12%] h-64 w-[16rem] rounded-full bg-linear-to-br opacity-60 blur-xl' />
        <div className='from-secondary-400/15 to-accent-500/15 absolute bottom-[18%] left-[18%] h-72 w-[18rem] rounded-full bg-linear-to-br opacity-60 blur-xl' />
      </div>

      {/* Profile */}
      <div className='flex items-center justify-center'>
        <div className='relative h-36 w-36'>
          <span className='from-primary-500 via-secondary-500 to-accent-500 absolute inset-0 rounded-full bg-linear-to-br opacity-25 blur-md' />
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
          <div className='absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 shadow-lg'>
            <span className='text-lg'>👋</span>
          </div>
          <div className='absolute top-0 right-0 h-6 w-6 rounded-full border-2 border-white bg-linear-to-br from-green-400 to-emerald-500 shadow-lg dark:border-gray-800'>
            <div className='h-full w-full animate-ping rounded-full bg-green-300 opacity-75' />
          </div>
        </div>
      </div>

      {/* Intro copy */}
      <div className='space-y-6'>
        <h1 className='text-3xl leading-tight font-bold text-gray-800 sm:text-5xl lg:text-6xl dark:text-gray-100'>
          <span className='block'>
            Hello, I&apos;m <span className='heading-primary'>Pranta</span>
            <span className='text-2xl sm:text-4xl'>.</span>
          </span>
          <span className='mt-3 block text-xl font-medium text-gray-600 sm:text-3xl lg:text-4xl dark:text-gray-400'>
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
        <p className='mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-400'>
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
          <span className='from-primary-600 via-secondary-600 to-primary-600 absolute inset-0 bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
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
          className='glass-card special-border group hover:text-primary-600 dark:hover:text-primary-400 relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 dark:text-gray-300'
          href={LINKED_IN_LINK}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit my LinkedIn profile'
        >
          <BsLinkedin className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
          <span className='from-primary-500/20 to-primary-600/20 absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100' />
        </a>

        <a
          className='glass-card special-border group relative flex h-12 w-12 items-center justify-center text-gray-700 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
          href={GITHUB_LINK}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Visit my GitHub profile'
        >
          <FaGithubSquare className='h-5 w-5 transition-transform duration-300 group-hover:scale-110' />
          <span className='absolute inset-0 rounded-2xl bg-linear-to-br from-gray-500/20 to-gray-700/20 opacity-0 blur-xs transition-opacity duration-300 group-hover:opacity-100' />
        </a>
      </div>
    </section>
  )
}
