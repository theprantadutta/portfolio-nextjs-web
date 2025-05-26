'use client'

import { StrapiImage } from '@/shared/StrapiImage'
import { IStrapiImageData } from '@/types/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'
import { CirclesWithBar } from 'react-loader-spinner'

interface IProjectModal {
  children?: ReactNode
  imageUrls: IStrapiImageData[]
  documentId: string
}

export const ProjectModal: React.FC<IProjectModal> = ({
  imageUrls,
  documentId,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false) // Track loading state
  const modalRef = useRef<HTMLDivElement | null>(null)

  const handleClose = () => setShowModal(false) // Change to close modal properly

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

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  return (
    <>
      <div className='mt-5 flex flex-col justify-center gap-2 sm:flex-row'>
        <Link
          className='btn group bg-gray-900 px-3 py-1 text-center text-white hover:bg-gray-950'
          type='button'
          href={`/projects/${documentId}`}
        >
          Show Detail
        </Link>
        <button
          className='borderBlack btn group bg-white px-3 py-1 text-center dark:bg-white/10'
          type='button'
          onClick={() => setShowModal(true)}
        >
          Screenshots
        </button>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <motion.div
            id='default-modal'
            className='fixed inset-0 z-[9999] flex items-center justify-center overflow-x-hidden'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className='fixed inset-0 bg-black opacity-50'
              onClick={handleClose}
            ></div>

            <motion.div
              ref={modalRef}
              className='relative max-h-full w-full max-w-full p-4 md:max-w-xl lg:max-w-2xl'
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className='relative rounded-lg'>
                {/* Close Button */}
                <button
                  className='absolute right-2 top-2 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/30 hover:bg-white/50 dark:bg-gray-800/30 dark:hover:bg-gray-800/60'
                  onClick={handleClose}
                >
                  <FaTimes className='text-gray-800 dark:text-white' />
                </button>

                {/* Carousel */}
                <div
                  id='default-carousel'
                  className='relative w-full'
                  data-carousel='slide'
                >
                  {/* Carousel wrapper */}
                  <div className='relative h-[80vh] max-h-screen rounded-lg'>
                    {isLoading && (
                      <div className='absolute inset-0 z-50 flex items-center justify-center'>
                        <CirclesWithBar
                          height='100'
                          width='100'
                          color='#ffffff'
                          outerCircleColor='#ffffff'
                          innerCircleColor='#ffffff'
                          barColor='#ffffff'
                          ariaLabel='circles-with-bar-loading'
                          visible={true}
                        />
                      </div>
                    )}

                    <motion.div
                      className='duration-700 ease-in-out'
                      data-carousel-item=''
                      key={currentImage.url}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      variants={imageVariants}
                      transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 20,
                      }}
                    >
                      <StrapiImage
                        height={500}
                        width={500}
                        src={currentImage.url}
                        className={`absolute left-1/2 top-1/2 block max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                          isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        alt='...'
                        onLoad={() => setIsLoading(false)} // Hide loader when the image is loaded
                      />
                    </motion.div>
                  </div>

                  {/* Slider indicators */}
                  <div className='absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3'>
                    {imageUrls.map((_, i) => (
                      <button
                        key={i}
                        type='button'
                        className='h-3 w-3 rounded-full'
                        aria-label={`Slide ${i + 1}`}
                        data-carousel-slide-to={i}
                        onClick={() => {
                          setCurrentSlide(i)
                          setIsLoading(true) // Set loading to true when switching slides
                        }}
                      />
                    ))}
                  </div>

                  {/* Slider controls */}
                  <button
                    type='button'
                    className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
                    data-carousel-prev=''
                    onClick={() => {
                      setCurrentSlide(
                        currentSlide === 0
                          ? imageUrls.length - 1
                          : currentSlide - 1
                      )
                      setIsLoading(true) // Set loading to true when changing slides
                    }}
                  >
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/20 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70'>
                      <FaArrowLeft className='h-4 w-4 text-gray-800 dark:text-white rtl:rotate-180' />
                      <span className='sr-only'>Previous</span>
                    </span>
                  </button>

                  <button
                    type='button'
                    className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
                    data-carousel-next=''
                    onClick={() => {
                      setCurrentSlide(
                        currentSlide === imageUrls.length - 1
                          ? 0
                          : currentSlide + 1
                      )
                      setIsLoading(true) // Set loading to true when changing slides
                    }}
                  >
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/20 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70'>
                      <FaArrowRight className='h-4 w-4 text-gray-800 dark:text-white rtl:rotate-180' />
                      <span className='sr-only'>Next</span>
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
    </>
  )
}
