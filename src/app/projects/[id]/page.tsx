import { ProjectDetail } from '@/components/project-detail'
import { IStrapiApiSingleResponse, ProjectDataAttributes } from '@/types/types'
import { notFound } from 'next/navigation'

const STRAPI_API_URL = process.env.STRAPI_API_URL

// Generate static paths at build time
// export async function generateStaticParams() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL}/projects/`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   const projects = await response.json();

//   console.l

//   return projects.data.map((project: { id: number }) => ({
//     id: project.id.toString(),
//   }));
// }

async function getProjectData(
  id: string
): Promise<IStrapiApiSingleResponse<ProjectDataAttributes>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL}/api/projects/${id}?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch project data')
  }

  return res.json()
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  let projectResponse: IStrapiApiSingleResponse<ProjectDataAttributes>

  try {
    const { id } = await params
    projectResponse = await getProjectData(id)
  } catch (error) {
    console.error('Error fetching project data:', error)
    return notFound()
  }

  if (!projectResponse.data) {
    return notFound()
  }

  return <ProjectDetail project={projectResponse.data} />
}
