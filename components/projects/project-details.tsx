import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Project } from "@/lib/types"
import { MapPin, Calendar, Leaf, DollarSign, Clock } from "lucide-react"

interface ProjectDetailsProps {
  project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
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
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <img src={project.images[0] || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
        <Badge className={`absolute top-4 left-4 ${getStatusColor(project.status)}`}>{project.status}</Badge>
      </div>

      {/* Project Header */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
            {project.endDate && (
              <>
                <span>-</span>
                <span>{new Date(project.endDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{project.area}</div>
                <div className="text-sm text-muted-foreground">Hectares</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">{(project.carbonImpactPerYear / 1000).toFixed(0)}k</div>
                <div className="text-sm text-muted-foreground">Tons CO₂/year</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{project.totalPledgedHours.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Hours Pledged</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">${(project.totalPledgedFunds / 1000).toFixed(0)}k</div>
                <div className="text-sm text-muted-foreground">Funds Pledged</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About This Project</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}
