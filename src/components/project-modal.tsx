'use client'

import { StrapiImage } from '@/shared/StrapiImage'
import { IStrapiImageData } from '@/types/types'
import Image from 'next/image'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface IProjectModal {
  children?: ReactNode
  imageUrls: IStrapiImageData[]
}

export const ProjectModal: React.FC<IProjectModal> = ({ imageUrls }) => {
  const [showModal, setShowModal] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null)
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
        setShowModal(false) // Close modal if clicked outside
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

  const [currentSlide, setCurrentSlide] = useState(0) // Track current active slide
  // const slides = [
  //   'https://images.unsplash.com/photo-1622375734599-925cb5328554',
  //   'https://images.unsplash.com/photo-1660795048860-db70cc7fb4e7',
  //   'https://images.unsplash.com/photo-1596746279894-e5b6a6aeb5f4',
  //   'https://images.unsplash.com/photo-1648826797125-71d920cf1544',
  //   'https://images.unsplash.com/photo-1637637499510-3bf96a1fd0e4',
  // ]
  const currentImage = imageUrls[currentSlide].formats.large
  return (
    <>
      <button
        className='special-border group mt-5 flex h-[2rem] w-[8rem] items-center justify-center gap-2 border border-gray-800 font-semibold text-gray-800 outline-none transition-all hover:scale-110 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:border-gray-400 dark:bg-opacity-10 dark:text-white md:h-[2.5rem] md:w-[10rem]'
        type='button'
        onClick={() => setShowModal(true)}
      >
        Screenshots
      </button>

      <div
        id='default-modal'
        className={`${
          showModal ? 'flex' : 'hidden'
        } fixed left-0 right-0 top-0 z-[9999] h-full w-full items-center justify-center overflow-x-hidden md:inset-0`}
      >
        {/* Backdrop */}
        <div
          className='fixed inset-0 bg-black opacity-50'
          onClick={handleClose}
        ></div>
        <div
          ref={modalRef}
          className='relative max-h-full w-full max-w-xs p-4 md:max-w-2xl lg:max-w-4xl'
        >
          <div className='relative rounded-lg'>
            <div
              id='default-carousel'
              className='relative w-full'
              data-carousel='slide'
            >
              {/* Carousel wrapper */}
              <div className='relative h-[80vh] max-h-screen rounded-lg'>
                <div className='duration-700 ease-in-out' data-carousel-item=''>
                  <StrapiImage
                    height={500}
                    width={500}
                    src={currentImage.url}
                    className='absolute left-1/2 top-1/2 block max-h-full max-w-full -translate-x-1/2 -translate-y-1/2'
                    alt='...'
                  />
                </div>
              </div>

              {/* Slider indicators */}
              <div className='absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3'>
                {imageUrls.map((_, i) => {
                  return (
                    <button
                      key={i}
                      type='button'
                      className='h-3 w-3 rounded-full'
                      aria-label={`Slide ${i + 1}`}
                      data-carousel-slide-to={i}
                      onClick={() => setCurrentSlide(i)}
                    />
                  )
                })}
              </div>

              {/* Slider controls */}
              <button
                type='button'
                className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
                data-carousel-prev=''
                onClick={() =>
                  setCurrentSlide(
                    currentSlide == 0 ? imageUrls.length - 1 : currentSlide - 1
                  )
                }
              >
                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70'>
                  <svg
                    className='h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M5 1 1 5l4 4'
                    />
                  </svg>
                  <span className='sr-only'>Previous</span>
                </span>
              </button>

              <button
                type='button'
                className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
                data-carousel-next=''
                onClick={() =>
                  setCurrentSlide(
                    currentSlide == imageUrls.length - 1 ? 0 : currentSlide + 1
                  )
                }
              >
                <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70'>
                  <svg
                    className='h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                  <span className='sr-only'>Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
