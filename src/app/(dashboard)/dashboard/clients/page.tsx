import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import AddClientDialog from "./AddClientDialog"

export default async function ClientsPage() {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()
  const { data: clients } = await admin
    .from("clients")
    .select("id, name, email, brand_color")
    .eq("agency_id", agencyId)
    .order("name")

  const { data: workspaceCounts } = await admin
    .from("workspaces")
    .select("client_id")
    .eq("agency_id", agencyId)

  const countByClient = (workspaceCounts ?? []).reduce<Record<string, number>>((acc, w) => {
    acc[w.client_id] = (acc[w.client_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
        <AddClientDialog />
      </div>

      {!clients?.length ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900 mb-1">No clients yet</p>
          <p className="text-sm text-gray-500 mb-5">
            Add your first client to start sending branded approval links.
          </p>
          <AddClientDialog />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {clients.map((client) => (
            <Link
              key={client.id}
              href={`/dashboard/clients/${client.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {client.brand_color && (
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: client.brand_color }}
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.email}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">
                {countByClient[client.id] ?? 0}{" "}
                {(countByClient[client.id] ?? 0) === 1 ? "workspace" : "workspaces"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
