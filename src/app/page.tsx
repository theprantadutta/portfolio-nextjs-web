import React from 'react'
import { NextPage } from 'next'

import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Experience } from '@/components/experience'
import { Intro } from '@/components/intro'
import { Projects } from '@/components/projects'
import { SectionDivider } from '@/components/section-divider'
import { Skills } from '@/components/skills'
import {
  IStrapiApiResponse,
  ExperienceDataAttributes,
  ProjectDataAttributes,
} from '@/types/types'
import { STRAPI_API_URL } from '@/constants/urls'

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

const Home: NextPage = async () => {
  const experiences = await getAllExperiences()
  const projects = await getAllProjects()
  const skills = await getAllSkills()
  return (
    <main className='flex flex-col items-center px-4'>
      <Intro />
      <SectionDivider />
      <About />
      <Projects showAllProjects={false} projects={projects} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Contact />
    </main>
  )
}

export default Home
