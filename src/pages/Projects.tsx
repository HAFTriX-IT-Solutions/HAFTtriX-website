import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import { projects } from '../data/projects'

const categories = [
  'All',
  'Full-Stack Systems',
  'Operational Systems',
  'Research & Data Systems',
  'Web Platforms',
  'Data & Analytics',
  'Public Sector Platforms'
]

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ Illustrative Project Briefs ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              Project Examples: From Needs to Delivery
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              These example briefs show how a research-led engagement can move from a problem statement to requirements, design, and a measurable delivery plan. They are illustrative scenarios, not named client engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Grid */}
      <section className="py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 ${
                  activeCategory === cat
                    ? 'btn-primary'
                    : 'liquid-glass text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                }`}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project brief cards */}
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
            <div className="text-center py-24 text-slate-500 font-mono text-sm">
              No project examples match this category.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  )
}
