import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { MapPin, Users, Leaf } from "lucide-react"

export function FeaturedProjects() {
  const projects = [
    {
      id: "1",
      title: "Sundarbans Mangrove Restoration",
      location: "Bangladesh",
      ngo: "Ocean Conservation Alliance",
      description: "Restoring 500 hectares of mangrove forests in the world's largest mangrove ecosystem.",
      carbonImpact: "125,000 tons CO₂/year",
      progress: 68,
      volunteers: 234,
      image: "/mangrove-forest-restoration-project.png",
    },
    {
      id: "2",
      title: "Florida Everglades Wetland Protection",
      location: "Florida, USA",
      ngo: "Wetlands Forever",
      description: "Protecting and expanding critical wetland habitats in the Florida Everglades.",
      carbonImpact: "89,500 tons CO₂/year",
      progress: 45,
      volunteers: 156,
      image: "/florida-everglades-wetland-conservation.png",
    },
    {
      id: "3",
      title: "Great Barrier Reef Seagrass Initiative",
      location: "Queensland, Australia",
      ngo: "Marine Habitat Guardians",
      description: "Restoring seagrass meadows to support marine life and carbon sequestration.",
      carbonImpact: "67,200 tons CO₂/year",
      progress: 82,
      volunteers: 189,
      image: "/seagrass-meadow-restoration-underwater.png",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover ongoing conservation projects making a real impact on blue carbon ecosystems around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 left-3 bg-emerald-600 hover:bg-emerald-700">Active</Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
                <p className="text-sm text-muted-foreground">by {project.ngo}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                    <span>{project.carbonImpact}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>{project.volunteers} volunteers</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/projects/${project.id}`}>View Project Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
