"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"
import { PLAN_LIMITS } from "@/lib/stripe/client"

export type WorkspaceFormState = {
  error?: string
  success?: boolean
  id?: string
  limitReached?: boolean
} | null

export async function createWorkspaceAction(
  _prev: WorkspaceFormState,
  formData: FormData
): Promise<WorkspaceFormState> {
  const client_id = (formData.get("client_id") as string)?.trim()
  const title = (formData.get("title") as string)?.trim()
  const due_date = (formData.get("due_date") as string) || null

  if (!client_id || !title) return { error: "Client and title are required." }

  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const admin = createAdminClient()

  const { data: agency } = await admin
    .from("agencies")
    .select("plan")
    .eq("id", agencyId)
    .single()

  const plan = agency?.plan ?? "free"
  const limit = PLAN_LIMITS[plan]

  if (limit !== null) {
    const { count } = await admin
      .from("workspaces")
      .select("id", { count: "exact", head: true })
      .eq("agency_id", agencyId)

    if ((count ?? 0) >= limit) {
      return {
        error: `You've reached the ${limit}-workspace limit on the ${plan} plan.`,
        limitReached: true,
      }
    }
  }

  const { data, error } = await admin
    .from("workspaces")
    .insert({ agency_id: agencyId, client_id, title, due_date })
    .select("id")
    .single()

  if (error || !data) return { error: "Failed to create workspace." }

  revalidatePath("/dashboard/workspaces")
  return { success: true, id: data.id }
}
