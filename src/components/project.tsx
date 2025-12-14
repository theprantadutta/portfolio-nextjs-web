'use client'

import React, { ReactNode } from 'react'
import { useAnimationOnScroll } from '@/lib/animation-hooks'
import { ProjectDataAttributes } from '@/types/types'
import { ProjectModal } from './project-modal'
import { FaCode, FaMobile, FaDesktop, FaExternalLinkAlt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { StrapiImage } from '@/shared/StrapiImage'

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
  const router = useRouter()

  const animation = useAnimationOnScroll({
    delay: 200,
    animationClass: 'animate-fade-in-up',
  })

  const getProjectIcon = () => {
    const firstTag = Tags[0]?.name?.toLowerCase() || ''
    if (
      firstTag.includes('mobile') ||
      firstTag.includes('android') ||
      firstTag.includes('ios')
    ) {
      return <FaMobile className='h-4 w-4' />
    }
    if (
      firstTag.includes('web') ||
      firstTag.includes('react') ||
      firstTag.includes('next')
    ) {
      return <FaDesktop className='h-4 w-4' />
    }
    return <FaCode className='h-4 w-4' />
  }

  return (
    /* eslint-disable react-hooks/refs -- Animation hook pattern: ref and className are designed to be used during render */
    <div
      ref={animation.ref as React.RefObject<HTMLDivElement>}
      className={`group mb-10 ${animation.className}`}
    >
      {/* eslint-enable react-hooks/refs */}
      <div
        onClick={() => router.push(`/projects/${slug}`)}
        className='special-border glass-card relative mx-auto max-w-4xl cursor-pointer overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:bg-white/10 hover:shadow-2xl dark:border-gray-700/30 dark:bg-gray-900/20 dark:hover:bg-gray-900/30'
      >
        {/* Enhanced gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Content Layout */}
        <div className='grid gap-6 p-6 md:grid-cols-2'>
          {/* Left Column - Text Content */}
          <div className='relative z-10 flex flex-col justify-between space-y-4'>
            {/* Header with Icon and Category */}
            <div className='mb-3 flex items-center justify-between'>
              <div className='special-border glass-card flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1'>
                {getProjectIcon()}
                <span className='text-xs font-medium text-blue-600 dark:text-blue-400'>
                  {Tags[0]?.name || 'Project'}
                </span>
              </div>
              <div
                className='h-2 w-2 animate-pulse rounded-full bg-green-500'
                title='Available'
              />
            </div>

            {/* Project Title */}
            <h3 className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-xl font-bold leading-tight text-transparent dark:from-white dark:via-gray-200 dark:to-white md:text-2xl'>
              {title}
            </h3>

            {/* Project Description */}
            <p className='text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base'>
              {description.length > 110
                ? `${description.substring(0, 110)}...`
                : description}
            </p>

            {/* Technology Tags */}
            <div className='flex flex-wrap gap-2'>
              {Tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className='special-border glass-card bg-gradient-to-r from-gray-500/10 to-gray-600/10 px-3 py-1 text-xs font-medium text-gray-700 transition-transform duration-200 hover:scale-105 dark:text-gray-300'
                >
                  {tag.name}
                </span>
              ))}
              {Tags.length > 3 && (
                <span className='special-border glass-card bg-gradient-to-r from-orange-500/10 to-red-500/10 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400'>
                  +{Tags.length - 3}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <ProjectModal imageUrls={imageUrls} slug={slug} />
          </div>

          {/* Right Column - Project Image */}
          <div className='group/image relative'>
            <div className='special-border relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'>
              {/* Background Pattern */}
              <div className='absolute inset-0 opacity-10'>
                <div className='absolute inset-0 rotate-12 scale-150 transform bg-gradient-to-r from-blue-500/20 to-purple-500/20' />
              </div>

              {/* Main Project Image */}
              <div className='relative flex h-full items-center justify-center p-4'>
                <div className='special-border relative aspect-[9/16] w-full max-w-[170px] transform overflow-hidden bg-white shadow-xl transition-all duration-500 group-hover/image:rotate-2 group-hover/image:scale-105 dark:bg-gray-900'>
                  <StrapiImage
                    src={cover.formats.medium?.url || cover.formats.large.url}
                    alt={`${title} project preview`}
                    width={170}
                    height={300}
                    fill
                    sizes='(max-width: 768px) 100vw, 170px'
                    objectFit='cover'
                    className='object-cover'
                  />

                  {/* Image overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100' />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className='absolute right-3 top-3 h-2 w-2 animate-ping rounded-full bg-blue-500' />
              <div className='absolute bottom-3 left-3 h-2 w-2 animate-pulse rounded-full bg-purple-500' />

              {/* Screenshot Count Badge */}
              <div className='special-border glass-card absolute left-3 top-3 bg-black/20 px-2 py-1 backdrop-blur-sm'>
                <span className='text-xs font-medium text-white'>
                  {imageUrls.length}
                </span>
              </div>
            </div>

            {/* Hover Info */}
            <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/image:opacity-100'>
              <div className='special-border glass-card bg-white/90 px-3 py-2 backdrop-blur-sm dark:bg-gray-900/90'>
                <div className='flex items-center gap-2 text-sm font-medium'>
                  <FaExternalLinkAlt className='h-3 w-3' />
                  <span>View Project</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className='border-t border-white/10 bg-white/5 px-5 py-3 dark:border-gray-700/30 dark:bg-gray-900/20'>
          <div className='flex items-center justify-between text-xs text-gray-600 dark:text-gray-400'>
            <div className='flex items-center gap-3'>
              <span className='flex items-center gap-1'>
                <div className='h-2 w-2 rounded-full bg-green-500' />
                Active
              </span>
              <span>{Tags.length} Tech</span>
            </div>
            <span>{imageUrls.length} Screens</span>
          </div>
        </div>
      </div>
    </div>
  )
}
