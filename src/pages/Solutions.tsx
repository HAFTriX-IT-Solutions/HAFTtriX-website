import type { CSSProperties } from 'react'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'
import { industries } from '../data/industries'

export default function Solutions() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ Industry Solutions ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              Software engineered around operational realities.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Every industry operates under specific constraints: offline latency in remote logistics, high peak-season booking concurrency in hospitality, or strict verification audit trails in clinical diagnostics. We engineer software tailored to these exact conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Solutions Bento Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind, index) => (
              <article
                key={ind.name}
                data-animate="fade-up"
                style={{ '--reveal-index': index % 7 } as CSSProperties}
                className="liquid-glass glass-specular rounded-3xl p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest font-semibold">
                      Sector Framework 0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-6">
                    {ind.name}
                  </h2>

                  <div className="space-y-3 mb-8">
                    {ind.solutions.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 font-sans"
                      >
                        <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Discuss {ind.name} Challenges</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
