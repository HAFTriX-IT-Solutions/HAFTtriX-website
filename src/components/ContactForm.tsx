import { FormEvent, ChangeEvent, useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { submitContactForm } from '../lib/api'

interface FormData {
  fullName: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}

const emptyForm: FormData = {
  fullName: '',
  email: '',
  phone: '',
  service: 'Research & Needs Analysis',
  budget: 'Evaluating requirements first',
  message: '',
}

const inputClass = `
  w-full px-4 py-3 rounded-xl text-sm
  liquid-glass
  text-slate-900 dark:text-white
  placeholder-slate-400 dark:placeholder-slate-500
  transition-all duration-200
`.trim()

const labelClass = 'block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 font-medium'

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await submitContactForm(formData)
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData(emptyForm)
      }, 5000)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to transmit your problem brief. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div
        data-animate="scale"
        role="status"
        className="flex flex-col items-center justify-center text-center py-12 liquid-glass rounded-2xl p-8"
      >
        <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-600 dark:text-blue-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-serif font-medium text-slate-900 dark:text-white mb-2">
          Problem Brief Received
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md font-sans leading-relaxed">
          Thank you for outlining your requirements. We will review the brief and follow up about the need and a practical next step.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Error notification */}
      {error && (
          <div
            data-animate="fade-in"
            role="alert"
            className="form-alert flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-300"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="form-field">
          <label className={`${labelClass} floating-label`} htmlFor="cf-fullName">
            Your Name / Title *
          </label>
          <input
            id="cf-fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={`${inputClass} form-field-control`}
            placeholder=" "
          />
        </div>

        <div className="form-field">
          <label className={`${labelClass} floating-label`} htmlFor="cf-email">
            Organizational Email *
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`${inputClass} form-field-control`}
            placeholder=" "
          />
        </div>
      </div>

      {/* Phone + Capability Needed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="form-field">
          <label className={`${labelClass} floating-label`} htmlFor="cf-phone">
            Direct Contact Number
          </label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`${inputClass} form-field-control`}
            placeholder=" "
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-service">
            Primary Area of Inquiry *
          </label>
          <select
            id="cf-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className={`${inputClass} cursor-pointer`}
          >
            <option value="Research & Needs Analysis">Research &amp; Needs Analysis</option>
            <option value="Custom Software Development">Custom Software Development</option>
            <option value="System Architecture & UX Design">System Architecture &amp; UX Design</option>
            <option value="Technical Writing & Documentation">Technical Writing &amp; Documentation</option>
            <option value="Training & Knowledge Transfer">Training &amp; Knowledge Transfer</option>
            <option value="Full Lifecycle R&D Partnership">Full Lifecycle R&amp;D Partnership</option>
            <option value="Other Technical Problem">Other Technical Problem</option>
          </select>
        </div>
      </div>

      {/* Budget Planning */}
      <div>
        <label className={labelClass} htmlFor="cf-budget">
          Anticipated Project Scope / Budget Framework
        </label>
        <select
          id="cf-budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="Evaluating requirements first">Evaluating requirements first (Discovery Phase)</option>
          <option value="LKR 150,000 - 350,000">Small Dedicated Module (LKR 150,000 - 350,000)</option>
          <option value="LKR 350,000 - 750,000">Mid-Scale Platform (LKR 350,000 - 750,000)</option>
          <option value="Above LKR 750,000">Enterprise / Institutional Architecture (Above LKR 750,000)</option>
          <option value="International Retainer">International / Foreign Currency Engagement</option>
        </select>
      </div>

      {/* Message */}
      <div className="form-field">
        <label className={`${labelClass} floating-label`} htmlFor="cf-message">
          Describe the problem or workflow *
        </label>
        <textarea
          id="cf-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`${inputClass} form-field-control resize-none`}
          placeholder=" "
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        id="contact-submit-btn"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Analyzing &amp; Transmitting...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Submit Problem Brief for Review</span>
          </>
        )}
      </button>
    </form>
  )
}
