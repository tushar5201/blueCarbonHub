"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Leaf, Clock, DollarSign, Users, Building2, Crown } from "lucide-react"

export function LeaderboardTabs() {
  // Mock leaderboard data
  const topContributors = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/woman-profile.png",
      credits: 2450,
      actions: 28,
      hours: 45,
      rank: 1,
      badge: "Ocean Guardian",
    },
    {
      id: 2,
      name: "Mike Chen",
      avatar: "/man-profile.png",
      credits: 2180,
      actions: 24,
      hours: 38,
      rank: 2,
      badge: "Reef Protector",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/woman-profile.png",
      credits: 1950,
      actions: 22,
      hours: 42,
      rank: 3,
      badge: "Mangrove Champion",
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "/man-profile.png",
      credits: 1820,
      actions: 19,
      hours: 35,
      rank: 4,
      badge: "Carbon Saver",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "/woman-profile.png",
      credits: 1650,
      actions: 18,
      hours: 29,
      rank: 5,
      badge: "Eco Warrior",
    },
  ]

  const topNGOs = [
    {
      id: 1,
      name: "Ocean Guardians",
      logo: "/ocean-logo.png",
      projects: 8,
      volunteers: 127,
      fundsRaised: 45200,
      impact: 9.2,
      rank: 1,
    },
    {
      id: 2,
      name: "Marine Conservation Alliance",
      logo: "/marine-logo.png",
      projects: 6,
      volunteers: 98,
      fundsRaised: 38500,
      impact: 8.8,
      rank: 2,
    },
    {
      id: 3,
      name: "Blue Planet Initiative",
      logo: "/planet-logo.png",
      projects: 5,
      volunteers: 84,
      fundsRaised: 32100,
      impact: 8.5,
      rank: 3,
    },
  ]

  const topProjects = [
    {
      id: 1,
      name: "Great Barrier Reef Restoration",
      ngo: "Ocean Guardians",
      volunteers: 45,
      fundsRaised: 12500,
      carbonSaved: 8.2,
      rank: 1,
    },
    {
      id: 2,
      name: "Kelp Forest Recovery",
      ngo: "Marine Conservation Alliance",
      volunteers: 38,
      fundsRaised: 9800,
      carbonSaved: 6.7,
      rank: 2,
    },
    {
      id: 3,
      name: "Mangrove Reforestation",
      ngo: "Blue Planet Initiative",
      volunteers: 32,
      fundsRaised: 8200,
      carbonSaved: 5.9,
      rank: 3,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Tabs defaultValue="contributors" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
        <TabsTrigger value="ngos">Top NGOs</TabsTrigger>
        <TabsTrigger value="projects">Top Projects</TabsTrigger>
      </TabsList>

      <TabsContent value="contributors" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Individual Contributors
            </CardTitle>
            <CardDescription>Ranked by total credits earned through conservation actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topContributors.map((contributor) => (
              <div
                key={contributor.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  contributor.rank <= 3 ? "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(contributor.rank)}`}
                  >
                    {contributor.rank <= 3 ? getRankIcon(contributor.rank) : `#${contributor.rank}`}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{contributor.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {contributor.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {contributor.credits} credits
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      {contributor.actions} actions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {contributor.hours}h volunteered
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{contributor.credits.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">credits</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ngos" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              Top NGOs
            </CardTitle>
            <CardDescription>Organizations making the biggest impact in blue carbon conservation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topNGOs.map((ngo) => (
              <div
                key={ngo.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  ngo.rank <= 3 ? "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(ngo.rank)}`}>
                    {ngo.rank <= 3 ? getRankIcon(ngo.rank) : `#${ngo.rank}`}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ngo.logo || "/placeholder.svg"} />
                    <AvatarFallback>{ngo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{ngo.name}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {ngo.projects} projects
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {ngo.volunteers} volunteers
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />${ngo.fundsRaised.toLocaleString()} raised
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{ngo.impact}/10</div>
                  <div className="text-sm text-gray-600">impact score</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="projects" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-green-600" />
              Top Projects
            </CardTitle>
            <CardDescription>Most successful conservation projects by community engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProjects.map((project) => (
              <div
                key={project.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  project.rank <= 3 ? "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200" : "bg-white"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRankBadge(project.rank)}`}>
                  {project.rank <= 3 ? getRankIcon(project.rank) : `#${project.rank}`}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.ngo}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {project.volunteers} volunteers
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />${project.fundsRaised.toLocaleString()} raised
                    </div>
                    <div className="flex items-center gap-1">
                      <Leaf className="w-4 h-4" />
                      {project.carbonSaved} tons CO₂ saved
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{project.carbonSaved}</div>
                  <div className="text-sm text-gray-600">tons CO₂</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
