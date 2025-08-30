"use client"

import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { InteractiveMap } from "@/components/map/interactive-map"
import { MapFilters } from "@/components/map/map-filters"
import { MapLegend } from "@/components/map/map-legend"
import { CarbonEstimator } from "@/components/map/carbon-estimator"

export default function MapPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="relative h-[calc(100vh-4rem)]">
          <Suspense
            fallback={
              <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center">
                <div className="text-muted-foreground">Loading interactive map...</div>
              </div>
            }
          >
            <InteractiveMap />
          </Suspense>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10">
            <MapFilters />
          </div>

          <div className="absolute bottom-4 left-4 z-5">
            <MapLegend />
          </div>

          {/* <div className="absolute top-4 right-4 z-10">
            <CarbonEstimator />
          </div> */}
        </div>
      </div>
    </AuthProvider>
  )
}
