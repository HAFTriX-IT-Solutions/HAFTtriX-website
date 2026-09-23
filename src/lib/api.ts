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

export async function submitContactForm(formData: ContactFormPayload) {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    message: 'Form submitted successfully',
    data: formData,
  }
}

export async function fetchProjects() {
  return projects
}

export async function fetchServices() {
  return services
}
