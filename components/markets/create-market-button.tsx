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
import { Plus, Zap } from "lucide-react"

export function CreateMarketButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [endDate, setEndDate] = useState("")
  const [initialStake, setInitialStake] = useState("")

  const categories = ["Crypto", "AI/Tech", "DeFi", "Gaming", "Sports", "Politics", "Economics", "Science"]

  const handleCreateMarket = () => {
    // TODO: Implement market creation logic
    console.log("Creating market:", { question, description, category, endDate, initialStake })
    setIsOpen(false)
    // Reset form
    setQuestion("")
    setDescription("")
    setCategory("")
    setEndDate("")
    setInitialStake("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="animate-pulse-glow">
          <Plus className="mr-2 h-4 w-4" />
          Create Market
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-primary" />
            Create Prediction Market
          </DialogTitle>
          <DialogDescription>
            Create a new prediction market and mint NFT debate tokens for participants
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="question" className="text-sm font-medium mb-2 block">
                Market Question *
              </Label>
              <Input
                id="question"
                placeholder="Will ETH reach $5,000 by Q4 2025?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Provide context and details about this prediction market..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="end-date" className="text-sm font-medium mb-2 block">
                  Resolution Date *
                </Label>
                <Input
                  id="end-date"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="initial-stake" className="text-sm font-medium mb-2 block">
                Initial Stake (STT) *
              </Label>
              <Input
                id="initial-stake"
                type="number"
                placeholder="100"
                value={initialStake}
                onChange={(e) => setInitialStake(e.target.value)}
              />
            </div>
          </div>

          {/* Preview Card */}
          {question && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Market Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Question:</span> {question}
                </div>
                {category && (
                  <div className="text-sm">
                    <span className="font-medium">Category:</span> {category}
                  </div>
                )}
                {initialStake && (
                  <div className="text-sm">
                    <span className="font-medium">Initial Stake:</span> {initialStake} STT
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
              onClick={handleCreateMarket}
              disabled={!question || !description || !category || !endDate || !initialStake}
            >
              Create Market
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
