import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Overview', path: '/' },
  { name: 'R&D Process', path: '/#lifecycle' },
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  return (
    <>
      <header className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3.5 px-4 sm:px-6 ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Primary navigation" className="site-nav liquid-glass glass-specular flex items-center justify-between rounded-2xl px-4 sm:px-5 py-3">
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 rounded-lg focus-visible:ring-2" aria-label="HAFTriX IT Solutions home">
              <span className="brand-mark relative w-9 h-9 rounded-xl overflow-hidden p-1 flex items-center justify-center bg-white/70 dark:bg-slate-800/80 border border-slate-200/50 dark:border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0">
                <img src="/logo.jpg" alt="HAFTriX IT Solutions" className="w-full h-full object-contain" />
              </span>
              <span className="flex flex-col min-w-0">
                <span className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 dark:text-white leading-tight whitespace-nowrap">HAFTriX IT Solutions</span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.22em] font-medium text-slate-500 dark:text-slate-400 uppercase mt-0.5">Research &amp; Development</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isHash = item.path.includes('#')
                const isActive = !isHash && location.pathname === item.path
                const className = `editorial-link relative px-3 py-2 rounded-lg text-[12px] font-medium transition-colors ${isActive ? 'is-active text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white'}`

                return isHash ? (
                  <a key={item.name} href={item.path} className={className}>{item.name}</a>
                ) : (
                  <Link key={item.name} to={item.path} className={className} aria-current={isActive ? 'page' : undefined}>{item.name}</Link>
                )
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <ThemeToggle />
              <Link to="/contact" className="hidden sm:inline-flex items-center gap-1.5 text-xs btn-primary" id="navbar-cta-btn">
                <span>Tell Us Your Problem</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-80" />
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="lg:hidden p-2.5 rounded-xl liquid-glass text-slate-700 dark:text-slate-200 focus-visible:ring-2"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close navigation menu"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`mobile-menu-backdrop lg:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
      />

      <aside
        id="mobile-navigation"
        className={`mobile-drawer liquid-glass glass-specular lg:hidden ${isMobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex items-center justify-between pb-5 border-b border-slate-200/60 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-lg overflow-hidden bg-white/75 p-1 flex items-center justify-center">
              <img src="/logo.jpg" alt="HAFTriX IT Solutions" className="w-full h-full object-contain" />
            </span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">HAFTriX IT Solutions</span>
          </div>
          <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white focus-visible:ring-2" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile primary navigation" className="py-5 flex-1 space-y-1.5 overflow-y-auto">
          {navItems.map((item, index) => {
            const className = 'mobile-menu-link flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-white/5 transition-colors'
            const style = { '--menu-index': index } as CSSProperties
            return item.path.includes('#') ? (
              <a key={item.name} href={item.path} className={className} style={style} tabIndex={isMobileMenuOpen ? 0 : -1}>
                <span>{item.name}</span><ArrowUpRight className="h-4 w-4 opacity-40" />
              </a>
            ) : (
              <Link key={item.name} to={item.path} className={className} style={style} tabIndex={isMobileMenuOpen ? 0 : -1}>
                <span>{item.name}</span><ArrowUpRight className="h-4 w-4 opacity-40" />
              </Link>
            )
          })}
        </nav>

        <div className="pt-4 border-t border-slate-200/60 dark:border-white/10">
          <Link to="/contact" className="btn-primary w-full justify-center" tabIndex={isMobileMenuOpen ? 0 : -1}>
            <span>Tell Us Your Problem</span><ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </>
  )
}
