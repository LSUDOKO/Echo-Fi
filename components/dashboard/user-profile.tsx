"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { useWallet } from "@/lib/wallet"
import { useAccount, useBalance } from "wagmi"
import { Star, Edit } from "lucide-react"

export function UserProfile() {
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })

  // Mock user data - in real app this would come from API/blockchain
  const userStats = {
    totalEarnings: 2847.32,
    winRate: 73.2,
    totalDebates: 45,
    reputation: 892,
    rank: 12,
    level: "Expert Debater",
    badges: ["Early Adopter", "Top Predictor", "Debate Champion"],
    joinedDate: "March 2024",
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-4">
              <AvatarFallback className="text-lg font-bold">
                {address ? address.slice(2, 4).toUpperCase() : "??"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{address ? formatAddress(address) : "Not Connected"}</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="text-xs">
                  {userStats.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Rank #{userStats.rank}
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">${userStats.totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{userStats.winRate}%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3">{userStats.totalDebates}</div>
              <div className="text-sm text-muted-foreground">Total Debates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-4">{userStats.reputation}</div>
              <div className="text-sm text-muted-foreground">Reputation</div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{balance ? parseFloat(balance.formatted).toFixed(4) : "0.00"}</div>
              <div className="text-sm text-muted-foreground">{balance?.symbol} Balance</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Member since</div>
              <div className="text-sm font-medium">{userStats.joinedDate}</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Achievements</div>
              <div className="flex flex-wrap gap-1 justify-center">
                {userStats.badges.map((badge, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
