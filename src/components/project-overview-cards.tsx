'use client'

import { ProjectDataAttributes } from '@/types/types'
import { ProjectAnalysis } from '@/lib/project-utils'
import {
  FaCode,
  FaMobile,
  FaGithub,
  FaGooglePlay,
  FaImage,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaTools,
} from 'react-icons/fa'

interface ProjectOverviewCardsProps {
  project: ProjectDataAttributes
  analysis: ProjectAnalysis
}

export const ProjectOverviewCards = ({
  project,
  analysis,
}: ProjectOverviewCardsProps) => {
  return (
    <div className='mb-12 grid gap-6 md:grid-cols-3'>
      {/* Key Metrics Card */}
      <div className='special-border glass-card bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-6'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='special-border glass-card bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2'>
            <FaCheckCircle className='h-5 w-5 text-blue-600 dark:text-blue-400' />
          </div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
            Project Metrics
          </h3>
        </div>

        <div className='space-y-3'>
          <MetricItem
            label='Completeness'
            value={`${analysis.projectInsights.completeness}%`}
            icon={<FaCheckCircle className='h-4 w-4' />}
          />
          <MetricItem
            label='Visual Assets'
            value={analysis.projectInsights.visualRichness}
            icon={<FaImage className='h-4 w-4' />}
          />
          <MetricItem
            label='Technologies'
            value={project.Tags?.length || 0}
            icon={<FaCode className='h-4 w-4' />}
          />
          <MetricItem
            label='Platform Reach'
            value={analysis.projectInsights.platformReach}
            icon={<FaGlobe className='h-4 w-4' />}
          />
        </div>
      </div>

      {/* Platform & Availability Card */}
      <div className='special-border glass-card bg-gradient-to-br from-green-500/5 to-teal-500/5 p-6'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='special-border glass-card bg-gradient-to-r from-green-500/20 to-teal-500/20 p-2'>
            <FaMobile className='h-5 w-5 text-green-600 dark:text-green-400' />
          </div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
            Platform Info
          </h3>
        </div>

        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 dark:text-gray-400'>Type</span>
            <span className='font-medium capitalize text-gray-900 dark:text-white'>
              {analysis.platformType.replace('-', ' ')}
            </span>
          </div>

          <div className='space-y-2'>
            {analysis.availabilityMetrics.hasSourceCode && (
              <div className='flex items-center gap-2 text-sm'>
                <FaGithub className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                <span className='text-green-600 dark:text-green-400'>
                  Source Available
                </span>
              </div>
            )}

            {analysis.availabilityMetrics.hasAppStore && (
              <div className='flex items-center gap-2 text-sm'>
                <FaGooglePlay className='h-4 w-4 text-gray-600 dark:text-gray-400' />
                <span className='text-green-600 dark:text-green-400'>
                  App Store Ready
                </span>
              </div>
            )}

            <div className='flex items-center gap-2 text-sm'>
              <FaTools className='h-4 w-4 text-gray-600 dark:text-gray-400' />
              <span className='text-gray-600 dark:text-gray-400'>
                Accessibility: {analysis.availabilityMetrics.accessibilityScore}
                %
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Status & Highlights Card */}
      <div className='special-border glass-card bg-gradient-to-br from-orange-500/5 to-pink-500/5 p-6'>
        <div className='mb-4 flex items-center gap-3'>
          <div className='special-border glass-card bg-gradient-to-r from-orange-500/20 to-pink-500/20 p-2'>
            <FaStar className='h-5 w-5 text-orange-600 dark:text-orange-400' />
          </div>
          <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
            Project Status
          </h3>
        </div>

        <div className='space-y-4'>
          {analysis.featuredProject && (
            <div className='special-border glass-card bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-3 text-center'>
              <div className='flex items-center justify-center gap-2'>
                <FaStar className='h-4 w-4 text-yellow-500' />
                <span className='font-medium text-yellow-700 dark:text-yellow-400'>
                  Featured Project
                </span>
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>
                Content Quality
              </span>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i <
                      Math.ceil(analysis.contentQuality.completenessScore / 20)
                        ? 'bg-green-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-400'>
                Tech Complexity
              </span>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i <
                      Math.ceil(
                        analysis.projectInsights.technicalComplexity / 2
                      )
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {analysis.contentQuality.hasDetailedDescription && (
              <div className='flex items-center gap-2 text-sm'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <span className='text-green-600 dark:text-green-400'>
                  Rich Content Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricItemProps {
  label: string
  value: string | number
  icon: React.ReactNode
}

const MetricItem = ({ label, value, icon }: MetricItemProps) => (
  <div className='flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <div className='text-gray-500 dark:text-gray-400'>{icon}</div>
      <span className='text-sm text-gray-600 dark:text-gray-400'>{label}</span>
    </div>
    <span className='font-medium text-gray-900 dark:text-white'>{value}</span>
  </div>
)
