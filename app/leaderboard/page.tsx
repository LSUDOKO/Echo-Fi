"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Brain, MessageSquare, Coins, Crown, Star } from "lucide-react"

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("all-time")

  const topTraders = [
    {
      rank: 1,
      address: "0x1234...5678",
      username: "CryptoOracle",
      totalEarnings: "$12,450",
      accuracy: 87,
      trades: 234,
      debates: 45,
      avatar: "🏆",
      badge: "Legendary Trader",
      change: "+5",
    },
    {
      rank: 2,
      address: "0x2345...6789",
      username: "DebateMaster",
      totalEarnings: "$9,820",
      accuracy: 82,
      trades: 189,
      debates: 78,
      avatar: "🥈",
      badge: "Master Debater",
      change: "+2",
    },
    {
      rank: 3,
      address: "0x3456...7890",
      username: "AIWhisperer",
      totalEarnings: "$8,340",
      accuracy: 79,
      trades: 156,
      debates: 34,
      avatar: "🥉",
      badge: "AI Expert",
      change: "-1",
    },
    {
      rank: 4,
      address: "0x4567...8901",
      username: "MarketSage",
      totalEarnings: "$7,650",
      accuracy: 75,
      trades: 203,
      debates: 56,
      avatar: "⭐",
      badge: "Market Analyst",
      change: "+3",
    },
    {
      rank: 5,
      address: "0x5678...9012",
      username: "TruthSeeker",
      totalEarnings: "$6,890",
      accuracy: 73,
      trades: 145,
      debates: 67,
      avatar: "💎",
      badge: "Truth Finder",
      change: "0",
    },
  ]

  const categories = [
    {
      title: "Top Earners",
      icon: Coins,
      description: "Highest total earnings from predictions",
      leaders: topTraders.slice(0, 3),
    },
    {
      title: "Best Accuracy",
      icon: TrendingUp,
      description: "Most accurate predictions",
      leaders: topTraders.sort((a, b) => b.accuracy - a.accuracy).slice(0, 3),
    },
    {
      title: "Debate Champions",
      icon: MessageSquare,
      description: "Most active in debates",
      leaders: topTraders.sort((a, b) => b.debates - a.debates).slice(0, 3),
    },
    {
      title: "AI Collaborators",
      icon: Brain,
      description: "Best AI-human collaboration",
      leaders: topTraders.slice(0, 3),
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
      default:
        return "bg-primary/10 text-primary"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">EchoFi Leaderboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the top performers in prediction markets, debates, and AI collaboration
          </p>
        </div>

        {/* Period Selection */}
        <div className="flex justify-center mb-8">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="all-time">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topTraders.slice(0, 3).map((trader, index) => (
            <Card
              key={trader.rank}
              className={`text-center ${index === 0 ? "md:order-2 transform md:scale-110" : index === 1 ? "md:order-1" : "md:order-3"} hover:shadow-xl transition-all duration-300`}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">{getRankIcon(trader.rank)}</div>
                <div className="text-4xl mb-2">{trader.avatar}</div>
                <CardTitle className="text-lg">{trader.username}</CardTitle>
                <p className="text-sm text-muted-foreground">{trader.address}</p>
              </CardHeader>
              <CardContent>
                <Badge className={`mb-3 ${getBadgeColor(trader.rank)}`}>{trader.badge}</Badge>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Earnings:</span>
                    <span className="font-semibold text-primary">{trader.totalEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="font-semibold">{trader.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trades:</span>
                    <span>{trader.trades}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debates:</span>
                    <span>{trader.debates}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <category.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.leaders.map((leader, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{leader.avatar}</span>
                        <div>
                          <p className="text-sm font-medium">{leader.username}</p>
                          <p className="text-xs text-muted-foreground">{leader.address}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">{leader.totalEarnings}</p>
                        <p className="text-xs text-muted-foreground">{leader.accuracy}% acc</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5" />
              <span>Complete Rankings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTraders.map((trader) => (
                <div
                  key={trader.rank}
                  className="flex items-center justify-between p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-muted-foreground w-8">#{trader.rank}</span>
                      {getRankIcon(trader.rank)}
                    </div>
                    <div className="text-2xl">{trader.avatar}</div>
                    <div>
                      <p className="font-semibold">{trader.username}</p>
                      <p className="text-sm text-muted-foreground">{trader.address}</p>
                      <Badge className={`text-xs ${getBadgeColor(trader.rank)}`}>{trader.badge}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-primary">{trader.totalEarnings}</p>
                      <p className="text-muted-foreground">Earnings</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{trader.accuracy}%</p>
                      <p className="text-muted-foreground">Accuracy</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{trader.trades}</p>
                      <p className="text-muted-foreground">Trades</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{trader.debates}</p>
                      <p className="text-muted-foreground">Debates</p>
                    </div>
                    <div className="text-center">
                      <p
                        className={`font-semibold ${trader.change.startsWith("+") ? "text-accent" : trader.change.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}
                      >
                        {trader.change !== "0" && trader.change}
                      </p>
                      <p className="text-muted-foreground">Change</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
