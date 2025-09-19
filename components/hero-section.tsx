"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Zap, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount, useConnect } from "wagmi"
import { injected } from "wagmi/connectors"

export function HeroSection() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { connect } = useConnect()

  const handleStartDebating = async () => {
    if (!isConnected) {
      connect({ connector: injected() })
    }
    router.push("/debates")
  }

  const handleExploreMarkets = () => {
    router.push("/markets")
  }

  const handleWatchDemo = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
  }

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Enhanced badge with glow effect */}
          <div className="mb-8 inline-flex items-center rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm px-6 py-3 text-sm shadow-lg shadow-primary/10">
            <Zap className="mr-2 h-4 w-4 text-accent animate-pulse" />
            <span className="text-muted-foreground">Powered by Somnia • Sub-second finality • Live on Mainnet</span>
          </div>

          {/* Enhanced main heading with better typography */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="text-balance">Break the</span>{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x">
              Echo Chamber
            </span>
          </h1>

          {/* Enhanced subheading */}
          <p className="mb-8 text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            The first AI-powered DeFi platform combining prediction markets with intelligent debate resolution. Stake
            your beliefs, engage in meaningful discourse, and earn amplified yields on Somnia's lightning-fast
            blockchain.
          </p>

          {/* Enhanced CTA Buttons with better functionality */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
              onClick={handleStartDebating}
            >
              {isConnected ? "Start Debating" : "Connect & Start"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              onClick={handleExploreMarkets}
            >
              Explore Markets
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-lg px-6 py-6 hover:bg-accent/10 transition-all duration-300"
              onClick={handleWatchDemo}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Enhanced feature highlights with better design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Prediction Markets</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create and trade on future outcomes with AI-enhanced liquidity and fair pricing
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-accent/30 transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">AI-Moderated Debates</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intelligent discourse analysis with sentiment scoring and bias detection
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:border-chart-3/30 transition-all duration-300 hover:scale-105">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-chart-3/20 to-chart-3/10 shadow-lg">
                <Zap className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">Amplified Yields</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Earn enhanced rewards for accurate predictions and quality arguments
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
