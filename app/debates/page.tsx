import { WalletGuard } from "@/components/wallet-guard"
import { DebatesList } from "@/components/debates/debates-list"
import { DebateFilters } from "@/components/debates/debate-filters"
import { CreateDebateButton } from "@/components/debates/create-debate-button"

export default function DebatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Debate Forum</h1>
            <p className="text-muted-foreground">Engage in AI-moderated debates and shape prediction market outcomes</p>
          </div>
          <WalletGuard>
            <CreateDebateButton />
          </WalletGuard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <DebateFilters />
          </div>
          <div className="lg:col-span-3">
            <DebatesList />
          </div>
        </div>
      </div>
    </div>
  )
}
