import { FUTURE } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function Future() {
  return (
    <section id="future" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        num="10"
        kicker="Where we’re headed"
        title="Room to grow, long after go-live."
        lede="QuickBasket is built to keep opening new doors for your business — new revenue, new markets, and a platform that grows with your ambition."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {FUTURE.map((f, i) => (
          <Reveal key={f.h} delay={i * 80}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-br from-[rgba(10,138,52,0.06)] to-panel p-8 transition-[transform,border-color] duration-400 hover:-translate-y-1.5 hover:border-acid/15">
              <div className="pointer-events-none absolute -top-[40%] -right-[20%] h-[120%] w-[60%] bg-[radial-gradient(circle,rgba(10,138,52,0.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <h3 className="relative mb-2.5 font-display text-[1.4rem] font-semibold">{f.h}</h3>
              <p className="relative text-[0.92rem] text-fg2">{f.p}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
