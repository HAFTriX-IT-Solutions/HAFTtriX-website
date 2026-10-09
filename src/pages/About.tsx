import type { CSSProperties } from 'react'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import {
  Compass,
  FileCheck2,
  Users2,
  BookOpenCheck,
  Code2,
  Layers,
  GraduationCap
} from 'lucide-react'

const principles = [
  {
    icon: Compass,
    title: 'Problem Diagnosis Over Speculation',
    description: 'Projects begin with discovery and stakeholder interviews to identify the operational problem before a technical approach is chosen.'
  },
  {
    icon: FileCheck2,
    title: 'Requirements as First-Class Artifacts',
    description: 'Clear, unambiguous specifications prevent scope creep and align executive intent with technical reality before development commences.'
  },
  {
    icon: BookOpenCheck,
    title: 'Empirical Feasibility',
    description: 'We prototype to compare architecture options and technology choices against the constraints the team faces.'
  },
  {
    icon: Code2,
    title: 'Modular Systems Engineering',
    description: 'We deliver versioned components, explicit interfaces, and tests tied to the agreed requirements.'
  },
  {
    icon: Users2,
    title: 'Stakeholder-Centered Alignment',
    description: 'We test proposed workflows with the people who will use the system in their daily work.'
  },
  {
    icon: GraduationCap,
    title: 'Knowledge Transfer & Institutional Independence',
    description: 'We document the architecture, APIs, and operating workflows so your team can maintain and extend the system independently.'
  }
]

export default function About() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ About the Studio ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              An engineering partner built on research, rigor, and clarity.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              HAFTriX IT Solutions is a research and development partner for institutions, enterprises, and growing
              businesses. Based in Trincomalee, Sri Lanka, we work with teams locally and across other regions.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section: What Makes Us Different */}
      <section className="py-16 md:py-20 border-y border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white leading-snug">
                How research shapes delivery.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              <p>
                A feature request is one useful signal about a larger workflow. We start by mapping how the work happens now, where it slows down, and which people and constraints shape it.
              </p>
              <p>
                HAFTriX IT Solutions turns that discovery into a needs analysis, an agreed requirements specification, and a design the team can review. Development follows when the problem and the proposed system are clear.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="[ Engineering Principles ]"
            title="How We Approach Every Problem"
            description="Our standards for requirements clarity, empirical research, and software craftsmanship."
          />

          <div className="principles-ledger liquid-glass glass-specular rounded-3xl overflow-hidden">
            {principles.map((item, index) => {
              const Icon = item.icon
              return (
                <article
                  key={item.title}
                  data-animate="fade-up"
                  style={{ '--reveal-index': index % 7 } as CSSProperties}
                  className="principle-row"
                >
                  <div className="principle-mark">
                    <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                    <span className="w-9 h-9 rounded-xl liquid-glass flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-medium text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Location & Global Reach */}
      <section className="py-16 md:py-20 border-t border-slate-200/60 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="editorial-pill font-mono mb-3 inline-block">
                  Headquarters &amp; Field Operations
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-slate-900 dark:text-white mb-4">
                  Rooted in Trincomalee. Partnering Worldwide.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-4">
                  We are headquartered in Nilaveli, Trincomalee on Sri Lanka’s eastern coast. Our quiet, focused environment allows our engineers and researchers to dedicate deep, uninterrupted attention to complex system challenges.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  We conduct remote and on-site discovery sessions for institutions across South Asia, the Middle East, and Europe.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-6 space-y-4 text-xs font-mono">
                <div className="flex justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-400">STUDIO LOCATION</span>
                  <span className="text-slate-900 dark:text-white">Ward no-1, Nilaveli, Trincomalee, LK</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-400">OPERATIONAL HOURS</span>
                  <span className="text-slate-900 dark:text-white">09:00 – 18:00 (GMT+5:30)</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-slate-400">PRIMARY FOCUS</span>
                  <span className="text-slate-900 dark:text-white">Research, Systems Engineering, Custom Web</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ENGAGEMENT MODEL</span>
                  <span className="text-slate-900 dark:text-white">Fixed-Scope R&amp;D or Embedded Retainer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
