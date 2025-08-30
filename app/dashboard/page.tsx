import { UserDashboard } from "@/components/dashboard/user-dashboard"

// This would normally get user from server-side auth
// For demo purposes, we'll use client-side auth
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <DashboardRouter />
      </div>
    </div>
  )
}

function DashboardRouter() {
  // This would normally be server-side, but for demo we'll use client component
  return <UserDashboard />
}
