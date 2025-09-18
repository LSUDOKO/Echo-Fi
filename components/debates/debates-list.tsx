"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, ThumbsDown, Clock, Brain, TrendingUp } from "lucide-react"

interface Debate {
  id: string
  title: string
  marketQuestion: string
  category: string
  author: string
  authorAddress: string
  createdAt: string
  lastActivity: string
  argumentCount: number
  upvotes: number
  downvotes: number
  aiScore: number
  stance: "yes" | "no"
  preview: string
  isHot: boolean
  participants: number
}

export function DebatesList() {
  const [sortBy, setSortBy] = useState("recent")

  // Mock data - in real app this would come from API/blockchain
  const debates: Debate[] = [
    {
      id: "1",
      title: "ETH's Path to $5K: Technical Analysis vs Market Sentiment",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      author: "CryptoAnalyst",
      authorAddress: "0x1234...5678",
      createdAt: "2h ago",
      lastActivity: "12m ago",
      argumentCount: 23,
      upvotes: 45,
      downvotes: 8,
      aiScore: 87,
      stance: "yes",
      preview:
        "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals that support a $5K target...",
      isHot: true,
      participants: 12,
    },
    {
      id: "2",
      title: "AI Token Bubble or Sustainable Growth?",
      marketQuestion: "Will AI tokens outperform BTC in 2025?",
      category: "AI/Tech",
      author: "AIResearcher",
      authorAddress: "0x9876...4321",
      createdAt: "4h ago",
      lastActivity: "1h ago",
      argumentCount: 18,
      upvotes: 32,
      downvotes: 15,
      aiScore: 72,
      stance: "no",
      preview:
        "While AI is revolutionary, the current token valuations seem disconnected from actual utility. Bitcoin's store of value proposition remains stronger...",
      isHot: false,
      participants: 8,
    },
    {
      id: "3",
      title: "Somnia's DeFi Ecosystem: Can It Reach $1B TVL?",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      author: "DeFiBuilder",
      authorAddress: "0x5555...7777",
      createdAt: "6h ago",
      lastActivity: "30m ago",
      argumentCount: 31,
      upvotes: 67,
      downvotes: 12,
      aiScore: 91,
      stance: "yes",
      preview:
        "Somnia's sub-second finality and 1M+ TPS create unprecedented opportunities for DeFi innovation. The infrastructure is ready for massive adoption...",
      isHot: true,
      participants: 15,
    },
  ]

  const sortedDebates = [...debates].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      case "popular":
        return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
      case "ai-score":
        return b.aiScore - a.aiScore
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Showing {debates.length} active debates</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex space-x-1">
            {[
              { value: "recent", label: "Recent" },
              { value: "popular", label: "Popular" },
              { value: "ai-score", label: "AI Score" },
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

      {/* Debates List */}
      <div className="space-y-4">
        {sortedDebates.map((debate) => (
          <Card key={debate.id} className="hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {debate.category}
                  </Badge>
                  <Badge variant={debate.stance === "yes" ? "default" : "destructive"} className="text-xs">
                    {debate.stance.toUpperCase()}
                  </Badge>
                  {debate.isHot && (
                    <Badge variant="outline" className="text-xs text-accent border-accent">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    AI: {debate.aiScore}%
                  </Badge>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-2">Market: {debate.marketQuestion}</div>

              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                <Link href={`/debates/${debate.id}`}>{debate.title}</Link>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Author and Timing */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{debate.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{debate.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {debate.authorAddress.slice(0, 6)}...{debate.authorAddress.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  {debate.lastActivity}
                </div>
              </div>

              {/* Preview */}
              <p className="text-sm text-muted-foreground line-clamp-2">{debate.preview}</p>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span>{debate.argumentCount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4 text-accent" />
                    <span>{debate.upvotes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsDown className="h-4 w-4 text-destructive" />
                    <span>{debate.downvotes}</span>
                  </div>
                  <span className="text-muted-foreground">{debate.participants} participants</span>
                </div>

                <Button variant="outline" size="sm" asChild>
                  <Link href={`/debates/${debate.id}`}>Join Debate</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
