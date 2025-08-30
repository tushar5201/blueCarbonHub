"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Leaf } from "lucide-react"

// Mock data for blue carbon ecosystems
const mockEcosystems = [
  {
    id: "1",
    name: "Sundarbans Mangrove Forest",
    type: "mangrove",
    area: 10000,
    carbonSequestration: 125000,
    country: "Bangladesh",
    status: "protected",
    position: { top: "45%", left: "75%" },
  },
  {
    id: "2",
    name: "Florida Everglades",
    type: "wetland",
    area: 6000,
    carbonSequestration: 89500,
    country: "USA",
    status: "restoration",
    position: { top: "55%", left: "25%" },
  },
  {
    id: "3",
    name: "Great Barrier Reef Seagrass",
    type: "seagrass",
    area: 3500,
    carbonSequestration: 67200,
    country: "Australia",
    status: "active",
    position: { top: "75%", left: "85%" },
  },
  {
    id: "4",
    name: "Wadden Sea",
    type: "saltmarsh",
    area: 4200,
    carbonSequestration: 78300,
    country: "Netherlands",
    status: "protected",
    position: { top: "35%", left: "52%" },
  },
  {
    id: "5",
    name: "San Francisco Bay",
    type: "wetland",
    area: 2800,
    carbonSequestration: 45600,
    country: "USA",
    status: "restoration",
    position: { top: "50%", left: "15%" },
  },
]

interface SelectedEcosystem {
  id: string
  name: string
  type: string
  area: number
  carbonSequestration: number
  country: string
  status: string
}

export function InteractiveMap() {
  const [selectedEcosystem, setSelectedEcosystem] = useState<SelectedEcosystem | null>(null)

  const getEcosystemColor = (type: string) => {
    const colors = {
      mangrove: "bg-emerald-500",
      wetland: "bg-blue-500",
      seagrass: "bg-cyan-500",
      saltmarsh: "bg-violet-500",
    }
    return colors[type as keyof typeof colors] || "bg-gray-500"
  }

  const getEcosystemBorderColor = (type: string) => {
    const colors = {
      mangrove: "border-emerald-400",
      wetland: "border-blue-400",
      seagrass: "border-cyan-400",
      saltmarsh: "border-violet-400",
    }
    return colors[type as keyof typeof colors] || "border-gray-400"
  }

  const getStatusColor = (status: string) => {
    const colors = {
      protected: "bg-green-100 text-green-800",
      restoration: "bg-yellow-100 text-yellow-800",
      active: "bg-blue-100 text-blue-800",
      planning: "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 overflow-hidden">
      {/* World Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* Simplified world map continents */}
          <path d="M150 200 L300 180 L350 220 L320 280 L200 300 L150 250 Z" fill="#10b981" opacity="0.3" />
          <path d="M400 150 L600 140 L650 200 L600 250 L450 260 L400 200 Z" fill="#10b981" opacity="0.3" />
          <path d="M700 180 L850 170 L900 220 L850 280 L750 290 L700 240 Z" fill="#10b981" opacity="0.3" />
          <path d="M200 320 L400 310 L450 360 L400 410 L250 420 L200 370 Z" fill="#10b981" opacity="0.3" />
          <path d="M750 320 L900 310 L950 360 L900 410 L800 420 L750 370 Z" fill="#10b981" opacity="0.3" />
        </svg>
      </div>

      {/* Ecosystem Markers */}
      {mockEcosystems.map((ecosystem) => (
        <div
          key={ecosystem.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={ecosystem.position}
          onClick={() => setSelectedEcosystem(ecosystem)}
        >
          <div
            className={`w-6 h-6 rounded-full ${getEcosystemColor(ecosystem.type)} ${getEcosystemBorderColor(
              ecosystem.type,
            )} border-2 shadow-lg group-hover:scale-110 transition-transform duration-200 animate-pulse`}
          />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {ecosystem.name}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-sm mb-2">Blue Carbon Ecosystems</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Mangroves</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Wetlands</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span>Seagrass</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            <span>Salt Marshes</span>
          </div>
        </div>
      </div>

      {/* Ecosystem Details Popup */}
      {selectedEcosystem && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <Card className="w-80 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getEcosystemColor(selectedEcosystem.type)}`} />
                  <h3 className="font-semibold text-lg">{selectedEcosystem.name}</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEcosystem(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(selectedEcosystem.status)}>{selectedEcosystem.status}</Badge>
                  <span className="text-sm text-muted-foreground capitalize">{selectedEcosystem.type}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedEcosystem.country}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <span>{selectedEcosystem.area.toLocaleString()} ha</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Carbon Sequestration</div>
                  <div className="text-lg font-semibold text-emerald-600">
                    {selectedEcosystem.carbonSequestration.toLocaleString()} tons CO₂/year
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Support Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-xs text-muted-foreground">
          Click on the pulsing markers to explore blue carbon ecosystems around the world
        </p>
      </div>
    </div>
  )
}
