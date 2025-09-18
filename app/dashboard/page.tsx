import { WalletGuard } from "@/components/wallet-guard"
import { UserProfile } from "@/components/dashboard/user-profile"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { ActivePositions } from "@/components/dashboard/active-positions"
import { NFTCollection } from "@/components/dashboard/nft-collection"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { DebateHistory } from "@/components/dashboard/debate-history"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <WalletGuard>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your predictions, debates, and NFT collection</p>
          </div>

          <div className="space-y-8">
            <UserProfile />
            <PortfolioOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActivePositions />
              <NFTCollection />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivity />
              <DebateHistory />
            </div>
          </div>
        </div>
      </WalletGuard>
    </div>
  )
}
