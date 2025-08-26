import { NextPage } from 'next'

import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Experience } from '@/components/experience'
import { Intro } from '@/components/intro'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import {
  getAllExperiences,
  getAllSkills,
  getAllFeaturedProjects,
} from '@/lib/strapi'
import { SectionDivider } from '@/components/section-divider'
import { LazyComponent } from '@/components/ui/lazy-component'

// Enable ISR for this page
export const revalidate = 3600 // Revalidate every hour

const Home: NextPage = async () => {
  const experiences = await getAllExperiences()
  const projects = await getAllFeaturedProjects()
  const skills = await getAllSkills()
  return (
    <main className='flex flex-col items-center px-4'>
      <Intro />
      <SectionDivider />
      <LazyComponent rootMargin='200px'>
        <About />
      </LazyComponent>
      <SectionDivider />
      <LazyComponent rootMargin='200px'>
        <Projects showAllProjects={false} projects={projects} />
      </LazyComponent>
      <SectionDivider />
      <LazyComponent rootMargin='150px'>
        <Skills skills={skills} />
      </LazyComponent>
      <SectionDivider />
      <LazyComponent rootMargin='150px'>
        <Experience experiences={experiences} />
      </LazyComponent>
      <SectionDivider />
      <LazyComponent rootMargin='100px'>
        <Contact />
      </LazyComponent>
    </main>
  )
}

export default Home
