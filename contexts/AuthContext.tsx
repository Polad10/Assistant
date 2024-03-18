import { User } from 'firebase/auth'
import { createContext } from 'react'

export interface AuthContextType {
  user: User | undefined
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
