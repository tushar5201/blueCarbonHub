"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-provider"
import Link from "next/link"
import { Plus } from "lucide-react"

export function ProjectsHeader() {
  const { user } = useAuth()
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Conservation Projects</h1>
          <p className="text-muted-foreground mt-2">Discover and support blue carbon restoration projects worldwide</p>
        </div>

        {user?.role === "ngo_manager" && (
          <Button asChild>
            <Link href="/projects/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
