'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IStrapiImageData, ProjectDataAttributes } from '@/types/types'

interface ProjectDetailProps {
  project: ProjectDataAttributes
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const getBestImageUrl = (image: IStrapiImageData) => {
    const formats = image.formats
    return (
      formats?.large?.url ||
      formats?.medium?.url ||
      formats?.small?.url ||
      formats?.thumbnail?.url
    )
  }

  return (
    <div className='mx-auto min-h-screen px-4 transition-colors duration-300 sm:px-6'>
      {/* Header */}
      <header className='pb-8 pt-6 text-center sm:pb-16 sm:pt-12'>
        <div className='mx-auto max-w-xl'>
          <h1 className='mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:mb-4 sm:text-4xl md:text-5xl'>
            {project.title}
          </h1>
          <p className='text-base text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl'>
            {project.description ||
              'A showcase of problem-solving and creativity.'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className='mx-auto max-w-[42rem] pb-12 sm:pb-20'>
        {/* Image Gallery */}
        {project.imageUrls?.length > 0 && (
          <div className='mb-12 sm:mb-20'>
            <div className='mb-4 flex flex-col sm:mb-6 sm:flex-row sm:items-center sm:justify-between'>
              <h2 className='mb-2 text-xl font-bold text-gray-900 dark:text-white sm:mb-0 sm:text-2xl'>
                App Screenshots
              </h2>
              <div className='text-sm text-gray-500 dark:text-gray-400'>
                {project.imageUrls.length} screens
              </div>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
              {project.imageUrls.map((image, index) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL}${getBestImageUrl(image)}`
                return (
                  <div key={image.id} className='group relative'>
                    <div className='relative aspect-[9/19.5] transform overflow-hidden rounded-lg transition-transform duration-300 group-hover:-translate-y-1 sm:rounded-xl'>
                      <Image
                        src={imageUrl}
                        alt={`${project.title} screenshot ${index + 1}`}
                        className='h-full w-full object-cover'
                        fill
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        quality={90}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Description & Meta */}
        <div className='space-y-8 sm:space-y-12'>
          {/* Description */}
          <div className='relative'>
            <div className='absolute -left-6 top-0 hidden h-full w-0.5 rounded-full bg-gradient-to-b from-gray-900 to-gray-700 sm:block'></div>
            <div>
              <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white sm:mb-4 sm:text-2xl'>
                About This Project
              </h2>
              <p className='text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg'>
                {project.description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className='rounded-lg bg-white/5 p-4 shadow-sm dark:bg-black/10 sm:rounded-xl sm:p-6'>
            <div className='space-y-4 sm:space-y-6'>
              {/* Tags */}
              {project.Tags?.length > 0 && (
                <div>
                  <h3 className='mb-2 text-base font-semibold text-gray-900 dark:text-white sm:mb-3 sm:text-lg'>
                    Tech Stack
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {project.Tags.map((tag) => (
                      <span
                        key={tag.id}
                        className='rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-gray-900 dark:bg-black/20 dark:text-gray-100 sm:px-3 sm:text-sm'
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* GitHub Link */}
              {project.githubLink && (
                <div>
                  <h3 className='mb-2 text-base font-semibold text-gray-900 dark:text-white sm:mb-3 sm:text-lg'>
                    Source Code
                  </h3>
                  <a
                    href={project.githubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='data:bg-white/5 inline-flex w-full items-center gap-2 rounded-lg bg-black/5 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10 dark:hover:bg-black/10 sm:gap-3 sm:px-4 sm:py-3 sm:text-sm'
                  >
                    <span className='flex-1 text-left'>View on GitHub</span>
                    <svg
                      className='h-3 w-3 sm:h-4 sm:w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      ></path>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
