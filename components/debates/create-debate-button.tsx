"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, MessageSquare } from "lucide-react"

export function CreateDebateButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [marketId, setMarketId] = useState("")
  const [initialStance, setInitialStance] = useState("")
  const [initialArgument, setInitialArgument] = useState("")

  // Mock market options - in real app this would come from API
  const availableMarkets = [
    { id: "1", question: "Will ETH reach $5,000 by Q4 2025?" },
    { id: "2", question: "Will AI tokens outperform BTC in 2025?" },
    { id: "3", question: "Will Somnia TVL exceed $1B by end of 2025?" },
  ]

  const handleCreateDebate = () => {
    // TODO: Implement debate creation logic
    console.log("Creating debate:", { title, description, marketId, initialStance, initialArgument })
    setIsOpen(false)
    // Reset form
    setTitle("")
    setDescription("")
    setMarketId("")
    setInitialStance("")
    setInitialArgument("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="animate-pulse-glow">
          <Plus className="mr-2 h-4 w-4" />
          Start Debate
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
            Start New Debate
          </DialogTitle>
          <DialogDescription>
            Create a new debate thread for a prediction market and share your initial argument
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="market" className="text-sm font-medium mb-2 block">
                Select Market *
              </Label>
              <Select value={marketId} onValueChange={setMarketId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a prediction market" />
                </SelectTrigger>
                <SelectContent>
                  {availableMarkets.map((market) => (
                    <SelectItem key={market.id} value={market.id}>
                      {market.question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                Debate Title *
              </Label>
              <Input
                id="title"
                placeholder="ETH's Path to $5K: Technical Analysis vs Market Sentiment"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Provide context and framing for this debate..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Your Initial Stance *</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={initialStance === "yes" ? "default" : "outline"}
                  onClick={() => setInitialStance("yes")}
                  className="bg-accent/10 border-accent/20 hover:bg-accent/20"
                >
                  YES
                </Button>
                <Button
                  variant={initialStance === "no" ? "default" : "outline"}
                  onClick={() => setInitialStance("no")}
                  className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20"
                >
                  NO
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="initial-argument" className="text-sm font-medium mb-2 block">
                Your Opening Argument *
              </Label>
              <Textarea
                id="initial-argument"
                placeholder="Share your reasoning and analysis to start the debate..."
                value={initialArgument}
                onChange={(e) => setInitialArgument(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Preview Card */}
          {title && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Debate Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Title:</span> {title}
                </div>
                {marketId && (
                  <div className="text-sm">
                    <span className="font-medium">Market:</span>{" "}
                    {availableMarkets.find((m) => m.id === marketId)?.question}
                  </div>
                )}
                {initialStance && (
                  <div className="text-sm">
                    <span className="font-medium">Your Stance:</span>{" "}
                    <span className={initialStance === "yes" ? "text-accent" : "text-destructive"}>
                      {initialStance.toUpperCase()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateDebate}
              disabled={!title || !description || !marketId || !initialStance || !initialArgument}
            >
              Start Debate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
