import { NetworkCanvas } from './components/NetworkCanvas'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { MarketOpportunity } from './components/MarketOpportunity'
import { StoreFormat } from './components/StoreFormat'
import { OmcPartners } from './components/OmcPartners'
import { StoreNetwork } from './components/StoreNetwork'
import { Impact } from './components/Impact'
import { Platform } from './components/Platform'
import { Audience } from './components/Audience'
import { Intelligence } from './components/Intelligence'
import { UnifiedDashboard } from './components/UnifiedDashboard'
import { WhyWeWin } from './components/WhyWeWin'
import { BusinessModel } from './components/BusinessModel'
import { Architecture } from './components/Architecture'
import { DataFlow } from './components/DataFlow'
import { Roadmap } from './components/Roadmap'
import { Security } from './components/Security'
import { Kpis } from './components/Kpis'
import { VideoSection } from './components/VideoSection'
import { Future } from './components/Future'
import { Cta } from './components/Cta'
import { Footer } from './components/Footer'
import { DemoDialog } from './components/DemoDialog'

export default function App() {
  return (
    <div className="atmosphere relative">
      <div className="grain" aria-hidden />
      <NetworkCanvas />
      <Nav />
      <main id="top" className="relative z-[2]">
        <Hero />
        <Stats />
        <MarketOpportunity />
        <StoreFormat />
        <OmcPartners />
        <StoreNetwork />
        <Impact />
        <Platform />
        <Audience />
        <Intelligence />
        <UnifiedDashboard />
        <WhyWeWin />
        <BusinessModel />
        <Architecture />
        <DataFlow />
        <Roadmap />
        <Security />
        <Kpis />
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
