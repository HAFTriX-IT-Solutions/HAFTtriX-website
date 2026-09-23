import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../data/siteConfig'

const contactCards = [
  {
    icon: Phone,
    label: 'Phone',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    linkLabel: 'Call us',
    iconClass: 'text-primary',
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    linkLabel: 'Send email',
    iconClass: 'text-primary',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+94 75 784 9577',
    href: siteConfig.social.whatsapp,
    linkLabel: 'Chat now',
    iconClass: 'text-green-500',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Address',
    value: siteConfig.address,
    href: 'https://maps.google.com/?q=Nilaveli,Trincomalee,Sri+Lanka',
    linkLabel: 'View on map',
    iconClass: 'text-primary',
    external: true,
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: `Mon–Fri: ${siteConfig.hours.weekdays}\nSat: ${siteConfig.hours.saturday}\nSun: ${siteConfig.hours.sunday}`,
    href: null,
    linkLabel: null,
    iconClass: 'text-primary',
  },
]

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

            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-4">
              {contactCards.map((card, index) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white dark:bg-navy rounded-2xl p-5 shadow-lg"
                >
                  <div className="flex items-start space-x-4">
                    <card.icon className={`h-7 w-7 shrink-0 mt-0.5 ${card.iconClass}`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-text dark:text-white mb-1">{card.label}</h3>
                      <p className="text-sm text-muted-text dark:text-gray-400 whitespace-pre-line">{card.value}</p>
                      {card.href && card.linkLabel && (
                        <a
                          href={card.href}
                          {...(card.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="inline-block mt-2 text-sm font-medium text-primary hover:underline"
                        >
                          {card.linkLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
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

      {/* Google Maps Embed */}
      <section className="bg-white dark:bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-2xl overflow-hidden shadow-lg h-72 md:h-96">
            <iframe
              title="HAFTriX Location – Nilaveli, Trincomalee, Sri Lanka"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63341.24843388604!2d81.16!3d8.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afb1dfc2a81f60b%3A0x7c10c24c00c91f2d!2sNilaveli%2C%20Trincomalee%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
