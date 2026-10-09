import type { CSSProperties } from 'react'
import { ArrowUpRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectCaseStudy } from '../data/projects'

interface ProjectCardProps {
  id: number
  title?: string
  clientContext?: string
  problem?: string
  outcome?: string
  technologies?: string[]
  category?: string
  deliverables?: string[]
  project?: ProjectCaseStudy
  layoutClass?: string
}

export default function ProjectCard({
  id,
  title = 'Project',
  clientContext,
  problem,
  outcome,
  technologies = [],
  category = 'Project Example',
  deliverables = [],
  project,
  layoutClass = ''
}: ProjectCardProps) {
  const displayTitle = project?.title || title
  const displayContext = project?.clientContext || clientContext
  const displayProblem = project?.problem || problem
  const displayOutcome = project?.outcome || outcome
  const displayTech = project?.technologies || technologies
  const displayCategory = project?.category || category
  const displayDeliverables = project?.deliverables || deliverables

  return (
    <div
      data-animate="fade-up"
      style={{ '--reveal-index': (id - 1) % 7 } as CSSProperties}
      className={`group liquid-glass liquid-glass-interactive glass-specular rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 ${layoutClass}`}
    >
      <div>
        {/* Header meta */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="editorial-pill font-mono text-[11px]">
            {displayCategory}
          </span>
          <span className="font-mono text-xs text-slate-400">
              Project 0{id}
          </span>
        </div>

        {project?.image && (
          <a
            href={project.link || `/projects/${id}`}
            target={project.link ? '_blank' : undefined}
            rel={project.link ? 'noopener noreferrer' : undefined}
            aria-label={project.link ? `Visit ${displayTitle} website` : `View ${displayTitle} project`}
            className="block mb-5 overflow-hidden rounded-xl border border-slate-200/60 dark:border-white/10"
          >
            <img
              src={project.image}
              alt={`${displayTitle} project preview`}
              className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </a>
        )}

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-serif font-medium text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {displayTitle}
        </h3>

        {displayContext && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
            {displayContext}
          </p>
        )}

        {/* Problem framing */}
        {displayProblem && (
          <div className="mb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Problem Framed
            </span>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
              {displayProblem}
            </p>
          </div>
        )}

        {/* Outcome */}
        {displayOutcome && (
          <div className="mb-5 p-3 rounded-xl bg-blue-500/5 dark:bg-blue-400/5 border border-blue-500/10 dark:border-white/5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-1 font-semibold">
              <CheckCircle className="h-3 w-3" />
              Proposed Result
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {displayOutcome}
            </p>
          </div>
        )}

        {/* Deliverables snippet */}
        {displayDeliverables && displayDeliverables.length > 0 && (
          <div className="mb-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
              Key Deliverables
            </span>
            <div className="flex flex-wrap gap-1.5">
              {displayDeliverables.slice(0, 2).map((item) => (
                <span key={item} className="deliverable-badge text-[10px]">
                  {item}
                </span>
              ))}
              {displayDeliverables.length > 2 && (
                <span className="deliverable-badge text-[10px]">
                  +{displayDeliverables.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 mb-6">
          {displayTech.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
        <Link
          to={`/projects/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          <span>View Project</span>
          <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
        {project?.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 dark:text-blue-300 hover:text-blue-500 transition-colors"
          >
            <span>Visit Website</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  )
}
