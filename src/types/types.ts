export type ExperienceDataAttributes = {
  id: number
  title: string
  location: string
  description: string
  date: string
  sortBy: number
}

export type SkillDataAttributes = {
  id: number
  title: string
  rating: number
  isFavourite: boolean
}

export type PlatformType =
  | 'android'
  | 'ios'
  | 'android-and-ios'
  | 'web'
  | 'cloud'

export type ProjectStatus = 'planned' | 'ongoing' | 'completed'

export type DeveloperRole =
  | 'solo'
  | 'small-team'
  | 'cross-functional'
  | 'feature-ownership'
  | 'freelance'
  | 'open-source'

export type FeatureFlag =
  | 'performant'
  | 'mobile-first'
  | 'cross-platform'
  | 'open-source'
  | 'production-ready'
  | 'well-documented'
  | 'secure'
  | 'modern-ui'
  | 'user-centered'
  | 'modern-dev'

export type ProjectDataAttributes = {
  id: number
  documentId: string
  title: string
  description: string
  longDescription?: any
  googlePlayLink?: string
  githubLink?: string
  cover: IStrapiImageData
  Tags: {
    id: number
    name: string
  }[]
  imageUrls: IStrapiImageData[]
  sortBy: number
  slug: string
  // New fields from Strapi
  isFeatured: boolean
  platformType: PlatformType
  projectStatus: ProjectStatus
  complexity: number
  startDate: string
  endDate?: string
  accentColor?: string
  developerRole: DeveloperRole
  video?: IStrapiImageData[]
  features: {
    id: number
    flag: FeatureFlag
  }[]
}

export interface IStrapiImageData {
  id: string
  formats: {
    large: IStrapiImageDataFormat
    small: IStrapiImageDataFormat
    thumbnail: IStrapiImageDataFormat
    medium: IStrapiImageDataFormat
  }
}

export interface IStrapiImageDataFormat {
  url: string
  height: number
  width: number
}

type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

type Meta = {
  pagination: Pagination
}

export interface IStrapiApiResponse<T> {
  data: T[]
  meta: Meta
}

export interface IStrapiApiSingleResponse<T> {
  data: T
  meta: Meta
}
