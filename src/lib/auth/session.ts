import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

// Validate JWT secret
if (!process.env.JWT_SECRET) {
  console.error(
    '⚠️  SECURITY WARNING: JWT_SECRET environment variable is not set!'
  )
  console.error('⚠️  Using fallback secret - this is INSECURE for production!')
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key-change-this-immediately'
)
const SESSION_COOKIE_NAME = 'admin_session'
const SESSION_DURATION = 7 * 24 * 60 * 60 // 7 days in seconds

export interface SessionData {
  adminId: number
  username: string
  email: string
}

export interface SessionPayload extends SessionData {
  iat: number
  exp: number
}

/**
 * Create a new session token (Edge-compatible)
 */
export async function createSession(data: SessionData): Promise<string> {
  const token = await new SignJWT({
    adminId: data.adminId,
    username: data.username,
    email: data.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET)

  return token
}

/**
 * Verify and decode a session token (Edge-compatible)
 */
export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as SessionPayload
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

/**
 * Get current session from cookies (server-side)
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie?.value) {
    return null
  }

  return verifySession(sessionCookie.value)
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  const isProduction = process.env.NODE_ENV === 'production'

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: SESSION_DURATION,
    path: '/',
  })
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}
