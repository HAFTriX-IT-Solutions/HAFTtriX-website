import { ArrowUpRight, MessageSquare, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-animate="fade-up"
          className="liquid-glass glass-specular rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="mb-4 flex justify-center">
            <span className="editorial-pill font-mono">
              Discovery &amp; Consultation
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 dark:text-white mb-5 max-w-2xl mx-auto leading-[1.15]">
            Describe the problem. We will architect the solution.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Whether you are dealing with separate operational tools, manual handoffs, or a new
            software platform, start with a conversation about the problem, constraints, and a practical next step.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
              id="cta-tell-us-problem-btn"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Tell Us Your Problem</span>
              <ArrowUpRight className="h-4 w-4 opacity-75" />
            </Link>

            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
              id="cta-whatsapp-direct-btn"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Direct WhatsApp Discussion</span>
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-mono">
            <span>✓ Confidential Problem Assessment</span>
            <span>✓ No Commitments Required</span>
            <span>✓ Direct Technical Dialogue</span>
          </div>
        </div>
      </div>
    </section>
  )
}
