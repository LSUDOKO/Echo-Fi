"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown, MessageSquare, Trophy, DollarSign } from "lucide-react"

interface ActivityItem {
  id: string
  type: "stake" | "debate" | "win" | "loss" | "nft" | "achievement"
  title: string
  description: string
  amount?: number
  timestamp: string
  status: "success" | "pending" | "failed"
}

export function RecentActivity() {
  // Mock activity data - in real app this would come from API/blockchain
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "win",
      title: "Position Closed - Profit",
      description: "ETH $5K prediction market resolved in your favor",
      amount: 172.5,
      timestamp: "2h ago",
      status: "success",
    },
    {
      id: "2",
      type: "debate",
      title: "New Argument Posted",
      description: "Added analysis to Somnia TVL debate",
      timestamp: "4h ago",
      status: "success",
    },
    {
      id: "3",
      type: "stake",
      title: "New Position Opened",
      description: "Staked 300 STT on AI tokens vs BTC",
      amount: -300,
      timestamp: "1d ago",
      status: "success",
    },
    {
      id: "4",
      type: "achievement",
      title: "Achievement Unlocked",
      description: "Earned 'Top Predictor' badge for 75% win rate",
      timestamp: "2d ago",
      status: "success",
    },
    {
      id: "5",
      type: "nft",
      title: "NFT Minted",
      description: "Received debate token for market participation",
      timestamp: "3d ago",
      status: "success",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "win":
        return <TrendingUp className="h-4 w-4 text-accent" />
      case "loss":
        return <TrendingDown className="h-4 w-4 text-destructive" />
      case "stake":
        return <DollarSign className="h-4 w-4 text-primary" />
      case "debate":
        return <MessageSquare className="h-4 w-4 text-chart-3" />
      case "achievement":
      case "nft":
        return <Trophy className="h-4 w-4 text-chart-4" />
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "win":
        return "bg-accent/10"
      case "loss":
        return "bg-destructive/10"
      case "stake":
        return "bg-primary/10"
      case "debate":
        return "bg-chart-3/10"
      case "achievement":
      case "nft":
        return "bg-chart-4/10"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="mr-2 h-5 w-5 text-chart-3" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{activity.title}</h4>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
              <div className="flex items-center justify-between">
                {activity.amount && (
                  <span className={`text-sm font-medium ${activity.amount > 0 ? "text-accent" : "text-foreground"}`}>
                    {activity.amount > 0 ? "+" : ""}${Math.abs(activity.amount).toLocaleString()}
                  </span>
                )}
                <Badge variant="outline" className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-sm">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
