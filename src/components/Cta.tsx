import { Reveal } from './Reveal'
import { Button, Arrow } from './Button'
import { demoTriggerProps } from '../lib/demo'

export function Cta() {
  return (
    <section id="contact" className="mx-auto mb-20 max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)]">
      <Reveal className="relative overflow-hidden rounded-3xl border border-acid/15 bg-[radial-gradient(680px_320px_at_50%_0%,rgba(245,138,26,0.16),transparent_62%),linear-gradient(180deg,#ffffff,#f3f0e6)] px-8 py-[clamp(3rem,7vw,5.5rem)] text-center">
        <p className="mb-5 inline-flex items-center justify-center gap-2.5 font-mono text-[0.74rem] tracking-[0.2em] text-fg2 uppercase">
          <span className="size-[7px] rounded-full bg-acid shadow-[0_0_10px_var(--color-acid)] motion-safe:animate-pulse-dot" />
          Ready when you are
        </p>
        <h2 className="mb-4 font-display text-[clamp(2.1rem,5.5vw,4rem)] leading-[1.02] font-semibold tracking-[-0.02em]">
          Let&apos;s build the future
          <br />
          of retail together.
        </h2>
        <p className="mx-auto mb-8 max-w-[52ch] text-[1.05rem] text-fg2">
          Bring your stores onto one intelligent platform — unified operations, predictive inventory,
          and a customer brain that never sleeps.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button {...demoTriggerProps()} size="lg">
            Request a demo <Arrow />
          </Button>
          <Button href="#top" size="lg" variant="ghost">
            Back to top
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
