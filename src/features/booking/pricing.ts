// src/features/booking/pricing.ts
// ─── Types ────────────────────────────────────────────────────────────────────

export type PricingVehicleClass = 'E-Class' | 'V-Class' | 'S-Class' | 'Sprinter'
export type DestinationPricing = Record<PricingVehicleClass, number>
export type PricingHub = 'Lisbon' | 'Porto' | 'Faro'

// ─── Pricing tables (keyed by hub → destination) ──────────────────────────────
// Each table covers transfers FROM or TO that hub city.
// When both ends are known, the hub is whichever end is a recognised hub.
// When both ends are hubs, the pickup hub takes precedence.

const LISBON_PRICING: Record<string, DestinationPricing> = {
  Lisbon: { 'E-Class': 80, 'V-Class': 100, 'S-Class': 180, Sprinter: 130 },
  Oeiras: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Miraflores: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Queijas: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Carcavelos: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Sintra: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Estoril: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Cascais: { 'E-Class': 120, 'V-Class': 150, 'S-Class': 260, Sprinter: 190 },
  Almada: { 'E-Class': 150, 'V-Class': 190, 'S-Class': 300, Sprinter: 230 },
  'Costa da Caparica': {
    'E-Class': 150,
    'V-Class': 190,
    'S-Class': 300,
    Sprinter: 230,
  },
  Aroeira: { 'E-Class': 150, 'V-Class': 190, 'S-Class': 300, Sprinter: 230 },
  Alcochete: { 'E-Class': 150, 'V-Class': 190, 'S-Class': 300, Sprinter: 230 },
  Guincho: { 'E-Class': 160, 'V-Class': 200, 'S-Class': 310, Sprinter: 240 },
  'Cabo da Roca': {
    'E-Class': 160,
    'V-Class': 200,
    'S-Class': 310,
    Sprinter: 240,
  },
  Malveira: { 'E-Class': 160, 'V-Class': 200, 'S-Class': 310, Sprinter: 240 },
  Sesimbra: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  Meco: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  Mafra: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  'Torres Vedras': {
    'E-Class': 220,
    'V-Class': 250,
    'S-Class': 420,
    Sprinter: 310,
  },
  Ericeira: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  Palmela: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  Setúbal: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  Arrábida: { 'E-Class': 220, 'V-Class': 250, 'S-Class': 420, Sprinter: 310 },
  'Santa Cruz': {
    'E-Class': 220,
    'V-Class': 250,
    'S-Class': 420,
    Sprinter: 310,
  },
  'Areias do Seixo': {
    'E-Class': 220,
    'V-Class': 250,
    'S-Class': 420,
    Sprinter: 310,
  },
  Óbidos: { 'E-Class': 310, 'V-Class': 360, 'S-Class': 530, Sprinter: 430 },
  Peniche: { 'E-Class': 310, 'V-Class': 360, 'S-Class': 530, Sprinter: 430 },
  'Praia Del Rey': {
    'E-Class': 310,
    'V-Class': 360,
    'S-Class': 530,
    Sprinter: 430,
  },
  Tróia: { 'E-Class': 360, 'V-Class': 430, 'S-Class': 600, Sprinter: 490 },
  Comporta: { 'E-Class': 360, 'V-Class': 430, 'S-Class': 600, Sprinter: 490 },
  Nazaré: { 'E-Class': 360, 'V-Class': 430, 'S-Class': 600, Sprinter: 490 },
  Alcobaça: { 'E-Class': 360, 'V-Class': 430, 'S-Class': 600, Sprinter: 490 },
  Fátima: { 'E-Class': 360, 'V-Class': 430, 'S-Class': 600, Sprinter: 490 },
  Tomar: { 'E-Class': 380, 'V-Class': 420, 'S-Class': 650, Sprinter: 520 },
  Leiria: { 'E-Class': 380, 'V-Class': 420, 'S-Class': 650, Sprinter: 520 },
  Évora: { 'E-Class': 380, 'V-Class': 420, 'S-Class': 650, Sprinter: 520 },
  'Figueira da Foz': {
    'E-Class': 490,
    'V-Class': 530,
    'S-Class': 710,
    Sprinter: 570,
  },
  Coimbra: { 'E-Class': 490, 'V-Class': 530, 'S-Class': 710, Sprinter: 570 },
  Beja: { 'E-Class': 490, 'V-Class': 530, 'S-Class': 710, Sprinter: 570 },
  Porto: { 'E-Class': 680, 'V-Class': 770, 'S-Class': 1130, Sprinter: 960 },
  Albufeira: {
    'E-Class': 710,
    'V-Class': 770,
    'S-Class': 1200,
    Sprinter: 1000,
  },
  Faro: { 'E-Class': 710, 'V-Class': 770, 'S-Class': 1200, Sprinter: 1000 },
  Portimão: { 'E-Class': 710, 'V-Class': 770, 'S-Class': 1200, Sprinter: 1000 },
  Vilamoura: {
    'E-Class': 710,
    'V-Class': 770,
    'S-Class': 1200,
    Sprinter: 1000,
  },
  Sagres: { 'E-Class': 710, 'V-Class': 770, 'S-Class': 1200, Sprinter: 1000 },
  'Vila Real de Santo António': {
    'E-Class': 710,
    'V-Class': 770,
    'S-Class': 1200,
    Sprinter: 1000,
  },
  Lamego: { 'E-Class': 750, 'V-Class': 840, 'S-Class': 1200, Sprinter: 1030 },
  Pinhão: { 'E-Class': 750, 'V-Class': 840, 'S-Class': 1200, Sprinter: 1030 },
  Badajoz: { 'E-Class': 720, 'V-Class': 820, 'S-Class': 1200, Sprinter: 1030 },
  Seville: { 'E-Class': 960, 'V-Class': 1050, 'S-Class': 1500, Sprinter: 1350 },
  'Santiago de Compostela': {
    'E-Class': 1240,
    'V-Class': 1320,
    'S-Class': 1880,
    Sprinter: 1690,
  },
  Madrid: { 'E-Class': 1330, 'V-Class': 1420, 'S-Class': 2250, Sprinter: 2000 },
}

