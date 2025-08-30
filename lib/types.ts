import type * as GeoJSON from "geojson"

export type UserRole = "user" | "ngo_manager" | "admin"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  credits: number
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface NGO {
  id: string
  name: string
  description: string
  website?: string
  contactEmail: string
  managerId: string
  verified: boolean
  logo?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  title: string
  description: string
  location: string
  ngoId: string
  area: number // in hectares
  carbonImpactPerYear: number // tons CO2/year
  status: "planning" | "active" | "completed" | "paused"
  startDate: string
  endDate?: string
  images: string[]
  coordinates: {
    lat: number
    lng: number
  }
  polygon?: GeoJSON.Polygon
  totalPledgedHours: number
  totalPledgedFunds: number
  createdAt: string
  updatedAt: string
}

export interface GeoLayer {
  id: string
  name: string
  type: "mangrove" | "wetland" | "seagrass" | "saltmarsh"
  geoJson: GeoJSON.FeatureCollection
  carbonSequestrationRate: number // tons CO2/hectare/year
  createdAt: string
  updatedAt: string
}

export interface Action {
  id: string
  userId: string
  type: "planting" | "cleanup" | "monitoring" | "education"
  description: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  photos: string[]
  creditsEarned: number
  verified: boolean
  createdAt: string
}

export interface Pledge {
  id: string
  userId: string
  projectId: string
  type: "hours" | "funds"
  amount: number
  status: "pending" | "fulfilled" | "cancelled"
  createdAt: string
  updatedAt: string
}

export interface Credit {
  id: string
  userId: string
  actionId?: string
  pledgeId?: string
  amount: number
  type: "earned" | "spent"
  description: string
  createdAt: string
}

export interface CarbonFactor {
  id: string
  ecosystemType: "mangrove" | "wetland" | "seagrass" | "saltmarsh"
  region: string
  sequestrationRate: number // tons CO2/hectare/year
  source: string
  verified: boolean
  createdAt: string
  updatedAt: string
}
