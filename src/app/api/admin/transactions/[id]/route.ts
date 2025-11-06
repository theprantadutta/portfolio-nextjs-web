import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { db } from '@/db'
import { transactions } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify session
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const transactionId = parseInt(id)

    if (isNaN(transactionId)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID' },
        { status: 400 }
      )
    }

    // Get transaction
    const [transaction] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, transactionId))
      .limit(1)

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: transaction.id,
      transactionId: transaction.transactionId,
      productId: transaction.productId,
      customerEmail: transaction.customerEmail,
      customerName: transaction.customerName,
      customerMetadata: transaction.customerMetadata,
      amount: parseFloat(transaction.amount),
      currency: transaction.currency,
      status: transaction.status,
      paymentMethod: transaction.paymentMethod,
      polarOrderId: transaction.polarOrderId,
      polarCheckoutId: transaction.polarCheckoutId,
      polarCustomerId: transaction.polarCustomerId,
      polarSubscriptionId: transaction.polarSubscriptionId,
      refundId: transaction.refundId,
      refundReason: transaction.refundReason,
      refundedAt: transaction.refundedAt?.toISOString() || null,
      notes: transaction.notes,
      sourceApp: transaction.sourceApp,
      ipAddress: transaction.ipAddress,
      userAgent: transaction.userAgent,
      metadata: transaction.metadata,
      createdAt: transaction.createdAt.toISOString(),
      completedAt: transaction.completedAt?.toISOString() || null,
      updatedAt: transaction.updatedAt.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching transaction:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transaction' },
      { status: 500 }
    )
  }
}