const PORTO_PRICING: Record<string, DestinationPricing> = {
  Porto: { 'E-Class': 100, 'V-Class': 140, 'S-Class': 170, Sprinter: 180 },
  'Vila Nova de Gaia': {
    'E-Class': 120,
    'V-Class': 150,
    'S-Class': 180,
    Sprinter: 190,
  },
  Aveiro: { 'E-Class': 280, 'V-Class': 360, 'S-Class': 430, Sprinter: 460 },
  Braga: { 'E-Class': 220, 'V-Class': 260, 'S-Class': 390, Sprinter: 400 },
  Guimarães: { 'E-Class': 220, 'V-Class': 260, 'S-Class': 390, Sprinter: 400 },
  Barcelos: { 'E-Class': 250, 'V-Class': 280, 'S-Class': 420, Sprinter: 400 },
  'Ponte de Lima': {
    'E-Class': 310,
    'V-Class': 350,
    'S-Class': 430,
    Sprinter: 450,
  },
  'Viana do Castelo': {
    'E-Class': 300,
    'V-Class': 370,
    'S-Class': 470,
    Sprinter: 420,
  },
  Coimbra: { 'E-Class': 410, 'V-Class': 490, 'S-Class': 620, Sprinter: 630 },
  Fátima: { 'E-Class': 580, 'V-Class': 690, 'S-Class': 890, Sprinter: 890 },
  Faro: { 'E-Class': 1430, 'V-Class': 1600, 'S-Class': 2280, Sprinter: 2170 },
  Lisbon: { 'E-Class': 920, 'V-Class': 1000, 'S-Class': 1250, Sprinter: 1500 },
  Madrid: { 'E-Class': 1430, 'V-Class': 1600, 'S-Class': 2280, Sprinter: 2170 },
  'Peso da Régua': {
    'E-Class': 360,
    'V-Class': 460,
    'S-Class': 590,
    Sprinter: 580,
  },
  Pinhão: { 'E-Class': 380, 'V-Class': 480, 'S-Class': 640, Sprinter: 610 },
  'Santiago de Compostela': {
    'E-Class': 810,
    'V-Class': 890,
    'S-Class': 1170,
    Sprinter: 970,
  },
  Vidago: { 'E-Class': 460, 'V-Class': 560, 'S-Class': 660, Sprinter: 650 },
  Vigo: { 'E-Class': 510, 'V-Class': 620, 'S-Class': 680, Sprinter: 710 },
}

