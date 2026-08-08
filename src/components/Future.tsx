import { EV_AMENITIES, FUTURE } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

export function Future() {
  const [evCafe, ...rest] = FUTURE
  return (
    <section id="future" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="Where we’re headed"
        title="Room to grow, long after go-live."
        lede="QuickBasket is built to keep opening new doors for your business — new revenue, new markets, and a platform that grows with your ambition."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* EV Café — the flagship next step, shown as a real place */}
        <Reveal className="h-full">
          <article
            className="group relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-black/[0.07] shadow-[0_30px_70px_-38px_rgba(11,61,30,0.45)]"
            data-testid="future-ev-cafe"
          >
            <img
              src={asset('ev-cafe-forecourt.jpg')}
              alt="A QuickBasket EV Café concept — women-run store, café seating and EV charging on one forecourt"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
              <h3 className="mb-2 font-display text-[1.6rem] font-semibold tracking-[-0.01em] text-white">
                {evCafe.h}
              </h3>
              <p className="mb-4 max-w-[52ch] text-[0.92rem] text-white/85">{evCafe.p}</p>
              <div className="flex flex-wrap gap-2">
                {EV_AMENITIES.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-white/30 bg-white/15 px-3 py-1 font-mono text-[0.62rem] tracking-[0.12em] text-white uppercase backdrop-blur-sm"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>

        <div className="flex flex-col gap-5">
          {rest.map((f, i) => (
            <Reveal key={f.h} delay={(i + 1) * 80} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-black/[0.07] bg-gradient-to-br from-[rgba(10,138,52,0.06)] to-panel p-7 transition-[transform,border-color] duration-400 hover:-translate-y-1.5 hover:border-acid/15">
                <div className="pointer-events-none absolute -top-[40%] -right-[20%] h-[120%] w-[60%] bg-[radial-gradient(circle,rgba(10,138,52,0.12),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <h3 className="relative mb-2.5 font-display text-[1.35rem] font-semibold">{f.h}</h3>
                <p className="relative text-[0.92rem] text-fg2">{f.p}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
