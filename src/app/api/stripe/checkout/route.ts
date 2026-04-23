import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { getStripe } from "@/lib/stripe/client"
import { getAgencyId } from "@/lib/supabase/queries"

export async function POST(request: Request) {
  const supabase = await createClient()
  const agencyId = await getAgencyId(supabase)
  if (!agencyId) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 })
  }

  const { priceId } = await request.json() as { priceId?: string }
  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId." }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data: agency } = await admin
    .from("agencies")
    .select("name, stripe_customer_id")
    .eq("id", agencyId)
    .single()

  if (!agency) {
    return NextResponse.json({ error: "Agency not found." }, { status: 404 })
  }

  const stripe = getStripe()

  // Create Stripe customer on first checkout
  let customerId = agency.stripe_customer_id
  if (!customerId) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const customer = await stripe.customers.create({
      email: user?.email,
      name: agency.name,
      metadata: { agency_id: agencyId },
    })
    customerId = customer.id
    await admin
      .from("agencies")
      .update({ stripe_customer_id: customerId })
      .eq("id", agencyId)
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard/billing?success=true`,
    cancel_url: `${appUrl}/dashboard/billing`,
    metadata: { agency_id: agencyId },
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
