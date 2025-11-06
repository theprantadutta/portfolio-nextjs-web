import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import {
  getAllPolarOrders,
  getAllPolarSubscriptions,
} from '@/lib/payment/polar-client'

export async function GET(request: NextRequest) {
  try {
    // Verify session
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch orders and subscriptions from Polar
    const [orders, subscriptions] = await Promise.all([
      getAllPolarOrders({ limit: 1000 }),
      getAllPolarSubscriptions({ limit: 1000 }),
    ])

    // Get date for "today" calculations
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    // Combine and process transactions
    const allTransactions = [
      ...orders
        .filter((order: any) => order.createdAt || order.created_at) // Support both camelCase and snake_case
        .map((order: any) => {
          const createdAt = order.createdAt || order.created_at
          const amount = order.totalAmount || order.amount || 0
          const email = order.user_email || order.customer?.email || 'N/A'

          return {
            id: order.id,
            customerEmail: email,
            customerName: order.customer?.name || null,
            amount: amount / 100,
            currency: order.currency || 'USD',
            status: order.paid ? 'completed' : 'pending',
            createdAt: new Date(createdAt),
          }
        }),
      ...subscriptions
        .filter((sub: any) => sub.createdAt || sub.created_at) // Support both camelCase and snake_case
        .map((sub: any) => {
          const createdAt = sub.createdAt || sub.created_at
          const amount = sub.price?.priceAmount || sub.price?.price_amount || 0
          const email = sub.user_email || sub.customer?.email || 'N/A'

          return {
            id: sub.id,
            customerEmail: email,
            customerName: sub.customer?.name || null,
            amount: amount / 100,
            currency:
              sub.price?.priceCurrency || sub.price?.price_currency || 'USD',
            status: sub.status === 'active' ? 'completed' : sub.status,
            createdAt: new Date(createdAt),
          }
        }),
    ]

    // Calculate stats
    const totalRevenue = allTransactions.reduce((sum, t) => sum + t.amount, 0)
    const todayTransactions = allTransactions.filter(
      (t) => t.createdAt >= todayStart
    )
    const todayRevenue = todayTransactions.reduce((sum, t) => sum + t.amount, 0)

    // Count by status
    const statusCounts = allTransactions.reduce(
      (acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )

    // Get unique customers
    const uniqueEmails = new Set(allTransactions.map((t) => t.customerEmail))

    // Get recent transactions (last 10)
    const recentTransactions = allTransactions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map((t) => ({
        id: t.id,
        transactionId: t.id,
        customerEmail: t.customerEmail,
        customerName: t.customerName,
        amount: t.amount,
        currency: t.currency,
        status: t.status,
        createdAt: t.createdAt.toISOString(),
      }))

    const stats = {
      totalRevenue,
      todayRevenue,
      totalTransactions: allTransactions.length,
      todayTransactions: todayTransactions.length,
      pendingTransactions: statusCounts['pending'] || 0,
      completedTransactions: statusCounts['completed'] || 0,
      failedTransactions: statusCounts['failed'] || 0,
      refundedTransactions: statusCounts['refunded'] || 0,
      totalCustomers: uniqueEmails.size,
      recentTransactions,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
