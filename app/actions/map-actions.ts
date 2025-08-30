"use server"

export async function getMapboxToken() {
  // Server-side access to environment variable
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  if (!token) {
    throw new Error("Mapbox token not configured")
  }

  return token
}
