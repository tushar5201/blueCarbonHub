"use client"

import { useState, useEffect } from "react"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import React from "react"

// Mock projects data
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Sundarbans Mangrove Restoration",
    description:
      "Restoring 500 hectares of mangrove forests in the world's largest mangrove ecosystem to protect coastal communities and sequester carbon.",
    location: "Sundarbans, Bangladesh",
    ngoId: "1",
    area: 500,
    carbonImpactPerYear: 125000,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2026-12-31",
    images: ["/mangrove-forest-restoration-project.png"],
    coordinates: { lat: 21.75, lng: 89.25 },
    totalPledgedHours: 2340,
    totalPledgedFunds: 45000,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    title: "Florida Everglades Wetland Protection",
    description:
      "Protecting and expanding critical wetland habitats in the Florida Everglades through restoration and conservation efforts.",
    location: "Florida, USA",
    ngoId: "2",
    area: 300,
    carbonImpactPerYear: 89500,
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-08-31",
    images: ["/florida-everglades-wetland-conservation.png"],
    coordinates: { lat: 25.5, lng: -80.6 },
    totalPledgedHours: 1560,
    totalPledgedFunds: 32000,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    title: "Great Barrier Reef Seagrass Initiative",
    description:
      "Restoring seagrass meadows to support marine life and enhance carbon sequestration in the Great Barrier Reef region.",
    location: "Queensland, Australia",
    ngoId: "3",
    area: 200,
    carbonImpactPerYear: 67200,
    status: "active",
    startDate: "2024-03-01",
    images: ["/seagrass-meadow-restoration-underwater.png"],
    coordinates: { lat: -16.05, lng: 145.95 },
    totalPledgedHours: 1890,
    totalPledgedFunds: 28500,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "4",
    title: "Pacific Northwest Salt Marsh Recovery",
    description:
      "Restoring degraded salt marsh ecosystems along the Pacific Northwest coast to enhance biodiversity and carbon storage.",
    location: "Oregon, USA",
    ngoId: "1",
    area: 150,
    carbonImpactPerYear: 45000,
    status: "planning",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    images: ["/salt-marsh-restoration-pacific-northwest.png"],
    coordinates: { lat: 45.5, lng: -123.8 },
    totalPledgedHours: 450,
    totalPledgedFunds: 12000,
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-02-15T00:00:00Z",
  },
  {
    id: "5",
    title: "Caribbean Mangrove Nursery Program",
    description:
      "Establishing mangrove nurseries and replanting programs across multiple Caribbean islands to restore coastal protection.",
    location: "Caribbean Islands",
    ngoId: "2",
    area: 400,
    carbonImpactPerYear: 98000,
    status: "active",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    images: ["/caribbean-mangrove-nursery-planting.png"],
    coordinates: { lat: 18.2, lng: -66.5 },
    totalPledgedHours: 3200,
    totalPledgedFunds: 55000,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    title: "Mediterranean Posidonia Seagrass Conservation",
    description:
      "Protecting and restoring Posidonia oceanica seagrass meadows in the Mediterranean Sea, crucial for marine biodiversity.",
    location: "Mediterranean Sea",
    ngoId: "3",
    area: 250,
    carbonImpactPerYear: 72500,
    status: "completed",
    startDate: "2023-04-01",
    endDate: "2024-03-31",
    images: ["/mediterranean-posidonia-seagrass-underwater.png"],
    coordinates: { lat: 42.5, lng: 3.2 },
    totalPledgedHours: 2800,
    totalPledgedFunds: 42000,
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2024-03-31T00:00:00Z",
  },
]

interface ProjectsGridProps {
  search: string
}

export function ProjectsGrid({ search }: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const projectsPerPage = 6

  useEffect(() => {
    // Simulate API call
    const loadProjects = async () => {
      setLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProjects(mockProjects)
      setLoading(false)
    }

    loadProjects()
  }, [])

  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIndex = (page - 1) * projectsPerPage
  const displayedProjects = projects.slice(startIndex, startIndex + projectsPerPage)

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length === 0 ? (
          <div className="col-span-3 text-center text-muted-foreground py-8">
            No projects found.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <Button key={i} variant={page === i + 1 ? "default" : "outline"} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Button>
          ))}

          <Button variant="outline" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
