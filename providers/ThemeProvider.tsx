import { ReactNode } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

interface DataProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: DataProviderProps) {
  const primary = '#121212'
  const secondary = '#1a1a1a'
  const accent = '#8d1aff'
  const neutral = '#faf8ff'
  const border = '#374151'
  const info = '#d3fbd8'
  const success = '#27ae60'
  const warning = '#ff661a'
  const error = '#e83163'
  const defaultStatus = '#0098e6'

  return (
    <ThemeContext.Provider
      value={{ primary, secondary, accent, neutral, border, info, success, warning, error, defaultStatus }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
