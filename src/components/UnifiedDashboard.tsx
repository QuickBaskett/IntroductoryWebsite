import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SEED = [40, 62, 48, 78, 55, 90, 70, 84, 60, 96, 72, 88]

function DashMock() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const reduced = useReducedMotion()
  const [bars, setBars] = useState<number[]>(SEED.map(() => 4))
  const [rev, setRev] = useState('18.4')
  const [bkt, setBkt] = useState('7,240')

  useEffect(() => {
    if (!inView) return
    const draw = () =>
      setBars(SEED.map((v) => (reduced ? v : Math.max(12, v + (Math.random() * 20 - 10)))))
    draw()
    if (reduced) return
    const b = setInterval(draw, 2400)
    const n = setInterval(() => {
      setRev((18 + Math.random() * 1.4).toFixed(1))
      setBkt((7100 + Math.floor(Math.random() * 300)).toLocaleString('en-IN'))
    }, 2600)
    return () => {
      clearInterval(b)
      clearInterval(n)
    }
  }, [inView, reduced])

  return (
    <div
      ref={ref}
      className="w-full max-w-[440px] rounded-2xl border border-acid/15 bg-gradient-to-b from-panel/90 to-ink2/90 p-6 shadow-[0_30px_80px_-30px_rgba(11,61,30,0.16)]"
    >
      <div className="mb-5 flex items-center justify-between font-mono text-[0.72rem] text-fg2">
        <span>Partner · P-456-GLOBAL</span>
        <span className="flex items-center gap-1.5 text-acid">
          <i className="size-[7px] rounded-full bg-acid shadow-[0_0_8px_var(--color-acid)] motion-safe:animate-live-dot" /> live
        </span>
      </div>
      <div className="mb-5 grid grid-cols-3 gap-3">
        <Metric k="Today's revenue">
          ₹<b className="text-acid">{rev}</b>L
        </Metric>
        <Metric k="Baskets">
          <b className="text-acid">{bkt}</b>
        </Metric>
        <Metric k="Stores online">
          <b className="text-acid">3</b>/3
        </Metric>
      </div>
      <div className="mb-4 flex h-24 items-end gap-1.5 rounded-xl bg-acid/[0.06] p-2.5">
        {bars.map((h, i) => (
          <i
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-acid/25 to-acid transition-[height] duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{ height: `${h}%`, minHeight: 4 }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[
          ['S-101 · Pune', '₹6.1L'],
          ['S-102 · Mumbai', '₹7.9L'],
          ['S-105 · Nashik', '₹4.4L'],
        ].map(([s, v]) => (
          <div key={s} className="flex items-center gap-2 text-[0.8rem] text-fg2">
            <i className="size-[7px] rounded-full bg-acid" />
            {s}
            <b className="ml-auto font-mono text-[0.76rem] font-normal text-fg">{v}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

function Metric({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div>
      <span className="mb-1 block text-[0.66rem] text-fg3">{k}</span>
      <span className="font-display text-[1.15rem] font-bold text-fg">{children}</span>
    </div>
  )
}

export function UnifiedDashboard() {
  return (
    <section
      id="unified"
      className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)] lg:grid-cols-2"
    >
      <Reveal>
        <p className="mb-5 flex items-center gap-2.5 font-mono text-[0.72rem] tracking-[0.28em] text-acid3 uppercase">
          <span className="inline-block size-2 rounded-[3px] bg-gold" /> One login, every location
        </p>
        <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.5rem)] leading-[1.03] font-semibold tracking-[-0.02em]">
          Sign in once.
          <br />
          See everything you own.
        </h2>
        <p className="mt-5 max-w-[56ch] text-[1.06rem] text-fg2">
          Own three stores or three hundred — you get one login. See your whole chain at a glance,
          then drill into any single store in a click. No extra passwords, no switching accounts,
          no month-end spreadsheet marathon.
        </p>

        <ul className="mt-8 flex flex-col gap-3">
          {[
            ['One secure login', 'for every store you own'],
            ['The big picture, instantly', 'today’s revenue and baskets across the chain'],
            ['Zoom into any store', 'without signing in again'],
          ].map(([b, s]) => (
            <li key={b} className="flex items-start gap-3 rounded-xl border border-black/[0.07] bg-black/[0.02] px-4 py-3.5">
              <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-acid/15 text-[0.7rem] text-acid">✓</span>
              <span className="text-[0.95rem] text-fg2">
                <b className="font-semibold text-fg">{b}</b> — {s}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="flex justify-center">
        <DashMock />
      </Reveal>
    </section>
  )
}
