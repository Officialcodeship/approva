import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()

  const { data: agencyUser } = await admin
    .from("agency_users")
    .select("agency_id, agencies(name)")
    .eq("auth_user_id", user!.id)
    .single()

  const agencyName = (agencyUser?.agencies as { name: string } | null)?.name ?? "your agency"

  const { count: clientCount } = await admin
    .from("clients")
    .select("id", { count: "exact", head: true })
    .eq("agency_id", agencyId)

  const { count: workspaceCount } = await admin
    .from("workspaces")
    .select("id", { count: "exact", head: true })
    .eq("agency_id", agencyId)

  const hasClients = (clientCount ?? 0) > 0
  const hasWorkspaces = (workspaceCount ?? 0) > 0

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
        {agencyName}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {hasWorkspaces
          ? `${workspaceCount} workspace${workspaceCount !== 1 ? "s" : ""} · ${clientCount} client${clientCount !== 1 ? "s" : ""}`
          : "Let's get your first approval flow set up."}
      </p>

      {!hasClients && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Add your first client</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            Create a client profile, then build a workspace to send content for approval.
          </p>
          <Link
            href="/dashboard/clients"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Add a client
          </Link>
        </div>
      )}

      {hasClients && !hasWorkspaces && (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <h2 className="text-sm font-semibold text-gray-900 mb-1">Create your first workspace</h2>
          <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
            A workspace is a batch of posts you send to a client for approval — typically one per month.
          </p>
          <Link
            href="/dashboard/workspaces"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Create a workspace
          </Link>
        </div>
      )}

      {hasClients && hasWorkspaces && (
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/workspaces"
            className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-xs text-gray-500 mb-1">Workspaces</p>
            <p className="text-2xl font-semibold text-gray-900">{workspaceCount}</p>
          </Link>
          <Link
            href="/dashboard/clients"
            className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            <p className="text-xs text-gray-500 mb-1">Clients</p>
            <p className="text-2xl font-semibold text-gray-900">{clientCount}</p>
          </Link>
        </div>
      )}
    </div>
  )
}
