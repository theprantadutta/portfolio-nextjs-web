import React, { ReactNode } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'
import { useFormStatus } from 'react-dom'

interface ISubmitBtnProps {
  children?: ReactNode
}

export const SubmitBtn: React.FC<ISubmitBtnProps> = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='btn-primary special-border group relative overflow-hidden px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-65'
      disabled={pending}
    >
      <span className='relative z-10 flex items-center gap-2'>
        {pending ? (
          <>
            Sending...
            <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
          </>
        ) : (
          <>
            Submit
            <FaPaperPlane className='transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1' />
          </>
        )}
      </span>

      {/* Animated background */}
      {!pending && (
        <div className='animate-gradient absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
      )}
    </button>
  )
}
