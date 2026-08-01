import { useMemo, useState } from 'react'
import { INDIA_STATES, INDIA_VIEWBOX, projectIndia } from '../lib/indiaMap'
import {
  NETWORK_ACTIVE_STORES,
  NETWORK_LIVE,
  NETWORK_PROOF,
  NETWORK_STATE_COUNT,
  NETWORK_TOTAL,
} from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useInView } from '../hooks/useInView'
import { cn } from '../lib/cn'

/* Animation timeline (ms after the map scrolls into view) */
const STATE_STAGGER = 16
const MARKERS_AT = 480
const ARCS_AT = 760
const ARC_STAGGER = 110

type Tip = { x: number; y: number; title: string; sub?: string }

/** Departure point for the route arcs — the Uttarakhand home base. */
const HUB = { lat: 30.18, lng: 78.2 }

/** Live-state fills, so the six trading states read as one shaded region. */
const LIVE_IDS = new Set(NETWORK_LIVE.map((s) => s.id))

function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1
  const dy = y2 - y1
  const d = Math.hypot(dx, dy) || 1
  // bow outward, flipping side so west- and east-bound arcs both bulge away
  const bow = Math.max(14, d * 0.18) * (dx < 0 ? 1 : -1)
  const cx = x1 + dx / 2 + (-dy / d) * bow
  const cy = y1 + dy / 2 + (dx / d) * bow
  return `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`
}

