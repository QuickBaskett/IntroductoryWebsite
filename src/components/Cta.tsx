import { Reveal } from './Reveal'
import { Button, Arrow } from './Button'
import { demoTriggerProps } from '../lib/demo'

export function Cta() {
  return (
    <section id="contact" className="mx-auto mb-20 max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)]" data-testid="contact-section">
      <Reveal className="cta-panel relative overflow-hidden rounded-[2rem] border border-white/10 px-8 py-[clamp(3rem,7vw,5.5rem)] text-left sm:px-14">
        <p className="mb-5 inline-flex items-center justify-center gap-2.5 font-mono text-[0.74rem] tracking-[0.2em] text-fg2 uppercase">
          <span className="size-[7px] rounded-full bg-acid shadow-[0_0_10px_var(--color-acid)] motion-safe:animate-pulse-dot" />
          Bring the next stop to life
        </p>
        <h2 className="mb-4 max-w-[11ch] font-display text-[clamp(2.1rem,5.5vw,4.6rem)] leading-[1.02] font-semibold tracking-[-.04em]">
          Make every mile matter.
        </h2>
        <p className="mx-auto mb-8 max-w-[52ch] text-[1.05rem] text-fg2">
          Whether you are a fuel-station owner, local maker, franchise partner or EV traveller, there is a place for you in the QuickBasket journey.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button {...demoTriggerProps()} size="lg" data-testid="closing-contact-button">
            Start a conversation <Arrow />
          </Button>
          <Button href="#top" size="lg" variant="ghost">
            Back to top
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
