export interface AdminGreetAssistPricingItem {
  label: string
  quantity: number
  total: number
}

export interface AdminGreetAssistPricing {
  items?: AdminGreetAssistPricingItem[]
  subtotal: number
  surcharge_applied?: boolean
  surcharge?: number
  surcharge_percent?: number
  vat: number
  vat_percent?: number
  total: number
}

export interface AdminGreetAssistBookingDetails {
  airport?: string
  flight_number?: string
  greet_service_type?: string
  terminal?: string
  adults?: number
  children?: number
  bags?: number
  pets?: number
  services?: {
    fast_track_immigration?: boolean
    security_fast_track?: boolean
    board_to_board_transit?: boolean
    tax_free_escort?: boolean
  }
  pricing?: AdminGreetAssistPricing
}

export interface AdminGreetAssistBooking {
  id: number
  reference: string
  name: string
  email: string
  phone?: string
  notes?: string
  service_type: string
  status: 'confirmed' | 'pending' | 'cancelled' | 'payment_failed' | string
  date: string
  pickup_time?: string
  passengers: number
  amount: number // in cents
  created_at: string
  updated_at?: string
  stripe_status?: string
  payment?: {
    stripe_payment_intent_id?: string
  }
  details?: AdminGreetAssistBookingDetails
}

export interface AdminGreetAssistPagination {
  current_page: number
  last_page: number
  from: number | null
  to: number | null
  total: number
}

export interface AdminGreetAssistListResponse {
  data: AdminGreetAssistBooking[]
  pagination: AdminGreetAssistPagination
}
