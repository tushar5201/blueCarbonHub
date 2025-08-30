import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { Hero } from "@/components/home/hero"
import { StatsOverview } from "@/components/home/stats-overview"
import { FeaturedProjects } from "@/components/home/featured-projects"

export default function HomePage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <Hero />
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted" />}>
            <StatsOverview />
          </Suspense>
          <Suspense fallback={<div className="h-64 animate-pulse bg-muted" />}>
            <FeaturedProjects />
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  )
}
