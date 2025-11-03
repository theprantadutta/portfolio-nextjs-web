import { STRAPI_API_URL } from '@/constants/urls'
import {
  IStrapiApiResponse,
  ExperienceDataAttributes,
  ProjectDataAttributes,
  SkillDataAttributes,
} from '@/types/types'

const ONE_HOUR = 60 * 60

type SearchParamValue = string | number | boolean | null | undefined
type SearchParams =
  | Record<string, SearchParamValue | SearchParamValue[]>
  | URLSearchParams

interface StrapiFetchOptions<T> {
  searchParams?: SearchParams
  revalidate?: number
  tags?: string[]
}

const defaultHeaders = {
  Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
  'Content-Type': 'application/json',
}

const buildSearchParams = (params?: SearchParams) => {
  if (!params) return ''

  if (params instanceof URLSearchParams) {
    const queryString = params.toString()
    return queryString ? `?${queryString}` : ''
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item))
        }
      })
      return
    }

    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

const strapiFetch = async <T>(
  path: string,
  { searchParams, revalidate = ONE_HOUR, tags }: StrapiFetchOptions<T> = {}
) => {
  const url = `${STRAPI_API_URL}${path}${buildSearchParams(searchParams)}`

  const response = await fetch(url, {
    headers: defaultHeaders,
    next: {
      revalidate,
      tags,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Strapi request failed – ${response.status} ${response.statusText}`
    )
  }

  return (await response.json()) as T
}

export const getAllExperiences = async () => {
  return strapiFetch<IStrapiApiResponse<ExperienceDataAttributes>>(
    '/experiences',
    {
      searchParams: {
        sort: 'sortBy:asc',
        'fields[0]': 'id',
        'fields[1]': 'title',
        'fields[2]': 'location',
        'fields[3]': 'description',
        'fields[4]': 'date',
        'fields[5]': 'sortBy',
      },
      tags: ['experiences'],
    }
  )
}

export const getAllFeaturedProjects = async () => {
  return strapiFetch<IStrapiApiResponse<ProjectDataAttributes>>('/projects', {
    searchParams: {
      sort: 'sortBy:asc',
      'filters[isFeatured][$eq]': 'true',
      'fields[0]': 'id',
      'fields[1]': 'documentId',
      'fields[2]': 'title',
      'fields[3]': 'description',
      'fields[4]': 'googlePlayLink',
      'fields[5]': 'githubLink',
      'fields[6]': 'sortBy',
      'fields[7]': 'slug',
      'populate[Tags][fields][0]': 'id',
      'populate[Tags][fields][1]': 'name',
      'populate[cover][fields][0]': 'formats',
      'populate[cover][fields][1]': 'url',
      'populate[imageUrls][fields][0]': 'formats',
      'populate[imageUrls][fields][1]': 'url',
    },
    tags: ['projects'],
  })
}

export const getAllProjects = async () => {
  return strapiFetch<IStrapiApiResponse<ProjectDataAttributes>>('/projects', {
    searchParams: {
      sort: 'sortBy:asc',
      'fields[0]': 'id',
      'fields[1]': 'documentId',
      'fields[2]': 'title',
      'fields[3]': 'description',
      'fields[4]': 'longDescription',
      'fields[5]': 'googlePlayLink',
      'fields[6]': 'githubLink',
      'fields[7]': 'sortBy',
      'fields[8]': 'slug',
      'populate[Tags][fields][0]': 'id',
      'populate[Tags][fields][1]': 'name',
      'populate[cover][fields][0]': 'formats',
      'populate[cover][fields][1]': 'url',
      'populate[imageUrls][fields][0]': 'formats',
      'populate[imageUrls][fields][1]': 'url',
    },
    tags: ['projects'],
  })
}

export const getAllSkills = async () => {
  return strapiFetch<IStrapiApiResponse<SkillDataAttributes>>('/skills', {
    searchParams: {
      sort: 'title:asc',
      'fields[0]': 'id',
      'fields[1]': 'title',
    },
    tags: ['skills'],
  })
}