const FARO_PRICING: Record<string, DestinationPricing> = {
  Albufeira: { 'E-Class': 240, 'V-Class': 280, 'S-Class': 300, Sprinter: 420 },
  Tavira: { 'E-Class': 240, 'V-Class': 280, 'S-Class': 300, Sprinter: 420 },
  'Armação de Pêra': {
    'E-Class': 220,
    'V-Class': 280,
    'S-Class': 360,
    Sprinter: 435,
  },
  Carvoeiro: { 'E-Class': 230, 'V-Class': 300, 'S-Class': 390, Sprinter: 530 },
  'Monte Gordo': {
    'E-Class': 230,
    'V-Class': 300,
    'S-Class': 390,
    Sprinter: 530,
  },
  // "from any location in Algarve" destinations — keyed under Faro hub
  Évora: { 'E-Class': 1080, 'V-Class': 1290, 'S-Class': 1530, Sprinter: 2500 },
  Seville: {
    'E-Class': 1080,
    'V-Class': 1290,
    'S-Class': 1530,
    Sprinter: 2500,
  },
  Ferragudo: { 'E-Class': 250, 'V-Class': 300, 'S-Class': 390, Sprinter: 560 },
  Lagos: { 'E-Class': 310, 'V-Class': 370, 'S-Class': 470, Sprinter: 710 },
  Lisbon: { 'E-Class': 890, 'V-Class': 1140, 'S-Class': 1250, Sprinter: 2200 },
  Moncarapacho: {
    'E-Class': 175,
    'V-Class': 200,
    'S-Class': 260,
    Sprinter: 600,
  },
  'Ólhos de Água': {
    'E-Class': 175,
    'V-Class': 200,
    'S-Class': 260,
    Sprinter: 600,
  },
  Olhão: { 'E-Class': 130, 'V-Class': 150, 'S-Class': 210, Sprinter: 410 },
  'Quinta do Lago': {
    'E-Class': 130,
    'V-Class': 150,
    'S-Class': 210,
    Sprinter: 410,
  },
  Portimão: { 'E-Class': 310, 'V-Class': 370, 'S-Class': 470, Sprinter: 600 },
  Alvôr: { 'E-Class': 310, 'V-Class': 370, 'S-Class': 470, Sprinter: 600 },
  Quarteira: { 'E-Class': 150, 'V-Class': 170, 'S-Class': 250, Sprinter: 400 },
  Vilamoura: { 'E-Class': 150, 'V-Class': 170, 'S-Class': 250, Sprinter: 400 },
  Porto: { 'E-Class': 1830, 'V-Class': 2290, 'S-Class': 2890, Sprinter: 4290 },
  'Praia da Galé': {
    'E-Class': 240,
    'V-Class': 280,
    'S-Class': 300,
    Sprinter: 420,
  },
  'Praia da Luz': {
    'E-Class': 310,
    'V-Class': 370,
    'S-Class': 470,
    Sprinter: 720,
  },
  Sagres: { 'E-Class': 450, 'V-Class': 480, 'S-Class': 640, Sprinter: 1030 },
  Faro: { 'E-Class': 100, 'V-Class': 130, 'S-Class': 180, Sprinter: 200 }, // local/airport run fallback
}

