import { STRAPI_URL } from '@/constants/urls'

export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  return !(!value || typeof value !== 'string' || value.length > maxLength)
}

export const getErrorMessage = (error: unknown): string => {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}

export function getStrapiURL() {
  return STRAPI_URL ?? 'http://localhost:1337'
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null
  if (url.startsWith('data:')) return url
  if (url.startsWith('http') || url.startsWith('//')) return url
  return `${getStrapiURL()}${url}`
}
