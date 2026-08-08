import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

const chapters = [
  { no: '02', title: 'A shelf for the hills', body: 'Mandua, rajma, honey, herbs and hand-made goods travel from Uttarakhand makers to the people passing through.', image: asset('store-corner.jpg'), label: 'Local products' },
  { no: '03', title: 'A livelihood with a front door', body: 'Every store creates a visible, dignified route to market for women-led collectives and rural communities.', image: asset('store-flagship.jpg'), label: 'Women-led' },
  { no: '04', title: 'A pause that gives back', body: 'The next QuickBasket stop pairs essential shopping with EV charging, coffee and a little room to breathe.', image: asset('store-neon.jpg'), label: 'EV café future' },
]

export function StoryChapters() {
  return (
    <section id="story" className="story-band" data-testid="mission-story-section">
      <div className="mx-auto max-w-[1200px] px-[clamp(1.1rem,4vw,2.6rem)] py-[clamp(5rem,11vw,9rem)]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">The QuickBasket idea</p>
            <h2 className="mt-5 max-w-[11ch] font-display text-[clamp(2.3rem,5vw,4.4rem)] leading-[.96] tracking-[-.045em]">Local roots. <span className="text-acid">Longer roads.</span></h2>
            <p className="mt-6 max-w-[34ch] text-[1.02rem] text-fg2">We are building a network where convenience, community and a greener journey can share the same address.</p>
            <div className="route-line mt-10 hidden lg:block"><span className="route-dot" /><span className="route-dot" /><span className="route-dot" /></div>
          </Reveal>
          <div className="space-y-6">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.no} delay={index * 100} className="story-card group grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-black/[.08] bg-panel sm:grid-cols-[.9fr_1.1fr]">
                <div className="relative min-h-[250px] overflow-hidden sm:min-h-0"><img src={chapter.image} alt={`${chapter.label} at QuickBasket`} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[.64rem] tracking-[.14em] text-fg2 uppercase">{chapter.label}</span></div>
                <div className="flex flex-col justify-between p-7 sm:p-9"><div><span className="font-mono text-[.7rem] tracking-[.18em] text-gold">{chapter.no}</span><h3 className="mt-5 font-display text-[clamp(1.65rem,3vw,2.5rem)] leading-[1] tracking-[-.03em]">{chapter.title}</h3><p className="mt-4 text-[.96rem] text-fg2">{chapter.body}</p></div><span className="mt-8 font-mono text-[.65rem] tracking-[.14em] text-acid uppercase">QuickBasket / chapter {chapter.no}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}