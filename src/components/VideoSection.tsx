import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

export function VideoSection() {
  return (
    <section id="video" className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
      <SectionHeading
        center
        kicker="Watch the story"
        title="The whole idea, start to finish."
        lede="From the problem to the payoff — the QuickBasket vision in a few minutes. Grab a coffee and press play."
      />
      <Reveal className="mx-auto mt-12 max-w-[920px] overflow-hidden rounded-3xl border border-black/[0.07] bg-black shadow-[0_36px_80px_-36px_rgba(11,61,30,0.5)]">
        <video
          className="aspect-video w-full"
          controls
          preload="none"
          poster={asset('story-poster.jpg')}
          playsInline
        >
          <source src={asset('quickbasket-story.mp4')} type="video/mp4" />
          Your browser doesn’t support embedded video.
        </video>
      </Reveal>
    </section>
  )
}
