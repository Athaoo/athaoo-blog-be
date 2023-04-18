import React, { createContext, useContext, useState } from 'react'

type auth = {
  user: string
  login: (token: string) => void
  logout: () => void
}
const AuthContext = createContext({
  user: '',
  login: () => {},
  logout: () => {},
} as auth)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState('')

  const login = (token: string) => {
    localStorage.setItem('authToken', token)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser('')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
