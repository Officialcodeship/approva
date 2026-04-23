import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAgencyId } from "@/lib/supabase/queries"
import { createAdminClient } from "@/lib/supabase/admin"
import SettingsClient from "./SettingsClient"

export default async function SettingsPage() {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()
  const { data: agency } = await admin
    .from("agencies")
    .select("name, slug, logo_url, custom_domain, plan")
    .eq("id", agencyId)
    .single()

  if (!agency) redirect("/login")

  return (
    <SettingsClient
      agencyId={agencyId}
      agencyName={agency.name}
      slug={agency.slug}
      logoUrl={agency.logo_url}
      customDomain={agency.custom_domain}
      plan={agency.plan}
    />
  )
}
