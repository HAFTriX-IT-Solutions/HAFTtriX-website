import { motion } from 'framer-motion'
import CTASection from '../components/CTASection'
import { services } from '../data/services'

export default function Services() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Our Technology Services
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-navy rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-deep-blue flex items-center justify-center shrink-0">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text dark:text-white mb-4">
                      {service.name}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-center text-muted-text dark:text-gray-400">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
