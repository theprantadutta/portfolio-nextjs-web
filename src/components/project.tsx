'use client'

import React, { ReactNode, useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform } from 'motion/react'
import * as m from 'motion/react-m'
import { ProjectDataAttributes } from '@/types/types'
import { ProjectModal } from './project-modal'

type IProjectProps = {
  children?: ReactNode
} & ProjectDataAttributes

export const Project: React.FC<IProjectProps> = ({
  slug,
  title,
  description,
  Tags,
  imageUrls,
  cover,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  })

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1])

  // const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL}${cover.formats.large.url}`

  return (
    <m.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        willChange: 'scale, opacity', // Hint to the browser
      }}
      className='group mb-3 last:mb-0 sm:mb-8'
    >
      <section className='special-border relative max-w-[42rem] overflow-hidden border border-black/5 bg-gray-100 transition hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:h-[22rem] sm:pr-8 sm:group-even:pl-8'>
        <div className='flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem]'>
          <h3 className='text-2xl font-semibold'>{title}</h3>
          <p className='mt-2 leading-relaxed text-gray-700 dark:text-white/70'>
            {description.length > 150
              ? `${description.substring(0, 120)}...`
              : description}
          </p>
          <ul className='mt-4 flex flex-wrap gap-2 sm:mt-auto'>
            {Tags.slice(0, 2).map((tag, index) => (
              <li
                className='special-border bg-black/10 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-gray-900 dark:bg-black/20 dark:text-gray-100'
                key={index}
              >
                {tag.name}
              </li>
            ))}
          </ul>
          <ProjectModal imageUrls={imageUrls} slug={slug} />
        </div>

        <Image
          src={cover.formats.large.url}
          alt='Project I worked on'
          width={cover.formats.large.width}
          height={cover.formats.large.height}
          quality={95}
          className='absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg shadow-2xl transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block'
        />
      </section>
    </m.div>
  )
}
