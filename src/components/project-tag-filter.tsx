'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface ProjectTagFilterProps {
  allTags: string[]
  selectedTags: string[]
}

export const ProjectTagFilter: React.FC<ProjectTagFilterProps> = ({
  allTags,
  selectedTags,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleTag = useCallback(
    (tag: string) => {
      const tagLower = tag.toLowerCase()
      const params = new URLSearchParams(searchParams.toString())
      let current = selectedTags.map((t) => t.toLowerCase())

      if (current.includes(tagLower)) {
        current = current.filter((t) => t !== tagLower)
      } else {
        current.push(tagLower)
      }

      if (current.length === 0) {
        params.delete('tags')
      } else {
        params.set('tags', current.join(','))
      }

      const query = params.toString()
      router.push(query ? `/projects?${query}` : '/projects', {
        scroll: false,
      })
    },
    [router, searchParams, selectedTags]
  )

  const clearAll = useCallback(() => {
    router.push('/projects', { scroll: false })
  }, [router])

  const isAllSelected = selectedTags.length === 0

  return (
    <div className='mx-auto mb-10 flex max-w-4xl flex-wrap justify-center gap-2'>
      {/* All Button */}
      <button
        onClick={clearAll}
        className={`special-border px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 ${
          isAllSelected
            ? 'from-primary-600 to-secondary-600 shadow-primary-500/25 bg-linear-to-r text-white shadow-lg'
            : 'glass-card bg-linear-to-r from-gray-500/10 to-gray-600/10 text-gray-700 hover:from-gray-500/20 hover:to-gray-600/20 dark:text-gray-300'
        }`}
      >
        All
      </button>

      {/* Tag Buttons */}
      {allTags.map((tag) => {
        const isActive = selectedTags.some(
          (t) => t.toLowerCase() === tag.toLowerCase()
        )
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`special-border px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105 ${
              isActive
                ? 'from-primary-600 to-secondary-600 shadow-primary-500/25 bg-linear-to-r text-white shadow-lg'
                : 'glass-card bg-linear-to-r from-gray-500/10 to-gray-600/10 text-gray-700 hover:from-gray-500/20 hover:to-gray-600/20 dark:text-gray-300'
            }`}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
