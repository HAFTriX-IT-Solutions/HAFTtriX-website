import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div
        data-animate="fade-up"
        className="relative z-10 text-center px-4 max-w-lg mx-auto"
      >
        <span className="editorial-pill font-mono mb-6 inline-block">
          Error 404 · Unmapped Route
        </span>

        <h1 className="text-7xl sm:text-8xl font-serif font-medium text-slate-900 dark:text-white mb-4 tracking-tight">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-serif font-medium text-slate-800 dark:text-slate-200 mb-3">
          Document or route not found
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 font-sans leading-relaxed">
          The requested system pathway does not exist, or has been consolidated under our research and software development services.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary" id="notfound-home-btn">
            <Home className="h-4 w-4" />
            <span>Return to Studio Overview</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
            id="notfound-back-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}
