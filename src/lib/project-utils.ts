import { ProjectDataAttributes } from '@/types/types'

export interface ProjectAnalysis {
  platformType: 'mobile-app' | 'web-app' | 'library' | 'tool'
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
  // Detect platform type
  const platformType = detectPlatformType(project)

  // Categorize technology stack
  const technologyStack = categorizeTags(project.Tags || [])

  // Calculate availability metrics
  const availabilityMetrics = calculateAvailability(project)

  // Assess content quality
  const contentQuality = assessContentRichness(project)

  // Determine if featured project
  const featuredProject = project.sortBy <= 3

  // Generate project insights
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

const detectPlatformType = (
  project: ProjectDataAttributes
): ProjectAnalysis['platformType'] => {
  const tags = project.Tags?.map((tag) => tag.name.toLowerCase()) || []

  if (
    project.googlePlayLink ||
    tags.some((tag) =>
      ['flutter', 'react native', 'android', 'ios', 'mobile', 'app'].includes(
        tag
      )
    )
  ) {
    return 'mobile-app'
  }

  if (
    tags.some((tag) =>
      ['react', 'vue', 'angular', 'next.js', 'nuxt', 'web', 'website'].includes(
        tag
      )
    )
  ) {
    return 'web-app'
  }

  if (
    tags.some((tag) =>
      ['library', 'package', 'npm', 'sdk', 'api'].includes(tag)
    )
  ) {
    return 'library'
  }

  return 'tool'
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
  const completeness = assessContentRichness(project).completenessScore

  let platformReach = 1
  if (project.googlePlayLink) platformReach += 1
  if (project.githubLink) platformReach += 1

  const technicalComplexity = Math.min(project.Tags?.length || 0, 10)
  const visualRichness = project.imageUrls?.length || 0

  return {
    completeness,
    platformReach,
    technicalComplexity,
    visualRichness,
  }
}

export const getPlatformBadgeInfo = (analysis: ProjectAnalysis) => {
  const { platformType } = analysis

  const badges = {
    'mobile-app': {
      label: 'Mobile App',
      color: 'from-blue-500/20 to-purple-500/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    'web-app': {
      label: 'Web Application',
      color: 'from-green-500/20 to-teal-500/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    library: {
      label: 'Library/Package',
      color: 'from-orange-500/20 to-red-500/20',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
    tool: {
      label: 'Development Tool',
      color: 'from-purple-500/20 to-pink-500/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
  }

  return badges[platformType]
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
