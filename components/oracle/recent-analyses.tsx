"use client"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, TrendingUp, TrendingDown, MessageSquare } from "lucide-react"

interface Analysis {
  id: string
  argumentId: string
  author: string
  authorAddress: string
  content: string
  aiScore: number
  sentiment: "positive" | "negative" | "neutral"
  keywordMatches: string[]
  confidence: number
  timestamp: string
  marketQuestion: string
}

export function RecentAnalyses() {
  const recentAnalyses: Analysis[] = [
    {
      id: "1",
      argumentId: "arg_123",
      author: "CryptoAnalyst",
      authorAddress: "0x1234...5678",
      content:
        "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals...",
      aiScore: 87,
      sentiment: "positive",
      keywordMatches: ["technical indicators", "upgrades", "fundamentals"],
      confidence: 92,
      timestamp: "2m ago",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
    },
    {
      id: "2",
      argumentId: "arg_124",
      author: "MarketSkeptic",
      authorAddress: "0x8765...4321",
      content: "While the technical analysis looks promising, we need to consider the broader macro environment...",
      aiScore: 78,
      sentiment: "negative",
      keywordMatches: ["macro environment", "regulatory uncertainty"],
      confidence: 85,
      timestamp: "5m ago",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
    },
    {
      id: "3",
      argumentId: "arg_125",
      author: "DeFiBuilder",
      authorAddress: "0x5555...7777",
      content: "Somnia's sub-second finality and 1M+ TPS create unprecedented opportunities for DeFi innovation...",
      aiScore: 91,
      sentiment: "positive",
      keywordMatches: ["sub-second finality", "TPS", "DeFi innovation"],
      confidence: 94,
      timestamp: "8m ago",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
    },
  ]

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-3 w-3 text-accent" />
      case "negative":
        return <TrendingDown className="h-3 w-3 text-destructive" />
      default:
        return <MessageSquare className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-accent border-accent"
      case "negative":
        return "text-destructive border-destructive"
      default:
        return "text-muted-foreground border-border"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          Recent AI Analyses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentAnalyses.map((analysis) => (
          <div key={analysis.id} className="p-4 border border-border rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{analysis.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{analysis.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {analysis.authorAddress.slice(0, 6)}...{analysis.authorAddress.slice(-4)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">{analysis.timestamp}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={`text-xs ${getSentimentColor(analysis.sentiment)}`}>
                  {getSentimentIcon(analysis.sentiment)}
                  <span className="ml-1">{analysis.sentiment}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  {analysis.aiScore}%
                </Badge>
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-2">Market: {analysis.marketQuestion}</div>

            <p className="text-sm text-muted-foreground line-clamp-2">{analysis.content}</p>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Key Phrases Detected:</div>
              <div className="flex flex-wrap gap-1">
                {analysis.keywordMatches.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="text-muted-foreground">Confidence: {analysis.confidence}%</div>
              <div className="text-muted-foreground">ID: {analysis.argumentId}</div>
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full text-sm">
          View All Analyses
        </Button>
      </CardContent>
    </Card>
  )
}
