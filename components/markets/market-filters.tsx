"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"

export function MarketFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [volumeRange, setVolumeRange] = useState([0, 1000000])
  const [timeFilter, setTimeFilter] = useState("all")

  const categories = ["Crypto", "AI/Tech", "DeFi", "Gaming", "Sports", "Politics", "Economics", "Science"]

  const timeFilters = [
    { value: "all", label: "All Time" },
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
  ]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Filters
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

        {/* Volume Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Volume Range: ${volumeRange[0].toLocaleString()} - ${volumeRange[1].toLocaleString()}
          </Label>
          <Slider
            value={volumeRange}
            onValueChange={setVolumeRange}
            max={1000000}
            min={0}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Time Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Time Period</Label>
          <div className="grid grid-cols-2 gap-2">
            {timeFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={timeFilter === filter.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(filter.value)}
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
            setVolumeRange([0, 1000000])
            setTimeFilter("all")
          }}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
