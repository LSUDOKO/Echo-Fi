"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, Users, MessageSquare } from "lucide-react"
import { MarketModal } from "./market-modal"

interface Market {
  id: string
  question: string
  category: string
  volume: number
  participants: number
  yesPrice: number
  noPrice: number
  timeLeft: string
  trending: "up" | "down"
  description: string
  createdBy: string
  totalStaked: number
  debateCount: number
  aiConfidence: number
  status: "active" | "resolving" | "resolved"
}

export function MarketsList() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [sortBy, setSortBy] = useState("volume")

  // Mock data - in real app this would come from API/blockchain
  const markets: Market[] = [
    {
      id: "1",
      question: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      volume: 124000,
      participants: 342,
      yesPrice: 0.67,
      noPrice: 0.33,
      timeLeft: "23d 14h",
      trending: "up",
      description:
        "Ethereum has shown strong momentum with upcoming upgrades and institutional adoption. This market explores whether ETH can reach the $5,000 milestone by the end of 2025.",
      createdBy: "0x1234...5678",
      totalStaked: 89500,
      debateCount: 127,
      aiConfidence: 72,
      status: "active",
    },
    {
      id: "2",
      question: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      volume: 89000,
      participants: 198,
      yesPrice: 0.45,
      noPrice: 0.55,
      timeLeft: "45d 8h",
      trending: "down",
      description:
        "With the AI boom continuing, this market predicts whether AI-focused tokens will deliver better returns than Bitcoin throughout 2025.",
      createdBy: "0x9876...4321",
      totalStaked: 67200,
      debateCount: 89,
      aiConfidence: 58,
      status: "active",
    },
    {
      id: "3",
      question: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      volume: 67000,
      participants: 156,
      yesPrice: 0.72,
      noPrice: 0.28,
      timeLeft: "67d 2h",
      trending: "up",
      description:
        "Somnia's high-performance blockchain aims to capture significant DeFi market share. This market bets on whether it can reach $1B in Total Value Locked.",
      createdBy: "0x5555...7777",
      totalStaked: 45800,
      debateCount: 64,
      aiConfidence: 81,
      status: "active",
    },
    {
      id: "4",
      question: "Will gaming NFTs recover to 2021 highs?",
      category: "Gaming",
      volume: 45000,
      participants: 89,
      yesPrice: 0.23,
      noPrice: 0.77,
      timeLeft: "89d 12h",
      trending: "down",
      description:
        "Gaming NFTs saw massive peaks in 2021 but have since declined. This market explores whether they can return to those historic highs.",
      createdBy: "0x3333...9999",
      totalStaked: 32100,
      debateCount: 43,
      aiConfidence: 34,
      status: "active",
    },
  ]

  const sortedMarkets = [...markets].sort((a, b) => {
    switch (sortBy) {
      case "volume":
        return b.volume - a.volume
      case "participants":
        return b.participants - a.participants
      case "newest":
        return new Date(b.timeLeft).getTime() - new Date(a.timeLeft).getTime()
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {markets.length} active markets</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex space-x-1">
            {[
              { value: "volume", label: "Volume" },
              { value: "participants", label: "Activity" },
              { value: "newest", label: "Newest" },
            ].map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setSortBy(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedMarkets.map((market) => (
          <Card key={market.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {market.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs text-muted-foreground">
                    {market.trending === "up" ? (
                      <TrendingUp className="h-3 w-3 text-accent mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                    )}
                    {market.trending === "up" ? "Hot" : "Cooling"}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    AI: {market.aiConfidence}%
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {market.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-1" />
                  {market.participants}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mr-1" />
                  {market.debateCount}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                  {market.timeLeft}
                </div>
              </div>

              {/* Volume and Staked */}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Volume: ${market.volume.toLocaleString()}</span>
                <span className="text-muted-foreground">Staked: ${market.totalStaked.toLocaleString()}</span>
              </div>

              {/* Price Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-accent font-medium">YES {(market.yesPrice * 100).toFixed(0)}¢</span>
                  <span className="text-destructive font-medium">NO {(market.noPrice * 100).toFixed(0)}¢</span>
                </div>
                <Progress value={market.yesPrice * 100} className="h-2" />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="bg-accent/10 border-accent/20 hover:bg-accent/20">
                  Buy YES
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                >
                  Buy NO
                </Button>
              </div>

              <Button className="w-full" size="sm" onClick={() => setSelectedMarket(market)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Join Debate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Detail Modal */}
      {selectedMarket && <MarketModal market={selectedMarket} onClose={() => setSelectedMarket(null)} />}
    </div>
  )
}
