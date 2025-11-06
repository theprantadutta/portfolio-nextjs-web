import bcrypt from 'bcryptjs'
import { db } from '@/db'
import { adminUsers } from '@/db/schema'
import { eq } from 'drizzle-orm'

export interface LoginCredentials {
  username: string
  password: string
}

export interface AdminUser {
  id: number
  username: string
  email: string
  isActive: boolean
}

/**
 * Validate admin credentials and return user data
 */
export async function validateAdminLogin(
  credentials: LoginCredentials
): Promise<AdminUser | null> {
  try {
    // Find admin user by username
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, credentials.username))
      .limit(1)

    if (!admin) {
      console.log('Admin login failed: User not found')
      return null
    }

    // Check if account is active
    if (!admin.isActive) {
      console.log('Admin login failed: Account inactive')
      return null
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      credentials.password,
      admin.passwordHash
    )

    if (!isValidPassword) {
      console.log('Admin login failed: Invalid credentials')
      return null
    }

    // Update last login timestamp
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, admin.id))

    // Return admin data (without password hash)
    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      isActive: admin.isActive,
    }
  } catch (error) {
    console.error('Error validating admin login:', error)
    return null
  }
}

/**
 * Get admin user by ID
 */
export async function getAdminById(adminId: number): Promise<AdminUser | null> {
  try {
    const [admin] = await db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        email: adminUsers.email,
        isActive: adminUsers.isActive,
      })
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId))
      .limit(1)

    return admin || null
  } catch (error) {
    console.error('Error fetching admin by ID:', error)
    return null
  }
}
