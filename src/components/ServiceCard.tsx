import { ComponentType } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ServiceCardProps {
  id?: string
  icon: ComponentType<{ className?: string }>
  title: string
  tagline?: string
  description?: string
  deliverables?: string[]
  index?: number
  layoutClass?: string
}

export default function ServiceCard({
  id = 'services',
  icon: Icon,
  title,
  tagline,
  description,
  deliverables,
  index = 0,
  layoutClass = '',
}: ServiceCardProps) {
  return (
    <div
      data-animate="fade-up"
      style={{ '--reveal-index': index } as CSSProperties}
      className={`group liquid-glass liquid-glass-interactive glass-specular rounded-[28px] p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${layoutClass}`}
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/14 to-cyan-500/10 border border-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-300 group-hover:scale-105 transition-transform duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400">
            0{index + 1}
          </span>
        </div>

        <h3 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        {tagline && (
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-3">
            {tagline}
          </p>
        )}

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-sans">
          {description}
        </p>

        {deliverables && deliverables.length > 0 && (
          <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/50 dark:border-white/10">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
              Sample Deliverables
            </span>
            <div className="flex flex-wrap gap-1.5">
              {deliverables.map((item) => (
                <span
                  key={item}
                  className="deliverable-badge"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-200/40 dark:border-white/5 flex items-center justify-between">
        <Link
          to={`/services#${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <span>Explore Service Scope</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
