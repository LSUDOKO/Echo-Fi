"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Clock, ExternalLink } from "lucide-react"

interface Position {
  id: string
  marketQuestion: string
  category: string
  stance: "yes" | "no"
  stakeAmount: number
  currentValue: number
  pnl: number
  pnlPercentage: number
  probability: number
  timeLeft: string
  status: "winning" | "losing" | "pending"
}

export function ActivePositions() {
  // Mock positions data - in real app this would come from API/blockchain
  const positions: Position[] = [
    {
      id: "1",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      stance: "yes",
      stakeAmount: 500,
      currentValue: 672,
      pnl: 172,
      pnlPercentage: 34.4,
      probability: 67,
      timeLeft: "23d 14h",
      status: "winning",
    },
    {
      id: "2",
      marketQuestion: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      stance: "no",
      stakeAmount: 300,
      currentValue: 245,
      pnl: -55,
      pnlPercentage: -18.3,
      probability: 45,
      timeLeft: "45d 8h",
      status: "losing",
    },
    {
      id: "3",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      stance: "yes",
      stakeAmount: 750,
      currentValue: 890,
      pnl: 140,
      pnlPercentage: 18.7,
      probability: 72,
      timeLeft: "67d 2h",
      status: "winning",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "winning":
        return "text-accent border-accent"
      case "losing":
        return "text-destructive border-destructive"
      default:
        return "text-chart-3 border-chart-3"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "winning":
        return <TrendingUp className="h-3 w-3" />
      case "losing":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Active Positions</span>
          <Badge variant="outline" className="text-xs">
            {positions.length} positions
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {positions.map((position) => (
          <div key={position.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {position.category}
                  </Badge>
                  <Badge variant={position.stance === "yes" ? "default" : "destructive"} className="text-xs">
                    {position.stance.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getStatusColor(position.status)}`}>
                    {getStatusIcon(position.status)}
                    <span className="ml-1">{position.status}</span>
                  </Badge>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-2">{position.marketQuestion}</h4>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staked:</span>
                  <span className="font-medium">${position.stakeAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current:</span>
                  <span className="font-medium">${position.currentValue}</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">P&L:</span>
                  <span className={`font-medium ${position.pnl >= 0 ? "text-accent" : "text-destructive"}`}>
                    ${position.pnl} ({position.pnlPercentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Left:</span>
                  <span className="font-medium">{position.timeLeft}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Current Probability</span>
                <span className="font-medium">{position.probability}%</span>
              </div>
              <Progress value={position.probability} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Market
              </Button>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  Add Stake
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-destructive">
                  Close Position
                </Button>
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-sm">
          View All Positions
        </Button>
      </CardContent>
    </Card>
  )
}
