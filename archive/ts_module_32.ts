import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../data/siteConfig'

export default function Contact() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark-navy via-navy to-deep-blue py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Useful
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Have a project, business problem or technology idea? Send us the details.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-ivory dark:bg-dark-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg"
              >
                <Phone className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-text dark:text-white mb-2">Phone</h3>
                <p className="text-muted-text dark:text-gray-400">{siteConfig.phone}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg"
              >
                <Mail className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-text dark:text-white mb-2">Email</h3>
                <p className="text-muted-text dark:text-gray-400">{siteConfig.email}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg"
              >
                <MapPin className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-text dark:text-white mb-2">Address</h3>
                <p className="text-muted-text dark:text-gray-400">{siteConfig.address}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-navy rounded-2xl p-6 shadow-lg"
              >
                <Clock className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-text dark:text-white mb-2">Working Hours</h3>
                <p className="text-muted-text dark:text-gray-400">Monday - Saturday</p>
                <p className="text-muted-text dark:text-gray-400">9:00 AM - 6:00 PM</p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white dark:bg-navy rounded-2xl p-8 shadow-lg"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}