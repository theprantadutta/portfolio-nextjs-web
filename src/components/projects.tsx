'use client'

import React, { ReactNode } from 'react'
import { useSectionInView } from '@/lib/hooks'
import { Project } from '@/components/project'
import { SectionHeading } from '@/components/section-heading'
import { IStrapiApiResponse, ProjectDataAttributes } from '@/types/types'

interface IProjectsProps {
  children?: ReactNode
  showAllProjects: boolean
  projects: IStrapiApiResponse<ProjectDataAttributes>
}

export const Projects: React.FC<IProjectsProps> = ({
  showAllProjects,
  projects,
}) => {
  const { ref } = useSectionInView('Projects', 0.5)
  return (
    <section ref={ref} id='projects' className='mb-28 scroll-mt-28'>
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projects.data.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
      {!showAllProjects && (
        <div className='flex justify-center'>
          <button
            type='submit'
            className='special-border group mt-10 flex h-[3rem] w-[8rem] items-center justify-center gap-2 bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10'
          >
            All Projects
          </button>
        </div>
      )}
    </section>
  )
}
