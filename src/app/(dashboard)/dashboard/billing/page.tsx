import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAgencyId } from "@/lib/supabase/queries"
import { createAdminClient } from "@/lib/supabase/admin"
import { PLAN_LIMITS } from "@/lib/stripe/client"
import BillingClient from "./BillingClient"

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>
}) {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) redirect("/login")

  const admin = createAdminClient()
  const { data: agency } = await admin
    .from("agencies")
    .select("plan, stripe_customer_id, stripe_subscription_id")
    .eq("id", agencyId)
    .single()

  const { count: workspaceCount } = await admin
    .from("workspaces")
    .select("id", { count: "exact", head: true })
    .eq("agency_id", agencyId)

  const { success } = await searchParams
  const plan = agency?.plan ?? "free"
  const limit = PLAN_LIMITS[plan]

  return (
    <BillingClient
      plan={plan as "free" | "growth" | "agency"}
      workspaceCount={workspaceCount ?? 0}
      workspaceLimit={limit}
      hasStripeCustomer={!!agency?.stripe_customer_id}
      showSuccess={success === "true"}
      growthPriceId={process.env.STRIPE_PRICE_GROWTH ?? ""}
      agencyPriceId={process.env.STRIPE_PRICE_AGENCY ?? ""}
    />
  )
}
