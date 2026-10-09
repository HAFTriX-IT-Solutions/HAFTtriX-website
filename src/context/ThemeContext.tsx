import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function readInitialTheme(): boolean {
  if (typeof document !== 'undefined') {
    return document.documentElement.dataset.theme !== 'light'
  }

  return true
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(readInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    const theme = isDark ? 'dark' : 'light'
    root.dataset.theme = theme
    root.classList.toggle('dark', isDark)
    root.style.colorScheme = theme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (themeColor) themeColor.content = isDark ? '#0b1220' : '#dce5ee'

    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // Keep the selected theme for this session when storage is unavailable.
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)
  const setTheme = (theme: 'light' | 'dark') => setIsDark(theme === 'dark')

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
