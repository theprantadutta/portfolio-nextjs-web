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
import { getMostLikedArticles } from '@/lib/devto'
import { SectionDivider } from '@/components/section-divider'
import { PopularBlogs } from '@/components/popular-blogs'

// Enable ISR for this page
export const revalidate = 3600 // Revalidate every hour

const Home: NextPage = async () => {
  const [experiences, projects, skills, popularBlogs] = await Promise.all([
    getAllExperiences(),
    getAllFeaturedProjects(),
    getAllSkills(),
    getMostLikedArticles(3),
  ])
  return (
    <main className='flex flex-col items-center px-4'>
      <Intro />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Projects showAllProjects={false} projects={projects} />
      <SectionDivider />
      <PopularBlogs articles={popularBlogs} />
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
