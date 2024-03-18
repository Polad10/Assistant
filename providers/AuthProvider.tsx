import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const auth = getAuth()

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? undefined)
    })

    return unsubscribe
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}
