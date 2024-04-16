import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { MyToast } from '../helpers/MyToast'
import { ThemeContext } from '../contexts/ThemeContext'
import { ToastContext } from '../contexts/ToastContext'

export default function ToastProvider({ children }: PropsWithChildren) {
  const themeContext = useContext(ThemeContext)!

  const [toast, setToast] = useState<MyToast | undefined>()

  useEffect(() => {
    const toast = new MyToast(themeContext)
    setToast(toast)
  }, [])

  return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>
}
