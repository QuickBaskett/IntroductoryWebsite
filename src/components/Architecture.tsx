import { ARCH_LAYERS, DATABASES, type ArchLayer } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { cn } from '../lib/cn'

const ACCENT_TEXT: Record<ArchLayer['accent'], string> = {
  aqua: 'text-aqua',
  acid: 'text-acid',
  gold: 'text-gold',
}
const ACCENT_HOVER: Record<ArchLayer['accent'], string> = {
  aqua: 'hover:shadow-[inset_3px_0_0_var(--color-aqua)]',
  acid: 'hover:shadow-[inset_3px_0_0_var(--color-acid)]',
  gold: 'hover:shadow-[inset_3px_0_0_var(--color-gold)]',
}

function Bus({ label, color }: { label: string; color: 'acid' | 'gold' }) {
  const dotClass = color === 'acid' ? 'bg-acid shadow-[0_0_8px_var(--color-acid)]' : 'bg-gold shadow-[0_0_8px_var(--color-gold)]'
  return (
    <div className="flex flex-col items-center gap-2 py-3.5" aria-hidden>
      <span className="font-mono text-[0.64rem] tracking-[0.12em] text-fg3 uppercase">{label}</span>
      <div className="relative h-[34px] w-0.5 overflow-hidden rounded bg-acid/15">
        {[0, 0.6, 1.2].map((d) => (
          <i
            key={d}
            className={cn('bus-packet absolute -left-px size-1 rounded-full', dotClass)}
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  )
}

function Layer({ layer }: { layer: ArchLayer }) {
  return (
    <div
      data-layer={layer.key}
      className={cn(
        'rounded-2xl border border-black/[0.07] bg-gradient-to-b from-panel/50 to-ink2/35 p-7 transition-[border-color,background,box-shadow] duration-300',
        'hover:border-acid/15 hover:from-[rgba(10,138,52,0.09)] hover:to-[rgba(10,138,52,0.02)]',
        ACCENT_HOVER[layer.accent],
      )}
    >
      <div className={cn('mb-2 font-mono text-[0.74rem] tracking-[0.1em] uppercase', ACCENT_TEXT[layer.accent])}>
        {layer.tag}
      </div>
      <p className="mb-5 max-w-[70ch] text-[0.9rem] text-fg2">{layer.desc}</p>
      <div className="flex flex-wrap gap-2.5">
        {layer.nodes.map((n) => (
          <span
            key={n.b}
            className="flex flex-col gap-0.5 rounded-lg border border-black/[0.06] bg-white px-3.5 py-2.5 transition-[transform,border-color,background] duration-300 hover:-translate-y-0.5 hover:border-acid/15 hover:bg-acid/[0.05]"
          >
            <b className="text-[0.82rem] font-semibold">{n.b}</b>
            <small className="font-mono text-[0.62rem] text-fg3">{n.s}</small>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        num="05"
        kicker="Why QuickBasket"
        title={
          <>
            Built for the real world
            <br />
            of running stores.
          </>
        }
        lede="Enterprise power, without the enterprise headaches. Three things work together — every store keeps selling, your whole chain stays in sync, and intelligence runs quietly in the background."
      />

      <Reveal delay={80} className="mt-14">
        <Layer layer={ARCH_LAYERS[0]} />
        <Bus label="Everything in sync — in real time" color="acid" />
        <Layer layer={ARCH_LAYERS[1]} />
        <Bus label="Insights flow back to every store" color="gold" />
        <Layer layer={ARCH_LAYERS[2]} />
      </Reveal>

      <Reveal className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {DATABASES.map((d) => (
          <div
            key={d.b}
            className="rounded-xl border border-black/[0.07] bg-black/[0.02] px-5 py-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-acid/15"
          >
            <b className="mb-1 block font-display text-[1.05rem]">{d.b}</b>
            <small className="text-[0.78rem] text-fg2">{d.s}</small>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
