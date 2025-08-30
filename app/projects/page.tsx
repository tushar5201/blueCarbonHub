"use client";

import { Suspense, useState } from "react";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Navigation } from "@/components/layout/navigation";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { ProjectsFilters } from "@/components/projects/projects-filters";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProjectsHeader />
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md my-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ProjectsFilters />
            </aside>

            <div className="flex-1">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {search === ""
                      ? Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-96 bg-muted animate-pulse rounded-lg"
                          />
                        ))
                      : Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-96 bg-muted animate-pulse rounded-lg"
                          />
                        ))}
                  </div>
                }
              >
                <ProjectsGrid search={search} />
              </Suspense>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
