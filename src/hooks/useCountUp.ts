import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Eases a number from 0 → target once `active` becomes true. */
export function useCountUp(target: number, active: boolean, duration = 1600): number {
  const [value, setValue] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const ease = (x: number) => 1 - Math.pow(1 - x, 3)
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setValue(target * ease(p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration, reduced])

  return value
}
