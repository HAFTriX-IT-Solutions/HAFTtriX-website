import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, transition: { duration: 0.3 } } : undefined}
      className={`bg-white dark:bg-navy rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  )
}
