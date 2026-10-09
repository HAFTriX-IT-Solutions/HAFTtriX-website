import type { CSSProperties } from 'react'
import Counter from './Counter'
import { stats } from '../data/stats'

export default function StatsSection() {
  return (
    <section className="section-padding relative" aria-label="Our delivery framework">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8 md:mb-10" data-animate="slide-left">
          <p className="editorial-pill font-mono mb-3">[ The work, in view ]</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-white">
            A complete process, with clear points of review.
          </h2>
        </div>

        <div className="stats-panel liquid-glass glass-specular rounded-3xl px-4 sm:px-7 py-5 sm:py-7">
          <dl className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="stats-cell"
                data-animate="fade-up"
                style={{ '--reveal-index': index } as CSSProperties}
              >
                <dt className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stat.label}
                </dt>
                <dd className="mt-3 text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
