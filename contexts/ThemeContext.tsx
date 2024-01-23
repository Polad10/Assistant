import { createContext } from 'react'

export interface ThemeContextType {
  primary: string
  secondary: string
  accent: string
  neutral: string
  border: string
  info: string
  success: string
  warning: string
  error: string
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
