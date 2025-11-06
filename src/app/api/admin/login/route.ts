import { NextRequest, NextResponse } from 'next/server'
import { validateAdminLogin } from '@/lib/auth/admin-auth'
import { createSession, setSessionCookie } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Validate input types and lengths (prevent abuse)
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input format' },
        { status: 400 }
      )
    }

    if (username.length > 100 || password.length > 100) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    // Validate credentials
    const admin = await validateAdminLogin({ username, password })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    // Create session token (now async)
    const token = await createSession({
      adminId: admin.id,
      username: admin.username,
      email: admin.email,
    })

    // Set session cookie
    await setSessionCookie(token)

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
