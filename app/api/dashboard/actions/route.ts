import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock recent actions data
const mockActions = [
  {
    id: 1,
    type: "Beach Cleanup",
    location: "Santa Monica Beach",
    date: "2024-01-15",
    credits: 50,
    image: "/beach-cleanup-plastic-waste-removal.png",
  },
  {
    id: 2,
    type: "Mangrove Planting",
    location: "Everglades National Park",
    date: "2024-01-12",
    credits: 75,
    image: "/mangrove-planting.png",
  },
  {
    id: 3,
    type: "Seagrass Monitoring",
    location: "Monterey Bay",
    date: "2024-01-08",
    credits: 40,
    image: "/seagrass-underwater.png",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    return NextResponse.json(mockActions)
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
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

    // In real app, save to database
    const newAction = {
      id: Date.now(),
      userId: decoded.id,
      type,
      location,
      description,
      image,
      coordinates,
      date: new Date().toISOString(),
      credits: Math.floor(Math.random() * 50) + 25, // Random credits 25-75
      status: "pending",
    }

    return NextResponse.json(newAction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
