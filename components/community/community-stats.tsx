"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-provider"
import { Award, Target, TrendingUp, Users } from "lucide-react"

export function CommunityStats() {
  const { user } = useAuth()

  const userStats = {
    totalActions: 12,
    totalCredits: 285,
    monthlyGoal: 500,
    rank: 156,
    streak: 7,
  }

  const achievements = [
    { name: "First Action", description: "Logged your first conservation action", earned: true },
    { name: "Tree Planter", description: "Planted 100+ trees or mangroves", earned: true },
    { name: "Beach Guardian", description: "Completed 5+ cleanup actions", earned: false },
    { name: "Educator", description: "Led 3+ educational activities", earned: false },
  ]

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Community Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">2.4M</div>
            <div className="text-sm text-muted-foreground">Tons CO₂ Sequestered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">45.2K</div>
            <div className="text-sm text-muted-foreground">Actions Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">12.8K</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-600" />
            Your Impact
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600 mb-1">{userStats.totalActions}</div>
              <div className="text-sm text-muted-foreground">Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{userStats.totalCredits}</div>
              <div className="text-sm text-muted-foreground">Credits</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Monthly Goal</span>
              <span>
                {userStats.totalCredits}/{userStats.monthlyGoal}
              </span>
            </div>
            <Progress value={(userStats.totalCredits / userStats.monthlyGoal) * 100} className="h-2" />
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>Rank #{userStats.rank}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span>{userStats.streak} day streak</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  achievement.earned ? "bg-yellow-100 text-yellow-600" : "bg-muted text-muted-foreground"
                }`}
              >
                <Award className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm ${achievement.earned ? "" : "text-muted-foreground"}`}>
                  {achievement.name}
                </div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
              {achievement.earned && (
                <Badge variant="secondary" className="text-xs">
                  Earned
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Top Contributors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Sarah Chen", credits: 1250, rank: 1 },
            { name: "Marcus Johnson", credits: 1180, rank: 2 },
            { name: "Elena Rodriguez", credits: 1050, rank: 3 },
          ].map((user, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                {user.rank}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.credits} credits</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
