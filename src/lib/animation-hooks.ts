'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { observeElement, unobserveElement } from '@/lib/observer-manager'

// Animation utilities for performance
export const animationUtils = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  bounceIn: 'animate-bounce-in',
  prefersReducedMotion: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  },
  setAnimationDelay: (element: HTMLElement, delay: number) => {
    element.style.setProperty('--animation-delay', `${delay}ms`)
  },
}

interface UseAnimationOnScrollOptions {
  threshold?: number
  delay?: number
  animationClass?: string
  triggerOnce?: boolean
  rootMargin?: string
}

export const useAnimationOnScroll = <T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  delay = 0,
  animationClass = 'animate-fade-in-up',
  triggerOnce = true,
  rootMargin = '0px',
}: UseAnimationOnScrollOptions = {}) => {
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const hasAnimatedRef = useRef(false)
  const shouldReduceMotion = animationUtils.prefersReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Immediate visibility for reduced motion preference
      setIsVisible(true)
      hasAnimatedRef.current = true
      return
    }

    const element = elementRef.current
    if (!element) return

    let timeoutId: number | undefined

    const handler = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && (!triggerOnce || !hasAnimatedRef.current)) {
        timeoutId = window.setTimeout(() => {
          setIsVisible(true)
          hasAnimatedRef.current = true
        }, delay)
      } else if (!triggerOnce && !entry.isIntersecting) {
        setIsVisible(false)
      }
    }

    observeElement(element, handler, { threshold, rootMargin })

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
      unobserveElement(element, { threshold, rootMargin })
    }
  }, [threshold, delay, triggerOnce, rootMargin, shouldReduceMotion])

  const className = shouldReduceMotion
    ? ''
    : isVisible
      ? animationClass
      : 'opacity-0 translate-y-8'

  return {
    ref: elementRef,
    isVisible,
    className,
  }
}

interface UseStaggeredAnimationOptions {
  itemCount: number
  delay?: number
  staggerDelay?: number
  animationClass?: string
  threshold?: number
  rootMargin?: string
}

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>({
  itemCount,
  delay = 0,
  staggerDelay = 100,
  animationClass = 'animate-fade-in-up',
  threshold = 0.1,
  rootMargin = '0px',
}: UseStaggeredAnimationOptions) => {
  const containerRef = useRef<T>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [hasTriggered, setHasTriggered] = useState(false)
  const hasTriggeredRef = useRef(false)
  const shouldReduceMotion = animationUtils.prefersReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') {
      setVisibleItems(new Set(Array.from({ length: itemCount }, (_, i) => i)))
      setHasTriggered(true)
      hasTriggeredRef.current = true
      return
    }

    const element = containerRef.current
    if (!element) return

    const handler = (entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true
        setHasTriggered(true)

        for (let i = 0; i < itemCount; i++) {
          window.setTimeout(
            () => {
              setVisibleItems((prev) => {
                const next = new Set(prev)
                next.add(i)
                return next
              })
            },
            delay + i * staggerDelay
          )
        }
      }
    }

    observeElement(element, handler, { threshold, rootMargin })

    return () => {
      unobserveElement(element, { threshold, rootMargin })
    }
  }, [
    itemCount,
    delay,
    staggerDelay,
    threshold,
    rootMargin,
    shouldReduceMotion,
  ])

  const getItemClassName = useCallback(
    (index: number) => {
      if (shouldReduceMotion) return ''
      return visibleItems.has(index)
        ? animationClass
        : 'opacity-0 translate-y-8'
    },
    [visibleItems, animationClass, shouldReduceMotion]
  )

  return {
    containerRef,
    getItemClassName,
    hasTriggered,
  }
}

export const useHoverAnimation = <T extends HTMLElement = HTMLElement>(
  animationClass: string = 'transform transition-transform duration-300 hover:scale-105'
) => {
  const elementRef = useRef<T>(null)

  return {
    ref: elementRef,
    className: animationUtils.prefersReducedMotion() ? '' : animationClass,
  }
}

export const useModalAnimation = (isOpen: boolean) => {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animationPhase, setAnimationPhase] = useState<
    'entering' | 'entered' | 'exiting' | 'exited'
  >('exited')

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Modal animation state management
      setShouldRender(true)
      setAnimationPhase('entering')
      const timer = window.setTimeout(() => {
        setAnimationPhase('entered')
      }, 10)
      return () => window.clearTimeout(timer)
    } else {
      setAnimationPhase('exiting')
      const timer = window.setTimeout(() => {
        setShouldRender(false)
        setAnimationPhase('exited')
      }, 300)
      return () => window.clearTimeout(timer)
    }
  }, [isOpen])

  const getOverlayClassName = () => {
    if (animationUtils.prefersReducedMotion()) {
      return 'fixed inset-0 bg-black/50 z-50'
    }

    switch (animationPhase) {
      case 'entering':
        return 'fixed inset-0 bg-black/0 z-50 transition-all duration-300 ease-out'
      case 'entered':
        return 'fixed inset-0 bg-black/50 z-50 transition-all duration-300 ease-out'
      case 'exiting':
        return 'fixed inset-0 bg-black/0 z-50 transition-all duration-300 ease-out'
      default:
        return 'fixed inset-0 bg-black/0 z-50'
    }
  }

  const getModalClassName = (baseClasses: string = '') => {
    if (animationUtils.prefersReducedMotion()) {
      return `${baseClasses} transform transition-none`
    }

    switch (animationPhase) {
      case 'entering':
        return `${baseClasses} transform transition-all duration-300 ease-out scale-95 opacity-0 translate-y-4`
      case 'entered':
        return `${baseClasses} transform transition-all duration-300 ease-out scale-100 opacity-100 translate-y-0`
      case 'exiting':
        return `${baseClasses} transform transition-all duration-300 ease-out scale-95 opacity-0 translate-y-4`
      default:
        return `${baseClasses} transform scale-95 opacity-0`
    }
  }

  return {
    shouldRender,
    getOverlayClassName,
    getModalClassName,
    animationPhase,
  }
}

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
    window.setTimeout(() => setIsTransitioning(false), 300)
  }, [])

  return {
    isTransitioning,
    startTransition,
    className: isTransitioning
      ? 'opacity-0 translate-y-4'
      : 'opacity-100 translate-y-0',
  }
}
