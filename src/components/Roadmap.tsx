import { PHASES } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { useInView } from '../hooks/useInView'

function Phase({ phase }: { phase: (typeof PHASES)[number] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  return (
    <article
      ref={ref}
      className="h-full rounded-2xl border border-black/[0.07] bg-gradient-to-b from-panel/50 to-ink2/35 p-8 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-acid/15"
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-md bg-acid px-2.5 py-1 font-mono text-[0.68rem] tracking-[0.12em] text-ink uppercase">
          {phase.tag}
        </span>
        <span className="font-mono text-[0.72rem] text-fg2">{phase.time}</span>
      </div>
      <h3 className="mb-2.5 font-display text-[1.5rem] font-semibold tracking-[-0.01em]">{phase.title}</h3>
      <p className="mb-5 text-[0.9rem] text-fg2">{phase.body}</p>
      <ul className="mb-6 flex flex-col gap-2.5">
        {phase.list.map((li) => (
          <li key={li} className="relative pl-5 text-[0.86rem] text-fg2 before:absolute before:left-0 before:text-acid before:content-['→']">
            {li}
          </li>
        ))}
      </ul>
      <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
        <i
          className="block h-full rounded-full bg-gradient-to-r from-acid to-acid3 transition-[width] duration-[1.3s] ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ width: inView ? `${phase.bar}%` : '0%' }}
        />
      </div>
    </article>
  )
}

export function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        num="07"
        kicker="Your rollout"
        title="Live in months, not years."
        lede="We start with what pays off fastest — getting your stores running — then layer on intelligence and growth. You see value at every step, not just at the end."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {PHASES.map((p, i) => (
          <Reveal key={p.tag} delay={i * 80}>
            <Phase phase={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
