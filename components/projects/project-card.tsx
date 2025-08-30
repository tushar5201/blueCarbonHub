import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { Project } from "@/lib/types"
import Link from "next/link"
import { MapPin, Leaf, Clock, DollarSign } from "lucide-react"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      planning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      paused: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    }
    return colors[status as keyof typeof colors] || colors.planning
  }

  const getProgress = () => {
    if (project.status === "completed") return 100
    if (project.status === "planning") return 0

    const start = new Date(project.startDate).getTime()
    const end = project.endDate ? new Date(project.endDate).getTime() : Date.now() + 365 * 24 * 60 * 60 * 1000
    const now = Date.now()

    const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
    return Math.round(progress)
  }

  const progress = getProgress()

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <img src={project.images[0] || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover -mt-6" />
        <Badge className={`absolute top-3 left-3 ${getStatusColor(project.status)}`}>{project.status}</Badge>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{project.title}</h3>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {project.location}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>{project.area} ha</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span>{(project.carbonImpactPerYear / 1000).toFixed(1)}k tons/yr</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{project.totalPledgedHours.toLocaleString()} hrs</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>${project.totalPledgedFunds.toLocaleString()}</span>
          </div>
        </div>

        <Button asChild className="w-full">
          <Link href={`/projects/${project.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
