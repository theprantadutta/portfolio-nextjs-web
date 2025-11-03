'use client'

import dynamic from 'next/dynamic'

const ThemeSwitchInternal = dynamic(
  () => import('@/components/theme-switch').then((mod) => mod.ThemeSwitch),
  {
    ssr: false,
    loading: () => null,
  }
)

export const ThemeSwitchLazy = () => {
  return <ThemeSwitchInternal />
}
