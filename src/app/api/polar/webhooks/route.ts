import { Webhooks } from '@polar-sh/nextjs'
import { db, transactions } from '@/db'
import { eq } from 'drizzle-orm'

if (!process.env.POLAR_WEBHOOK_SECRET) {
  throw new Error(
    'POLAR_WEBHOOK_SECRET is not defined in environment variables'
  )
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET,

  // Handle order creation (when checkout is initiated)
  onOrderCreated: async (order) => {
    console.log('🎯 Order Created:', order.id)

    try {
      // Create transaction record directly from Polar data
      // No need to match against products table - Polar is the source of truth
      await db.insert(transactions).values({
        transactionId: order.id,
        amount: (order.amount / 100).toString(), // Convert from cents
        currency: order.currency,
        status: 'pending',
        paymentMethod: 'polar',
        customerEmail:
          order.user_email || order.customer?.email || 'unknown@email.com',
        customerName: order.user_name || order.customer?.name,
        polarOrderId: order.id,
        polarCheckoutId: order.checkout_id,
        polarCustomerId: order.customer_id,
        polarSubscriptionId: order.subscription_id,
        metadata: order as any,
        sourceApp: order.customer_metadata?.app_name as string | undefined,
      })

      console.log('✅ Transaction created for order:', order.id)
    } catch (error) {
      console.error('❌ Error creating transaction:', error)
    }
  },

  // Handle successful payment
  onOrderPaid: async (order) => {
    console.log('💰 Order Paid:', order.id)

    try {
      // Update transaction status
      await db
        .update(transactions)
        .set({
          status: 'completed',
          completedAt: new Date(),
        })
        .where(eq(transactions.polarOrderId, order.id))

      console.log('✅ Transaction marked as completed:', order.id)

      // TODO: Send email confirmation
      // TODO: Generate download link if digital product
      // TODO: Generate license key if applicable
    } catch (error) {
      console.error('❌ Error updating transaction:', error)
    }
  },

  // Handle refunds
  onOrderRefunded: async (order) => {
    console.log('↩️ Order Refunded:', order.id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'refunded',
          refundedAt: new Date(),
          refundReason: 'Refunded via Polar',
        })
        .where(eq(transactions.polarOrderId, order.id))

      console.log('✅ Transaction marked as refunded:', order.id)
    } catch (error) {
      console.error('❌ Error refunding transaction:', error)
    }
  },

  // Handle subscription events
  onSubscriptionCreated: async (subscription) => {
    console.log('🔄 Subscription Created:', subscription.id)

    try {
      // Create transaction record directly from Polar data
      await db.insert(transactions).values({
        transactionId: subscription.id,
        amount: (subscription.amount / 100).toString(),
        currency: subscription.currency,
        status: 'pending',
        paymentMethod: 'polar',
        customerEmail:
          subscription.user_email ||
          subscription.customer?.email ||
          'unknown@email.com',
        customerName: subscription.user_name || subscription.customer?.name,
        polarSubscriptionId: subscription.id,
        polarCustomerId: subscription.customer_id,
        metadata: subscription as any,
      })

      console.log('✅ Subscription transaction created:', subscription.id)
    } catch (error) {
      console.error('❌ Error creating subscription transaction:', error)
    }
  },

  onSubscriptionActive: async (subscription) => {
    console.log('✅ Subscription Active:', subscription.id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'completed',
          completedAt: new Date(),
        })
        .where(eq(transactions.polarSubscriptionId, subscription.id))
    } catch (error) {
      console.error('❌ Error activating subscription:', error)
    }
  },

  onSubscriptionCanceled: async (subscription) => {
    console.log('❌ Subscription Canceled:', subscription.id)

    try {
      await db
        .update(transactions)
        .set({
          status: 'cancelled',
          notes: 'Subscription canceled by user',
        })
        .where(eq(transactions.polarSubscriptionId, subscription.id))
    } catch (error) {
      console.error('❌ Error canceling subscription:', error)
    }
  },

  // Generic webhook handler for all events
  onPayload: async (payload) => {
    console.log('📦 Webhook received:', payload.type)
  },
})
