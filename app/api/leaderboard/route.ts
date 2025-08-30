import { NextResponse } from "next/server"

// Mock leaderboard data
const mockLeaderboard = {
  contributors: [
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
  ],
  ngos: [
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
  ],
  projects: [
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
  ],
}

export async function GET() {
  return NextResponse.json(mockLeaderboard)
}
