import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

const floaters = [
  { icon: 'code', label: '</>', left: '8%', top: '8%', size: 96, duration: 34, delay: -11, depth: 0.8 },
  { icon: 'database', label: '', left: '88%', top: '13%', size: 58, duration: 25, delay: -4, depth: 0.5 },
  { icon: 'search', label: '', left: '4%', top: '31%', size: 42, duration: 21, delay: -16, depth: 1.1 },
  { icon: 'flow', label: '', left: '92%', top: '40%', size: 118, duration: 43, delay: -22, depth: 0.45 },
  { icon: 'document', label: 'requirements.md', left: '10%', top: '63%', size: 68, duration: 37, delay: -8, depth: 0.7 },
  { icon: 'api', label: '', left: '82%', top: '73%', size: 52, duration: 23, delay: -19, depth: 0.9 },
  { icon: 'chart', label: 'analysis', left: '45%', top: '88%', size: 38, duration: 19, delay: -7, depth: 1.15 },
  { icon: 'browser', label: '', left: '77%', top: '24%', size: 60, duration: 30, delay: -13, depth: 0.65 },
  { icon: 'network', label: 'prototype', left: '37%', top: '49%', size: 38, duration: 20, delay: -2, depth: 1.2 },
  { icon: 'branch', label: '', left: '65%', top: '92%', size: 82, duration: 41, delay: -28, depth: 0.4 },
  { icon: 'braces', label: 'schema', left: '57%', top: '34%', size: 98, duration: 32, delay: -17, depth: 0.6 },
  { icon: 'cloud', label: '', left: '96%', top: '61%', size: 46, duration: 22, delay: -9, depth: 1 },
  { icon: 'checklist', label: '', left: '4%', top: '91%', size: 54, duration: 27, delay: -20, depth: 0.8 },
  { icon: 'gear', label: 'deploy', left: '60%', top: '7%', size: 34, duration: 18, delay: -5, depth: 1.25 },
  { icon: 'code', label: 'API v2', left: '29%', top: '81%', size: 46, duration: 26, delay: -15, depth: 0.95 },
  { icon: 'document', label: '', left: '28%', top: '18%', size: 40, duration: 24, delay: -10, depth: 1.05 },
]

type FloaterStyle = CSSProperties & {
  '--bubble-size': string
  '--bubble-duration': string
  '--bubble-delay': string
  '--bubble-depth': number
}

