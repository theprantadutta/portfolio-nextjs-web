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

// Enable ISR for this page
export const revalidate = 3600 // Revalidate every hour

const Home: NextPage = async () => {
  const [experiences, projects, skills] = await Promise.all([
    getAllExperiences(),
    getAllFeaturedProjects(),
    getAllSkills(),
  ])
  return (
    <main className='flex flex-col items-center px-4'>
      <Intro />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects showAllProjects={false} projects={projects} />
      <SectionDivider />
      <Skills skills={skills} />
      <SectionDivider />
      <Experience experiences={experiences} />
      <SectionDivider />
      <Contact />
    </main>
  )
}

export default Home
