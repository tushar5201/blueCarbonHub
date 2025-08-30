import { Leaf } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center animate-pulse">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">Loading BlueCarbon Hub</h2>
          <p className="text-gray-600">Preparing your conservation dashboard...</p>
        </div>
      </div>
    </div>
  )
}
