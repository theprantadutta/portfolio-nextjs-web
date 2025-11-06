import 'dotenv/config'
import postgres from 'postgres'

const fixEnum = async () => {
  console.log('⏳ Fixing payment_method enum...')

  const connection = postgres(process.env.DATABASE_URL!)

  try {
    // Add new polar value to the enum
    await connection`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_enum
          WHERE enumlabel = 'polar'
          AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'payment_method')
        ) THEN
          ALTER TYPE payment_method ADD VALUE 'polar';
        END IF;
      END $$;
    `

    // Add polar-specific columns to transactions if they don't exist
    await connection`
      ALTER TABLE transactions
      ADD COLUMN IF NOT EXISTS polar_order_id varchar(255),
      ADD COLUMN IF NOT EXISTS polar_checkout_id varchar(255),
      ADD COLUMN IF NOT EXISTS polar_customer_id varchar(255),
      ADD COLUMN IF NOT EXISTS polar_subscription_id varchar(255);
    `

    // Add polar_product_id to products if it doesn't exist
    await connection`
      ALTER TABLE products
      ADD COLUMN IF NOT EXISTS polar_product_id varchar(255);
    `

    // Update default payment method to polar
    await connection`
      ALTER TABLE transactions
      ALTER COLUMN payment_method SET DEFAULT 'polar';
    `

    // Make productId nullable (since we're loading products from Polar now)
    await connection`
      ALTER TABLE transactions
      ALTER COLUMN product_id DROP NOT NULL;
    `

    console.log('✅ Enum and columns updated successfully!')
  } catch (error) {
    console.error('❌ Error updating enum:', error)
    throw error
  } finally {
    await connection.end()
  }

  process.exit(0)
}

fixEnum()
