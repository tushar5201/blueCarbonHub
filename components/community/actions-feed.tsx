"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Action } from "@/lib/types"
import { MapPin, Calendar, Award, Heart, MessageCircle, Share2 } from "lucide-react"

// Mock actions data
const mockActions: Action[] = [
  {
    id: "1",
    userId: "user1",
    type: "planting",
    description:
      "Planted 50 mangrove seedlings along the coastal restoration site in Sundarbans. Great teamwork with local volunteers!",
    location: "Sundarbans, Bangladesh",
    coordinates: { lat: 21.75, lng: 89.25 },
    photos: ["/local-community-planting-mangroves.png"],
    creditsEarned: 25,
    verified: true,
    createdAt: "2024-03-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "user2",
    type: "cleanup",
    description:
      "Organized beach cleanup removing 45kg of plastic waste from seagrass habitat. Found some interesting marine life too!",
    location: "Great Barrier Reef, Australia",
    coordinates: { lat: -16.05, lng: 145.95 },
    photos: ["/beach-cleanup-plastic-waste-removal.png"],
    creditsEarned: 20,
    verified: true,
    createdAt: "2024-03-14T14:15:00Z",
  },
  {
    id: "3",
    userId: "user3",
    type: "monitoring",
    description:
      "Conducted water quality monitoring in the restored wetland area. pH levels and oxygen content looking healthy!",
    location: "Florida Everglades, USA",
    coordinates: { lat: 25.5, lng: -80.6 },
    photos: ["/water-quality-monitoring-wetlands.png"],
    creditsEarned: 15,
    verified: false,
    createdAt: "2024-03-13T09:45:00Z",
  },
  {
    id: "4",
    userId: "user4",
    type: "education",
    description:
      "Led educational workshop for 30 local school children about mangrove ecosystems and their importance for climate change.",
    location: "Caribbean Islands",
    coordinates: { lat: 18.2, lng: -66.5 },
    photos: ["/educational-workshop-school-children.png"],
    creditsEarned: 30,
    verified: true,
    createdAt: "2024-03-12T16:20:00Z",
  },
]

// Mock user data
const mockUsers = {
  user1: { name: "Sarah Chen", avatar: "/placeholder.svg" },
  user2: { name: "Marcus Johnson", avatar: "/placeholder.svg" },
  user3: { name: "Elena Rodriguez", avatar: "/placeholder.svg" },
  user4: { name: "David Kim", avatar: "/placeholder.svg" },
}

export function ActionsFeed() {
  const [actions, setActions] = useState<Action[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActions = async () => {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setActions(mockActions)
      setLoading(false)
    }

    loadActions()
  }, [])

  const getActionTypeColor = (type: string) => {
    const colors = {
      planting: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
      cleanup: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      monitoring: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      education: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    }
    return colors[type as keyof typeof colors] || colors.planting
  }

  const getActionTypeIcon = (type: string) => {
    // Return appropriate icon based on type
    return "🌱" // Simplified for now
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recent Community Actions</h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const user = mockUsers[action.userId as keyof typeof mockUsers]
          return (
            <Card key={action.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{user?.name}</span>
                      <Badge className={getActionTypeColor(action.type)}>{action.type}</Badge>
                      {action.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground">{action.description}</p>

                    {action.photos.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {action.photos.slice(0, 3).map((photo, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={photo || "/placeholder.svg"}
                              alt={`Action photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{action.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(action.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span>{action.creditsEarned} credits</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button variant="outline">Load More Actions</Button>
      </div>
    </div>
  )
}
