import { KPIS } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function Kpis() {
  return (
    <section id="kpis" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        num="09"
        kicker="The Payoff"
        title="Results you can measure."
        lede="This isn’t technology for its own sake. It’s lower costs, bigger baskets, and customers who keep coming back — the numbers that decide whether a store thrives."
      />
      <div className="mt-13 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((k, i) => (
          <Reveal key={k.s} delay={(i % 4) * 60}>
            <div className="h-full rounded-xl border border-black/[0.07] bg-black/[0.02] p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-acid/15">
              <b className="mb-3 block font-display text-[2rem] leading-none text-acid">{k.d}</b>
              <span className="mb-1.5 block text-[0.98rem] font-bold">{k.s}</span>
              <p className="text-[0.82rem] text-fg2">{k.p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
