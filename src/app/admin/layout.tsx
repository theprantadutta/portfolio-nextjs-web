import { Sidebar } from '@/components/admin/Sidebar'

export const metadata = {
  title: 'Admin Panel - Payment Gateway',
  description: 'Admin dashboard for managing payments and transactions',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950'>
      {/* Background Effects */}
      <div className='pointer-events-none fixed inset-0 -z-10 hidden lg:block'>
        <div className='absolute right-[10rem] top-[-4rem] h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-blue-400/15 via-purple-400/15 to-cyan-400/15 opacity-75 blur-2xl' />
        <div className='absolute left-[-15rem] top-[6rem] h-[30rem] w-[38rem] rounded-full bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 opacity-70 blur-2xl' />
        <div className='absolute bottom-[8rem] right-[-8rem] h-[18rem] w-[28rem] rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 opacity-60 blur-xl' />
      </div>

      <Sidebar />

      <main className='flex-1 overflow-y-auto'>
        <div className='mx-auto max-w-7xl p-8'>{children}</div>
      </main>
    </div>
  )
}
