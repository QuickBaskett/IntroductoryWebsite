import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Node = { x: number; y: number; vx: number; vy: number; r: number }
type Pulse = { a: Node; b: Node; t: number }

/** Fixed full-viewport canvas: drifting store nodes + travelling data pulses. */
export function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []
    let raf = 0

    const resize = () => {
      w = canvas.width = window.innerWidth * DPR
      h = canvas.height = window.innerHeight * DPR
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
    }
    const build = () => {
      const count = Math.min(64, Math.floor((window.innerWidth * window.innerHeight) / 22000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14 * DPR,
        vy: (Math.random() - 0.5) * 0.14 * DPR,
        r: (Math.random() * 1.4 + 0.6) * DPR,
      }))
    }
    resize()
    build()
    const LINK = 140 * DPR

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        a.x += a.vx
        a.y += a.vy
        if (a.x < 0 || a.x > w) a.vx *= -1
        if (a.y < 0 || a.y > h) a.vy *= -1
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(10,138,52,${(1 - dist / LINK) * 0.22})`
            ctx.lineWidth = DPR * 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(10,138,52,0.55)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (pulses.length < 6 && Math.random() < 0.04 && nodes.length > 2) {
        const a = nodes[(Math.random() * nodes.length) | 0]
        const b = nodes[(Math.random() * nodes.length) | 0]
        if (a !== b) pulses.push({ a, b, t: 0 })
      }
      pulses = pulses.filter((p) => {
        p.t += 0.02
        const x = p.a.x + (p.b.x - p.a.x) * p.t
        const y = p.a.y + (p.b.y - p.a.y) * p.t
        ctx.fillStyle = 'rgba(245,138,26,0.95)'
        ctx.shadowColor = 'rgba(10,138,52,0.9)'
        ctx.shadowBlur = 8 * DPR
        ctx.beginPath()
        ctx.arc(x, y, 1.7 * DPR, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
        return p.t < 1
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    let rt: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(rt)
      rt = setTimeout(() => {
        resize()
        build()
      }, 180)
    }
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else draw()
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(rt)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />
}
