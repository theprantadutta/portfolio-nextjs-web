import React, { ReactNode } from 'react'

interface ISectionDividerProps {
  children?: ReactNode
}

export const SectionDivider: React.FC<ISectionDividerProps> = () => {
  return (
    <div className='reveal my-[clamp(1.5rem,4vh,3rem)] hidden sm:block'>
      <div className='flex justify-center'>
        <div className='from-primary-500 via-secondary-500 to-accent-500 h-16 w-1 rounded-full bg-linear-to-b opacity-60 shadow-lg' />
      </div>
    </div>
  )
}
