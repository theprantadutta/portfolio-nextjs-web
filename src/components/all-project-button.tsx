import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { BsArrowRight } from 'react-icons/bs'

interface IAllProjectButton {
  children?: ReactNode
}

export const AllProjectButton = () => {
  const router = useRouter()
  return (
    <div className='flex justify-center'>
      <button
        onClick={() => router.push('/projects')}
        type='button'
        className='btn-primary special-border group relative mt-10 overflow-hidden px-8 py-4'
      >
        <span className='relative z-10 flex items-center gap-2'>
          All Projects
          <BsArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
        </span>

        {/* Animated background */}
        <div className='animate-gradient absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      </button>
    </div>
  )
}
