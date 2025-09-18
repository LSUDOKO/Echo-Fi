import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedMarkets } from "@/components/featured-markets"
import { HowItWorks } from "@/components/how-it-works"
import { Stats } from "@/components/stats"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Stats />
        <FeaturedMarkets />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
