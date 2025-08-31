"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  Edit,
  Eye,
  BarChart3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/components/ui/use-toast";

export function NGODashboard() {
  const { user } = useAuth();

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Edit form state
  const [editForm, setEditForm] = useState<any>(null);

  // Add volunteer modal state
  const [volunteerModalOpen, setVolunteerModalOpen] = useState(false);
  const [volunteerModalType, setVolunteerModalType] = useState<
    "view" | "edit" | null
  >(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [editVolunteerForm, setEditVolunteerForm] = useState<any>(null);

  // New Project modal state
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: "",
    location: "",
    status: "active",
    volunteers: 0,
    fundsraised: 0,      // <-- lowercase
    targetfunds: 0,      // <-- lowercase
    startdate: "",
    enddate: "",
    progress: 0,
  });

  // Add this state to hold projects from DB
  const [projects, setProjects] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  // Mock data for NGO dashboard
  const ngoStats = {
    activeProjects: 4,
    totalVolunteers: volunteers.length || 0,
    fundsRaised: 15420,
    hoursLogged: 892,
    impactScore: 8.7,
  };

  const recentActivity = [
    {
      id: 1,
      type: "New Volunteer",
      message: "Sarah Johnson joined Coral Reef Restoration",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Donation",
      message: "₹250 donated to Mangrove Reforestation",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "Update",
      message: "Progress report submitted for Seagrass Monitoring",
      time: "1 day ago",
    },
  ];

  const [newVolunteerOpen, setNewVolunteerOpen] = useState(false);
  const [newVolunteerForm, setNewVolunteerForm] = useState({
    name: "",
    email: "",
    joined: "",
    hours: 0,
    role: "",
    status: "active",
  });

  const handleOpenNewVolunteer = () => setNewVolunteerOpen(true);
  const handleCloseNewVolunteer = () => {
    setNewVolunteerOpen(false);
    setNewVolunteerForm({
      name: "",
      email: "",
      joined: "",
      hours: 0,
      role: "",
      status: "active",
    });
  };
  const handleNewVolunteerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVolunteerForm({
      ...newVolunteerForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveNewVolunteer = async () => {
    const formToInsert = {
      ...newVolunteerForm,
      joined: newVolunteerForm.joined || null,
      hours: Number(newVolunteerForm.hours) || 0,
    };
    const { error } = await supabase.from("volunteers").insert([formToInsert]);
    if (error) {
      toast({
        title: "Error adding volunteer",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Volunteer added!",
      description: `Volunteer "${newVolunteerForm.name}" was added successfully.`,
    });
    await fetchVolunteers();
    handleCloseNewVolunteer();
  };

  // Mock volunteers data
  // const volunteers = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     email: "sarah.johnson@email.com",
  //     joined: "2024-04-12",
  //     hours: 56,
  //     role: "Field Volunteer",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     name: "David Lee",
  //     email: "david.lee@email.com",
  //     joined: "2024-03-28",
  //     hours: 34,
  //     role: "Coordinator",
  //     status: "active",
  //   },
  //   {
  //     id: 3,
  //     name: "Priya Singh",
  //     email: "priya.singh@email.com",
  //     joined: "2024-05-02",
  //     hours: 12,
  //     role: "Field Volunteer",
  //     status: "inactive",
  //   },
  // ];

  const analyticsData = {
    projectProgress: projects.map((p) => ({
      name: p.name,
      progress: p.progress,
    })),
    volunteerHours: volunteers.map((v) => ({
      name: v.name,
      hours: v.hours,
    })),
    fundsHistory: [
      { month: "Jan", funds: 2000 },
      { month: "Feb", funds: 3500 },
      { month: "Mar", funds: 5000 },
      { month: "Apr", funds: 7000 },
      { month: "May", funds: 9000 },
      { month: "Jun", funds: 12000 },
    ],
  };
  const COLORS = ["#10b981", "#3b82f6", "#f59e42"];

  const { logout } = useAuth();

  // Modal open handler
  const handleOpenModal = (type: "view" | "edit", project: any) => {
    setModalType(type);
    setSelectedProject(project);
    setModalOpen(true);
    if (type === "edit") {
      setEditForm({ ...project });
    }
  };

  // Modal close handler
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    setModalType(null);
    setEditForm(null);
  };

  // Edit form change handler
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Save handler (replace with your API logic)
  const handleSaveEdit = async () => {
    if (!editForm?.id) return;
    const { id, ...updateData } = editForm;
    const { error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id);
    if (error) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Project updated!",
      description: `Project "${editForm.name}" was updated successfully.`,
    });
    await fetchProjects();
    handleCloseModal();
  };


  const fetchVolunteers = async () => {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("id", { ascending: false });
    if (!error && data) setVolunteers(data);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  // Volunteer modal handlers
  const handleOpenVolunteerModal = (type: "view" | "edit", volunteer: any) => {
    setVolunteerModalType(type);
    setSelectedVolunteer(volunteer);
    setVolunteerModalOpen(true);
    if (type === "edit") {
      setEditVolunteerForm({ ...volunteer });
    }
  };
  const handleCloseVolunteerModal = () => {
    setVolunteerModalOpen(false);
    setSelectedVolunteer(null);
    setVolunteerModalType(null);
    setEditVolunteerForm(null);
  };
  const handleEditVolunteerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditVolunteerForm({
      ...editVolunteerForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveVolunteerEdit = async () => {
    if (!editVolunteerForm?.id) return;
    const { id, ...updateData } = editVolunteerForm;
    const { error } = await supabase
      .from("volunteers")
      .update(updateData)
      .eq("id", id);
    if (error) {
      toast({
        title: "Error updating volunteer",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Volunteer updated!",
      description: `Volunteer "${editVolunteerForm.name}" was updated successfully.`,
    });
    await fetchVolunteers();
    handleCloseVolunteerModal();
  };

  // New Project handlers
  const handleOpenNewProject = () => setNewProjectOpen(true);
  const handleCloseNewProject = () => {
    setNewProjectOpen(false);
    setNewProjectForm({
      name: "",
      location: "",
      status: "active",
      volunteers: 0,
      fundsraised: 0,
      targetfunds: 0,
      startdate: "",
      enddate: "",
      progress: 0,
    });
  };
  const handleNewProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectForm({
      ...newProjectForm,
      [e.target.name]: e.target.value,
    });
  };
  // Fetch projects from Supabase
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });
    if (!error && data) setProjects(data);
  };

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Update handleSaveNewProject to insert and refresh
  const handleSaveNewProject = async () => {
    const formToInsert = {
      ...newProjectForm,
      startdate: newProjectForm.startdate || null,
      enddate: newProjectForm.enddate || null,
    };
    const { data, error } = await supabase.from("projects").insert([formToInsert]);
    if (error) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Project created!",
      description: `Project "${newProjectForm.name}" was added successfully.`,
    });
    await fetchProjects();
    handleCloseNewProject();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            NGO Manager Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your conservation projects and track community impact
          </p>
        </div>
        <div className="space-x-4">
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleOpenNewProject}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          <Button
            variant="outline"
            className="border-red-500 text-red-600 hover:bg-red-50"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Active Projects
            </CardTitle>
            <BarChart3 className="h-6 w-6 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">+1 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">
              Total Volunteers
            </CardTitle>
            <Users className="h-6 w-6 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ngoStats.totalVolunteers}</div>
            <p className="text-xs text-muted-foreground">+1 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium">Funds Raised</CardTitle>
            <DollarSign className="h-6 w-6 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{projects.reduce((sum, p) => sum + (Number(p.fundsraised) || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+₹2,100 this week</p>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Logged</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ngoStats.hoursLogged}</div>
            <p className="text-xs text-muted-foreground">+45 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ngoStats.impactScore}/10</div>
            <p className="text-xs text-muted-foreground">+0.3 this month</p>
          </CardContent>
        </Card> */}
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>
                Monitor and manage your conservation projects
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 m-5 gap-10 gap-y-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg space-y-4 bg-white"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{project.name}</h4>
                        <Badge
                          variant={
                            project.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            project.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : ""
                          }
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal("view", project)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal("edit", project)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>{project.volunteers} volunteers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>
                        ₹{project.fundsraised.toLocaleString()} / ₹
                        {project.targetfunds.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>
                        {new Date(project.startdate).toLocaleDateString()} -{" "}
                        {new Date(project.enddate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  {/* <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>
                        {Math.round(
                          (project.fundsRaised / project.targetFunds) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(project.fundsRaised / project.targetFunds) * 100}
                      className="h-2"
                    />
                  </div> */}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Volunteer Management </span>
                <Button
                  // className="bg-blue-600 hover:bg-blue-700 mb-4"
                  onClick={handleOpenNewVolunteer}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Volunteer
                </Button></CardTitle>
              <CardDescription>
                Track volunteer engagement and contributions
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="relative flex flex-col justify-between p-6 border rounded-lg bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={
                        volunteer.status === "active"
                          ? "bg-emerald-100 text-emerald-700 flex items-center gap-1"
                          : "bg-gray-100 text-gray-700 flex items-center gap-1"
                      }
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            volunteer.status === "active" ? "#10b981" : "#9ca3af",
                        }}
                      />
                      {volunteer.status}
                    </Badge>
                  </div>
                  {/* Avatar/Initials */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-700">
                      {volunteer.name
                        .split(" ")
                        .map((n:any) => n[0])
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{volunteer.name}</h4>
                      <div className="text-sm text-gray-600">{volunteer.role}</div>
                      <div className="text-xs text-muted-foreground">
                        {volunteer.email}
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="flex gap-6 text-sm mt-2">
                    <div>
                      <Label className="text-muted-foreground">Joined</Label>
                      <div>
                        {new Date(volunteer.joined).toLocaleDateString()}
                      </div>
                    </div>
                    {/* <div>
                      <Label className="text-muted-foreground">Hours</Label>
                      <div>{volunteer.hours}</div>
                    </div> */}
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-2 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenVolunteerModal("view", volunteer)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenVolunteerModal("edit", volunteer)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <Dialog open={newVolunteerOpen} onOpenChange={handleCloseNewVolunteer}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Volunteer</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new volunteer.
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                handleSaveNewVolunteer();
              }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newVolunteerForm.name}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={newVolunteerForm.email}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={newVolunteerForm.role}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="joined">Joined</Label>
                <Input
                  id="joined"
                  name="joined"
                  type="date"
                  value={newVolunteerForm.joined}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  value={newVolunteerForm.hours}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={newVolunteerForm.status}
                  onChange={handleNewVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit">
                  Add Volunteer
                </Button>
                <Button variant="outline" onClick={handleCloseNewVolunteer} type="button">
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Impact Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your project performance
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project Progress Bar Chart */}
              <div>
                <h4 className="font-semibold mb-2">Project Progress</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={analyticsData.projectProgress}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Volunteer Hours Pie Chart */}
              <div>
                <h4 className="font-semibold mb-2">Volunteer Hours</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.volunteerHours}
                      dataKey="hours"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {analyticsData.volunteerHours.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Funds Raised Line Chart */}
                {/* <div>
                  <h4 className="font-semibold mb-2">Funds Raised Over Time</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={analyticsData.fundsHistory}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="funds" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your projects</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 border rounded-lg"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">{activity.message}</p>
                <p className="text-sm text-gray-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* Modal for View/Edit */}
      <Dialog open={modalOpen} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalType === "view" ? "Project Details" : "Edit Project"}
            </DialogTitle>
            <DialogDescription>
              {modalType === "view"
                ? "Detailed information about your project."
                : "Update your project information below."}
            </DialogDescription>
          </DialogHeader>
          {selectedProject && modalType === "view" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{selectedProject.name}</h2>
                <Badge
                  variant={
                    selectedProject.status === "active"
                      ? "default"
                      : "secondary"
                  }
                  className={
                    selectedProject.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : ""
                  }
                >
                  {selectedProject.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{selectedProject.location}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Volunteers</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{selectedProject.volunteers}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Funds Raised</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span>₹{selectedProject.fundsraised?.toLocaleString()}</span>
                  </div>
                  <Label className="text-muted-foreground">Target Funds</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>₹{selectedProject.targetfunds?.toLocaleString()}</span>
                  </div>
                  <Label className="text-muted-foreground">Dates</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>
                      {selectedProject.startdate
                        ? new Date(selectedProject.startdate).toLocaleDateString()
                        : ""}
                      {" - "}
                      {selectedProject.enddate
                        ? new Date(selectedProject.enddate).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Progress</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="w-4 h-4 text-orange-600" />
                    <span>{selectedProject.progress}%</span>
                  </div>
                  <Progress
                    value={selectedProject.progress}
                    className="h-2 mt-2"
                  />
                </div>
              </div>
            </div>
          )}
          {selectedProject && modalType === "edit" && (
            <form
              className="space-y-4 max-h-[60vh] overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="volunteers">Volunteers</Label>
                <Input
                  id="volunteers"
                  name="volunteers"
                  type="number"
                  value={editForm.volunteers}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="fundsraised">Funds Raised</Label>
                <Input
                  id="fundsraised"
                  name="fundsraised"
                  type="number"
                  value={editForm.fundsraised}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetfunds">Target Funds</Label>
                <Input
                  id="targetfunds"
                  name="targetfunds"
                  type="number"
                  value={editForm.targetfunds}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="startdate">Start Date</Label>
                <Input
                  id="startdate"
                  name="startdate"
                  type="date"
                  value={editForm.startdate}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="enddate">End Date</Label>
                <Input
                  id="enddate"
                  name="enddate"
                  type="date"
                  value={editForm.enddate}
                  onChange={handleEditChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="progress">Progress (%)</Label>
                <Input
                  id="progress"
                  name="progress"
                  type="number"
                  value={editForm.progress}
                  onChange={handleEditChange}
                  className="mt-1"
                  min={0}
                  max={100}
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseModal}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Volunteer Modal */}
      <Dialog
        open={volunteerModalOpen}
        onOpenChange={handleCloseVolunteerModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {volunteerModalType === "view"
                ? "Volunteer Details"
                : "Edit Volunteer"}
            </DialogTitle>
            <DialogDescription>
              {volunteerModalType === "view"
                ? "Detailed information about the volunteer."
                : "Update volunteer information below."}
            </DialogDescription>
          </DialogHeader>
          {selectedVolunteer && volunteerModalType === "view" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold">{selectedVolunteer.name}</h2>
                <Badge
                  className={
                    selectedVolunteer.status === "active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {selectedVolunteer.status}
                </Badge>
              </div>
              <div>
                <Label className="text-muted-foreground">Role</Label>
                <div>{selectedVolunteer.role}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <div>{selectedVolunteer.email}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Joined</Label>
                <div>
                  {new Date(selectedVolunteer.joined).toLocaleDateString()}
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Hours</Label>
                <div>{selectedVolunteer.hours}</div>
              </div>
            </div>
          )}
          {selectedVolunteer && volunteerModalType === "edit" && (
            <form
              className="space-y-4 max-h-[50vh] overflow-y-auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveVolunteerEdit();
              }}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editVolunteerForm.name}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={editVolunteerForm.email}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={editVolunteerForm.role}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="joined">Joined</Label>
                <Input
                  id="joined"
                  name="joined"
                  type="date"
                  value={editVolunteerForm.joined}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="hours">Hours</Label>
                <Input
                  id="hours"
                  name="hours"
                  type="number"
                  value={editVolunteerForm.hours}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={editVolunteerForm.status}
                  onChange={handleEditVolunteerChange}
                  className="mt-1"
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCloseVolunteerModal}
                  type="button"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* New Project Modal */}
      <Dialog open={newProjectOpen} onOpenChange={handleCloseNewProject}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new project.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-4 max-h-[60vh] overflow-y-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSaveNewProject();
            }}
          >
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                value={newProjectForm.name}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={newProjectForm.location}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                value={newProjectForm.status}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="volunteers">Volunteers</Label>
              <Input
                id="volunteers"
                name="volunteers"
                type="number"
                value={newProjectForm.volunteers}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="fundsraised">Funds Raised</Label>
              <Input
                id="fundsraised"
                name="fundsraised"
                type="number"
                value={newProjectForm.fundsraised}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="targetfunds">Target Funds</Label>
              <Input
                id="targetfunds"
                name="targetfunds"
                type="number"
                value={newProjectForm.targetfunds}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="startdate">Start Date</Label>
              <Input
                id="startdate"
                name="startdate"
                type="date"
                value={newProjectForm.startdate}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="enddate">End Date</Label>
              <Input
                id="enddate"
                name="enddate"
                type="date"
                value={newProjectForm.enddate}
                onChange={handleNewProjectChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="progress">Progress (%)</Label>
              <Input
                id="progress"
                name="progress"
                type="number"
                value={newProjectForm.progress}
                onChange={handleNewProjectChange}
                className="mt-1"
                min={0}
                max={100}
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                Create Project
              </Button>
              <Button
                variant="outline"
                onClick={handleCloseNewProject}
                type="button"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
