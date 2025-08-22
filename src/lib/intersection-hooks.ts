'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Basic intersection observer hook
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

  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry)
        setIsIntersecting(observerEntry.isIntersecting)

        if (triggerOnce && observerEntry.isIntersecting) {
          observer.unobserve(element)
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observerRef.current = observer
    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, triggerOnce])

  return {
    ref: elementRef,
    entry,
    isIntersecting,
    inView: isIntersecting, // Alias for compatibility
  }
}

// Hook specifically for tracking multiple elements
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elementRefs.current.findIndex(
            (el) => el === entry.target
          )
          if (index !== -1) {
            setIntersectingElements((prev) => {
              const newSet = new Set(prev)
              if (entry.isIntersecting) {
                newSet.add(index)
              } else {
                newSet.delete(index)
              }
              return newSet
            })
          }
        })
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    elementRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin])

  const getRef = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      elementRefs.current[index] = element
    },
    []
  )

  const isElementIntersecting = useCallback(
    (index: number) => {
      return intersectingElements.has(index)
    },
    [intersectingElements]
  )

  return {
    getRef,
    isElementIntersecting,
    intersectingElements,
  }
}

// Scroll progress hook
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress() // Initial call

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return scrollProgress
}

// Parallax effect hook
export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const rect = elementRef.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const newOffset = scrolled * speed

      setOffset(newOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return {
    ref: elementRef,
    offset,
    style: {
      transform: `translateY(${offset}px)`,
    },
  }
}

// Visibility tracking hook with callbacks
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