export default function AmbientField() {
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const field = fieldRef.current
    if (!field) return

    const browser = navigator as Navigator & { deviceMemory?: number }
    const lowEnd = browser.hardwareConcurrency <= 4 || (browser.deviceMemory !== undefined && browser.deviceMemory <= 4)
    document.documentElement.classList.toggle('low-performance', lowEnd)

    const updateVisibility = () => field.classList.toggle('is-paused', document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    updateVisibility()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const applyParallax = () => {
      frame = 0
      const items = field.querySelectorAll<HTMLElement>('[data-depth]')
      items.forEach((item) => {
        const depth = Number(item.dataset.depth || 0)
        item.style.setProperty('--parallax-x', `${pointerX * depth}px`)
        item.style.setProperty('--parallax-y', `${pointerY * depth}px`)
      })
    }

    const handlePointer = (event: PointerEvent) => {
      pointerX = ((event.clientX / window.innerWidth) - 0.5) * -12
      pointerY = ((event.clientY / window.innerHeight) - 0.5) * -12
      if (!frame) frame = window.requestAnimationFrame(applyParallax)
    }

    const clearParallax = () => {
      pointerX = 0
      pointerY = 0
      if (!frame) frame = window.requestAnimationFrame(applyParallax)
    }

    if (!reducedMotion && finePointer && !lowEnd) {
      window.addEventListener('pointermove', handlePointer, { passive: true })
      window.addEventListener('pointerleave', clearParallax, { passive: true })
    }

    return () => {
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('pointerleave', clearParallax)
      if (frame) window.cancelAnimationFrame(frame)
      document.documentElement.classList.remove('low-performance')
    }
  }, [])

  return (
    <div ref={fieldRef} className="ambient-field" aria-hidden="true">
      <svg className="ambient-icon-sprite" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="ambient-code" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></symbol>
          <symbol id="ambient-braces" viewBox="0 0 24 24"><path d="M9 4H7a2 2 0 0 0-2 2v3a3 3 0 0 1-3 3 3 3 0 0 1 3 3v3a2 2 0 0 0 2 2h2M15 4h2a2 2 0 0 1 2 2v3a3 3 0 0 0 3 3 3 3 0 0 0-3 3v3a2 2 0 0 1-2 2h-2" /></symbol>
          <symbol id="ambient-database" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></symbol>
          <symbol id="ambient-cloud" viewBox="0 0 24 24"><path d="M7 18h11a4 4 0 0 0 .6-8A6.5 6.5 0 0 0 6 8.5 4.8 4.8 0 0 0 7 18Z" /></symbol>
          <symbol id="ambient-network" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="m10.8 7.2-4.5 8.6m6.9-8.6 4.5 8.6M7.5 18h9" /></symbol>
          <symbol id="ambient-gear" viewBox="0 0 24 24"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" /><path d="m19.2 13.7 1.4 1.1-1.5 2.6-1.7-.6a7.8 7.8 0 0 1-1.6.9l-.3 1.8h-3l-.3-1.8a7.8 7.8 0 0 1-1.6-.9l-1.7.6-1.5-2.6 1.4-1.1a7.5 7.5 0 0 1 0-1.8l-1.4-1.1 1.5-2.6 1.7.6a7.8 7.8 0 0 1 1.6-.9l.3-1.8h3l.3 1.8a7.8 7.8 0 0 1 1.6.9l1.7-.6 1.5 2.6-1.4 1.1a7.5 7.5 0 0 1 0 1.8Z" /></symbol>
          <symbol id="ambient-chart" viewBox="0 0 24 24"><path d="M4 19V5m0 14h17M8 16v-4m5 4V8m5 8v-6" /></symbol>
          <symbol id="ambient-search" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></symbol>
          <symbol id="ambient-checklist" viewBox="0 0 24 24"><path d="M9 5h11M9 12h11M9 19h11M3 5l1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2" /></symbol>
          <symbol id="ambient-flow" viewBox="0 0 24 24"><rect x="8" y="2" width="8" height="5" rx="1" /><rect x="2" y="17" width="8" height="5" rx="1" /><rect x="14" y="17" width="8" height="5" rx="1" /><path d="M12 7v5m-6 5v-3h12v3" /></symbol>
          <symbol id="ambient-document" viewBox="0 0 24 24"><path d="M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v6h6M8 13h8m-8 4h8" /></symbol>
          <symbol id="ambient-api" viewBox="0 0 24 24"><path d="M4 7h15l-3-3m3 3-3 3M20 17H5l3 3m-3-3 3-3" /></symbol>
          <symbol id="ambient-branch" viewBox="0 0 24 24"><circle cx="6" cy="4" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M6 6v12m0-6a6 6 0 0 0 6 6h4m-10-6a6 6 0 0 1 6-6h4" /></symbol>
          <symbol id="ambient-browser" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 8h20M6 5.5h.01M9 5.5h.01m3 .01h.01" /></symbol>
        </defs>
        <filter id="liquid-refract" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="1" seed="8" result="texture" />
          <feDisplacementMap in="SourceGraphic" in2="texture" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {floaters.map((item, index) => {
        const style: FloaterStyle = {
          left: item.left,
          top: item.top,
          '--bubble-size': `${item.size}px`,
          '--bubble-duration': `${item.duration}s`,
          '--bubble-delay': `${item.delay}s`,
          '--bubble-depth': item.depth,
        }

        return (
          <span
            className="ambient-bubble"
            data-depth={index < 5 ? item.depth : undefined}
            key={`${item.icon}-${index}`}
            style={style}
          >
            <svg className="ambient-bubble-icon" viewBox="0 0 24 24" focusable="false">
              <use href={`#ambient-${item.icon}`} />
            </svg>
            {item.label && <span className="ambient-bubble-label">{item.label}</span>}
          </span>
        )
      })}
    </div>
  )
}
