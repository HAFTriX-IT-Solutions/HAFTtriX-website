import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="py-20 bg-ivory dark:bg-dark-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue rounded-3xl p-12 md:p-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Have an Idea? Let's Build It.
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Tell us what you are trying to achieve and we will help turn the idea
              into a practical digital solution.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent to-primary text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-105"
            >
              <span>Talk to HAFTriX</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
