import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

// Mock users for demo
const mockUsers = [
  {
    id: "1",
    email: "admin@demo.com",
    name: "Admin User",
    role: "admin" as const,
    credits: 1000,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "ngo@demo.com",
    name: "NGO Manager",
    role: "ngo_manager" as const,
    credits: 500,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "user@demo.com",
    name: "Regular User",
    role: "user" as const,
    credits: 150,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any

      // Find user by ID
      const user = mockUsers.find((u) => u.id === decoded.userId)
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      return NextResponse.json(user)
    } catch (jwtError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
