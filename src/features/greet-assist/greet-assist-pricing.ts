import type {
  GreetAssistServicesSelection,
  PriceBreakdownItem,
  PricingCalculationResult,
} from './greet-assist.types.ts'

export const SURCHARGE_RATE = 0.3
export const SURCHARGE_WINDOW_HOURS = 24
export const VAT_RATE = 0.23
export const SERVICE_TIME_ZONE = 'Europe/Lisbon'

export function timeZoneOffsetMs(timestamp: number, timeZone: string): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).formatToParts(new Date(timestamp))

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      Number(parts.find((p) => p.type === type)?.value ?? 0)

    const zonedAsUtc = Date.UTC(
      get('year'),
      get('month') - 1,
      get('day'),
      get('hour'),
      get('minute'),
      get('second'),
    )

    return zonedAsUtc - timestamp
  } catch {
    return 0
  }
}

export function getServiceTimestamp(date: string, time: string): number | null {
  if (!date || !time) return null

  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(hh) || isNaN(mm)) return null

  const asIfUtc = Date.UTC(y, m - 1, d, hh, mm)
  return asIfUtc - timeZoneOffsetMs(asIfUtc, SERVICE_TIME_ZONE)
}

export function calculatePricing({
  adults,
  children,
  bags,
  pets,
  services,
  date,
  time,
}: {
  adults: number
  children: number
  bags: number
  pets: number
  services: GreetAssistServicesSelection
  date: string
  time: string
}): PricingCalculationResult {
  const totalPax = adults + children
  const extraAdults = Math.max(0, adults - 1)

  let subtotal = 0
  const items: PriceBreakdownItem[] = []

  // 1. Base service (1 PAX)
  if (adults > 0) {
    const cost = 195.12
    subtotal += cost
    items.push({ label: 'Base service (1 PAX)', amount: cost })
  }

  // 2. Per extra PAX
  if (extraAdults > 0) {
    const cost = extraAdults * 130.08
    subtotal += cost
    items.push({ label: `Per extra PAX (${extraAdults}x)`, amount: cost })
  }

  // 3. Children until 14 years
  if (children > 0) {
    const cost = children * 81.3
    subtotal += cost
    items.push({
      label: `Per PAX until 14 years (${children}x)`,
      amount: cost,
    })
  }

  // 4. Porter per bag
  if (bags > 0) {
    const cost = bags * 24.39
    subtotal += cost
    items.push({ label: `Porter per bag (${bags}x)`, amount: cost })
  }

  // 5. Security fast track (DEP) per PAX
  if (services.security_fast_track && totalPax > 0) {
    const cost = totalPax * 24.39
    subtotal += cost
    items.push({
      label: `Security fast track (DEP) (${totalPax}x)`,
      amount: cost,
    })
  }

  // 6. Fast Track Immigration / Passport Control (per group of up to 2 pax)
  if (services.fast_track_immigration && totalPax > 0) {
    const groups = Math.ceil(totalPax / 2)
    const cost = groups * 101.625
    subtotal += cost
    items.push({
      label: `Fast Track Immigration / Passport Control (${groups}x)`,
      amount: cost,
    })
  }

  // 7. Board to board transit per PAX
  if (services.board_to_board_transit && totalPax > 0) {
    const cost = totalPax * 60.975
    subtotal += cost
    items.push({
      label: `Board to board transit (${totalPax}x)`,
      amount: cost,
    })
  }

  // 8. Tax free escort per PAX
  if (services.tax_free_escort && totalPax > 0) {
    const cost = totalPax * 65.04
    subtotal += cost
    items.push({ label: `Tax free escort (${totalPax}x)`, amount: cost })
  }

  // 9. Vet assistance per pet
  if (pets > 0) {
    const cost = pets * 97.56
    subtotal += cost
    items.push({ label: `Vet assistance per pet (${pets}x)`, amount: cost })
  }

  // 30% late booking surcharge when the service is less than 24 hours away
  const serviceAt = getServiceTimestamp(date, time)
  const surchargeApplied =
    serviceAt !== null &&
    serviceAt - Date.now() < SURCHARGE_WINDOW_HOURS * 3600 * 1000 &&
    serviceAt - Date.now() > 0

  const surcharge = surchargeApplied ? subtotal * SURCHARGE_RATE : 0

  // VAT (23%) is charged on subtotal + surcharge
  const vat = (subtotal + surcharge) * VAT_RATE
  const grandTotal = subtotal + surcharge + vat
  const amountCents = Math.round(grandTotal * 100)

  return {
    items,
    subtotal,
    surchargeApplied,
    surcharge,
    vat,
    grandTotal,
    amountCents,
  }
}
