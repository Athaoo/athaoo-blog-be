import React, { createContext, useContext, useState } from 'react'

interface ThemeContextValue {
  isDark: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleTheme: () => {
    null
  },
})

export const useTheme = () => {
  return useContext(ThemeContext)
}

type ThemeProviderProps = {
  children: React.ReactNode
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setDarkTheme] = useState(false)

  const toggleTheme = () => {
    setDarkTheme(!isDark)
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
