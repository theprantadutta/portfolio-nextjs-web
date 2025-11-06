import { Polar } from '@polar-sh/sdk'

if (!process.env.POLAR_ACCESS_TOKEN) {
  throw new Error('POLAR_ACCESS_TOKEN is not defined in environment variables')
}

// Initialize Polar SDK client
export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server:
    (process.env.NEXT_PUBLIC_POLAR_SERVER as 'sandbox' | 'production') ||
    'sandbox',
})

/**
 * Fetch all active products from Polar
 */
export async function getAllPolarProducts() {
  try {
    const response = await polar.products.list({
      isArchived: false,
    })

    // Check if response has items directly or in result
    if (Array.isArray(response)) {
      return response
    }

    // @ts-ignore - Polar SDK types might be inconsistent
    return response.result?.items || response.items || []
  } catch (error) {
    console.error('Error fetching products from Polar:', error)
    return []
  }
}

/**
 * Fetch a single product by ID from Polar
 */
export async function getPolarProductById(productId: string) {
  try {
    const response = await polar.products.get({
      id: productId,
    })

    // The Polar SDK returns the product directly, not wrapped in .result
    // @ts-ignore - Polar SDK types might show .result but actual response is direct
    return response.result || response || null
  } catch (error) {
    console.error(`[Polar] Error fetching product ${productId}:`, error)
    // Re-throw the error so we can see it in the Next.js error overlay
    throw error
  }
}

/**
 * Get product price in dollars
 */
export function formatPolarPrice(priceAmount?: number): string {
  if (!priceAmount) return '0.00'
  return (priceAmount / 100).toFixed(2)
}

/**
 * Check if product is a recurring subscription
 */
export function isPolarSubscription(product: any): boolean {
  return (
    product.prices?.some((price: any) => price.type === 'recurring') || false
  )
}

/**
 * Get the default price for a product
 */
export function getDefaultPolarPrice(product: any) {
  if (!product.prices || product.prices.length === 0) {
    return null
  }

  // Return the first price
  return product.prices[0]
}

/**
 * Fetch all orders from Polar
 */
export async function getAllPolarOrders(params?: {
  limit?: number
  page?: number
}) {
  try {
    const response = await polar.orders.list({
      limit: params?.limit || 100,
      page: params?.page || 1,
    })

    // Check multiple possible response structures
    // @ts-ignore - Polar SDK types might be inconsistent
    const orders =
      response.result?.items ||
      response.items ||
      response.result ||
      response ||
      []

    return Array.isArray(orders) ? orders : []
  } catch (error) {
    console.error('Error fetching orders from Polar:', error)
    return []
  }
}

/**
 * Fetch all subscriptions from Polar
 */
export async function getAllPolarSubscriptions(params?: {
  limit?: number
  page?: number
}) {
  try {
    const response = await polar.subscriptions.list({
      limit: params?.limit || 100,
      page: params?.page || 1,
    })

    // Check multiple possible response structures
    // @ts-ignore - Polar SDK types might be inconsistent
    const subscriptions =
      response.result?.items ||
      response.items ||
      response.result ||
      response ||
      []

    return Array.isArray(subscriptions) ? subscriptions : []
  } catch (error) {
    console.error('Error fetching subscriptions from Polar:', error)
    return []
  }
}

/**
 * Fetch a single order by ID from Polar
 */
export async function getPolarOrderById(orderId: string) {
  try {
    const response = await polar.orders.get({
      id: orderId,
    })

    // @ts-ignore - Polar SDK types might be inconsistent
    return response.result || response || null
  } catch (error) {
    console.error('Error fetching order from Polar:', error)
    return null
  }
}
