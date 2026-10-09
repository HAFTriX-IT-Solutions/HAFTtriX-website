import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Tag, Layers, FileCheck } from 'lucide-react'
import { projects } from '../data/projects'
import CTASection from '../components/CTASection'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === Number(id))

  const currentIndex = projects.findIndex((p) => p.id === Number(id))
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-32 px-4 text-center">
        <span className="editorial-pill font-mono mb-4">404 Error</span>
        <h1 className="text-4xl font-serif font-medium text-slate-900 dark:text-white mb-4">
          Project Brief Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          This project brief is not available.
        </p>
        <Link to="/projects" className="btn-primary">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Project Examples</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="relative pt-24 md:pt-32">
      {/* Case Header */}
      <section className="relative py-12 md:py-20 border-b border-slate-200/60 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Project Examples</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="editorial-pill font-mono">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Illustrative Brief 0{project.id}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-4 leading-tight">
            {project.title}
          </h1>

          <p className="text-sm font-mono text-slate-500 dark:text-slate-400">
            {project.clientContext}
          </p>
        </div>
      </section>

      {/* Deep-Dive Case Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Main Narrative (8 Cols) */}
            <div className="lg:col-span-8 space-y-12">

              {/* 1. Problem Formulation */}
              <div className="liquid-glass glass-specular rounded-3xl p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                  01 · The Root Operational Friction
                </span>
                <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  The Problem
                </h2>
                <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* 2. Needs Analysis Findings */}
              <div className="liquid-glass glass-specular rounded-3xl p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                  02 · Needs Analysis &amp; Research
                </span>
                <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  Needs Analysis &amp; Research Findings
                </h2>
                <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                  {project.researchFindings}
                </p>
              </div>

              {/* 3. Requirements Specification */}
              <div className="liquid-glass glass-specular rounded-3xl p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block">
                  03 · Requirements Engineering
                </span>
                <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  Engineered System Requirements
                </h2>
                <div className="space-y-3 pt-2">
                  {project.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                        FR-0{i + 1}
                      </span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Proposed Result */}
              <div className="liquid-glass glass-specular rounded-3xl p-8 space-y-4 bg-blue-500/5 dark:bg-blue-950/10 border-blue-500/20">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-700 dark:text-blue-300 block">
                  04 · Proposed Result
                </span>
                <h2 className="text-2xl font-serif font-medium text-slate-900 dark:text-white">
                  Proposed Result &amp; Validation
                </h2>
                <p className="text-base text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
                  {project.outcome}
                </p>
              </div>

            </div>

            {/* Sidebar Specifications & Deliverables (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Deliverables Produced */}
              <div className="liquid-glass glass-specular rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-semibold">
                  <FileCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Sample Deliverables</span>
                </div>
                <div className="space-y-2 pt-2">
                  {project.deliverables.map((deliv) => (
                    <div
                      key={deliv}
                      className="text-xs font-mono p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-slate-800 dark:text-slate-200"
                    >
                      ✓ {deliv}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack */}
              <div className="liquid-glass glass-specular rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white text-sm font-semibold">
                  <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>Technologies &amp; Architecture</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="liquid-glass glass-specular rounded-2xl p-6 space-y-3 bg-blue-500/5 dark:bg-blue-900/10 border-blue-500/20">
                <h3 className="text-base font-serif font-medium text-slate-900 dark:text-white">
                  Face a similar operational challenge?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  Schedule a discovery session to analyze your workflow constraints and data architecture.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary w-full text-xs justify-center text-center mt-2 inline-flex items-center gap-1.5"
                >
                  <span>Request Problem Review</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Prev / Next Pagination */}
      {(prevProject || nextProject) && (
        <section className="py-12 border-t border-slate-200/60 dark:border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.id}`}
                className="group flex items-center gap-3 text-left"
              >
                <ArrowLeft className="h-4 w-4 text-slate-400 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Previous Brief</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {prevProject.title}
                  </span>
                </div>
              </Link>
            ) : <div />}

            {nextProject && (
              <Link
                to={`/projects/${nextProject.id}`}
                className="group flex items-center gap-3 text-right"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Next Brief</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  )
}
