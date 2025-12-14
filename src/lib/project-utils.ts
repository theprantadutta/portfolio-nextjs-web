import { ProjectDataAttributes, PlatformType, FeatureFlag } from '@/types/types'
import {
  FaCode,
  FaMobile,
  FaRocket,
  FaLightbulb,
  FaTools,
  FaHeart,
  FaBolt,
  FaLock,
  FaPalette,
  FaGlobe,
} from 'react-icons/fa'
import React from 'react'

// Feature flag to full feature data mapping
export interface FeatureData {
  icon: React.ReactNode
  title: string
  description: string
  category:
    | 'design'
    | 'performance'
    | 'security'
    | 'compatibility'
    | 'deployment'
    | 'documentation'
    | 'development'
}

export const FEATURE_FLAG_MAP: Record<FeatureFlag, FeatureData> = {
  performant: {
    icon: React.createElement(FaBolt, { className: 'h-6 w-6' }),
    title: 'High Performance',
    description:
      'Fast loading times and smooth animations for an excellent user experience.',
    category: 'performance',
  },
  'mobile-first': {
    icon: React.createElement(FaMobile, { className: 'h-6 w-6' }),
    title: 'Mobile-First Design',
    description:
      'Optimized for mobile devices with intuitive touch interactions and responsive layouts.',
    category: 'design',
  },
  'cross-platform': {
    icon: React.createElement(FaGlobe, { className: 'h-6 w-6' }),
    title: 'Cross-Platform',
    description: 'Works seamlessly across different browsers and devices.',
    category: 'compatibility',
  },
  'open-source': {
    icon: React.createElement(FaCode, { className: 'h-6 w-6' }),
    title: 'Open Source',
    description: 'Source code is available for learning and contribution.',
    category: 'development',
  },
  'production-ready': {
    icon: React.createElement(FaRocket, { className: 'h-6 w-6' }),
    title: 'Production Ready',
    description: 'Deployed and available in app stores for real users.',
    category: 'deployment',
  },
  'well-documented': {
    icon: React.createElement(FaLightbulb, { className: 'h-6 w-6' }),
    title: 'Well Documented',
    description: 'Comprehensive documentation and detailed project insights.',
    category: 'documentation',
  },
  secure: {
    icon: React.createElement(FaLock, { className: 'h-6 w-6' }),
    title: 'Reliable & Secure',
    description:
      'Built with security best practices and reliable architecture.',
    category: 'security',
  },
  'modern-ui': {
    icon: React.createElement(FaPalette, { className: 'h-6 w-6' }),
    title: 'Modern UI/UX',
    description:
      'Contemporary user interface with attention to design details.',
    category: 'design',
  },
  'user-centered': {
    icon: React.createElement(FaHeart, { className: 'h-6 w-6' }),
    title: 'User-Centered',
    description: 'Designed with user experience and accessibility in mind.',
    category: 'design',
  },
  'modern-dev': {
    icon: React.createElement(FaTools, { className: 'h-6 w-6' }),
    title: 'Modern Development',
    description: 'Leverages latest development tools and methodologies.',
    category: 'development',
  },
}

export interface ProjectAnalysis {
  platformType: PlatformType
  technologyStack: {
    frontend: string[]
    backend: string[]
    mobile: string[]
    tools: string[]
  }
  availabilityMetrics: {
    hasLiveDemo: boolean
    hasSourceCode: boolean
    hasAppStore: boolean
    accessibilityScore: number
  }
  contentQuality: {
    hasDetailedDescription: boolean
    visualAssetCount: number
    technologyDiversity: number
    completenessScore: number
  }
  featuredProject: boolean
  projectInsights: {
    completeness: number
    platformReach: number
    technicalComplexity: number
    visualRichness: number
  }
}

export const analyzeProject = (
  project: ProjectDataAttributes
): ProjectAnalysis => {
  // Use real platformType from Strapi
  const platformType = project.platformType

  // Categorize technology stack
  const technologyStack = categorizeTags(project.Tags || [])

  // Calculate availability metrics
  const availabilityMetrics = calculateAvailability(project)

  // Assess content quality
  const contentQuality = assessContentRichness(project)

  // Use real isFeatured from Strapi
  const featuredProject = project.isFeatured

  // Generate project insights using real data
  const projectInsights = generateProjectInsights(project)

  return {
    platformType,
    technologyStack,
    availabilityMetrics,
    contentQuality,
    featuredProject,
    projectInsights,
  }
}

const categorizeTags = (
  tags: { id: number; name: string }[]
): ProjectAnalysis['technologyStack'] => {
  const frontend: string[] = []
  const backend: string[] = []
  const mobile: string[] = []
  const tools: string[] = []

  tags.forEach((tag) => {
    const name = tag.name.toLowerCase()

    if (
      [
        'react',
        'vue',
        'angular',
        'next.js',
        'nuxt',
        'html',
        'css',
        'javascript',
        'typescript',
      ].includes(name)
    ) {
      frontend.push(tag.name)
    } else if (
      [
        'node.js',
        'express',
        'nestjs',
        'django',
        'flask',
        'spring',
        'laravel',
      ].includes(name)
    ) {
      backend.push(tag.name)
    } else if (
      ['flutter', 'react native', 'android', 'ios', 'kotlin', 'swift'].includes(
        name
      )
    ) {
      mobile.push(tag.name)
    } else {
      tools.push(tag.name)
    }
  })

  return { frontend, backend, mobile, tools }
}

