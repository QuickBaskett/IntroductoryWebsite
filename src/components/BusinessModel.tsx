import { BUSINESS_MODELS } from '../lib/content'
import { MODULE_ICONS } from './icons'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function BusinessModel() {
  return (
    <section id="model" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="Ways to Partner"
        title="Four ways in. One fast payback."
        lede="A scalable, capital-light model with PSU-backed rents well below market — whether you want your own store, a multi-brand outlet, our full brand, or just the advertising reach."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BUSINESS_MODELS.map((m, i) => {
          const Icon = MODULE_ICONS[m.icon]
          return (
            <Reveal key={m.tag} delay={(i % 4) * 70}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-panel p-7 shadow-[0_18px_44px_-30px_rgba(11,61,30,0.28)] transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-acid/25">
                <span className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-gold to-acid" />
                <div className="mb-4 grid size-11 place-items-center rounded-xl border border-acid/15 bg-acid/[0.08] text-acid">
                  <Icon className="size-[22px]" />
                </div>
                <span className="mb-1.5 inline-block font-mono text-[0.66rem] tracking-[0.14em] text-gold uppercase">
                  {m.tag}
                </span>
                <h3 className="mb-2 font-display text-[1.28rem] font-semibold tracking-[-0.01em]">{m.title}</h3>
                <p className="text-[0.9rem] text-fg2">{m.body}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-acid/10 px-3 py-1 font-mono text-[0.68rem] font-bold text-acid3">
                  {m.meta}
                </span>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
