import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import { Target, Eye, Heart, Shield, Users, Lightbulb } from 'lucide-react'

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We embrace new technologies and creative solutions.' },
  { icon: Shield, title: 'Integrity', description: 'We are honest, transparent and ethical in all our dealings.' },
  { icon: Target, title: 'Security', description: 'We prioritize security in everything we build.' },
  { icon: Heart, title: 'Quality', description: 'We deliver high-quality solutions that exceed expectations.' },
  { icon: Users, title: 'Customer Focus', description: 'We put our clients at the center of everything we do.' },
  { icon: Eye, title: 'Continuous Learning', description: 'We constantly update our skills and knowledge.' },
]

export default function About() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Technology Built Around{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              People and Problems
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            HAFTriX IT Solution is a technology-focused company providing software,
            web, cybersecurity, AI and digital solutions.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-navy rounded-2xl shadow-lg"
            >
              <Target className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-text dark:text-white mb-4">Our Mission</h2>
              <p className="text-muted-text dark:text-gray-400">
                To provide accessible, secure and innovative technology solutions that
                help organizations solve problems and create sustainable digital growth.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 bg-white dark:bg-navy rounded-2xl shadow-lg"
            >
              <Eye className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-text dark:text-white mb-4">Our Vision</h2>
              <p className="text-muted-text dark:text-gray-400">
                To become a trusted technology partner recognized for practical
                innovation, technical excellence and secure digital solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="OUR VALUES"
            title="What Drives Us"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-ivory dark:bg-dark-navy rounded-2xl hover:shadow-xl transition-shadow"
              >
                <value.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-text dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-text dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
