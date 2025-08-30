"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { CalculationResult } from "@/app/calculator/page"
import { Leaf, Car, Home, TreePine, Download, Share2 } from "lucide-react"

interface CalculatorResultsProps {
  result: CalculationResult
}

export function CalculatorResults({ result }: CalculatorResultsProps) {
  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF report
    console.log("Exporting PDF report...")
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    console.log("Sharing results...")
  }

  return (
    <div className="space-y-6 mt-8">
      <Card className="border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
            <Leaf className="w-6 h-6" />
            Carbon Sequestration Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{result.totalCarbon.toLocaleString()} tons</div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">Total CO₂ Sequestered</div>
              <div className="text-xs text-muted-foreground mt-1">Over {result.years} years</div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {result.annualCarbon.toLocaleString()} tons/year
              </div>
              <div className="text-sm text-emerald-700 dark:text-emerald-300">Annual Sequestration</div>
              <div className="text-xs text-muted-foreground mt-1">
                {result.area} hectares of {result.ecosystemType}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            <Button onClick={handleExportPDF} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Environmental Impact Equivalents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Car className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold mb-1">{result.equivalents.cars.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Cars off the road for 1 year</div>
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <TreePine className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold mb-1">{result.equivalents.trees.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Tree seedlings grown for 10 years</div>
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <Home className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold mb-1">{result.equivalents.homes.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Homes' energy use for 1 year</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calculation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Ecosystem Type:</span>
            <Badge variant="secondary">{result.ecosystemType}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Area:</span>
            <span>{result.area} hectares</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Period:</span>
            <span>{result.years} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Annual Rate:</span>
            <span>{(result.annualCarbon / result.area).toFixed(1)} tons CO₂/ha/year</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
