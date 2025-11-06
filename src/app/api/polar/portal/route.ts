import { CustomerPortal } from '@polar-sh/nextjs'
import type { NextRequest } from 'next/server'

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error('POLAR_ACCESS_TOKEN is not defined in environment variables')
}

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server:
    (process.env.NEXT_PUBLIC_POLAR_SERVER as 'sandbox' | 'production') ||
    'sandbox',

  // Extract customer ID from query parameters
  // You can customize this based on your authentication system
  getCustomerId: async (req: NextRequest) => {
    const customerId = req.nextUrl.searchParams.get('customerId')

    if (!customerId) {
      throw new Error('Customer ID is required to access the portal')
    }

    return customerId
  },

  // Return URL after customer manages their subscriptions
  returnUrl:
    process.env.NEXT_PUBLIC_SUCCESS_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://pranta.dev/checkout/success'
      : 'http://localhost:3000/checkout/success'),
})
