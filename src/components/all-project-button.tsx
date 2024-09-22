import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface IAllProjectButton {
  children?: ReactNode
}

export const AllProjectButton = () => {
  const router = useRouter()
  return (
    <div className='flex justify-center'>
      <button
        onClick={() => router.push('/projects')}
        type='submit'
        className='special-border group mt-10 flex h-[3rem] w-[8rem] items-center justify-center gap-2 bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10'
      >
        All Projects
      </button>
    </div>
  )
}
