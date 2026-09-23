import { ComponentType } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative p-8 rounded-2xl bg-white dark:bg-navy border border-gray-200 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-deep-blue flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-text dark:text-white mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-muted-text dark:text-gray-400 mb-6">
          {description}
        </p>

        <Link
          to="/services"
          className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
