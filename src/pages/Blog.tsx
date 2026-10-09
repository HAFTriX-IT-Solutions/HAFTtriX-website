import type { CSSProperties } from 'react'
import { Calendar, Clock } from 'lucide-react'
import CTASection from '../components/CTASection'
import SectionHeading from '../components/SectionHeading'

const blogPosts = [
  {
    id: 1,
    title: 'The Cost of Premature Coding: Why Needs Analysis Prevents System Failure',
    excerpt: 'A short brief can save weeks of rework. Start by describing the people, steps, and constraints involved before deciding which system to build.',
    category: 'Research & Analysis',
    date: 'September 12, 2026',
    readTime: '6 min read',
  },
  {
    id: 2,
    title: 'Requirements Engineering: Drafting Specifications That Actually Guide Architecture',
    excerpt: 'Translating human operational habits into formal functional and non-functional specifications. How to bridge the divide between what stakeholders ask for and what they mathematically need.',
    category: 'Software Engineering',
    date: 'August 28, 2026',
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Why Sri Lankan Enterprises Benefit from Tailored Operational Systems',
    excerpt: 'Off-the-shelf software can impose workflows that do not match local operations. A tailored system can reflect how regional teams handle orders, stock, and reporting.',
    category: 'Operational Strategy',
    date: 'August 14, 2026',
    readTime: '5 min read',
  },
  {
    id: 4,
    title: 'System Architecture: Evaluating Relational Modeling vs Document Stores',
    excerpt: 'A practical review of data structures for inventory reconciliation and clinical tracking platforms. Why strict schema integrity matters when scaling operational data.',
    category: 'System Architecture',
    date: 'July 30, 2026',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Designing for Intermittent Connectivity: Offline-First Principles',
    excerpt: 'How local IndexedDB caching and optimistic background synchronizations ensure coastal and rural enterprise users remain productive even during network brownouts.',
    category: 'Software Engineering',
    date: 'July 18, 2026',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'The Real ROI of Custom Software vs Commercial SaaS Subscriptions',
    excerpt: 'Comparing long-term ownership costs, workflow flexibility, and intellectual property retention between custom engineered systems and annual per-seat licensing fees.',
    category: 'Operational Strategy',
    date: 'July 4, 2026',
    readTime: '5 min read',
  },
]

const categories = ['All', 'Research & Analysis', 'Software Engineering', 'System Architecture', 'Operational Strategy']

export default function Blog() {
  return (
    <div className="relative pt-24 md:pt-32">
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="editorial-pill font-mono mb-4 inline-block">
              [ Studio Publications ]
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-slate-900 dark:text-white mb-6 leading-tight">
              Essays, Technical Notes &amp; R&amp;D Reports
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Perspectives on requirements engineering, system architecture, operational research, and software craftsmanship from our engineering team in Trincomalee.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`px-4 py-2 rounded-xl text-xs font-mono cursor-pointer transition-colors ${
                  i === 0
                    ? 'btn-primary'
                    : 'liquid-glass text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                data-animate="fade-up"
                style={{ '--reveal-index': index % 7 } as CSSProperties}
                className="liquid-glass glass-specular rounded-2xl p-7 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="editorial-pill font-mono text-[11px]">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-serif font-medium text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/50 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
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
