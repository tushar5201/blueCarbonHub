import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, MessageSquare } from "lucide-react"

interface ProjectUpdate {
  id: string
  title: string
  content: string
  author: string
  date: string
  type: "progress" | "milestone" | "news"
}

interface ProjectUpdatesProps {
  projectId: string
}

// Mock updates data
const mockUpdates: ProjectUpdate[] = [
  {
    id: "1",
    title: "Mangrove Seedlings Successfully Planted",
    content:
      "We've successfully planted 15,000 mangrove seedlings across 50 hectares of the restoration site. The survival rate has been excellent at 92%, thanks to our community volunteers and favorable weather conditions.",
    author: "Dr. Sarah Rahman",
    date: "2024-03-15",
    type: "milestone",
  },
  {
    id: "2",
    title: "Community Training Program Completed",
    content:
      "Our 3-week training program for local community members has been completed. 45 participants learned about mangrove ecology, restoration techniques, and sustainable fishing practices.",
    author: "Ahmed Hassan",
    date: "2024-03-01",
    type: "progress",
  },
  {
    id: "3",
    title: "Nursery Expansion Project Begins",
    content:
      "Construction has begun on expanding our mangrove nursery facility. The new facility will triple our seedling production capacity to support larger restoration areas.",
    author: "Dr. Sarah Rahman",
    date: "2024-02-20",
    type: "news",
  },
]

export function ProjectUpdates({ projectId }: ProjectUpdatesProps) {
  const getUpdateTypeColor = (type: string) => {
    const colors = {
      milestone: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      news: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    }
    return colors[type as keyof typeof colors] || colors.news
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Project Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockUpdates.map((update) => (
            <div key={update.id} className="border-l-2 border-muted pl-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="font-medium">{update.title}</h4>
                <Badge className={getUpdateTypeColor(update.type)}>{update.type}</Badge>
              </div>

              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{update.content}</p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{update.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(update.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
