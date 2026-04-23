"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getAgencyId } from "@/lib/supabase/queries"

type SettingsState = { error?: string; success?: boolean } | null

export async function saveSettingsAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) return { error: "Not authenticated." }

  const logo_url = (formData.get("logo_url") as string) || null
  const customDomainRaw = (formData.get("custom_domain") as string)?.trim() || null

  if (customDomainRaw) {
    const domainPattern = /^([a-z0-9-]+\.)+[a-z]{2,}$/i
    if (!domainPattern.test(customDomainRaw)) {
      return { error: "Invalid domain format. Use e.g. approvals.youragency.com" }
    }
  }

  const admin = createAdminClient()
  const { error } = await admin
    .from("agencies")
    .update({ logo_url, custom_domain: customDomainRaw })
    .eq("id", agencyId)

  if (error) return { error: "Failed to save settings." }

  return { success: true }
}
