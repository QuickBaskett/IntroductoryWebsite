import { AUDIENCE } from '../lib/content'
import { MODULE_ICONS } from './icons'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

export function Audience() {
  return (
    <section id="audience" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        num="02"
        kicker="Who it’s for"
        title="One platform. Every person in your business."
        lede="From the person behind the till to the partner who owns fifty stores — QuickBasket gives everyone their own reason to love it."
      />
      <div className="mt-13 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {AUDIENCE.map((a, i) => {
          const Icon = MODULE_ICONS[a.icon]
          return (
            <Reveal key={a.role} delay={(i % 2) * 70}>
              <article className="flex h-full items-start gap-5 rounded-2xl border border-black/[0.07] bg-gradient-to-b from-panel/45 to-ink2/30 p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-acid/15">
                <div className="grid size-12 flex-none place-items-center rounded-xl border border-acid/15 bg-acid/[0.08] text-acid">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="mb-1.5 font-display text-[1.25rem] font-semibold tracking-[-0.01em]">{a.role}</h3>
                  <p className="text-[0.94rem] text-fg2">{a.gain}</p>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
