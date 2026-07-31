import { MARKET_POINTS } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function MarketOpportunity() {
  return (
    <section id="market" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="The Opportunity"
        title={
          <>
            A massive market,
            <br />
            hiding in plain sight.
          </>
        }
        lede="Every day, millions of Indians pull into a petrol pump — a captive, high-traffic audience with nowhere to shop while they wait. QuickBasket turns that forecourt into a fresh convenience store."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {MARKET_POINTS.map((p, i) => (
          <Reveal key={p.b} delay={i * 80}>
            <article className="h-full rounded-2xl border border-black/[0.06] bg-panel p-8 text-center shadow-[0_18px_44px_-30px_rgba(11,61,30,0.3)] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-acid/25">
              <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-acid/[0.08] text-[1.7rem]">
                {p.ic}
              </div>
              <h3 className="mb-2 font-display text-[1.3rem] font-semibold">{p.b}</h3>
              <p className="text-[0.94rem] text-fg2">{p.t}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
