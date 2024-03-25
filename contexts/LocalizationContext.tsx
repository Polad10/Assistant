import { createContext } from 'react'
import { Translator } from '../helpers/Translator'

export interface LocalizationContextType {
  translator: Translator
  language: string
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined)
