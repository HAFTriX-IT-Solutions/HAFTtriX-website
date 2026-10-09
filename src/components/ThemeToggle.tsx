import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle relative p-2.5 rounded-xl liquid-glass transition-all duration-300 group text-slate-700 dark:text-slate-300 ${isDark ? 'is-dark' : 'is-light'}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-toggle-icons" aria-hidden="true">
        <Sun className="theme-icon-sun h-4 w-4" />
        <Moon className="theme-icon-moon h-4 w-4" />
      </span>
    </button>
  )
}
