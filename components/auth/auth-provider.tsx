"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "user" | "ngo_manager" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  credits: number
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session on mount
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        localStorage.removeItem("auth_token")
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    console.log("[v0] Login function called with email:", email)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      console.log("[v0] Login response status:", response.status)
      console.log("[v0] Login response headers:", Object.fromEntries(response.headers.entries()))

      const contentType = response.headers.get("content-type")
      console.log("[v0] Response content-type:", contentType)

      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await response.text()
        console.error("[v0] Non-JSON response received:", textResponse)
        throw new Error("Server returned non-JSON response: " + textResponse.substring(0, 100))
      }

      if (!response.ok) {
        const error = await response.json()
        console.error("[v0] Login failed with error:", error)
        throw new Error(error.message || "Login failed")
      }

      const responseData = await response.json()
      console.log("[v0] Login successful, received data:", {
        hasUser: !!responseData.user,
        hasToken: !!responseData.token,
        userEmail: responseData.user?.email,
      })

      const { user: userData, token } = responseData
      localStorage.setItem("auth_token", token)
      setUser(userData)
    } catch (error) {
      console.error("[v0] Login error caught:", error)
      throw error
    }
  }

  const register = async (email: string, password: string, name: string, role: UserRole = "user") => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Registration failed")
    }

    const { user: userData, token } = await response.json()
    localStorage.setItem("auth_token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
