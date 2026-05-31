import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/section-heading'
import { SectionSubheading } from '@/components/section-subheading'
import { VerticalTimeline } from '@/components/ui/timeline'
import { CgWorkAlt } from 'react-icons/cg'
import { ExperienceDataAttributes, IStrapiApiResponse } from '@/types/types'
import { SectionMarker } from '@/components/section-marker'

interface IExperienceProps {
  children?: ReactNode
  experiences: IStrapiApiResponse<ExperienceDataAttributes>
}

export const Experience: React.FC<IExperienceProps> = ({ experiences }) => {
  // Transform experience data for our custom timeline
  const timelineItems = experiences.data.map((item) => ({
    date: item.date,
    title: item.title,
    location: item.location,
    description: item.description,
    icon: <CgWorkAlt className='h-4 w-4 text-white' />,
  }))

  return (
    <section id='experience' className='section-spacing-sm scroll-mt-28'>
      <SectionMarker section='Experience' threshold={0.1} />
      {/* Section Header */}
      <div className='mb-16 text-center'>
        <SectionHeading>My Experience</SectionHeading>
        <SectionSubheading>
          My professional journey and the experiences that shaped my skills
        </SectionSubheading>
      </div>

      {/* Custom Timeline */}
      <VerticalTimeline items={timelineItems} />
    </section>
  )
}
