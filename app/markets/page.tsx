import { WalletGuard } from "@/components/wallet-guard"
import { MarketsList } from "@/components/markets/markets-list"
import { CreateMarketButton } from "@/components/markets/create-market-button"
import { MarketFilters } from "@/components/markets/market-filters"

export default function MarketsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Prediction Markets</h1>
            <p className="text-muted-foreground">
              Stake your beliefs on future outcomes and engage in meaningful debates
            </p>
          </div>
          <WalletGuard>
            <CreateMarketButton />
          </WalletGuard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MarketFilters />
          </div>
          <div className="lg:col-span-3">
            <MarketsList />
          </div>
        </div>
      </div>
    </div>
  )
}
