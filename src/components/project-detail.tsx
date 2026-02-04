'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import {
  FaGithub,
  FaGooglePlay,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaCode,
  FaMobile,
  FaStar,
  FaHeart,
} from 'react-icons/fa'

import { IStrapiImageData, ProjectDataAttributes } from '@/types/types'
import {
  useAnimationOnScroll,
  useStaggeredAnimation,
} from '@/lib/animation-hooks'
import { StrapiImage } from '@/shared/StrapiImage'
import {
  analyzeProject,
  getPlatformBadgeInfo,
  getStatusBadgeInfo,
  getDeveloperRoleInfo,
} from '@/lib/project-utils'

const BlocksRenderer = dynamic(
  () =>
    import('@strapi/blocks-react-renderer').then((mod) => mod.BlocksRenderer),
  { ssr: false }
)

const ProjectOverviewCards = dynamic(
  () =>
    import('@/components/project-overview-cards').then(
      (mod) => mod.ProjectOverviewCards
    ),
  { ssr: false }
)

const EnhancedGallery = dynamic(
  () =>
    import('@/components/enhanced-gallery').then((mod) => mod.EnhancedGallery),
  { ssr: false }
)

const FeaturesShowcase = dynamic(
  () =>
    import('@/components/features-showcase').then(
      (mod) => mod.FeaturesShowcase
    ),
  { ssr: false }
)

interface ProjectDetailProps {
  project: ProjectDataAttributes
}

