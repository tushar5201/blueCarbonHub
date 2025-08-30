"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import type { Project } from "@/lib/types"
import { Clock, DollarSign, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ProjectPledgingProps {
  project: Project
}

export function ProjectPledging({ project }: ProjectPledgingProps) {
  const { user, isAuthenticated } = useAuth()
  const [pledgeType, setPledgeType] = useState<"hours" | "funds">("hours")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handlePledge = async () => {
    if (!amount || !isAuthenticated) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess(true)
    setAmount("")
    setLoading(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000)
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Support This Project
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Sign in to pledge your support and help make a difference in blue carbon conservation.
          </p>
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 bg-transparent">
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Support This Project
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {success && (
          <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Thank you! Your pledge has been recorded successfully.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={pledgeType} onValueChange={(value) => setPledgeType(value as "hours" | "funds")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="hours" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Volunteer Hours
            </TabsTrigger>
            <TabsTrigger value="funds" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Financial Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hours" className="space-y-4">
            <div>
              <Label htmlFor="hours">Hours to Pledge</Label>
              <Input
                id="hours"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter number of hours"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Volunteer your time for on-site restoration work</p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Current Pledges</div>
              <div className="text-2xl font-bold text-blue-600">{project.totalPledgedHours.toLocaleString()} hours</div>
            </div>
          </TabsContent>

          <TabsContent value="funds" className="space-y-4">
            <div>
              <Label htmlFor="funds">Amount to Pledge ($)</Label>
              <Input
                id="funds"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in USD"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Support equipment, materials, and operational costs</p>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm font-medium mb-1">Current Pledges</div>
              <div className="text-2xl font-bold text-green-600">${project.totalPledgedFunds.toLocaleString()}</div>
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handlePledge} className="w-full" disabled={!amount || loading}>
          {loading ? "Processing..." : `Pledge ${pledgeType === "hours" ? "Hours" : "Funds"}`}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>
            By pledging, you commit to supporting this project. You'll receive updates on how to contribute and the
            project's progress.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
