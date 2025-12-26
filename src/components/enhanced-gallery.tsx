'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IStrapiImageData } from '@/types/types'
import { StrapiImage } from '@/shared/StrapiImage'
import { getOptimalImageSrc } from '@/lib/project-utils'
import { useModalAnimation } from '@/lib/animation-hooks'
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaTimes,
  FaInfoCircle,
  FaImage,
  FaPlay,
  FaVideo,
} from 'react-icons/fa'

// Extended media type that can be image or video
interface MediaItem extends IStrapiImageData {
  isVideo?: boolean
  url?: string
}

interface EnhancedGalleryProps {
  images: IStrapiImageData[]
  videos?: IStrapiImageData[]
  projectTitle: string
  selectedIndex: number
  onIndexChange: (index: number) => void
}

// Helper to check if URL is a video
const isVideoUrl = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv']
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext))
}

// Helper to get video URL from Strapi media
const getVideoUrl = (media: IStrapiImageData): string => {
  // Strapi stores video URL directly or in formats
  if ((media as any).url) return (media as any).url
  if (media.formats?.large?.url) return media.formats.large.url
  if (media.formats?.medium?.url) return media.formats.medium.url
  return ''
}

export const EnhancedGallery = ({
  images,
  videos,
  projectTitle,
  selectedIndex,
  onIndexChange,
}: EnhancedGalleryProps) => {
  const [showFullscreen, setShowFullscreen] = useState(false)
  const [showImageInfo, setShowImageInfo] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const thumbnailRef = useRef<HTMLDivElement>(null)

  // Combine images and videos into a single media array
  // Videos come first, then images
  const allMedia: MediaItem[] = [
    ...(videos || []).map((v) => ({ ...v, isVideo: true })),
    ...images.map((img) => ({ ...img, isVideo: false })),
  ]

  const currentMedia = allMedia[selectedIndex]
  const isCurrentVideo = currentMedia?.isVideo || false
  const videoCount = videos?.length || 0
  const imageCount = images.length

  // Check if thumbnails can scroll
  const checkScrollability = useCallback(() => {
    if (thumbnailRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }, [])

  useEffect(() => {
    checkScrollability()
    const container = thumbnailRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      return () => {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [checkScrollability, images])

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailRef.current) {
      thumbnailRef.current.scrollBy({
        left: direction === 'left' ? -150 : 150,
        behavior: 'smooth',
      })
    }
  }

  // Enhanced modal animation hook
  const { shouldRender, animationPhase } = useModalAnimation(showFullscreen)

  // Store media length in a stable ref for callbacks
  const mediaLength = allMedia.length

  const nextImage = useCallback(() => {
    onIndexChange(selectedIndex === mediaLength - 1 ? 0 : selectedIndex + 1)
  }, [selectedIndex, mediaLength, onIndexChange])

  const prevImage = useCallback(() => {
    onIndexChange(selectedIndex === 0 ? mediaLength - 1 : selectedIndex - 1)
  }, [selectedIndex, mediaLength, onIndexChange])

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

  const getMediaDimensions = (media: MediaItem) => {
    const medium = media.formats?.medium
    const large = media.formats?.large
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
              {imageCount} Screenshots
            </span>
          </div>
          {videoCount > 0 && (
            <>
              <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-600 sm:block'></div>
              <div className='flex items-center gap-2'>
                <FaVideo className='h-3 w-3 text-purple-500 sm:h-4 sm:w-4' />
                <span className='text-sm font-medium text-gray-900 dark:text-white sm:text-base'>
                  {videoCount} Video{videoCount > 1 ? 's' : ''}
                </span>
              </div>
            </>
          )}
          <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-600 sm:block'></div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
              Current: {selectedIndex + 1}/{allMedia.length}
            </span>
          </div>
          {!isCurrentVideo && (
            <>
              <div className='hidden h-4 w-px bg-gray-300 dark:bg-gray-600 sm:block'></div>
              <div className='flex items-center gap-2'>
                <span className='text-xs text-gray-600 dark:text-gray-400 sm:text-sm'>
                  {getMediaDimensions(currentMedia).width}×
                  {getMediaDimensions(currentMedia).height}
                </span>
              </div>
            </>
          )}
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
              {isCurrentVideo ? (
                <video
                  src={getVideoUrl(currentMedia)}
                  className='h-full w-full object-cover'
                  controls
                  playsInline
                />
              ) : (
                <StrapiImage
                  src={getOptimalImageSrc(currentMedia, 'gallery')}
                  alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                  className='h-full w-full object-cover transition-all duration-300'
                  width={280}
                  height={560}
                />
              )}

              {/* Media Overlay Actions */}
              <div className='absolute right-2 top-2 flex gap-2'>
                <button
                  onClick={() => setShowFullscreen(true)}
                  className='special-border glass-card p-2 text-white/90 transition-all duration-300 hover:bg-white/20'
                  aria-label='View fullscreen'
                >
                  <FaExpand className='h-4 w-4' />
                </button>
                {!isCurrentVideo && (
                  <button
                    onClick={() => setShowImageInfo(!showImageInfo)}
                    className='special-border glass-card p-2 text-white/90 transition-all duration-300 hover:bg-white/20'
                    aria-label={
                      showImageInfo ? 'Hide image info' : 'Show image info'
                    }
                  >
                    <FaInfoCircle className='h-4 w-4' />
                  </button>
                )}
              </div>

              {/* Video Badge */}
              {isCurrentVideo && (
                <div className='absolute left-2 top-2'>
                  <div className='special-border glass-card flex items-center gap-1 bg-purple-500/80 px-2 py-1 text-white'>
                    <FaVideo className='h-3 w-3' />
                    <span className='text-xs font-medium'>Video</span>
                  </div>
                </div>
              )}

              {/* Image Info Overlay */}
              {showImageInfo && !isCurrentVideo && (
                <div className='absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-white backdrop-blur-sm'>
                  <div className='space-y-1 text-xs'>
                    <div>
                      Dimensions: {getMediaDimensions(currentMedia).width} ×{' '}
                      {getMediaDimensions(currentMedia).height}
                    </div>
                    <div>
                      Aspect Ratio:{' '}
                      {getMediaDimensions(currentMedia).aspectRatio.toFixed(2)}
                    </div>
                    <div>
                      Item {selectedIndex + 1} of {allMedia.length}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          {allMedia.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className='special-border glass-card absolute -left-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-gray-800/50 sm:-left-6 sm:p-3'
                aria-label='Previous image'
              >
                <FaArrowLeft className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
              <button
                onClick={nextImage}
                className='special-border glass-card absolute -right-4 top-1/2 z-20 -translate-y-1/2 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30 dark:hover:bg-gray-800/50 sm:-right-6 sm:p-3'
                aria-label='Next image'
              >
                <FaArrowRight className='h-4 w-4 sm:h-5 sm:w-5' />
              </button>
            </>
          )}

          {/* Enhanced Counter */}
          <div className='special-border glass-card absolute bottom-2 left-1/2 z-20 -translate-x-1/2 bg-black/50 px-3 py-1 backdrop-blur-md sm:bottom-4 sm:px-4 sm:py-2'>
            <span className='text-xs font-medium text-white sm:text-sm'>
              {selectedIndex + 1} / {allMedia.length}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation with Arrows */}
      <div className='relative mx-auto max-w-2xl px-12'>
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollThumbnails('left')}
            className='absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-800'
            aria-label='Scroll thumbnails left'
          >
            <FaChevronLeft className='h-4 w-4' />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollThumbnails('right')}
            className='absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:text-gray-200 dark:hover:bg-gray-800'
            aria-label='Scroll thumbnails right'
          >
            <FaChevronRight className='h-4 w-4' />
          </button>
        )}

        {/* Thumbnails Container */}
        <div
          ref={thumbnailRef}
          className='flex gap-2 overflow-x-auto py-2'
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {allMedia.map((media, index) => (
            <button
              key={media.id}
              onClick={() => onIndexChange(index)}
              aria-label={`View ${media.isVideo ? 'video' : 'image'} ${index + 1} of ${allMedia.length}`}
              className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                selectedIndex === index
                  ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-900'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className='h-16 w-16 sm:h-[72px] sm:w-[72px]'>
                {media.isVideo ? (
                  <div className='flex h-full w-full items-center justify-center bg-gray-800'>
                    <FaPlay className='h-4 w-4 text-white' />
                  </div>
                ) : (
                  <StrapiImage
                    src={getOptimalImageSrc(media, 'thumbnail')}
                    alt={`${projectTitle} thumbnail ${index + 1}`}
                    className='h-full w-full object-cover'
                    width={72}
                    height={72}
                  />
                )}
              </div>
              {/* Video indicator overlay */}
              {media.isVideo && (
                <div className='absolute bottom-0 left-0 right-0 bg-purple-500/80 py-0.5 text-center'>
                  <span className='text-[8px] font-medium text-white'>
                    VIDEO
                  </span>
                </div>
              )}
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
              {/* Fullscreen Media */}
              {isCurrentVideo ? (
                <video
                  src={getVideoUrl(currentMedia)}
                  className='max-h-[90vh] max-w-[90vw] object-contain'
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <StrapiImage
                  src={getOptimalImageSrc(currentMedia, 'hero')}
                  alt={`${projectTitle} screenshot ${selectedIndex + 1}`}
                  className='max-h-[90vh] max-w-[90vw] object-contain'
                  width={getMediaDimensions(currentMedia).width}
                  height={getMediaDimensions(currentMedia).height}
                />
              )}

              {/* Fullscreen Controls */}
              <div className='absolute right-4 top-4 flex gap-2'>
                {!isCurrentVideo && (
                  <button
                    onClick={() => setShowImageInfo(!showImageInfo)}
                    className='special-border glass-card p-3 text-white transition-all duration-300 hover:bg-white/20'
                    aria-label={
                      showImageInfo ? 'Hide image info' : 'Show image info'
                    }
                  >
                    <FaInfoCircle className='h-5 w-5' />
                  </button>
                )}
                <button
                  onClick={() => setShowFullscreen(false)}
                  className='special-border glass-card p-3 text-white transition-all duration-300 hover:bg-white/20'
                  aria-label='Close fullscreen'
                >
                  <FaTimes className='h-5 w-5' />
                </button>
              </div>

              {/* Fullscreen Navigation */}
              {allMedia.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className='special-border glass-card absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white transition-all duration-300 hover:bg-white/20'
                    aria-label='Previous image'
                  >
                    <FaArrowLeft className='h-6 w-6' />
                  </button>
                  <button
                    onClick={nextImage}
                    className='special-border glass-card absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white transition-all duration-300 hover:bg-white/20'
                    aria-label='Next image'
                  >
                    <FaArrowRight className='h-6 w-6' />
                  </button>
                </>
              )}

              {/* Fullscreen Info Panel (images only) */}
              {showImageInfo && !isCurrentVideo && (
                <div className='absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm'>
                  <div className='grid grid-cols-2 gap-4 text-sm md:grid-cols-4'>
                    <div>
                      <div className='font-medium'>Dimensions</div>
                      <div className='text-gray-300'>
                        {getMediaDimensions(currentMedia).width} ×{' '}
                        {getMediaDimensions(currentMedia).height}
                      </div>
                    </div>
                    <div>
                      <div className='font-medium'>Aspect Ratio</div>
                      <div className='text-gray-300'>
                        {getMediaDimensions(currentMedia).aspectRatio.toFixed(
                          2
                        )}
                      </div>
                    </div>
                    <div>
                      <div className='font-medium'>Position</div>
                      <div className='text-gray-300'>
                        {selectedIndex + 1} of {allMedia.length}
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
                {selectedIndex + 1} / {allMedia.length}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
