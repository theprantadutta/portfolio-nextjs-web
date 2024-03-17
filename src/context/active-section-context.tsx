'use client'

import type { ISectionName } from '@/lib/types'
import React, { createContext, useContext, useState } from 'react'

interface IActiveSectionContextProviderProps {
  children: React.ReactNode
}

interface IActiveSectionContextType {
  activeSection: ISectionName
  setActiveSection: React.Dispatch<React.SetStateAction<ISectionName>>
  timeOfLastClick: number
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>
}

export const ActiveSectionContext =
  createContext<IActiveSectionContextType | null>(null)

export const ActiveSectionContextProvider: React.FC<
  IActiveSectionContextProviderProps
> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ISectionName>('Home')
  const [timeOfLastClick, setTimeOfLastClick] = useState(0) // we need to keep track of this to disable the observer temporarily when user clicks on a link

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  )
}

export const useActiveSectionContext = () => {
  const context = useContext(ActiveSectionContext)

  if (context === null) {
    throw new Error(
      'useActiveSectionContext must be used within an ActiveSectionContextProvider'
    )
  }

  return context
}
