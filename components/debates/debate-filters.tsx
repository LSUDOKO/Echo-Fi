"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Filter, Brain } from "lucide-react"

export function DebateFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStances, setSelectedStances] = useState<string[]>([])
  const [aiScoreRange, setAiScoreRange] = useState([0, 100])
  const [activityFilter, setActivityFilter] = useState("all")

  const categories = ["Crypto", "AI/Tech", "DeFi", "Gaming", "Sports", "Politics", "Economics", "Science"]
  const stances = ["YES", "NO"]

  const activityFilters = [
    { value: "all", label: "All Time" },
    { value: "1h", label: "Last Hour" },
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleStance = (stance: string) => {
    setSelectedStances((prev) => (prev.includes(stance) ? prev.filter((s) => s !== stance) : [...prev, stance]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Debate Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stance Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Stance</Label>
          <div className="flex gap-2">
            {stances.map((stance) => (
              <Badge
                key={stance}
                variant={selectedStances.includes(stance) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  stance === "YES"
                    ? "hover:bg-accent/20 data-[selected=true]:bg-accent"
                    : "hover:bg-destructive/20 data-[selected=true]:bg-destructive"
                }`}
                data-selected={selectedStances.includes(stance)}
                onClick={() => toggleStance(stance)}
              >
                {stance}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Score Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block flex items-center">
            <Brain className="h-4 w-4 mr-1" />
            AI Score: {aiScoreRange[0]}% - {aiScoreRange[1]}%
          </Label>
          <Slider value={aiScoreRange} onValueChange={setAiScoreRange} max={100} min={0} step={5} className="w-full" />
        </div>

        {/* Activity Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Activity</Label>
          <div className="grid grid-cols-2 gap-2">
            {activityFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={activityFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setActivityFilter(filter.value)}
                className="text-xs"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCategories([])
            setSelectedStances([])
            setAiScoreRange([0, 100])
            setActivityFilter("all")
          }}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
