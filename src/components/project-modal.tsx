'use client'

import { StrapiImage } from '@/shared/StrapiImage'
import { IStrapiImageData } from '@/types/types'
import Link from 'next/link'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'
import { CirclesWithBars } from '@/components/ui/loading-spinners'
import { useModalAnimation } from '@/lib/animation-hooks'

interface IProjectModal {
  children?: ReactNode
  imageUrls: IStrapiImageData[]
  slug: string
}

export const ProjectModal: React.FC<IProjectModal> = ({ imageUrls, slug }) => {
  const [showModal, setShowModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const { shouldRender, getOverlayClassName, getModalClassName } =
    useModalAnimation(showModal)

  const handleClose = () => setShowModal(false)

  useEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      html.style.overflow = showModal ? 'hidden' : 'auto'
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose()
      }
    }

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showModal])

  useEffect(() => {
    setIsLoading(true)
  }, [currentSlide])

  const currentImage = imageUrls[currentSlide].formats.large

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === imageUrls.length - 1 ? 0 : prev + 1))
    setIsLoading(true)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? imageUrls.length - 1 : prev - 1))
    setIsLoading(true)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsLoading(true)
  }

  return (
    <>
      <div className='mt-5 flex flex-col justify-center gap-2 sm:flex-row'>
        <Link
          className='btn-primary special-border px-6 py-2 text-center text-sm font-medium'
          type='button'
          href={`/projects/${slug}`}
        >
          Show Detail
        </Link>
        <button
          className='btn-secondary special-border px-6 py-2 text-center text-sm font-medium'
          type='button'
          onClick={() => setShowModal(true)}
        >
          Screenshots
        </button>
      </div>

      {shouldRender &&
        ReactDOM.createPortal(
          <div
            className={`${getOverlayClassName()} flex items-center justify-center p-4 backdrop-blur-md`}
          >
            <div
              ref={modalRef}
              className={getModalClassName(
                'relative mx-auto max-h-full w-full max-w-4xl'
              )}
            >
              <div className='glass-card special-border relative overflow-hidden border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/80'>
                {/* Enhanced gradient background */}
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/5 dark:via-purple-500/5 dark:to-pink-500/5' />

                {/* Close Button */}
                <button
                  className='special-border glass-card group absolute right-4 top-4 z-40 flex h-10 w-10 items-center justify-center border-white/20 transition-all duration-300 hover:bg-red-500/20 dark:border-white/10'
                  onClick={handleClose}
                >
                  <FaTimes className='h-4 w-4 text-gray-700 transition-colors duration-300 group-hover:text-red-500 dark:text-gray-300' />
                </button>

                {/* Carousel */}
                <div className='relative w-full'>
                  {/* Carousel wrapper */}
                  <div className='special-border relative h-[80vh] max-h-screen overflow-hidden'>
                    {isLoading && (
                      <div className='absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
                        <div className='glass-card special-border p-6'>
                          <CirclesWithBars
                            size='lg'
                            color='white'
                            outerCircleColor='text-blue-500'
                            innerCircleColor='text-purple-500'
                            barColor='text-blue-400'
                          />
                          <p className='mt-3 text-center text-sm text-white'>
                            Loading...
                          </p>
                        </div>
                      </div>
                    )}

                    <div
                      className={`h-full w-full transition-all duration-500 ease-out ${
                        isLoading
                          ? 'scale-95 opacity-0'
                          : 'scale-100 opacity-100'
                      }`}
                    >
                      <StrapiImage
                        height={500}
                        width={500}
                        src={currentImage.url}
                        className='absolute left-1/2 top-1/2 block max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 object-contain'
                        alt='Project screenshot'
                        onLoad={() => setIsLoading(false)}
                      />
                    </div>
                  </div>

                  {/* Slider indicators */}
                  <div className='absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 space-x-3'>
                    {imageUrls.map((_, i) => (
                      <button
                        key={i}
                        type='button'
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${
                          currentSlide === i
                            ? 'scale-125 bg-white shadow-lg'
                            : 'bg-white/50 hover:scale-110 hover:bg-white/75'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => goToSlide(i)}
                      />
                    ))}
                  </div>

                  {/* Slider controls */}
                  <button
                    type='button'
                    className='special-border glass-card group absolute start-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-white/20 transition-all duration-300 hover:bg-white/20 dark:border-white/10'
                    onClick={prevSlide}
                  >
                    <FaArrowLeft className='h-4 w-4 text-gray-700 transition-colors duration-300 group-hover:text-white dark:text-gray-300' />
                  </button>

                  <button
                    type='button'
                    className='special-border glass-card group absolute end-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center border-white/20 transition-all duration-300 hover:bg-white/20 dark:border-white/10'
                    onClick={nextSlide}
                  >
                    <FaArrowRight className='h-4 w-4 text-gray-700 transition-colors duration-300 group-hover:text-white dark:text-gray-300' />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
