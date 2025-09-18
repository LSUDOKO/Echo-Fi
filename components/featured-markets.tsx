import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, Users } from "lucide-react"

export function FeaturedMarkets() {
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
    },
  ]

  return (
    <section id="markets" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Prediction Markets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stake your beliefs on the future. Join debates, analyze arguments, and earn yields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {markets.map((market) => (
            <Card key={market.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
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
                <CardTitle className="text-lg leading-tight">{market.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground mr-1" />
                    {market.participants} participants
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    {market.timeLeft}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Volume: {market.volume}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="bg-accent/10 border-accent/20 hover:bg-accent/20">
                      YES {(market.yesPrice * 100).toFixed(0)}¢
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                    >
                      NO {(market.noPrice * 100).toFixed(0)}¢
                    </Button>
                  </div>
                </div>

                <Button className="w-full" size="sm">
                  Join Debate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Markets
          </Button>
        </div>
      </div>
    </section>
  )
}
