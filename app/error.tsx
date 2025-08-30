"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Leaf className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Something went wrong!</h1>
          <p className="text-gray-600">
            We encountered an unexpected error. Please try again or return to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 p-4 bg-red-50 rounded-lg text-left">
              <summary className="cursor-pointer text-sm font-medium text-red-800">Error Details (Development)</summary>
              <pre className="mt-2 text-xs text-red-700 overflow-auto">{error.message}</pre>
            </details>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem persists, please{" "}
            <Link href="/community" className="text-emerald-600 hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
