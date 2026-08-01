import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

export const AllProjectButton = () => {
  return (
    <div className='flex justify-center'>
      <Link
        href='/projects'
        className='btn-primary special-border group relative mt-5 inline-block overflow-hidden px-5 py-2.5'
      >
        <span className='relative z-10 flex items-center gap-2'>
          All Projects
          <BsArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
        </span>

        {/* Animated background */}
        <div className='animate-gradient from-primary-600 via-secondary-600 to-primary-600 absolute inset-0 bg-linear-to-r bg-size-[200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      </Link>
    </div>
  )
}