// ─── Hub pricing map ──────────────────────────────────────────────────────────

const HUB_PRICING: Record<PricingHub, Record<string, DestinationPricing>> = {
  Lisbon: LISBON_PRICING,
  Porto: PORTO_PRICING,
  Faro: FARO_PRICING,
}

// ─── Zone definitions ─────────────────────────────────────────────────────────
// Used ONLY as a fallback when the place name doesn't match any pricing key.
// Name matching always takes priority so named towns (e.g. Sintra) are never
// swallowed by a nearby hub zone.

interface PricingZone {
  hub: PricingHub
  lat: number
  lng: number
  radiusKm: number
}

const PRICING_ZONES: Array<PricingZone> = [
  { hub: 'Lisbon', lat: 38.7169, lng: -9.1399, radiusKm: 8 },
  { hub: 'Porto', lat: 41.1579, lng: -8.6291, radiusKm: 15 },
  { hub: 'Faro', lat: 37.0194, lng: -7.9322, radiusKm: 20 },
]

// ─── Haversine distance ───────────────────────────────────────────────────────

function getDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ─── Hub resolver ─────────────────────────────────────────────────────────────
// Returns which hub a place belongs to, or null if it's not a hub.
// Priority: name match first, zone match as fallback.

const HUB_NAME_ALIASES: Record<string, PricingHub> = {
  // canonical
  lisbon: 'Lisbon',
  lisboa: 'Lisbon',
  porto: 'Porto',
  faro: 'Faro',
  // airports
  'lisbon airport': 'Lisbon',
  'aeroporto de lisboa': 'Lisbon',
  'humberto delgado': 'Lisbon',
  'francisco sá carneiro': 'Porto',
  'porto airport': 'Porto',
  'faro airport': 'Faro',
  'aeroporto de faro': 'Faro',
}

function resolveHub(
  coords: [number, number] | undefined,
  placeName: string,
): PricingHub | null {
  // 1. Check each comma-separated segment independently (most specific first)
  const segments = placeName.split(',').map((s) => s.trim())

  for (const segment of segments) {
    const lower = segment.toLowerCase()
    for (const [alias, hub] of Object.entries(HUB_NAME_ALIASES)) {
      if (lower.includes(alias)) return hub
    }
  }

  // 2. Zone match fallback
  if (coords) {
    const [lat, lng] = coords
    for (const zone of PRICING_ZONES) {
      if (getDistanceKm(lat, lng, zone.lat, zone.lng) <= zone.radiusKm) {
        return zone.hub
      }
    }
  }

  return null
}
// ─── Destination key resolver ─────────────────────────────────────────────────
// Finds the best matching key within a given hub's pricing table.
// Priority: exact name → partial name → null.
// Zone matching is intentionally excluded here; it lives in resolveHub().

// Street/road prefixes to skip during partial matching.
// A segment like "R. de Leiria" would otherwise match the city "Leiria".
const STREET_PREFIX_RE =
  /^(r\.|rua|av\.|avda\.|avenida|est\.|estrada|tv\.|travessa|lg\.|largo|pr\.|praça|beco|calçada|alameda|campo|estr\.)\s/i

// Normalize Portuguese locale variants → English pricing-table keys.
// e.g. "1100 Lisboa" → "1100 Lisbon" so the partial match finds the key.
const PLACE_NORMALIZATIONS: Array<[RegExp, string]> = [
  [/\blisboa\b/gi, 'Lisbon'],
  [/\bsétubal\b/gi, 'Setúbal'],
  [/\bsetubal\b/gi, 'Setúbal'],
]

function normalizeSegment(s: string): string {
  let result = s
  for (const [re, replacement] of PLACE_NORMALIZATIONS) {
    result = result.replace(re, replacement)
  }
  return result
}

