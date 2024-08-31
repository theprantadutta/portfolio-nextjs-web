'use client'

import React, { ReactNode } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useTheme } from '@/context/theme-context'
import { SectionHeading } from '@/components/section-heading'
import { useSectionInView } from '@/lib/hooks'
import { CgWorkAlt } from 'react-icons/cg'
import { ExperienceDataAttributes, IStrapiApiResponse } from '@/types/types'

interface IExperienceProps {
  children?: ReactNode
  experiences: IStrapiApiResponse<ExperienceDataAttributes>
}

export const Experience: React.FC<IExperienceProps> = ({ experiences }) => {
  const { ref, inView } = useSectionInView('Experience', 0.1)
  const { theme } = useTheme()

  return (
    <section id='experience' ref={ref} className='mb-28 scroll-mt-28 sm:mb-40'>
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor='' animate={true}>
        {experiences.data.map((item) => {
          const experience = item.attributes
          return (
            <React.Fragment key={item.id}>
              <VerticalTimelineElement
                visible={inView}
                className='special-border'
                contentStyle={{
                  background:
                    theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                  boxShadow: 'none',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  textAlign: 'left',
                  padding: '1.3rem 2rem',
                }}
                contentArrowStyle={{
                  borderRight:
                    theme === 'light'
                      ? '0.4rem solid #9ca3af'
                      : '0.4rem solid rgba(255, 255, 255, 0.5)',
                }}
                date={experience.date}
                icon={<CgWorkAlt />}
                iconStyle={{
                  background:
                    theme === 'light' ? 'white' : 'rgba(255, 255, 255, 0.15)',
                  fontSize: '1.5rem',
                }}
              >
                <h3 className='font-semibold capitalize'>{experience.title}</h3>
                <p className='!mt-0 font-normal'>{experience.location}</p>
                <p className='!mt-1 !font-normal text-gray-700 dark:text-white/75'>
                  {experience.description}
                </p>
              </VerticalTimelineElement>
            </React.Fragment>
          )
        })}
      </VerticalTimeline>
    </section>
  )
}
