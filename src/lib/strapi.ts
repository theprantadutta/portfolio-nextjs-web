import { STRAPI_API_URL } from '@/constants/urls'
import {
  IStrapiApiResponse,
  ExperienceDataAttributes,
  ProjectDataAttributes,
} from '@/types/types'

export const getAllExperiences = async () => {
  const data = await fetch(`${STRAPI_API_URL}/experiences?sort=sortBy:asc`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  return (await data.json()) as IStrapiApiResponse<ExperienceDataAttributes>
}

export const getAllProjects = async () => {
  const data = await fetch(
    `${STRAPI_API_URL}/projects?populate=*&filters[isFeatured][$eq]=true&sort=sortBy:asc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return (await data.json()) as IStrapiApiResponse<ProjectDataAttributes>
}

export const getAllSkills = async () => {
  const data = await fetch(`${STRAPI_API_URL}/skills`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
  return (await data.json()) as IStrapiApiResponse<ProjectDataAttributes>
}
