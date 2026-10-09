import { useLayoutEffect } from 'react'

const revealSelector = [
  '[data-animate]',
  'main section',
  'main h1',
  'main h2',
  'main h3',
  'main p',
  'main li',
  'main article',
  'main .liquid-glass',
  'main .btn-primary',
  'main .btn-secondary',
  'main form > *',
  'main form input',
  'main form select',
  'main form textarea',
  'main img',
  'main iframe',
  'footer',
  'footer > div',
].join(',')

export default function RevealSystem() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let observer: IntersectionObserver | undefined

    const reveal = (element: Element) => {
      element.classList.add('is-visible')
      element.dispatchEvent(new CustomEvent('site:reveal', { bubbles: false }))
      observer?.unobserve(element)
    }

    if ('IntersectionObserver' in window && !reducedMotion) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' })
    }

    const observeTree = (node: Node) => {
      if (!(node instanceof Element)) return
      const candidates: Element[] = []
      if (node.matches(revealSelector)) candidates.push(node)
      candidates.push(...node.querySelectorAll(revealSelector))
      candidates.forEach((element, index) => {
        // Heroes that own the fluid entrance choreography opt out of the
        // generic scroll reveal so the two systems never fight.
        if (element.closest('[data-reveal-scope]')) return
        if (!element.hasAttribute('data-animate')) {
          element.setAttribute('data-animate', element instanceof HTMLImageElement ? 'image' : 'fade-up')
          const htmlElement = element as HTMLElement
          htmlElement.style.setProperty('--reveal-index', String(index % 7))
        }
        if (observer && !element.classList.contains('is-visible')) observer.observe(element)
        else if (!observer) reveal(element)
      })
    }

    observeTree(document.body)
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeTree))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let pointerFrame = 0
    let pointerTarget: HTMLElement | null = null
    let pointerX = 0
    let pointerY = 0
    const handlePointerMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      const nextTarget = event.target.closest<HTMLElement>('.btn-primary, .btn-secondary, .liquid-glass-interactive')
      if (pointerTarget && pointerTarget !== nextTarget) {
        pointerTarget.style.setProperty('--tilt-x', '0deg')
        pointerTarget.style.setProperty('--tilt-y', '0deg')
      }
      pointerTarget = nextTarget
      if (!pointerTarget) return

      const bounds = pointerTarget.getBoundingClientRect()
      pointerX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
      pointerY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
      if (pointerFrame) return
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0
        if (!pointerTarget) return
        pointerTarget.style.setProperty('--pointer-x', `${pointerX * 100}%`)
        pointerTarget.style.setProperty('--pointer-y', `${pointerY * 100}%`)
        if (pointerTarget.classList.contains('liquid-glass-interactive')) {
          pointerTarget.style.setProperty('--tilt-x', `${(pointerX - 0.5) * 12}deg`)
          pointerTarget.style.setProperty('--tilt-y', `${(0.5 - pointerY) * 12}deg`)
        }
      })
    }
    const clearPointer = () => {
      pointerTarget?.style.setProperty('--tilt-x', '0deg')
      pointerTarget?.style.setProperty('--tilt-y', '0deg')
      pointerTarget = null
    }
    if (finePointer && !reducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('pointerleave', clearPointer, { passive: true })
    }

    return () => {
      mutations.disconnect()
      observer?.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', clearPointer)
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame)
    }
  }, [])

  return null
}
