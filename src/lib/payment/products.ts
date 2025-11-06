import {
  db,
  products,
  donationTiers,
  type Product,
  type DonationTier,
} from '@/db'
import { eq, desc } from 'drizzle-orm'

/**
 * Get all active products sorted by sort_order
 */
export async function getAllActiveProducts(): Promise<Product[]> {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.status, 'active'))
    .orderBy(products.sortOrder, desc(products.createdAt))

  return result
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1)

  return product || null
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1)

  return product || null
}

/**
 * Get all active donation tiers sorted by sort_order
 */
export async function getAllDonationTiers(): Promise<DonationTier[]> {
  const result = await db
    .select()
    .from(donationTiers)
    .where(eq(donationTiers.isActive, true))
    .orderBy(donationTiers.sortOrder)

  return result
}

/**
 * Get products by type
 */
export async function getProductsByType(
  type: 'digital_product' | 'donation' | 'subscription' | 'service'
): Promise<Product[]> {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.type, type))
    .orderBy(products.sortOrder)

  return result
}
