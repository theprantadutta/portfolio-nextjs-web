export type ExperienceDataAttributes = {
  title: string
  location: string
  description: string
  date: string
  soryBy: number
}

export type SkillDataAttributes = {
  title: string
}

export type ProjectDataAttributes = {
  title: string
  description: string
  githubLink?: string
  Tags: {
    id: number
    name: string
  }[]
  imageUrls: {
    data: {
      attributes: {
        formats: {
          large: {
            url: string
            height: number
            width: number
          }
        }
      }
    }[]
  }
  soryBy: number
}

type DataItem<T> = {
  id: number
  attributes: T
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
  data: DataItem<T>[]
  meta: Meta
}
