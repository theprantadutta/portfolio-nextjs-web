'use client'

import React, { ReactNode } from 'react'
import { projectsData } from '@/lib/data'
import { useSectionInView } from '@/lib/hooks'
import { Project } from '@/components/project'
import { SectionHeading } from '@/components/section-heading'

interface IProjectsProps {
  children?: ReactNode
}

export const Projects: React.FC<IProjectsProps> = () => {
  const { ref } = useSectionInView('Projects', 0.5)

  return (
    <section ref={ref} id='projects' className='mb-28 scroll-mt-28'>
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}
