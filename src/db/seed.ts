import 'dotenv/config'
import { db, adminUsers } from './index'
import bcrypt from 'bcryptjs'

async function seed() {
  console.log('🌱 Starting database seed...')

  // Read admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword =
    process.env.ADMIN_PASSWORD || 'FuckThatArtemisFowlMovie@007'
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@pranta.dev'

  if (!process.env.ADMIN_PASSWORD) {
    console.warn('⚠️  ADMIN_PASSWORD not set in environment, using default')
  }

  try {
    // 1. Create default admin user
    console.log('Creating admin user...')
    const passwordHash = await bcrypt.hash(adminPassword, 10)

    await db.insert(adminUsers).values({
      username: adminUsername,
      email: adminEmail,
      passwordHash,
      isActive: true,
    })
    console.log(`✅ Admin user created successfully`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('\n📝 Admin account created:')
    console.log(`   Username: ${adminUsername}`)
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: Check your environment variables\n`)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  }

  process.exit(0)
}

seed()
