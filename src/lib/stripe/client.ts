import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  }
  return _stripe
}

export const PLAN_LIMITS: Record<string, number | null> = {
  free: 2,
  growth: 15,
  agency: null, // unlimited
}

export function getPlanFromPriceId(priceId: string): "free" | "growth" | "agency" {
  if (priceId === process.env.STRIPE_PRICE_GROWTH) return "growth"
  if (priceId === process.env.STRIPE_PRICE_AGENCY) return "agency"
  return "free"
}
