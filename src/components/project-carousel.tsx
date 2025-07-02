'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Parallax, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { IStrapiImageData } from '@/types/types'
import IphoneMockup from './iphone-mockup'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/parallax'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

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
    <Swiper
      modules={[Parallax, Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={'auto'}
      centeredSlides={true}
      loop={true}
      parallax={true}
      navigation
      pagination={{ clickable: true }}
      className='h-full w-full'
    >
      {sortedImageUrls.map((image, index) => {
        const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_PROD_API_URL}${getBestImageUrl(image)}`
        return (
          <SwiperSlide key={image.id} style={{ width: '270px' }}>
            <div data-swiper-parallax='-23%'>
              <div
                style={{ transform: 'scale(0.85)', transformOrigin: 'center' }}
              >
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
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default ProjectCarousel
