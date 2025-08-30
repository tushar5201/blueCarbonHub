import { LeaderboardHeader } from "@/components/leaderboard/leaderboard-header"
import { LeaderboardTabs } from "@/components/leaderboard/leaderboard-tabs"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <LeaderboardHeader />
        <LeaderboardTabs />
      </div>
    </div>
  )
}
