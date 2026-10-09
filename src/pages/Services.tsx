import type { CSSProperties } from 'react'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

export default function Services() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ Capabilities &amp; Services ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              From problem diagnosis to production software.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              We provide five specialized disciplines across the technical lifecycle. Whether engaging for a standalone needs assessment or an end-to-end custom software build, every service is anchored in rigorous engineering standards and concrete deliverables.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Breakdown */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article
                key={service.name}
                id={service.id}
                data-animate="fade-up"
                style={{ '--reveal-index': index % 7 } as CSSProperties}
                className="liquid-glass glass-specular rounded-3xl p-8 md:p-12 scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* Left Column: Metadata & Title */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl liquid-glass flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-slate-400">
                        Pillar 0{index + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white leading-snug">
                      {service.name}
                    </h2>

                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400 font-sans">
                      {service.tagline}
                    </p>

                    {/* Concrete Deliverables Pill Box */}
                    <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                        Direct Deliverables You Receive:
                      </span>
                      <div className="space-y-1.5">
                        {service.deliverables.map((deliv) => (
                          <div
                            key={deliv}
                            className="text-xs font-mono py-1 px-2.5 rounded bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-white/5"
                          >
                            ✓ {deliv}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Detailed Scope Checklist */}
                  <div className="lg:col-span-8 lg:pl-8 lg:border-l border-slate-200/60 dark:border-white/10 space-y-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                      Scope of Work &amp; Technical Execution
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 p-3.5 rounded-xl liquid-glass text-sm text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Initiate a Problem Brief in {service.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                </div>
              </article>
            )
          })}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
