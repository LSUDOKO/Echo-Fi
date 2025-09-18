"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Brain, Trophy, Coins, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export function HowItWorks() {
  const router = useRouter()

  const steps = [
    {
      icon: MessageSquare,
      title: "Create or Join Debates",
      description: "Mint NFT debate tokens to enter prediction markets and participate in discussions.",
      action: "Start Debating",
      link: "/debates",
      color: "from-primary/20 to-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI oracle analyzes arguments using sentiment analysis and keyword scoring.",
      action: "View Oracle",
      link: "/oracle",
      color: "from-accent/20 to-accent/10",
      iconColor: "text-accent",
    },
    {
      icon: Trophy,
      title: "Community Resolution",
      description: "Vote to override AI decisions and ensure fair outcomes through community consensus.",
      action: "Join Community",
      link: "/leaderboard",
      color: "from-chart-3/20 to-chart-3/10",
      iconColor: "text-chart-3",
    },
    {
      icon: Coins,
      title: "Earn Yields",
      description: "Winners receive amplified yields while losers' stakes fund ecosystem grants.",
      action: "View Dashboard",
      link: "/dashboard",
      color: "from-chart-4/20 to-chart-4/10",
      iconColor: "text-chart-4",
    },
  ]

  const handleStepAction = (link: string) => {
    router.push(link)
  }

  const handleGetStarted = () => {
    router.push("/markets")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How EchoFi Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step process to break echo chambers and earn from your insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 group"
            >
              <CardContent className="pt-6">
                <div className="relative mb-4 flex justify-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon className={`h-8 w-8 ${step.iconColor}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-foreground hover:bg-primary transition-all duration-200 group-hover:scale-105"
                  onClick={() => handleStepAction(step.link)}
                >
                  {step.action}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Break the Echo Chamber?</h3>
            <p className="text-muted-foreground">
              Join thousands of users already earning yields through intelligent discourse and accurate predictions.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
            onClick={handleGetStarted}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
