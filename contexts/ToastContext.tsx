import { createContext } from 'react'
import { MyToast } from '../helpers/MyToast'

export interface ToastContextType {
  toast: MyToast | undefined
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined)
