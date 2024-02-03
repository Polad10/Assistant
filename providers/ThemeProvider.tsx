import { ReactNode } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

interface DataProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: DataProviderProps) {
  const primary = '#121212'
  const secondary = '#1a1a1a'
  const accent = '#7600eb'
  const neutral = '#faf8ff'
  const border = '#374151'
  const info = '#d3fbd8'
  const success = '#00e5b0'
  const warning = '#9f1239'
  const error = '#9f1239'

  return (
    <ThemeContext.Provider value={{ primary, secondary, accent, neutral, border, info, success, warning, error }}>
      {children}
    </ThemeContext.Provider>
  )
}
