import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock database - in real app this would be actual database queries
const mockStats = {
  user: {
    totalActions: 12,
    carbonSaved: 2.4,
    hoursVolunteered: 18,
    projectsPledged: 3,
    creditsEarned: 450,
    rank: 47,
    streak: 5,
  },
  ngo: {
    activeProjects: 4,
    totalVolunteers: 127,
    fundsRaised: 15420,
    hoursLogged: 892,
    impactScore: 8.7,
  },
  admin: {
    totalUsers: 2847,
    activeNGOs: 23,
    totalProjects: 156,
    systemHealth: 98.5,
    dataStorage: 2.3,
    apiCalls: 45230,
  },
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    // Return stats based on user role
    const userRole = decoded.role || "user"
    const stats = mockStats[userRole as keyof typeof mockStats] || mockStats.user

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
