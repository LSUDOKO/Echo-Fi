"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, Users, ExternalLink, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount, useConnect } from "wagmi"
import { injected } from "wagmi/connectors"

export function FeaturedMarkets() {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { connect } = useConnect()

  const markets = [
    {
      id: 1,
      question: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      volume: "$124K",
      participants: 342,
      yesPrice: 0.67,
      noPrice: 0.33,
      timeLeft: "23d 14h",
      trending: "up",
      aiConfidence: 78,
      debates: 45,
    },
    {
      id: 2,
      question: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Crypto",
      volume: "$89K",
      participants: 198,
      yesPrice: 0.45,
      noPrice: 0.55,
      timeLeft: "45d 8h",
      trending: "down",
      aiConfidence: 62,
      debates: 32,
    },
    {
      id: 3,
      question: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      volume: "$67K",
      participants: 156,
      yesPrice: 0.72,
      noPrice: 0.28,
      timeLeft: "67d 2h",
      trending: "up",
      aiConfidence: 85,
      debates: 28,
    },
  ]

  const handleJoinDebate = (marketId: number) => {
    if (!isConnected) {
      connect({ connector: injected() })
    }
    router.push(`/debates?market=${marketId}`)
  }

  const handleViewAllMarkets = () => {
    router.push("/markets")
  }

  const handlePlaceBet = (marketId: number, side: "yes" | "no") => {
    if (!isConnected) {
      connect({ connector: injected() })
    }
    router.push(`/markets/${marketId}?side=${side}`)
  }

  return (
    <section id="markets" className="py-20 bg-gradient-to-b from-background to-card/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Prediction Markets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stake your beliefs on the future. Join debates, analyze arguments, and earn amplified yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {markets.map((market) => (
            <Card
              key={market.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                    {market.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {market.trending === "up" ? (
                      <TrendingUp className="h-3 w-3 text-accent mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                    )}
                    Trending
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer">
                  {market.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    {market.participants} traders
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    {market.timeLeft}
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-accent mr-1" />
                    AI: {market.aiConfidence}%
                  </div>
                  <div className="text-sm font-medium text-primary">Vol: {market.volume}</div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-accent/10 border-accent/30 hover:bg-accent/20 hover:border-accent/50 transition-all duration-200"
                      onClick={() => handlePlaceBet(market.id, "yes")}
                    >
                      YES {(market.yesPrice * 100).toFixed(0)}¢
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-destructive/10 border-destructive/30 hover:bg-destructive/20 hover:border-destructive/50 transition-all duration-200"
                      onClick={() => handlePlaceBet(market.id, "no")}
                    >
                      NO {(market.noPrice * 100).toFixed(0)}¢
                    </Button>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200"
                    size="sm"
                    onClick={() => handleJoinDebate(market.id)}
                  >
                    Join Debate ({market.debates} active)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            onClick={handleViewAllMarkets}
          >
            View All Markets
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
