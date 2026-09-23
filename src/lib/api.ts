import { projects } from '../data/projects'
import { services } from '../data/services'

export interface ContactFormPayload {
  fullName: string
  email: string
  phone: string
  service: string
  budget: string
  message: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitizeText(value: string, maxLength: number) {
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength)
}

export function sanitizeContactForm(formData: ContactFormPayload): ContactFormPayload {
  return {
    fullName: sanitizeText(formData.fullName, 100),
    email: sanitizeText(formData.email, 150).toLowerCase(),
    phone: sanitizeText(formData.phone, 30),
    service: sanitizeText(formData.service, 80),
    budget: sanitizeText(formData.budget, 80),
    message: sanitizeText(formData.message, 2000),
  }
}

export async function submitContactForm(formData: ContactFormPayload) {
  const safeData = sanitizeContactForm(formData)

  if (!safeData.fullName || !safeData.email || !safeData.service || !safeData.message) {
    throw new Error('Please complete the required fields before sending your request.')
  }

  if (!emailPattern.test(safeData.email)) {
    throw new Error('Please enter a valid email address.')
  }

  if (safeData.message.length < 20) {
    throw new Error('Please provide a bit more detail about your project so we can help properly.')
  }

  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    success: true,
    message: 'Form submitted successfully',
    data: safeData,
  }
}

export async function fetchProjects() {
  return projects
}

export async function fetchServices() {
  return services
}
