import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

export function VideoSection() {
  return (
    <section id="video" className="video-section mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]" data-testid="video-story-section">
      <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[.7fr_1.3fr]"><SectionHeading kicker="Watch the story" title="See what a better stop feels like." lede="From the people behind the products to the places where journeys pause — take a closer look at QuickBasket." /><span className="hidden pb-2 font-mono text-[.68rem] tracking-[.18em] text-white/50 uppercase lg:block">Play / pause / discover</span></div>
      <Reveal className="media-frame mt-12 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_36px_80px_-36px_rgba(11,61,30,.5)]">
        <video className="aspect-video w-full object-cover" controls preload="none" poster={asset('story-poster.jpg')} playsInline data-testid="primary-story-video"><source src={asset('quickbasket-story.mp4')} type="video/mp4" />Your browser doesn’t support embedded video.</video>
        <p className="border-t border-white/10 px-5 py-4 text-[.82rem] text-white/65">QuickBasket is a retail network rooted in Uttarakhand, designed to make every forecourt stop more useful, human and connected.</p>
      </Reveal>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {['https://customer-assets-v7afamib.emergentagent.net/job_49f4c27b-0c5b-4366-a04d-aaca0e98e8de/artifacts/2zh223w3_WhatsApp%20Video%202026-08-01%20at%2016.08.53.mp4','https://customer-assets-v7afamib.emergentagent.net/job_49f4c27b-0c5b-4366-a04d-aaca0e98e8de/artifacts/hjuhjila_WhatsApp%20Video%202026-08-01%20at%2016.11.23.mp4'].map((src, index) => <Reveal key={src} delay={index * 80} className="overflow-hidden rounded-[1.25rem] border border-black/[.08] bg-panel"><video className="aspect-video w-full object-cover" controls preload="none" playsInline data-testid={`field-story-video-${index + 1}`}><source src={src} type="video/mp4" /></video><p className="px-4 py-3 font-mono text-[.65rem] tracking-[.14em] text-fg2 uppercase">Field story / 0{index + 1}</p></Reveal>)}
      </div>
    </section>
  )
}
