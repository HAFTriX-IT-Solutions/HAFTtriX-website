import { FormEvent, ChangeEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
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
  service: 'Web Development',
  budget: 'Not sure yet',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) {
      setError(null)
    }
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
      }, 3000)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your request right now. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl"
      >
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-text dark:text-white mb-2">
          Thank You!
        </h3>
        <p className="text-muted-text dark:text-gray-400">
          Your project request has been received. We'll get back to you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
            placeholder="+94 75 784 9577"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
            Required Service *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
          >
            <option>Web Development</option>
            <option>Software Development</option>
            <option>Cybersecurity</option>
            <option>AI & Machine Learning</option>
            <option>IT Consulting</option>
            <option>Digital Solution</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
          Estimated Budget
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
        >
          <option>Not sure yet</option>
          <option>Under LKR 50,000</option>
          <option>LKR 50,000 - 100,000</option>
          <option>LKR 100,000 - 250,000</option>
          <option>Above LKR 250,000</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text dark:text-gray-300 mb-2">
          Tell us about your project *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-white dark:bg-navy border border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
          placeholder="Describe your project requirements, goals, and timeline..."
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-deep-blue text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>Send Project Request</span>
          </>
        )}
      </button>
    </form>
  )
}
