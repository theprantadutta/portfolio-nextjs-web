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
    const sortBy = searchParams.get('sortBy') || 'totalSpent' // totalSpent, transactionCount, recent
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    // Fetch orders and subscriptions from Polar
    const [orders, subscriptions] = await Promise.all([
      getAllPolarOrders({ limit: 1000 }),
      getAllPolarSubscriptions({ limit: 1000 }),
    ])

    // Combine transactions
    const allTransactions = [
      ...orders
        .filter((order: any) => order.createdAt || order.created_at) // Support both camelCase and snake_case
        .map((order: any) => {
          const createdAt = order.createdAt || order.created_at
          const amount = order.totalAmount || order.amount || 0
          const email = order.user_email || order.customer?.email || 'N/A'

          return {
            customerEmail: email,
            customerName: order.customer?.name || null,
            amount: amount / 100,
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
            customerEmail: email,
            customerName: sub.customer?.name || null,
            amount: amount / 100,
            status: sub.status === 'active' ? 'completed' : sub.status,
            createdAt: new Date(createdAt),
          }
        }),
    ]

    // Group by customer email
    const customerMap = new Map<string, any>()

    allTransactions.forEach((transaction) => {
      const email = transaction.customerEmail

      if (!customerMap.has(email)) {
        customerMap.set(email, {
          email,
          name: transaction.customerName,
          transactionCount: 0,
          totalSpent: 0,
          firstPurchase: transaction.createdAt,
          lastPurchase: transaction.createdAt,
          statuses: new Set<string>(),
        })
      }

      const customer = customerMap.get(email)
      customer.transactionCount++
      customer.totalSpent += transaction.amount
      customer.statuses.add(transaction.status)

      if (transaction.createdAt < customer.firstPurchase) {
        customer.firstPurchase = transaction.createdAt
      }
      if (transaction.createdAt > customer.lastPurchase) {
        customer.lastPurchase = transaction.createdAt
      }
    })

    // Convert to array and format
    let customers = Array.from(customerMap.values()).map((customer) => ({
      email: customer.email,
      name: customer.name,
      transactionCount: customer.transactionCount,
      totalSpent: customer.totalSpent,
      firstPurchase: customer.firstPurchase.toISOString(),
      lastPurchase: customer.lastPurchase.toISOString(),
      statuses: Array.from(customer.statuses),
    }))

    // Sort
    switch (sortBy) {
      case 'transactionCount':
        customers.sort((a, b) => b.transactionCount - a.transactionCount)
        break
      case 'recent':
        customers.sort(
          (a, b) =>
            new Date(b.lastPurchase).getTime() -
            new Date(a.lastPurchase).getTime()
        )
        break
      case 'totalSpent':
      default:
        customers.sort((a, b) => b.totalSpent - a.totalSpent)
        break
    }

    // Pagination
    const totalCount = customers.length
    const totalPages = Math.ceil(totalCount / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCustomers = customers.slice(startIndex, endIndex)

    return NextResponse.json({
      customers: paginatedCustomers,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore: page < totalPages,
      },
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}
