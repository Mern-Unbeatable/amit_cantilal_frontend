export type GreetAssistAirport = 'LIS' | 'OPO'
export type GreetAssistServiceType = 'arrival' | 'departure' | 'transit'

export interface GreetAssistServicesSelection {
  fast_track_immigration: boolean
  security_fast_track: boolean
  board_to_board_transit: boolean
  tax_free_escort: boolean
}

export interface GreetAssistBookingPayload {
  service_type: 'greet_assist'
  name: string
  email: string
  phone: string
  notes?: string | null
  airport: GreetAssistAirport
  greet_service_type: GreetAssistServiceType
  date: string // YYYY-MM-DD
  flight_time: string // HH:MM
  flight_number: string
  terminal?: string | null
  adults: number
  children: number
  bags: number
  pets: number
  services: GreetAssistServicesSelection
  accepted_conditions: boolean
  amount: number // in cents
}

export interface GreetAssistBookingResponse {
  booking: {
    id: number
    reference: string
    amount: number
    status: string
  }
  client_secret: string
  publishable_key?: string
}

export interface PriceBreakdownItem {
  label: string
  amount: number
}

export interface PricingCalculationResult {
  items: PriceBreakdownItem[]
  subtotal: number
  surchargeApplied: boolean
  surcharge: number
  vat: number
  grandTotal: number
  amountCents: number
}
