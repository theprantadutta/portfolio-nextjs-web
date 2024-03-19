import React, { ReactNode } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useFormStatus } from 'react-dom'

interface ISubmitBtnProps {
  children?: ReactNode
}

export const SubmitBtn: React.FC<ISubmitBtnProps> = () => {
  const { pending } = useFormStatus()

  return (
    <button
      type='submit'
      className='special-border group flex h-[3rem] w-[8rem] items-center justify-center gap-2 bg-gray-900 text-white outline-none transition-all hover:scale-110 hover:bg-gray-950 focus:scale-110 active:scale-105 disabled:scale-100 disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10'
      disabled={pending}
    >
      {pending ? (
        <div className='special-border h-5 w-5 animate-spin border-b-2 border-white'></div>
      ) : (
        <>
          Submit{' '}
          <FaPaperPlane className='text-xs opacity-70 transition-all group-hover:-translate-y-1 group-hover:translate-x-1' />{' '}
        </>
      )}
    </button>
  )
}