export function StoreNetwork() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tip, setTip] = useState<Tip | null>(null)
  const { w, h } = INDIA_VIEWBOX

  const live = useMemo(
    () => NETWORK_LIVE.map((c) => ({ ...c, ...projectIndia(c.lat, c.lng) })),
    [],
  )
  // arcs run from the home base out to every other live state
  const spokes = useMemo(() => live.slice(1), [live])
  const hub = projectIndia(HUB.lat, HUB.lng)
  const maxOutlets = Math.max(...NETWORK_LIVE.map((c) => c.outlets))

  return (
    <section
      id="network"
      className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]"
    >
      <SectionHeading
        center
        kicker="Our Network"
        title={
          <>
            Rooted in Uttarakhand.
            <br />
            Live in {NETWORK_STATE_COUNT} states.
          </>
        }
        lede={`${NETWORK_ACTIVE_STORES} stores are already trading across ${NETWORK_STATE_COUNT} states — from our Uttarakhand home base out to Delhi/NCR and as far south as Telangana — on OMC forecourts, highways and tourist routes, with new locations coming online every month.`}
      />

      <div ref={ref} className={cn('mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr]', inView && 'in-view')}>
        {/* ── Left: the live states, most outlets first ── */}
        <div className="flex flex-col gap-3">
          {live.map((c, i) => (
            <Reveal key={c.name} delay={i * 60}>
              <article
                className="rounded-2xl border border-black/[0.07] bg-panel px-5 py-4 shadow-[0_18px_44px_-30px_rgba(11,61,30,0.28)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-acid/25"
                onMouseEnter={() => setTip({ x: c.x, y: c.y, title: c.name, sub: `${c.outlets} outlets live` })}
                onMouseLeave={() => setTip(null)}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.08rem] font-bold">{c.name}</h3>
                  <span className="font-mono text-[0.95rem] font-bold whitespace-nowrap text-acid">
                    {c.outlets} <span className="text-[0.7rem] font-normal tracking-[0.1em] text-fg3 uppercase">outlets</span>
                  </span>
                </div>
                <p className="mt-0.5 text-[0.84rem] text-fg2">{c.sub}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-acid to-aqua transition-[width] duration-1000 ease-[cubic-bezier(.22,1,.36,1)]"
                    style={{
                      width: inView ? `${(c.outlets / maxOutlets) * 100}%` : '0%',
                      transitionDelay: `${300 + i * 110}ms`,
                    }}
                  />
                </div>
              </article>
            </Reveal>
          ))}

          {/* legend */}
          <Reveal delay={300} className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-2 px-1 text-[0.82rem] text-fg2">
            <span className="flex items-center gap-2">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-acid" />
              </span>
              Live state — marker scales with outlet count
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-flex h-0.5 w-5 rounded-full bg-gold" />
              Expansion from the Uttarakhand base
            </span>
          </Reveal>
        </div>

        {/* ── Right: the map ── */}
        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-[560px]">
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="block h-auto w-full overflow-visible"
              role="img"
              aria-label={`Map of India showing ${NETWORK_TOTAL} live QuickBasket outlets across ${NETWORK_STATE_COUNT} states`}
            >
              {/* states assemble in with a soft stagger */}
              <g>
                {INDIA_STATES.map((s, i) => {
                  const isLive = LIVE_IDS.has(s.id)
                  return (
                    <path
                      key={s.id}
                      d={s.d}
                      className={cn('map-state', !isLive && 'hover:fill-[#eef0e2]')}
                      style={{ transitionDelay: `${i * STATE_STAGGER}ms` }}
                      fill={isLive ? '#d3ecda' : '#f1eee2'}
                      stroke={isLive ? 'rgba(10,138,52,0.45)' : '#fcfbf6'}
                      strokeWidth={isLive ? 1.4 : 0.8}
                      strokeLinejoin="round"
                    >
                      <title>{s.name}</title>
                    </path>
                  )
                })}
              </g>

              {/* route arcs out of Uttarakhand */}
              <g fill="none">
                {spokes.map((c, i) => {
                  const d = arcPath(hub.x, hub.y, c.x, c.y)
                  return (
                    <g key={c.name}>
                      <path
                        d={d}
                        pathLength={1}
                        className="map-arc"
                        style={{ transitionDelay: `${ARCS_AT + i * ARC_STAGGER}ms` }}
                        stroke="rgba(245,138,26,0.35)"
                        strokeWidth={1.4}
                      />
                      {inView && (
                        <path
                          d={d}
                          pathLength={1}
                          className="map-flow"
                          style={{ animationDelay: `${ARCS_AT + i * ARC_STAGGER + 900}ms` }}
                          stroke="rgba(245,138,26,0.8)"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                        />
                      )}
                    </g>
                  )
                })}
              </g>

              {/* live state markers — radius carries the outlet count */}
              {inView && (
                <g>
                  {live.map((c, i) => {
                    const r = 4 + (c.outlets / maxOutlets) * 3.2
                    return (
                      <g
                        key={c.name}
                        onMouseEnter={() =>
                          setTip({ x: c.x, y: c.y, title: c.name, sub: `${c.outlets} outlets live` })
                        }
                        onMouseLeave={() => setTip(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={r + 1.2}
                          className="map-ping"
                          style={{ animationDelay: `${MARKERS_AT + i * 140}ms` }}
                          fill="none"
                          stroke="#0a8a34"
                          strokeWidth={1.2}
                        />
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={r}
                          className="map-pop"
                          style={{ animationDelay: `${MARKERS_AT + i * 140}ms` }}
                          fill="#0a8a34"
                          stroke="#fff"
                          strokeWidth={1.8}
                        />
                        <circle cx={c.x} cy={c.y} r={14} fill="transparent" />
                      </g>
                    )
                  })}
                </g>
              )}

              {/* cluster callout — too small to read once the map shrinks below ~sm */}
              {inView && (
                <g
                  className="map-pop hidden sm:block"
                  style={{ animationDelay: `${MARKERS_AT + 420}ms` }}
                  pointerEvents="none"
                >
                  <line
                    x1={hub.x + 22}
                    y1={hub.y - 26}
                    x2={hub.x + 8}
                    y2={hub.y - 8}
                    stroke="rgba(10,138,52,0.5)"
                    strokeWidth={1}
                  />
                  <g transform={`translate(${hub.x + 22}, ${hub.y - 56})`}>
                    <rect width={168} height={34} rx={17} fill="#0a8a34" />
                    <text
                      x={84}
                      y={22}
                      textAnchor="middle"
                      fill="#fff"
                      style={{ font: '700 13.5px Manrope, sans-serif' }}
                    >
                      {NETWORK_TOTAL} live · {NETWORK_STATE_COUNT} states
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {/* hover tooltip */}
            <div
              className={cn(
                'pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-black/[0.07] bg-panel px-3.5 py-2 whitespace-nowrap shadow-[0_14px_30px_-14px_rgba(11,61,30,0.35)] transition-opacity duration-200',
                tip ? 'opacity-100' : 'opacity-0',
              )}
              style={{
                left: `${((tip?.x ?? 0) / w) * 100}%`,
                top: `calc(${((tip?.y ?? 0) / h) * 100}% - 12px)`,
              }}
            >
              <div className="text-[0.85rem] font-bold text-fg">{tip?.title}</div>
              {tip?.sub && <div className="font-mono text-[0.7rem] text-acid3">{tip.sub}</div>}
            </div>

            <p className="mt-3 text-center text-[0.74rem] text-fg3">
              Markers sit at a representative point in each live state.
            </p>
          </div>
        </Reveal>
      </div>

      {/* proof strip */}
      <Reveal delay={120} className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-3">
        {NETWORK_PROOF.map((p) => (
          <div key={p.t} className="bg-ink2 px-6 py-6 text-center">
            <div className="font-display text-[1.6rem] font-bold text-acid">{p.b}</div>
            <div className="mt-1 text-[0.85rem] text-fg2">{p.t}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
