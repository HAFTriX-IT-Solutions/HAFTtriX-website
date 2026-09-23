import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface CounterProps {
  value: number
  suffix?: string
  duration?: number
}

export default function Counter({ value, suffix = '', duration = 2000 }: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / duration
        
        if (progress < 1) {
          setCount(Math.floor(value * progress))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}