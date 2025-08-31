"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export type UserType = "user" | "NGO" | "admin"

export interface User {
  id: string
  email: string
  name: string
  type: UserType
  credits?: number
  avatar?: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, type?: UserType) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // -------------------------------
  // Load from localStorage on mount
  // -------------------------------
  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("access_token")
      const userData = localStorage.getItem("user")

      if (token && userData) {
        try {
          const parsedUser: User = JSON.parse(userData)
          setUser(parsedUser)

          // Restore Supabase session
          await supabase.auth.setSession({
            access_token: token,
            refresh_token: localStorage.getItem("refresh_token") || "",
          })

          // Refresh profile from DB
          const { data: profile, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", parsedUser.id)
            .single()

          if (!error && profile) {
            const updatedUser: User = {
              ...parsedUser,
              name: profile.name,
              type: profile.type,
              credits: profile.credits,
              avatar: profile.avatar,
              created_at: profile.created_at,
            }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            setUser(updatedUser)
          }
        } catch (err) {
          console.error("Error restoring user from storage:", err)
          localStorage.clear()
          setUser(null)
        }
      }
      setLoading(false)
    }

    init()
  }, [])

  // -------------------------------
  // LOGIN
  // -------------------------------
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error

      const { user: supabaseUser, session } = data
      if (!supabaseUser || !session) throw new Error("Invalid Supabase login response")

      // Store tokens
      localStorage.setItem("access_token", session.access_token)
      localStorage.setItem("refresh_token", session.refresh_token || "")

      // Fetch user profile from your table
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", supabaseUser.id)
        .single()

      if (profileError || !profile) {
        throw new Error("User profile not found in DB. Did you create it in register()?")
      }

      // Format user data according to your User interface
      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        name: profile.name,
        type: profile.type,
        credits: profile.credits,
        avatar: profile.avatar,
        created_at: profile.created_at,
      }

      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    } catch (err) {
      console.error("Login error:", err)
      throw err
    }
  }

  // -------------------------------
  // REGISTER
  // -------------------------------
  const register = async (email: string, password: string, name: string, type: UserType = "user") => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error

      const { user: supabaseUser, session } = data
      if (!supabaseUser) throw new Error("Supabase did not return a user after signUp")

      // Create profile in custom table
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .insert([
          {
            id: supabaseUser.id,
            email: supabaseUser.email,
            name,
            type,
            credits: 0,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (profileError) throw profileError

      if (session) {
        localStorage.setItem("access_token", session.access_token)
        localStorage.setItem("refresh_token", session.refresh_token || "")

        // Format user data according to your User interface
        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email || "",
          name: profile.name,
          type: profile.type,
          credits: profile.credits,
          avatar: profile.avatar,
          created_at: profile.created_at,
        }

        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
      }
    } catch (err) {
      console.error("Register error:", err)
      throw err
    }
  }

  // -------------------------------
  // LOGOUT
  // -------------------------------
  const logout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.error("Supabase logout failed:", err)
    }
    localStorage.clear()
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
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}