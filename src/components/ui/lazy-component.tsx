'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazyComponent({
  children,
  fallback = null,
  rootMargin = '100px',
  threshold = 0.1,
  className = '',
}: LazyComponentProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsIntersecting(true)
          setHasIntersected(true)
          observer.unobserve(element)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [rootMargin, threshold, hasIntersected])

  return (
    <div
      ref={ref}
      className={className}
      style={{ contain: 'layout style paint' }}
    >
      {isIntersecting || hasIntersected ? children : fallback}
    </div>
  )
}
