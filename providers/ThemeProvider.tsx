import { ReactNode } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

interface DataProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: DataProviderProps) {
  const primary = '#fbbf24'
  const secondary = '#f43f5e'
  const accent = '#4f46e5'
  const neutral = '#130f1d'
  const base = '#1f2937'
  const info = '#d1d5db'
  const success = '#eab308'
  const warning = '#9f1239'
  const error = '#9f1239'

  return (
    <ThemeContext.Provider value={{ primary, secondary, accent, neutral, base, info, success, warning, error }}>
      {children}
    </ThemeContext.Provider>
  )
}
