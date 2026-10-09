import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function Counter({ value, suffix = '', duration = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0
    const startCount = () => {
      if (started.current) return
      started.current = true

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value)
        return
      }

      let startTime: number | undefined
      const animate = (timestamp: number) => {
        if (startTime === undefined) startTime = timestamp
        const progress = Math.min(1, (timestamp - startTime) / duration)
        setCount(Math.floor(value * progress))
        if (progress < 1) frame = window.requestAnimationFrame(animate)
        else setCount(value)
      }
      frame = window.requestAnimationFrame(animate)
    }

    element.addEventListener('site:reveal', startCount)
    if (element.classList.contains('is-visible')) startCount()

    return () => {
      element.removeEventListener('site:reveal', startCount)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [duration, value])

  return <span ref={ref} data-animate="fade-in" data-count-up>{count}{suffix}</span>
}
