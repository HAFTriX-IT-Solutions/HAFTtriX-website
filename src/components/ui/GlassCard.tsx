import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}
