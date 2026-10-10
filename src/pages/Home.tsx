import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Compass,
  FileCheck2,
  Code2,
  ArrowRight
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProcessTimeline from '../components/ProcessTimeline'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import StatsSection from '../components/StatsSection'
import CTASection from '../components/CTASection'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { useReveal } from '../fluid/useReveal'

const deliverablePhases = [
  {
    title: 'Problem & Needs Report',
    description: 'A focused review of operational friction, stakeholder needs, and feasibility.',
    artifact: 'Needs Analysis Brief',
  },
  {
    title: 'Requirements Specification',
    description: 'Functional and non-functional requirements, data flows, and edge cases.',
    artifact: 'Formal SRS Document',
  },
  {
    title: 'Interactive System Prototype',
    description: 'A clickable interface and system model to review before development.',
    artifact: 'Prototype & System Schema',
  },
  {
    title: 'Production System & Manuals',
    description: 'Working software, deployment guidance, and materials for staff handover.',
    artifact: 'System & Operations Runbook',
  },
]

export default function Home() {
  // The hero owns its entrance choreography and opts out of the generic
  // scroll reveal via `data-reveal-scope`.
  const heroRef = useReveal<HTMLElement>()

  return (
    <div className="relative overflow-hidden">
      {/* ── 1. HERO SECTION (Editorial, Asymmetrical 12-Column Grid) ── */}
      <section
        ref={heroRef}
        data-reveal-scope
        className="relative pt-32 pb-20 md:pt-40 md:pb-28"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left 7 Columns: Editorial Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3" data-reveal-block data-delay="320">
                <span className="editorial-pill font-mono">
                  [ 01 · Research &amp; Development Partner ]
                </span>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider hidden sm:inline">
                  Needs Analysis → Software
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                <span className="headline-line" data-reveal-heading>Software begins with research,</span><br />
                <span className="headline-line headline-line--second italic font-normal text-slate-600 dark:text-slate-300" data-reveal-heading>
                  not assumptions.
                </span>
              </h1>

              <p
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-xl"
                data-reveal-subline
              >
                HAFTriX IT Solutions works with organizations to understand a problem, document what people need, and build the right system.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2" data-reveal-block data-delay="1450">
                <Link
                  to="/contact"
                  className="btn-primary inline-flex items-center gap-2"
                  id="hero-problem-consult-btn"
                >
                  <span>Tell Us Your Problem</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <a
                  href="#lifecycle"
                  className="btn-secondary inline-flex items-center gap-2"
                  id="hero-lifecycle-btn"
                >
                  <span>Explore the eight stages</span>
                  <ArrowRight className="h-4 w-4 opacity-60" />
                </a>
              </div>

              {/* Marginal Annotation */}
              <div
                className="pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center gap-4 text-xs font-mono text-slate-500"
                data-reveal-block
                data-delay="1650"
              >
                <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-300" />
                <span>Typical outputs: needs report · requirements specification · working system</span>
              </div>
            </div>

            {/* Right 5 Columns: Liquid Glass Lifecycle Inspector */}
            <div className="lg:col-span-5" data-reveal-block data-delay="600">
              <div className="liquid-glass glass-specular refractive-glass rounded-[28px] p-6 sm:p-8 relative overflow-hidden isolate">
                <div className="absolute inset-x-8 top-0 h-28 bg-gradient-to-b from-blue-400/15 via-transparent to-transparent blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/60 dark:border-white/10">
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">From needs to delivery</span>
                    <span className="text-[10px] font-mono text-slate-400">01 — 08</span>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-white/65 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-start gap-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Compass className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">01 · Needs analysis</span>
                          <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300">Listen</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Map the workflow, stakeholders, and pain points before making a decision.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/65 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-start gap-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/15 to-violet-500/10 text-indigo-700 dark:text-indigo-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileCheck2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">02 · Requirements &amp; design</span>
                          <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Define</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Turn the problem into an actionable blueprint and a clear user journey.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/65 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-start gap-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-mono font-semibold text-slate-900 dark:text-white">03 · Build &amp; handover</span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-300">Deliver</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Develop, verify, and document the solution so adoption is smooth.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      ['Discovery', '01'],
                      ['Design', '02'],
                      ['Delivery', '03']
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-slate-200/60 dark:border-white/10 bg-white/40 dark:bg-white/5 px-3 py-2 text-center">
                        <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400">{value}</div>
                        <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-500/8 via-sky-500/6 to-transparent border border-blue-500/15">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">At every stage</div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif">The next decision follows from concrete research, not guesswork.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. THE 8-STAGE R&D APPROACH (Process Timeline) ── */}
      <section className="section-padding relative" id="lifecycle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="[ 02 · The Methodology ]"
            title="A structured journey from problem framing to verified delivery"
            description="Each stage builds on findings from the one before it. Stakeholders review an artifact at every milestone, from the problem statement and needs analysis to a validated system and handover."
          />

          <ProcessTimeline />
        </div>
      </section>

      {/* ── 3. SERVICE CATEGORIES (Grouped by R&D Disciplines) ── */}
      <section className="section-padding relative border-t border-slate-200/60 dark:border-white/5" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="[ 03 · Core Capabilities ]"
            title="Services designed around root needs and tangible deliverables"
            description="From early discovery and requirements specifications to custom software engineering and staff knowledge transfer."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.name}
                id={service.id}
                icon={service.icon}
                title={service.name}
                tagline={service.tagline}
                description={service.details.slice(0, 3).join('. ') + '.'}
                deliverables={service.deliverables}
                index={index}
                layoutClass={index < 2 ? 'lg:col-span-2' : 'lg:col-span-1'}
              />
            ))}

            {/* Custom Consultation Card */}
            <div className="liquid-glass glass-specular rounded-2xl p-7 md:p-8 flex flex-col justify-between bg-blue-500/5 dark:bg-blue-900/10 border-blue-500/20 lg:col-span-1">
              <div>
                <span className="editorial-pill font-mono text-[11px] mb-4 inline-block">
                  Dedicated Retainer
                </span>
                <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-3">
                  Long-Term Technical Advisory &amp; R&amp;D
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-6">
                  Need an embedded research and systems partner to evaluate ongoing technical initiatives, review vendor proposals, and audit requirements continuously?
                </p>
              </div>
              <Link
                to="/contact"
                className="btn-primary text-xs justify-center"
              >
                <span>Request Advisory Brief</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. DELIVERABLES MATRIX (Concrete Client Outputs) ── */}
      <section className="section-padding relative border-t border-slate-200/60 dark:border-white/5" id="deliverables">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="[ 04 · What You Receive ]"
            title="Clear, tangible deliverables at every phase"
            description="Each phase produces reviewable documents, test evidence, prototypes, and working software."
          />

          <div className="deliverables-ledger liquid-glass glass-specular rounded-3xl overflow-hidden">
            {deliverablePhases.map((phase, index) => (
              <article key={phase.title} className="deliverables-phase" data-animate="fade-up">
                <span className="font-mono text-xs text-blue-600 dark:text-blue-400 block mb-4 font-semibold">
                  PHASE 0{index + 1}
                </span>
                <h3 className="text-lg font-serif font-medium text-slate-900 dark:text-white mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {phase.description}
                </p>
                <span className="deliverable-badge">{phase.artifact}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ILLUSTRATIVE PROJECT BRIEFS ── */}
      <section className="section-padding relative border-t border-slate-200/60 dark:border-white/5" id="case-studies">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="editorial-pill font-mono mb-3 inline-block">
                [ 05 · Selected Projects ]
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 dark:text-white leading-tight">
                Selected Websites &amp; Systems
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span>View All {projects.length} Projects</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {projects.slice(0, 2).map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                project={project}
                layoutClass={index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. STATS & ENGINEERING DISCIPLINE ── */}
      <StatsSection />

      {/* ── 7. CONTACT CTA (Tell Us Your Problem) ── */}
      <CTASection />
    </div>
  )
}
