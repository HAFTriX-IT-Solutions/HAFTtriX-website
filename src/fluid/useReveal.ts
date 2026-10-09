import { useLayoutEffect, useRef } from 'react'
import { revealOnMount } from './reveal'

/**
 * Attach to the element that owns a hero. Runs the entrance choreography once
 * on mount: word-by-word heading and sub-line, then staggered blocks keyed off
 * their `data-delay`.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    revealOnMount(ref.current)
  }, [])

  return ref
}
