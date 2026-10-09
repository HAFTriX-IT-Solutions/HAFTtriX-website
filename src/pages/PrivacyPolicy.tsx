import type { CSSProperties } from 'react'
import { siteConfig } from '../data/siteConfig'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us when submitting a problem brief or inquiry, including your name, email address, phone number, and organizational context. We may also collect standard technical telemetry such as IP address and browser type through privacy-respecting analytics.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use this information exclusively to review your requirements, prepare discovery consultations, and provide engineering proposals. We do not sell, rent, or share personal or proprietary client information with third parties for advertising or commercial marketing.`,
  },
  {
    title: '3. Data Protection & Hygiene',
    content: `We maintain strict administrative and technical measures to protect submitted problem briefs and client communications against unauthorized access. Client specifications and code repositories remain subject to strict non-disclosure obligations.`,
  },
  {
    title: '4. Cookies',
    content: `Our website minimizes cookie usage. We only use functional session tokens and essential preference cookies (such as light/dark mode choice).`,
  },
  {
    title: '5. Third-Party Services',
    content: `Our website may provide links to public project references or maps. We are not responsible for the privacy practices of external websites.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain client inquiry records for as long as required to maintain project correspondence or fulfill contractual obligations, after which records are archived or deleted.`,
  },
  {
    title: '7. Your Rights',
    content: `You maintain the right to inspect, correct, or request deletion of any personal data submitted to us. To exercise these rights, email us at ${siteConfig.email}.`,
  },
  {
    title: '8. Contact Information',
    content: `For privacy-related inquiries:\n\nEmail: ${siteConfig.email}\nPhone: ${siteConfig.phone}\nStudio: ${siteConfig.address}`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-20 border-b border-slate-200/60 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="editorial-pill font-mono mb-4 inline-block">
            Legal &amp; Data Hygiene
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm font-mono text-slate-500">
            Effective Date: September 2026 · HAFTriX IT Solutions
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-3xl p-8 sm:p-12 space-y-8">
            <p className="text-base text-slate-700 dark:text-slate-300 font-sans leading-relaxed pb-6 border-b border-slate-200/60 dark:border-white/10">
              {siteConfig.companyName} ("we", "our", or "us") respects your privacy and proprietary information.
              This document clarifies how we handle inquiries, technical briefs, and communication data.
            </p>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={section.title}
                  data-animate="fade-up"
                  style={{ '--reveal-index': index % 7 } as CSSProperties}
                  className="space-y-2"
                >
                  <h2 className="text-lg font-serif font-medium text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
