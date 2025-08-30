"use client"

import { use, useState, useEffect } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { ProjectDetails } from "@/components/projects/project-details"
import { ProjectPledging } from "@/components/projects/project-pledging"
import { ProjectUpdates } from "@/components/projects/project-updates"
import { ProjectGallery } from "@/components/projects/project-gallery"
import type { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock project data - in production this would come from API
const mockProject: Project = {
  id: "1",
  title: "Sundarbans Mangrove Restoration",
  description:
    "This comprehensive restoration project aims to restore 500 hectares of degraded mangrove forests in the Sundarbans, the world's largest mangrove ecosystem. The project focuses on replanting native mangrove species, establishing nurseries, and engaging local communities in conservation efforts. Our work directly contributes to coastal protection, biodiversity conservation, and significant carbon sequestration.",
  location: "Sundarbans, Bangladesh",
  ngoId: "1",
  area: 500,
  carbonImpactPerYear: 125000,
  status: "active",
  startDate: "2024-01-15",
  endDate: "2026-12-31",
  images: [
    "/mangrove-forest-restoration-project.png",
    "/mangrove-seedlings-nursery.png",
    "/local-community-planting-mangroves.png",
    "/restored-mangrove-forest-aerial-view.png",
  ],
  coordinates: { lat: 21.75, lng: 89.25 },
  totalPledgedHours: 2340,
  totalPledgedFunds: 45000,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
}

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadProject = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProject(mockProject)
      setLoading(false)
    }

    loadProject()
  }, [id])

  if (loading) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-muted rounded w-1/3" />
              <div className="h-64 bg-muted rounded" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="h-6 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
                <div className="h-96 bg-muted rounded" />
              </div>
            </div>
          </main>
        </div>
      </AuthProvider>
    )
  }

  if (!project) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
              <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
              <Button asChild>
                <Link href="/projects">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Link>
              </Button>
            </div>
          </main>
        </div>
      </AuthProvider>
    )
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProjectDetails project={project} />
              <ProjectGallery images={project.images} title={project.title} />
              <ProjectUpdates projectId={project.id} />
            </div>

            <div className="space-y-6">
              <ProjectPledging project={project} />
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
