import { motion } from 'framer-motion'

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {label && (
        <p className="text-primary font-semibold mb-4">{label}</p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-6">
        {title}
      </h2>
      {description && (
        <p className={`text-xl text-muted-text dark:text-gray-400 ${
          align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
