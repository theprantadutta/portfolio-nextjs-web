'use client'

import { ProjectDataAttributes } from '@/types/types'
import { ProjectAnalysis } from '@/lib/project-utils'
import {
  FaCode,
  FaMobile,
  FaGithub,
  FaGooglePlay,
  FaRocket,
  FaLightbulb,
  FaTools,
  FaHeart,
  FaFlask,
  FaBolt,
  FaLock,
  FaPalette,
  FaGlobe,
} from 'react-icons/fa'

interface FeaturesShowcaseProps {
  project: ProjectDataAttributes
  analysis: ProjectAnalysis
}

export const FeaturesShowcase = ({
  project,
  analysis,
}: FeaturesShowcaseProps) => {
  const generateFeatures = (): Feature[] => {
    const features: Feature[] = []

    // Based on platform type
    if (analysis.platformType === 'mobile-app') {
      features.push(
        {
          icon: <FaMobile className='h-6 w-6' />,
          title: 'Mobile-First Design',
          description:
            'Optimized for mobile devices with intuitive touch interactions and responsive layouts.',
          category: 'design',
        },
        {
          icon: <FaBolt className='h-6 w-6' />,
          title: 'High Performance',
          description:
            'Fast loading times and smooth animations for an excellent user experience.',
          category: 'performance',
        }
      )
    }

    if (analysis.platformType === 'web-app') {
      features.push({
        icon: <FaGlobe className='h-6 w-6' />,
        title: 'Cross-Platform',
        description: 'Works seamlessly across different browsers and devices.',
        category: 'compatibility',
      })
    }

    // Based on available technologies
    if (analysis.technologyStack.frontend.length > 0) {
      features.push({
        icon: <FaPalette className='h-6 w-6' />,
        title: 'Modern UI/UX',
        description: `Built with ${analysis.technologyStack.frontend.join(', ')} for a contemporary user interface.`,
        category: 'design',
      })
    }

    // Based on availability
    if (analysis.availabilityMetrics.hasSourceCode) {
      features.push({
        icon: <FaCode className='h-6 w-6' />,
        title: 'Open Source',
        description: 'Source code is available for learning and contribution.',
        category: 'development',
      })
    }

    if (analysis.availabilityMetrics.hasAppStore) {
      features.push({
        icon: <FaRocket className='h-6 w-6' />,
        title: 'Production Ready',
        description: 'Deployed and available in app stores for real users.',
        category: 'deployment',
      })
    }

    // Based on content quality
    if (analysis.contentQuality.hasDetailedDescription) {
      features.push({
        icon: <FaLightbulb className='h-6 w-6' />,
        title: 'Well Documented',
        description:
          'Comprehensive documentation and detailed project insights.',
        category: 'documentation',
      })
    }

    // Add some default features if we don't have enough
    if (features.length < 4) {
      const defaultFeatures = [
        {
          icon: <FaLock className='h-6 w-6' />,
          title: 'Reliable & Secure',
          description:
            'Built with security best practices and reliable architecture.',
          category: 'security',
        },
        {
          icon: <FaTools className='h-6 w-6' />,
          title: 'Modern Development',
          description: 'Leverages latest development tools and methodologies.',
          category: 'development',
        },
        {
          icon: <FaHeart className='h-6 w-6' />,
          title: 'User-Centered',
          description:
            'Designed with user experience and accessibility in mind.',
          category: 'design',
        },
      ]

      const needed = 6 - features.length
      features.push(...defaultFeatures.slice(0, needed))
    }

    return features.slice(0, 6) // Limit to 6 features
  }

  const generateInsights = (): Insight[] => {
    const insights: Insight[] = []

    // Development process insights
    insights.push({
      title: 'Development Approach',
      content:
        analysis.platformType === 'mobile-app'
          ? 'This mobile application was developed with a mobile-first approach, ensuring optimal performance and user experience on handheld devices.'
          : 'This project follows modern web development practices with emphasis on performance, accessibility, and maintainability.',
      icon: <FaFlask className='h-5 w-5' />,
    })

    // Technology insights
    if (project.Tags && project.Tags.length > 0) {
      const mainTech = project.Tags[0].name
      insights.push({
        title: 'Technology Choice',
        content: `${mainTech} was chosen as the primary technology for its ${getToolBenefits(mainTech)}. This decision ensures ${getTechAdvantages(mainTech)}.`,
        icon: <FaTools className='h-5 w-5' />,
      })
    }

    // Challenge insights
    insights.push({
      title: 'Key Challenges',
      content:
        analysis.platformType === 'mobile-app'
          ? 'The main challenges included optimizing for different screen sizes, managing app state efficiently, and ensuring smooth animations across various devices.'
          : 'Key challenges involved creating a responsive design, optimizing performance, and ensuring cross-browser compatibility.',
      icon: <FaLightbulb className='h-5 w-5' />,
    })

    // Future insights
    if (analysis.availabilityMetrics.hasSourceCode) {
      insights.push({
        title: 'Future Development',
        content:
          'The project is open for contributions and feature enhancements. Future development may include additional features, performance optimizations, and expanded platform support.',
        icon: <FaRocket className='h-5 w-5' />,
      })
    }

    return insights
  }

  const features = generateFeatures()
  const insights = generateInsights()

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

      {/* Development Insights */}
      {/* <section>
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Development Insights
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Behind the scenes of this project
          </p>
        </div>
        
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} index={index} />
          ))}
        </div>
      </section> */}
    </div>
  )
}

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  category: string
}

