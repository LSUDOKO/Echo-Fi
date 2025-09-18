"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Brain, Settings, Activity, BarChart3, AlertCircle } from "lucide-react"

export function OracleOverview() {
  const algorithmMetrics = {
    sentimentAnalysis: {
      accuracy: 89,
      processed: 2847,
      avgConfidence: 84,
    },
    keywordScoring: {
      accuracy: 94,
      processed: 2847,
      avgConfidence: 91,
    },
    consensusBuilding: {
      accuracy: 87,
      processed: 1234,
      avgConfidence: 79,
    },
  }

  const recentUpdates = [
    {
      id: "1",
      type: "algorithm",
      title: "Sentiment Analysis Model Updated",
      description: "Improved accuracy by 3.2% with new training data",
      timestamp: "2h ago",
      status: "success",
    },
    {
      id: "2",
      type: "resolution",
      title: "Market Resolution Override",
      description: "Community voted to override AI recommendation for ETH market",
      timestamp: "4h ago",
      status: "warning",
    },
    {
      id: "3",
      type: "performance",
      title: "High Confidence Threshold Reached",
      description: "AI confidence exceeded 95% for Somnia TVL prediction",
      timestamp: "6h ago",
      status: "success",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-accent border-accent"
      case "warning":
        return "text-chart-3 border-chart-3"
      case "error":
        return "text-destructive border-destructive"
      default:
        return "text-muted-foreground border-border"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Activity className="h-3 w-3" />
      case "warning":
        return <AlertCircle className="h-3 w-3" />
      case "error":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Activity className="h-3 w-3" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            Oracle System Overview
          </div>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="algorithms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="algorithms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{algorithmMetrics.sentimentAnalysis.accuracy}%</span>
                  </div>
                  <Progress value={algorithmMetrics.sentimentAnalysis.accuracy} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {algorithmMetrics.sentimentAnalysis.processed.toLocaleString()} arguments processed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg confidence: {algorithmMetrics.sentimentAnalysis.avgConfidence}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Keyword Scoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{algorithmMetrics.keywordScoring.accuracy}%</span>
                  </div>
                  <Progress value={algorithmMetrics.keywordScoring.accuracy} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {algorithmMetrics.keywordScoring.processed.toLocaleString()} arguments processed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg confidence: {algorithmMetrics.keywordScoring.avgConfidence}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Consensus Building</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{algorithmMetrics.consensusBuilding.accuracy}%</span>
                  </div>
                  <Progress value={algorithmMetrics.consensusBuilding.accuracy} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    {algorithmMetrics.consensusBuilding.processed.toLocaleString()} resolutions processed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Avg confidence: {algorithmMetrics.consensusBuilding.avgConfidence}%
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {recentUpdates.map((update) => (
              <div key={update.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <div className={`p-2 rounded-full bg-muted ${getStatusColor(update.status)}`}>
                  {getStatusIcon(update.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{update.title}</h4>
                    <span className="text-xs text-muted-foreground">{update.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{update.description}</p>
                  <Badge variant="outline" className={`text-xs mt-2 ${getStatusColor(update.status)}`}>
                    {update.type}
                  </Badge>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Resolution Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last 30 Days</span>
                      <span className="text-2xl font-bold text-accent">87.3%</span>
                    </div>
                    <Progress value={87.3} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      Based on 156 resolved markets with community validation
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="mr-2 h-5 w-5" />
                    Processing Speed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Response Time</span>
                      <span className="text-2xl font-bold text-primary">0.8s</span>
                    </div>
                    <Progress value={92} className="h-3" />
                    <div className="text-xs text-muted-foreground">
                      Target: &lt;1s | 99.2% of analyses completed within target
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
