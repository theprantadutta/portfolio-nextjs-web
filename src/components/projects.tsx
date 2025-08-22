'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
import { Project } from '@/components/project'
import { SectionHeading } from '@/components/section-heading'
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
  const { ref } = useSectionInView('Projects', 0.3)
  return (
    <section ref={ref} id='projects' className='scroll-mt-28'>
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projects.data.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
      {!showAllProjects && <AllProjectButton />}
    </section>
  )
}
