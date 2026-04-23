export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-gray-200 mb-2" />
      <div className="h-4 w-64 rounded-lg bg-gray-100 mb-8" />
      <div className="space-y-3">
        <div className="h-20 rounded-xl bg-gray-100" />
        <div className="h-20 rounded-xl bg-gray-100" />
        <div className="h-20 rounded-xl bg-gray-100" />
      </div>
    </div>
  )
}
