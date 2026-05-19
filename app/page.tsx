import HeroSection from '@/components/home/HeroSection'
import CaseBanner from '@/components/home/CaseBanner'
import SkillCardsGrid from '@/components/home/SkillCardsGrid'
import PricingFunnel from '@/components/home/PricingFunnel'
import DigitalHumanIP from '@/components/home/DigitalHumanIP'
import HealerShowcase from '@/components/home/HealerShowcase'
import BusinessShowcase from '@/components/home/BusinessShowcase'
import JellyAssistant from '@/components/jelly/JellyAssistant'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#030712]">
      <HeroSection />
      <div id="skills">
        <SkillCardsGrid />
      </div>
      <BusinessShowcase />
      <div id="cases">
        <CaseBanner />
      </div>
      <div id="pricing">
        <PricingFunnel />
      </div>
      <div id="digital-human">
        <DigitalHumanIP />
      </div>
      <HealerShowcase />
      <JellyAssistant />
    </main>
  )
}
