import { Trophy, Users, TrendingUp } from "lucide-react"

export function LeaderboardHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-4xl font-bold text-gray-900">Community Leaderboard</h1>
      </div>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Celebrating our top contributors making a difference in blue carbon conservation
      </p>

      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600">2,847</div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <Users className="w-4 h-4" />
            Active Members
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">156</div>
          <div className="text-sm text-gray-600">Active Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">847 tons</div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            CO₂ Saved
          </div>
        </div>
      </div>
    </div>
  )
}
