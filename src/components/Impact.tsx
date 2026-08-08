import { IMPACT_CHIPS, IMPACT_FILM, IMPACT_PILLARS } from '../lib/content'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

/**
 * The people story behind the stores: women- and SHG-run kiosks selling
 * Uttarakhand produce, plus the proposal film made for the state
 * livelihoods mission.
 */
export function Impact() {
  return (
    <section
      id="impact"
      className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]"
    >
      <SectionHeading
        kicker="Women-led commerce"
        title={
          <>
            Powered by the women of <span className="text-acid">Uttarakhand.</span>
          </>
        }
        lede="A QuickBasket store is more than a point of sale — it's a rural enterprise. Women and self-help groups run the kiosks, and the hills' own produce fills the shelves."
      />

      <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
        <Reveal>
          <figure
            className="group relative overflow-hidden rounded-3xl border border-black/[0.07] shadow-[0_36px_80px_-36px_rgba(11,61,30,0.45)]"
            data-testid="impact-photo"
          >
            <img
              src={asset('impact-women-store.jpg')}
              alt="Women running a QuickBasket store stocked with Uttarakhand millets, honey and herbal products"
              loading="lazy"
              className="block w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 p-4">
              {IMPACT_CHIPS.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/25 bg-white/85 px-3 py-1 font-mono text-[0.64rem] font-medium tracking-[0.12em] text-fg uppercase backdrop-blur-sm"
                >
                  {c}
                </span>
              ))}
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col gap-7">
          {IMPACT_PILLARS.map((p, i) => (
            <Reveal key={p.b} delay={i * 90}>
              <h3 className="mb-1.5 flex items-center gap-2.5 font-display text-[1.22rem] font-semibold tracking-[-0.01em]">
                <span aria-hidden className="inline-block size-2 shrink-0 rounded-[3px] bg-gold" />
                {p.b}
              </h3>
              <p className="pl-[1.15rem] text-[0.95rem] text-fg2">{p.t}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* the proposal film */}
      <Reveal
        delay={100}
        className="mt-16 overflow-hidden rounded-3xl border border-black/[0.07] bg-panel shadow-[0_30px_70px_-38px_rgba(11,61,30,0.4)]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
            <p className="flex items-center gap-2.5 font-mono text-[0.7rem] tracking-[0.26em] text-acid3 uppercase">
              <span aria-hidden className="inline-block size-2 rounded-[3px] bg-gold" /> The film
            </p>
            <h3 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.12] font-semibold tracking-[-0.01em]">
              Women-led rural commerce, green development — the full case.
            </h3>
            <p className="text-[0.95rem] text-fg2">
              Our presentation to the Uttarakhand State Rural Livelihoods Mission: how SHG-run
              retail and EV infrastructure grow together — the community, the network, the
              platform, and the micro-entrepreneurs it creates.
            </p>
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-fg3 uppercase">
              ▸ {IMPACT_FILM.duration} · with sound
            </p>
          </div>
          <div className="bg-black">
            <video
              className="aspect-video h-full w-full"
              controls
              preload="none"
              poster={IMPACT_FILM.poster}
              playsInline
              data-testid="impact-film"
            >
              <source src={IMPACT_FILM.src} type="video/mp4" />
              Your browser doesn’t support embedded video.
            </video>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
