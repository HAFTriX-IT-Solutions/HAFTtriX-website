import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import { projects } from '../data/projects'

const categories = [
  'All',
  'Travel Website',
  'E-commerce',
  'Creative Studio',
  'Business Systems'
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative pt-24 md:pt-32">
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-[32px] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-x-10 top-0 h-32 bg-gradient-to-r from-violet-500/10 via-blue-500/8 to-cyan-500/10 blur-2xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="max-w-3xl">
                <span className="editorial-pill font-mono mb-4 inline-block">
                  [ Selected Projects ]
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-slate-900 dark:text-white mb-5 leading-[0.95]">
                  Selected work: websites &amp; systems.
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  A curated set of live experiences and product systems built for businesses, creative teams, and service-focused brands.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 min-w-[260px]">
                {[
                  ['4 showcases', 'Live examples'],
                  ['Research-led', 'Problem-first execution']
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

      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-glass glass-specular rounded-[28px] p-3 sm:p-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    activeCategory === cat
                      ? 'btn-primary shadow-[0_10px_22px_rgba(59,130,246,0.18)]'
                      : 'liquid-glass text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                project={project}
                layoutClass={index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="liquid-glass glass-specular rounded-[28px] p-12 text-center text-slate-500 dark:text-slate-300 font-mono text-sm">
              No project examples match this category.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
