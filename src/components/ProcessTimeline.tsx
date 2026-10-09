import type { CSSProperties } from 'react'
import {
  Compass,
  Users2,
  FileCheck2,
  BookOpenCheck,
  LayoutGrid,
  Code2,
  CheckCircle2,
  LifeBuoy
} from 'lucide-react'

const lifecycleStages = [
  {
    number: '01',
    stage: 'Discovery & Problem Framing',
    summary: 'Deconstruct the observed operational symptom to isolate the genuine underlying business problem before hypothesizing technical solutions.',
    deliverable: 'Problem Statement & Opportunity Assessment Brief',
    icon: Compass,
    phase: 'Research'
  },
  {
    number: '02',
    stage: 'Needs Analysis & Stakeholder Research',
    summary: 'Engage operational staff, executives, and end-users through structured qualitative interviews and contextual workflow observations.',
    deliverable: 'Stakeholder Needs Analysis & User Journey Audit',
    icon: Users2,
    phase: 'Research'
  },
  {
    number: '03',
    stage: 'Requirements Engineering',
    summary: 'Translate organizational needs into unambiguous functional specifications and strict non-functional constraints (latency, concurrency, data retention).',
    deliverable: 'Formal Requirements Specification (FR & NFR Matrix)',
    icon: FileCheck2,
    phase: 'Specification'
  },
  {
    number: '04',
    stage: 'Feasibility Study & Literature/Market Review',
    summary: 'Analyze technical viability, architectural trade-offs, and commercial alternatives to prevent premature or bloated development.',
    deliverable: 'Technical Feasibility Study & Architecture Recommendation',
    icon: BookOpenCheck,
    phase: 'Specification'
  },
  {
    number: '05',
    stage: 'System & UX Design',
    summary: 'Draft relational data schemas, API contracts, and high-fidelity interactive user interfaces, tested for intuitive cognitive flow.',
    deliverable: 'Interactive High-Fidelity Prototype & System Schema',
    icon: LayoutGrid,
    phase: 'Design'
  },
  {
    number: '06',
    stage: 'Development & Integration',
    summary: 'Write modular, strictly typed code with clean abstractions, integrating reliably with existing databases, third-party APIs, and hardware.',
    deliverable: 'Production Software Codebase & Integrated APIs',
    icon: Code2,
    phase: 'Engineering'
  },
  {
    number: '07',
    stage: 'Testing & Validation',
    summary: 'Verify system behavior against the initial requirements through automated unit tests, edge-case simulations, and user acceptance testing (UAT).',
    deliverable: 'Quality Validation & Acceptance Audit Report',
    icon: CheckCircle2,
    phase: 'Validation'
  },
  {
    number: '08',
    stage: 'Deployment, Documentation & Support',
    summary: 'Deliver audited cloud/server deployment, exhaustive developer runbooks, staff workshops, and dedicated post-launch stabilization.',
    deliverable: 'System Runbook, User Documentation & Team Handoff',
    icon: LifeBuoy,
    phase: 'Delivery'
  }
]

export default function ProcessTimeline() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Central Guide Line */}
      <div
        className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gradient-to-b from-slate-200 via-blue-400/40 to-slate-200 dark:from-white/10 dark:via-blue-400/20 dark:to-white/10 pointer-events-none"
      />

      <div className="space-y-8 md:space-y-12">
        {lifecycleStages.map((item, index) => {
          const isEven = index % 2 === 0
          const Icon = item.icon

          return (
            <div
              key={item.stage}
              data-animate={isEven ? 'slide-right' : 'slide-left'}
              style={{ '--reveal-index': index % 7 } as CSSProperties}
              className={`relative flex flex-col md:flex-row items-center gap-6 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Panel */}
              <div className="w-full md:w-1/2">
                <div
                  className={`liquid-glass glass-specular rounded-2xl p-6 md:p-7 group transition-all duration-300 hover:-translate-y-1 ${
                    isEven ? 'md:mr-8' : 'md:ml-8'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10">
                        STAGE {item.number}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                        {item.phase}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.stage}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-4">
                    {item.summary}
                  </p>

                  {/* Concrete Deliverable tag */}
                  <div className="pt-3 border-t border-slate-200/50 dark:border-white/10 flex items-start gap-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex-shrink-0 pt-0.5">
                      Deliverable:
                    </span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              </div>

              {/* Node Center Marker */}
              <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-10 h-10 rounded-full liquid-glass items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm z-10">
                <Icon className="h-4 w-4" />
              </div>

              {/* Empty Balance Column */}
              <div className="hidden md:block w-1/2" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