function resolveDestinationKey(
  placeName: string,
  hubTable: Record<string, DestinationPricing>,
): string | null {
  // 1. Exact match
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (hubTable[placeName]) return placeName

  // 2. Split "Sintra, Lisbon, Portugal" into segments and try each one.
  //    Match the FIRST (most specific) segment that hits a pricing key.
  //    This prevents "Lisbon" in segment 2 from shadowing "Sintra" in segment 1.
  //    Street segments (e.g. "R. de Leiria") are skipped for partial matching
  //    to avoid a street name containing a city name (e.g. "Leiria") being
  //    mistakenly matched to that city's pricing.
  const segments = placeName.split(',').map((s) => s.trim())

  for (const segment of segments) {
    // Normalize PT locale variants before comparing
    const normalized = normalizeSegment(segment)

    // exact segment match (normalized)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (hubTable[normalized]) return normalized

    // skip street segments for partial matching
    if (STREET_PREFIX_RE.test(segment)) continue

    // partial — key appears within this segment only
    const lower = normalized.toLowerCase()
    const match = Object.keys(hubTable).find((key) =>
      lower.includes(key.toLowerCase()),
    )
    if (match) return match
  }

  return null
}

// ─── Vehicle class resolver ───────────────────────────────────────────────────

export function resolveVehicleClass(
  vehicleName: string,
): PricingVehicleClass | null {
  const lower = vehicleName.toLowerCase()
  if (lower.includes('sprinter')) return 'Sprinter'
  if (lower.includes('s-class') || lower.includes('s class')) return 'S-Class'
  if (lower.includes('v-class') || lower.includes('v class')) return 'V-Class'
  if (lower.includes('e-class') || lower.includes('e class')) return 'E-Class'
  return null
}

// ─── Main price lookup ────────────────────────────────────────────────────────
// Returns the fixed transfer price, or null if the route can't be resolved
// (caller should fall back to vehicle.price from the API).
//
// Resolution logic:
//   1. Identify which end is a hub (Lisbon / Porto / Faro)
//   2. Use that hub's pricing table
//   3. Look up the OTHER end as the destination key
//   4. If both ends are hubs, pickup hub takes precedence
//   5. If neither end is a hub, return null (no applicable table)

export function getTransferPrice(
  pickupCoords: [number, number] | undefined,
  pickupName: string,
  dropoffCoords: [number, number] | undefined,
  dropoffName: string,
  vehicleName: string,
): number | null {
  const vehicleClass = resolveVehicleClass(vehicleName)
  if (!vehicleClass) return null

  const pickupHub = resolveHub(pickupCoords, pickupName)
  const dropoffHub = resolveHub(dropoffCoords, dropoffName)

  let hub: PricingHub
  let destinationName: string

  if (pickupHub && dropoffHub) {
    // Both ends are hubs (e.g. Lisbon → Porto).
    // Pickup hub takes precedence; destination is the dropoff hub name.
    hub = pickupHub
    destinationName = dropoffName
  } else if (pickupHub) {
    // Standard: pickup is the hub, dropoff is the destination
    hub = pickupHub
    destinationName = dropoffName
  } else if (dropoffHub) {
    // Return leg: dropoff is the hub, pickup is the destination
    hub = dropoffHub
    destinationName = pickupName
  } else {
    // Neither end is a recognised hub — no table to consult
    return null
  }

  const hubTable = HUB_PRICING[hub]
  const destinationKey = resolveDestinationKey(destinationName, hubTable)
  if (!destinationKey) return null

  return hubTable[destinationKey][vehicleClass]
}

// ─── Hourly rates ─────────────────────────────────────────────────────────────

export const HOURLY_RATES: Record<PricingVehicleClass, number> = {
  'E-Class': 70,
  'V-Class': 85,
  'S-Class': 100,
  Sprinter: 150,
}

export function getHourlyRate(vehicleName: string): number | null {
  const vehicleClass = resolveVehicleClass(vehicleName)
  if (!vehicleClass) return null
  return HOURLY_RATES[vehicleClass]
}
