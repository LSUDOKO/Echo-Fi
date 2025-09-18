"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, MessageSquare, DollarSign, Brain } from "lucide-react"

interface Market {
  id: string
  question: string
  category: string
  volume: number
  participants: number
  yesPrice: number
  noPrice: number
  timeLeft: string
  trending: "up" | "down"
  description: string
  createdBy: string
  totalStaked: number
  debateCount: number
  aiConfidence: number
  status: "active" | "resolving" | "resolved"
}

interface MarketModalProps {
  market: Market
  onClose: () => void
}

export function MarketModal({ market, onClose }: MarketModalProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes")
  const [debateText, setDebateText] = useState("")

  const handleStake = () => {
    // TODO: Implement staking logic
    console.log(`Staking ${stakeAmount} on ${selectedSide} for market ${market.id}`)
  }

  const handleSubmitArgument = () => {
    // TODO: Implement argument submission
    console.log(`Submitting argument: ${debateText}`)
    setDebateText("")
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">{market.category}</Badge>
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Confidence: {market.aiConfidence}%
                </Badge>
              </div>
              <DialogTitle className="text-xl leading-tight mb-2">{market.question}</DialogTitle>
              <DialogDescription className="text-base">{market.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Market Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-y border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">${market.volume.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Volume</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{market.participants}</div>
            <div className="text-sm text-muted-foreground">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{market.debateCount}</div>
            <div className="text-sm text-muted-foreground">Arguments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{market.timeLeft}</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </div>
        </div>

        {/* Current Prices */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Current Prices</span>
            <div className="flex items-center text-sm text-muted-foreground">
              {market.trending === "up" ? (
                <TrendingUp className="h-4 w-4 text-accent mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive mr-1" />
              )}
              {market.trending === "up" ? "Trending Up" : "Trending Down"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">{(market.yesPrice * 100).toFixed(0)}¢</div>
                <div className="text-sm text-muted-foreground">YES</div>
              </CardContent>
            </Card>
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-destructive">{(market.noPrice * 100).toFixed(0)}¢</div>
                <div className="text-sm text-muted-foreground">NO</div>
              </CardContent>
            </Card>
          </div>
          <Progress value={market.yesPrice * 100} className="h-3" />
        </div>

        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stake">Place Stake</TabsTrigger>
            <TabsTrigger value="debate">Join Debate</TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Place Your Stake
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Choose Side</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedSide === "yes" ? "default" : "outline"}
                      onClick={() => setSelectedSide("yes")}
                      className="bg-accent/10 border-accent/20 hover:bg-accent/20"
                    >
                      YES {(market.yesPrice * 100).toFixed(0)}¢
                    </Button>
                    <Button
                      variant={selectedSide === "no" ? "default" : "outline"}
                      onClick={() => setSelectedSide("no")}
                      className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                    >
                      NO {(market.noPrice * 100).toFixed(0)}¢
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="stake-amount" className="text-sm font-medium mb-2 block">
                    Stake Amount (STT)
                  </Label>
                  <Input
                    id="stake-amount"
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </div>

                {stakeAmount && (
                  <div className="p-3 bg-muted rounded-lg space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Stake Amount:</span>
                      <span>{stakeAmount} STT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Potential Return:</span>
                      <span className="text-accent font-medium">
                        {selectedSide === "yes"
                          ? (Number.parseFloat(stakeAmount) / market.yesPrice).toFixed(2)
                          : (Number.parseFloat(stakeAmount) / market.noPrice).toFixed(2)}{" "}
                        STT
                      </span>
                    </div>
                  </div>
                )}

                <Button onClick={handleStake} className="w-full" disabled={!stakeAmount}>
                  Stake on {selectedSide.toUpperCase()}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="debate" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Join the Debate
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="debate-text" className="text-sm font-medium mb-2 block">
                    Your Argument
                  </Label>
                  <Textarea
                    id="debate-text"
                    placeholder="Share your reasoning and analysis..."
                    value={debateText}
                    onChange={(e) => setDebateText(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Brain className="h-4 w-4" />
                  <span>Your argument will be analyzed by our AI oracle</span>
                </div>

                <Button onClick={handleSubmitArgument} className="w-full" disabled={!debateText.trim()}>
                  Submit Argument
                </Button>
              </CardContent>
            </Card>

            {/* Recent Arguments Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Arguments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-accent/5 rounded-lg border-l-4 border-accent">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      YES
                    </Badge>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                  <p className="text-sm">
                    ETH's upcoming upgrades and institutional adoption create strong fundamentals for reaching $5k...
                  </p>
                </div>
                <div className="p-3 bg-destructive/5 rounded-lg border-l-4 border-destructive">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      NO
                    </Badge>
                    <span className="text-xs text-muted-foreground">4h ago</span>
                  </div>
                  <p className="text-sm">
                    Market conditions and regulatory uncertainty make $5k unlikely in this timeframe...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