export const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Analyze project data for smart content generation
  const analysis = analyzeProject(project)
  const platformBadge = getPlatformBadgeInfo(project.platformType)
  const statusBadge = getStatusBadgeInfo(project.projectStatus)
  const developerRole = getDeveloperRoleInfo(project.developerRole)
  const { ref: heroRef, className: heroAnimation } = useAnimationOnScroll({
    animationClass: 'animate-fade-in-up',
    delay: 100,
  })

  const { containerRef: overviewRef, getItemClassName: getOverviewItemClass } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 3, // overview cards
      delay: 200,
      staggerDelay: 100,
    })

  const { containerRef: contentRef, getItemClassName: getContentItemClass } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: 4, // content sections
      delay: 300,
      staggerDelay: 150,
    })

  // Enhanced tech stack with Flutter highlighting per user preference
  const getEnhancedTechStack = () => {
    if (!project.Tags || project.Tags.length === 0) return []

    return project.Tags.map((tag) => ({
      ...tag,
      isFlutter: tag.name.toLowerCase().includes('flutter'),
      isFavorite: tag.name.toLowerCase().includes('flutter'), // User prefers Flutter
    }))
  }

  const enhancedTags = getEnhancedTechStack()

  return (
    <div className='relative min-h-screen'>
      {/* Background Gradients */}
      <div className='fixed inset-0 -z-10'>
        <div className='from-primary-500/20 to-secondary-600/20 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-linear-to-br blur-3xl' />
        <div
          className='from-accent-500/20 absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-linear-to-br to-orange-500/20 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-linear-to-br from-green-500/15 to-teal-500/15 blur-3xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Back Button */}
      <div className='fixed top-4 left-4 z-50'>
        <Link
          href='/#projects'
          className='special-border glass-card group flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/40'
        >
          <FaArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className='text-sm font-medium'>Back to Projects</span>
        </Link>
      </div>

      {/* Enhanced Hero Section */}
      <section
        ref={heroRef}
        className={`relative px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8 ${heroAnimation}`}
      >
        <div className='mx-auto max-w-7xl'>
          <div className='mb-8 text-center'>
            {/* Enhanced Project Category/Type Badge */}
            <div className='mb-6 flex flex-wrap justify-center gap-3'>
              <span
                className={`special-border glass-card bg-linear-to-r ${platformBadge?.color} px-4 py-2 text-sm font-medium ${platformBadge?.textColor}`}
              >
                {platformBadge?.label}
              </span>

              {/* Project Status Badge */}
              <span
                className={`special-border glass-card bg-linear-to-r ${statusBadge?.color} px-4 py-2 text-sm font-medium ${statusBadge?.textColor}`}
              >
                {statusBadge?.label}
              </span>

              {/* Featured Project Badge */}
              {project.isFeatured && (
                <span className='special-border glass-card flex items-center gap-2 bg-linear-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400'>
                  <FaStar className='h-4 w-4' />
                  Featured
                </span>
              )}
            </div>

            {/* Project Title */}
            <h1 className='mb-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-white'>
              {project.title}
            </h1>

            {/* Enhanced Project Description */}
            <p className='mx-auto mb-6 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300'>
              {project.description ||
                'A showcase of problem-solving and creativity.'}
            </p>

            {/* Quick Project Stats */}
            <div className='mb-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400'>
              <div className='flex items-center gap-2'>
                <div className='bg-primary-500 h-2 w-2 rounded-full'></div>
                <span>{project.Tags?.length || 0} Technologies</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span>{project.imageUrls?.length || 0} Screenshots</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-secondary-500 h-2 w-2 rounded-full'></div>
                <span>Complexity: {project.complexity}/5</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-orange-500'></div>
                <span>{developerRole}</span>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-primary special-border group inline-flex items-center gap-2 px-6 py-3 font-medium'
                >
                  <FaGithub className='h-5 w-5' />
                  View Source Code
                  <FaExternalLinkAlt className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
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
                  Download App
                  <FaExternalLinkAlt className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Screenshot Gallery */}
      {project.imageUrls?.length > 0 && (
        <section className='px-4 py-12 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-12 text-center'>
              <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
                Project Gallery
              </h2>
              <p className='text-lg text-gray-600 dark:text-gray-300'>
                Explore the interface and design in detail
              </p>
            </div>

            <EnhancedGallery
              images={project.imageUrls}
              videos={project.video}
              projectTitle={project.title}
              selectedIndex={selectedImageIndex}
              onIndexChange={setSelectedImageIndex}
            />
          </div>
        </section>
      )}

      {/* Enhanced Content Sections */}
      <section ref={contentRef} className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-5xl space-y-8'>
          {/* Technology Stack - Full Width */}
          {enhancedTags.length > 0 && (
            <div
              className={`special-border glass-card p-6 ${getContentItemClass(0)}`}
            >
              <div className='mb-5 flex items-center gap-3'>
                <div className='special-border glass-card bg-linear-to-r from-green-500/20 to-teal-500/20 p-2'>
                  <FaMobile className='h-5 w-5 text-green-600 dark:text-green-400' />
                </div>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                  Technology Stack
                </h2>
              </div>
              <div className='flex flex-wrap gap-2'>
                {enhancedTags.map((tag) => (
                  <span
                    key={tag.id}
                    className={`special-border glass-card px-3 py-2 text-sm font-medium transition-transform duration-200 hover:scale-105 ${
                      tag.isFavorite
                        ? 'from-primary-500/20 to-secondary-500/20 text-primary-700 ring-primary-500/30 dark:text-primary-300 bg-linear-to-r ring-2'
                        : 'bg-linear-to-r from-gray-500/10 to-gray-600/10 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {tag.isFavorite && (
                      <FaHeart className='mr-1 inline h-3 w-3' />
                    )}
                    {tag.name}
                    {tag.isFavorite && <span className='ml-1 text-xs'>★</span>}
                  </span>
                ))}
              </div>
              {enhancedTags.some((tag) => tag.isFavorite) && (
                <p className='text-primary-600 dark:text-primary-400 mt-4 text-sm'>
                  ★ Flutter is highlighted as the preferred technology for
                  mobile development
                </p>
              )}
            </div>
          )}

          {/* About This Project - Full Width */}
          <div
            className={`special-border glass-card p-6 ${getContentItemClass(1)}`}
          >
            <div className='mb-5 flex items-center gap-3'>
              <div className='special-border glass-card from-primary-500/20 to-secondary-500/20 bg-linear-to-r p-2'>
                <FaCode className='text-primary-600 dark:text-primary-400 h-5 w-5' />
              </div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                About This Project
              </h2>
            </div>
            <div className='prose prose-lg prose-gray dark:prose-invert max-w-none'>
              {project.longDescription && project.longDescription.length > 0 ? (
                <BlocksRenderer content={project.longDescription} />
              ) : (
                <div className='space-y-4'>
                  <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
                    {project.description ||
                      'This project showcases modern development with a focus on user experience and clean design patterns.'}
                  </p>
                  <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
                    Built with attention to detail, this application
                    demonstrates best practices in{' '}
                    {['android', 'ios', 'android-and-ios'].includes(
                      project.platformType
                    )
                      ? 'mobile'
                      : 'web'}{' '}
                    development, responsive design, and user interface
                    optimization.
                  </p>
                  {project.isFeatured && (
                    <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
                      As a featured project, this work represents some of the
                      highest quality development in the portfolio.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Project Access & Analytics - Side by Side */}
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Project Links - Only show if there are links */}
            {(project.githubLink || project.googlePlayLink) && (
              <div
                className={`special-border glass-card bg-linear-to-br from-gray-500/5 to-slate-500/5 p-6 ${getContentItemClass(2)}`}
              >
                <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
                  Project Access
                </h3>
                <div className='space-y-3'>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='special-border glass-card group block w-full bg-linear-to-r from-gray-500/5 to-gray-600/5 p-4 transition-all duration-300 hover:from-gray-500/10 hover:to-gray-600/10'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <FaGithub className='h-5 w-5 text-gray-700 dark:text-gray-300' />
                          <div>
                            <div className='font-medium text-gray-900 dark:text-white'>
                              Source Code Repository
                            </div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>
                              View implementation details
                            </div>
                          </div>
                        </div>
                        <FaExternalLinkAlt className='h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                      </div>
                    </a>
                  )}
                  {project.googlePlayLink && (
                    <a
                      href={project.googlePlayLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='special-border glass-card group block w-full bg-linear-to-r from-green-500/5 to-teal-500/5 p-4 transition-all duration-300 hover:from-green-500/10 hover:to-teal-500/10'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <FaGooglePlay className='h-5 w-5 text-green-600 dark:text-green-400' />
                          <div>
                            <div className='font-medium text-gray-900 dark:text-white'>
                              Download Application
                            </div>
                            <div className='text-sm text-gray-600 dark:text-gray-400'>
                              Available on Google Play Store
                            </div>
                          </div>
                        </div>
                        <FaExternalLinkAlt className='h-4 w-4 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1' />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Project Analytics */}
            <div
              className={`special-border glass-card from-primary-500/5 to-secondary-500/5 bg-linear-to-br p-6 ${getContentItemClass(3)}`}
            >
              <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>
                Project Analytics
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Completeness Score
                  </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {analysis.projectInsights.completeness}%
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Technical Complexity
                  </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {analysis.projectInsights.technicalComplexity}/10
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Platform Reach
                  </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {analysis.projectInsights.platformReach} Platform
                    {analysis.projectInsights.platformReach !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-gray-600 dark:text-gray-400'>
                    Visual Documentation
                  </span>
                  <span className='font-medium text-gray-900 dark:text-white'>
                    {analysis.projectInsights.visualRichness} Asset
                    {analysis.projectInsights.visualRichness !== 1 ? 's' : ''}
                  </span>
                </div>
                {analysis.availabilityMetrics.accessibilityScore && (
                  <div className='flex items-center justify-between'>
                    <span className='text-gray-600 dark:text-gray-400'>
                      Accessibility
                    </span>
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {analysis.availabilityMetrics.accessibilityScore}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview Cards - before Key Features */}
      <section className='px-4 py-8 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <div ref={overviewRef} className={getOverviewItemClass(0)}>
            <ProjectOverviewCards project={project} analysis={analysis} />
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className='px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
          <FeaturesShowcase project={project} />
        </div>
      </section>
    </div>
  )
}
