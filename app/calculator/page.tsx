"use client"

import { AuthProvider } from "@/components/auth/auth-provider"
import { Navigation } from "@/components/layout/navigation"
import { CarbonCalculatorForm } from "@/components/calculator/carbon-calculator-form"
import { CalculatorResults } from "@/components/calculator/calculator-results"
import { CalculatorInfo } from "@/components/calculator/calculator-info"
import { useState } from "react"

export interface CalculationResult {
  totalCarbon: number
  annualCarbon: number
  ecosystemType: string
  area: number
  years: number
  equivalents: {
    cars: number
    trees: number
    homes: number
  }
}

export default function CalculatorPage() {
  const [result, setResult] = useState<CalculationResult | null>(null)

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Carbon Sequestration Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate the carbon sequestration potential of blue carbon ecosystems and understand their impact on
              climate change mitigation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CarbonCalculatorForm onResult={setResult} />
              {result && <CalculatorResults result={result} />}
            </div>

            <div>
              <CalculatorInfo />
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  )
}
