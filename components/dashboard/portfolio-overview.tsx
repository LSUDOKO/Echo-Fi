"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"

export function PortfolioOverview() {
  // Mock portfolio data - in real app this would come from API/blockchain
  const portfolio = {
    totalValue: 5247.89,
    totalStaked: 3420.5,
    availableBalance: 1827.39,
    pnl: 847.32,
    pnlPercentage: 19.3,
    positions: {
      winning: 12,
      losing: 4,
      pending: 7,
    },
    allocation: {
      crypto: 45,
      defi: 30,
      ai: 15,
      other: 10,
    },
  }

  const allocationData = [
    { category: "Crypto", percentage: portfolio.allocation.crypto, color: "bg-primary" },
    { category: "DeFi", percentage: portfolio.allocation.defi, color: "bg-accent" },
    { category: "AI/Tech", percentage: portfolio.allocation.ai, color: "bg-chart-3" },
    { category: "Other", percentage: portfolio.allocation.other, color: "bg-chart-4" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Portfolio Value */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-accent" />
            Portfolio Value
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-3xl font-bold text-foreground">${portfolio.totalValue.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${portfolio.pnl >= 0 ? "text-accent" : "text-destructive"}`}>
              {portfolio.pnl >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
              ${Math.abs(portfolio.pnl).toLocaleString()} ({portfolio.pnlPercentage}%)
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Staked</span>
              <span className="font-medium">${portfolio.totalStaked.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Available</span>
              <span className="font-medium">${portfolio.availableBalance.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Position Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            Active Positions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">{portfolio.positions.winning}</div>
              <div className="text-xs text-muted-foreground">Winning</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-destructive">{portfolio.positions.losing}</div>
              <div className="text-xs text-muted-foreground">Losing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-chart-3">{portfolio.positions.pending}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-medium">75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Category Allocation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Portfolio Allocation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allocationData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.category}</span>
                <span className="font-medium">{item.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
