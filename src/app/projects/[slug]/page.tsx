import { ProjectDetail } from '@/components/project-detail'
import { STRAPI_API_URL } from '@/constants/urls'
import { ProjectDataAttributes, IStrapiApiSingleResponse } from '@/types/types'
import { notFound } from 'next/navigation'

// Fetch all project SLUGS at build time for static generation
export async function generateStaticParams() {
  const response = await fetch(
    `${STRAPI_API_URL}/projects?fields[0]=slug&filters[$or][0][hidden][$eq]=false&filters[$or][1][hidden][$null]=true`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // next: { revalidate: 3600 }, // Optional: Revalidate every hour (ISR)
    }
  )

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(
      `Failed to fetch project slugs: HTTP ${response.status} ${response.statusText} — ${body.slice(0, 300)}`
    )
  }

  const projects = await response.json()

  return projects.data.map((project: { slug: string }) => ({
    slug: project.slug, // Slug is directly on the project object
  }))
}

// Fetch detailed project data by SLUG
async function getProjectData(slug: string) {
  const res = await fetch(
    `${STRAPI_API_URL}/projects?filters[slug][$eq]=${encodeURIComponent(slug)}&filters[$or][0][hidden][$eq]=false&filters[$or][1][hidden][$null]=true&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      // next: { revalidate: 3600 }, // Optional: Revalidate every hour (ISR)
    }
  )

  // A real HTTP/transport failure — surface the exact slug, status, and body
  // so the build fails loudly with something actionable instead of a silent 404.
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `Failed to fetch project "${slug}": HTTP ${res.status} ${res.statusText} — ${body.slice(0, 300)}`
    )
  }

  const data = (await res.json()) as { data: Array<ProjectDataAttributes> }

  // Genuinely no such (visible) project — this is a real 404, not an error.
  if (!data.data || data.data.length === 0) {
    return null
  }

  return data.data[0] // Return first match directly (should be unique)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // Fixed: awaiting params for Next.js 15

  if (!slug || typeof slug !== 'string') {
    return notFound()
  }

  // Do NOT catch here: a genuine "not found" returns null below (→ 404), but a
  // real fetch/HTTP error throws and fails the build with the exact slug+status.
  const projectResponse = await getProjectData(slug)

  if (!projectResponse) {
    return notFound()
  }

  return <ProjectDetail project={projectResponse} />
}
