'use client'

import { useSectionInView } from '@/lib/hooks'
import type { ISectionName } from '@/lib/types'
import { useMemo, type RefObject } from 'react'

interface SectionMarkerProps {
  section: ISectionName
  threshold?: number
  className?: string
}

/**
 * Lightweight client sentinel that keeps the active section context
 * in sync without converting entire sections into client components.
 */
export const SectionMarker = ({
  section,
  threshold = 0.75,
  className = 'block h-0 w-0 opacity-0',
}: SectionMarkerProps) => {
  const { ref } = useSectionInView(section, threshold)

  // Memoise props for consistent render output without re-renders
  const markerProps = useMemo(
    () => ({
      'data-section-marker': section,
      className,
    }),
    [section, className]
  )

  return <span ref={ref as RefObject<HTMLSpanElement>} {...markerProps} />
}
