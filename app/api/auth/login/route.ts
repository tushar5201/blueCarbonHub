import { type NextRequest, NextResponse } from "next/server"
import { createHmac } from "crypto"

// Mock database - in production, this would be replaced with actual database calls
const mockUsers = [
  {
    id: "1",
    email: "admin@demo.com",
    password: "demo123", // Using plain text for demo simplicity
    name: "Admin User",
    role: "admin" as const,
    credits: 1000,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "ngo@demo.com",
    password: "demo123", // Using plain text for demo simplicity
    name: "NGO Manager",
    role: "ngo_manager" as const,
    credits: 500,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "user@demo.com",
    password: "demo123", // Using plain text for demo simplicity
    name: "Regular User",
    role: "user" as const,
    credits: 150,
    createdAt: "2024-01-01T00:00:00Z",
  },
]

const JWT_SECRET = process.env.JWT_SECRET || "bluecarbon-hub-dev-secret-key-change-in-production"

function createToken(payload: any): string {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = { ...payload, iat: now, exp: now + 7 * 24 * 60 * 60 } // 7 days

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url")
  const encodedPayload = Buffer.from(JSON.stringify(tokenPayload)).toString("base64url")

  const signature = createHmac("sha256", JWT_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest("base64url")

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Login API called")

    const body = await request.json()
    console.log("[v0] Request body parsed:", { email: body.email, hasPassword: !!body.password })

    const { email, password } = body

    if (!email || !password) {
      console.log("[v0] Missing email or password")
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      console.log("[v0] User not found:", email)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    console.log("[v0] User found:", user.email)

    if (password !== user.password) {
      console.log("[v0] Invalid password for user:", email)
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    console.log("[v0] Password verified, generating token")

    const token = createToken({ userId: user.id, email: user.email, role: user.role })

    console.log("[v0] Token generated successfully")

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? String(error) : undefined,
        stack: process.env.NODE_ENV === "development" ? (error as Error).stack : undefined,
      },
      { status: 500 },
    )
  }
}
