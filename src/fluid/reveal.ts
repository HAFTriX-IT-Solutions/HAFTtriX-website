/**
 * Entrance animation utilities.
 *
 * Two behaviours, both driven by the fixed timings from the design spec:
 *
 *  - `revealOnMount(root)`  — used on hero areas. Splits a heading and a
 *    sub-line into words and lights them up one by one, then fades in the
 *    surrounding blocks with their own `data-delay`.
 *  - `revealOnScroll(root)` — used by inner routes. Fades blocks in as they
 *    scroll into view instead of on load.
 */

const HEADING_BASE_DELAY = 480
const HEADING_STAGGER = 85
const SUBLINE_BASE_DELAY = 1150
const SUBLINE_STAGGER = 22

function splitIntoWords(element: Element | null, extraClass: string): HTMLElement[] {
  if (!(element instanceof HTMLElement)) return []
  if (element.dataset.split === '1') {
    return Array.from(element.querySelectorAll<HTMLElement>('.reveal-word'))
  }

  const text = element.textContent?.trim() ?? ''
  if (!text) return []

  const words = text.split(/\s+/)
  element.dataset.split = '1'
  element.textContent = ''

  const spans: HTMLElement[] = []
  words.forEach((word, index) => {
    const span = document.createElement('span')
    span.className = `reveal-word ${extraClass}`.trim()
    span.textContent = word
    element.appendChild(span)
    spans.push(span)
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(' '))
    }
  })

  return spans
}

function revealBlocks(root: ParentNode, defaultDelay: number): void {
  root.querySelectorAll<HTMLElement>('[data-reveal-block]').forEach((block) => {
    const delay = Number(block.dataset.delay ?? defaultDelay)
    block.style.transitionDelay = `${delay}ms`
    requestAnimationFrame(() => block.classList.add('is-in'))
  })
}

/** Hero entrance: run once when the page mounts. */
export function revealOnMount(root: HTMLElement | null, { blockDelay = 0 } = {}): void {
  if (!root) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.querySelectorAll('.reveal-block, .reveal-word').forEach((el) => el.classList.add('is-in'))
    return
  }

  // Each heading line is split independently so per-line styling (italics,
  // colours, line breaks) survives untouched.
  const headingWords = Array.from(root.querySelectorAll('[data-reveal-heading]')).flatMap((line) =>
    splitIntoWords(line, ''),
  )
  const sublineWords = Array.from(root.querySelectorAll('[data-reveal-subline]')).flatMap((line) =>
    splitIntoWords(line, 'reveal-word--sub'),
  )

  headingWords.forEach((word, index) => {
    word.style.transitionDelay = `${HEADING_BASE_DELAY + index * HEADING_STAGGER}ms`
    requestAnimationFrame(() => word.classList.add('is-in'))
  })

  sublineWords.forEach((word, index) => {
    word.style.transitionDelay = `${SUBLINE_BASE_DELAY + index * SUBLINE_STAGGER}ms`
    requestAnimationFrame(() => word.classList.add('is-in'))
  })

  revealBlocks(root, blockDelay)
}

/** Inner-route entrance: reveal blocks as they enter the viewport. */
export function revealOnScroll(root: HTMLElement | null): () => void {
  if (!root) return () => {}

  const blocks = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal-block]'))
  if (blocks.length === 0) return () => {}

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    blocks.forEach((block) => block.classList.add('is-in'))
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const element = entry.target as HTMLElement
        element.style.transitionDelay = `${Number(element.dataset.delay ?? 0)}ms`
        element.classList.add('is-in')
        observer.unobserve(element)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  blocks.forEach((block) => observer.observe(block))
  return () => observer.disconnect()
}
