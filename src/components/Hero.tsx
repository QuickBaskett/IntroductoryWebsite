import { Reveal } from './Reveal'
import { Button, Arrow } from './Button'
import { PosTerminal } from './PosTerminal'
import { HERO_CHIPS } from '../lib/content'

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-[clamp(1.1rem,4vw,2.6rem)] pt-32 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pt-36">
        {/* copy */}
        <div className="max-w-[640px]">
          <Reveal
            as="p"
            className="inline-flex items-center gap-2.5 font-mono text-[0.74rem] tracking-[0.2em] text-fg2 uppercase"
          >
            <span className="size-[7px] rounded-full bg-gold shadow-[0_0_10px_var(--color-gold)] motion-safe:animate-pulse-dot" />
            QuickBasket · Fast. Fresh. To Your Doorstep.
          </Reveal>

          <h1 className="my-6 font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
            <Reveal as="span" className="block">
              Fresh groceries,
            </Reveal>
            <Reveal as="span" delay={80} className="block">
              right at the <span className="text-acid">pump.</span>
            </Reveal>
          </h1>

          <Reveal as="p" delay={160} className="max-w-[52ch] text-[clamp(1rem,1.4vw,1.16rem)] text-fg2">
            QuickBasket brings a bright, modern grocery store to the one place millions of Indians
            stop every week — the <strong className="font-bold text-fg">petrol pump</strong>. Shop
            fresh essentials in seconds while you fuel up, powered by smart inventory and
            offline-ready checkout.
          </Reveal>

          <Reveal delay={240} className="mt-8 flex flex-wrap gap-3">
            <Button href="#market" size="lg">
              Explore the opportunity <Arrow />
            </Button>
            <Button href="#video" size="lg" variant="ghost">
              ▸ Watch the story
            </Button>
          </Reveal>

          <Reveal delay={320} className="mt-9 flex flex-wrap gap-2">
            {HERO_CHIPS.map((c) => (
              <span
                key={c.b}
                className="rounded-md border border-black/[0.07] bg-black/[0.02] px-3 py-1.5 font-mono text-[0.72rem] text-fg2"
              >
                <b className="font-normal text-acid">{c.b}</b> {c.t}
              </span>
            ))}
          </Reveal>
        </div>

        {/* terminal */}
        <Reveal delay={200} className="w-full max-w-[480px] justify-self-center lg:max-w-none">
          <PosTerminal />
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
