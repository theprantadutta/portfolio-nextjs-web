import Image from 'next/image'
import { getStrapiMedia } from '@/lib/utils'
import { ReactEventHandler } from 'react'
import { CSSProperties } from 'react'

interface StrapiImageProps {
  src: string
  alt: string
  height: number
  width: number
  objectFit?: CSSProperties['objectFit']
  className?: string
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined
}

export function StrapiImage({
  src,
  alt,
  height,
  width,
  className,
  onLoad,
  objectFit = 'contain',
}: Readonly<StrapiImageProps>) {
  if (!src) return null
  const imageUrl = getStrapiMedia(src)
  const imageFallback = `https://placehold.co/${width}x${height}`

  return (
    <Image
      src={imageUrl ?? imageFallback}
      alt={alt}
      height={height}
      width={width}
      style={{ objectFit, maxHeight: '100%', maxWidth: '100%' }}
      className={className}
      onLoad={onLoad}
    />
  )
}
