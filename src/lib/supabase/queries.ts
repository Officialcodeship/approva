import type { SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./types"
import { createAdminClient } from "./admin"

export async function getAgencyId(
  supabase: SupabaseClient<Database>
): Promise<string | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const admin = createAdminClient()
  const { data } = await admin
    .from("agency_users")
    .select("agency_id")
    .eq("auth_user_id", user.id)
    .single()
  return data?.agency_id ?? null
}
