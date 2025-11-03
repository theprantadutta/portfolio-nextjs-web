import type { ReactNode } from 'react'

import { Project } from '@/components/project'
import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { IStrapiApiResponse, ProjectDataAttributes } from '@/types/types'
import { AllProjectButton } from './all-project-button'

interface IProjectsProps {
  children?: ReactNode
  showAllProjects: boolean
  projects: IStrapiApiResponse<ProjectDataAttributes>
}

export const Projects: React.FC<IProjectsProps> = ({
  showAllProjects,
  projects,
}) => {
  return (
    <section id='projects' className='scroll-mt-28'>
      <SectionMarker section='Projects' threshold={0.3} />
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projects.data.map((project) => (
          <Project key={project.documentId ?? project.id} {...project} />
        ))}
      </div>
      {!showAllProjects && <AllProjectButton />}
    </section>
  )
}
