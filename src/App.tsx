import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { MarketOpportunity } from './components/MarketOpportunity'
import { StoreFormat } from './components/StoreFormat'
import { VideoSection } from './components/VideoSection'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { DemoDialog } from './components/DemoDialog'
import { StoryChapters } from './components/StoryChapters'
import { Future } from './components/Future'

export default function App() {
  return (
    <div className="site-shell relative">
      <div className="grain" aria-hidden />
      <Nav />
      <main id="top" className="relative z-[2]">
        <Hero />
        <Stats />
        <MarketOpportunity />
        <StoryChapters />
        <StoreFormat />
        <VideoSection />
        <Future />
        <Cta />
      </main>
      <div className="relative z-[2]">
        <Footer />
      </div>
      <DemoDialog />
    </div>
  )
}
