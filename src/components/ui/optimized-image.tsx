'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
  className?: string
  blurDataURL?: string
  priority?: boolean
}

export function OptimizedImage({
  src,
  alt,
  className,
  blurDataURL,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate blur placeholder if not provided
  const defaultBlurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNGY0ZjQiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+Cjwvc3ZnPg=='

  return (
    <div className={clsx('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        placeholder={blurDataURL || defaultBlurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        className={clsx(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError ? 'opacity-50' : ''
        )}
        {...props}
      />

      {/* Loading state */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
          <div className='border-t-primary-600 dark:border-t-primary-400 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600' />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800'>
          <div className='text-center'>
            <div className='mb-2 text-2xl text-gray-400'>📷</div>
            <p className='text-sm text-gray-500'>Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  )
}
