'use client'

import Image from 'next/image'
import Link from 'next/link'
import { IStrapiImageData, ProjectDataAttributes } from '@/types/types'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import {
  useAnimationOnScroll,
  useStaggeredAnimation,
} from '@/lib/animation-hooks'
import {
  FaGithub,
  FaGooglePlay,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCode,
  FaMobile,
} from 'react-icons/fa'
import { useState } from 'react'
import { StrapiImage } from '@/shared/StrapiImage'

interface ProjectDetailProps {
  project: ProjectDataAttributes
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { ref: heroRef, className: heroAnimation } = useAnimationOnScroll({
    animationClass: 'animate-fade-in-up',
    delay: 100,
  })

  const { containerRef: galleryRef, getItemClassName: getGalleryItemClass } =
    useStaggeredAnimation({
      itemCount: project.imageUrls?.length || 0,
      delay: 200,
      staggerDelay: 100,
    })

  const { containerRef: contentRef, getItemClassName: getContentItemClass } =
    useStaggeredAnimation({
      itemCount: 4, // description, tech stack, links, etc.
      delay: 300,
      staggerDelay: 150,
    })

  return (
    <div className='relative min-h-screen'>
      {/* Background Gradients */}
      <div className='fixed inset-0 -z-10'>
        <div className='absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl' />
        <div
          className='absolute bottom-1/4 right-1/4 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br from-green-500/15 to-teal-500/15 blur-3xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Back Button */}
      <div className='fixed left-4 top-4 z-50'>
        <Link
          href='/#projects'
          className='special-border glass-card group flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
        >
          <FaArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className='text-sm font-medium'>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative px-4 pb-16 pt-20 sm:px-6 lg:px-8 ${heroAnimation}`}
      >
        <div className='mx-auto max-w-7xl'>
          <div className='mb-12 text-center'>
            {/* Project Category/Type Badge */}
            <div className='mb-6 inline-block'>
              <span className='special-border glass-card bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400'>
                {project.Tags?.[0]?.name || 'Mobile App'}
              </span>
            </div>

            {/* Project Title */}
            <h1 className='mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold leading-tight text-transparent dark:from-white dark:via-gray-100 dark:to-white md:text-6xl lg:text-7xl'>
              {project.title}
            </h1>

            {/* Project Description */}
            <p className='mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl'>
              {project.description ||
                'A showcase of problem-solving and creativity.'}
            </p>

            {/* Quick Actions */}
            <div className='mt-8 flex flex-col justify-center gap-4 sm:flex-row'>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-primary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
                >
                  <FaGithub className='h-5 w-5' />
                  View Source
                  <FaExternalLinkAlt className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
                </a>
              )}
              {project.googlePlayLink && (
                <a
                  href={project.googlePlayLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-secondary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
                >
                  <FaGooglePlay className='h-5 w-5' />
                  Get App
                  <FaExternalLinkAlt className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Screenshot Gallery */}
      {project.imageUrls?.length > 0 && (
        <section className='px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-6xl'>
            <div ref={galleryRef} className='mb-8 text-center'>
              <h2
                className={`mb-3 text-2xl font-bold md:text-3xl ${getGalleryItemClass(0)}`}
              >
                App Screenshots
              </h2>
              <p
                className={`text-sm text-gray-600 dark:text-gray-300 ${getGalleryItemClass(1)}`}
              >
                Explore {project.imageUrls.length} screens showcasing the
                app&apos;s interface
              </p>
            </div>

            {/* Compact Gallery Layout */}
            <div className={`${getGalleryItemClass(2)}`}>
              {/* Featured Image */}
              <div className='mb-6'>
                <div className='relative mx-auto aspect-[9/16] max-w-xs'>
                  <div className='special-border absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-lg'></div>
                  <div className='special-border glass-card relative z-10 h-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-900/30'>
                    <StrapiImage
                      src={
                        project.imageUrls[selectedImageIndex]?.formats?.medium
                          ?.url ||
                        project.imageUrls[selectedImageIndex]?.formats?.large
                          ?.url ||
                        ''
                      }
                      alt={`${project.title} screenshot ${selectedImageIndex + 1}`}
                      className='h-full w-full object-cover'
                      width={300}
                      height={600}
                    />
                  </div>

                  {/* Compact Navigation */}
                  {project.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === 0 ? project.imageUrls.length - 1 : prev - 1
                          )
                        }
                        className='special-border glass-card absolute left-2 top-1/2 z-20 -translate-y-1/2 p-2 text-xs transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
                      >
                        <FaArrowLeft className='h-3 w-3' />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImageIndex((prev) =>
                            prev === project.imageUrls.length - 1 ? 0 : prev + 1
                          )
                        }
                        className='special-border glass-card absolute right-2 top-1/2 z-20 -translate-y-1/2 p-2 text-xs transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
                      >
                        <FaArrowLeft className='h-3 w-3 rotate-180' />
                      </button>
                    </>
                  )}

                  {/* Compact Counter */}
                  <div className='special-border glass-card absolute bottom-2 left-1/2 z-20 -translate-x-1/2 bg-black/30 px-3 py-1 backdrop-blur-sm'>
                    <span className='text-xs font-medium text-white'>
                      {selectedImageIndex + 1} / {project.imageUrls.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Grid - Horizontal Scroll */}
              <div className='custom-scrollbar flex gap-3 overflow-x-auto px-2 pb-4'>
                {project.imageUrls.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`special-border group relative h-28 w-16 flex-shrink-0 overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'scale-110 shadow-md ring-2 ring-blue-500'
                        : 'opacity-70 hover:scale-105 hover:opacity-100'
                    }`}
                  >
                    <StrapiImage
                      src={
                        image.formats?.thumbnail?.url ||
                        image.formats?.small?.url ||
                        ''
                      }
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
                      width={60}
                      height={120}
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        selectedImageIndex === index
                          ? 'bg-blue-500/20'
                          : 'bg-black/0 group-hover:bg-black/10'
                      }`}
                    />
                    {/* Thumbnail index */}
                    <div className='absolute bottom-1 right-1 rounded bg-black/50 px-1 text-xs text-white'>
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className='mt-4 text-center'>
                <div className='special-border glass-card inline-flex items-center gap-4 bg-white/5 px-4 py-2 dark:bg-gray-900/20'>
                  <div className='flex items-center gap-1'>
                    <div className='h-2 w-2 rounded-full bg-green-500'></div>
                    <span className='text-xs text-gray-600 dark:text-gray-400'>
                      {project.imageUrls.length} Screenshots
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                    <span className='text-xs text-gray-600 dark:text-gray-400'>
                      Mobile App
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl'>
          <div ref={contentRef} className='grid gap-8 md:grid-cols-2 lg:gap-12'>
            {/* Project Description */}
            <div className={`space-y-6 ${getContentItemClass(0)}`}>
              <div className='mb-6 flex items-center gap-3'>
                <div className='special-border glass-card bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2'>
                  <FaCode className='h-5 w-5 text-blue-600 dark:text-blue-400' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white md:text-3xl'>
                  About This Project
                </h2>
              </div>

              <div className='prose prose-lg prose-gray max-w-none dark:prose-invert'>
                {project.longDescription &&
                project.longDescription.length > 0 ? (
                  <div className='space-y-4'>
                    <BlocksRenderer content={project.longDescription} />
                  </div>
                ) : (
                  <div className='space-y-4'>
                    <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
                      {project.description ||
                        'This project showcases modern mobile app development with a focus on user experience and clean design patterns.'}
                    </p>
                    <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
                      Built with attention to detail, this application
                      demonstrates best practices in mobile development,
                      responsive design, and user interface optimization.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Details & Links */}
            <div className='space-y-8'>
              {/* Tech Stack */}
              {project.Tags?.length > 0 && (
                <div className={getContentItemClass(1)}>
                  <div className='mb-4 flex items-center gap-3'>
                    <div className='special-border glass-card bg-gradient-to-r from-green-500/20 to-teal-500/20 p-2'>
                      <FaMobile className='h-5 w-5 text-green-600 dark:text-green-400' />
                    </div>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                      Tech Stack
                    </h3>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {project.Tags.map((tag) => (
                      <span
                        key={tag.id}
                        className='special-border glass-card bg-gradient-to-r from-gray-500/10 to-gray-600/10 px-3 py-2 text-sm font-medium text-gray-700 transition-transform duration-200 hover:scale-105 dark:text-gray-300'
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              <div className={`space-y-4 ${getContentItemClass(2)}`}>
                <h3 className='mb-4 text-xl font-bold text-gray-900 dark:text-white'>
                  Project Links
                </h3>

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='special-border glass-card group block w-full bg-gradient-to-r from-gray-500/5 to-gray-600/5 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-600/10'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <FaGithub className='h-5 w-5 text-gray-700 dark:text-gray-300' />
                        <div>
                          <div className='font-medium text-gray-900 dark:text-white'>
                            Source Code
                          </div>
                          <div className='text-sm text-gray-600 dark:text-gray-400'>
                            View on GitHub
                          </div>
                        </div>
                      </div>
                      <FaExternalLinkAlt className='h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
                    </div>
                  </a>
                )}

                {project.googlePlayLink && (
                  <a
                    href={project.googlePlayLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='special-border glass-card group block w-full bg-gradient-to-r from-green-500/5 to-teal-500/5 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-teal-500/10'
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <FaGooglePlay className='h-5 w-5 text-green-600 dark:text-green-400' />
                        <div>
                          <div className='font-medium text-gray-900 dark:text-white'>
                            Get The App
                          </div>
                          <div className='text-sm text-gray-600 dark:text-gray-400'>
                            Download on Google Play
                          </div>
                        </div>
                      </div>
                      <FaExternalLinkAlt className='h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
                    </div>
                  </a>
                )}
              </div>

              {/* Project Stats/Info */}
              <div
                className={`special-border glass-card bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-6 ${getContentItemClass(3)}`}
              >
                <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
                  Project Highlights
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Screenshots
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {project.imageUrls?.length || 0}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Technologies
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {project.Tags?.length || 0}
                    </span>
                  </div>
                  {project.googlePlayLink && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Platform
                      </span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        Google Play
                      </span>
                    </div>
                  )}
                  {project.githubLink && (
                    <div className='flex items-center justify-between'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        Source
                      </span>
                      <span className='font-medium text-gray-900 dark:text-white'>
                        Available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
