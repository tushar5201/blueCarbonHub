"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Leaf, MapPin, Clock, DollarSign, Users, Award, TrendingUp, Calendar, Camera, Heart } from "lucide-react"
import { NGODashboard } from "./ngo-dashboard"
import { AdminDashboard } from "./admin-dashboard"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { useState } from "react"

// Define the expected User type structure to match your database
interface UserWithType {
  id: string
  email: string
  name: string
  type: string
  credits?: number
  avatar?: string
  created_at: string
}

// Type guard function
const isUserWithType = (user: any): user is UserWithType => {
  return user && typeof user.type === 'string'
}

export function UserDashboard() {
  const { user, loading } = useAuth()

  // Add modal state
  const [profileOpen, setProfileOpen] = useState(false)
  const [activityOpen, setActivityOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Please log in</div>
  }

  // Route to appropriate dashboard based on type
  const userType = isUserWithType(user) ? user.type : 'user'
  
  if (userType === "NGO") {
    return <NGODashboard />
  }

  if (userType === "admin") {
    return <AdminDashboard />
  }

  // Helper function to get user initials safely
  const getUserInitials = (name?: string, email?: string) => {
    if (name && name.trim()) {
      const words = name.trim().split(' ')
      if (words.length >= 2) {
        return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase()
      }
      return name.charAt(0).toUpperCase()
    }
    if (email) {
      return email.charAt(0).toUpperCase()
    }
    return 'U'
  }

  // Helper function to get display name
  const getDisplayName = () => {
    return user.name || user.email || 'User'
  }

  // Mock data for user dashboard
  const userStats = {
    totalActions: 12,
    carbonSaved: 2.4,
    hoursVolunteered: 18,
    projectsPledged: 3,
    creditsEarned: user.credits || 0,
    rank: 47,
    streak: 5,
  }

  const recentActions = [
    {
      id: 1,
      type: "Beach Cleanup",
      location: "Santa Monica Beach",
      date: "2024-01-15",
      credits: 50,
      image: "/beach-cleanup-plastic-waste-removal.png",
    },
    {
      id: 2,
      type: "Mangrove Planting",
      location: "Everglades National Park",
      date: "2024-01-12",
      credits: 75,
      image: "/mangrove-planting.png",
    },
    {
      id: 3,
      type: "Seagrass Monitoring",
      location: "Monterey Bay",
      date: "2024-01-08",
      credits: 40,
      image: "/seagrass-underwater.png",
    },
  ]

  const pledgedProjects = [
    {
      id: 1,
      name: "Coral Reef Restoration",
      organization: "Ocean Guardians",
      pledgedHours: 8,
      pledgedAmount: 150,
      progress: 65,
    },
    {
      id: 2,
      name: "Kelp Forest Recovery",
      organization: "Marine Conservation Alliance",
      pledgedHours: 12,
      pledgedAmount: 200,
      progress: 40,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {getDisplayName()}!</h1>
          <p className="text-gray-600 mt-1">Track your impact and discover new ways to help blue carbon ecosystems</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-emerald-700 bg-emerald-100">
            <Award className="w-4 h-4 mr-1" />
            Rank #{userStats.rank}
          </Badge>
          <Badge variant="outline" className="text-blue-700 bg-blue-50">
            Type: {userType}
          </Badge>
          <Avatar className="h-12 w-12 cursor-pointer" onClick={() => setProfileOpen(true)}>
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback>{getUserInitials(user.name, user.email)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Completed</CardTitle>
            <Camera className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalActions}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.carbonSaved} tons</div>
            <p className="text-xs text-muted-foreground">+0.3 tons this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Volunteered</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.hoursVolunteered}</div>
            <p className="text-xs text-muted-foreground">+4 hours this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.creditsEarned}</div>
            <p className="text-xs text-muted-foreground">+165 this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="pledges">My Pledges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Conservation Actions</CardTitle>
              <CardDescription>Your latest contributions to blue carbon ecosystems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-emerald-50 transition"
                  onClick={() => {
                    setSelectedActivity(action)
                    setActivityOpen(true)
                  }}
                >
                  <img
                    src={action.image || "/placeholder.svg"}
                    alt={action.type}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{action.type}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {action.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(action.date).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    +{action.credits} credits
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pledges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Pledges</CardTitle>
              <CardDescription>Projects you're supporting with time and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pledgedProjects.map((project) => (
                <div key={project.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.organization}</p>
                    </div>
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{project.pledgedHours} hours pledged</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>${project.pledgedAmount} pledged</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Milestones and badges you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h4 className="font-semibold">First Action</h4>
                  <p className="text-sm text-gray-600">Completed your first conservation action</p>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold">Team Player</h4>
                  <p className="text-sm text-gray-600">Joined 3 community projects</p>
                </div>

                <div className="p-4 border rounded-lg text-center opacity-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold">Rising Star</h4>
                  <p className="text-sm text-gray-600">Reach top 25 on leaderboard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>View and manage your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{getUserInitials(user.name, user.email)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full">
                  <div>
                    <span className="font-semibold">Name:</span> {user.name || 'Not provided'}
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span> {user.email || 'Not provided'}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> {userType}
                  </div>
                  <div>
                    <span className="font-semibold">Credits:</span> {user.credits || 0}
                  </div>
                  <div>
                    <span className="font-semibold">Member since:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Activity Detail Modal */}
      <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>Full details of your conservation action</DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div className="space-y-4">
              <img
                src={selectedActivity.image || "/placeholder.svg"}
                alt={selectedActivity.type}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <div>
                <span className="font-semibold">Type:</span> {selectedActivity.type}
              </div>
              <div>
                <span className="font-semibold">Location:</span> {selectedActivity.location}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {new Date(selectedActivity.date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Credits Earned:</span> {selectedActivity.credits}
              </div>
            </div>
          )}
          <DialogFooter>
            <button
              type="button"
              className="ml-auto px-4 py-2 rounded border bg-gray-50 hover:bg-gray-100"
              onClick={() => setActivityOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Modal */}
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>My Profile</DialogTitle>
            <DialogDescription>Full account details</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{getUserInitials(user.name, user.email)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 w-full">
              <div>
                <span className="font-semibold">Name:</span> {user.name || 'Not provided'}
              </div>
              <div>
                <span className="font-semibold">Email:</span> {user.email || 'Not provided'}
              </div>
              <div>
                <span className="font-semibold">Type:</span> {userType}
              </div>
              <div>
                <span className="font-semibold">Credits:</span> {user.credits || 0}
              </div>
              <div>
                <span className="font-semibold">Member since:</span> {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Badge variant="secondary" className="text-emerald-700 bg-emerald-100">
              <Award className="w-4 h-4 mr-1" />
              Rank #{userStats.rank}
            </Badge>
            <button
              type="button"
              className="ml-auto px-4 py-2 rounded border bg-gray-50 hover:bg-gray-100"
              onClick={() => setProfileOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}