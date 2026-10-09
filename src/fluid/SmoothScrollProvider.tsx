import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

/**
 * Mounted once at the app root so the scroll feel is identical on every route
 * and the Lenis instance survives navigation (no re-init flicker).
 *
 * Under `prefers-reduced-motion: reduce` we skip Lenis entirely and let the
 * browser handle native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      smoothWheel: true,
      autoRaf: false,
      anchors: true,
    })

    let rafId = requestAnimationFrame(function raf(time: number) {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    })

    setLenis(instance)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Access the shared Lenis instance (null when smooth scroll is disabled). */
export function useLenis() {
  return useContext(LenisContext)
}
