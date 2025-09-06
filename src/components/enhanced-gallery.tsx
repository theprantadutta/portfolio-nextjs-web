'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { IStrapiImageData } from '@/types/types'
import { StrapiImage } from '@/shared/StrapiImage'
import { getOptimalImageSrc } from '@/lib/project-utils'
import { useModalAnimation } from '@/lib/animation-hooks'
import {
  FaArrowLeft,
  FaArrowRight,
  FaExpand,
  FaTimes,
  FaDownload,
  FaInfoCircle,
  FaImage,
} from 'react-icons/fa'

interface EnhancedGalleryProps {
  images: IStrapiImageData[]
  projectTitle: string
  selectedIndex: number
  onIndexChange: (index: number) => void
}

export const EnhancedGallery = ({
  images,
  projectTitle,
  selectedIndex,
  onIndexChange,
}: EnhancedGalleryProps) => {
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showImageInfo, setShowImageInfo] = useState(false)

  const currentImage = images[selectedIndex]

  // Enhanced modal animation hook
  const { shouldRender, animationPhase } = useModalAnimation(showFullscreen)

  const nextImage = useCallback(() => {
    onIndexChange(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
  }, [selectedIndex, images.length, onIndexChange])

  const prevImage = useCallback(() => {
    onIndexChange(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
  }, [selectedIndex, images.length, onIndexChange])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!showFullscreen) return

      switch (e.key) {
        case 'Escape':
          setShowFullscreen(false)
          break
        case 'ArrowLeft':
          prevImage()
          break
        case 'ArrowRight':
          nextImage()
          break
        case 'i':
        case 'I':
          setShowImageInfo(!showImageInfo)
          break
      }
    },
    [showFullscreen, showImageInfo, prevImage, nextImage]
  )

  useEffect(() => {
    if (showFullscreen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [showFullscreen, handleKeyDown])

  const getImageDimensions = (image: IStrapiImageData) => {
    const medium = image.formats?.medium
    const large = image.formats?.large
    return {
      width: medium?.width || large?.width || 400,
      height: medium?.height || large?.height || 600,
      aspectRatio:
        (medium?.width || large?.width || 400) /
        (medium?.height || large?.height || 600),
    }
  }

  return (
    <>
      {/* Gallery Header with Enhanced Stats */}
      <div className='mb-6 text-center sm:mb-8'>
        <div className='special-border glass-card inline-flex flex-wrap items-center justify-center gap-2 bg-white/10 px-3 py-2 backdrop-blur-xl dark:bg-gray-900/30 sm:gap-4 sm:px-6 sm:py-3'>
          <div className='flex items-center gap-2'>
            <FaImage className='h-3 w-3 text-blue-500 sm:h-4 sm:w-4' />
            <span className='text-sm font-medium text-gray-900 dark:text-white sm:text-base'>
              {images.length} Screenshots
            </span>
          </div>
          <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-600 sm:block'></div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
              Current: {selectedIndex + 1}/{images.length}
            </span>
          </div>
          <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-600 sm:block'></div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
              {getImageDimensions(currentImage).width}×
              {getImageDimensions(currentImage).height}
            </span>
          </div>
        </div>
      </div>

      {/* Main Image Display with Enhanced Container */}
      <div className='relative mb-6 px-4 sm:mb-8 sm:px-8'>
        <div className='relative mx-auto aspect-[9/16] w-full max-w-[280px] sm:max-w-sm'>
          {/* Enhanced Glow Effects */}
          <div className='absolute -inset-8 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30 blur-2xl'></div>
          <div className='absolute -inset-4 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-pink-400/20 blur-xl'></div>

          {/* Enhanced Glassmorphic Container */}
          <div className='special-border glass-card relative h-full overflow-hidden border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/30'>
            <div className='relative h-full w-full overflow-hidden rounded-lg'>
              <StrapiImage
                src={getOptimalImageSrc(currentImage, 'gallery')}
                alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                className='h-full w-full object-cover transition-all duration-300'
                width={280}
                height={560}
              />

              {/* Image Overlay Actions */}
              <div className='absolute right-2 top-2 flex gap-2'>
                <button
                  onClick={() => setShowFullscreen(true)}
                  className='special-border glass-card p-2 text-white/90 transition-all duration-300 hover:bg-white/20'
                  title='View Fullscreen'
                >
                  <FaExpand className='h-4 w-4' />
                </button>
                <button
                  onClick={() => setShowImageInfo(!showImageInfo)}
                  className='special-border glass-card p-2 text-white/90 transition-all duration-300 hover:bg-white/20'
                  title='Image Info'
                >
                  <FaInfoCircle className='h-4 w-4' />
                </button>
              </div>

              {/* Image Info Overlay */}
              {showImageInfo && (
                <div className='absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-white backdrop-blur-sm'>
                  <div className='space-y-1 text-xs'>
                    <div>
                      Dimensions: {getImageDimensions(currentImage).width} ×{' '}
                      {getImageDimensions(currentImage).height}
                    </div>
                    <div>
                      Aspect Ratio:{' '}
                      {getImageDimensions(currentImage).aspectRatio.toFixed(2)}
                    </div>
                    <div>
                      Image {selectedIndex + 1} of {images.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='special-border glass-card absolute -left-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-gray-800/50 sm:-left-6 sm:p-3'
                title='Previous Image'
              >
                <FaArrowLeft className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
              <button
                onClick={nextImage}
                className='special-border glass-card absolute -right-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-gray-800/50 sm:-right-6 sm:p-3'
                title='Next Image'
              >
                <FaArrowRight className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
            </>
          )}

          {/* Enhanced Counter */}
          <div className='special-border glass-card absolute bottom-2 left-1/2 z-20 -translate-x-1/2 bg-black/50 px-3 py-1 backdrop-blur-md sm:bottom-4 sm:px-4 sm:py-2'>
            <span className='text-xs font-medium text-white sm:text-sm'>
              {selectedIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Thumbnail Navigation */}
      <div className='flex justify-center px-2 sm:px-4'>
        <div
          className='flex max-w-full gap-2 overflow-x-auto pb-4 sm:gap-3'
          style={{ scrollbarWidth: 'thin' }}
        >
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onIndexChange(index)}
              className={`group relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 sm:h-20 sm:w-20 sm:rounded-xl ${
                selectedIndex === index
                  ? 'scale-90 shadow-lg ring-2 ring-blue-500 ring-offset-2 ring-offset-white/10'
                  : 'opacity-80 hover:scale-105 hover:opacity-100'
              }`}
            >
              <StrapiImage
                src={getOptimalImageSrc(image, 'thumbnail')}
                alt={`${projectTitle} thumbnail ${index + 1}`}
                className='h-full w-full object-cover transition-all duration-300 group-hover:scale-110'
                width={80}
                height={80}
                objectFit='cover'
              />
              <div
                className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  selectedIndex === index
                    ? 'bg-blue-500/20'
                    : 'bg-black/0 group-hover:bg-black/10'
                }`}
              />
              {/* Enhanced Selection Indicator */}
              {selectedIndex === index && (
                <div className='absolute -top-1 left-1/2 -translate-x-1/2'>
                  <div className='h-2 w-2 animate-pulse rounded-full bg-blue-500'></div>
                </div>
              )}
              {/* Thumbnail Index */}
              <div
                className={`absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  selectedIndex === index
                    ? 'scale-100 bg-blue-500 text-white'
                    : 'scale-90 bg-black/70 text-white/90'
                }`}
              >
                {index + 1}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {shouldRender &&
        createPortal(
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300 ${
              animationPhase === 'entering' || animationPhase === 'entered'
                ? 'opacity-100'
                : 'opacity-0'
            }`}
            onClick={() => setShowFullscreen(false)}
          >
            <div
              className={`relative max-h-[90vh] max-w-[90vw] transition-all duration-300 ${
                animationPhase === 'entering' || animationPhase === 'entered'
                  ? 'scale-100'
                  : 'scale-95'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Image */}
              <StrapiImage
                src={getOptimalImageSrc(currentImage, 'hero')}
                alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                className='max-h-[90vh] max-w-[90vw] object-contain'
                width={getImageDimensions(currentImage).width}
                height={getImageDimensions(currentImage).height}
              />

              {/* Fullscreen Controls */}
              <div className='absolute right-4 top-4 flex gap-2'>
                <button
                  onClick={() => setShowImageInfo(!showImageInfo)}
                  className='special-border glass-card p-3 text-white transition-all duration-300 hover:bg-white/20'
                  title='Toggle Info'
                >
                  <FaInfoCircle className='h-5 w-5' />
                </button>
                <button
                  onClick={() => setShowFullscreen(false)}
                  className='special-border glass-card p-3 text-white transition-all duration-300 hover:bg-white/20'
                  title='Close Fullscreen'
                >
                  <FaTimes className='h-5 w-5' />
                </button>
              </div>

              {/* Fullscreen Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='special-border glass-card absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white transition-all duration-300 hover:bg-white/20'
                    title='Previous Image (←)'
                  >
                    <FaArrowLeft className='h-6 w-6' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='special-border glass-card absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white transition-all duration-300 hover:bg-white/20'
                    title='Next Image (→)'
                  >
                    <FaArrowRight className='h-6 w-6' />
                  </button>
                </>
              )}

              {/* Fullscreen Info Panel */}
              {showImageInfo && (
                <div className='absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm'>
                  <div className='grid grid-cols-2 gap-4 text-sm md:grid-cols-4'>
                    <div>
                      <div className='font-medium'>Dimensions</div>
                      <div className='text-gray-300'>
                        {getImageDimensions(currentImage).width} ×{' '}
                        {getImageDimensions(currentImage).height}
                      </div>
                    </div>
                    <div>
                      <div className='font-medium'>Aspect Ratio</div>
                      <div className='text-gray-300'>
                        {getImageDimensions(currentImage).aspectRatio.toFixed(
                          2
                        )}
                      </div>
                    </div>
                    <div>
                      <div className='font-medium'>Position</div>
                      <div className='text-gray-300'>
                        {selectedIndex + 1} of {images.length}
                      </div>
                    </div>
                    <div>
                      <div className='font-medium'>Controls</div>
                      <div className='text-gray-300'>← → ESC I</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fullscreen Counter */}
              <div className='special-border glass-card absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 text-white backdrop-blur-md'>
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
