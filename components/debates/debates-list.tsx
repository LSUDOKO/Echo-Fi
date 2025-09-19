"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, ThumbsUp, ThumbsDown, Clock, Brain, TrendingUp, Loader2 } from "lucide-react"
import { useDebates } from "@/lib/debate-context"

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
  const { state, actions } = useDebates()

  useEffect(() => {
    if (state.debates.length === 0) {
      actions.fetchDebates()
    }
  }, [state.debates.length, actions])

  // Format timestamp for display
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  // Update debates with formatted timestamps
  const debates = state.debates.map(debate => ({
    ...debate,
    createdAt: formatTimeAgo(debate.createdAt),
    lastActivity: formatTimeAgo(debate.lastActivity),
  }))

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

  if (state.loading && state.debates.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-3" />
        <span>Loading debates...</span>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading debates: {state.error}</p>
        <Button onClick={() => actions.fetchDebates()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {debates.length} active debate{debates.length !== 1 ? 's' : ''}
        </p>
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
