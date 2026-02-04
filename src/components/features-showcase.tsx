'use client'

import { ProjectDataAttributes } from '@/types/types'
import { getProjectFeatures, FeatureData } from '@/lib/project-utils'

interface FeaturesShowcaseProps {
  project: ProjectDataAttributes
}

export const FeaturesShowcase = ({ project }: FeaturesShowcaseProps) => {
  // Get features from the project's feature flags
  const features = getProjectFeatures(project.features || [])

  // Don't render if no features
  if (features.length === 0) {
    return null
  }

  return (
    <div className='space-y-16'>
      {/* Features Grid */}
      <section>
        <div className='mb-8 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>
            Key Features
          </h2>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            What makes this project special
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  feature: FeatureData
  index: number
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      design: 'from-purple-500/20 to-pink-500/20',
      performance: 'from-green-500/20 to-teal-500/20',
      development: 'from-blue-500/20 to-indigo-500/20',
      security: 'from-red-500/20 to-orange-500/20',
      compatibility: 'from-yellow-500/20 to-orange-500/20',
      deployment: 'from-cyan-500/20 to-blue-500/20',
      documentation: 'from-indigo-500/20 to-purple-500/20',
    }
    return colors[category] || 'from-gray-500/20 to-gray-600/20'
  }

  return (
    <div
      className={`special-border glass-card bg-linear-to-br ${getCategoryColor(feature.category)} p-6 transition-all duration-300 hover:scale-[1.02]`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className='mb-4 flex items-center gap-3'>
        <div
          className={`special-border glass-card flex items-center justify-center bg-linear-to-r ${getCategoryColor(feature.category)} p-2 text-gray-700 dark:text-gray-300`}
        >
          {feature.icon}
        </div>
        <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
          {feature.title}
        </h3>
      </div>
      <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
        {feature.description}
      </p>
      <div className='mt-3'>
        <span className='text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-500'>
          {feature.category}
        </span>
      </div>
    </div>
  )
}
