import { Checkout } from '@polar-sh/nextjs'

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error('POLAR_ACCESS_TOKEN is not defined in environment variables')
}

if (!process.env.NEXT_PUBLIC_SUCCESS_URL) {
  throw new Error(
    'NEXT_PUBLIC_SUCCESS_URL is not defined in environment variables'
  )
}

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.NEXT_PUBLIC_SUCCESS_URL,
  server:
    (process.env.NEXT_PUBLIC_POLAR_SERVER as 'sandbox' | 'production') ||
    'sandbox',
})
