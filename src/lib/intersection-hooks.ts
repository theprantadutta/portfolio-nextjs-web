'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

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

export const useMultipleIntersectionObserver = (
  elementsCount: number,
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options

  const [intersectingElements, setIntersectingElements] = useState<Set<number>>(
    new Set()
  )
  const elementRefs = useRef<(HTMLElement | null)[]>(
    new Array(elementsCount).fill(null)
  )
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handlers = new Map<
      Element,
      (entry: IntersectionObserverEntry) => void
    >()

    elementRefs.current.forEach((element, index) => {
      if (!element) return

      const handler = (entry: IntersectionObserverEntry) => {
        setIntersectingElements((prev) => {
          const next = new Set(prev)
          if (entry.isIntersecting) {
            next.add(index)
          } else {
            next.delete(index)
          }
          return next
        })
      }

      handlers.set(element, handler)
      observeElement(element, handler, { threshold, root, rootMargin })
    })

    return () => {
      handlers.forEach((_, element) => {
        unobserveElement(element, { threshold, root, rootMargin })
      })
    }
  }, [threshold, root, rootMargin, version, elementsCount])

  const getRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      elementRefs.current[index] = element
      setVersion((current) => current + 1)
    },
    []
  )

  const isElementIntersecting = useCallback(
    (index: number) => intersectingElements.has(index),
    [intersectingElements]
  )

  return {
    getRef,
    isElementIntersecting,
    intersectingElements,
  }
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return scrollProgress
}

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return {
    ref: elementRef,
    offset,
    style: useMemo(
      () => ({
        transform: `translateY(${offset}px)`,
      }),
      [offset]
    ),
  }
}

interface UseVisibilityTrackingOptions extends UseIntersectionObserverOptions {
  onEnter?: () => void
  onExit?: () => void
  onVisibilityChange?: (isVisible: boolean) => void
}

export const useVisibilityTracking = (
  options: UseVisibilityTrackingOptions = {}
) => {
  const { onEnter, onExit, onVisibilityChange, ...intersectionOptions } =
    options

  const { ref, isIntersecting } = useIntersectionObserver(intersectionOptions)
  const prevIntersecting = useRef(false)

  useEffect(() => {
    if (isIntersecting !== prevIntersecting.current) {
      if (isIntersecting) {
        onEnter?.()
      } else {
        onExit?.()
      }
      onVisibilityChange?.(isIntersecting)
      prevIntersecting.current = isIntersecting
    }
  }, [isIntersecting, onEnter, onExit, onVisibilityChange])

  return {
    ref,
    isVisible: isIntersecting,
  }
}
