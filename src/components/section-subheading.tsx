import React, { ReactNode } from 'react'

interface ISectionSubheadingProps {
  children?: ReactNode
}

export const SectionSubheading: React.FC<ISectionSubheadingProps> = ({
  children,
}) => {
  return (
    <p className='mx-auto mt-4 max-w-2xl text-base text-balance text-gray-600 sm:text-lg dark:text-gray-400'>
      {children}
    </p>
  )
}
