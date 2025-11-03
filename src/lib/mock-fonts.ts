import type {
  Inter as GoogleInter,
  Playfair_Display as GooglePlayfair,
  JetBrains_Mono as GoogleJetBrains,
} from 'next/font/google'

const defaultStyle = (variable?: string) =>
  variable ? { fontFamily: `var(${variable})` } : { fontFamily: 'inherit' }

type InterOptions = Parameters<typeof GoogleInter>[0]
type PlayfairOptions = Parameters<typeof GooglePlayfair>[0]
type JetBrainsOptions = Parameters<typeof GoogleJetBrains>[0]

type InterReturn = ReturnType<typeof GoogleInter>
type PlayfairReturn = ReturnType<typeof GooglePlayfair>
type JetBrainsReturn = ReturnType<typeof GoogleJetBrains>

export const Inter = (options?: InterOptions): InterReturn => {
  const variable = options?.variable ?? ''
  return {
    className: '',
    variable,
    style: defaultStyle(variable),
  } as InterReturn
}

export const Playfair_Display = (options?: PlayfairOptions): PlayfairReturn => {
  const variable = options?.variable ?? ''
  return {
    className: '',
    variable,
    style: defaultStyle(variable),
  } as PlayfairReturn
}

export const JetBrains_Mono = (options?: JetBrainsOptions): JetBrainsReturn => {
  const variable = options?.variable ?? ''
  return {
    className: '',
    variable,
    style: defaultStyle(variable),
  } as JetBrainsReturn
}
