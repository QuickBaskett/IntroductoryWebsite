import { OMC_PARTNERS, OMC_PROOF } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function OmcPartners() {
  return (
    <section id="omc" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="OMC Partnerships"
        title={
          <>
            Backed by India’s
            <br />
            biggest fuel networks.
          </>
        }
        lede="QuickBasket is built on tie-ups with the country’s public-sector oil marketing companies — privileged access to prime, high-footfall forecourt real estate at rents well below market."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {OMC_PARTNERS.map((o, i) => (
          <Reveal key={o.abbr} delay={i * 80}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-panel p-7 shadow-[0_18px_44px_-30px_rgba(11,61,30,0.28)] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-acid/25">
              <span className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: o.color }} />
              {/* real OMC logo on a clean white plate */}
              <div className="mb-5 flex h-24 items-center justify-center rounded-xl border border-black/[0.05] bg-white px-5">
                <img src={o.logo} alt={`${o.name} logo`} className="max-h-16 w-auto object-contain" loading="lazy" />
              </div>
              <span
                className="mb-2 inline-block font-mono text-[0.66rem] font-bold tracking-[0.14em] uppercase"
                style={{ color: o.color }}
              >
                {o.abbr} · OMC Partner
              </span>
              <p className="text-[0.92rem] text-fg2">{o.note}</p>
            </article>
          </Reveal>
        ))}
      </div>

      {/* proof strip */}
      <Reveal delay={120} className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.06] sm:grid-cols-3">
        {OMC_PROOF.map((p) => (
          <div key={p.b} className="bg-ink2 px-6 py-6 text-center">
            <div className="font-display text-[1.6rem] font-bold text-acid">{p.b}</div>
            <div className="mt-1 text-[0.85rem] text-fg2">{p.t}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
