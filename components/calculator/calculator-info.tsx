import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, BookOpen, ExternalLink } from "lucide-react"

export function CalculatorInfo() {
  const ecosystemInfo = [
    {
      name: "Mangroves",
      rate: "10-15 tons CO₂/ha/year",
      description: "Highly efficient carbon sinks in tropical coastal areas",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      name: "Seagrass Meadows",
      rate: "8-20 tons CO₂/ha/year",
      description: "Underwater plants with exceptional carbon storage",
      color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400",
    },
    {
      name: "Salt Marshes",
      rate: "6-14 tons CO₂/ha/year",
      description: "Coastal wetlands in temperate regions",
      color: "bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400",
    },
    {
      name: "Wetlands",
      rate: "5-12 tons CO₂/ha/year",
      description: "Freshwater marshes and swamps",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Our calculator uses scientifically validated carbon sequestration rates for different blue carbon
            ecosystems. Results are estimates based on average conditions.
          </p>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Calculation Formula:</h4>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              Total CO₂ = Area × Rate × Years × Regional Factor
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Factors Considered:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ecosystem type and health</li>
              <li>• Regional climate conditions</li>
              <li>• Soil composition and depth</li>
              <li>• Age and maturity of ecosystem</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Ecosystem Types
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ecosystemInfo.map((ecosystem, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded text-xs font-medium ${ecosystem.color}`}>{ecosystem.name}</div>
              </div>
              <div className="text-sm font-medium">{ecosystem.rate}</div>
              <div className="text-xs text-muted-foreground">{ecosystem.description}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Learn More</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <ExternalLink className="w-4 h-4" />
              Blue Carbon Science
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <ExternalLink className="w-4 h-4" />
              IPCC Guidelines
            </a>
            <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
              <ExternalLink className="w-4 h-4" />
              Research Papers
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
