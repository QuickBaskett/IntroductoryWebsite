import { useEffect, useState } from 'react'
import { INTEL_CONTENT, INTEL_TABS, VENDORS, type IntelTab } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useInView } from '../hooks/useInView'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/cn'

/* ── Churn gauge ── */
function Gauge({ play }: { play: boolean }) {
  const CIRC = 314
  const pct = 72
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState(CIRC)
  useEffect(() => {
    if (!play) return
    if (reduced) {
      setOffset(CIRC - (CIRC * pct) / 100)
      return
    }
    const t = setTimeout(() => setOffset(CIRC - (CIRC * pct) / 100), 60)
    return () => clearTimeout(t)
  }, [play, reduced])

  return (
    <div className="model-card">
      <div className="mc-head">
        <span>Customer · Ananya R.</span>
        <span className="mc-tag">Live</span>
      </div>
      <div className="relative mx-auto mb-5 size-[150px]">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(11,61,30,0.1)" strokeWidth="9" />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)' }}
          />
        </svg>
        <div className="absolute inset-0 grid place-content-center text-center">
          <b className="font-display text-[2.3rem] leading-none font-bold text-gold">72</b>
          <small className="mt-0.5 block font-mono text-[0.6rem] tracking-[0.12em] text-fg3">churn risk</small>
        </div>
      </div>
      <div className="border-t border-black/[0.07] pt-4 text-center">
        <span className="mb-1.5 block text-[0.62rem] tracking-[0.14em] text-gold uppercase">Next Best Offer</span>
        <b className="text-[1rem] text-fg">Organic Almond Milk · 1L</b>
        <em className="mt-1 block font-mono text-[0.66rem] text-fg3 not-italic">confidence 0.91</em>
      </div>
    </div>
  )
}

/* ── Demand forecast bars ── */
function Forecast({ play }: { play: boolean }) {
  const reduced = useReducedMotion()
  const past = [42, 55, 38, 61, 48, 70, 52]
  const fut = [66, 74, 63, 82]
  const bars = [...past.map((v) => ({ v, fut: false })), ...fut.map((v) => ({ v, fut: true }))]
  return (
    <div className="model-card">
      <div className="mc-head">
        <span>Whole Wheat Atta · 5kg</span>
        <span className="mc-tag">Forecast</span>
      </div>
      <div className="mb-5 flex h-[150px] items-end gap-[5px] py-2">
        {bars.map((b, i) => (
          <i
            key={i}
            className={cn('flex-1 rounded-t transition-[height] duration-1000 ease-[cubic-bezier(.22,1,.36,1)]', b.fut ? 'bg-gradient-to-t from-acid/30 to-acid' : 'bg-black/[0.12]')}
            style={{ height: play || reduced ? `${b.v}%` : '6px', minHeight: 6, transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
      <div className="border-t border-black/[0.07] pt-4 text-center">
        <span className="mb-1.5 block text-[0.62rem] tracking-[0.14em] text-acid3 uppercase">Suggested order</span>
        <b className="font-display text-[1.5rem] text-acid">+ 480 units</b>
        <em className="mt-1 block font-mono text-[0.66rem] text-fg3 not-italic">ready for your approval</em>
      </div>
    </div>
  )
}

/* ── Vendor scorecards ── */
function Vendors({ play }: { play: boolean }) {
  const reduced = useReducedMotion()
  return (
    <div className="model-card">
      <div className="mc-head">
        <span>Vendor scorecard</span>
        <span className="mc-tag">Q3 · dynamic</span>
      </div>
      <div className="flex flex-col gap-4 pt-1">
        {VENDORS.map(([name, score], i) => (
          <div key={name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <span className="text-[0.82rem] text-fg">{name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
              <i
                className="block h-full rounded-full bg-gradient-to-r from-aqua to-acid transition-[width] duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ width: play || reduced ? `${score}%` : '0%', transitionDelay: `${i * 120}ms` }}
              />
            </span>
            <span className="font-mono text-[0.78rem] text-acid">{score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Intelligence() {
  const [tab, setTab] = useState<IntelTab>('customer')
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const c = INTEL_CONTENT[tab]

  return (
    <section
      id="intelligence"
      ref={ref}
      className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]"
    >
      <SectionHeading
        center
        num="04"
        kicker="Built-in Intelligence"
        title={
          <>
            Software that helps
            <br />
            <span className="text-acid">grow your business</span> for you.
          </>
        }
        lede="QuickBasket doesn’t just record what happened — it looks ahead. Every sale sharpens its forecasts, spots your best customers, and quietly gets your next order ready."
      />

      <Reveal delay={80} className="mx-auto mt-12 mb-10 flex flex-col justify-center gap-2 sm:flex-row">
        {INTEL_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            role="tab"
            aria-selected={tab === t.key}
            className={cn(
              'rounded-full border px-5 py-2.5 text-[0.92rem] font-semibold transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)]',
              tab === t.key
                ? 'border-acid bg-acid text-ink shadow-[0_6px_24px_rgba(10,138,52,0.25)]'
                : 'border-black/[0.07] bg-black/[0.02] text-fg2 hover:border-acid/15 hover:text-fg',
            )}
          >
            {t.label}
          </button>
        ))}
      </Reveal>

      <div key={tab} className="grid grid-cols-1 items-center gap-12 motion-safe:animate-panel-in lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.02em]">
            {c.title}
          </h3>
          <p className="mb-7 text-fg2">{c.lede}</p>
          <div className="flex flex-col gap-4">
            {c.features.map((f) => (
              <div key={f.b} className="flex items-start gap-4">
                <span className="grid size-[38px] flex-none place-items-center rounded-xl border border-acid/15 bg-acid/[0.08] text-[1.1rem] text-acid">
                  {f.ic}
                </span>
                <div>
                  <b className="block text-[1rem]">{f.b}</b>
                  <small className="text-[0.86rem] leading-relaxed text-fg2">{f.t}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          {tab === 'customer' && <Gauge play={inView} />}
          {tab === 'restock' && <Forecast play={inView} />}
          {tab === 'market' && <Vendors play={inView} />}
        </div>
      </div>
    </section>
  )
}
