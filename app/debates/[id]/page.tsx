import { DebateThread } from "@/components/debates/debate-thread"
import { WalletGuard } from "@/components/wallet-guard"

interface DebatePageProps {
  params: {
    id: string
  }
}

export default function DebatePage({ params }: DebatePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <WalletGuard>
        <DebateThread debateId={params.id} />
      </WalletGuard>
    </div>
  )
}
