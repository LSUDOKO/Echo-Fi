import { OracleOverview } from "@/components/oracle/oracle-overview"
import { RecentAnalyses } from "@/components/oracle/recent-analyses"
import { OracleStats } from "@/components/oracle/oracle-stats"
import { PendingResolutions } from "@/components/oracle/pending-resolutions"

export default function OraclePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Oracle Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor AI analysis, pending resolutions, and oracle performance metrics
          </p>
        </div>

        <div className="space-y-8">
          <OracleStats />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PendingResolutions />
            <RecentAnalyses />
          </div>
          <OracleOverview />
        </div>
      </div>
    </div>
  )
}
