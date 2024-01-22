import { createContext } from 'react'

interface ThemeContextType {
  primary: string
  secondary: string
  accent: string
  neutral: string
  base: string
  info: string
  success: string
  warning: string
  error: string
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
