'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Animation utilities for performance
export const animationUtils = {
  // CSS classes for animations
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  scaleIn: 'animate-scale-in',
  bounceIn: 'animate-bounce-in',

  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  },

  // Add CSS variables for dynamic delays
  setAnimationDelay: (element: HTMLElement, delay: number) => {
    element.style.setProperty('--animation-delay', `${delay}ms`)
  },
}

// Hook for basic scroll-triggered animations
interface UseAnimationOnScrollOptions {
  threshold?: number
  delay?: number
  animationClass?: string
  triggerOnce?: boolean
}

export const useAnimationOnScroll = <T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  delay = 0,
  animationClass = 'animate-fade-in-up',
  triggerOnce = true,
}: UseAnimationOnScrollOptions = {}) => {
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, delay)
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    const element = elementRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, delay, hasAnimated, triggerOnce])

  const className = animationUtils.prefersReducedMotion()
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

// Hook for staggered animations (like in project grids)
interface UseStaggeredAnimationOptions {
  itemCount: number
  delay?: number
  staggerDelay?: number
  animationClass?: string
  threshold?: number
}

export const useStaggeredAnimation = <T extends HTMLElement = HTMLElement>({
  itemCount,
  delay = 0,
  staggerDelay = 100,
  animationClass = 'animate-fade-in-up',
  threshold = 0.1,
}: UseStaggeredAnimationOptions) => {
  const containerRef = useRef<T>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true)

          // Trigger animations with stagger
          for (let i = 0; i < itemCount; i++) {
            setTimeout(
              () => {
                setVisibleItems((prev) => new Set([...prev, i]))
              },
              delay + i * staggerDelay
            )
          }
        }
      },
      { threshold }
    )

    const element = containerRef.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [itemCount, delay, staggerDelay, hasTriggered, threshold])

  const getItemClassName = useCallback(
    (index: number) => {
      if (animationUtils.prefersReducedMotion()) return ''
      return visibleItems.has(index)
        ? animationClass
        : 'opacity-0 translate-y-8'
    },
    [visibleItems, animationClass]
  )

  return {
    containerRef,
    getItemClassName,
    hasTriggered,
  }
}

// Hook for hover animations and micro-interactions
export const useHoverAnimation = <T extends HTMLElement = HTMLElement>(
  animationClass: string = 'transform transition-transform duration-300 hover:scale-105'
) => {
  const elementRef = useRef<T>(null)

  return {
    ref: elementRef,
    className: animationUtils.prefersReducedMotion() ? '' : animationClass,
  }
}

// Hook for modal/overlay animations
export const useModalAnimation = (isOpen: boolean) => {
  const [shouldRender, setShouldRender] = useState(isOpen)
  const [animationPhase, setAnimationPhase] = useState<
    'entering' | 'entered' | 'exiting' | 'exited'
  >('exited')

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setAnimationPhase('entering')
      // Trigger entry animation
      const timer = setTimeout(() => {
        setAnimationPhase('entered')
      }, 10)
      return () => clearTimeout(timer)
    } else {
      setAnimationPhase('exiting')
      // Wait for exit animation to complete
      const timer = setTimeout(() => {
        setShouldRender(false)
        setAnimationPhase('exited')
      }, 300)
      return () => clearTimeout(timer)
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

// Hook for page transitions
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const startTransition = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [])

  return {
    isTransitioning,
    startTransition,
    className: isTransitioning
      ? 'opacity-0 translate-y-4'
      : 'opacity-100 translate-y-0',
  }
}
