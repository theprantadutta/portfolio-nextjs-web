import React, { ReactNode } from 'react'

interface ISectionHeadingProps {
  children?: ReactNode
}

export const SectionHeading: React.FC<ISectionHeadingProps> = ({
  children,
}) => {
  return (
    <h2 className='mb-8 text-center text-3xl font-medium capitalize'>
      {children}
    </h2>
  )
}
