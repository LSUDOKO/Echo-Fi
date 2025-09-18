"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, ThumbsDown, Brain, ExternalLink } from "lucide-react"

interface DebateHistory {
  id: string
  title: string
  marketQuestion: string
  category: string
  stance: "yes" | "no"
  aiScore: number
  upvotes: number
  downvotes: number
  timestamp: string
  status: "active" | "resolved"
  outcome?: "won" | "lost"
}

export function DebateHistory() {
  // Mock debate history data - in real app this would come from API/blockchain
  const debates: DebateHistory[] = [
    {
      id: "1",
      title: "ETH's Path to $5K: Technical Analysis",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      stance: "yes",
      aiScore: 87,
      upvotes: 45,
      downvotes: 8,
      timestamp: "2h ago",
      status: "active",
    },
    {
      id: "2",
      title: "Somnia's DeFi Potential Analysis",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      stance: "yes",
      aiScore: 91,
      upvotes: 67,
      downvotes: 12,
      timestamp: "1d ago",
      status: "active",
    },
    {
      id: "3",
      title: "AI Token Market Dynamics",
      marketQuestion: "Will AI tokens outperform BTC in 2024?",
      category: "AI/Tech",
      stance: "no",
      aiScore: 78,
      upvotes: 32,
      downvotes: 15,
      timestamp: "1w ago",
      status: "resolved",
      outcome: "won",
    },
    {
      id: "4",
      title: "Gaming NFT Recovery Prospects",
      marketQuestion: "Will gaming NFTs recover to 2021 highs?",
      category: "Gaming",
      stance: "no",
      aiScore: 65,
      upvotes: 28,
      downvotes: 22,
      timestamp: "2w ago",
      status: "resolved",
      outcome: "lost",
    },
  ]

  const getOutcomeColor = (outcome?: string) => {
    switch (outcome) {
      case "won":
        return "text-accent border-accent"
      case "lost":
        return "text-destructive border-destructive"
      default:
        return "text-chart-3 border-chart-3"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Debate History
          </div>
          <Badge variant="outline" className="text-xs">
            {debates.length} debates
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {debates.map((debate) => (
          <div key={debate.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {debate.category}
                  </Badge>
                  <Badge variant={debate.stance === "yes" ? "default" : "destructive"} className="text-xs">
                    {debate.stance.toUpperCase()}
                  </Badge>
                  {debate.status === "resolved" && debate.outcome && (
                    <Badge variant="outline" className={`text-xs ${getOutcomeColor(debate.outcome)}`}>
                      {debate.outcome}
                    </Badge>
                  )}
                </div>
                <h4 className="font-medium text-sm leading-tight mb-1">{debate.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{debate.marketQuestion}</p>
              </div>
              <span className="text-xs text-muted-foreground">{debate.timestamp}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Brain className="h-3 w-3 text-primary" />
                  <span>{debate.aiScore}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-3 w-3 text-accent" />
                  <span>{debate.upvotes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsDown className="h-3 w-3 text-destructive" />
                  <span>{debate.downvotes}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs bg-transparent">
                <ExternalLink className="h-3 w-3 mr-1" />
                View
              </Button>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-sm">
          View All Debates
        </Button>
      </CardContent>
    </Card>
  )
}
