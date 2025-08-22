'use client'

import React from 'react'
import Image from 'next/image'
import { IStrapiImageData } from '@/types/types'
import IphoneMockup from './iphone-mockup'
import { Carousel } from '@/components/ui/carousel'

interface ProjectCarouselProps {
  imageUrls: IStrapiImageData[]
  title: string
}

const getBestImageUrl = (image: IStrapiImageData) => {
  const formats = image.formats
  return (
    formats?.large?.url ||
    formats?.medium?.url ||
    formats?.small?.url ||
    formats?.thumbnail?.url
  )
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  imageUrls,
  title,
}) => {
  const sortedImageUrls = [...imageUrls].sort((a, b) => {
    const urlA = getBestImageUrl(a)
    const urlB = getBestImageUrl(b)

    const extractNumber = (url: string | undefined) => {
      if (!url) return 0
      const filename = url.split('/').pop()
      if (!filename) return 0

      const matches = filename.match(/\d+/g) // Find all sequences of digits
      if (matches && matches.length > 0) {
        // Return the last number found in the filename
        return parseInt(matches[matches.length - 1], 10)
      }
      return 0
    }

    return extractNumber(urlA) - extractNumber(urlB)
  })

  return (
    <div className='relative h-[500px] w-full'>
      <Carousel
        autoplay={true}
        autoplayDelay={4000}
        showNavigation={true}
        showPagination={true}
        loop={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        spaceBetween={30}
        className='h-full w-full'
        slideClassName='w-[270px] flex items-center justify-center'
      >
        {sortedImageUrls.map((image, index) => {
          const imageUrl = `${getBestImageUrl(image)}`
          return (
            <div key={image.id} className='relative'>
              <div className='scale-85 origin-center transform'>
                <IphoneMockup>
                  <Image
                    src={imageUrl}
                    alt={`${title} screenshot ${index + 1}`}
                    className='h-full w-full object-cover'
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    quality={90}
                  />
                </IphoneMockup>
              </div>
            </div>
          )
        })}
      </Carousel>
    </div>
  )
}

export default ProjectCarousel
