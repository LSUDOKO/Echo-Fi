"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Brain, Users, AlertTriangle } from "lucide-react"

interface PendingResolution {
  id: string
  marketQuestion: string
  category: string
  aiConfidence: number
  aiRecommendation: "yes" | "no"
  communityVotes: number
  timeRemaining: string
  urgency: "high" | "medium" | "low"
  totalArguments: number
  consensusScore: number
}

export function PendingResolutions() {
  const pendingResolutions: PendingResolution[] = [
    {
      id: "1",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      aiConfidence: 72,
      aiRecommendation: "yes",
      communityVotes: 45,
      timeRemaining: "2d 14h",
      urgency: "high",
      totalArguments: 127,
      consensusScore: 68,
    },
    {
      id: "2",
      marketQuestion: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      aiConfidence: 58,
      aiRecommendation: "no",
      communityVotes: 23,
      timeRemaining: "5d 8h",
      urgency: "medium",
      totalArguments: 89,
      consensusScore: 45,
    },
    {
      id: "3",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      aiConfidence: 81,
      aiRecommendation: "yes",
      communityVotes: 67,
      timeRemaining: "1d 3h",
      urgency: "high",
      totalArguments: 64,
      consensusScore: 79,
    },
  ]

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-destructive border-destructive"
      case "medium":
        return "text-chart-3 border-chart-3"
      case "low":
        return "text-accent border-accent"
      default:
        return "text-muted-foreground border-border"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-chart-3" />
            Pending Resolutions
          </div>
          <Badge variant="outline" className="text-xs">
            {pendingResolutions.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingResolutions.map((resolution) => (
          <div key={resolution.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {resolution.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getUrgencyColor(resolution.urgency)}`}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {resolution.urgency.toUpperCase()}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm leading-tight mb-2">{resolution.marketQuestion}</h4>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Confidence:</span>
                  <span className="font-medium">{resolution.aiConfidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Recommends:</span>
                  <Badge
                    variant={resolution.aiRecommendation === "yes" ? "default" : "destructive"}
                    className="text-xs h-4"
                  >
                    {resolution.aiRecommendation.toUpperCase()}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Community Votes:</span>
                  <span className="font-medium">{resolution.communityVotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Left:</span>
                  <span className="font-medium">{resolution.timeRemaining}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Consensus Score</span>
                <span className="font-medium">{resolution.consensusScore}%</span>
              </div>
              <Progress value={resolution.consensusScore} className="h-1.5" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Brain className="h-3 w-3 mr-1" />
                  {resolution.totalArguments} arguments
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {resolution.communityVotes} votes
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7 bg-transparent">
                Review
              </Button>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-sm">
          View All Pending Resolutions
        </Button>
      </CardContent>
    </Card>
  )
}
