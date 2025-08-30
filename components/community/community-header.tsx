import { Leaf, Users, Award, TrendingUp } from "lucide-react"

export function CommunityHeader() {
  const stats = [
    { icon: Users, value: "12.8K", label: "Active Members", color: "text-blue-600" },
    { icon: Leaf, value: "45.2K", label: "Actions Logged", color: "text-emerald-600" },
    { icon: Award, value: "892K", label: "Credits Earned", color: "text-yellow-600" },
    { icon: TrendingUp, value: "156%", label: "Growth This Month", color: "text-purple-600" },
  ]

  return (
    <div className="mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Community Actions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of environmental champions taking action to protect blue carbon ecosystems. Log your
          conservation activities and earn credits for your impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-muted flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
