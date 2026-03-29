import { Projects } from '@/components/projects'
import { getAllProjects } from '@/lib/strapi'

function getUniqueTags(
  projects: { Tags: { id: number; name: string }[] }[]
): string[] {
  const seen = new Map<string, string>()
  for (const project of projects) {
    for (const tag of project.Tags) {
      const key = tag.name.toLowerCase()
      if (!seen.has(key)) {
        seen.set(key, tag.name)
      }
    }
  }
  return Array.from(seen.values()).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  )
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>
}) {
  const projects = await getAllProjects()
  const { tags: tagsParam } = await searchParams

  const allTags = getUniqueTags(projects.data)
  const selectedTags = tagsParam
    ? tagsParam
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  const filteredData =
    selectedTags.length > 0
      ? projects.data.filter((project) =>
          project.Tags.some((tag) =>
            selectedTags.some(
              (st) => tag.name.toLowerCase() === st.toLowerCase()
            )
          )
        )
      : projects.data

  return (
    <main className='flex scroll-mt-36 flex-col items-center px-4 pt-4 sm:pt-8'>
      <Projects
        showAllProjects={true}
        projects={{ ...projects, data: filteredData }}
        allTags={allTags}
        selectedTags={selectedTags}
      />
    </main>
  )
}
