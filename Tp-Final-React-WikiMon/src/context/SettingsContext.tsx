import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeProps { 
    Theme: boolean
    ChangeTheme: () => void
}

export const ThemeContext = createContext<ThemeProps | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
    
  const [Theme, setTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? JSON.parse(savedTheme) : false 
  })

  
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(Theme))
  }, [Theme])

  const ChangeTheme = () => setTheme(!Theme)

  return (
    <ThemeContext.Provider value={{ Theme, ChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme debe usarse dentro de un ThemeContext.Provider')
    }
    return context
}