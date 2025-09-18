"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Image, Trophy, Zap, MessageSquare, ExternalLink } from "lucide-react"

interface NFT {
  id: string
  name: string
  type: "debate_token" | "achievement" | "special"
  marketQuestion?: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
  status: "active" | "tradeable" | "locked"
  value: number
  acquiredDate: string
  image: string
}

export function NFTCollection() {
  // Mock NFT data - in real app this would come from API/blockchain
  const nfts: NFT[] = [
    {
      id: "1",
      name: "ETH $5K Debate Token",
      type: "debate_token",
      marketQuestion: "Will ETH reach $5,000 by Q4 2025?",
      category: "Crypto",
      rarity: "rare",
      status: "active",
      value: 0.15,
      acquiredDate: "2024-03-15",
      image: "/ethereum-debate-token-nft.jpg",
    },
    {
      id: "2",
      name: "Top Predictor Badge",
      type: "achievement",
      category: "Achievement",
      rarity: "epic",
      status: "tradeable",
      value: 0.8,
      acquiredDate: "2024-03-10",
      image: "/golden-trophy-badge-nft.jpg",
    },
    {
      id: "3",
      name: "Somnia DeFi Debate Token",
      type: "debate_token",
      marketQuestion: "Will Somnia TVL exceed $1B by end of 2025?",
      category: "DeFi",
      rarity: "common",
      status: "locked",
      value: 0.05,
      acquiredDate: "2024-03-20",
      image: "/defi-blockchain-token-nft.jpg",
    },
    {
      id: "4",
      name: "Early Adopter Genesis",
      type: "special",
      category: "Special",
      rarity: "legendary",
      status: "tradeable",
      value: 2.5,
      acquiredDate: "2024-03-01",
      image: "/genesis-early-adopter-nft.jpg",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "text-chart-5 border-chart-5"
      case "epic":
        return "text-chart-4 border-chart-4"
      case "rare":
        return "text-primary border-primary"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-accent border-accent"
      case "tradeable":
        return "text-primary border-primary"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "debate_token":
        return <MessageSquare className="h-4 w-4" />
      case "achievement":
        return <Trophy className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const debateTokens = nfts.filter((nft) => nft.type === "debate_token")
  const achievements = nfts.filter((nft) => nft.type === "achievement" || nft.type === "special")

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Image className="mr-2 h-5 w-5 text-chart-3" />
            NFT Collection
          </div>
          <Badge variant="outline" className="text-xs">
            {nfts.length} items
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="debate-tokens" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="debate-tokens">Debate Tokens</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="debate-tokens" className="space-y-4">
            {debateTokens.map((nft) => (
              <div key={nft.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm">{nft.name}</h4>
                    <Badge variant="outline" className={`text-xs ${getRarityColor(nft.rarity)}`}>
                      {nft.rarity}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(nft.status)}`}>
                      {nft.status}
                    </Badge>
                  </div>
                  {nft.marketQuestion && <p className="text-xs text-muted-foreground mb-1">{nft.marketQuestion}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Value: {nft.value} ETH</span>
                    <Button variant="ghost" size="sm" className="text-xs h-6">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {achievements.map((nft) => (
              <div key={nft.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {getTypeIcon(nft.type)}
                    <h4 className="font-medium text-sm">{nft.name}</h4>
                    <Badge variant="outline" className={`text-xs ${getRarityColor(nft.rarity)}`}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Acquired: {new Date(nft.acquiredDate).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" className="text-xs h-6">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      {nft.status === "tradeable" && (
                        <Button variant="ghost" size="sm" className="text-xs h-6">
                          Trade
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Collection Value:</span>
            <span className="font-medium">{nfts.reduce((sum, nft) => sum + nft.value, 0).toFixed(2)} ETH</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
