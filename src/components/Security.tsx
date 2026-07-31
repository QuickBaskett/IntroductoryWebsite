import { SECURITY } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function Security() {
  return (
    <section id="security" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        num="08"
        kicker="Trust & Compliance"
        title={
          <>
            Serious about security.
            <br />
            Built for India.
          </>
        }
        lede="Your sales, your customers and your money are protected to enterprise standards — and everything stays compliant with Indian tax and data rules, out of the box."
      />
      <div className="mt-13 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map((s, i) => (
          <Reveal key={s.h} delay={(i % 3) * 60}>
            <div className="h-full rounded-2xl border border-black/[0.07] bg-black/[0.02] p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-acid/15">
              <span className="mb-4 block text-2xl">{s.ic}</span>
              <h4 className="mb-2 font-display text-[1.12rem] font-semibold">{s.h}</h4>
              <p className="text-[0.88rem] text-fg2">{s.p}</p>
              {s.ref && <em className="mt-3.5 block font-mono text-[0.64rem] tracking-[0.06em] text-acid3 not-italic">{s.ref}</em>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
