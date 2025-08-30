'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Leaf, Users, Calculator } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function Hero() {
  const [heroData, setHeroData] = useState<any>(null)

  useEffect(() => {
    async function fetchHero() {
      const { data, error } = await supabase.from('hero').select('*').single()
      if (!error) setHeroData(data)
    }
    fetchHero()
  }, [])

  // if (!heroData) return <div>Loadinsg...</div>

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
            Protecting Our Blue Carbon
            <span className="text-emerald-600"> Ecosystems</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            Join the global movement to restore mangroves and wetlands. Track carbon sequestration, support conservation
            projects, and make a measurable impact on climate change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" asChild>
              <Link href="/map">
                Explore Interactive Map
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Carbon Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor real-time carbon sequestration across global blue carbon ecosystems
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Community Action</h3>
              <p className="text-sm text-muted-foreground">
                Connect with NGOs and volunteers to participate in restoration projects
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Impact Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Calculate and visualize the carbon impact of conservation efforts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
