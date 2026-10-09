import { useFluidSimulation } from './useFluidSimulation'

/**
 * The persistent fluid canvas.
 *
 * Mounted once at the app root — outside the router — so it keeps painting
 * behind every route without remounting. It is `position: fixed`, `z-index: 0`,
 * `pointer-events: none` and `aria-hidden`, so it can never intercept a click
 * or be announced by a screen reader.
 */
export default function FluidBackground() {
  const canvasRef = useFluidSimulation()

  return (
    <div className="fluid-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="fluid-canvas" />
      <div className="fluid-scrim" />
      <div className="fluid-grain" />
    </div>
  )
}
