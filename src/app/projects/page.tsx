import { Projects } from '@/components/projects'
import { STRAPI_API_URL } from '@/constants/urls'
import { getAllProjects } from '@/lib/strapi'
import { IStrapiApiResponse, ProjectDataAttributes } from '@/types/types'
import { NextPage } from 'next'

const ProjectsPage: NextPage = async () => {
  const projects = await getAllProjects()
  return (
    <main className='flex scroll-mt-36 flex-col items-center px-4'>
      <Projects showAllProjects={true} projects={projects} />
    </main>
  )
}

export default ProjectsPage
