'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { BsArrowRight, BsLinkedin } from 'react-icons/bs'
import { HiDownload } from 'react-icons/hi'
import { FaGithubSquare } from 'react-icons/fa'
import { useSectionInView } from '@/lib/hooks'
import { useActiveSectionContext } from '@/context/active-section-context'
import profilePic from '@/../public/profile.png'
import { CV_PATH, GITHUB_LINK, LINKED_IN_LINK } from '@/constants/selectors'

interface IIntroProps {
  children?: ReactNode
}

export const Intro: React.FC<IIntroProps> = () => {
  const { ref } = useSectionInView('Home', 0.5)
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

  return (
    <section
      ref={ref}
      id='home'
      className='mb-28 max-w-[50rem] scroll-mt-[100rem] text-center sm:mb-0'
    >
      <div className='flex items-center justify-center'>
        <div className='group relative'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
          >
            <Image
              src={profilePic}
              alt='pranta-portrait'
              width='192'
              height='192'
              quality='95'
              priority={true}
              className='h-24 w-24 rounded-full border-[0.35rem] border-white object-cover shadow-xl active:scale-105 group-hover:scale-105'
            />
          </motion.div>

          <motion.span
            className='absolute bottom-0 right-0 text-4xl group-hover:scale-105'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className='mb-10 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className='font-bold'>Hello, I&apos;m Pranta.</span> I&apos;m a{' '}
        <span className='font-bold'>full-stack developer</span> with{' '}
        <span className='font-bold'>3 years</span> of experience. My focus is{' '}
        <span className='underline'>Flutter</span> &{' '}
        <span className='underline'>React Native</span>.
      </motion.h1>

      <motion.div
        className='flex flex-col items-center justify-center gap-2 px-4 text-lg font-medium sm:flex-row'
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        {/*className='group flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-white outline-none transition hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105'*/}
        <Link
          href='#contact'
          className='btn group bg-gray-900 text-white hover:bg-gray-950'
          onClick={() => {
            setActiveSection('Contact')
            setTimeOfLastClick(Date.now())
          }}
        >
          Contact me here{' '}
          <BsArrowRight className='opacity-70 transition group-hover:translate-x-1' />
        </Link>

        {/*className='borderBlack group flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3 outline-none transition hover:scale-110 focus:scale-110 active:scale-105 dark:bg-white/10'*/}
        <a
          className='borderBlack btn group bg-white dark:bg-white/10'
          href={CV_PATH}
          download
        >
          Download CV{' '}
          <HiDownload className='opacity-60 transition group-hover:translate-y-1' />
        </a>

        <div className='flex'>
          <a
            className='borderBlack special-border mr-2 flex cursor-pointer items-center gap-2 bg-white p-4 text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60'
            href={LINKED_IN_LINK}
            target='_blank'
          >
            <BsLinkedin />
          </a>

          <a
            className='borderBlack special-border flex cursor-pointer items-center gap-2 bg-white p-4 text-[1.35rem] text-gray-700 transition hover:scale-[1.15] hover:text-gray-950 focus:scale-[1.15] active:scale-105 dark:bg-white/10 dark:text-white/60'
            href={GITHUB_LINK}
            target='_blank'
          >
            <FaGithubSquare />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
