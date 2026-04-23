import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import Badge from "@/components/ui/Badge"

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()
  const { data: client } = await admin
    .from("clients")
    .select("id, name, email, brand_color")
    .eq("id", id)
    .eq("agency_id", agencyId)
    .single()

  if (!client) notFound()

  const { data: workspaces } = await admin
    .from("workspaces")
    .select("id, title, status, due_date, created_at")
    .eq("client_id", client.id)
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <Link href="/dashboard/clients" className="text-sm text-gray-400 hover:text-gray-600">
          ← Clients
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-3">
          {client.brand_color && (
            <span
              className="w-5 h-5 rounded-full flex-shrink-0 border border-gray-200"
              style={{ backgroundColor: client.brand_color }}
            />
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{client.name}</h1>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Workspaces
      </h2>

      {!workspaces?.length ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-14 px-8 text-center">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-100 mb-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No workspaces yet</p>
          <p className="text-sm text-gray-500 mb-5">
            Create a workspace to start sending content for approval.
          </p>
          <Link
            href="/dashboard/workspaces"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
          >
            Create a workspace
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {workspaces.map((ws) => (
            <Link
              key={ws.id}
              href={`/dashboard/workspaces/${ws.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">{ws.title}</p>
              <div className="flex items-center gap-3">
                {ws.due_date && (
                  <span className="text-xs text-gray-400">
                    Due {new Date(ws.due_date).toLocaleDateString()}
                  </span>
                )}
                <Badge
                  status={
                    ws.status as
                      | "draft"
                      | "sent"
                      | "approved"
                      | "changes_requested"
                  }
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
