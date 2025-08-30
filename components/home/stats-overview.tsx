import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, MapPin, Award } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      icon: Leaf,
      value: "2.4M",
      label: "Tons CO₂ Sequestered",
      color: "text-emerald-600",
    },
    {
      icon: MapPin,
      value: "156",
      label: "Active Projects",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: "12.8K",
      label: "Community Members",
      color: "text-teal-600",
    },
    {
      icon: Award,
      value: "89",
      label: "Partner NGOs",
      color: "text-indigo-600",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Global Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Together, we're making a measurable difference in protecting and restoring critical blue carbon ecosystems
            worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
