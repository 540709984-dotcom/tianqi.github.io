import HeroSection from '@/components/home/HeroSection'
import CaseBanner from '@/components/home/CaseBanner'
import SkillCardsGrid from '@/components/home/SkillCardsGrid'
import PricingFunnel from '@/components/home/PricingFunnel'
import JellyAssistant from '@/components/jelly/JellyAssistant'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7]">
      <HeroSection />
      <CaseBanner />
      <SkillCardsGrid />
      <PricingFunnel />
      <JellyAssistant />
    </main>
  )
}