const calculateAvailability = (
  project: ProjectDataAttributes
): ProjectAnalysis['availabilityMetrics'] => {
  const hasLiveDemo = !!project.googlePlayLink
  const hasSourceCode = !!project.githubLink
  const hasAppStore = !!project.googlePlayLink

  let accessibilityScore = 0
  if (hasLiveDemo) accessibilityScore += 40
  if (hasSourceCode) accessibilityScore += 40
  if (project.imageUrls?.length > 0) accessibilityScore += 20

  return {
    hasLiveDemo,
    hasSourceCode,
    hasAppStore,
    accessibilityScore,
  }
}

const assessContentRichness = (
  project: ProjectDataAttributes
): ProjectAnalysis['contentQuality'] => {
  const hasDetailedDescription = !!(
    project.longDescription && project.longDescription.length > 0
  )
  const visualAssetCount = project.imageUrls?.length || 0
  const technologyDiversity = project.Tags?.length || 0

  let completenessScore = 0
  if (project.title) completenessScore += 10
  if (project.description) completenessScore += 15
  if (hasDetailedDescription) completenessScore += 25
  if (visualAssetCount > 0) completenessScore += 20
  if (technologyDiversity > 0) completenessScore += 15
  if (project.githubLink) completenessScore += 10
  if (project.googlePlayLink) completenessScore += 5

  return {
    hasDetailedDescription,
    visualAssetCount,
    technologyDiversity,
    completenessScore,
  }
}

const generateProjectInsights = (
  project: ProjectDataAttributes
): ProjectAnalysis['projectInsights'] => {
  // Completeness based on project status
  let completeness: number
  switch (project.projectStatus) {
    case 'completed':
      completeness = 100
      break
    case 'ongoing':
      // Random between 90-95 for ongoing projects
      completeness = 90 + Math.floor(Math.random() * 6)
      break
    case 'planned':
      completeness = 50
      break
    default:
      completeness = 0
  }

  let platformReach = 1
  if (project.googlePlayLink) platformReach += 1
  if (project.githubLink) platformReach += 1

  // Use real complexity from Strapi (1-5 scale, multiply by 2 for 1-10 scale)
  const technicalComplexity = project.complexity * 2
  const visualRichness = project.imageUrls?.length || 0

  return {
    completeness,
    platformReach,
    technicalComplexity,
    visualRichness,
  }
}

// Platform badge info based on real platformType from Strapi
export const getPlatformBadgeInfo = (platformType: PlatformType) => {
  const badges: Record<
    PlatformType,
    { label: string; color: string; textColor: string }
  > = {
    android: {
      label: 'Android App',
      color: 'from-green-500/20 to-emerald-500/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    ios: {
      label: 'iOS App',
      color: 'from-gray-500/20 to-slate-500/20',
      textColor: 'text-gray-600 dark:text-gray-400',
    },
    'android-and-ios': {
      label: 'Mobile App',
      color: 'from-blue-500/20 to-purple-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    web: {
      label: 'Web Application',
      color: 'from-cyan-500/20 to-teal-500/20',
      textColor: 'text-cyan-600 dark:text-cyan-400',
    },
    cloud: {
      label: 'Cloud Service',
      color: 'from-orange-500/20 to-amber-500/20',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  }

  return badges[platformType]
}

// Project status badge info
export const getStatusBadgeInfo = (
  status: ProjectDataAttributes['projectStatus']
) => {
  const badges: Record<
    ProjectDataAttributes['projectStatus'],
    { label: string; color: string; textColor: string }
  > = {
    planned: {
      label: 'Planned',
      color: 'from-yellow-500/20 to-amber-500/20',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    ongoing: {
      label: 'In Progress',
      color: 'from-blue-500/20 to-cyan-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    completed: {
      label: 'Completed',
      color: 'from-green-500/20 to-emerald-500/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
  }

  return badges[status]
}

// Developer role display info
export const getDeveloperRoleInfo = (
  role: ProjectDataAttributes['developerRole']
) => {
  const roles: Record<ProjectDataAttributes['developerRole'], string> = {
    solo: 'Solo Developer',
    'small-team': 'Small Team',
    'cross-functional': 'Cross-functional Team',
    'feature-ownership': 'Feature Owner',
    freelance: 'Freelance Project',
    'open-source': 'Open Source Contributor',
  }

  return roles[role]
}

export const getOptimalImageSrc = (
  image: any,
  context: 'hero' | 'gallery' | 'thumbnail' = 'gallery'
) => {
  if (!image?.formats) return ''

  switch (context) {
    case 'hero':
      return image.formats.large?.url || image.formats.medium?.url || ''
    case 'gallery':
      return image.formats.medium?.url || image.formats.large?.url || ''
    case 'thumbnail':
      return image.formats.thumbnail?.url || image.formats.small?.url || ''
    default:
      return image.formats.medium?.url || ''
  }
}

// Helper to get features from feature flags
export const getProjectFeatures = (
  featureFlags: { id: number; flag: FeatureFlag }[]
): FeatureData[] => {
  return featureFlags.map((f) => FEATURE_FLAG_MAP[f.flag]).filter(Boolean)
}
