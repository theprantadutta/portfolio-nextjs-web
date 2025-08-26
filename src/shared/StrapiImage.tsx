'use client'

import Image from 'next/image'
import { getStrapiMedia } from '@/lib/utils'
import { ReactEventHandler, useState } from 'react'
import { CSSProperties } from 'react'

interface StrapiImageProps {
  src: string
  alt: string
  height: number
  width: number
  objectFit?: CSSProperties['objectFit']
  className?: string
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined
  priority?: boolean
  sizes?: string
  fill?: boolean
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  onLoad,
  objectFit = 'contain',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
}: Readonly<StrapiImageProps>) {
  const [imageError, setImageError] = useState(false)

  if (!src) return null

  const imageUrl = getStrapiMedia(src)
  const imageFallback = `https://placehold.co/${width}x${height}`

  return (
    <Image
      src={imageError ? imageFallback : imageUrl || imageFallback}
      alt={alt}
      {...(fill ? { fill: true } : { height, width })}
      style={{ objectFit, maxHeight: '100%', maxWidth: '100%' }}
      className={className}
      onLoad={onLoad}
      onError={() => setImageError(true)}
      priority={priority}
      sizes={sizes}
    />
  )
}
