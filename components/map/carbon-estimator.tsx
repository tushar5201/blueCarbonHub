"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Leaf } from "lucide-react"

export function CarbonEstimator() {
  const [isOpen, setIsOpen] = useState(false)
  const [area, setArea] = useState("")
  const [ecosystemType, setEcosystemType] = useState("")
  const [years, setYears] = useState("10")
  const [result, setResult] = useState<number | null>(null)

  const sequestrationRates = {
    mangrove: 12.5,
    wetland: 8.5,
    seagrass: 14.0,
    saltmarsh: 10.0,
  }

  const calculateCarbon = () => {
    if (!area || !ecosystemType) return

    const areaNum = Number.parseFloat(area)
    const yearsNum = Number.parseInt(years)
    const rate = sequestrationRates[ecosystemType as keyof typeof sequestrationRates]

    const totalCarbon = areaNum * rate * yearsNum
    setResult(totalCarbon)
  }

  const reset = () => {
    setArea("")
    setEcosystemType("")
    setYears("10")
    setResult(null)
  }

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="shadow-lg" size="sm">
        <Calculator className="h-4 w-4 mr-2" />
        Carbon Calculator
      </Button>
    )
  }

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Carbon Estimator
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="area">Area (hectares)</Label>
          <Input
            id="area"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter area in hectares"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ecosystem">Ecosystem Type</Label>
          <Select value={ecosystemType} onValueChange={setEcosystemType}>
            <SelectTrigger>
              <SelectValue placeholder="Select ecosystem type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mangrove">Mangroves (12.5 tons/ha/year)</SelectItem>
              <SelectItem value="wetland">Wetlands (8.5 tons/ha/year)</SelectItem>
              <SelectItem value="seagrass">Seagrass (14.0 tons/ha/year)</SelectItem>
              <SelectItem value="saltmarsh">Salt Marshes (10.0 tons/ha/year)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="years">Time Period (years)</Label>
          <Select value={years} onValueChange={setYears}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 year</SelectItem>
              <SelectItem value="5">5 years</SelectItem>
              <SelectItem value="10">10 years</SelectItem>
              <SelectItem value="20">20 years</SelectItem>
              <SelectItem value="50">50 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateCarbon} className="flex-1">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        {result !== null && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-emerald-600" />
              <span className="font-medium text-emerald-800 dark:text-emerald-200">Estimated Carbon Sequestration</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">{result.toLocaleString()} tons CO₂</div>
            <div className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
              Over {years} year{Number.parseInt(years) > 1 ? "s" : ""} • {area} hectares
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          * Estimates based on average sequestration rates. Actual values may vary based on local conditions.
        </div>
      </CardContent>
    </Card>
  )
}
