import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import Badge from "@/components/ui/Badge"
import NewWorkspaceDialog from "./NewWorkspaceDialog"

export default async function WorkspacesPage() {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()
  const [{ data: workspaces }, { data: clients }] = await Promise.all([
    admin
      .from("workspaces")
      .select("id, title, status, due_date, client_id, clients(name)")
      .eq("agency_id", agencyId)
      .order("created_at", { ascending: false }),
    admin
      .from("clients")
      .select("id, name")
      .eq("agency_id", agencyId)
      .order("name"),
  ])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Workspaces</h1>
        <NewWorkspaceDialog clients={clients ?? []} />
      </div>

      {!workspaces?.length ? (
        <div className="text-center py-16 text-gray-400 text-sm">
          No workspaces yet. Create one to start building a content calendar.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {workspaces.map((ws) => {
            const clientName = (ws.clients as { name: string } | null)?.name ?? "Unknown"
            return (
              <Link
                key={ws.id}
                href={`/dashboard/workspaces/${ws.id}`}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{ws.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{clientName}</p>
                </div>
                <div className="flex items-center gap-3">
                  {ws.due_date && (
                    <span className="text-xs text-gray-400">
                      Due {new Date(ws.due_date).toLocaleDateString()}
                    </span>
                  )}
                  <Badge
                    status={
                      ws.status as "draft" | "sent" | "approved" | "changes_requested"
                    }
                  />
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
