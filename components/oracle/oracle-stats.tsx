"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, CheckCircle, Clock, TrendingUp } from "lucide-react"

export function OracleStats() {
  const stats = [
    {
      title: "Total Analyses",
      value: "2,847",
      change: "+12%",
      icon: Brain,
      color: "text-primary",
    },
    {
      title: "Resolved Markets",
      value: "1,234",
      change: "+8%",
      icon: CheckCircle,
      color: "text-accent",
    },
    {
      title: "Pending Resolutions",
      value: "23",
      change: "-5%",
      icon: Clock,
      color: "text-chart-3",
    },
    {
      title: "Accuracy Rate",
      value: "87.3%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-accent",
    },
  ]

  const oracleHealth = {
    overall: 94,
    sentiment: 91,
    keyword: 97,
    consensus: 89,
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-accent font-medium">{stat.change} this week</p>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Oracle Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            Oracle Health Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Health</span>
                <span className="font-medium">{oracleHealth.overall}%</span>
              </div>
              <Progress value={oracleHealth.overall} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sentiment Analysis</span>
                <span className="font-medium">{oracleHealth.sentiment}%</span>
              </div>
              <Progress value={oracleHealth.sentiment} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Keyword Scoring</span>
                <span className="font-medium">{oracleHealth.keyword}%</span>
              </div>
              <Progress value={oracleHealth.keyword} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Consensus Building</span>
                <span className="font-medium">{oracleHealth.consensus}%</span>
              </div>
              <Progress value={oracleHealth.consensus} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
