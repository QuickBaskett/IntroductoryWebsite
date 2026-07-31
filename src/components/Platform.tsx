import { useRef } from 'react'
import type { PointerEvent } from 'react'
import { MODULES, type Module } from '../lib/content'
import { MODULE_ICONS } from './icons'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'

function ModuleCard({ m }: { m: Module }) {
  const ref = useRef<HTMLElement>(null)
  const Icon = MODULE_ICONS[m.icon]

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-b from-panel/55 to-ink2/35 p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:border-acid/15 hover:shadow-[0_24px_50px_-28px_rgba(11,61,30,0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_200px_at_var(--mx,50%)_var(--my,0%),rgba(10,138,52,0.09),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-5 grid size-11 place-items-center rounded-xl border border-acid/15 bg-acid/[0.08] text-acid">
          <Icon className="size-[23px]" />
        </div>
        <h3 className="mb-2.5 font-display text-[1.28rem] font-semibold tracking-[-0.01em]">{m.title}</h3>
        <p className="text-[0.94rem] text-fg2">{m.body}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {m.tags.map((t) => (
            <li
              key={t}
              className="rounded border border-acid/15 bg-acid/[0.04] px-1.5 py-1 font-mono text-[0.62rem] text-acid3"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Platform() {
  return (
    <section id="platform" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        num="01"
        kicker="The Platform"
        title="Everything your stores need, in one place."
        lede="No more stitching together a till, a stock sheet, a purchasing tool and five spreadsheets. QuickBasket brings your whole operation — people, products, purchasing and payments — under one roof."
      />
      <div className="mt-13 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m, i) => (
          <Reveal key={m.title} delay={(i % 3) * 60}>
            <ModuleCard m={m} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
