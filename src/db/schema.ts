import {
  pgTable,
  serial,
  varchar,
  text,
  decimal,
  timestamp,
  boolean,
  pgEnum,
  jsonb,
  integer,
} from 'drizzle-orm/pg-core'

// Enums
export const productTypeEnum = pgEnum('product_type', [
  'digital_product',
  'donation',
  'subscription',
  'service',
])

export const productStatusEnum = pgEnum('product_status', [
  'active',
  'inactive',
  'archived',
])

export const transactionStatusEnum = pgEnum('transaction_status', [
  'pending',
  'completed',
  'failed',
  'refunded',
  'cancelled',
])

export const paymentMethodEnum = pgEnum('payment_method', ['polar', 'manual'])

// Admin Users Table
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').notNull().default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Products Table
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  shortDescription: varchar('short_description', { length: 500 }),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  polarProductId: varchar('polar_product_id', { length: 255 }),
  type: productTypeEnum('type').notNull().default('digital_product'),
  status: productStatusEnum('status').notNull().default('active'),
  imageUrl: text('image_url'),
  downloadUrl: text('download_url'),
  features: jsonb('features').$type<string[]>().default([]),
  metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
  allowCustomAmount: boolean('allow_custom_amount').notNull().default(false),
  minAmount: decimal('min_amount', { precision: 10, scale: 2 }),
  maxAmount: decimal('max_amount', { precision: 10, scale: 2 }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Transactions Table
export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  transactionId: varchar('transaction_id', { length: 255 }).notNull().unique(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).notNull().default('USD'),
  status: transactionStatusEnum('status').notNull().default('pending'),
  paymentMethod: paymentMethodEnum('payment_method').notNull().default('polar'),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerName: varchar('customer_name', { length: 255 }),
  customerMetadata: jsonb('customer_metadata')
    .$type<Record<string, any>>()
    .default({}),
  polarOrderId: varchar('polar_order_id', { length: 255 }),
  polarCheckoutId: varchar('polar_checkout_id', { length: 255 }),
  polarCustomerId: varchar('polar_customer_id', { length: 255 }),
  polarSubscriptionId: varchar('polar_subscription_id', { length: 255 }),
  refundId: varchar('refund_id', { length: 255 }),
  refundReason: text('refund_reason'),
  refundedAt: timestamp('refunded_at'),
  notes: text('notes'),
  sourceApp: varchar('source_app', { length: 100 }),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Donation Tiers Table (preset donation amounts)
export const donationTiers = pgTable('donation_tiers', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  icon: varchar('icon', { length: 50 }),
  isActive: boolean('is_active').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// API Keys Table (for app integrations)
export const apiKeys = pgTable('api_keys', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull().unique(),
  appName: varchar('app_name', { length: 255 }).notNull(),
  description: text('description'),
  permissions: jsonb('permissions').$type<string[]>().default([]),
  isActive: boolean('is_active').notNull().default(true),
  lastUsed: timestamp('last_used'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Download Links Table (for digital products)
export const downloadLinks = pgTable('download_links', {
  id: serial('id').primaryKey(),
  transactionId: integer('transaction_id')
    .notNull()
    .references(() => transactions.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  token: varchar('token', { length: 255 }).notNull().unique(),
  downloadUrl: text('download_url').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  downloadCount: integer('download_count').notNull().default(0),
  maxDownloads: integer('max_downloads').notNull().default(5),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// License Keys Table (for software products)
export const licenseKeys = pgTable('license_keys', {
  id: serial('id').primaryKey(),
  transactionId: integer('transaction_id')
    .notNull()
    .references(() => transactions.id),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  licenseKey: varchar('license_key', { length: 255 }).notNull().unique(),
  isActive: boolean('is_active').notNull().default(true),
  activatedAt: timestamp('activated_at'),
  expiresAt: timestamp('expires_at'),
  metadata: jsonb('metadata').$type<Record<string, any>>().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Export types
export type AdminUser = typeof adminUsers.$inferSelect
export type NewAdminUser = typeof adminUsers.$inferInsert

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert

export type Transaction = typeof transactions.$inferSelect
export type NewTransaction = typeof transactions.$inferInsert

export type DonationTier = typeof donationTiers.$inferSelect
export type NewDonationTier = typeof donationTiers.$inferInsert

export type ApiKey = typeof apiKeys.$inferSelect
export type NewApiKey = typeof apiKeys.$inferInsert

export type DownloadLink = typeof downloadLinks.$inferSelect
export type NewDownloadLink = typeof downloadLinks.$inferInsert

export type LicenseKey = typeof licenseKeys.$inferSelect
export type NewLicenseKey = typeof licenseKeys.$inferInsert
