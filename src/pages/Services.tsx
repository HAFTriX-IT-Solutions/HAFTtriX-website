import type { CSSProperties } from 'react'
import { CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import { services } from '../data/services'

export default function Services() {
  return (
    <div className="relative pt-24 md:pt-32">
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-[32px] p-8 sm:p-10 lg:p-12 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-blue-500/10 via-transparent to-indigo-500/10 blur-2xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10 items-end">
              <div className="max-w-3xl">
                <span className="editorial-pill font-mono mb-4 inline-block">
                  [ Capabilities &amp; Services ]
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-slate-900 dark:text-white mb-5 leading-[0.95]">
                  From problem diagnosis to production software.
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  We provide five specialized disciplines across the technical lifecycle. Whether you need a focused discovery sprint or a full custom build, every engagement is grounded in research, deliberate design, and measurable delivery.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['5 disciplines', 'Specialized service lines'],
                  ['Research-led', 'Design before build'],
                  ['Production-ready', 'Scalable outcomes'],
                  ['Client-first', 'Clear deliverables']
                ].map(([label, detail]) => (
                  <div key={label} className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/45 dark:bg-white/5 p-4">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 mb-2">{label}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-200">{detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <article
                key={service.name}
                id={service.id}
                data-animate="fade-up"
                style={{ '--reveal-index': index % 7 } as CSSProperties}
                className="liquid-glass glass-specular rounded-[30px] p-6 md:p-8 lg:p-10 scroll-mt-28 relative overflow-hidden"
              >
                <div className="absolute inset-x-8 top-0 h-20 bg-gradient-to-r from-blue-500/10 via-cyan-500/8 to-transparent blur-2xl" />

                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/14 to-cyan-500/10 text-blue-600 dark:text-blue-300 flex items-center justify-center border border-blue-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-slate-400">
                        Pillar 0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white leading-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 text-sm font-medium text-blue-700 dark:text-blue-300">
                        {service.tagline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/70 dark:border-white/10 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 block">
                        Deliverables
                      </span>
                      <div className="space-y-2">
                        {service.deliverables.map((deliv) => (
                          <div
                            key={deliv}
                            className="text-xs font-mono py-2 px-3 rounded-xl bg-slate-100/80 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/10"
                          >
                            ✓ {deliv}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 lg:pl-8 lg:border-l border-slate-200/70 dark:border-white/10 space-y-6">
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.24em] text-slate-400">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" />
                      Scope of work
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.details.map((detail) => (
                        <div
                          key={detail}
                          className="flex items-start gap-3 p-4 rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/35 dark:bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                        >
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-300 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:text-blue-500 transition-colors"
                      >
                        <span>Initiate a problem brief in {service.name}</span>
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
