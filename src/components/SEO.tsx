import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import seoPages from '../data/seoPages.json'
import { projects } from '../data/projects'

const siteUrl = 'https://haftrixit.dev'
const fallbackPage = {
  title: 'Page Not Found | HAFTriX IT Solutions',
  description: 'The requested page could not be found.',
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

export default function SEO() {
  const { pathname } = useLocation()
  const routePath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const projectId = routePath.match(/^\/projects\/(\d+)$/)?.[1]
  const project = projectId ? projects.find((item) => item.id === Number(projectId)) : undefined
  const page = project
    ? {
        title: `${project.title} | Illustrative Project Brief | HAFTriX IT Solutions`,
        description: `${project.title}: an illustrative brief from HAFTriX IT Solutions showing problem framing, needs analysis, requirements, and a proposed delivery approach.`,
      }
    : seoPages[routePath as keyof typeof seoPages] ?? fallbackPage

  useEffect(() => {
    const canonicalUrl = `${siteUrl}${routePath}`
    const isKnownPage = routePath in seoPages || Boolean(project)

    document.title = page.title
    setMeta('name', 'description', page.description)
    setMeta('name', 'robots', isKnownPage ? 'index, follow' : 'noindex, follow')
    setMeta('property', 'og:title', page.title)
    setMeta('property', 'og:description', page.description)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('name', 'twitter:title', page.title)
    setMeta('name', 'twitter:description', page.description)
    setMeta('name', 'twitter:url', canonicalUrl)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [page.title, page.description, project, routePath])

  return null
}
