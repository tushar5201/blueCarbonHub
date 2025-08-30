import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function MapLegend() {
  const ecosystemTypes = [
    { type: "Mangroves", color: "bg-emerald-500", sequestration: "10-15 tons CO₂/ha/year" },
    { type: "Wetlands", color: "bg-blue-500", sequestration: "5-12 tons CO₂/ha/year" },
    { type: "Seagrass", color: "bg-cyan-500", sequestration: "8-20 tons CO₂/ha/year" },
    { type: "Salt Marshes", color: "bg-violet-500", sequestration: "6-14 tons CO₂/ha/year" },
  ]

  return (
    <Card className="w-64 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Blue Carbon Ecosystems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ecosystemTypes.map((ecosystem) => (
          <div key={ecosystem.type} className="flex items-start gap-3">
            <div className={`w-4 h-4 rounded ${ecosystem.color} mt-0.5 flex-shrink-0`} />
            <div>
              <div className="font-medium text-sm">{ecosystem.type}</div>
              <div className="text-xs text-muted-foreground">{ecosystem.sequestration}</div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Click on any area to view detailed information and carbon impact data.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
