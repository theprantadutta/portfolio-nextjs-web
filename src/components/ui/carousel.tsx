'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  TouchEvent,
  MouseEvent,
} from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface CarouselProps {
  children: React.ReactNode[]
  autoplay?: boolean
  autoplayDelay?: number
  showNavigation?: boolean
  showPagination?: boolean
  className?: string
  slideClassName?: string
  spaceBetween?: number
  slidesPerView?: number | 'auto'
  centeredSlides?: boolean
  loop?: boolean
  onSlideChange?: (index: number) => void
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoplay = false,
  autoplayDelay = 3000,
  showNavigation = true,
  showPagination = true,
  className = '',
  slideClassName = '',
  spaceBetween = 20,
  slidesPerView = 1,
  centeredSlides = false,
  loop = false,
  onSlideChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const totalSlides = children.length
  const displaySlides = loop ? totalSlides + 2 : totalSlides

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setCurrentSlide(index)
      onSlideChange?.(index)

      setTimeout(() => {
        setIsTransitioning(false)
      }, 300)
    },
    [isTransitioning, onSlideChange]
  )

  const nextSlide = useCallback(() => {
    if (loop) {
      const nextIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
      goToSlide(nextIndex)
    } else {
      const nextIndex = Math.min(currentSlide + 1, totalSlides - 1)
      goToSlide(nextIndex)
    }
  }, [currentSlide, totalSlides, loop, goToSlide])

  const prevSlide = useCallback(() => {
    if (loop) {
      const prevIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
      goToSlide(prevIndex)
    } else {
      const prevIndex = Math.max(currentSlide - 1, 0)
      goToSlide(prevIndex)
    }
  }, [currentSlide, totalSlides, loop, goToSlide])

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, autoplayDelay)
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [autoplay, autoplayDelay, nextSlide])

  const pauseAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
  }

  const resumeAutoplay = () => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        nextSlide()
      }, autoplayDelay)
    }
  }

  // Touch handlers
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    pauseAutoplay()
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    resumeAutoplay()
  }

  // Mouse handlers for drag
  const handleMouseDown = (e: MouseEvent) => {
    setTouchEnd(null)
    setTouchStart(e.clientX)
    pauseAutoplay()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (touchStart === null) return
    setTouchEnd(e.clientX)
  }

  const handleMouseUp = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(null)
    setTouchEnd(null)
    resumeAutoplay()
  }

  const getSlideWidth = () => {
    if (slidesPerView === 'auto') return 'auto'
    if (typeof slidesPerView === 'number') {
      return `${100 / slidesPerView - spaceBetween / slidesPerView}%`
    }
    return '100%'
  }

  const getTransformValue = () => {
    if (slidesPerView === 'auto') {
      return `translateX(-${currentSlide * (100 + spaceBetween)}px)`
    }

    const slideWidth =
      100 / (typeof slidesPerView === 'number' ? slidesPerView : 1)
    let translateX = currentSlide * slideWidth

    if (centeredSlides && typeof slidesPerView === 'number') {
      translateX -= (100 - slideWidth) / 2
    }

    return `translateX(-${translateX}%)`
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Slides container */}
      <div
        ref={containerRef}
        className='flex h-full transition-transform duration-300 ease-out'
        style={{
          transform: getTransformValue(),
          gap: `${spaceBetween}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 ${slideClassName}`}
            style={{
              width: getSlideWidth(),
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            disabled={!loop && currentSlide === 0}
            className='special-border absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800'
          >
            <FaChevronLeft className='h-4 w-4' />
          </button>
          <button
            onClick={nextSlide}
            disabled={!loop && currentSlide === totalSlides - 1}
            className='special-border absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800'
          >
            <FaChevronRight className='h-4 w-4' />
          </button>
        </>
      )}

      {/* Pagination dots */}
      {showPagination && (
        <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2'>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? 'scale-125 bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Parallax carousel variant
export const ParallaxCarousel: React.FC<
  CarouselProps & {
    parallaxOffset?: number
  }
> = ({ children, parallaxOffset = 50, ...props }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  return (
    <div className='relative overflow-hidden'>
      <Carousel
        {...props}
        onSlideChange={(index) => {
          setCurrentSlide(index)
          props.onSlideChange?.(index)
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className='relative overflow-hidden'
            style={{
              transform: `translateX(${(index - currentSlide) * parallaxOffset}px)`,
            }}
          >
            {child}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

// 3D carousel variant
export const Carousel3D: React.FC<CarouselProps> = ({
  children,
  className = '',
  ...props
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const radius = 200 // Radius of the 3D circle

  return (
    <div
      className={`relative h-96 ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div
        className='absolute inset-0 transition-transform duration-500 ease-out'
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${currentSlide * (360 / children.length)}deg)`,
        }}
      >
        {children.map((child, index) => {
          const angle = (index * 360) / children.length
          return (
            <div
              key={index}
              className='absolute inset-0 left-1/2 top-1/2 h-48 w-64'
              style={{
                transform: `
                  translate(-50%, -50%) 
                  rotateY(${angle}deg) 
                  translateZ(${radius}px)
                `,
                backfaceVisibility: 'hidden',
              }}
            >
              {child}
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === 0 ? children.length - 1 : prev - 1
          )
        }
        className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:bg-white dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800'
      >
        <FaChevronLeft className='h-4 w-4' />
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) =>
            prev === children.length - 1 ? 0 : prev + 1
          )
        }
        className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-all duration-200 hover:bg-white dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-800'
      >
        <FaChevronRight className='h-4 w-4' />
      </button>
    </div>
  )
}

export default Carousel
