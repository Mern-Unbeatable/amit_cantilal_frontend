export interface PricingTier {
  pax: number
  price: number // per-person price in EUR
}

export interface TourPriceResult {
  perPerson: number  // EUR
  total: number      // EUR
  totalCents: number // for Stripe
  hasTiers: boolean
}

/**
 * Look up the price for a given adult count using Bokun pricing tiers.
 * If no tiers are set, falls back to the base price (flat).
 * If pax exceeds the last tier, the last tier is used.
 */
export function getTourPrice(
  basePriceCents: number,
  adults: number,
  tiers?: Array<PricingTier>,
): TourPriceResult {
  const basePriceEur = basePriceCents / 100

  if (!tiers || tiers.length === 0) {
    return {
      perPerson: basePriceEur,
      total: basePriceEur,
      totalCents: basePriceCents,
      hasTiers: false,
    }
  }

  // Find exact match or use the last tier as fallback
  const tier = tiers.find((t) => t.pax === adults) ?? tiers[tiers.length - 1]
  const total = Math.round(tier.price * adults * 100) / 100

  return {
    perPerson: tier.price,
    total,
    totalCents: Math.round(total * 100),
    hasTiers: true,
  }
}
