"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"

export type ClientFormState = { error?: string; success?: boolean } | null

export async function createClientAction(
  _prev: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const brand_color = (formData.get("brand_color") as string)?.trim() || null

  if (!name || !email) return { error: "Name and email are required." }

  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const admin = createAdminClient()
  const { error } = await admin
    .from("clients")
    .insert({ agency_id: agencyId, name, email, brand_color })

  if (error) return { error: "Failed to create client." }

  revalidatePath("/dashboard/clients")
  return { success: true }
}
