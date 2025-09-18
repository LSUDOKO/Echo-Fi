"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, ThumbsUp, ThumbsDown, Brain, Clock, TrendingUp, Reply, Flag } from "lucide-react"

interface DebateThreadProps {
  debateId: string
}

interface Argument {
  id: string
  author: string
  authorAddress: string
  content: string
  stance: "yes" | "no"
  timestamp: string
  upvotes: number
  downvotes: number
  aiScore: number
  aiAnalysis: string
  replies: any[]
  isHighlighted: boolean
}

export function DebateThread({ debateId }: DebateThreadProps) {
  const [newArgument, setNewArgument] = useState("")
  const [selectedStance, setSelectedStance] = useState<"yes" | "no">("yes")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  // Mock data - in real app this would come from API/blockchain
  const debate = {
    id: debateId,
    title: "ETH's Path to $5K: Technical Analysis vs Market Sentiment",
    marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
    category: "Crypto",
    description:
      "A comprehensive analysis of Ethereum's potential to reach $5,000 by Q4 2025, considering technical indicators, market sentiment, and fundamental developments.",
    totalArguments: 23,
    participants: 12,
    aiConsensus: 72,
    createdAt: "2h ago",
    lastActivity: "12m ago",
  }

  const debateArguments: Argument[] = [
    {
      id: "1",
      author: "CryptoAnalyst",
      authorAddress: "0x1234...5678",
      content:
        "Looking at the technical indicators and upcoming Ethereum upgrades, I believe we're seeing strong fundamentals that support a $5K target. The Shanghai upgrade has reduced selling pressure, and institutional adoption continues to grow. Layer 2 solutions are also driving more utility to the Ethereum ecosystem.",
      stance: "yes",
      timestamp: "2h ago",
      upvotes: 45,
      downvotes: 8,
      aiScore: 87,
      aiAnalysis:
        "Strong technical analysis with specific references to upgrades and institutional adoption. High confidence in reasoning.",
      replies: [
        {
          id: "r1",
          author: "DeFiTrader",
          authorAddress: "0x9999...1111",
          content: "Great points about L2 adoption. The gas fee reduction is definitely a game changer.",
          timestamp: "1h ago",
          upvotes: 12,
          downvotes: 2,
        },
      ],
      isHighlighted: true,
    },
    {
      id: "2",
      author: "MarketSkeptic",
      authorAddress: "0x8765...4321",
      content:
        "While the technical analysis looks promising, we need to consider the broader macro environment. Rising interest rates and regulatory uncertainty could significantly impact crypto markets. The $5K target seems overly optimistic given current market conditions.",
      stance: "no",
      timestamp: "1h ago",
      upvotes: 32,
      downvotes: 15,
      aiScore: 78,
      aiAnalysis:
        "Well-reasoned counterargument considering macroeconomic factors. Balanced perspective on market risks.",
      replies: [],
      isHighlighted: false,
    },
  ]

  const handleSubmitArgument = () => {
    // TODO: Implement argument submission
    console.log("Submitting argument:", { content: newArgument, stance: selectedStance })
    setNewArgument("")
  }

  const handleSubmitReply = (argumentId: string) => {
    // TODO: Implement reply submission
    console.log("Submitting reply to:", argumentId, replyText)
    setReplyText("")
    setReplyingTo(null)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debate Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{debate.category}</Badge>
              <Badge variant="outline" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                AI Consensus: {debate.aiConsensus}%
              </Badge>
              <Badge variant="outline" className="text-xs text-accent border-accent">
                <TrendingUp className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-2">Market: {debate.marketQuestion}</div>

          <CardTitle className="text-2xl mb-4">{debate.title}</CardTitle>

          <p className="text-muted-foreground mb-4">{debate.description}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>{debate.totalArguments} arguments</span>
              <span>{debate.participants} participants</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last activity {debate.lastActivity}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Arguments Thread */}
        <div className="lg:col-span-2 space-y-6">
          {debateArguments.map((argument) => (
            <Card key={argument.id} className={`${argument.isHighlighted ? "ring-2 ring-primary/20" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{argument.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{argument.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {argument.authorAddress.slice(0, 6)}...{argument.authorAddress.slice(-4)}
                        </span>
                        <Badge variant={argument.stance === "yes" ? "default" : "destructive"} className="text-xs">
                          {argument.stance.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{argument.timestamp}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    AI: {argument.aiScore}%
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">{argument.content}</p>

                {/* AI Analysis */}
                <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-primary">
                  <div className="flex items-center mb-2">
                    <Brain className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm font-medium">AI Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{argument.aiAnalysis}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {argument.upvotes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {argument.downvotes}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setReplyingTo(argument.id)}>
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>

                {/* Replies */}
                {argument.replies.length > 0 && (
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    {argument.replies.map((reply) => (
                      <div key={reply.id} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {reply.author.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-8">{reply.content}</p>
                        <div className="flex items-center space-x-2 pl-8">
                          <Button variant="ghost" size="sm" className="text-xs h-6">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.upvotes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-6">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {reply.downvotes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reply Form */}
                {replyingTo === argument.id && (
                  <div className="space-y-3 pl-4 border-l-2 border-primary">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleSubmitReply(argument.id)}>
                        Submit Reply
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* New Argument Form */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Add Your Argument
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Stance</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedStance === "yes" ? "default" : "outline"}
                    onClick={() => setSelectedStance("yes")}
                    className="bg-accent/10 border-accent/20 hover:bg-accent/20"
                  >
                    YES
                  </Button>
                  <Button
                    variant={selectedStance === "no" ? "default" : "outline"}
                    onClick={() => setSelectedStance("no")}
                    className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                  >
                    NO
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Your Argument</label>
                <Textarea
                  placeholder="Share your reasoning and analysis..."
                  value={newArgument}
                  onChange={(e) => setNewArgument(e.target.value)}
                  rows={6}
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4" />
                <span>Your argument will be analyzed by our AI oracle</span>
              </div>

              <Button onClick={handleSubmitArgument} className="w-full" disabled={!newArgument.trim()}>
                Submit Argument
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
