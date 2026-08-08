import { Reveal } from './Reveal'
import { Button, Arrow } from './Button'
import { asset } from '../lib/asset'

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-[clamp(1.1rem,4vw,2.6rem)] pt-32 pb-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:pt-40 lg:pb-28">
        {/* copy */}
        <div className="max-w-[640px]">
          <Reveal
            as="p"
            className="inline-flex items-center gap-2.5 font-mono text-[0.74rem] tracking-[0.2em] text-fg2 uppercase"
          >
            <span className="size-[7px] rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)] motion-safe:animate-pulse-dot" />
            Uttarakhand → everywhere · QuickBasket
          </Reveal>

          <h1 className="my-6 font-display text-[clamp(2.6rem,7vw,5.4rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            <Reveal as="span" className="block">
              A better stop
            </Reveal>
            <Reveal as="span" delay={80} className="block">
              starts at the <span className="text-acid">pump.</span>
            </Reveal>
          </h1>

          <Reveal as="p" delay={160} className="max-w-[52ch] text-[clamp(1rem,1.4vw,1.16rem)] text-fg2">
            QuickBasket puts local goodness, everyday essentials and warm hospitality into the journeys people already make. Shop from Uttarakhand makers while you fuel, pause, or pass through.
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <Button href="#store" size="lg" data-testid="hero-explore-stores-button">
              Explore the stores <Arrow />
            </Button>
            <Button href="#video" size="lg" variant="ghost" data-testid="hero-watch-story-button">
              Watch the story <span aria-hidden>↗</span>
            </Button>
          </Reveal>

          <Reveal delay={320} className="mt-10 flex items-center gap-4 text-[0.78rem] text-fg2">
            <span className="grid size-10 place-items-center rounded-full border border-acid/20 bg-acid/5 text-acid">01</span>
            <span><b className="block font-mono text-[0.68rem] tracking-[0.18em] text-acid uppercase">From the hills</b> Local products. Women-led livelihoods.</span>
          </Reveal>
        </div>

        <Reveal delay={180} className="hero-media w-full justify-self-center">
          <figure className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-forest shadow-[0_35px_80px_-32px_rgba(23,77,50,0.55)]">
            <img src={asset('store-pump-iocl.jpg')} alt="QuickBasket store glowing beside a petrol pump" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10281b]/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
              <span><b className="block font-display text-2xl">The living forecourt</b><small className="font-mono text-[0.68rem] tracking-[0.16em] text-white/70 uppercase">A stop worth making</small></span>
              <span className="rounded-full border border-white/30 bg-white/15 px-3 py-2 font-mono text-[0.65rem] backdrop-blur">30.3165° N</span>
            </figcaption>
          </figure>
          <div className="mt-4 flex items-center justify-between font-mono text-[0.65rem] tracking-[0.14em] text-fg3 uppercase"><span>01 / Home state</span><span>Dehradun · Uttarakhand</span></div>
        </Reveal>
      </div>

      <a
        href="#stats"
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.6rem] tracking-[0.25em] text-fg3 uppercase md:flex"
        aria-hidden
      >
        <span>scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-gradient-to-b from-acid to-transparent">
          <span className="absolute top-0 left-0 h-2.5 w-full bg-acid motion-safe:animate-scroll-dot" />
        </span>
      </a>
    </section>
  )
}
