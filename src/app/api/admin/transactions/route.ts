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

    const { searchParams } = request.nextUrl

    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Filters
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const minAmount = searchParams.get('minAmount')
    const maxAmount = searchParams.get('maxAmount')
    const search = searchParams.get('search') // Search by email or ID

    // Fetch orders and subscriptions from Polar
    const [orders, subscriptions] = await Promise.all([
      getAllPolarOrders({ limit: 1000 }), // Fetch more to filter client-side
      getAllPolarSubscriptions({ limit: 1000 }),
    ])

    // Combine orders and subscriptions into transactions
    const allTransactions = [
      ...orders
        .filter((order: any) => order.createdAt || order.created_at) // Support both camelCase and snake_case
        .map((order: any) => {
          const createdAt = order.createdAt || order.created_at
          const amount = order.totalAmount || order.amount || 0
          const email = order.user_email || order.customer?.email || 'N/A'

          return {
            id: order.id,
            transactionId: order.id,
            customerEmail: email,
            customerName: order.customer?.name || null,
            amount: amount / 100, // Convert cents to dollars
            currency: order.currency || 'USD',
            status: order.paid ? 'completed' : 'pending',
            paymentMethod: 'polar',
            sourceApp: null,
            polarOrderId: order.id,
            createdAt: createdAt,
            completedAt: order.paid ? createdAt : null,
            type: 'order',
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
            transactionId: sub.id,
            customerEmail: email,
            customerName: sub.customer?.name || null,
            amount: amount / 100,
            currency:
              sub.price?.priceCurrency || sub.price?.price_currency || 'USD',
            status: sub.status === 'active' ? 'completed' : sub.status,
            paymentMethod: 'polar',
            sourceApp: null,
            polarOrderId: sub.id,
            createdAt: createdAt,
            completedAt: sub.startedAt || sub.started_at || createdAt,
            type: 'subscription',
          }
        }),
    ]

    // Apply filters
    let filteredTransactions = allTransactions

    if (status) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.status === status
      )
    }

    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      filteredTransactions = filteredTransactions.filter(
        (t) => new Date(t.createdAt) >= fromDate
      )
    }

    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999)
      filteredTransactions = filteredTransactions.filter(
        (t) => new Date(t.createdAt) <= toDate
      )
    }

    if (minAmount) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount >= parseFloat(minAmount)
      )
    }

    if (maxAmount) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.amount <= parseFloat(maxAmount)
      )
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredTransactions = filteredTransactions.filter(
        (t) =>
          t.customerEmail.toLowerCase().includes(searchLower) ||
          t.transactionId.toLowerCase().includes(searchLower) ||
          t.customerName?.toLowerCase().includes(searchLower)
      )
    }

    // Sort by date (newest first)
    filteredTransactions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Pagination
    const totalCount = filteredTransactions.length
    const totalPages = Math.ceil(totalCount / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = filteredTransactions.slice(
      startIndex,
      endIndex
    )

    return NextResponse.json({
      transactions: paginatedTransactions,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
