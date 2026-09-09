import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface SettingsProps {
  Theme: boolean
  ChangeTheme: () => void
  IsAuthenticated: boolean
  Logout: () => void
}

export const SettingsContext = createContext<SettingsProps | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
 
  const [Theme, setTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? JSON.parse(savedTheme) : false
  })

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(Theme))
  }, [Theme])

  const ChangeTheme = () => setTheme(!Theme)

  
  const [IsAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
   
    return !!localStorage.getItem('user_token') 
  })

  
  const Logout = () => {
    localStorage.removeItem('user_token') 
    setIsAuthenticated(false)             
    window.location.href = '../pages/Login'       
  }

  return (
    <SettingsContext.Provider value={{ Theme, ChangeTheme, IsAuthenticated, Logout }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings debe usarse dentro de un SettingsContext.Provider')
  }
  return context
}

