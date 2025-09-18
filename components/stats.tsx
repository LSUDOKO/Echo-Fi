"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trophy, TrendingUp } from "lucide-react"

export function Stats() {
  const router = useRouter()

  const stats = [
    { label: "Active Markets", value: "1,247", change: "+12%", color: "text-primary" },
    { label: "Total Volume", value: "$2.4M", change: "+34%", color: "text-accent" },
    { label: "Debates Resolved", value: "8,932", change: "+8%", color: "text-chart-3" },
    { label: "Community Members", value: "15.2K", change: "+28%", color: "text-chart-4" },
  ]

  const handleViewLeaderboard = () => {
    router.push("/leaderboard")
  }

  return (
    <section
      className="py-16 border-y border-border/40 bg-gradient-to-r from-background via-card/20 to-background"
      id="leaderboard"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Platform Statistics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics from the EchoFi ecosystem showing community engagement and market activity
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-300 hover:scale-105"
            >
              <div className={`text-3xl lg:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
              <div className="text-xs text-accent font-medium flex items-center justify-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} this week
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Top Performers</h3>
          <p className="text-muted-foreground mb-6">
            See who's leading in predictions, debates, and community engagement
          </p>
          <Button
            onClick={handleViewLeaderboard}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
          >
            View Full Leaderboard
            <Trophy className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
