import { motion } from 'framer-motion'
import Counter from './Counter'
import { stats } from '../data/stats'

export default function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-deep-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
