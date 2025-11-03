'use client'

import Link, { type LinkProps } from 'next/link'
import { forwardRef, type MouseEvent } from 'react'
import type { ReactNode } from 'react'
import { useActiveSectionContext } from '@/context/active-section-context'
import type { ISectionName } from '@/lib/types'

type SectionLinkProps = {
  section: ISectionName
  className?: string
  children: ReactNode
} & Omit<LinkProps, 'href'> & {
    href: LinkProps['href']
  }

/**
 * Minimal client wrapper that keeps the active-section context in sync
 * without forcing entire sections to become client components.
 */
export const SectionLink = forwardRef<HTMLAnchorElement, SectionLinkProps>(
  ({ section, onClick, ...props }, ref) => {
    const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext()

    return (
      <Link
        {...props}
        ref={ref}
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          onClick?.(event)
          setActiveSection(section)
          setTimeOfLastClick(Date.now())
        }}
      />
    )
  }
)

SectionLink.displayName = 'SectionLink'
