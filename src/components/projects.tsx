import type { ReactNode } from 'react'

import { Project } from '@/components/project'
import { ProjectTagFilter } from '@/components/project-tag-filter'
import { SectionHeading } from '@/components/section-heading'
import { SectionMarker } from '@/components/section-marker'
import { SectionSubheading } from '@/components/section-subheading'
import { IStrapiApiResponse, ProjectDataAttributes } from '@/types/types'
import { AllProjectButton } from './all-project-button'

interface IProjectsProps {
  children?: ReactNode
  showAllProjects: boolean
  projects: IStrapiApiResponse<ProjectDataAttributes>
  allTags?: string[]
  selectedTags?: string[]
}

export const Projects: React.FC<IProjectsProps> = ({
  showAllProjects,
  projects,
  allTags,
  selectedTags,
}) => {
  return (
    <section id='projects' className='section-spacing-sm scroll-mt-28'>
      <SectionMarker section='Projects' threshold={0.3} />
      <div className='mb-16 text-center'>
        <SectionHeading>My projects</SectionHeading>
        <SectionSubheading>
          Products and tools I&apos;ve designed, built, and shipped
        </SectionSubheading>
      </div>
      {allTags && selectedTags && (
        <ProjectTagFilter allTags={allTags} selectedTags={selectedTags} />
      )}
      <div>
        {projects.data.map((project) => (
          <Project key={project.documentId ?? project.id} {...project} />
        ))}
      </div>
      {!showAllProjects && <AllProjectButton />}
    </section>
  )
}
