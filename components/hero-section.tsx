import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm">
            <Zap className="mr-2 h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Powered by Somnia • Sub-second finality</span>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="text-balance">Break the</span>{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Echo Chamber</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            AI-powered DeFi debates and prediction markets. Stake your beliefs, engage in meaningful discourse, and earn
            amplified yields on Somnia's lightning-fast blockchain.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
              Start Debating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Explore Markets
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Prediction Markets</h3>
              <p className="text-sm text-muted-foreground">Create and trade on future outcomes</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">AI-Moderated Debates</h3>
              <p className="text-sm text-muted-foreground">Intelligent discourse analysis</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-chart-3/10">
                <Zap className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="font-semibold text-foreground">Amplified Yields</h3>
              <p className="text-sm text-muted-foreground">Earn more for being right</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
