export type ExperienceDataAttributes = {
  id: number
  title: string
  location: string
  description: string
  date: string
  soryBy: number
}

export type SkillDataAttributes = {
  id: number
  title: string
}

export type ProjectDataAttributes = {
  id: number
  title: string
  description: string
  githubLink?: string
  Tags: {
    id: number
    name: string
  }[]
  imageUrls: IStrapiImageData[]
  soryBy: number
}

export interface IStrapiImageData {
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
