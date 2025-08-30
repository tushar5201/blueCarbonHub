"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-provider"
import { Plus, MapPin, Camera, CheckCircle } from "lucide-react"
import Link from "next/link"

export function LogActionForm() {
  const { user, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    location: "",
    photos: [] as File[],
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  const actionTypes = [
    { value: "planting", label: "Tree/Mangrove Planting", credits: "20-30 credits" },
    { value: "cleanup", label: "Beach/Habitat Cleanup", credits: "15-25 credits" },
    { value: "monitoring", label: "Environmental Monitoring", credits: "10-20 credits" },
    { value: "education", label: "Education & Outreach", credits: "25-35 credits" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) return

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSuccess(true)
    setFormData({ type: "", description: "", location: "", photos: [] })
    setLoading(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(false), 3000)
  }

  const getCurrentLocation = () => {
    setUseCurrentLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setFormData((prev) => ({
            ...prev,
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
          }))
          setUseCurrentLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setUseCurrentLocation(false)
        },
      )
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files].slice(0, 3) }))
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Log Your Action
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Sign in to log your conservation actions and earn credits.</p>
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
          <Plus className="w-5 h-5" />
          Log Your Action
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 border-green-200 bg-green-50 dark:bg-green-950/20">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Action logged successfully! Credits will be added after verification.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Action Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div>{type.label}</div>
                      <div className="text-xs text-muted-foreground">{type.credits}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your conservation action..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex gap-2">
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                required
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={getCurrentLocation}
                disabled={useCurrentLocation}
              >
                <MapPin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="photos">Photos (optional, max 3)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("photos")?.click()}
                disabled={formData.photos.length >= 3}
              >
                <Camera className="w-4 h-4 mr-2" />
                Add Photos ({formData.photos.length}/3)
              </Button>
            </div>
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">{photo.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading || !formData.type || !formData.description}>
            {loading ? "Logging Action..." : "Log Action"}
          </Button>
        </form>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            Actions are reviewed for verification. Verified actions earn full credits and appear in the community feed.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
