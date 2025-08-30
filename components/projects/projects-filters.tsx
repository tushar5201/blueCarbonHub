"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RotateCcw } from "lucide-react"

export function ProjectsFilters() {
  const [filters, setFilters] = useState({
    status: {
      active: true,
      planning: true,
      completed: true,
      paused: false,
    },
    ecosystemTypes: {
      mangrove: true,
      wetland: true,
      seagrass: true,
      saltmarsh: true,
    },
    carbonImpact: [0, 200000], // tons CO2/year
    area: [0, 1000], // hectares
  })

  const statusOptions = [
    { key: "active", label: "Active", color: "text-green-600" },
    { key: "planning", label: "Planning", color: "text-yellow-600" },
    { key: "completed", label: "Completed", color: "text-blue-600" },
    { key: "paused", label: "Paused", color: "text-gray-600" },
  ]

  const ecosystemOptions = [
    { key: "mangrove", label: "Mangroves", color: "text-emerald-600" },
    { key: "wetland", label: "Wetlands", color: "text-blue-600" },
    { key: "seagrass", label: "Seagrass", color: "text-cyan-600" },
    { key: "saltmarsh", label: "Salt Marshes", color: "text-violet-600" },
  ]

  const resetFilters = () => {
    setFilters({
      status: {
        active: true,
        planning: true,
        completed: true,
        paused: false,
      },
      ecosystemTypes: {
        mangrove: true,
        wetland: true,
        seagrass: true,
        saltmarsh: true,
      },
      carbonImpact: [0, 200000],
      area: [0, 1000],
    })
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Status */}
        <div>
          <h4 className="font-medium mb-3">Project Status</h4>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={option.key}
                  checked={filters.status[option.key as keyof typeof filters.status]}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: { ...prev.status, [option.key]: !!checked },
                    }))
                  }
                />
                <label htmlFor={option.key} className={`text-sm cursor-pointer ${option.color}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ecosystem Types */}
        <div>
          <h4 className="font-medium mb-3">Ecosystem Types</h4>
          <div className="space-y-2">
            {ecosystemOptions.map((option) => (
              <div key={option.key} className="flex items-center space-x-2">
                <Checkbox
                  id={option.key}
                  checked={filters.ecosystemTypes[option.key as keyof typeof filters.ecosystemTypes]}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      ecosystemTypes: { ...prev.ecosystemTypes, [option.key]: !!checked },
                    }))
                  }
                />
                <label htmlFor={option.key} className={`text-sm cursor-pointer ${option.color}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Impact Range */}
        <div>
          <Label className="font-medium">Carbon Impact (tons CO₂/year)</Label>
          <div className="mt-3 mb-2">
            <Slider
              value={filters.carbonImpact}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, carbonImpact: value }))}
              max={200000}
              step={5000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{filters.carbonImpact[0].toLocaleString()}</span>
            <span>{filters.carbonImpact[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Area Range */}
        <div>
          <Label className="font-medium">Area (hectares)</Label>
          <div className="mt-3 mb-2">
            <Slider
              value={filters.area}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, area: value }))}
              max={1000}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{filters.area[0]}</span>
            <span>{filters.area[1]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
