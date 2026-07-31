import { Fragment } from 'react'
import { WHY_WE_WIN } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function WhyWeWin() {
  return (
    <section id="why-we-win" className="mx-auto max-w-[1100px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="Why we win"
        title={
          <>
            The math works — where
            <br />
            high-street retail can’t.
          </>
        }
        lede="A stark contrast with chaotic, expensive high-street stores: lower cost, customers who are already there, and a payback measured in months."
      />

      <Reveal className="mt-14 overflow-x-auto rounded-2xl border border-black/[0.07] shadow-[0_24px_60px_-34px_rgba(11,61,30,0.32)]">
        <div className="grid min-w-[520px] grid-cols-[1.1fr_1fr_1.2fr]">
          {/* header */}
          <div className="bg-panel p-4 sm:p-5" />
          <div className="bg-panel p-4 text-center font-semibold text-fg2 sm:p-5">High-street retail</div>
          <div className="flex items-center justify-center gap-2 bg-acid/[0.07] p-4 text-center font-display font-bold text-acid sm:p-5">
            QuickBasket
          </div>

          {WHY_WE_WIN.map((r) => (
            <Fragment key={r.metric}>
              <div className="border-t border-black/[0.06] bg-panel p-4 text-[0.9rem] font-semibold text-fg sm:p-5">
                {r.metric}
              </div>
              <div className="border-t border-black/[0.06] bg-panel p-4 text-center text-[0.9rem] text-fg2 sm:p-5">
                {r.high}
              </div>
              <div className="border-t border-black/[0.06] bg-acid/[0.06] p-4 text-center text-[0.9rem] font-semibold text-acid3 sm:p-5">
                {r.qb}
              </div>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