interface Insight {
  title: string
  content: string
  icon: React.ReactNode
}

interface FeatureCardProps {
  feature: Feature
  index: number
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      design: 'from-purple-500/20 to-pink-500/20',
      performance: 'from-green-500/20 to-teal-500/20',
      development: 'from-blue-500/20 to-indigo-500/20',
      security: 'from-red-500/20 to-orange-500/20',
      compatibility: 'from-yellow-500/20 to-orange-500/20',
      deployment: 'from-cyan-500/20 to-blue-500/20',
      documentation: 'from-indigo-500/20 to-purple-500/20',
    }
    return (
      colors[category as keyof typeof colors] ||
      'from-gray-500/20 to-gray-600/20'
    )
  }

  return (
    <div
      className={`special-border glass-card bg-gradient-to-br ${getCategoryColor(feature.category)} p-6 transition-all duration-300 hover:scale-[1.02]`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className='mb-4 flex items-center gap-3'>
        <div
          className={`special-border glass-card flex items-center justify-center bg-gradient-to-r ${getCategoryColor(feature.category)} p-2 text-gray-700 dark:text-gray-300`}
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
        <span className='text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500'>
          {feature.category}
        </span>
      </div>
    </div>
  )
}

interface InsightCardProps {
  insight: Insight
  index: number
}

const InsightCard = ({ insight, index }: InsightCardProps) => (
  <div
    className='special-border glass-card bg-gradient-to-r from-gray-500/5 to-gray-600/5 p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-500/10 hover:to-gray-600/10'
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className='flex gap-4'>
      <div className='special-border glass-card bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 text-blue-600 dark:text-blue-400'>
        {insight.icon}
      </div>
      <div className='flex-1'>
        <h3 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
          {insight.title}
        </h3>
        <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
          {insight.content}
        </p>
      </div>
    </div>
  </div>
)

// Helper functions for dynamic content generation
const getToolBenefits = (tool: string): string => {
  const benefits: Record<string, string> = {
    Flutter: 'cross-platform capabilities and excellent performance',
    React: 'component-based architecture and vast ecosystem',
    Vue: 'progressive framework approach and gentle learning curve',
    'Next.js': 'server-side rendering and optimization features',
    TypeScript: 'type safety and enhanced developer experience',
    'Node.js': 'JavaScript runtime and extensive package ecosystem',
  }
  return benefits[tool] || 'robust features and developer-friendly approach'
}

const getTechAdvantages = (tool: string): string => {
  const advantages: Record<string, string> = {
    Flutter: 'consistent UI across platforms and native performance',
    React: 'maintainable code and excellent community support',
    Vue: 'faster development and easier maintenance',
    'Next.js': 'better SEO and improved loading times',
    TypeScript: 'fewer bugs and better code documentation',
    'Node.js': 'full-stack JavaScript development and scalability',
  }
  return advantages[tool] || 'reliable performance and scalable architecture'
}
