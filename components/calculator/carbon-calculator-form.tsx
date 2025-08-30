"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator } from "lucide-react"
import type { CalculationResult } from "@/app/calculator/page"

interface CarbonCalculatorFormProps {
  onResult: (result: CalculationResult) => void
}

export function CarbonCalculatorForm({ onResult }: CarbonCalculatorFormProps) {
  const [formData, setFormData] = useState({
    ecosystemType: "",
    area: "",
    years: [10],
    region: "",
  })

  const ecosystemTypes = [
    { value: "mangrove", label: "Mangroves", rate: 12.5, description: "Coastal tropical forests" },
    { value: "wetland", label: "Wetlands", rate: 8.5, description: "Freshwater marshes and swamps" },
    { value: "seagrass", label: "Seagrass Meadows", rate: 14.0, description: "Underwater flowering plants" },
    { value: "saltmarsh", label: "Salt Marshes", rate: 10.0, description: "Coastal wetlands in temperate regions" },
  ]

  const regions = [
    { value: "tropical", label: "Tropical", multiplier: 1.2 },
    { value: "temperate", label: "Temperate", multiplier: 1.0 },
    { value: "subtropical", label: "Subtropical", multiplier: 1.1 },
    { value: "arctic", label: "Arctic/Subarctic", multiplier: 0.7 },
  ]

  const calculateCarbon = () => {
    if (!formData.ecosystemType || !formData.area) return

    const ecosystem = ecosystemTypes.find((e) => e.value === formData.ecosystemType)
    const region = regions.find((r) => r.value === formData.region)

    if (!ecosystem) return

    const baseRate = ecosystem.rate
    const regionMultiplier = region?.multiplier || 1.0
    const adjustedRate = baseRate * regionMultiplier

    const areaNum = Number.parseFloat(formData.area)
    const yearsNum = formData.years[0]

    const annualCarbon = areaNum * adjustedRate
    const totalCarbon = annualCarbon * yearsNum

    // Calculate equivalents
    const equivalents = {
      cars: Math.round(totalCarbon / 4.6), // Average car emits 4.6 tons CO2/year
      trees: Math.round(totalCarbon / 0.048), // Average tree absorbs 48 lbs (0.048 tons) CO2/year
      homes: Math.round(totalCarbon / 16), // Average home emits 16 tons CO2/year
    }

    const result: CalculationResult = {
      totalCarbon,
      annualCarbon,
      ecosystemType: ecosystem.label,
      area: areaNum,
      years: yearsNum,
      equivalents,
    }

    onResult(result)
  }

  const selectedEcosystem = ecosystemTypes.find((e) => e.value === formData.ecosystemType)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Calculate Carbon Sequestration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ecosystem">Ecosystem Type</Label>
            <Select
              value={formData.ecosystemType}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, ecosystemType: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ecosystem type" />
              </SelectTrigger>
              <SelectContent>
                {ecosystemTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.rate} tons CO₂/ha/year</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedEcosystem && <p className="text-xs text-muted-foreground">{selectedEcosystem.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region (optional)</Label>
            <Select
              value={formData.region}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    <div>
                      <div>{region.label}</div>
                      <div className="text-xs text-muted-foreground">{region.multiplier}x multiplier</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area (hectares)</Label>
          <Input
            id="area"
            type="number"
            value={formData.area}
            onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
            placeholder="Enter area in hectares"
            min="0.1"
            step="0.1"
          />
        </div>

        <div className="space-y-3">
          <Label>Time Period: {formData.years[0]} years</Label>
          <Slider
            value={formData.years}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, years: value }))}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>50 years</span>
          </div>
        </div>

        <Button onClick={calculateCarbon} className="w-full" disabled={!formData.ecosystemType || !formData.area}>
          Calculate Carbon Impact
        </Button>
      </CardContent>
    </Card>
  )
}
