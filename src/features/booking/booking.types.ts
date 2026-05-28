import type { FleetVehicle } from '@/features/fleet/fleet.types.ts'

export type ServiceType = 'transfer' | 'hourly' | 'tour'
export type VehicleType = 'sedan' | 'suv' | 'van' | 'sprinter'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

// ─── Frontend form state (booking wizard) ────────────────────────────────────
export interface BookingFormState {
  trip: TripDetails
  vehicle: Vehicle | null
  notes: string
  contact: ContactDetails
}

export interface Stop {
  id: string
  value: string
}

export interface TripDetails {
  serviceType: ServiceType
  pickup: string
  dropoff: string
  stops: Array<Stop>
  passengers: number
  date: Date | undefined
  time: string
  distanceKm?: number
  hours?: number
  pickupCoords?: [number, number]
  dropoffCoords?: [number, number]
}

export interface ContactDetails {
  fullName: string
  email: string
  phone: string
  countryCode: string
  flightNumber: string
}

// ─── Backend API shape (matches BookingResource) ─────────────────────────────
export interface Payment {
  id: string
  stripe_payment_intent_id: string
  amount: number
  currency: string
  status: 'created' | 'processing' | 'succeeded' | 'failed' | 'cancelled'
  metadata: Record<string, unknown> | null
  processed_at: string | null
  created_at: string
}

export interface BookingState {
  id: number
  reference: string
  service_type: ServiceType | 'tour'
  name: string
  email: string
  phone: string
  passengers: number
  notes: string | null
  date: string
  pickup_time: string | null
  details: Record<string, unknown> | null
  amount: number
  currency: string
  status: BookingStatus
  payment?: Payment | null
  created_at: string
  updated_at: string
}

// ─── API payloads & responses ─────────────────────────────────────────────────

export interface CreateBookingPayload {
  service_type: ServiceType
  name: string
  email: string
  phone: string
  passengers: number
  date: string
  pickup_time?: string
  notes?: string
  amount: number
  pickup_location: string
  dropoff_location?: string
  hours?: number
  flight_number?: string
  vehicle_type?: VehicleType
  tour_id?: string
}

export interface CreateBookingResponse {
  booking: BookingState
  client_secret: string
  publishable_key: string
}

export interface BookingPaginatedResponse {
  data: Array<BookingState>
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export type Vehicle = FleetVehicle

export const COUNTRY_CODES = [
  { code: '+351', flag: '🇵🇹', label: 'PT' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+34', flag: '🇪🇸', label: 'ES' },
  { code: '+33', flag: '🇫🇷', label: 'FR' },
  { code: '+49', flag: '🇩🇪', label: 'DE' },
  { code: '+1', flag: '🇺🇸', label: 'US' },
]