"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, RotateCcw } from "lucide-react"

interface FilterState {
  ecosystemTypes: {
    mangrove: boolean
    wetland: boolean
    seagrass: boolean
    saltmarsh: boolean
  }
  status: {
    protected: boolean
    restoration: boolean
    active: boolean
    planning: boolean
  }
}

export function MapFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    ecosystemTypes: {
      mangrove: true,
      wetland: true,
      seagrass: true,
      saltmarsh: true,
    },
    status: {
      protected: true,
      restoration: true,
      active: true,
      planning: true,
    },
  })

  const ecosystemTypes = [
    { key: "mangrove", label: "Mangroves", color: "bg-emerald-500" },
    { key: "wetland", label: "Wetlands", color: "bg-blue-500" },
    { key: "seagrass", label: "Seagrass", color: "bg-cyan-500" },
    { key: "saltmarsh", label: "Salt Marshes", color: "bg-violet-500" },
  ]

  const statusTypes = [
    { key: "protected", label: "Protected", color: "bg-green-100 text-green-800" },
    { key: "restoration", label: "Restoration", color: "bg-yellow-100 text-yellow-800" },
    { key: "active", label: "Active Projects", color: "bg-blue-100 text-blue-800" },
    { key: "planning", label: "Planning", color: "bg-gray-100 text-gray-800" },
  ]

  const handleEcosystemChange = (type: keyof FilterState["ecosystemTypes"]) => {
    setFilters((prev) => ({
      ...prev,
      ecosystemTypes: {
        ...prev.ecosystemTypes,
        [type]: !prev.ecosystemTypes[type],
      },
    }))
  }

  const handleStatusChange = (status: keyof FilterState["status"]) => {
    setFilters((prev) => ({
      ...prev,
      status: {
        ...prev.status,
        [status]: !prev.status[status],
      },
    }))
  }

  const resetFilters = () => {
    setFilters({
      ecosystemTypes: {
        mangrove: true,
        wetland: true,
        seagrass: true,
        saltmarsh: true,
      },
      status: {
        protected: true,
        restoration: true,
        active: true,
        planning: true,
      },
    })
  }

  const activeFiltersCount =
    Object.values(filters.ecosystemTypes).filter(Boolean).length + Object.values(filters.status).filter(Boolean).length

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="shadow-lg" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filters
        {activeFiltersCount < 8 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {activeFiltersCount}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Map Filters</CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              ×
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Ecosystem Types */}
        <div>
          <h4 className="font-medium mb-3">Ecosystem Types</h4>
          <div className="space-y-2">
            {ecosystemTypes.map((type) => (
              <div key={type.key} className="flex items-center space-x-2">
                <Checkbox
                  id={type.key}
                  checked={filters.ecosystemTypes[type.key as keyof FilterState["ecosystemTypes"]]}
                  onCheckedChange={() => handleEcosystemChange(type.key as keyof FilterState["ecosystemTypes"])}
                />
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <label htmlFor={type.key} className="text-sm cursor-pointer">
                    {type.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status */}
        <div>
          <h4 className="font-medium mb-3">Project Status</h4>
          <div className="space-y-2">
            {statusTypes.map((status) => (
              <div key={status.key} className="flex items-center space-x-2">
                <Checkbox
                  id={status.key}
                  checked={filters.status[status.key as keyof FilterState["status"]]}
                  onCheckedChange={() => handleStatusChange(status.key as keyof FilterState["status"])}
                />
                <label htmlFor={status.key} className="text-sm cursor-pointer">
                  <Badge className={status.color}>{status.label}</Badge>
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
