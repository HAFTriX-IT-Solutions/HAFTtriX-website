import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { siteConfig } from '../data/siteConfig'

const contactChannels = [
  {
    icon: Mail,
    label: 'Written Inquiry & Problem Briefs',
    value: siteConfig.email,
    action: `mailto:${siteConfig.email}`,
    actionLabel: 'Send Direct Email',
    note: 'Monitored daily by our lead systems engineer'
  },
  {
    icon: Phone,
    label: 'Telephone & Discovery Scheduling',
    value: `${siteConfig.phone} / ${siteConfig.phoneSecondary}`,
    action: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
    actionLabel: 'Call Lead Engineer',
    note: 'Weekdays 09:00 – 18:00 (GMT+5:30)'
  },
  {
    icon: MessageCircle,
    label: 'Direct WhatsApp Technical Channel',
    value: '+94 75 784 9577',
    action: siteConfig.social.whatsapp,
    actionLabel: 'Start WhatsApp Dialogue',
    note: 'Ideal for initial quick inquiries and scheduling'
  },
  {
    icon: MapPin,
    label: 'R&D Studio Location',
    value: siteConfig.address,
    action: 'https://maps.google.com/?q=Nilaveli,Trincomalee,Sri+Lanka',
    actionLabel: 'View Studio on Map',
    note: 'Eastern Province, Sri Lanka'
  }
]

export default function Contact() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ Discovery &amp; Consultation ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              Tell us your problem.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Every meaningful software system starts by defining the exact challenge.
              Share the operational bottlenecks, data inconsistencies, or architectural goals your team is confronting. We will examine it from an engineering standpoint.
            </p>
          </div>
        </div>
      </section>

      {/* Form and Contact Channels */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left Column: Problem Brief Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="liquid-glass glass-specular rounded-3xl p-8 sm:p-10">
                <div className="mb-6 pb-4 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Problem Intake Matrix
                  </span>
                  <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                    Submit Your Operational Challenge
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Right Column: Channels & Office Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">

              <div className="space-y-4">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <div
                      key={channel.label}
                      className="liquid-glass glass-specular rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl liquid-glass flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                            {channel.label}
                          </span>
                          <div className="text-sm font-medium text-slate-900 dark:text-white break-words mb-1">
                            {channel.value}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                            {channel.note}
                          </p>
                          <a
                            href={channel.action}
                            target={channel.action.startsWith('http') ? '_blank' : undefined}
                            rel={channel.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            <span>{channel.actionLabel}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Working Hours Card */}
              <div className="liquid-glass glass-specular rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-medium text-sm">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Consultation Hours</span>
                </div>
                <div className="text-xs font-mono space-y-1.5 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Monday – Friday:</span>
                    <span className="text-slate-900 dark:text-white">{siteConfig.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-slate-900 dark:text-white">{siteConfig.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-slate-400">{siteConfig.hours.sunday}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-3xl overflow-hidden p-2 md:p-3">
            <div className="rounded-2xl overflow-hidden h-72 md:h-96 w-full">
              <iframe
                title="HAFTriX IT Solutions location – Nilaveli, Trincomalee, Sri Lanka"
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
        </div>
      </section>
    </div>
  )
}
