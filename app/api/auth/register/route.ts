import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role = "user" } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ message: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // In production, check if user already exists in database
    // For demo, we'll just create a new user
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: role as "user" | "ngo_manager" | "admin",
      credits: role === "ngo_manager" ? 500 : 100,
      createdAt: new Date().toISOString(),
    }

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: "7d",
    })

    return NextResponse.json({
      user: newUser,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
