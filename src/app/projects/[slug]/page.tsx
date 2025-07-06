import { ProjectDetail } from '@/components/project-detail'
import { STRAPI_API_URL } from '@/constants/urls'
import { ProjectDataAttributes, IStrapiApiSingleResponse } from '@/types/types'
import { notFound } from 'next/navigation'

// Fetch all project SLUGS at build time for static generation
export async function generateStaticParams() {
  const response = await fetch(`${STRAPI_API_URL}/projects?fields[0]=slug`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // Optional: Revalidate every hour (ISR)
  })

  if (!response.ok) {
    throw new Error('Failed to fetch project slugs')
  }

  const projects = await response.json()

  return projects.data.map((project: { slug: string }) => ({
    slug: project.slug, // Slug is directly on the project object
  }))
}

// Fetch detailed project data by SLUG
async function getProjectData(slug: string) {
  const res = await fetch(
    `${STRAPI_API_URL}/projects?filters[slug][$eq]=${slug}&populate=*`, // Fixed: using consistent URL constant
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // Optional: Revalidate every hour (ISR)
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch project data')
  }

  const data = (await res.json()) as { data: Array<ProjectDataAttributes> }

  if (!data.data || data.data.length === 0) {
    throw new Error('Project not found')
  }

  return data.data[0] // Return first match directly (should be unique)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  let projectResponse: ProjectDataAttributes

  const { slug } = await params // Fixed: awaiting params for Next.js 15

  try {
    projectResponse = await getProjectData(slug)
  } catch (error) {
    console.error('Error fetching project data:', error)
    return notFound()
  }

  if (!projectResponse) {
    return notFound()
  }

  return <ProjectDetail project={projectResponse} />
}
