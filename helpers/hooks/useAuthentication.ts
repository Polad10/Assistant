import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const auth = getAuth()

export function useAuthentication() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? undefined)
    })

    return unsubscribe
  }, [])

  return {user}
}