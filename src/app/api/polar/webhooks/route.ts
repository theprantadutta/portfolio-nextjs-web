import { Webhooks } from '@polar-sh/nextjs'
import { db, transactions } from '@/db'
import { eq } from 'drizzle-orm'

// Use empty string as fallback for build time, will fail at runtime if webhook is called
const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET || ''

if (!WEBHOOK_SECRET && process.env.NODE_ENV !== 'production') {
  console.warn(
    'Warning: POLAR_WEBHOOK_SECRET is not defined in environment variables'
  )
}

export const POST = Webhooks({
  webhookSecret: WEBHOOK_SECRET,

  // Handle order creation (when checkout is initiated)
  onOrderCreated: async (order) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('🎯 Order Created:', (order as any).id)

    try {
      // Create transaction record directly from Polar data
      // No need to match against products table - Polar is the source of truth
      // @ts-ignore - Polar SDK types might be inconsistent
      await db.insert(transactions).values({
        transactionId: (order as any).id,
        amount: ((order as any).amount / 100).toString(), // Convert from cents
        currency: (order as any).currency,
        status: 'pending',
        paymentMethod: 'polar',
        customerEmail:
          (order as any).user_email ||
          (order as any).customer?.email ||
          'unknown@email.com',
        customerName: (order as any).user_name || (order as any).customer?.name,
        polarOrderId: (order as any).id,
        polarCheckoutId: (order as any).checkout_id,
        polarCustomerId: (order as any).customer_id,
        polarSubscriptionId: (order as any).subscription_id,
        metadata: order as any,
        sourceApp: (order as any).customer_metadata?.app_name as
          | string
          | undefined,
      })

      // @ts-ignore
      console.log('✅ Transaction created for order:', (order as any).id)
    } catch (error) {
      console.error('❌ Error creating transaction:', error)
    }
  },

  // Handle successful payment
  onOrderPaid: async (order) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('💰 Order Paid:', (order as any).id)

    try {
      // Update transaction status
      await db
        .update(transactions)
        .set({
          status: 'completed',
          completedAt: new Date(),
        })
        // @ts-ignore
        .where(eq(transactions.polarOrderId, (order as any).id))

      // @ts-ignore
      console.log('✅ Transaction marked as completed:', (order as any).id)

      // TODO: Send email confirmation
      // TODO: Generate download link if digital product
      // TODO: Generate license key if applicable
    } catch (error) {
      console.error('❌ Error updating transaction:', error)
    }
  },

  // Handle refunds
  onOrderRefunded: async (order) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('↩️ Order Refunded:', (order as any).id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'refunded',
          refundedAt: new Date(),
          refundReason: 'Refunded via Polar',
        })
        // @ts-ignore
        .where(eq(transactions.polarOrderId, (order as any).id))

      // @ts-ignore
      console.log('✅ Transaction marked as refunded:', (order as any).id)
    } catch (error) {
      console.error('❌ Error refunding transaction:', error)
    }
  },

  // Handle subscription events
  onSubscriptionCreated: async (subscription) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('🔄 Subscription Created:', (subscription as any).id)

    try {
      // Create transaction record directly from Polar data
      // @ts-ignore
      await db.insert(transactions).values({
        transactionId: (subscription as any).id,
        amount: ((subscription as any).amount / 100).toString(),
        currency: (subscription as any).currency,
        status: 'pending',
        paymentMethod: 'polar',
        customerEmail:
          (subscription as any).user_email ||
          (subscription as any).customer?.email ||
          'unknown@email.com',
        customerName:
          (subscription as any).user_name ||
          (subscription as any).customer?.name,
        polarSubscriptionId: (subscription as any).id,
        polarCustomerId: (subscription as any).customer_id,
        metadata: subscription as any,
      })

      // @ts-ignore
      console.log(
        '✅ Subscription transaction created:',
        (subscription as any).id
      )
    } catch (error) {
      console.error('❌ Error creating subscription transaction:', error)
    }
  },

  onSubscriptionActive: async (subscription) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('✅ Subscription Active:', (subscription as any).id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'completed',
          completedAt: new Date(),
        })
        // @ts-ignore
        .where(eq(transactions.polarSubscriptionId, (subscription as any).id))
    } catch (error) {
      console.error('❌ Error activating subscription:', error)
    }
  },

  onSubscriptionCanceled: async (subscription) => {
    // @ts-ignore - Polar SDK types might be inconsistent
    console.log('❌ Subscription Canceled:', (subscription as any).id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'cancelled',
          notes: 'Subscription canceled by user',
        })
        // @ts-ignore
        .where(eq(transactions.polarSubscriptionId, (subscription as any).id))
    } catch (error) {
      console.error('❌ Error canceling subscription:', error)
    }
  },

  // Generic webhook handler for all events
  onPayload: async (payload) => {
    console.log('📦 Webhook received:', payload.type)
  },
})
