"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Building2,
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp,
  Globe,
  Database,
  Settings,
  UserCheck,
  Flag,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"

export function AdminDashboard() {
  const { user, logout } = useAuth() // Ensure logout is available

  // Modal state for review
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewType, setReviewType] = useState<"user" | "project" | null>(null)
  const [selectedReview, setSelectedReview] = useState<any>(null)

  // Mock data for admin dashboard
  const systemStats = {
    totalUsers: 2847,
    activeNGOs: 23,
    totalProjects: 156,
    systemHealth: 98.5,
    dataStorage: 2.3, // TB
    apiCalls: 45230,
  }

  const recentUsers = [
    { id: 1, name: "Sarah Johnson", email: "sarah@email.com", role: "user", joinDate: "2024-01-15", status: "active" },
    {
      id: 2,
      name: "Ocean Guardians",
      email: "contact@oceanguardians.org",
      role: "ngo_manager",
      joinDate: "2024-01-14",
      status: "pending",
    },
    { id: 3, name: "Mike Chen", email: "mike@email.com", role: "user", joinDate: "2024-01-13", status: "active" },
  ]

  const systemAlerts = [
    { id: 1, type: "warning", message: "High API usage detected", time: "2 hours ago" },
    { id: 2, type: "info", message: "Database backup completed", time: "6 hours ago" },
    { id: 3, type: "success", message: "New NGO application approved", time: "1 day ago" },
  ]

  const topProjects = [
    { id: 1, name: "Coral Reef Restoration", ngo: "Ocean Guardians", volunteers: 45, funds: 12500 },
    { id: 2, name: "Mangrove Reforestation", ngo: "Green Coast Initiative", volunteers: 38, funds: 9800 },
    { id: 3, name: "Kelp Forest Recovery", ngo: "Marine Conservation Alliance", volunteers: 32, funds: 8200 },
  ]

  // Add mock data for reports
  const projectsByNGO = [
    { ngo: "Ocean Guardians", projects: 12 },
    { ngo: "Green Coast Initiative", projects: 8 },
    { ngo: "Marine Conservation Alliance", projects: 5 },
  ]
  const userRoles = [
    { role: "User", value: 2100 },
    { role: "NGO Manager", value: 500 },
    { role: "Admin", value: 50 },
  ]
  const COLORS = ["#10b981", "#3b82f6", "#f59e42"]

  // Review button handler
  const handleReview = (type: "user" | "project", data: any) => {
    setReviewType(type)
    setSelectedReview(data)
    setReviewOpen(true)
  }

  const handleCloseReview = () => {
    setReviewOpen(false)
    setReviewType(null)
    setSelectedReview(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform oversight and system management</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+127 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active NGOs</CardTitle>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeNGOs}</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">+8 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Storage</CardTitle>
            <Database className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.dataStorage} TB</div>
            <p className="text-xs text-muted-foreground">78% capacity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Globe className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.apiCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Project Oversight</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>New registrations and user status changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {user.role === "ngo_manager" ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === "ngo_manager" ? "default" : "secondary"}>
                      {user.role.replace("_", " ")}
                    </Badge>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    <Button variant="outline" size="sm" onClick={() => handleReview("user", user)}>
                      <UserCheck className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Projects</CardTitle>
              <CardDescription>Projects with highest engagement and funding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topProjects.map((project, index) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.ngo}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-semibold">{project.volunteers}</div>
                      <div className="text-gray-600">volunteers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">${project.funds.toLocaleString()}</div>
                      <div className="text-gray-600">raised</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleReview("project", project)}>
                      <Flag className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system events and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      alert.type === "warning"
                        ? "bg-yellow-500"
                        : alert.type === "info"
                          ? "bg-blue-500"
                          : "bg-green-500"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                  {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Reports</CardTitle>
              <CardDescription>Analytics and insights for platform activity</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Projects per NGO Bar Chart */}
              <div>
                <h4 className="font-semibold mb-2">Projects by NGO</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={projectsByNGO}>
                    <XAxis dataKey="ngo" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* User Roles Pie Chart */}
              <div>
                <h4 className="font-semibold mb-2">User Roles Distribution</h4>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={userRoles}
                      dataKey="value"
                      nameKey="role"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    >
                      {userRoles.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Review Modal */}
      <Dialog open={reviewOpen} onOpenChange={handleCloseReview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {reviewType === "user" ? "User Review" : "Project Review"}
            </DialogTitle>
            <DialogDescription>
              {reviewType === "user"
                ? "Detailed information about the selected user."
                : "Detailed information about the selected project."}
            </DialogDescription>
          </DialogHeader>
          {selectedReview && reviewType === "user" && (
            <div className="space-y-4">
              <div>
                <strong>Name:</strong> {selectedReview.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedReview.email}
              </div>
              <div>
                <strong>Role:</strong> {selectedReview.role.replace("_", " ")}
              </div>
              <div>
                <strong>Status:</strong> {selectedReview.status}
              </div>
              <div>
                <strong>Join Date:</strong> {new Date(selectedReview.joinDate).toLocaleDateString()}
              </div>
            </div>
          )}
          {selectedReview && reviewType === "project" && (
            <div className="space-y-4">
              <div>
                <strong>Project Name:</strong> {selectedReview.name}
              </div>
              <div>
                <strong>NGO:</strong> {selectedReview.ngo}
              </div>
              <div>
                <strong>Volunteers:</strong> {selectedReview.volunteers}
              </div>
              <div>
                <strong>Funds Raised:</strong> ${selectedReview.funds.toLocaleString()}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseReview}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
