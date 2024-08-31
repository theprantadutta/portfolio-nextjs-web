import { Projects } from '@/components/projects'
import { IStrapiApiResponse, ProjectDataAttributes } from '@/types/types'
import { NextPage } from 'next'

export const getAllProjects = async () => {
  const data = await fetch(
    `${process.env.STRAPI_API_URL}/projects?populate=*&sort=soryBy:desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )
  return (await data.json()) as IStrapiApiResponse<ProjectDataAttributes>
}

const ProjectsPage: NextPage = async () => {
  const projects = await getAllProjects()
  return (
    <main className='flex flex-col items-center px-4'>
      <Projects showAllProjects={true} projects={projects} />
    </main>
  )
}

export default ProjectsPage
