import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Shield, ChevronRight } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Projects', path: '/projects' },
  { name: 'Cybersecurity', path: '/cybersecurity' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-dark-navy/90 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Shield className="h-10 w-10 text-primary group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-deep-blue bg-clip-text text-transparent">
                  HAFTriX
                </div>
                <div className="text-xs text-muted-text dark:text-gray-400 tracking-widest">
                  IT SOLUTION
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-text dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <Link
                to="/contact"
                className="hidden lg:inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
              >
                <span>Start a Project</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-text dark:text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-text dark:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white dark:bg-dark-navy shadow-2xl lg:hidden"
          >
            <div className="pt-24 pb-8 px-6 h-full overflow-y-auto">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                        location.pathname === item.path
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg font-medium">{item.name}</span>
                      <ChevronRight className="h-5 w-5 opacity-50" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <Link
                to="/contact"
                className="mt-8 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <span>Start a Project</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}