import HeroSection from '@/components/home/HeroSection'
import SkillCardsGrid from '@/components/home/SkillCardsGrid'
import JellyAssistant from '@/components/jelly/JellyAssistant'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <SkillCardsGrid />
      <JellyAssistant />
    </main>
  )
}
