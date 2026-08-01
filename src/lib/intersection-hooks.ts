'use client'

import { useEffect, useRef, useState } from 'react'

import { observeElement, unobserveElement } from '@/lib/observer-manager'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const element = elementRef.current
    if (!element) return

    const handler = (observerEntry: IntersectionObserverEntry) => {
      setEntry(observerEntry)
      setIsIntersecting(observerEntry.isIntersecting)

      if (
        triggerOnce &&
        observerEntry.isIntersecting &&
        !hasTriggeredRef.current
      ) {
        hasTriggeredRef.current = true
        unobserveElement(element, { threshold, root, rootMargin })
      }
    }

    observeElement(element, handler, { threshold, root, rootMargin })

    return () => {
      unobserveElement(element, { threshold, root, rootMargin })
    }
  }, [threshold, root, rootMargin, triggerOnce])

  return {
    ref: elementRef,
    entry,
    isIntersecting,
    inView: isIntersecting,
  }
}
