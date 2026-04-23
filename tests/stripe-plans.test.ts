import { describe, it, expect, beforeAll } from 'vitest'

beforeAll(() => {
  process.env.STRIPE_PRICE_GROWTH = 'price_growth_test'
  process.env.STRIPE_PRICE_AGENCY = 'price_agency_test'
  // Stub STRIPE_SECRET_KEY so the module doesn't throw on import
  process.env.STRIPE_SECRET_KEY = 'sk_test_stub'
})

describe('getPlanFromPriceId', () => {
  it('returns "growth" for the growth price ID', async () => {
    const { getPlanFromPriceId } = await import('@/lib/stripe/client')
    expect(getPlanFromPriceId('price_growth_test')).toBe('growth')
  })

  it('returns "agency" for the agency price ID', async () => {
    const { getPlanFromPriceId } = await import('@/lib/stripe/client')
    expect(getPlanFromPriceId('price_agency_test')).toBe('agency')
  })

  it('returns "free" for an unknown price ID', async () => {
    const { getPlanFromPriceId } = await import('@/lib/stripe/client')
    expect(getPlanFromPriceId('price_unknown')).toBe('free')
  })
})

describe('PLAN_LIMITS', () => {
  it('has correct limits: free=2, growth=15, agency=null', async () => {
    const { PLAN_LIMITS } = await import('@/lib/stripe/client')
    expect(PLAN_LIMITS.free).toBe(2)
    expect(PLAN_LIMITS.growth).toBe(15)
    expect(PLAN_LIMITS.agency).toBeNull()
  })
})
