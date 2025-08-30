"use client"

import { Suspense } from "react"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { CommunityHeader } from "@/components/community/community-header"
import { ActionsFeed } from "@/components/community/actions-feed"
import { LogActionForm } from "@/components/community/log-action-form"
import { CommunityStats } from "@/components/community/community-stats"

export default function CommunityPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CommunityHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense
                fallback={
                  <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                }
              >
                <ActionsFeed />
              </Suspense>
            </div>

            <div className="space-y-6">
              <LogActionForm />
              <CommunityStats />
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
