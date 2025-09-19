"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MessageSquare, Clock, Brain, Send, Loader2, TrendingUp, Reply, Flag } from "lucide-react"
import { useDebates } from "@/lib/debate-context"
import { useAccount } from "wagmi"
import { useToast } from "@/components/ui/use-toast"

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

export function DebateThread({ debateId }: { debateId: string }) {
  const [newArgument, setNewArgument] = useState("")
  const [selectedStance, setSelectedStance] = useState<"yes" | "no" | null>(null)
  const [sortBy, setSortBy] = useState("recent")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const { state, actions } = useDebates()
  const { address, isConnected } = useAccount()
  const { toast } = useToast()

  // Find the debate
  const debate = state.debates.find(d => d.id === debateId)
  
  // Get arguments for this debate
  const debateArguments = debate ? debate.arguments : []

  useEffect(() => {
    if (state.debates.length === 0) {
      actions.fetchDebates()
    }
  }, [state.debates.length, actions])

  const handleSubmitArgument = async () => {
    if (!isConnected || !address) {
      toast({ title: "Wallet Required", description: "Please connect your wallet to submit an argument", variant: "destructive" })
      return
    }

    if (!newArgument.trim()) {
      toast({ title: "Missing Content", description: "Please enter your argument", variant: "destructive" })
      return
    }

    if (!selectedStance) {
      toast({ title: "Missing Stance", description: "Please select your stance", variant: "destructive" })
      return
    }

    setIsSubmitting(true)
    try {
      await actions.addArgument(debateId, {
        debateId,
        author: address.slice(0, 8) + "..." + address.slice(-4),
        authorAddress: address,
        content: newArgument.trim(),
        stance: selectedStance,
        upvotes: 0,
        downvotes: 0,
        aiScore: 0,
        aiAnalysis: "",
        replies: [],
        isHighlighted: false,
      })
      
      setNewArgument("")
      setSelectedStance(null)
      toast({ title: "Success", description: "Argument submitted successfully!", variant: "success" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit argument", variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (argumentId: string) => {
    if (!isConnected || !address) {
      toast({ title: "Wallet Required", description: "Please connect your wallet to submit a reply", variant: "destructive" })
      return
    }

    if (!replyText.trim()) {
      toast({ title: "Missing Content", description: "Please enter your reply", variant: "destructive" })
      return
    }

    try {
      await actions.addReply(argumentId, {
        argumentId,
        author: address.slice(0, 8) + "..." + address.slice(-4),
        authorAddress: address,
        content: replyText.trim(),
        upvotes: 0,
        downvotes: 0,
      })
      
      setReplyText("")
      setReplyingTo(null)
      toast({ title: "Success", description: "Reply submitted successfully!", variant: "success" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit reply", variant: "destructive" })
    }
  }

  const handleVote = async (type: 'argument' | 'reply', id: string, voteType: 'up' | 'down') => {
    if (!isConnected || !address) {
      toast({ title: "Wallet Required", description: "Please connect your wallet to vote", variant: "destructive" })
      return
    }

    try {
      await actions.vote(type, id, voteType)
      toast({ title: "Success", description: `Vote ${voteType === 'up' ? 'upvoted' : 'downvoted'} successfully!`, variant: "success" })
    } catch (error) {
      toast({ title: "Error", description: "Failed to vote", variant: "destructive" })
    }
  }

  if (state.loading && state.debates.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-3" />
        <span>Loading debate...</span>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">Error loading debate: {state.error}</p>
        <Button onClick={() => actions.fetchDebates()}>Retry</Button>
      </div>
    )
  }

  if (!debate) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Debate not found</p>
      </div>
    )
  }

  // Format timestamp for display
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  // Format debate timestamps
  const formattedDebate = {
    ...debate,
    createdAt: formatTimeAgo(debate.createdAt),
    lastActivity: formatTimeAgo(debate.lastActivity),
    totalArguments: debate.argumentCount || debateArguments.length,
    aiConsensus: debate.aiScore || 0,
    description: debate.preview || "",
  }

  const sortedArguments = [...debateArguments].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      case "popular":
        return b.upvotes - b.downvotes - (a.upvotes - a.downvotes)
      case "ai-score":
        return b.aiScore - a.aiScore
      default:
        return 0
    }
  })


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debate Header */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{formattedDebate.category}</Badge>
              <Badge variant="outline" className="text-xs">
                <Brain className="h-3 w-3 mr-1" />
                AI Consensus: {formattedDebate.aiConsensus}%
              </Badge>
              <Badge variant="outline" className="text-xs text-accent border-accent">
                <TrendingUp className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-2">Market: {formattedDebate.marketQuestion}</div>

          <CardTitle className="text-2xl mb-4">{formattedDebate.title}</CardTitle>

          <p className="text-muted-foreground mb-4">{formattedDebate.description}</p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>{formattedDebate.totalArguments} arguments</span>
              <span>{formattedDebate.participants} participants</span>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last activity {formattedDebate.lastActivity}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Arguments Thread */}
        <div className="lg:col-span-2 space-y-6">
          {sortedArguments.map((argument) => (
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
                      <div className="text-xs text-muted-foreground">{formatTimeAgo(argument.timestamp)}</div>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-accent hover:text-accent"
                      onClick={() => handleVote('argument', argument.id, 'up')}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {argument.upvotes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleVote('argument', argument.id, 'down')}
                    >
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-6 text-accent hover:text-accent"
                            onClick={() => handleVote('reply', reply.id, 'up')}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.upvotes}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-6 text-destructive hover:text-destructive"
                            onClick={() => handleVote('reply', reply.id, 'down')}
                          >
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

              <Button onClick={handleSubmitArgument} className="w-full" disabled={!newArgument.trim() || !selectedStance || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Argument"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
