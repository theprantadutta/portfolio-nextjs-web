import { useActiveSectionContext } from '@/context/active-section-context'
import { useEffect } from 'react'
import { useIntersectionObserver } from './intersection-hooks'
import type { ISectionName } from './types'

export const useSectionInView = (
  sectionName: ISectionName,
  threshold = 0.75
) => {
  const { ref, inView } = useIntersectionObserver({
    threshold,
  })
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext()

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName)
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName])

  return {
    ref,
    inView,
  }
}
