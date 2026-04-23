import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getStripe } from "@/lib/stripe/client"
import { getAgencyId } from "@/lib/supabase/queries"

export async function POST() {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const admin = createAdminClient()
  const { data: agency } = await admin
    .from("agencies")
    .select("stripe_customer_id")
    .eq("id", agencyId)
    .single()

  if (!agency?.stripe_customer_id) {
    return NextResponse.json({ error: "No Stripe customer found." }, { status: 400 })
  }

  const stripe = getStripe()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: agency.stripe_customer_id,
    return_url: `${appUrl}/dashboard/billing`,
  })

  return NextResponse.json({ url: portalSession.url })
}
