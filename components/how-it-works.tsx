import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Brain, Trophy, Coins } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: MessageSquare,
      title: "Create or Join Debates",
      description: "Mint NFT debate tokens to enter prediction markets and participate in discussions.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our AI oracle analyzes arguments using sentiment analysis and keyword scoring.",
    },
    {
      icon: Trophy,
      title: "Community Resolution",
      description: "Vote to override AI decisions and ensure fair outcomes through community consensus.",
    },
    {
      icon: Coins,
      title: "Earn Yields",
      description: "Winners receive amplified yields while losers' stakes fund ecosystem grants.",
    },
  ]

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How EchoFi Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple 4-step process to break echo chambers and earn from your insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
