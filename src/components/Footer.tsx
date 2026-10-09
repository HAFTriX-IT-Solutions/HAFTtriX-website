import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

const quickLinks = [
  { name: 'Overview', path: '/' },
  { name: 'R&D Process', path: '/#lifecycle' },
  { name: 'Services', path: '/services' },
  { name: 'Industry Solutions', path: '/solutions' },
  { name: 'Projects', path: '/projects' },
  { name: 'About the Studio', path: '/about' },
  { name: 'Consultation', path: '/contact' },
]

const serviceLinks = [
  { name: 'Research & Needs Analysis', path: '/services#research-analysis' },
  { name: 'Custom Software Development', path: '/services#software-development' },
  { name: 'System Architecture & UX Design', path: '/services#system-ux-design' },
  { name: 'Technical Writing & Documentation', path: '/services#technical-documentation' },
  { name: 'Training & Knowledge Transfer', path: '/services#training-transfer' },
]

export default function Footer() {
  return (
    <footer className="site-footer relative z-10 overflow-hidden border-t border-slate-200/70 dark:border-white/10 pt-16 pb-12 transition-colors">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200 dark:border-white/10">

          {/* Brand Manifesto */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-1.5 flex items-center justify-center liquid-glass">
                <img
                  src="/logo.jpg"
                  alt="HAFTriX IT Solutions"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-none">HAFTriX IT Solutions</span>
                <span className="block text-[10px] tracking-[0.2em] font-medium text-slate-500 uppercase mt-1">
                  Research &amp; Development
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed font-sans">
              An engineering and research partner guiding organizations through the entire lifecycle:
              from root problem discovery and needs analysis to architectural design, verified software engineering, and continuous technical advisory.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg liquid-glass text-xs font-mono text-slate-600 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Operating from Trincomalee, Sri Lanka · Global Engagements</span>
              </div>
            </div>
          </div>

          {/* Lifecycle & Services */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-900 dark:text-slate-200 uppercase font-mono">
              Capabilities
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-900 dark:text-slate-200 uppercase font-mono">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold tracking-widest text-slate-900 dark:text-slate-200 uppercase font-mono">
              Inquiries
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                <span>{siteConfig.phone}</span>
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp Advisory</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                <MapPin className="h-3.5 w-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} HAFTriX IT Solutions. All rights reserved. Hand-crafted systems engineering.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-800 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <a
              href={`https://${siteConfig.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              <span>{siteConfig.website}</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
