import { STATS, type Stat } from '../lib/content'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function format(value: number, s: Stat): string {
  let core: string
  if (s.compact) {
    core = value >= 1000 ? (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + 'K' : Math.round(value).toString()
  } else if (s.decimals) {
    core = value.toFixed(s.decimals)
  } else {
    core = Math.round(value).toString()
  }
  return (s.prefix ?? '') + core + (s.suffix ?? '')
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const value = useCountUp(stat.target, active)
  return (
    <div className="bg-ink2 px-6 py-8">
      <div className="font-display text-[clamp(1.8rem,3.5vw,2.9rem)] leading-none font-bold tracking-[-0.02em] text-acid">
        {format(value, stat)}
      </div>
      <div className="mt-2.5 text-[0.82rem] text-fg2">
        {stat.label}
        {stat.ref && <em className="mt-0.5 block font-mono text-[0.64rem] tracking-[0.08em] text-fg3 not-italic">{stat.ref}</em>}
      </div>
    </div>
  )
}

export function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 })
  return (
    <section id="stats" className="px-[clamp(1.1rem,4vw,2.6rem)]">
      <div
        ref={ref}
        className="mx-auto mt-8 grid max-w-[1200px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-3 lg:grid-cols-5"
      >
        {STATS.map((s) => (
          <StatItem key={s.label} stat={s} active={inView} />
        ))}
      </div>
    </section>
  )
}
