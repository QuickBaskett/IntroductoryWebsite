import { useEffect, useRef, useState } from 'react'

type Options = IntersectionObserverInit & { once?: boolean }

/**
 * Returns a ref and whether the element has entered the viewport.
 * Defaults to firing once (for scroll-reveal); pass `once: false` to toggle.
 *
 * Includes an immediate bounding-box fallback so elements already on-screen at
 * mount reveal reliably (IntersectionObserver's initial callback can be dropped
 * under React StrictMode's mount/unmount/mount cycle).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: Options) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const { once = true, threshold = 0.15, rootMargin = '0px 0px -8% 0px', ...rest } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin, ...rest },
    )
    obs.observe(el)

    // Fallback: if already within the viewport at mount, reveal on the next
    // frame (so the hidden state paints first and the transition still plays).
    if (once) {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        raf = requestAnimationFrame(() => {
          setInView(true)
          obs.disconnect()
        })
      }
    }

    return () => {
      obs.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
