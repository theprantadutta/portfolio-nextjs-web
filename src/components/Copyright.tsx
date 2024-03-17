'use client'

import React, { ReactNode } from 'react'

interface ICopyrightProps {
  children?: ReactNode
}

export const Copyright: React.FC<ICopyrightProps> = () => {
  return (
    <small className='mb-2 block text-xs'>
      &copy; {new Date().getFullYear()} Pranta Dutta. All rights reserved.
    </small>
  )
}
