'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
import { motion } from 'motion/react'
import { SectionHeading } from '@/components/section-heading'
import { IStrapiApiResponse, SkillDataAttributes } from '@/types/types'

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
}

interface ISkillProps {
  children?: ReactNode
  skills: IStrapiApiResponse<SkillDataAttributes>
}

export const Skills: React.FC<ISkillProps> = ({ skills }) => {
  const { ref } = useSectionInView('Skills')

  return (
    <section
      id='skills'
      ref={ref}
      className='mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40'
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className='flex flex-wrap justify-center gap-2 text-lg text-gray-800'>
        {skills.data.map((skill, index) => (
          <motion.li
            className='borderBlack special-border bg-white px-5 py-3 dark:bg-white/10 dark:text-white/80'
            key={skill.id}
            variants={fadeInAnimationVariants}
            initial='initial'
            whileInView='animate'
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill.title}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
