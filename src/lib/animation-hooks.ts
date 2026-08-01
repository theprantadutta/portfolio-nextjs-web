'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Scroll-triggered reveals are not here: they are pure CSS (the `reveal`
// utility in globals.css, driven by `animation-timeline: view()`). Gating
// visibility on JS meant a failed observer left content invisible forever.

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
