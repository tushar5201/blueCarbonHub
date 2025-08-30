import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock community actions feed
const mockCommunityActions = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "/woman-profile.png",
    },
    type: "Beach Cleanup",
    location: "Santa Monica Beach",
    description: "Removed 15 lbs of plastic waste from the shoreline",
    image: "/beach-cleanup-plastic-waste-removal.png",
    credits: 50,
    date: "2024-01-15T10:30:00Z",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      avatar: "/man-profile.png",
    },
    type: "Mangrove Planting",
    location: "Everglades National Park",
    description: "Planted 25 mangrove seedlings in restoration area",
    image: "/mangrove-planting.png",
    credits: 75,
    date: "2024-01-14T14:15:00Z",
    likes: 18,
    comments: 5,
  },
  {
    id: 3,
    user: {
      name: "Emma Rodriguez",
      avatar: "/woman-profile.png",
    },
    type: "Seagrass Monitoring",
    location: "Monterey Bay",
    description: "Documented seagrass health in 3 monitoring plots",
    image: "/seagrass-underwater.png",
    credits: 40,
    date: "2024-01-13T09:45:00Z",
    likes: 8,
    comments: 2,
  },
]

export async function GET() {
  return NextResponse.json(mockCommunityActions)
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as any

    const body = await request.json()
    const { type, location, description, image, coordinates } = body

    // Calculate credits based on action type
    const creditMap: { [key: string]: number } = {
      "Beach Cleanup": 50,
      "Mangrove Planting": 75,
      "Seagrass Monitoring": 40,
      "Coral Restoration": 80,
      "Kelp Forest Restoration": 60,
      "Salt Marsh Restoration": 55,
      "Oyster Reef Building": 70,
    }

    const credits = creditMap[type] || 30

    // In real app, save to database and update user credits
    const newAction = {
      id: Date.now(),
      user: {
        name: decoded.name,
        avatar: decoded.avatar || "/placeholder.svg",
      },
      type,
      location,
      description,
      image,
      coordinates,
      credits,
      date: new Date().toISOString(),
      likes: 0,
      comments: 0,
    }

    return NextResponse.json(newAction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
