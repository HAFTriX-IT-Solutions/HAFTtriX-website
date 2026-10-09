import { useEffect, useRef } from 'react'
import { fluidSimulation } from './fluid-engine'

/**
 * Mounts the fluid engine exactly once for the lifetime of the component.
 *
 * The empty dependency array is deliberate: the canvas must survive route
 * changes, so the simulation is never torn down and re-created by navigation.
 */
export function useFluidSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const destroyRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    destroyRef.current = fluidSimulation(canvas)

    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [])

  return canvasRef
}
