import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    window.scrollTo({ top: 0, behavior })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="scroll-top-button fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-50 p-3.5 rounded-2xl liquid-glass glass-specular"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-slate-800 dark:text-slate-100" />
    </button>
  )
}
