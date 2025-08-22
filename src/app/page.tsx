import { NextPage } from 'next'

import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Experience } from '@/components/experience'
import { Intro } from '@/components/intro'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { getAllExperiences, getAllSkills } from '@/lib/strapi'
import { getAllProjects } from './projects/page'

const Home: NextPage = async () => {
  const experiences = await getAllExperiences()
  const projects = await getAllProjects()
  const skills = await getAllSkills()
  return (
    <main className='flex flex-col items-center px-4'>
      <Intro />
      <About />
      <Projects showAllProjects={false} projects={projects} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Contact />
    </main>
  )
}

export default Home
