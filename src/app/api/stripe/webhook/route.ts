import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getStripe, getPlanFromPriceId } from "@/lib/stripe/client"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature") ?? ""
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: "Webhook signature verification failed." }, { status: 400 })
  }

  const admin = createAdminClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const agencyId = session.metadata?.agency_id
    const customerId = session.customer as string
    const subscriptionId = session.subscription as string

    if (!agencyId || !subscriptionId) {
      return NextResponse.json({ received: true })
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const priceId = subscription.items.data[0].price.id
    const plan = getPlanFromPriceId(priceId)

    await admin
      .from("agencies")
      .update({ stripe_customer_id: customerId, stripe_subscription_id: subscriptionId, plan })
      .eq("id", agencyId)
  }

  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object as Stripe.Subscription
    const priceId = subscription.items.data[0].price.id
    const plan = getPlanFromPriceId(priceId)

    await admin
      .from("agencies")
      .update({ plan })
      .eq("stripe_subscription_id", subscription.id)
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription

    await admin
      .from("agencies")
      .update({ plan: "free", stripe_subscription_id: null })
      .eq("stripe_subscription_id", subscription.id)
  }

  return NextResponse.json({ received: true })
}
